import type { VercelRequest, VercelResponse } from '@vercel/node';
import { paypalFetch } from './_paypal-client.js';

interface CartItemInput {
  sku: string;
  name: string;
  price: number;    // dollars
  quantity: number;
}

interface CreateOrderBody {
  items: CartItemInput[];
  email?: string;
  discountCode?: string;
  currency?: string;
}

const ALLOWED_COUNTRIES = [
  'US', 'CA', 'GB', 'AU', 'MX', 'DE', 'FR', 'ES', 'IT', 'NL',
  'BR', 'JP', 'KR', 'SG', 'AE', 'NZ', 'SE', 'NO', 'DK', 'CH',
  'PT', 'BE', 'AT', 'IE', 'PL', 'CZ', 'HU', 'RO', 'GR', 'FI',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { items = [], email, discountCode, currency = 'USD' } = (req.body || {}) as CreateOrderBody;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const itemTotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Bundle discount: 10% off if both gold + avocado present
  const hasGold = items.some((i) => i.name.toLowerCase().includes('gold'));
  const hasAvocado = items.some((i) => i.name.toLowerCase().includes('avocado'));
  const discountAmount = hasGold && hasAvocado ? itemTotal * 0.10 : 0;

  const total = +(itemTotal - discountAmount).toFixed(2);

  // Compact cart for capture/webhook fulfillment (PayPal custom_id has 127-char limit)
  let cartMeta = '';
  for (const nameLen of [40, 24, 16, 8, 0]) {
    const candidate = JSON.stringify(
      items.map((i) => ({ s: i.sku, q: i.quantity, n: nameLen ? i.name.slice(0, nameLen) : '' }))
    );
    if (candidate.length <= 127) { cartMeta = candidate; break; }
  }

  try {
    const r = await paypalFetch('/v2/checkout/orders', {
      method: 'POST',
      body: {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: 'aphoria-cart',
            custom_id: cartMeta || 'cart',
            description: 'Aphoria Beauty Order',
            amount: {
              currency_code: currency,
              value: total.toFixed(2),
              breakdown: {
                item_total: { currency_code: currency, value: itemTotal.toFixed(2) },
                discount: { currency_code: currency, value: discountAmount.toFixed(2) },
                shipping: { currency_code: currency, value: '0.00' },
              },
            },
            items: items.map((i) => ({
              name: i.name.slice(0, 127),
              sku: i.sku.slice(0, 127),
              quantity: String(i.quantity),
              unit_amount: { currency_code: currency, value: i.price.toFixed(2) },
              category: 'PHYSICAL_GOODS',
            })),
            shipping: {
              type: 'SHIPPING',
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              shipping_preference: 'GET_FROM_FILE',
              user_action: 'PAY_NOW',
              brand_name: 'Aphoria Beauty',
              locale: 'en-US',
              landing_page: 'NO_PREFERENCE',
            },
          },
        },
      },
    });

    if (!r.ok) {
      const t = await r.text().catch(() => '');
      console.error('[paypal-create-order]', r.status, t);
      return res.status(500).json({ error: `PayPal ${r.status}: ${t}` });
    }

    const data = (await r.json()) as { id: string; status: string };
    return res.status(200).json({ id: data.id, status: data.status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[paypal-create-order]', msg);
    return res.status(500).json({ error: msg });
  }
}

export { ALLOWED_COUNTRIES };
