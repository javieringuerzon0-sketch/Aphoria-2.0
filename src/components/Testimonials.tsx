import React, { useState, useEffect } from 'react';

import OptimizedImage from './OptimizedImage';
// Defined outside component — array is stable, never recreated on re-render
const testimonials = [
  {
    quote:
      "I applied the Avocado Mask before bed and woke up with the softest, most hydrated skin I've had in years. By day 10, my texture was completely smooth. At 30 days, my skin looks genuinely younger.",
    name: 'Emma Richardson',
    role: 'Skincare Enthusiast',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    quote:
      "The 24 Gold Mask gave me an instant glow the very first night. By morning, my skin was brighter and firmer. After 30 days, people think I had professional treatments. Pure luxury that actually works.",
    name: 'Sophia Martinez',
    role: 'Beauty Blogger',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    quote:
      "From the very first application I felt the difference — immediate hydration and glow. I alternate Gold evenings and Avocado mornings. 30 days in and my skin has reversed years of damage.",
    name: 'Isabella Chen',
    role: 'Verified Customer',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    quote:
      "I noticed firmer skin and reduced fine lines after the very first use of the Gold Mask. Day 7, my pores looked smaller. Day 30, my clients at the spa are asking what my secret is!",
    name: 'Olivia Thompson',
    role: 'Spa Director',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    quote:
      "The Avocado Mask gave my dry skin instant relief — plump and dewy within minutes. No product has ever worked this fast. After a month, I stopped wearing foundation entirely.",
    name: 'Natalie Brooks',
    role: 'Makeup Artist',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    quote:
      "Applied the Gold Mask before a client event — instant luminosity that lasted all day. My skin looked like I just left a facial. After 30 days of consistent use, the transformation is unreal.",
    name: 'Carmen Vasquez',
    role: 'Esthetician',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    quote:
      "Day 1: instant calm and glow. Day 15: texture completely smooth. Day 30: my before/after photos are shocking. The Avocado Mask calms redness and the Gold Mask adds years-younger radiance.",
    name: 'Rachel Kim',
    role: 'Wellness Coach',
    image:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=160&h=160&q=80'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + testimonials.length) % testimonials.length;
    const isVisible = diff === 0 || diff === 1 || diff === testimonials.length - 1;

    if (diff === 0) {
      // Center card (active)
      return {
        transform: 'translateX(0%) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        willChange: 'transform, opacity' as const
      };
    } else if (diff === 1 || diff === -4) {
      // Right card
      return {
        transform: 'translateX(35%) scale(0.85) rotateY(-12deg)',
        opacity: 0.6,
        zIndex: 20,
        willChange: 'transform, opacity' as const
      };
    } else if (diff === testimonials.length - 1 || diff === -1) {
      // Left card
      return {
        transform: 'translateX(-35%) scale(0.85) rotateY(12deg)',
        opacity: 0.6,
        zIndex: 20,
        willChange: 'transform, opacity' as const
      };
    } else {
      // Hidden cards — no willChange to avoid GPU memory waste
      return {
        transform: 'translateX(0%) scale(0.7) rotateY(0deg)',
        opacity: 0,
        zIndex: 10
      };
    }
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-aphoria-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll">
          <div className="inline-flex text-[13px] font-medium text-aphoria-gold rounded-none ring-0 mb-6 pt-1.5 pr-3.5 pb-1.5 pl-3.5 gap-x-2 gap-y-2 items-center">
            <span className="uppercase text-[11px] text-aphoria-black/70 tracking-widest">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-light tracking-tight text-aphoria-black mb-4">
            Real Results, Real Stories
          </h2>
          <p className="text-base sm:text-lg text-aphoria-mid leading-relaxed">
            Instant results from the first use. Visible transformation in 30 days. Discover why 10,247 women trust Aphoria for their skin.
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[420px] [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="absolute w-full max-w-md"
                style={{
                  ...getCardStyle(index),
                  transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-aphoria-black/5">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-aphoria-gold"
                    >
                      <path d="M3 21c3 0 7-2 7-7V4H3v10"></path>
                      <path d="M14 21c3 0 7-2 7-7V4h-7v10"></path>
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <p className="text-aphoria-black text-base leading-relaxed mb-8 min-h-[120px]">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <OptimizedImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-aphoria-gold/20"
                        decoding="async"
                      />
                      <div>
                        <div className="text-aphoria-black text-sm font-medium">
                          {testimonial.name}
                        </div>
                        <div className="text-aphoria-mid text-xs">{testimonial.role}</div>
                      </div>
                    </div>

                    {/* Rating - 5 Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-aphoria-gold"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-aphoria-gold'
                  : 'w-2 bg-aphoria-black/20 hover:bg-aphoria-black/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
