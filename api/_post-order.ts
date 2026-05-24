import { createCJOrder } from './_cj-client.js';

export interface FulfillOrderInput {
  provider: 'paypal' | 'stripe';
  providerOrderId: string;          // idempotency key passed to CJ as orderNumber
  status: 'paid';
  email?: string;
  payerName?: string;
  shipping: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  items: Array<{ sku: string; quantity: number; name?: string }>;
  currency: string;
  amount: number;                    // major units (USD, not cents)
  livemode?: boolean;                // false for Stripe TEST mode → skip external systems
}

/**
 * Shared post-payment fulfillment pipeline.
 *
 * Triggered by:
 *   - /api/stripe-webhook       (checkout.session.completed)
 *   - /api/paypal-capture-order (synchronous after buyer return)
 *   - /api/paypal-webhook       (asynchronous backup)
 *
 * Steps (all best-effort, logged on failure but don't fail the whole pipeline):
 *   1. Create order in CJDropshipping (the actual fulfillment)
 *   2. Send Purchase event to Meta CAPI (server-side conversion tracking)
 *   3. Omnisend: upsert contact, create order, fire placed_order event
 *      (the event is what fires the "Placed order" workflow → confirmation email)
 *
 * Idempotency: in-memory dedupe by providerOrderId. CJ's own orderNumber check
 * and Omnisend's orderID also reject duplicates server-side.
 */
const fulfilled = new Set<string>();

// Map local SKU → public image URL used in Omnisend order/email.
// Falls back to a brand-generic image if SKU is unknown.
const SKU_IMAGE: Record<string, string> = {
  REF_GOLD_S1: 'https://aphoriabeauty.com/goldmask-landing/producto/goldmask-original.png',
  REF_GOLD_M2: 'https://aphoriabeauty.com/goldmask-landing/producto/goldmask-2pcs-white.png',
  REF_AVO_S1:  'https://aphoriabeauty.com/avocado-landing/producto/avocado-original.png',
};
const DEFAULT_PRODUCT_IMAGE = 'https://aphoriabeauty.com/goldmask-landing/producto/goldmask-original.png';

