import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isShopifyConfigured, storefrontFetch } from '../lib/shopify';
import { CREATE_CART_MUTATION } from '../lib/queries';

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
            // Real Shopify checkout
            const lines = items
              .filter((i) => i.variantId.startsWith('gid://'))
              .map((i) => ({ merchandiseId: i.variantId, quantity: i.quantity }));

            if (lines.length === 0) {
              alert('Agrega los Shopify Variant IDs en constants.ts para habilitar el checkout.');
              return;
            }

            const variables: Record<string, any> = { lines };
            if (discountCode) variables.discountCodes = [discountCode];

            const data = await storefrontFetch<any>(CREATE_CART_MUTATION, variables);
            const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
            if (checkoutUrl) {
              // Append return_to so the Shopify checkout logo links back to our frontend
              const returnTo = encodeURIComponent(
                import.meta.env.VITE_STORE_URL || window.location.origin
              );
              const separator = checkoutUrl.includes('?') ? '&' : '?';
              window.location.href = `${checkoutUrl}${separator}return_to=${returnTo}`;
            }
          } else {
            // No credentials: inform user
            alert('Agrega las credenciales de Shopify en el archivo .env para habilitar el checkout.');
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
