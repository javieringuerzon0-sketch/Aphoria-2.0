import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCart = () => {
    const cart = document.getElementById('main-cart') as any;
    if (cart) cart.showModal();
  };

  const brandTone = isScrolled ? 'text-aphoria-black/90' : 'text-white/95';
  const linkTone = isScrolled
    ? 'text-aphoria-black/70 hover:text-aphoria-black'
    : 'text-white/70 hover:text-white';
  const iconTone = isScrolled ? 'text-aphoria-black/80' : 'text-white';
  const buttonBorder = isScrolled ? 'border-aphoria-black/20' : 'border-white/25';
  const buttonText = isScrolled ? 'text-aphoria-black' : 'text-white/80';
  const textGlow = isScrolled
    ? '0 1px 8px rgba(255,255,255,0.35)'
    : '0 2px 14px rgba(0,0,0,0.55)';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        {!isScrolled && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 via-black/10 to-transparent"
          ></div>
        )}
        <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between">
          <a
            href="#"
            className={`font-brand text-[22px] md:text-[26px] font-medium uppercase tracking-[0.32em] leading-none transition-colors duration-300 ${brandTone}`}
            style={{ textShadow: textGlow }}
          >
            Aphoria
          </a>

          <div className="hidden md:flex items-center gap-10" style={{ textShadow: textGlow }}>
            <a href="#science" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Science</a>
            <a href="#ritual" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Ritual</a>
            <a href="#ritual" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Bundle</a>
            <a href="#about" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>About</a>
            <a href="#goldmask" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>24 Gold Mask</a>
            <a href="#avocadomask" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Avocado Mask</a>
            <a href="#contact" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Contacto</a>

            <div className={`hidden h-5 w-px md:block ${isScrolled ? 'bg-aphoria-black/15' : 'bg-white/15'}`}></div>

            <button
              onClick={openCart}
              className={`relative inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}
              aria-label="View cart"
            >
              <div className="relative">
                <ShoppingBag size={16} strokeWidth={1.5} />
                {/* Cart count badge - shows when items in cart */}
                <span
                  className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-aphoria-gold text-[8px] font-bold text-white"
                  style={{ display: 'none' }}
                  data-cart-count
                >
                  0
                </span>
              </div>
              Cart
            </button>

            <button className={`group relative overflow-hidden rounded-full border px-6 py-2 text-[11px] font-medium uppercase tracking-[0.28em] transition-all duration-500 hover:border-white/60 hover:text-aphoria-black ${buttonBorder} ${buttonText}`}>
              <span className="relative z-10">Shop Now</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0"
              ></span>
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/5 transition-all duration-300 hover:bg-white/10 ${buttonBorder} ${iconTone}`}
              style={{ filter: isScrolled ? 'drop-shadow(0 1px 6px rgba(255,255,255,0.35))' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/5 transition-all duration-300 hover:bg-white/10 ${buttonBorder} ${iconTone}`}
              style={{ filter: isScrolled ? 'drop-shadow(0 1px 6px rgba(255,255,255,0.35))' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }}
              aria-label="View cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-brand text-[22px] font-medium uppercase tracking-[0.32em] text-white/95">Aphoria</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-[16px] font-medium uppercase tracking-[0.2em] text-white/85">
              <a href="#science" onClick={() => setIsMenuOpen(false)}>Science</a>
              <a href="#ritual" onClick={() => setIsMenuOpen(false)}>Ritual</a>
              <a href="#ritual" onClick={() => setIsMenuOpen(false)}>Bundle</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#journal" onClick={() => setIsMenuOpen(false)}>Journal</a>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => { openCart(); setIsMenuOpen(false); }}
                className="flex-1 rounded-full border border-white/20 bg-transparent text-white px-3 py-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                View Cart
              </button>
              <button
                className="flex-1 rounded-full bg-white text-aphoria-black px-3 py-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
