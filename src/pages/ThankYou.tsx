import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');
  const total = searchParams.get('total');
  const { clearCart } = useCartStore();

  // Clear cart as soon as the thank-you page mounts
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-aphoria-bg flex flex-col items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_rgba(198,161,91,0.12),_transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_bottom_left,_rgba(15,59,46,0.08),_transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
          className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full border border-aphoria-gold/30 bg-white shadow-[0_8px_40px_rgba(198,161,91,0.2)]"
        >
          <svg className="h-9 w-9 text-aphoria-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Label */}
        <span className="text-[10px] uppercase tracking-[0.4em] text-aphoria-gold font-medium">
          Order Confirmed
        </span>

        {/* Headline */}
        <h1 className="mt-4 text-[32px] md:text-[44px] font-brand font-light text-aphoria-black tracking-tight leading-tight">
          Your ritual is on its way.
        </h1>

        {/* Subtext */}
        <p className="mt-5 text-[15px] leading-relaxed text-aphoria-mid max-w-md mx-auto">
          Thank you for choosing Aphoria. You'll receive a confirmation email shortly with your order details and tracking information.
        </p>

        {/* Order details if available */}
        {(orderNumber || total) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border border-aphoria-black/10 bg-white px-8 py-5 shadow-sm"
          >
            {orderNumber && (
              <div className="text-[11px] uppercase tracking-[0.28em] text-aphoria-mid">
                Order <span className="text-aphoria-black font-semibold">#{orderNumber}</span>
              </div>
            )}
            {total && (
              <div className="text-[11px] uppercase tracking-[0.28em] text-aphoria-mid">
                Total <span className="text-aphoria-black font-semibold">${total}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* What's next */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { step: '01', label: 'Confirmation email', desc: 'Check your inbox' },
            { step: '02', label: 'Processing', desc: '1–2 business days' },
            { step: '03', label: 'Delivery', desc: '3–7 business days' },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-aphoria-black/8 bg-white px-4 py-5"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-aphoria-gold mb-2">
                {item.step}
              </div>
              <div className="text-[12px] font-medium text-aphoria-black mb-1">{item.label}</div>
              <div className="text-[11px] text-aphoria-mid">{item.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-aphoria-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white transition-all duration-500 hover:bg-aphoria-gold hover:text-aphoria-black shadow-lg"
          >
            Continue Shopping
          </Link>
          <Link
            to="/diagnostic"
            className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/15 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/70 transition-all duration-500 hover:border-aphoria-black/40 hover:text-aphoria-black"
          >
            Take the Diagnostic
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 text-[10px] uppercase tracking-[0.26em] text-aphoria-mid/60"
        >
          60-Day Money-Back Guarantee · Free Shipping · Secure Checkout
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ThankYou;
