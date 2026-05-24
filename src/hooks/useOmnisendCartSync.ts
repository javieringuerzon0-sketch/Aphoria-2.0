import { useEffect, useRef } from 'react';
import { useCartStore, CartItem } from '../store/useCartStore';

const CART_ID_KEY = 'omnisend_cart_id';
const EMAIL_KEY = 'omnisend_email';
const BASE_URL = 'https://aphoriabeauty.com';

function getOrCreateCartId(): string {
  try {
    let id = localStorage.getItem(CART_ID_KEY);
    if (!id) {
      id = `cart_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(CART_ID_KEY, id);
    }
    return id;
  } catch {
    return `cart_${Date.now()}`;
  }
}

function buildProductUrl(item: CartItem): string {
  const titleSlug = item.title.toLowerCase().replace(/\s+/g, '-');
  return `${BASE_URL}/product/${titleSlug}`;
}

function buildImageUrl(img: string): string {
  if (img.startsWith('http')) return img;
  return `${BASE_URL}${img}`;
}

async function syncCartToOmnisend(items: CartItem[]) {
  let email: string | null = null;
  try { email = localStorage.getItem(EMAIL_KEY); } catch {}
  if (!email || !items.length) return;

  const cartID = getOrCreateCartId();
  const cartSum = Math.round(items.reduce((acc, i) => acc + i.price * i.quantity, 0) * 100);
  const cartRecoveryUrl = `${BASE_URL}/?omnisendCartID=${cartID}`;

  const products = items.map((item) => ({
    productID: item.variantId,
    variantID: item.variantId,
    sku: item.variantId,
    name: `${item.title} — ${item.variantTitle}`,
    price: Math.round(item.price * 100),
    quantity: item.quantity,
    imageUrl: buildImageUrl(item.img),
    productUrl: buildProductUrl(item),
  }));

  try {
    await fetch('/api/cart-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartID, email, cartSum, cartRecoveryUrl, currency: 'USD', products }),
    });
  } catch {
    // Silently fail — cart tracking is non-critical
  }
}

/**
 * Syncs cart state to Omnisend whenever it changes.
 * Requires the user's email to be stored in localStorage (set on newsletter subscribe).
 * Powers the Abandoned Cart automation in Omnisend.
 */
export function useOmnisendCartSync() {
  const items = useCartStore((s) => s.items);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      syncCartToOmnisend(items);
    }, 1500); // debounce 1.5s to avoid rapid-fire calls on qty changes

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [items]);
}
