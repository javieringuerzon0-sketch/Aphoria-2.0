import { useCart } from '@shopify/hydrogen-react';
import { isShopifyConfigured } from '../lib/shopify';

/**
 * Cart hook — uses real Shopify cart when configured,
 * falls back to the legacy shopify-cart element when not.
 */
export function useShopifyCart() {
  // Only call useCart when Shopify is configured (CartProvider is mounted)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cart = isShopifyConfigured ? useCart() : null;

  const openCart = () => {
    if (!isShopifyConfigured) {
      // Legacy fallback: shopify buy button embed
      const el = document.getElementById('main-cart') as any;
      if (el) el.showModal();
      return;
    }
    // With hydrogen-react, cart is managed via CartProvider state
    // Trigger your cart drawer here when you build it
    cart?.openDrawer?.();
  };

  const addToCart = async (merchandiseId: string, quantity = 1) => {
    if (!isShopifyConfigured || !cart) {
      console.warn('Shopify not configured — add credentials to .env');
      return;
    }
    await cart.linesAdd([{ merchandiseId, quantity }]);
  };

  const removeFromCart = async (lineId: string) => {
    if (!isShopifyConfigured || !cart) return;
    await cart.linesRemove([lineId]);
  };

  const totalQuantity = cart?.totalQuantity ?? 0;
  const lines = cart?.lines ?? [];
  const checkoutUrl = cart?.checkoutUrl ?? '#';

  return { openCart, addToCart, removeFromCart, totalQuantity, lines, checkoutUrl };
}
