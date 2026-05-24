import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { HERO_COPY } from '../constants';

// Premium beauty hero — single visual focus, single primary CTA.
// Reference: Augustinus Bader / La Mer / Sisley 2026 visual language.
const Hero: React.FC = () => {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Subtle fade of the scroll cue as the user starts scrolling
  useEffect(() => {
    const el = scrollIndicatorRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        el.style.opacity = String(Math.max(0, 1 - window.scrollY / 320));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const highlightWord = 'Younger from Day One.';
  const headingParts = HERO_COPY.h1.split(highlightWord);

  // Three credentialing pills — rendered with proper glassmorphism + hover lift.
  const pills: { label: string; value: string }[] = [
    { label: 'Regimen', value: 'Night + Day' },
    { label: 'Formula', value: 'Clinical Grade' },
    { label: 'Result', value: 'Visible Renewal' },
  ];

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-end pb-10 md:pb-28 bg-black">
      {/* Hero image — 2K WebP, no video. Object position keeps the model's face
          on the right third while the copy lives on the left. */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/hero/hero-main.webp"
          alt="Aphoria Beauty — clinical skincare"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: '60% center',
            // Subtle in-browser sharpening + warmth — preserves 2K source quality,
            // just lifts the contrast and saturation a notch so the image reads crisp.
            filter: 'contrast(1.06) saturate(1.08) brightness(1.03)',
            imageRendering: '-webkit-optimize-contrast',
          }}
          fetchPriority="high"
          decoding="async"
        />

        {/* Editorial overlay — only a soft darken on the lower-left where copy sits.
            Reduced from /65 to /40 so the source image stays crisp and luminous. */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/8 to-transparent" />
        {/* Subtle bottom fade for the CTA area — softened from /50 to /30 */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-xl"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 mb-4 md:mb-7"
          >
            <span className="h-[1px] w-6 md:w-8 bg-aphoria-gold/70" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.32em] md:tracking-[0.36em] text-white/85">
              Signature Treatment
            </span>
            <span className="hidden md:inline-block h-[3px] w-[3px] rounded-full bg-aphoria-gold/70" />
            <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.36em] text-white/65">
              Clinical Formula
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-brand text-[26px] md:text-[52px] lg:text-[60px] font-light leading-[1.1] md:leading-[1.05] tracking-[-0.02em] mb-3 md:mb-6"
            style={{
              color: '#F6EFE3',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            {headingParts.length > 1 ? (
              <>
                {headingParts[0]}
                <span className="italic text-aphoria-gold font-extralight">{highlightWord}</span>
                {headingParts.slice(1).join(highlightWord)}
              </>
            ) : (
              HERO_COPY.h1
            )}
          </motion.h1>

          {/* Subhead — single line, calm */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] md:text-[17px] font-light leading-[1.5] md:leading-[1.55] text-white/90 max-w-lg mb-5 md:mb-8"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          >
            Clinical results from day one — or your money back.
          </motion.p>

          {/* Primary CTA — single point of action */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-4"
          >
            <Link
              to="/product/24-gold-mask"
              className="primary-cta-glow group inline-flex items-center gap-3 md:gap-4 rounded-full bg-aphoria-gold px-7 md:px-10 py-[14px] md:py-[18px] text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] md:tracking-[0.28em] text-aphoria-black shadow-[0_18px_50px_-12px_rgba(198,161,91,0.6)] transition-all duration-500 hover:shadow-[0_24px_60px_-12px_rgba(198,161,91,0.85)] hover:-translate-y-0.5"
            >
              Start My Transformation
              <ChevronRight
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#science"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/80 hover:text-aphoria-gold transition-colors duration-500"
            >
              <span className="border-b border-white/30 group-hover:border-aphoria-gold transition-colors duration-500 pb-0.5">
                Learn the science
              </span>
              <ChevronRight size={11} className="opacity-70 group-hover:translate-x-0.5 transition-transform duration-500" />
            </a>
          </motion.div>

          {/* Social proof — one calm line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex items-center gap-4 text-white/85"
          >
            <div className="flex items-center gap-[3px] text-aphoria-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l2.83 6.02 6.64.57-5 4.33 1.5 6.5L12 16.9 6.03 19.4l1.5-6.5-5-4.33 6.64-.57L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] font-medium tracking-wide">4.9</span>
            <span className="h-3 w-[1px] bg-white/25" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">
              <strong className="font-semibold text-white/90">10,247</strong>{' '}
              Verified Women
            </span>
          </motion.div>

          {/* Credentialing pills — real glassmorphism + hover lift */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 hidden md:grid grid-cols-3 gap-4 max-w-lg"
          >
            {pills.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.78 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl px-5 py-4 cursor-default transition-all duration-500
                           border border-white/20 bg-white/[0.08] backdrop-blur-xl
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_36px_-18px_rgba(0,0,0,0.6)]
                           hover:border-aphoria-gold/50 hover:bg-white/[0.12]
                           hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_50px_-18px_rgba(198,161,91,0.45)]"
              >
                {/* gold inner glow on hover */}
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(198,161,91,0.18), transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/65 mb-2">{p.label}</div>
                  <div className="text-[15px] font-medium text-white tracking-tight transition-colors duration-500 group-hover:text-aphoria-gold">
                    {p.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — minimal, centered, no longer a vertical bar */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/55"
        style={{ transition: 'opacity 0.2s linear' }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
