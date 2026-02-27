import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Lock, Tag, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { DISCOUNTS } from '../constants';
import OptimizedImage from './OptimizedImage';

const FREE_SHIPPING_THRESHOLD = 50;

const CartDrawer: React.FC = () => {
  const { items, isOpen, isCheckingOut, close, removeItem, updateQuantity, checkout, subtotal, totalItems } = useCartStore();
  const sub = subtotal();
  const total = totalItems();
  const shippingProgress = Math.min((sub / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - sub, 0);

  // ── Discount logic ──────────────────────────────────────────────
  const [codeInput, setCodeInput] = useState('');
  const [manualCode, setManualCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState(false);

  const hasGold = items.some(i => i.title.toLowerCase().includes('gold'));
  const hasAvocado = items.some(i => i.title.toLowerCase().includes('avocado'));
  const isBundleInCart = hasGold && hasAvocado;

  // Auto bundle beats manual code
  const activeDiscount = isBundleInCart ? DISCOUNTS.BUNDLE : (manualCode ?? undefined);
  const BUNDLE_SAVINGS = 10;

  const applyCode = () => {
    const trimmed = codeInput.trim().toUpperCase();
    if (!trimmed) return;
    // Basic validation — accepts any non-empty string, Shopify will validate at checkout
    setManualCode(trimmed);
    setCodeError(false);
    setCodeInput('');
  };

  const removeCode = () => {
    setManualCode(null);
    setCodeError(false);
  };
  // ────────────────────────────────────────────────────────────────

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

                {/* ── Bundle auto-discount banner ── */}
                {isBundleInCart && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-aphoria-green/8 border border-aphoria-green/20 rounded-xl px-4 py-3"
                  >
                    <CheckCircle2 size={15} className="text-aphoria-green flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-aphoria-green uppercase tracking-[0.2em]">Bundle discount applied</p>
                      <p className="text-[10px] text-aphoria-mid">Code <span className="font-mono font-bold text-aphoria-black">{DISCOUNTS.BUNDLE}</span> — saves you <span className="font-bold text-aphoria-green">${BUNDLE_SAVINGS}.00</span></p>
                    </div>
                  </motion.div>
                )}

                {/* ── Manual discount code input (only if no auto-bundle) ── */}
                {!isBundleInCart && (
                  <div>
                    {manualCode ? (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between bg-aphoria-gold/8 border border-aphoria-gold/25 rounded-xl px-4 py-3"
                      >
                        <div className="flex items-center gap-2">
                          <Tag size={13} className="text-aphoria-gold" />
                          <span className="text-[11px] font-mono font-bold text-aphoria-black tracking-widest">{manualCode}</span>
                          <span className="text-[10px] text-aphoria-green font-bold uppercase tracking-wide">Applied</span>
                        </div>
                        <button onClick={removeCode} className="text-aphoria-mid/50 hover:text-red-400 transition-colors" aria-label="Remove code">
                          <X size={13} />
                        </button>
                      </motion.div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={codeInput}
                          onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeError(false); }}
                          onKeyDown={e => e.key === 'Enter' && applyCode()}
                          placeholder="Discount code"
                          className="flex-1 bg-aphoria-bg border border-aphoria-black/10 rounded-full px-4 py-2.5 text-[11px] uppercase tracking-widest text-aphoria-black placeholder:text-aphoria-mid/50 focus:outline-none focus:border-aphoria-gold transition-colors font-mono"
                          aria-label="Discount code"
                        />
                        <button
                          onClick={applyCode}
                          disabled={!codeInput.trim()}
                          className="px-5 py-2.5 rounded-full bg-aphoria-black text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-aphoria-gold hover:text-aphoria-black transition-all disabled:opacity-40"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Subtotal */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-aphoria-mid font-semibold">Subtotal</span>
                  <span className="text-[20px] font-light text-aphoria-black tabular-nums">${sub.toFixed(2)}</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => checkout(activeDiscount)}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-3 bg-aphoria-black text-white rounded-full py-4 text-[11px] uppercase tracking-[0.28em] font-bold hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {isCheckingOut ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Complete Order{activeDiscount ? ' — Discount Applied' : ''}</span>
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
