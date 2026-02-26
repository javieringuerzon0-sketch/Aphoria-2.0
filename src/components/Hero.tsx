import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { HERO_COPY } from '../constants';

const Hero: React.FC = () => {
  const [videoReady, setVideoReady] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const stars = Array.from({ length: 5 });
  const highlightWord = 'Cellular';
  const headingParts = HERO_COPY.h1.split(highlightWord);
  const clientImages = [
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=160&h=160&q=80",
      alt: "Cliente verificada 1"
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=160&h=160&q=80",
      alt: "Cliente verificada 2"
    },
    {
      src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=facearea&w=160&h=160&q=80",
      alt: "Cliente verificada 3"
    },
    {
      src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=160&h=160&q=80",
      alt: "Cliente verificada 4"
    }
  ];


  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-24 md:pb-28 bg-black">
      {/* Cinematic Video Background - Maximum Quality */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 bg-black"
      >
        {/* Subtle Overlay - Premium contrast for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/5 to-black/20 z-10 pointer-events-none"></div>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
          className="w-full h-full object-cover object-center"
          style={{
            transform: 'translate3d(0,0,0)',
            willChange: 'transform',
            backgroundColor: '#000000'
          }}
          onPlaying={() => setVideoReady(true)}
        >
          <source src="/Hero%20video/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Black overlay — hides gray first frame until video is ready */}
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-black transition-opacity duration-300"
          style={{ opacity: videoReady ? 0 : 1 }}
        />

        {/* Bottom Gradient for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent z-10 pointer-events-none"></div>
      </motion.div>

      {/* Content Section - Professional Editorial Layout */}
      <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-lg"
        >
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-aphoria-gold/30 bg-white/5 px-4 py-2 text-[8px] uppercase tracking-[0.3em] text-white/85 backdrop-blur">
              Clinical Protocol
              <span className="h-[1px] w-6 bg-aphoria-gold/50"></span>
              28 Days
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-brand text-[26px] md:text-[36px] lg:text-[42px] font-medium leading-[1.18] tracking-[-0.01em] mb-3"
            style={{
              color: '#F5EFE6',
              textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            {headingParts.length > 1 ? (
              <>
                {headingParts[0]}
                <span className="text-aphoria-gold">{highlightWord}</span>
                {headingParts.slice(1).join(highlightWord)}
              </>
            ) : (
              HERO_COPY.h1
            )}
          </motion.h1>

          {/* Social Proof - MOVED UP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[2px] text-aphoria-gold">
                {stars.map((_, index) => (
                  <svg
                    key={index}
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2l2.83 6.02 6.64.57-5 4.33 1.5 6.5L12 16.9 6.03 19.4l1.5-6.5-5-4.33 6.64-.57L12 2z" />
                  </svg>
                ))}
              </div>
              <div className="text-[12px] font-medium text-white">4.9</div>
            </div>
            <div className="h-4 w-[1px] bg-white/30"></div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/80">
              <strong className="font-semibold">10,000+</strong> Women Trust Us
            </div>
          </motion.div>

          <p className="text-[9px] uppercase tracking-[0.24em] text-white/80 mb-4">
            Cellular renewal, barrier repair, and visible firmness in 28 days.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] md:text-[15px] lg:text-[16px] font-normal leading-[1.6] mb-8 max-w-md"
            style={{
              color: '#FFFFFF',
              opacity: 0.95,
              textShadow: '0 2px 15px rgba(0,0,0,0.4)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            {HERO_COPY.subheadline}
          </motion.p>

          {/* Guarantee Badge - MOVED UP & ENHANCED */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-aphoria-gold/40 bg-white/10 px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-sm"
          >
            <svg className="w-5 h-5 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">60-Day Money-Back</span>
            <span className="text-white/60">•</span>
            <span className="font-medium">Free Shipping</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <Link
              to="/product/avocado-mask"
              className="inline-flex items-center gap-3 px-12 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 shadow-lg hover:shadow-xl group"
              style={{ backgroundColor: '#0F3B2E', color: 'white' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#C6A15B'; (e.currentTarget as HTMLAnchorElement).style.color = '#111111'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#0F3B2E'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
            >
              Get 60-Day Supply
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform ml-2" />
            </Link>
            <a href="#science" className="rounded-full border border-white/30 bg-white/5 px-6 py-[12px] text-[9px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur transition-all duration-500 hover:border-white/60 hover:text-white">
              {HERO_COPY.ctaSecondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {clientImages.map((client, index) => (
                  <OptimizedImage
                    key={client.src}
                    src={client.src}
                    alt={client.alt}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border border-white/30 object-cover"
                    style={{ zIndex: 4 - index }}
                    loading="eager"
                    decoding="async"
                  />
                ))}
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/70">Verified women clients</div>
            </div>
          </motion.div>

          <div className="mt-8 overflow-hidden">
            <div className="whitespace-nowrap text-[10px] uppercase tracking-[0.26em] text-white/65">
              <span className="inline-block animate-[marquee_18s_linear_infinite]">
                Barrier repair / Collagen support / Clinical grade / Dermal resilience / Sensitive-skin safe /
              </span>
              <span className="inline-block animate-[marquee_18s_linear_infinite] ml-6">
                Barrier repair / Collagen support / Clinical grade / Dermal resilience / Sensitive-skin safe /
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/70 mb-2">Regimen</div>
              <div className="text-[15px] font-medium text-white">Night + Day</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/70 mb-2">Formula</div>
              <div className="text-[15px] font-medium text-white">Clinical Grade</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
              <div className="text-[9px] uppercase tracking-[0.28em] text-white/70 mb-2">Result</div>
              <div className="text-[15px] font-medium text-white">Visible Renewal</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Premium Animated */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 right-12 z-20 flex flex-col items-center gap-4"
      >
        <div className="h-20 w-[2px] bg-gradient-to-b from-white/40 to-white/10 relative overflow-hidden rounded-full">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-b from-white/0 via-white to-white/0"
          />
        </div>
        <span className="text-[9px] text-white/50 uppercase tracking-[0.25em] [writing-mode:vertical-lr] font-semibold">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
