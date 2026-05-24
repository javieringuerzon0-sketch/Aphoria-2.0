import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { PRODUCTS } from '../../constants';

interface ShuffleReviewsProps {
  productHandle?: string;
}

interface ReviewCard {
  id: number;
  src: string;       // FRONT image
  backSrc: string;   // BACK image — must be different from src and from any other card's images
  user: string;
  text: string;
  // Optional CSS background-position override for tall images where the
  // default 'center' crop hides the face (e.g. portraits with the subject
  // in the upper third). Use 'center top', 'center 20%', etc.
  frontPos?: string;
  backPos?: string;
}

// Detect touch-only devices (no hover) — combines multiple signals because
// `(hover: none)` alone misses Chrome DevTools mobile emulation and some
// hybrid touch+mouse laptops. We treat a device as "touch" if EITHER the
// viewport is narrow OR the hover/pointer media queries say so.
const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const check = () => {
      const noHover = window.matchMedia('(hover: none)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const narrow = window.innerWidth < 1024;
      const hasTouchPoints = (navigator.maxTouchPoints ?? 0) > 0;
      setIsTouch(noHover || coarsePointer || (narrow && hasTouchPoints));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isTouch;
};

// ──────────────────────────────────────────────────────────────────────────
// PRODUCT-SPECIFIC REVIEWS — edit per handle, do not merge sets.
// Each product has its own 8 unique flip cards (16 images total: 8 front + 8
// back, all unique within the set). Keeps /product/24-gold-mask and
// /product/avocado-mask fully isolated even if the UI changes in the future.
// ──────────────────────────────────────────────────────────────────────────

// 24 Gold Mask — 8 flip cards, gold/radiance imagery.
const GOLD_REVIEWS_8: ReviewCard[] = [
  {
    id: 1,
    src:     '/goldmask-landing/ugc/freepik__beautiful-woman-in-her-early-30s-smiling-while-hol__2296.webp',
    backSrc: '/goldmask-landing/ugc/canvas-image-1765489180063.webp',
    user: '@morning_glow', text: 'I wake up glowing every single day.',
  },
  {
    id: 2,
    src:     '/goldmask-landing/ugc/freepik__woman-between-25-and-35-years-old-with-healthy-glo__2298.webp',
    backSrc: '/goldmask-landing/ugc/canvas-image-1765490110626.webp',
    user: '@skin_results', text: 'Firmer, brighter, smoother — all in one mask.',
  },
  {
    id: 3,
    src:     '/goldmask-landing/ugc/freepik__photorealistic-image-of-sofia-in-amodern-white-bat__2315.webp',
    backSrc: '/goldmask-landing/ugc/canvas-image-1765519474195.webp',
    user: '@skin_obsessed', text: 'My dermatologist approved and I can see why.',
  },
  {
    id: 4,
    src:     '/goldmask-landing/ugc/freepik__photorealistic-image-of-sofia-taking-amirror-selfi__2317.webp',
    backSrc: '/goldmask-landing/ugc/canvas-image-1765519592416.webp',
    user: '@beauty_science', text: 'The 24K gold is not just marketing — it works.',
  },
  {
    id: 5,
    src:     '/goldmask-landing/ugc/freepik__photorealistic-image-of-the-model-aphoriaaphoria-o__2322.webp',
    backSrc: '/goldmask-landing/ugc/canvas-image-1765519661800.webp',
    user: '@skin_clarity', text: 'Pores tightened, glow amplified. 10/10.',
  },
  {
    id: 6,
    src:     '/goldmask-landing/ugc/freepik__platform-freepik-ai-imagegeneratormodel-mysticaspe__2307.webp',
    backSrc: '/goldmask-landing/ugc/canvas-image-1765519809768.webp',
    user: '@aphoria_fan', text: 'Worth every penny. My skin loves this.',
  },
  {
    id: 7,
    src:     '/goldmask-landing/ugc/freepik__platform-freepik-ai-image-generatormodel-mysticasp__2311.webp',
    backSrc: '/goldmask-landing/ugc/freepik__-ugcphotographyvariations-id-goldugcen01-category-__2294.webp',
    user: '@radiant_skin', text: 'The texture and finish are absolutely luxurious.',
  },
  {
    id: 8,
    src:     '/goldmask-landing/ugc/freepik__platform-freepik-ai-image-generatormodel-mysticasp__42520.webp',
    backSrc: '/goldmask-landing/ugc/freepik__-ugcphotographyvariations-id-goldugcen01-category-__2295.webp',
    user: '@daily_ritual', text: 'I call this my Sunday skin reset. Game changer.',
  },
];

// Avocado Ceramide Mask — 8 flip cards, green/hydration imagery from /avocado-landing/ugc/.
// 16 unique slots: 8 front photoreal Freepik/Grok, 8 back canvas/raw UGC. No overlap.
const AVOCADO_REVIEWS_8: ReviewCard[] = [
  {
    id: 1,
    src:     '/avocado-landing/ugc/freepik__young-woman-with-jade-green-aphoria-eye-patches-ap__2286.webp',
    backSrc: '/avocado-landing/ugc/canvas-image-1765494737512.webp',
    user: '@jade_skin_ritual', text: 'These eye patches are everything. Zero puffiness by morning.',
    // Back: blonde woman with black off-shoulder sweater — face is in the upper third.
    backPos: 'center 18%',
  },
  {
    id: 2,
    src:     '/avocado-landing/ugc/freepik__beautiful27yearold-woman-jade-green-hydrogel-eye-p__2287.webp',
    backSrc: '/avocado-landing/ugc/canvas-image-1765519919814.webp',
    user: '@hydrogel_obsessed', text: 'Instant depuff. My under-eyes have never looked better.',
    // Back: bun woman with green tank holding jar — face/jar are in the upper portion.
    backPos: 'center 30%',
  },
  {
    id: 3,
    src:     '/avocado-landing/ugc/freepik__-platform-freepik-ai-image-generator-model-sofiabr__2285.webp',
    backSrc: '/avocado-landing/ugc/canvas-image-1765520585278.webp',
    user: '@sofia_skin_diary', text: 'I use these every Sunday — total reset for my skin.',
    // Front: poolside sunset, face in upper third.
    frontPos: 'center 22%',
    // Back: rust-shirt woman in kitchen holding jar, face in upper third.
    backPos: 'center 22%',
  },
  {
    id: 4,
    src:     '/avocado-landing/ugc/freepik__-platform-freepik-ai-image-generator-model-mystic-__2280.webp',
    backSrc: '/avocado-landing/ugc/canvas-image-1765520637566.webp',
    user: '@clean_beauty_lab', text: 'Redness gone in minutes. This mask is pure calm.',
    // Front: white tank woman with coffee cup in kitchen — face is in upper portion.
    frontPos: 'center 22%',
  },
  {
    id: 5,
    src:     '/avocado-landing/ugc/freepik__creame-una-variacion-para-esta-imagen-sorpreneme-i__2281.webp',
    backSrc: '/avocado-landing/ugc/2d271056-d75b-4b1a-b38b-740b742bb662.webp',
    user: '@botanical_rituals', text: 'Rich, soothing, and smells incredible. Obsessed.',
    // Face is in the upper-third of this beach portrait — pull the crop up.
    frontPos: 'center 22%',
  },
  {
    id: 6,
    src:     '/avocado-landing/ugc/grok-image-9d1e4fe9-b0f6-4c6b-87d9-a772323e961d%20%282%29.webp',
    backSrc: '/avocado-landing/ugc/38e7a424-0c82-4d78-95f4-038f2e13ae20.webp',
    user: '@natural_glow_co', text: 'Saved my dry skin overnight. Woke up glowing.',
  },
  {
    id: 7,
    src:     '/avocado-landing/ugc/grok-image-9d1e4fe9-b0f6-4c6b-87d9-a772323e961d%20%285%29.webp',
    backSrc: '/avocado-landing/ugc/6073b40b-22db-4d45-ac46-db77e08dc785.webp',
    user: '@glow_from_within', text: 'I put this on before bed and woke up to new skin.',
    // Face is in the upper portion of this kitchen shot — pull crop up to show face + cup.
    frontPos: 'center 25%',
  },
  {
    id: 8,
    src:     '/avocado-landing/ugc/grok-image-9d1e4fe9-b0f6-4c6b-87d9-a772323e961d%20%2810%29.webp',
    backSrc: '/avocado-landing/ugc/ca75aae7-e00b-49d6-a166-1d48fde59a70.webp',
    user: '@skin_restore_daily', text: 'Deep hydration without any greasy feeling. Love it.',
    // Front: rust-shirt woman in white kitchen — face is in the upper portion.
    frontPos: 'center 20%',
  },
];

// Dispatch by product handle. Falls back to Gold if unknown handle is passed.
const REVIEWS_BY_HANDLE: Record<string, ReviewCard[]> = {
  '24-gold-mask': GOLD_REVIEWS_8,
  'avocado-mask': AVOCADO_REVIEWS_8,
};

const shuffleArray = <T,>(input: T[]): T[] => {
  const array = [...input];
  let currentIndex = array.length;
  let randomIndex: number;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

interface FlipCardProps {
  card: ReviewCard;
  onInteractionChange: (active: boolean) => void;
  isTouchDevice: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, onInteractionChange, isTouchDevice }) => {
  // Single source of truth: a card is "flipped" when either
  //  - the user hovers (desktop), or
  //  - the user taps (mobile)
  // No more parent-driven auto-rotator on mobile — the user controls the flip
  // with a tap, exactly like the original behaviour requested.
  const [flipped, setFlipped] = useState(false);

  const onMouseEnter = () => {
    if (isTouchDevice) return;
    setFlipped(true);
    onInteractionChange(true);
  };
  const onMouseLeave = () => {
    if (isTouchDevice) return;
    setFlipped(false);
    onInteractionChange(false);
  };
  const onTap = () => {
    if (!isTouchDevice) return;
    setFlipped((prev) => {
      const next = !prev;
      onInteractionChange(next);
      return next;
    });
  };

  return (
    // Plain div wrapper — NO `motion.div layout`. The reason: `layout` re-measures
    // bounding boxes every render and treats the 3D rotateY of the inner child as
    // a layout change, animating the entire wrapper to a "new" position on every
    // tap-flip. That's the source of the apparent "jump" on mobile when tapping a
    // card. The reshuffle still happens (state updates), it just snaps into place
    // instead of springing — which is the visually correct trade-off here.
    <div
      className="relative w-full h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onTap}
    >
      {/* Perspective container — must be a non-transformed wrapper so 3D space survives */}
      <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
      {/*
        Flip uses a plain <div> with CSS transform (NOT framer-motion's animate).
        Why: framer-motion respects `prefers-reduced-motion: reduce` globally and
        skips animations entirely — which made cards on devices with reduced
        motion enabled never visually flip even though `rotateY` was set. Using
        a raw CSS transform keeps the rotation working regardless of OS-level
        motion preferences (the flip is the core mechanic of this section, not
        decoration). Users who genuinely need reduced motion can still see the
        back image — it just appears instantly instead of with the 1.1s rotation.
      */}
      <div
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d' as never,
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
        } as React.CSSProperties}
      >
        {/* FRONT — image. translateZ pulls the face slightly forward in 3D space
            so Chrome mobile + `overflow:hidden` doesn't collapse it onto the
            back face. Without this, the BACK face renders blank on tap. */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden bg-aphoria-bg/40"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
            backgroundImage: `url(${card.src})`,
            backgroundSize: 'cover',
            backgroundPosition: card.frontPos ?? 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* GLARE — diagonal gold sweep, triggered when card flips */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 w-[55%] h-full -skew-x-[20deg]"
              style={{
                background: 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.55) 50%, rgba(212,175,55,0) 100%)',
                mixBlendMode: 'overlay',
                left: '-70%',
              }}
              animate={flipped ? { left: '120%' } : { left: '-70%' }}
              transition={{ duration: 1.0, ease: 'easeOut', delay: flipped ? 0.1 : 0 }}
            />
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-aphoria-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={9} fill="currentColor" />)}
          </div>

          {/* Mobile-only TAP hint — tells touch users the card is interactive.
              Hidden on md+ where hover already reveals the back. */}
          <div className="md:hidden absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/20">
            <span className="text-[8px] uppercase tracking-[0.2em] text-white font-bold">Tap</span>
          </div>
        </div>

        {/* BACK — different UGC image, image only with 5 stars */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundImage: `url(${card.backSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: card.backPos ?? 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-aphoria-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {[...Array(5)].map((_, i) => <Star key={i} size={9} fill="currentColor" />)}
          </div>

          {/* Mobile-only TAP hint on the back face too — so users know they
              can tap again to flip back to the front. Hidden on md+ desktop. */}
          <div className="md:hidden absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/20">
            <span className="text-[8px] uppercase tracking-[0.2em] text-white font-bold">Tap</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

interface ShuffleGridProps {
  productHandle: string;
}

const ShuffleGrid: React.FC<ShuffleGridProps> = ({ productHandle }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialSet = REVIEWS_BY_HANDLE[productHandle] ?? GOLD_REVIEWS_8;
  const [cards, setCards] = useState<ReviewCard[]>(() => shuffleArray(initialSet));
  const activeCountRef = useRef(0);
  const isTouchDevice = useIsTouchDevice();

  // When productHandle changes (SPA navigation between /product/24-gold-mask
  // and /product/avocado-mask), React Router swaps the prop without remounting.
  // Re-sync `cards` to the new set so we don't keep showing the previous product.
  useEffect(() => {
    const newSet = REVIEWS_BY_HANDLE[productHandle] ?? GOLD_REVIEWS_8;
    setCards(shuffleArray(newSet));
  }, [productHandle]);

  // Periodic reshuffle. Spaced out (every 6s) so the snap isn't constantly
  // distracting on mobile, and paused entirely while any card is hovered
  // (desktop) or tapped open (mobile).
  useEffect(() => {
    const tick = () => {
      if (activeCountRef.current === 0) {
        setCards((prev) => shuffleArray(prev));
      }
      timeoutRef.current = setTimeout(tick, 6000);
    };
    timeoutRef.current = setTimeout(tick, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleInteractionChange = (active: boolean) => {
    activeCountRef.current = Math.max(0, activeCountRef.current + (active ? 1 : -1));
  };

  return (
    <div className="grid grid-cols-2 grid-rows-4 h-[720px] sm:h-[640px] gap-2">
      {cards.map((card) => (
        <FlipCard
          key={card.id}
          card={card}
          onInteractionChange={handleInteractionChange}
          isTouchDevice={isTouchDevice}
        />
      ))}
    </div>
  );
};

const ShuffleReviews: React.FC<ShuffleReviewsProps> = ({ productHandle = '24-gold-mask' }) => {
  const addItemAndOpen = useCartStore((s) => s.addItemAndOpen);

  const handleAddToCart = () => {
    const product = PRODUCTS.find((p) => p.handle === productHandle);
    if (!product) return;
    const v = product.variants['1pc'];
    addItemAndOpen({
      variantId: v.id,
      title: product.name,
      variantTitle: v.name,
      price: v.price,
      img: v.img,
    });
  };

  return (
    <section className="w-full bg-white px-6 lg:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
        <div>
          <span className="block mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-aphoria-gold">
            Real Women — Real Results
          </span>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-brand font-light text-aphoria-black tracking-tight leading-[0.95]">
            Their skin spoke <span className="italic text-aphoria-gold">first.</span>
          </h3>
          <p className="text-[15px] md:text-[16px] text-aphoria-mid leading-relaxed my-6 md:my-7 max-w-md">
            <span className="sm:hidden">Tap </span><span className="hidden sm:inline">Hover over </span>
            each card to see what 2,847 verified women said after their first application.
            No filters. No edits. Just visible transformation.
          </p>
          <button
            onClick={handleAddToCart}
            className="group inline-flex items-center gap-3 bg-aphoria-black text-white rounded-full px-8 py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl active:scale-95"
          >
            Try It Risk-Free
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-aphoria-mid">
            <span className="flex items-center gap-1 text-aphoria-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
            </span>
            <span>2,847 Verified Transformations</span>
          </div>
        </div>

        <ShuffleGrid productHandle={productHandle} />
      </div>
    </section>
  );
};

export default ShuffleReviews;