export async function fulfillOrder(input: FulfillOrderInput) {
  if (fulfilled.has(input.providerOrderId)) {
    console.log('[fulfill] already processed', input.providerOrderId);
    return;
  }
  fulfilled.add(input.providerOrderId);

  // TEST mode guard — skip external systems (CJ, Meta CAPI, Omnisend) when the
  // payment came from Stripe in test mode. We still want the function to run
  // (so logs confirm the webhook fired) but we don't want to:
  //   - Place a real CJ order (costs money, ships a real product)
  //   - Pollute the Meta pixel with test conversions
  //   - Create junk contacts in Omnisend that count against subscriber quota
  // Stripe's receipt email is unaffected — it's sent by Stripe directly,
  // independent of this fulfillment pipeline.
  if (input.livemode === false) {
    console.log('[fulfill] TEST mode — skipping CJ, Meta, Omnisend', {
      provider: input.provider,
      orderId: input.providerOrderId,
      email: input.email,
      amount: input.amount,
    });
    return;
  }

  const errors: Array<{ step: string; message: string }> = [];

  // 1. CJDropshipping order
  try {
    if (input.shipping?.line1 && input.items.length > 0) {
      await createCJOrder({
        orderNumber: input.providerOrderId,
        email: input.email || 'no-email@aphoriabeauty.com',
        shipping: input.shipping,
        items: input.items.map((i) => ({ sku: i.sku, quantity: i.quantity })),
      });
      console.log('[fulfill] CJ order created', input.providerOrderId);
    } else {
      console.warn('[fulfill] missing shipping or items, skipping CJ', input.providerOrderId);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[fulfill][CJ]', input.providerOrderId, message);
    errors.push({ step: 'cj', message });
  }

  // 2. Meta CAPI Purchase event
  try {
    const META_PIXEL_ID = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID;
    const META_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
    if (META_PIXEL_ID && META_TOKEN) {
      const eventId = `${input.provider}-${input.providerOrderId}`;
      const eventTime = Math.floor(Date.now() / 1000);
      const userData: Record<string, string> = {};
      if (input.email) userData.em = await sha256(input.email.trim().toLowerCase());
      if (input.payerName) {
        const [first, ...rest] = input.payerName.trim().split(' ');
        if (first) userData.fn = await sha256(first.toLowerCase());
        if (rest.length) userData.ln = await sha256(rest.join(' ').toLowerCase());
      }
      if (input.shipping.country) userData.country = await sha256(input.shipping.country.toLowerCase());
      if (input.shipping.postalCode) userData.zp = await sha256(input.shipping.postalCode);
      if (input.shipping.city) userData.ct = await sha256(input.shipping.city.toLowerCase().replace(/\s/g, ''));

      const body = {
        data: [
          {
            event_name: 'Purchase',
            event_time: eventTime,
            event_id: eventId,
            action_source: 'website',
            user_data: userData,
            custom_data: {
              currency: input.currency,
              value: input.amount,
              content_ids: input.items.map((i) => i.sku),
              num_items: input.items.reduce((acc, i) => acc + i.quantity, 0),
              order_id: input.providerOrderId,
            },
          },
        ],
      };

      const r = await fetch(
        `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      if (!r.ok) {
        const t = await r.text().catch(() => '');
        throw new Error(`Meta CAPI ${r.status}: ${t}`);
      }
      console.log('[fulfill] Meta Purchase sent', eventId);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[fulfill][Meta]', input.providerOrderId, message);
    errors.push({ step: 'meta', message });
  }

  // 3. Omnisend — upsert contact, create order, fire placed_order event
  try {
    const OMNISEND_API_KEY = process.env.OMNISEND_API_KEY;
    if (!OMNISEND_API_KEY) {
      throw new Error('OMNISEND_API_KEY is not set — confirmation email will NOT be sent');
    }
    if (!input.email) {
      throw new Error('Customer email missing from session — cannot send confirmation');
    }
    if (OMNISEND_API_KEY && input.email) {
      const now = new Date().toISOString();
      const [firstName, ...rest] = (input.payerName || '').trim().split(' ');
      const lastName = rest.join(' ');

      // 3a. Upsert contact so Omnisend knows who this buyer is.
      // Verify the response — silent failures here cascade and leave the order
      // attached to a stale or non-existent contact.
      const contactRes = await fetch('https://api.omnisend.com/v3/contacts', {
        method: 'POST',
        headers: { 'X-API-KEY': OMNISEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifiers: [
            {
              type: 'email',
              id: input.email,
              channels: { email: { status: 'subscribed', statusDate: now } },
            },
          ],
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          tags: ['customer', 'placed-order'],
          customProperties: {
            last_order_id: input.providerOrderId,
            last_order_total: input.amount,
            last_order_currency: input.currency,
            last_order_at: now,
          },
        }),
      });
      if (!contactRes.ok && contactRes.status !== 201 && contactRes.status !== 200) {
        const t = await contactRes.text().catch(() => '');
        console.warn('[fulfill][Omnisend][contact]', contactRes.status, t);
        // Don't throw — contact upsert may fail for various reasons (e.g. existing contact),
        // but we still want to attempt order + event creation.
      }

      // 3b. Create order in Omnisend → triggers "Order Confirmation" automation
      const omnisendOrder = {
        orderID: input.providerOrderId,
        email: input.email,
        createdAt: now,
        orderStatusURL: `https://aphoriabeauty.com/thank-you?order=${input.providerOrderId}`,
        currency: input.currency,
        orderSum: Math.round(input.amount * 100),
        subTotalSum: Math.round(input.amount * 100),
        orderStatus: 'paid',
        paymentStatus: 'paid',
        fulfillmentStatus: 'unfulfilled',
        shippingAddress: {
          firstName: firstName || input.shipping.name,
          lastName: lastName || '',
          address1: input.shipping.line1,
          address2: input.shipping.line2 || '',
          city: input.shipping.city,
          state: input.shipping.state,
          country: input.shipping.country,
          zip: input.shipping.postalCode,
          phone: input.shipping.phone || '',
        },
        products: input.items.map((i) => {
          const totalQty = input.items.reduce((a, x) => a + x.quantity, 0);
          const unitPrice = Math.round((input.amount / (totalQty || 1)) * 100);
          return {
            productID: i.sku,
            variantID: i.sku,
            sku: i.sku,
            title: i.name || i.sku,
            quantity: i.quantity,
            price: unitPrice,
            imageUrl: SKU_IMAGE[i.sku] || DEFAULT_PRODUCT_IMAGE,
          };
        }),
      };

      const orderRes = await fetch('https://api.omnisend.com/v3/orders', {
        method: 'POST',
        headers: { 'X-API-KEY': OMNISEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(omnisendOrder),
      });

      if (!orderRes.ok && orderRes.status !== 201 && orderRes.status !== 200) {
        const t = await orderRes.text().catch(() => '');
        if (orderRes.status === 403) {
          throw new Error(
            `Omnisend orders 403 Forbidden — OMNISEND_API_KEY lacks "Orders" scope. ` +
            `Fix: Omnisend → Store settings → Integrations & API → API Keys → enable Orders Read+Write. Body: ${t}`
          );
        }
        throw new Error(`Omnisend orders ${orderRes.status}: ${t}`);
      }
      console.log('[fulfill] Omnisend order created', input.providerOrderId);

      // 3c. Fire 'placed_order' event — triggers "Placed order" workflow in Omnisend.
      // POST /v3/orders alone does NOT fire workflows for custom stores. The /v3/events
      // endpoint only accepts scalar fields (no nested arrays/objects), so flatten products.
      const totalQty = input.items.reduce((a, x) => a + x.quantity, 0) || 1;
      const eventRes = await fetch('https://api.omnisend.com/v3/events', {
        method: 'POST',
        headers: { 'X-API-KEY': OMNISEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: input.email,
          systemName: 'placed_order',
          eventTime: now,
          fields: {
            orderID: input.providerOrderId,
            orderNumber: input.providerOrderId,
            orderSum: input.amount,
            currency: input.currency,
            itemCount: totalQty,
            firstProductSku: input.items[0]?.sku || '',
            firstProductName: input.items[0]?.name || '',
          },
        }),
      });
      if (!eventRes.ok && eventRes.status !== 204 && eventRes.status !== 200) {
        const t = await eventRes.text().catch(() => '');
        throw new Error(`Omnisend events ${eventRes.status}: ${t}`);
      }
      console.log('[fulfill] Omnisend placed_order event fired', input.providerOrderId);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[fulfill][Omnisend]', input.providerOrderId, message);
    errors.push({ step: 'omnisend', message });
  }

  if (errors.length) {
    console.error('[fulfill] completed with errors', input.providerOrderId, errors);
  }
}

async function sha256(s: string): Promise<string> {
  const { createHash } = await import('crypto');
  return createHash('sha256').update(s).digest('hex');
}
