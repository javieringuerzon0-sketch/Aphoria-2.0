import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const COOKIE_KEY = 'aphoria_cookie_consent';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay slightly so it doesn't block the initial render
    const t = setTimeout(() => {
      if (!localStorage.getItem(COOKIE_KEY)) {
        setVisible(true);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-aphoria-black border-t border-aphoria-gold/20 px-6 py-5 md:px-10 md:py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.18)]"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            {/* Text */}
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-aphoria-gold font-bold mb-1">
                Cookie Notice
              </p>
              <p className="text-[13px] text-white/75 leading-relaxed">
                We use cookies to enhance your experience and analyze site performance.
                By continuing, you agree to our{' '}
                <Link to="/cookie-policy" className="text-white underline hover:text-aphoria-gold transition-colors">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-white underline hover:text-aphoria-gold transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 text-[10px] uppercase tracking-[0.22em] font-bold hover:border-white/40 hover:text-white transition-all"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-7 py-2.5 rounded-full bg-aphoria-gold text-aphoria-black text-[10px] uppercase tracking-[0.22em] font-bold hover:bg-white transition-all shadow-lg"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
