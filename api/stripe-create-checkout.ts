import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from './_stripe-client.js';

interface CartItemInput {
  sku: string;
  name: string;
  price: number;    // dollars (e.g. 38.99)
  quantity: number;
  img?: string;
}

interface CreateCheckoutBody {
  items: CartItemInput[];
  email?: string;
  discountCode?: string;
  currency?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { items = [], email, discountCode, currency = 'usd' } = (req.body || {}) as CreateCheckoutBody;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const origin = (req.headers.origin as string) || `https://${req.headers.host}`;

  // Compact cart stored in metadata for webhook fulfillment (Stripe limit: 500 chars/value).
  // Build progressively shrinking name lengths until JSON fits — NEVER blindly slice() a JSON
  // string, which would yield invalid JSON and silently zero out the order in the webhook.
  let cartMeta = '';
  for (const nameLen of [40, 24, 16, 8, 0]) {
    const candidate = JSON.stringify(
      items.map((i) => ({ s: i.sku, q: i.quantity, n: nameLen ? i.name.slice(0, nameLen) : '' }))
    );
    if (candidate.length <= 499) { cartMeta = candidate; break; }
  }
  if (!cartMeta) {
    return res.status(400).json({ error: 'Cart has too many items for Stripe metadata; reduce items.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((i) => ({
        price_data: {
          currency,
          product_data: {
            name: i.name.slice(0, 127),
            ...(i.img
              ? { images: [`https://aphoriabeauty.com${i.img}`] }
              : {}),
          },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: [
          'US', 'CA', 'GB', 'AU', 'MX', 'DE', 'FR', 'ES', 'IT', 'NL',
          'BR', 'JP', 'KR', 'SG', 'AE', 'NZ', 'SE', 'NO', 'DK', 'CH',
          'PT', 'BE', 'AT', 'IE', 'PL', 'CZ', 'HU', 'RO', 'GR', 'FI',
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      success_url: `${origin}/thank-you?provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?cart=open`,
      ...(email ? { customer_email: email } : {}),
      payment_intent_data: {
        ...(email ? { receipt_email: email } : {}),
      },
      metadata: {
        discountCode: discountCode || '',
        cart: cartMeta,
      },
      locale: 'auto',
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[stripe-create-checkout]', msg);
    return res.status(500).json({ error: msg });
  }
}
