import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useUIStore } from '../store/useUIStore';
import { useCartStore } from '../store/useCartStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrolled, setScrolled } = useUIStore();
  const { open: openCart, totalItems } = useCartStore();
  const cartCount = totalItems();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled]);


  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + target);
    }
  };

  // Determine tones based on scroll position and route
  const isHomePage = location.pathname === '/';
  const isProductPage = location.pathname.includes('/product/');

  // Determine appearance based on scroll and current route
  const brandTone = (scrolled || !isHomePage) ? 'text-aphoria-black' : 'text-white';
  const linkTone = (scrolled || !isHomePage)
    ? 'text-aphoria-black/70 hover:text-aphoria-black'
    : 'text-white/70 hover:text-white';
  const iconTone = (scrolled || !isHomePage) ? 'text-aphoria-black/80' : 'text-white';
  const buttonBorder = (scrolled || !isHomePage) ? 'border-aphoria-black/20' : 'border-white/20';
  const buttonText = (scrolled || !isHomePage) ? 'text-aphoria-black' : 'text-white/90';

  // High-end text shadow for readability only on home page video
  const textGlow = (scrolled || !isHomePage)
    ? 'none'
    : '0 2px 14px rgba(0,0,0,0.35)';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-aphoria-bg border-b border-aphoria-black/15 shadow-sm' : 'bg-transparent'}`}>
        <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`font-brand text-[22px] md:text-[26px] font-medium uppercase tracking-[0.32em] leading-none transition-colors duration-300 ${brandTone}`}
              style={{ textShadow: textGlow }}
            >
              Aphoria
            </Link>

            {isProductPage && (
              <div className="flex items-center gap-3">
                <span className={`h-4 w-px ${scrolled || !isHomePage ? 'bg-aphoria-black/20' : 'bg-white/20'}`}></span>
                <span className={`text-[9px] md:text-[11px] uppercase tracking-[0.4em] font-bold ${brandTone} opacity-60`}>
                  {location.pathname.includes('gold-mask') ? '24 Gold Mask' : 'Avocado Mask'}
                </span>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-10" style={{ textShadow: textGlow }}>
            <Link to="/product/24-gold-mask" className={`text-[11px] font-bold uppercase tracking-[0.22em] text-aphoria-gold hover:text-aphoria-black transition-colors duration-300`}>Gold Mask</Link>
            <Link to="/product/avocado-mask" className={`text-[11px] font-bold uppercase tracking-[0.22em] text-aphoria-green hover:text-aphoria-black transition-colors duration-300`}>Avocado Mask</Link>
            <a href="/#science" onClick={(e) => handleAnchorClick(e, '#science')} className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Science</a>
            <a href="/#ritual" onClick={(e) => handleAnchorClick(e, '#ritual')} className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Ritual</a>
            <a href="/#bundle" onClick={(e) => handleAnchorClick(e, '#bundle')} className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Bundlee</a>
            <Link to="/contact" className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}>Contact</Link>

            <div className={`hidden h-5 w-px md:block ${scrolled || !isHomePage ? 'bg-aphoria-black/15' : 'bg-white/15'}`}></div>

            <button
              onClick={openCart}
              className={`relative inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${linkTone}`}
              aria-label="View cart"
            >
              <div className="relative">
                <ShoppingBag size={16} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-aphoria-gold text-[8px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
              Cart
            </button>

            <button
              onClick={openCart}
              className={`group relative overflow-hidden rounded-full border px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.28em] transition-all duration-500 hover:border-aphoria-gold ${buttonBorder} ${buttonText}`}
            >
              <span className="relative z-10 transition-colors group-hover:text-white">Shop Now</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-aphoria-gold transition-transform duration-500 group-hover:translate-y-0"
              ></span>
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white/5 transition-all duration-300 hover:bg-white/10 ${buttonBorder} ${iconTone}`}
              style={{ filter: (scrolled || !isHomePage) ? 'none' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white/5 transition-all duration-300 hover:bg-white/10 ${buttonBorder} ${iconTone}`}
              style={{ filter: (scrolled || !isHomePage) ? 'none' : 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }}
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col text-[16px] font-medium uppercase tracking-[0.2em] text-white/85">
              <a href="/#science" onClick={(e) => { setIsMenuOpen(false); handleAnchorClick(e, '#science'); }} className="py-3 border-b border-white/10">Science</a>
              <a href="/#ritual" onClick={(e) => { setIsMenuOpen(false); handleAnchorClick(e, '#ritual'); }} className="py-3 border-b border-white/10">Ritual</a>
              <a href="/#bundle" onClick={(e) => { setIsMenuOpen(false); handleAnchorClick(e, '#bundle'); }} className="py-3 border-b border-white/10">Bundle</a>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="py-3">Contact</Link>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => { openCart(); setIsMenuOpen(false); }}
                className="flex-1 rounded-full border border-white/20 bg-transparent text-white px-3 py-3 min-h-[44px] text-center text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                View Cart
              </button>
              <button
                onClick={() => { openCart(); setIsMenuOpen(false); }}
                className="flex-1 rounded-full bg-white text-aphoria-black px-3 py-3 min-h-[44px] text-center text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
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
