import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isShopifyConfigured } from '../lib/shopify';

export interface CartItem {
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  img: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isCheckingOut: boolean;

  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  open: () => void;
  close: () => void;
  checkout: (discountCode?: string) => Promise<void>;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckingOut: false,

      addItem: (incoming) => {
        const { items } = get();
        const existing = items.find((i) => i.variantId === incoming.variantId);
        const qty = incoming.quantity ?? 1;

        if (existing) {
          set({
            items: items.map((i) =>
              i.variantId === incoming.variantId
                ? { ...i, quantity: i.quantity + qty }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...incoming, quantity: qty }] });
        }
      },

      removeItem: (variantId) =>
        set({ items: get().items.filter((i) => i.variantId !== variantId) }),

      updateQuantity: (variantId, qty) => {
        if (qty < 1) { get().removeItem(variantId); return; }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId ? { ...i, quantity: qty } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      checkout: async (discountCode?: string) => {
        const { items } = get();
        if (!items.length) return;

        set({ isCheckingOut: true });

        try {
          if (isShopifyConfigured) {
            // Build direct /cart/{variantId}:{qty} URL — instant redirect to payment
            const cartLines = items
              .filter((i) => i.variantId.startsWith('gid://'))
              .map((i) => {
                const numericId = i.variantId.split('/').pop()!;
                return `${numericId}:${i.quantity}`;
              })
              .join(',');

            if (!cartLines) {
              alert('Please add Shopify Variant IDs in constants.ts to enable checkout.');
              return;
            }

            const checkoutDomain = import.meta.env.VITE_SHOPIFY_CHECKOUT_DOMAIN || import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string;
            const base = import.meta.env.VITE_STORE_URL || window.location.origin;
            const returnTo = encodeURIComponent(base);
            let checkoutUrl = `https://${checkoutDomain}/cart/${cartLines}?return_to=${returnTo}`;
            if (discountCode) checkoutUrl += `&discount=${encodeURIComponent(discountCode)}`;
            window.location.href = checkoutUrl;
          } else {
            alert('Please add Shopify credentials to your .env file to enable checkout.');
          }
        } catch (err) {
          console.error('Checkout error:', err);
        } finally {
          set({ isCheckingOut: false });
        }
      },

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    {
      name: 'aphoria-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
