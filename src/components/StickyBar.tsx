import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { PRODUCTS } from '../constants';

const StickyBar: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar después de scrollear 2000px (aproximadamente después de ProductGallery)
      const scrolled = window.scrollY > 2000;
      setShow(scrolled);
    };

    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { addItem, checkout } = useCartStore();

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
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-aphoria-black/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between gap-3 md:gap-6">
            {/* Product Images + Info */}
            <div className="hidden md:flex items-center gap-4">
              {/* Product thumbnails */}
              <div className="flex items-center gap-1">
                <div className="w-14 h-14 rounded-lg bg-white border border-aphoria-black/8 flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src="/goldmask-landing/producto/producto%201%20pcs.png"
                    alt="24 Gold Mask"
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: 'multiply', filter: 'brightness(1.1)' }}
                  />
                </div>
                <div className="w-14 h-14 rounded-lg bg-white border border-aphoria-black/8 flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src="/bundlee/bundlle-avocado-transparent.png"
                    alt="Avocado Mask"
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: 'multiply', filter: 'brightness(1.1)' }}
                  />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-aphoria-gold font-medium">
                  Limited Time Offer
                </p>
                <p className="text-[15px] font-bold text-aphoria-black">
                  Complete Kit • Save $8.99
                </p>
              </div>
            </div>

            {/* Mobile Product Info */}
            <div className="flex-1 md:hidden">
              <p className="text-[10px] uppercase tracking-wide text-aphoria-gold font-medium">
                Complete Kit
              </p>
              <p className="text-[13px] font-bold text-aphoria-black">
                Save $8.99 Today
              </p>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Price */}
              <div className="text-right">
                <span className="text-[12px] md:text-[14px] text-aphoria-mid line-through mr-2">
                  $63.98
                </span>
                <span className="text-[20px] md:text-[28px] font-bold text-aphoria-black tabular-nums">
                  $54.99
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={addBundleAndCheckout}
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-12 py-3 md:py-4 min-h-[44px] bg-aphoria-black text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl group"
              >
                Shop Now
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
              <div className="hidden sm:block">Only 8 Left</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBar;
