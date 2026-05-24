/**
 * CJDropshipping Open API helper.
 * Docs: https://developers.cjdropshipping.com
 *
 * Required env vars:
 *   CJ_API_KEY      — your CJ API key in the new format CJUserNum@api@xxxxxxxx
 *                     (generate at https://www.cjdropshipping.com/my.html#/apikey)
 *
 * Optional (per-product VID overrides — keep VIDs out of source so they can be rotated):
 *   CJ_VID_REF_GOLD_S1
 *   CJ_VID_REF_GOLD_M2
 *   CJ_VID_REF_AVO_S1
 *
 * Token TTL: access token 15 days, refresh token 180 days.
 * Note: /getAccessToken can only be called once every 5 minutes per CJ docs,
 * so we cache aggressively and only re-authenticate when token is near expiry.
 */

const CJ_BASE = 'https://developers.cjdropshipping.com/api2.0/v1';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getCJAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) throw new Error('CJ_API_KEY must be set');

  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  const data = (await res.json()) as {
    code?: number;
    data?: { accessToken: string; accessTokenExpiryDate?: string };
    message?: string;
  };
  if (!data.data?.accessToken) {
    throw new Error(`CJ auth failed: ${data.message || JSON.stringify(data)}`);
  }
  // Use the expiry date from CJ if provided; otherwise default to 14 days (one less than the 15-day cap).
  const expiresAt = data.data.accessTokenExpiryDate
    ? new Date(data.data.accessTokenExpiryDate).getTime()
    : Date.now() + 14 * 24 * 60 * 60 * 1000;
  cachedToken = { token: data.data.accessToken, expiresAt };
  return cachedToken.token;
}

const SKU_TO_VID_ENV: Record<string, string | undefined> = {
  'REF_GOLD_S1': process.env.CJ_VID_REF_GOLD_S1,
  'REF_GOLD_M2': process.env.CJ_VID_REF_GOLD_M2,
  'REF_AVO_S1':  process.env.CJ_VID_REF_AVO_S1,
};

// Runtime cache so we don't hit CJ /product/list on every order
const vidLookupCache = new Map<string, string>();

/**
 * Resolves a local SKU (e.g. "REF_GOLD_S1") to its CJ Variant VID.
 *
 * Resolution order:
 *   1. Hardcoded env var override (CJ_VID_REF_GOLD_S1, etc.) — fastest, used in production
 *   2. Lookup cache (in-memory, per warm Vercel function)
 *   3. CJ /product/list?productSku=... — looks up the variant by the SKU you set in your CJ panel
 *
 * If your CJ products' "Variant SKU" field matches our local SKUs (REF_GOLD_S1 etc.)
 * you don't need to set any CJ_VID env vars — the lookup is automatic.
 */
export async function skuToCJVariantVid(sku: string): Promise<string | undefined> {
  if (SKU_TO_VID_ENV[sku]) return SKU_TO_VID_ENV[sku];
  const cached = vidLookupCache.get(sku);
  if (cached) return cached;

  try {
    const token = await getCJAccessToken();
    // CJ /product/list supports productSku as filter; matches Variant SKU too on most accounts.
    const url = `${CJ_BASE}/product/list?productSku=${encodeURIComponent(sku)}&pageSize=10&pageNum=1`;
    const res = await fetch(url, { headers: { 'CJ-Access-Token': token } });
    const json = (await res.json()) as { data?: { list?: Array<{ vid?: string; variants?: Array<{ vid: string; variantSku?: string }> }> } };
    const products = json.data?.list || [];
    for (const p of products) {
      // Some endpoints return variants nested
      const variants = p.variants || [];
      const match = variants.find((v) => v.variantSku === sku);
      if (match?.vid) {
        vidLookupCache.set(sku, match.vid);
        return match.vid;
      }
      // Otherwise the top-level vid (single-variant product)
      if (p.vid) {
        vidLookupCache.set(sku, p.vid);
        return p.vid;
      }
    }
  } catch (err) {
    console.error('[cj] auto-lookup failed for', sku, err);
  }
  return undefined;
}

export interface CreateCJOrderInput {
  /** Unique idempotency key — pass the PayPal/Stripe order id */
  orderNumber: string;
  email: string;
  shipping: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;     // ISO-2 (e.g. 'US', 'MX')
    phone?: string;
  };
  items: Array<{ sku: string; quantity: number }>;
  /** CJ logistic name. Defaults to CJPacket. Configure in CJ panel for cheapest available. */
  logisticName?: string;
}

export async function createCJOrder(input: CreateCJOrderInput) {
  const token = await getCJAccessToken();

  const resolved = await Promise.all(
    input.items.map(async (i) => {
      const vid = await skuToCJVariantVid(i.sku);
      return vid ? { vid, quantity: i.quantity } : null;
    })
  );
  const products = resolved.filter(Boolean) as Array<{ vid: string; quantity: number }>;

  if (products.length === 0) {
    throw new Error(`No CJ Variant VIDs mapped for SKUs: ${input.items.map((i) => i.sku).join(', ')}`);
  }

  const body = {
    orderNumber: input.orderNumber,
    shippingZip: input.shipping.postalCode,
    shippingCountryCode: input.shipping.country,
    shippingCountry: input.shipping.country,
    shippingProvince: input.shipping.state,
    shippingCity: input.shipping.city,
    shippingAddress: input.shipping.line1 + (input.shipping.line2 ? ' ' + input.shipping.line2 : ''),
    shippingAddress2: input.shipping.line2 || '',
    shippingCustomer: input.shipping.name,
    shippingPhone: input.shipping.phone || '0000000000',
    email: input.email,
    logisticName: input.logisticName || 'CJPacket',
    fromCountryCode: 'CN',
    products,
  };

  const res = await fetch(`${CJ_BASE}/shopping/order/createOrder`, {
    method: 'POST',
    headers: { 'CJ-Access-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as { code?: number; data?: unknown; message?: string };
  if (!res.ok || (json.code && json.code !== 200)) {
    throw new Error(`CJ createOrder failed: ${json.message || JSON.stringify(json)}`);
  }
  return json.data;
}
