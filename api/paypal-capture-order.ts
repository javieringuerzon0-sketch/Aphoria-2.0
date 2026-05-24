import type { VercelRequest, VercelResponse } from '@vercel/node';
import { paypalFetch } from './_paypal-client.js';
import { fulfillOrder } from './_post-order.js';

interface CaptureBody {
  orderID: string;
}

interface PayPalShippingAddress {
  address_line_1?: string;
  address_line_2?: string;
  admin_area_1?: string;   // state
  admin_area_2?: string;   // city
  postal_code?: string;
  country_code?: string;
}

interface PayPalCaptureResponse {
  id: string;
  status: string;
  payer?: {
    email_address?: string;
    name?: { given_name?: string; surname?: string };
    phone?: { phone_number?: { national_number?: string } };
  };
  purchase_units?: Array<{
    custom_id?: string;
    shipping?: {
      name?: { full_name?: string };
      address?: PayPalShippingAddress;
    };
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
        amount: { currency_code: string; value: string };
      }>;
    };
  }>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { orderID } = (req.body || {}) as CaptureBody;
  if (!orderID) return res.status(400).json({ error: 'orderID required' });

  try {
    const r = await paypalFetch(`/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: { 'PayPal-Request-Id': orderID }, // idempotency key
    });

    if (!r.ok) {
      const t = await r.text().catch(() => '');
      console.error('[paypal-capture-order]', r.status, t);
      return res.status(500).json({ error: `PayPal ${r.status}: ${t}` });
    }

    const data = (await r.json()) as PayPalCaptureResponse;
    const unit = data.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];
    const shipping = unit?.shipping;
    const addr = shipping?.address;
    const payer = data.payer;

    type CompactItem = { s: string; q: number; n: string };
    let cartItems: CompactItem[] = [];
    try {
      if (unit?.custom_id) cartItems = JSON.parse(unit.custom_id) as CompactItem[];
    } catch {
      console.warn('[paypal-capture-order] could not parse custom_id cart', orderID);
    }

    const payerName = [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(' ').trim();
    const fullName = shipping?.name?.full_name || payerName;
    const amount = capture?.amount?.value ? parseFloat(capture.amount.value) : 0;
    const currency = capture?.amount?.currency_code || 'USD';

    // Fulfillment runs in background; we don't make the buyer wait for CJ/Omnisend
    fulfillOrder({
      provider: 'paypal',
      providerOrderId: data.id,
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
        phone: payer?.phone?.phone_number?.national_number || undefined,
      },
      items: cartItems.map((i) => ({ sku: i.s, quantity: i.q, name: i.n })),
      currency,
      amount,
      // PayPal has no `livemode` field on capture responses, so derive from PAYPAL_MODE.
      // Anything other than 'live' is treated as sandbox → fulfillment skips externals.
      livemode: (process.env.PAYPAL_MODE || 'sandbox').toLowerCase() === 'live',
    }).catch((err) => {
      console.error('[paypal-capture-order] fulfillOrder failed', orderID, err);
    });

    return res.status(200).json({
      ok: true,
      orderId: data.id,
      status: data.status,
      amount,
      currency,
      email: payer?.email_address || null,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[paypal-capture-order]', msg);
    return res.status(500).json({ error: msg });
  }
}
