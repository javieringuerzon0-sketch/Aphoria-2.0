import { createStorefrontClient } from '@shopify/hydrogen-react';

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const apiVersion = (import.meta.env.VITE_SHOPIFY_API_VERSION as string) || '2025-01';

export const isShopifyConfigured = Boolean(storeDomain && storefrontToken);

export const shopifyClient = createStorefrontClient({
  storeDomain,
  storefrontApiVersion: apiVersion,
  publicStorefrontToken: storefrontToken,
});

export const { getStorefrontApiUrl, getPublicTokenHeaders } = shopifyClient;

/** Generic Storefront API fetch — throws if unconfigured */
export async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error('Shopify not configured — add credentials to .env');
  }

  const res = await fetch(getStorefrontApiUrl(), {
    method: 'POST',
    headers: getPublicTokenHeaders({ contentType: 'json' }),
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);

  return data as T;
}
