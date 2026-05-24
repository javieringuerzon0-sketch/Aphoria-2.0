import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

// Gap (and side scale) must be proportional to container width on mobile,
// otherwise lateral cards land outside the viewport on <500px screens.
const calculateGap = (width: number) => {
  // Mobile: 18% of container, min 38px → side cards stay just inside viewport
  if (width < 640) return Math.max(38, width * 0.18);
  // Tablet bridge
  if (width < 1024) return 50;
  // Desktop bands
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - 1024) / (maxWidth - 1024));
};

const calculateSideScale = (width: number) => {
  // On mobile, shrink lateral cards more so they fit visibly + leave breathing room for center
  if (width < 640) return 0.7;
  return 0.85;
};

export const CircularTestimonials: React.FC<CircularTestimonialsProps> = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) => {
  const colorName = colors.name ?? '#0A0A0A';
  const colorDesignation = colors.designation ?? '#8A8A8A';
  const colorTestimony = colors.testimony ?? '#4A4A4A';
  const colorArrowBg = colors.arrowBackground ?? '#0A0A0A';
  const colorArrowFg = colors.arrowForeground ?? '#FFFFFF';
  const colorArrowHoverBg = colors.arrowHoverBackground ?? '#C6A15B'; // aphoria gold

  const fontSizeName = fontSizes.name ?? '1.75rem';
  const fontSizeDesignation = fontSizes.designation ?? '0.8rem';
  const fontSizeQuote = fontSizes.quote ?? '1.125rem';

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap
  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // CRITICAL: reset activeIndex to 0 when the testimonials array changes
  // (e.g. SPA navigation between /product/24-gold-mask and /product/avocado-mask).
  // Without this, the old index from the previous product persists, which can land
  // on a stale slide if array lengths differ — and visually hold the wrong testimonial.
  useEffect(() => {
    setActiveIndex(0);
  }, [testimonials]);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 4000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleNext, handlePrev]);

  // Image transforms — always show 3: left, center, right
  const getImageStyle = (index: number): React.CSSProperties => {
    const gap = calculateGap(containerWidth);
    const sideScale = calculateSideScale(containerWidth);
    const maxStickUp = gap * 0.6;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
        transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(15deg)`,
        transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${sideScale}) rotateY(-15deg)`,
        transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.6s cubic-bezier(.22,1,.36,1)',
    };
  };

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-20 items-center">
        {/* Images — aspect-square so 1:1 source images render without distortion.
            On mobile reduce max width so side cards (rotated) stay inside viewport. */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-square max-w-[260px] sm:max-w-[360px] md:max-w-[480px] mx-auto"
          style={{ perspective: '1000px' }}
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="absolute w-full h-full object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-1 mb-4 text-aphoria-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>

              <h3
                className="font-brand font-light tracking-tight leading-tight mb-1"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="uppercase tracking-[0.22em] font-medium mb-7"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>

              <motion.p
                className="leading-[1.7] font-light italic"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                <span className="text-aphoria-gold text-3xl leading-none mr-1 align-top">&ldquo;</span>
                {activeTestimonial.quote.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.025 * i }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                <span className="text-aphoria-gold text-3xl leading-none ml-1 align-bottom">&rdquo;</span>
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
            >
              <ArrowLeft size={20} color={colorArrowFg} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
            >
              <ArrowRight size={20} color={colorArrowFg} />
            </button>

            {/* Counter */}
            <span className="ml-2 text-[10px] uppercase tracking-[0.28em] text-aphoria-mid font-medium tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(testimonialsLength).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
