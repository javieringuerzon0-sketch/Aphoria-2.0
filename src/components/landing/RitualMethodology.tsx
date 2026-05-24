import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Sparkles, Sun, Leaf, Eye, ChevronRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../constants';

interface RitualMethodologyProps {
  productHandle?: string;
}

interface RitualStep {
  num: string;
  label: string;
  title: string;
  copy: string;
  video: string;
  icon: React.ReactNode;
  alt: string;
  // Optional CSS object-position override for the <video>. Tall videos with
  // the subject off-center get cropped poorly by the default 'center' value.
  // Use 'center 30%' to pull crop up, '65% center' to pull right, etc.
  videoPos?: string;
}

interface RitualData {
  // Intro split
  eyebrow: string;
  introLeftCopy: string;
  headlinePre: string;
  headlineItalic: string;
  introBottomCopy: string;
  // 3 steps
  steps: RitualStep[];
  // CTA
  ctaEyebrow: string;
  ctaHeadlinePre: string;
  ctaHeadlineItalic: string;
  ctaHeadlinePost: string;
  ctaButton: string;
}

// ──────────────────────────────────────────────────────────────────────────
// PRODUCT-SPECIFIC RITUAL DATA — edit per handle, do not merge sets.
// Each product has its own copy, videos, icons and CTA. Keeps Gold and
// Avocado URLs fully isolated.
// ──────────────────────────────────────────────────────────────────────────

// 24 Gold Mask — radiance, lift, sculpting.
const GOLD_RITUAL: RitualData = {
  eyebrow: 'The Ritual',
  introLeftCopy: 'A quieter, fifteen-minute protocol designed to reset the skin through precision, gold-infused chemistry, and visible transformation.',
  headlinePre: 'Three steps that rewrite every ',
  headlineItalic: 'complexion.',
  introBottomCopy: 'The 24K Gold Mask works in three deliberate movements — cleanse, apply, reveal — engineered to lift, brighten and resculpt the surface of the skin in a single sitting.',
  steps: [
    {
      num: '01',
      label: 'Cleanse',
      title: 'Prepare the canvas.',
      copy: 'Begin with a freshly cleansed face. The 24K Gold Mask works best when the skin is bare, dry, and ready to absorb the gold-infused complex. No primer, no oils, just you and the mirror.',
      video: '/goldmask-landing/ritual/step-01-cleanse.mp4',
      icon: <Droplet size={20} strokeWidth={1.5} />,
      alt: 'Step 1: cleansing the face before applying the 24K Gold Mask',
    },
    {
      num: '02',
      label: 'Apply',
      title: 'Layer the gold complex.',
      copy: 'Dispense a small amount onto the fingertips and massage upward across cheeks, forehead, and chin. The texture transforms from clear to gold as the bio-active peptides activate against the skin.',
      video: '/goldmask-landing/ritual/step-02-apply.mp4',
      icon: <Sparkles size={20} strokeWidth={1.5} />,
      alt: 'Step 2: applying the 24K Gold Mask in upward strokes',
    },
    {
      num: '03',
      label: 'Reveal',
      title: 'Lift, peel, transform.',
      copy: 'After 15 minutes, gently lift the edges and peel away in one continuous motion. Skin emerges tighter, brighter, visibly more sculpted. The glow lasts for days, not hours.',
      video: '/goldmask-landing/ritual/step-03-reveal.mp4',
      icon: <Sun size={20} strokeWidth={1.5} />,
      alt: 'Step 3: peeling off the golden mask to reveal radiant skin',
    },
  ],
  ctaEyebrow: 'Begin Your Ritual',
  ctaHeadlinePre: 'Fifteen minutes. ',
  ctaHeadlineItalic: 'A lifetime',
  ctaHeadlinePost: ' of difference.',
  ctaButton: 'Add 24K Gold Mask',
};

