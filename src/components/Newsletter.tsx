import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import FadeInView from './FadeInView';
import { subscribeToNewsletter } from '../services/newsletterService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const response = await subscribeToNewsletter(email);
    if (response.success) {
      setStatus('success');
      setEmail('');
    } else {
      alert(response.message || 'Error subscribing. Please try again.');
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5] border-t border-aphoria-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">

          {/* Left Side: Text */}
          <div className="max-w-xl text-left">
            <FadeInView>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold mb-8 block">
                Member Exclusive
              </span>
              <h2 className="text-5xl lg:text-7xl font-brand font-light text-aphoria-black mb-6 leading-[0.9] tracking-tight">
                Get 10% Off <br /> <span className="italic font-serif text-aphoria-gold">Your First Order.</span>
              </h2>
              <p className="text-aphoria-mid/70 text-sm leading-relaxed max-w-sm mb-6">
                Join 10,247 women in the Aphoria Inner Circle and get your discount code instantly — plus our free 28-Day Clinical Protocol PDF.
              </p>
              <div className="space-y-3">
                {[
                  '10% off your first order (code sent instantly)',
                  'Free 28-Day Clinical Protocol PDF',
                  'Early access to new products',
                  'Member-only pricing & restocks',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13px] text-aphoria-black">
                    <span className="text-aphoria-gold font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>

          {/* Right Side: Form */}
          <div className="w-full pb-4">
            {status === 'success' ? (
              <div
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  animation: 'fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                }}
                className="space-y-4"
              >
                <div className="bg-aphoria-gold/10 text-aphoria-black border border-aphoria-gold/20 p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-aphoria-gold animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-widest">You're in. Welcome to Aphoria.</p>
                  </div>
                  <p className="text-[13px] text-aphoria-mid mb-4">Your 10% discount code:</p>
                  <div className="flex items-center gap-3 bg-white border border-aphoria-gold/30 rounded-lg px-5 py-4">
                    <span className="font-mono text-[22px] font-bold text-aphoria-black tracking-widest flex-1">APHORIA10</span>
                    <button
                      onClick={() => navigator.clipboard?.writeText('APHORIA10')}
                      className="text-[10px] uppercase tracking-widest font-bold text-aphoria-gold hover:text-aphoria-black transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-[11px] text-aphoria-mid mt-3">Apply this code at checkout. The 28-Day Protocol PDF is on its way to your inbox.</p>
                </div>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit} className="relative group mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="w-full bg-transparent border-b border-aphoria-black/20 px-0 py-6 text-xl lg:text-2xl font-light text-aphoria-black placeholder-aphoria-black/20 focus:outline-none focus:border-aphoria-gold transition-all duration-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-aphoria-black/40 group-hover:text-aphoria-gold transition-colors duration-300"
                    aria-label="Subscribe and get 10% off"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-aphoria-gold group-hover:w-full transition-all duration-700 ease-in-out" />
                </form>
                <p className="text-[10px] text-aphoria-mid/50 uppercase tracking-widest">
                  No spam. Unsubscribe anytime. Your privacy is protected.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
