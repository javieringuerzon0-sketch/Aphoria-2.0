import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Leaf, Award } from 'lucide-react';
import { TRUST_SIGNALS } from '../constants';

const TrustBar: React.FC = () => {
  const icons = [ShieldCheck, Truck, Leaf, Award];

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-white to-aphoria-bg/30 border-t border-b border-aphoria-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {TRUST_SIGNALS.badges.map((badge, index) => {
            const Icon = icons[index];
            const colors = [
              { bg: 'from-aphoria-gold/20 to-aphoria-gold/5', border: 'border-aphoria-gold/30', text: 'text-aphoria-gold', shadow: 'shadow-aphoria-gold/10' },
              { bg: 'from-aphoria-green/20 to-aphoria-green/5', border: 'border-aphoria-green/30', text: 'text-aphoria-green', shadow: 'shadow-aphoria-green/10' },
              { bg: 'from-aphoria-gold/20 to-aphoria-gold/5', border: 'border-aphoria-gold/30', text: 'text-aphoria-gold', shadow: 'shadow-aphoria-gold/10' },
              { bg: 'from-aphoria-green/20 to-aphoria-green/5', border: 'border-aphoria-green/30', text: 'text-aphoria-green', shadow: 'shadow-aphoria-green/10' }
            ][index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Card Container */}
                <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-aphoria-black/5 bg-white hover:border-aphoria-black/10 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                  {/* Icon Container */}
                  <div className={`mb-4 relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} ${colors.text} transition-all duration-500 group-hover:scale-110 shadow-lg ${colors.shadow} group-hover:shadow-xl`}>
                    <Icon className="w-7 h-7" strokeWidth={1.8} />

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Text */}
                  <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.28em] text-aphoria-black leading-relaxed">
                    {badge.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 pt-12 border-t border-aphoria-black/10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, #C6A15B, #0F3B2E)' }}>
              <svg className="w-8 h-8" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-brand font-light text-aphoria-black tracking-tight mb-4">
              {TRUST_SIGNALS.guarantee.headline}
            </h3>

            <p className="text-[15px] md:text-[16px] text-aphoria-mid leading-relaxed mb-8 max-w-2xl mx-auto">
              {TRUST_SIGNALS.guarantee.copy}
            </p>

            <a
              href="#ritual"
              className="inline-flex items-center gap-2 rounded-full bg-aphoria-green px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white shadow-[0_12px_28px_rgba(15,59,46,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(15,59,46,0.35)]"
            >
              <span className="text-[12px]">→</span>
              {TRUST_SIGNALS.guarantee.cta}
            </a>
          </div>
        </motion.div>

        {/* Press/Media Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-aphoria-black/10"
        >
          <p className="text-center text-[10px] uppercase tracking-[0.28em] text-aphoria-mid mb-8">
            As Featured In
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            {/* Placeholder for press logos - replace with actual logos */}
            <div className="text-[14px] font-serif italic text-aphoria-black">Vogue</div>
            <div className="text-[14px] font-serif text-aphoria-black">Harper's Bazaar</div>
            <div className="text-[14px] font-sans font-bold text-aphoria-black">WSJ</div>
            <div className="text-[14px] font-serif italic text-aphoria-black">Elle</div>
            <div className="text-[14px] font-sans text-aphoria-black">Monocle</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