// Avocado Ceramide Mask — hydration, soothing, depuff. No gold/lift wording anywhere.
const AVOCADO_RITUAL: RitualData = {
  eyebrow: 'The Ritual',
  introLeftCopy: 'A ten-minute restorative protocol built around avocado lipids and ceramides — designed to soothe, depuff and rebuild the skin barrier from the under-eye outward.',
  headlinePre: 'Three steps that quiet every ',
  headlineItalic: 'complexion.',
  introBottomCopy: 'The Avocado Ceramide Mask works in three considered movements — open, apply, reveal — engineered to hydrate, calm and visibly soften tired skin in a single sitting.',
  steps: [
    {
      num: '01',
      label: 'Open',
      title: 'Unseal the ceramides.',
      copy: 'Twist open the jar and reveal the cooling jade hydrogel patches inside. Each one is steeped in avocado oil, panthenol and ceramide-NP — pre-charged to deliver hydration the moment they meet the skin.',
      video: '/avocado-landing/ritual/step-01-open.mp4',
      icon: <Leaf size={20} strokeWidth={1.5} />,
      alt: 'Step 1: opening the Avocado Ceramide Mask jar',
      // Video is 16:9 horizontal, card is 3:4 vertical → object-cover crops the sides.
      // The product (jar + lid) sits at ~38% horizontal in the source frame, so
      // anchor the crop at 38% to center the product inside the vertical card.
      videoPos: '38% center',
    },
    {
      num: '02',
      label: 'Apply',
      title: 'Place. Press. Settle in.',
      copy: 'Lift one patch with clean fingertips and place it gently along the under-eye crescent. Repeat on the other side. Press lightly to seal — the cooling rush activates within seconds.',
      video: '/avocado-landing/ritual/step-02-apply.mp4',
      icon: <Eye size={20} strokeWidth={1.5} />,
      alt: 'Step 2: applying the avocado hydrogel patches under the eyes',
      // Face is in the upper portion of the frame — pull crop up to center it.
      videoPos: 'center 30%',
    },
    {
      num: '03',
      label: 'Reveal',
      title: 'Hydrated. Calm. Renewed.',
      copy: 'After ten minutes, peel away and pat the remaining essence into the skin. Puffiness fades, fine lines soften, and the under-eye area is left visibly plumper, brighter and quieter.',
      video: '/avocado-landing/ritual/step-03-reveal.mp4',
      icon: <Droplet size={20} strokeWidth={1.5} />,
      alt: 'Step 3: revealing soothed, hydrated under-eye skin',
      // Face is in the upper portion of the frame — pull crop up to center it.
      videoPos: 'center 35%',
    },
  ],
  ctaEyebrow: 'Begin Your Ritual',
  ctaHeadlinePre: 'Ten minutes. ',
  ctaHeadlineItalic: 'A calmer',
  ctaHeadlinePost: ' you.',
  ctaButton: 'Add Avocado Ceramide Mask',
};

const RITUAL_BY_HANDLE: Record<string, RitualData> = {
  '24-gold-mask': GOLD_RITUAL,
  'avocado-mask': AVOCADO_RITUAL,
};

const VideoCard: React.FC<{ step: RitualStep; index: number }> = ({ step, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver: play when card is on screen, pause otherwise (mobile friendly).
  // Depends on [step.video] so that when the src changes (SPA navigation Gold↔Avocado),
  // the observer rebinds to the freshly-mounted <video> element (key={step.video} remounts it).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Kick playback immediately if the video is already in view at mount.
    // Some browsers don't honor the `autoplay` attribute reliably with dynamic src,
    // so we trigger play() manually too.
    const tryPlay = () => el.play().catch(() => { /* autoplay blocked on mobile, ignore */ });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);

    // Also fire an initial play attempt right after mount, in case the element
    // is already visible and the IO callback gets debounced.
    if (el.readyState >= 2) {
      tryPlay();
    } else {
      el.addEventListener('loadeddata', tryPlay, { once: true });
    }

    return () => {
      obs.disconnect();
      el.removeEventListener('loadeddata', tryPlay);
    };
  }, [step.video]);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Video panel */}
      <div className="relative overflow-hidden bg-aphoria-black/5 aspect-[3/4] sm:aspect-[3/4] lg:aspect-[3/4]">
        <video
          ref={videoRef}
          key={step.video}
          src={step.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={step.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: step.videoPos ?? 'center' }}
        />

        {/* Inner border with hover lift */}
        <div className="absolute inset-4 sm:inset-5 border border-white/45 transition-all duration-500 group-hover:border-white/70 pointer-events-none" />

        {/* Top-left icon circle */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
          <div className="h-11 w-11 rounded-full border border-white/45 bg-[rgba(248,244,236,0.72)] backdrop-blur-sm flex items-center justify-center text-aphoria-gold shadow-[0_10px_24px_rgba(23,18,14,0.10)]">
            {step.icon}
          </div>
        </div>
      </div>

      {/* Text below */}
      <div className="pt-5 border-b border-aphoria-black/10 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-aphoria-mid font-medium mb-2">
          {step.num} — {step.label}
        </p>
        <h3 className="font-brand text-[1.55rem] sm:text-[1.65rem] leading-[1] tracking-[-0.02em] text-aphoria-black mb-4 transition-colors duration-300 group-hover:text-aphoria-gold">
          {step.title}
        </h3>
        <p className="text-[14px] leading-7 text-aphoria-mid/90 font-light">
          {step.copy}
        </p>
      </div>
    </motion.div>
  );
};

