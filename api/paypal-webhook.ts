import type { VercelRequest, VercelResponse } from '@vercel/node';
import { paypalFetch } from './_paypal-client.js';
import { fulfillOrder } from './_post-order.js';

export const config = { api: { bodyParser: false } };

function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  resource: {
    id: string;
    custom_id?: string;
    supplementary_data?: {
      related_ids?: { order_id?: string };
    };
    amount?: { currency_code: string; value: string };
    payer?: { email_address?: string; name?: { given_name?: string; surname?: string } };
    shipping?: {
      name?: { full_name?: string };
      address?: {
        address_line_1?: string;
        address_line_2?: string;
        admin_area_1?: string;
        admin_area_2?: string;
        postal_code?: string;
        country_code?: string;
      };
    };
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rawBody = await getRawBody(req);
  const bodyStr = rawBody.toString('utf8');

  // Verify webhook signature with PayPal
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.error('[paypal-webhook] PAYPAL_WEBHOOK_ID not set');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  try {
    const verifyRes = await paypalFetch('/v1/notifications/verify-webhook-signature', {
      method: 'POST',
      body: {
        auth_algo: req.headers['paypal-auth-algo'],
        cert_url: req.headers['paypal-cert-url'],
        transmission_id: req.headers['paypal-transmission-id'],
        transmission_sig: req.headers['paypal-transmission-sig'],
        transmission_time: req.headers['paypal-transmission-time'],
        webhook_id: webhookId,
        webhook_event: JSON.parse(bodyStr),
      },
    });

    const verifyData = (await verifyRes.json()) as { verification_status?: string };
    if (verifyData.verification_status !== 'SUCCESS') {
      console.error('[paypal-webhook] signature verification failed', verifyData);
      return res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (err) {
    console.error('[paypal-webhook] verify error', err);
    return res.status(400).json({ error: 'Verification error' });
  }

  let event: PayPalWebhookEvent;
  try {
    event = JSON.parse(bodyStr);
  } catch {
    return res.status(400).json({ error: 'Bad JSON' });
  }

  // Backup fulfillment — paypal-capture-order already triggers fulfillment
  // synchronously; this is a safety net if the buyer closed the tab before
  // the capture response returned.
  if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
    return res.status(200).json({ received: true, ignored: true });
  }

  const orderId = event.resource.supplementary_data?.related_ids?.order_id || event.resource.id;

  type CompactItem = { s: string; q: number; n: string };
  let cartItems: CompactItem[] = [];
  try {
    if (event.resource.custom_id) {
      cartItems = JSON.parse(event.resource.custom_id) as CompactItem[];
    }
  } catch {
    console.warn('[paypal-webhook] could not parse custom_id', orderId);
  }

  const payer = event.resource.payer;
  const shipping = event.resource.shipping;
  const addr = shipping?.address;
  const payerName = [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(' ').trim();
  const fullName = shipping?.name?.full_name || payerName;
  const amount = event.resource.amount?.value ? parseFloat(event.resource.amount.value) : 0;
  const currency = event.resource.amount?.currency_code || 'USD';

  await fulfillOrder({
    provider: 'paypal',
    providerOrderId: orderId,
    status: 'paid',
    email: payer?.email_address || undefined,
    payerName: payerName || fullName || undefined,
    shipping: {
      name: fullName || '',
      line1: addr?.address_line_1 || '',
      line2: addr?.address_line_2 || undefined,
      city: addr?.admin_area_2 || '',
      state: addr?.admin_area_1 || '',
      postalCode: addr?.postal_code || '',
      country: addr?.country_code || '',
    },
    items: cartItems.map((i) => ({ sku: i.s, quantity: i.q, name: i.n })),
    currency,
    amount,
    livemode: (process.env.PAYPAL_MODE || 'sandbox').toLowerCase() === 'live',
  });

  return res.status(200).json({ received: true });
}
