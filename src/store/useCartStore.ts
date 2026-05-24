import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { pixel } from '../lib/metaPixel';

export interface CartItem {
  /** Internal SKU (e.g. "REF_GOLD_S1") — used as cart key, line reference, and Omnisend SKU */
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
  addItemAndOpen: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
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

      // Atomic: add item + open cart in a single set() → only 1 re-render cycle
      addItemAndOpen: (incoming) => {
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
            isOpen: true,
          });
        } else {
          set({ items: [...items, { ...incoming, quantity: qty }], isOpen: true });
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
          const email = (typeof window !== 'undefined') ? localStorage.getItem('omnisend_email') || undefined : undefined;

          const res = await fetch('/api/stripe-create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: items.map((i) => ({
                sku: i.variantId,
                name: `${i.title} — ${i.variantTitle}`.trim(),
                price: i.price,
                quantity: i.quantity,
                img: i.img,
              })),
              email,
              discountCode,
            }),
          });

          if (!res.ok) {
            const errText = await res.text().catch(() => '');
            throw new Error(`Checkout request failed (${res.status}): ${errText}`);
          }

          const data = await res.json() as { url?: string; error?: string };
          if (data.error || !data.url) {
            throw new Error(data.error || 'No checkout URL returned from Stripe');
          }

          // Fire InitiateCheckout right before leaving our domain
          pixel.initiateCheckout(get().subtotal(), get().totalItems());

          window.location.href = data.url;
        } catch (err) {
          console.error('Checkout error:', err);
          alert('We could not start the checkout. Please try again in a moment.');
        } finally {
          set({ isCheckingOut: false });
        }
      },

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    {
      name: 'aphoria-cart-v2',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
