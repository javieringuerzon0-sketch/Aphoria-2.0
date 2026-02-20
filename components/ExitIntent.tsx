import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntent: React.FC = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('aphoria-exit-shown');

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasShown && !show) {
        setShow(true);
        localStorage.setItem('aphoria-exit-shown', 'true');
      }
    };

    // Solo en desktop
    if (window.innerWidth >= 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí integrar con Klaviyo/Mailchimp
    console.log('Email captured:', email);

    // Simular envío
    setSubmitted(true);

    // Cerrar después de mostrar confirmación
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-8 md:p-10 relative shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-aphoria-black/5 hover:bg-aphoria-black/10 transition-colors flex items-center justify-center text-aphoria-mid hover:text-aphoria-black"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!submitted ? (
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 1]
                  }}
                >
                  <span className="text-[64px]">✋</span>
                </motion.div>

                {/* Headline */}
                <h3 className="text-[28px] md:text-[32px] font-brand font-light text-aphoria-black mb-3 tracking-tight">
                  Wait! First-Time Offer
                </h3>

                {/* Subheadline */}
                <p className="text-[15px] md:text-[16px] text-aphoria-mid leading-relaxed mb-8">
                  Join <strong className="text-aphoria-black">10,000+ women</strong> and get{' '}
                  <strong className="text-aphoria-gold">15% off</strong> your first order
                  <br/>
                  <span className="text-[14px]">+ Free samples with every purchase</span>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-full border-2 border-aphoria-black/10 focus:border-aphoria-gold outline-none text-center text-[15px] transition-colors"
                    required
                  />

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    className="group/btn relative overflow-hidden w-full bg-gradient-to-r from-aphoria-green to-aphoria-green/90 text-white rounded-full py-4 text-[12px] uppercase tracking-[0.26em] font-semibold hover:scale-105 transition-all shadow-[0_12px_28px_rgba(15,59,46,0.25)] hover:shadow-[0_16px_36px_rgba(15,59,46,0.35)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Claim My 15% Off
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </button>

                  {/* Secondary CTA */}
                  <a
                    href="/collections/all"
                    className="w-full rounded-full border-2 border-aphoria-black/15 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/70 transition-all duration-300 hover:border-aphoria-gold hover:text-aphoria-gold hover:bg-aphoria-gold/5 flex items-center justify-center"
                  >
                    Shop Full Price
                  </a>

                  {/* No thanks dismiss */}
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="w-full text-[10px] uppercase tracking-[0.24em] text-aphoria-mid/60 hover:text-aphoria-mid transition-colors py-1"
                  >
                    No thanks, I'll pay full price
                  </button>
                </form>

                {/* Trust signals */}
                <div className="mt-6 pt-6 border-t border-aphoria-black/10">
                  <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-mid">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      60-Day Guarantee
                    </div>
                    <span className="text-aphoria-black/20">•</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                      </svg>
                      Free Shipping
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 rounded-full bg-aphoria-green/10 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-aphoria-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>

                <h3 className="text-[24px] font-brand text-aphoria-black mb-2">
                  Welcome to Aphoria!
                </h3>
                <p className="text-[15px] text-aphoria-mid">
                  Check your inbox for your 15% discount code
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntent;
