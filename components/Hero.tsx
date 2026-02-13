import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_COPY } from '../constants';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-32">
      {/* Cinematic Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-aphoria-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2940&auto=format&fit=crop"
          alt="Cinematic skincare texture"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aphoria-black/60 via-transparent to-transparent z-10"></div>
      </motion.div>

      {/* Content Section - Bottom Left Editorial Layout */}
      <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-light leading-[1.1] tracking-[-0.03em] text-white mb-8">
            {HERO_COPY.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-12 max-w-lg">
            {HERO_COPY.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <button className="px-8 py-4 border border-white text-white text-[13px] font-semibold uppercase tracking-[0.12em] hover:bg-white hover:text-aphoria-black transition-all duration-500">
              {HERO_COPY.ctaPrimary}
            </button>
            <a href="#science" className="text-white text-[13px] font-semibold uppercase tracking-[0.12em] group relative py-1">
              {HERO_COPY.ctaSecondary}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 right-12 z-20 flex flex-col items-center gap-4"
      >
        <div className="h-16 w-[1px] bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white"
          />
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;