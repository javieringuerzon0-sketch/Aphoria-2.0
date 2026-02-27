import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import OptimizedImage from './OptimizedImage';
import { PRODUCTS } from '../constants';

const StickyBar: React.FC = () => {
  const [show, setShow] = useState(false);
  const scrollRafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Show after 20 seconds regardless of scroll
    const timer = setTimeout(() => {
      setShow(true);
    }, 20000);

    const handleScroll = () => {
      if (scrollRafRef.current !== undefined) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        // Show after 600px scroll
        if (window.scrollY > 600) {
          setShow(true);
        }
        scrollRafRef.current = undefined;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current !== undefined) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  const { addItem, checkout } = useCartStore();

  const goldMask = PRODUCTS.find(p => p.handle === '24-gold-mask');
  const avocadoMask = PRODUCTS.find(p => p.handle === 'avocado-mask');
  const bundleRegular = (goldMask?.variants['1pc'].price ?? 0) + (avocadoMask?.variants['1pc'].price ?? 0);
  const bundlePrice = bundleRegular - 10;

  const BUNDLE_DISCOUNT_CODE = import.meta.env.VITE_BUNDLE_DISCOUNT_CODE || '';

  const addBundleAndCheckout = () => {
    const gold = PRODUCTS.find(p => p.handle === '24-gold-mask');
    const avocado = PRODUCTS.find(p => p.handle === 'avocado-mask');
    if (gold) {
      const v = gold.variants['1pc'];
      addItem({ variantId: v.shopifyVariantId || `local-${v.id}`, title: gold.name, variantTitle: v.name, price: v.price, img: v.img });
    }
    if (avocado) {
      const v = avocado.variants['1pc'];
      addItem({ variantId: v.shopifyVariantId || `local-${v.id}`, title: avocado.name, variantTitle: v.name, price: v.price, img: v.img });
    }
    checkout(BUNDLE_DISCOUNT_CODE || undefined);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-aphoria-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between gap-3 md:gap-6">
            {/* Close button for "pop-up" feel */}
            <button
              onClick={() => setShow(false)}
              className="absolute -top-10 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-aphoria-black/40 hover:text-aphoria-black transition-colors border border-aphoria-black/5"
              aria-label="Close offer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Images + Info */}
            <div className="hidden md:flex items-center gap-4">
              {/* Product thumbnails */}
              <div className="flex items-center gap-1">
                <div className="w-14 h-14 rounded-lg bg-white border border-aphoria-black/8 flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src="/bundlee/goldmask-bundle.png"
                    alt="24 Gold Mask"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="w-14 h-14 rounded-lg bg-white border border-aphoria-black/8 flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src="/bundlee/avocado-bundelle.png"
                    alt="Avocado Mask"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-aphoria-gold font-medium">
                  Limited Time Protocol
                </p>
                <p className="text-[15px] font-bold text-aphoria-black">
                  Complete Transformation Kit • Save $10
                </p>
              </div>
            </div>

            {/* Mobile Product Info */}
            <div className="flex-1 md:hidden">
              <p className="text-[10px] uppercase tracking-wide text-aphoria-gold font-medium">
                Transformation Kit
              </p>
              <p className="text-[13px] font-bold text-aphoria-black">
                Save $10 Today
              </p>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Price */}
              <div className="text-right">
                <span className="text-[12px] md:text-[14px] text-aphoria-mid line-through mr-2">
                  ${bundleRegular.toFixed(2)}
                </span>
                <span className="text-[20px] md:text-[28px] font-bold text-aphoria-black tabular-nums">
                  ${bundlePrice.toFixed(2)}
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={addBundleAndCheckout}
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-4 min-h-[44px] bg-aphoria-black text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl group"
              >
                Claim Offer
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="border-t border-aphoria-black/5 bg-aphoria-bg/30 py-2 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.22em] text-aphoria-mid">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                60-Day Guarantee
              </div>
              <span className="hidden sm:inline text-aphoria-black/20">•</span>
              <div className="hidden sm:flex items-center gap-1">
                <svg className="w-3 h-3 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                Free Shipping
              </div>
              <span className="hidden sm:inline text-aphoria-black/20">•</span>
              <div className="hidden sm:block uppercase tracking-widest font-bold text-aphoria-green">Limited Stock Available</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBar;
