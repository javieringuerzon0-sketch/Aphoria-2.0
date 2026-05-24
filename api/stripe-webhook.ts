import type { VercelRequest, VercelResponse } from '@vercel/node';
import type Stripe from 'stripe';
import { stripe } from './_stripe-client.js';
import { fulfillOrder } from './_post-order.js';

// Disable Vercel's body parser — Stripe needs the raw body to verify the signature
export const config = { api: { bodyParser: false } };

function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// In-memory dedupe (best-effort; CJ also deduplicates by orderNumber)
const processed = new Set<string>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'] as string;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set — refusing to process unverified webhook');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Signature error';
    console.error('[stripe-webhook] constructEvent failed', msg);
    return res.status(400).json({ error: msg });
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignored: true });
  }

  // Stripe v22 types: cast to a typed subset to access all session fields
  type StripeAddress = { line1?: string | null; line2?: string | null; city?: string | null; state?: string | null; postal_code?: string | null; country?: string | null };
  type ShippingInfo = { name?: string | null; address?: StripeAddress | null } | null;
  type SessionExt = {
    id: string;
    metadata?: Record<string, string> | null;
    customer_details?: { email?: string | null; name?: string | null; phone?: string | null } | null;
    // Stripe API ≥ 2025-10-29.clover moved shipping to collected_information
    shipping_details?: ShippingInfo;
    collected_information?: { shipping_details?: ShippingInfo } | null;
    amount_total?: number | null;
    currency?: string | null;
    payment_status?: string;
  };

  const rawSessionId = (event.data.object as { id: string }).id;

  if (processed.has(rawSessionId)) {
    return res.status(200).json({ received: true, deduplicated: true });
  }
  processed.add(rawSessionId);

  // Retrieve the full session — the webhook payload's data.object may omit
  // collected_information.shipping_details when the webhook endpoint is configured
  // with an older Stripe API version. Retrieving directly guarantees complete data.
  let session: SessionExt;
  try {
    session = await stripe.checkout.sessions.retrieve(rawSessionId) as unknown as SessionExt;
  } catch (err: unknown) {
    console.warn('[stripe-webhook] failed to retrieve full session, falling back to event payload', err);
    session = event.data.object as SessionExt;
  }

  // Parse compact cart from session metadata
  type CompactItem = { s: string; q: number; n: string };
  let cartItems: CompactItem[] = [];
  try {
    if (session.metadata?.cart) {
      cartItems = JSON.parse(session.metadata.cart) as CompactItem[];
    }
  } catch {
    console.warn('[stripe-webhook] Could not parse cart metadata for', session.id);
  }

  // Support both old (shipping_details) and new API (collected_information.shipping_details)
  const shippingInfo = session.shipping_details ?? session.collected_information?.shipping_details ?? null;
  const addr = shippingInfo?.address;

  const buyerEmail = session.customer_details?.email || undefined;

  // Force Stripe to send (or re-send) the customer receipt email.
  //
  // Critical detail: updating receipt_email on the PaymentIntent AFTER capture
  // does NOT trigger the receipt — that ship has already sailed. The only way
  // to make Stripe re-send the receipt post-payment is to update receipt_email
  // on the underlying CHARGE object. Stripe documents this: any change to a
  // charge's receipt_email triggers a fresh receipt to be sent to the new
  // address, regardless of whether one was sent earlier.
  //
  // Requires Dashboard → Settings → Emails → "Successful payments" toggle ON
  // (Stripe respects this gate even for receipt_email updates).
  try {
    const fullSession = event.data.object as { payment_intent?: string | null };
    const piId = fullSession.payment_intent;
    if (piId && buyerEmail) {
      // Fetch the PI to get the latest_charge ID, then update the charge.
      const pi = await stripe.paymentIntents.retrieve(piId, { expand: ['latest_charge'] });
      const latestCharge = (pi as unknown as { latest_charge?: string | { id: string } }).latest_charge;
      const chargeId = typeof latestCharge === 'string' ? latestCharge : latestCharge?.id;
      if (chargeId) {
        await stripe.charges.update(chargeId, { receipt_email: buyerEmail });
        console.log('[stripe-webhook] receipt_email set on charge', chargeId, '→', buyerEmail);
      } else {
        // No charge yet (rare for checkout.session.completed). Fall back to PI update
        // so a receipt will go out if/when the charge is created.
        await stripe.paymentIntents.update(piId, { receipt_email: buyerEmail });
        console.log('[stripe-webhook] no charge yet, set receipt_email on PI', piId);
      }
    } else {
      console.warn('[stripe-webhook] missing piId or buyerEmail — no receipt sent', { piId, hasEmail: !!buyerEmail });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[stripe-webhook] failed to send receipt', msg);
  }

  await fulfillOrder({
    provider: 'stripe',
    providerOrderId: session.id,
    status: 'paid',
    email: buyerEmail,
    payerName: session.customer_details?.name || shippingInfo?.name || undefined,
    shipping: {
      name: shippingInfo?.name || session.customer_details?.name || '',
      line1: addr?.line1 || '',
      line2: addr?.line2 || undefined,
      city: addr?.city || '',
      state: addr?.state || '',
      postalCode: addr?.postal_code || '',
      country: addr?.country || '',
      phone: session.customer_details?.phone || undefined,
    },
    items: cartItems.map((i) => ({ sku: i.s, quantity: i.q, name: i.n })),
    currency: (session.currency || 'usd').toUpperCase(),
    amount: session.amount_total != null ? session.amount_total / 100 : 0,
    livemode: event.livemode,
  });

  return res.status(200).json({ received: true });
}
