import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCart = () => {
    const cart = document.getElementById('main-cart') as any;
    if (cart) cart.showModal();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${isScrolled
            ? 'bg-aphoria-bg/80 backdrop-blur-[12px] py-4 border-aphoria-black/5'
            : 'bg-transparent py-8 border-transparent'
          }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 flex justify-between items-center relative">

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-aphoria-black"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Desktop Links Left */}
          <div className="hidden md:flex space-x-12 text-[11px] tracking-[0.12em] uppercase font-semibold text-aphoria-mid">
            <a href="#science" className="hover:text-aphoria-black transition-colors duration-300">Science</a>
            <a href="#ritual" className="hover:text-aphoria-black transition-colors duration-300">Ritual</a>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <a href="#" className="font-sans text-2xl font-light tracking-[-0.02em] text-aphoria-black">
              Aphoria
            </a>
          </div>

          {/* Desktop Links Right */}
          <div className="hidden md:flex items-center space-x-12 text-[11px] tracking-[0.12em] uppercase font-semibold text-aphoria-mid">
            <a href="#about" className="hover:text-aphoria-black transition-colors duration-300">About</a>
            <a href="#journal" className="hover:text-aphoria-black transition-colors duration-300">Journal</a>
            <button
              onClick={openCart}
              className="text-aphoria-black hover:opacity-70 transition-opacity"
              aria-label="View cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Cart Trigger */}
          <button
            onClick={openCart}
            className="md:hidden text-aphoria-black"
            aria-label="View cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-aphoria-bg flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-sans text-2x font-light tracking-tight">Aphoria</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-aphoria-black"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col space-y-8 text-2xl font-light tracking-tight text-aphoria-black">
              <a href="#science" onClick={() => setIsMenuOpen(false)}>Science</a>
              <a href="#ritual" onClick={() => setIsMenuOpen(false)}>Ritual</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#journal" onClick={() => setIsMenuOpen(false)}>Journal</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;