const RitualMethodology: React.FC<RitualMethodologyProps> = ({ productHandle = '24-gold-mask' }) => {
  const addItemAndOpen = useCartStore((s) => s.addItemAndOpen);
  const product = PRODUCTS.find((p) => p.handle === productHandle);
  const variant = product?.variants['1pc'];
  const ritual = RITUAL_BY_HANDLE[productHandle] ?? GOLD_RITUAL;

  const handleAddToCart = () => {
    if (!product || !variant) return;
    addItemAndOpen({
      variantId: variant.id,
      title: product.name,
      variantTitle: variant.name,
      price: variant.price,
      img: variant.img,
    });
  };

  return (
    <section
      id="ritual"
      className="relative border-y border-aphoria-black/10 bg-aphoria-bg overflow-hidden"
    >
      {/* Subtle atmospheric wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,161,91,0.07),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(24,21,18,0.04),transparent_24%)]" />
      </div>

      <div className="relative max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-24">

        {/* Intro split */}
        <motion.div
          className="grid lg:grid-cols-[0.34fr_1fr] gap-10 lg:gap-16 items-end mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-aphoria-mid font-medium mb-6">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-aphoria-gold" />
              {ritual.eyebrow}
            </div>
            <p className="max-w-[15rem] text-[13px] leading-7 text-aphoria-mid/90 font-light">
              {ritual.introLeftCopy}
            </p>
          </div>

          <div>
            <h2 className="font-brand text-aphoria-black tracking-[-0.04em] leading-[0.94] text-[2.2rem] sm:text-[3rem] md:text-[3.7rem] lg:text-[4rem] xl:text-[4.5rem] max-w-[13ch] sm:max-w-[15ch] xl:max-w-[16ch] font-light">
              <span>{ritual.headlinePre}</span>
              <span className="italic text-aphoria-gold">{ritual.headlineItalic}</span>
            </h2>
            <p className="mt-6 max-w-[42rem] text-[15px] sm:text-[16px] leading-8 text-aphoria-mid/90 font-light">
              {ritual.introBottomCopy}
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {ritual.steps.map((step, i) => (
            <VideoCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* CTA block */}
        <motion.div
          className="mt-14 lg:mt-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold font-bold mb-4">
            {ritual.ctaEyebrow}
          </p>
          <h3 className="font-brand text-[1.8rem] sm:text-[2.4rem] lg:text-[2.8rem] tracking-[-0.02em] leading-[1.05] text-aphoria-black font-light max-w-[20ch] mb-7">
            {ritual.ctaHeadlinePre}
            <span className="italic text-aphoria-gold">{ritual.ctaHeadlineItalic}</span>
            {ritual.ctaHeadlinePost}
          </h3>

          <button
            onClick={handleAddToCart}
            className="group inline-flex items-center gap-3 bg-aphoria-black text-white rounded-full pl-10 pr-7 py-5 text-[11px] font-bold tracking-[0.24em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-[2px] active:scale-[0.98]"
          >
            <span>{ritual.ctaButton} — ${variant?.price.toFixed(2) ?? '54.99'}</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[10px] uppercase tracking-[0.22em] text-aphoria-mid">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-aphoria-gold" />
              30-Day Money-Back
            </span>
            <span className="text-aphoria-black/20">·</span>
            <span className="flex items-center gap-1.5">
              <Truck size={12} className="text-aphoria-gold" />
              Free Shipping Worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RitualMethodology;
