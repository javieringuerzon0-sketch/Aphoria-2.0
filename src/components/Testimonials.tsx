import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// Single-card horizontal testimonial slider — square image overlaps a wider
// text panel on the right. Adapted from the design reference; recolored to
// the Aphoria palette and wired to framer-motion spring transitions.
interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    image: '/testimonios-slider/img-01.webp',
    quote:
      "The Avocado Mask gave my dry skin instant relief — plump and dewy within minutes. No product has ever worked this fast. After a month, I stopped wearing foundation entirely.",
    name: 'Natalie Brooks',
    role: 'Makeup Artist',
    rating: 5,
  },
  {
    image: '/testimonios-slider/img-02.webp',
    quote:
      "From the very first application I felt the difference — immediate hydration and glow. I alternate Gold evenings and Avocado mornings. 30 days in and my skin has reversed years of damage.",
    name: 'Isabella Chen',
    role: 'Verified Customer',
    rating: 5,
  },
  {
    image: '/testimonios-slider/img-03.webp',
    quote:
      "The 24 Gold Mask gave me an instant glow the very first night. By morning, my skin was brighter and firmer. After 30 days, people think I had professional treatments. Pure luxury that actually works.",
    name: 'Sophia Martinez',
    role: 'Beauty Blogger',
    rating: 5,
  },
  {
    image: '/testimonios-slider/img-04.webp',
    quote:
      "Applied the Gold Mask before a client event — instant luminosity that lasted all day. My skin looked like I just left a facial. After 30 days of consistent use, the transformation is unreal.",
    name: 'Carmen Vasquez',
    role: 'Esthetician',
    rating: 5,
  },
  {
    image: '/testimonios-slider/img-05.webp',
    quote:
      "I noticed firmer skin and reduced fine lines after the very first use of the Gold Mask. Day 7, my pores looked smaller. Day 30, my clients at the spa are asking what my secret is!",
    name: 'Olivia Thompson',
    role: 'Spa Director',
    rating: 5,
  },
];

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = '' }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    {Array.from({ length: 5 }).map((_, i) => {
      const filled = i < rating;
      // lucide-react sets fill="none" as an SVG attribute, which overrides any
      // Tailwind fill-* class. Pass the fill prop directly so filled stars
      // render solid gold instead of as outlines.
      return (
        <Star
          key={i}
          className={`h-4 w-4 ${filled ? 'text-aphoria-gold' : 'text-aphoria-mid/40'}`}
          fill={filled ? 'currentColor' : 'none'}
        />
      );
    })}
  </div>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay — pauses on manual interaction by resetting the timer each time
  // the index changes (the effect re-runs on currentIndex update).
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [currentIndex]);

  // Preload ALL testimonial images on mount so every slide change is instant.
  // Without this, mobile users see the text panel arrive ~400ms before the
  // image because each <img> only starts downloading when it mounts.
  useEffect(() => {
    testimonials.forEach((t) => {
      const img = new window.Image();
      img.src = t.image;
    });
  }, []);

  const current = testimonials[currentIndex];

  // Tighter spring → image and text settle together visually. The previous
  // stiffness 260 / damping 30 left enough oscillation that on mobile (where
  // image is stacked above text) the text appeared "to settle first". Bumping
  // damping eliminates the perceived delay.
  const slideVariants = {
    hidden: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 320, damping: 38, mass: 0.8 },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { type: 'spring' as const, stiffness: 320, damping: 38, mass: 0.8 },
    }),
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-aphoria-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — preserved from previous section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="uppercase text-[11px] text-aphoria-black/70 tracking-[0.3em] font-medium">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-light tracking-tight text-aphoria-black mb-4">
            Real Results, Real Stories
          </h2>
          <p className="text-base sm:text-lg text-aphoria-mid leading-relaxed">
            Instant results from the first use. Visible transformation in 30 days. Discover why
            10,247 women trust Aphoria for their skin.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="relative min-h-[460px] md:min-h-[340px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 w-full"
              >
                <div className="flex flex-col md:flex-row items-center justify-center w-full h-full px-2 sm:px-4">
                  {/* Image — square, overlaps the panel on desktop */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 flex-shrink-0 mb-[-2.5rem] md:mb-0 md:mr-[-4rem] z-10">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover rounded-2xl ring-1 ring-aphoria-gold/10"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>

                  {/* Text panel */}
                  <div className="relative w-full bg-white text-aphoria-black rounded-2xl border border-aphoria-black/5 pt-12 md:pt-8 pl-5 md:pl-28 pr-5 md:pr-8 pb-6 md:pb-7">
                    <Quote
                      className="absolute top-4 left-4 md:left-24 h-7 w-7 text-aphoria-gold/25"
                      aria-hidden="true"
                    />
                    <blockquote className="text-[14px] md:text-[15px] leading-relaxed text-aphoria-black/85 mb-4 italic">
                      “{current.quote}”
                    </blockquote>
                    <StarRating rating={current.rating} className="mb-4" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="pr-2">
                        <p className="font-medium text-[15px] md:text-[16px] text-aphoria-black tracking-tight">
                          {current.name}
                        </p>
                        <p className="text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-aphoria-mid mt-0.5">
                          {current.role}
                        </p>
                      </div>

                      {/* Navigation chevrons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={handlePrevious}
                          className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-aphoria-bg hover:bg-aphoria-gold hover:text-white text-aphoria-black transition-colors focus:outline-none focus:ring-2 focus:ring-aphoria-gold/40 focus:ring-offset-2 focus:ring-offset-white"
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-aphoria-black hover:bg-aphoria-gold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-aphoria-gold/40 focus:ring-offset-2 focus:ring-offset-white"
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-aphoria-gold'
                    : 'w-2 bg-aphoria-black/20 hover:bg-aphoria-black/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
