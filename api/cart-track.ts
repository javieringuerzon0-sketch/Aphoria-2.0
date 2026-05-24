import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * POST /api/cart-track
 *
 * Syncs the current cart state to Omnisend.
 * - Creates a new cart record (first item added)
 * - Updates the cart on subsequent changes
 * - Deleting the cart (on checkout complete) is handled by Omnisend after the order webhook fires
 *
 * Once a cart exists in Omnisend and no order follows within ~1 hour,
 * the "Abandoned Cart" automation workflow fires automatically.
 */

interface CartProduct {
  productID: string;
  variantID: string;
  sku: string;
  name: string;
  price: number;      // in cents (e.g. 3899 = $38.99)
  quantity: number;
  imageUrl?: string;
  productUrl?: string;
}

interface CartTrackBody {
  cartID: string;
  email: string;
  cartSum: number;    // total in cents
  cartRecoveryUrl: string;
  currency?: string;
  products: CartProduct[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.OMNISEND_API_KEY?.trim();
  if (!apiKey) return res.status(500).json({ message: 'Omnisend not configured' });

  const body = req.body as CartTrackBody;
  const { cartID, email, cartSum, cartRecoveryUrl, currency = 'USD', products } = body;

  if (!cartID || !email || !products?.length) {
    return res.status(400).json({ message: 'cartID, email, and products are required' });
  }

  const now = new Date().toISOString();

  // Try PATCH first (update existing cart), then POST (create new)
  const omnisendCart = {
    cartID,
    email,
    currency,
    cartSum,
    cartRecoveryUrl,
    createdAt: now,
    updatedAt: now,
    products: products.map((p) => ({
      productID: p.productID,
      variantID: p.variantID,
      sku: p.sku,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      ...(p.imageUrl && { imageUrl: p.imageUrl }),
      ...(p.productUrl && { productUrl: p.productUrl }),
    })),
  };

  try {
    // Try PATCH first — update if cart already exists
    const patchRes = await fetch(`https://api.omnisend.com/v3/carts/${cartID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': apiKey },
      body: JSON.stringify({ ...omnisendCart, createdAt: undefined }), // no createdAt on update
    });

    if (patchRes.ok || patchRes.status === 200) {
      return res.status(200).json({ success: true, action: 'updated' });
    }

    // Cart doesn't exist yet — create it
    const postRes = await fetch('https://api.omnisend.com/v3/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': apiKey },
      body: JSON.stringify(omnisendCart),
    });

    if (!postRes.ok) {
      const err = await postRes.json().catch(() => ({}));
      return res.status(postRes.status).json({ message: err.message || 'Cart tracking failed' });
    }

    return res.status(200).json({ success: true, action: 'created' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
