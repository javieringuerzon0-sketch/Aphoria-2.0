import { useState, useEffect } from 'react';
import { isShopifyConfigured, storefrontFetch } from '../lib/shopify';
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from '../lib/queries';
import { PRODUCTS as LOCAL_PRODUCTS } from '../constants';
import type { Product } from '../types';

/** Fetch all products — returns local constants.ts data when Shopify is not configured */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(LOCAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isShopifyConfigured) return; // use local data

    setLoading(true);
    storefrontFetch<{ products: { nodes: any[] } }>(PRODUCTS_QUERY, { first: 10 })
      .then(({ products: { nodes } }) => {
        // Map Shopify response to our Product type
        const mapped: Product[] = nodes.map(shopifyProductToLocal);
        setProducts(mapped);
      })
      .catch((err) => {
        console.error('Shopify products fetch failed:', err);
        setError(err.message);
        // Keep showing local data on error
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

/** Fetch a single product by handle — returns local constants.ts data when not configured */
export function useProduct(handle: string) {
  const localProduct = LOCAL_PRODUCTS.find((p) => p.handle === handle) ?? null;
  const [product, setProduct] = useState<Product | null>(localProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isShopifyConfigured) return; // use local data

    setLoading(true);
    storefrontFetch<{ product: any }>(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then(({ product: node }) => {
        if (node) setProduct(shopifyProductToLocal(node));
      })
      .catch((err) => {
        console.error('Shopify product fetch failed:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [handle]);

  return { product, loading, error };
}

/** Maps a Shopify Storefront API product node to our local Product type */
function shopifyProductToLocal(node: any): Product {
  const getMetafield = (key: string) =>
    node.metafields?.find((m: any) => m?.key === key)?.value ?? '';

  const variants: Record<string, any> = {};
  node.variants?.nodes?.forEach((v: any, i: number) => {
    const key = i === 0 ? '1pc' : `${i + 1}pcs`;
    variants[key] = {
      name: v.title,
      price: parseFloat(v.price.amount),
      regularPrice: parseFloat(v.compareAtPrice?.amount ?? v.price.amount),
      id: v.id,
      img: v.image?.url ?? node.images?.nodes?.[0]?.url ?? '',
    };
  });

  return {
    id: node.handle,
    handle: node.handle,
    name: node.title,
    category: node.productType ?? '',
    tagline: getMetafield('tagline'),
    description: node.description,
    shortDesc: getMetafield('short_desc'),
    clinicalClassification: getMetafield('clinical_classification'),
    reviews: 0,
    variants,
    ugc: [],
    ingredients: getMetafield('ingredients'),
    video: getMetafield('video_url'),
    accordions: [],
    videoSection: { headline: '', stats: [], desc: '' },
  };
}
