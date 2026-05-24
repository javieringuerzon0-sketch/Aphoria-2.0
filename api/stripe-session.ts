import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from './_stripe-client.js';

/**
 * GET /api/stripe-session?id=cs_xxx
 * Called by /thank-you to show order details after Stripe redirects the buyer back.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'session id required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(id) as {
      id: string;
      amount_total?: number | null;
      currency?: string | null;
      payment_status?: string;
      customer_details?: { email?: string | null; name?: string | null } | null;
    };

    return res.status(200).json({
      ok: true,
      orderId: session.id,
      amount: session.amount_total != null ? session.amount_total / 100 : null,
      currency: ((session.currency as string | null | undefined) || 'usd').toUpperCase(),
      email: session.customer_details?.email || null,
      paymentStatus: session.payment_status,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[stripe-session]', msg);
    return res.status(500).json({ error: msg });
  }
}
