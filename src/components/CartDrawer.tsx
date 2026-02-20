import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Lock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const FREE_SHIPPING_THRESHOLD = 50;

const CartDrawer: React.FC = () => {
  const { items, isOpen, isCheckingOut, close, removeItem, updateQuantity, checkout, subtotal, totalItems } = useCartStore();
  const sub = subtotal();
  const total = totalItems();
  const shippingProgress = Math.min((sub / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - sub, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-aphoria-black/8 bg-aphoria-black">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-aphoria-gold" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white">
                  Your Cart
                </span>
                {total > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-aphoria-gold text-[9px] font-bold text-white">
                    {total}
                  </span>
                )}
              </div>
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close cart"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Bar */}
            {sub < FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 bg-aphoria-bg/60 border-b border-aphoria-black/5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-aphoria-mid mb-2">
                  Add <span className="text-aphoria-black font-bold">${remaining.toFixed(2)}</span> for free shipping
                </p>
                <div className="h-[3px] w-full rounded-full bg-aphoria-black/8 overflow-hidden">
                  <motion.div
                    className="h-full bg-aphoria-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
            {sub >= FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-3 bg-aphoria-green/5 border-b border-aphoria-green/10">
                <p className="text-[10px] uppercase tracking-[0.24em] text-aphoria-green font-semibold">
                  ✓ Free shipping unlocked
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-aphoria-bg flex items-center justify-center">
                    <ShoppingBag size={24} className="text-aphoria-mid" strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-[15px] font-brand font-light text-aphoria-black mb-1">Your cart is empty</p>
                    <p className="text-[12px] text-aphoria-mid">Add a product to start your transformation.</p>
                  </div>
                  <button
                    onClick={close}
                    className="text-[10px] uppercase tracking-[0.3em] font-semibold text-aphoria-gold hover:text-aphoria-black transition-colors"
                  >
                    Continue Shopping →
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="flex gap-4 py-4 border-b border-aphoria-black/6 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl bg-aphoria-bg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        style={{ mixBlendMode: 'multiply', filter: 'brightness(1.2)' }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-aphoria-black leading-tight mb-0.5 truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-aphoria-mid mb-2">{item.variantTitle}</p>

                      <div className="flex items-center justify-between">
                        {/* Qty controls */}
                        <div className="flex items-center gap-2 border border-aphoria-black/10 rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="text-aphoria-mid hover:text-aphoria-black transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-[12px] font-medium w-4 text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="text-aphoria-mid hover:text-aphoria-black transition-colors"
                            aria-label="Increase"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[14px] font-semibold text-aphoria-black tabular-nums">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-aphoria-mid/40 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-aphoria-black/8 px-6 py-6 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-aphoria-mid font-semibold">Subtotal</span>
                  <span className="text-[20px] font-light text-aphoria-black tabular-nums">${sub.toFixed(2)}</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={checkout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-3 bg-aphoria-black text-white rounded-full py-4 text-[11px] uppercase tracking-[0.28em] font-bold hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {isCheckingOut ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Complete Order</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Trust */}
                <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-aphoria-mid">
                  <Lock size={9} />
                  Secure checkout · 60-Day Guarantee
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
