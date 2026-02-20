import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] border-t border-aphoria-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">

          {/* Left Side: Text */}
          <div className="max-w-xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold mb-8 block">
                The Inner Circle
              </span>
              <h2 className="text-5xl lg:text-7xl font-brand font-light text-aphoria-black mb-8 leading-[0.9] tracking-tight">
                Join the <br /> <span className="italic font-serif text-aphoria-gold">Laboratory.</span>
              </h2>
              <p className="text-aphoria-mid/70 text-sm leading-relaxed max-w-sm">
                Access to clinical protocols, early releases, and member-only pricing.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full pb-4">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-aphoria-gold/10 text-aphoria-black border border-aphoria-gold/20 p-6 rounded-sm flex items-center gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-aphoria-gold animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-widest">Welcome to the future.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent border-b border-aphoria-black/20 px-0 py-6 text-xl lg:text-2xl font-light text-aphoria-black placeholder-aphoria-black/20 focus:outline-none focus:border-aphoria-gold transition-all duration-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-aphoria-black/40 group-hover:text-aphoria-gold transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-aphoria-gold group-hover:w-full transition-all duration-700 ease-in-out" />
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
