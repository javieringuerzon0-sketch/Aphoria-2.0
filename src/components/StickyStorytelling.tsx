import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// "Numbers That Prove It" — sticky number that updates as the user scrolls
// past each KPI block.
//
// Why IntersectionObserver instead of useScroll-progress buckets:
//   useScroll maps overall section progress to discrete buckets, but the
//   bucket edges don't line up with the *actual DOM position* of each block
//   (the section has a header, padding, asymmetric gaps). That mismatch made
//   "94%" disappear before the user even reached the first block.
//   IntersectionObserver fires exactly when each block crosses the viewport
//   center — perfectly synced with what the user is reading.

interface Block {
  index: string;
  target: number;
  suffix?: string;
  format?: 'plain' | 'comma' | 'percent';
  label: string;
  title: string;
  body: string;
}

const blocks: Block[] = [
  {
    index: '01',
    target: 94,
    suffix: '%',
    format: 'plain',
    label: 'Reported Visibly Firmer Skin',
    title: 'Independently verified.',
    body: 'Third-party clinical evaluation. 94% of participants reported visibly firmer skin within four weeks. Not a focus group. Not a social survey. Dermatologically supervised, every result recorded.',
  },
  {
    index: '02',
    target: 24,
    suffix: 'hr',
    format: 'plain',
    label: 'To Visible Results, Not Weeks',
    title: 'Visible results in 24 hours.',
    body: 'First application delivers measurable hydration uplift, instant glow, and visibly reduced redness within 24 hours. Real transformation begins from the very first use — not weeks later, not after a tube. Immediate, clinical, and you see it in the mirror tomorrow.',
  },
  {
    index: '03',
    target: 10247,
    suffix: '',
    format: 'comma',
    label: 'Verified Women, Real Results',
    title: 'Ten thousand transformations.',
    body: '10,247 verified women have made Aphoria part of their ritual. Every review is from a confirmed purchase. We don\'t buy testimonials and we don\'t hide the unfiltered ones — every voice shapes the protocol.',
  },
  {
    index: '04',
    target: 4,
    suffix: '',
    format: 'plain',
    label: 'Clinical Actives. Zero Filler.',
    title: 'Four actives. Nothing wasted.',
    body: 'Most luxury skincare hides weak formulas behind thirty-ingredient lists. Aphoria runs on four peer-reviewed actives — colloidal 24K gold, ceramide complex, niacinamide, and avocado lipid — each dosed at the concentration the science demands.',
  },
];

// "Block zero" — the resting state shown before the user reaches the first KPI.
// Starts at literal 0 so the count-up has somewhere to count *from*.
const restingState = {
  index: '00',
  target: 0,
  suffix: '',
  format: 'plain' as const,
  label: 'Begin the Audit',
  title: '',
  body: '',
};

const fmt = (n: number, format: Block['format']): string => {
  const rounded = Math.round(n);
  if (format === 'comma') return rounded.toLocaleString('en-US');
  return String(rounded);
};

// Animates from 0 → target with an ease-out cubic. Re-runs whenever the active
// block changes (so scrolling back up restarts the count cleanly).
const CountUp: React.FC<{ target: number; format: Block['format']; durationMs?: number }> = ({
  target,
  format,
  durationMs = 900,
}) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return <>{fmt(value, format)}</>;
};

// Mobile inline variant — count-up re-triggers EVERY TIME the element
// enters the viewport (matching the desktop behavior, where the sticky
// display re-counts as you scroll up and down past each block).
//
// Implementation: state machine
//   - `out`     : value pinned at 0, ready to play
//   - `playing` : rAF loop animates 0 → target
//   - `done`    : value pinned at target, ready to reset
// We transition `out → playing` when intersecting, and `done → out` when
// the element leaves the viewport (so the next entry restarts the count).
const InlineCountUp: React.FC<{ target: number; format: Block['format']; durationMs?: number }> = ({
  target,
  format,
  durationMs = 1200,
}) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef<'out' | 'playing' | 'done'>('out');

  useEffect(() => {
    if (target === 0) return;
    const el = ref.current;
    if (!el) return;

    const startCount = () => {
      phaseRef.current = 'playing';
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(target * eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setValue(target);
          phaseRef.current = 'done';
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start counting from 0 if we're not already animating to target.
          if (phaseRef.current === 'out') {
            startCount();
          }
        } else {
          // Out of viewport — cancel any in-flight animation and reset to 0
          // so the next entrance plays the count fresh.
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          phaseRef.current = 'out';
          setValue(0);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return <span ref={ref}>{fmt(value, format)}</span>;
};

const StickyStorytelling: React.FC = () => {
  const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
  // -1 = pre-scroll resting state (shows literal 0). 0..3 = real KPI blocks.
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    // Each block reports its visibility ratio. We pick the block with the
    // highest ratio (the one most centered in the viewport). If no block
    // is meaningfully visible, fall back to "resting" (-1).
    const visibility = new Map<number, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = blockRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) continue;
          visibility.set(idx, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        // Find the block with the highest visibility above a small threshold.
        let best = -1;
        let bestRatio = 0.05;
        for (const [idx, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = idx;
            bestRatio = ratio;
          }
        }
        setActiveIndex(best);
      },
      {
        // Strip the top/bottom of the viewport so a block must be near the
        // middle to "win". This avoids the issue of a block far above being
        // technically "intersecting" by 1px and stealing focus.
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const el of blockRefs.current) {
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  const display = activeIndex === -1 ? restingState : blocks[activeIndex];

  return (
    <section
      id="science"
      className="relative bg-aphoria-bg py-20 md:py-28"
      aria-label="Aphoria proof in numbers"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[11px] uppercase tracking-[0.32em] text-aphoria-gold font-medium">
            Proof, Not Promises
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-brand font-light tracking-tight text-aphoria-black">
            Numbers that hold us accountable.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-[15px] md:text-[16px] text-aphoria-mid leading-relaxed">
            Independently audited. Independently verified. The metrics every Aphoria formulation is measured against.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">
          {/* Sticky number column — desktop only (lg+).
              On mobile this is hidden because each block renders its OWN
              number inline (better mobile reading experience — no sticky
              elements competing for vertical space). */}
          <div className="hidden lg:flex lg:sticky lg:top-32 lg:self-start lg:min-h-[60vh] items-center">
            <div className="flex flex-col items-center text-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={display.index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="font-brand font-light text-aphoria-black leading-none tracking-tight text-[180px] tabular-nums">
                    <CountUp target={display.target} format={display.format} />
                    <span className="text-aphoria-gold">{display.suffix}</span>
                  </span>
                  <span className="mt-6 text-[11px] uppercase tracking-[0.32em] text-aphoria-mid font-medium max-w-xs">
                    {display.label}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots — show position across the 4 KPIs */}
              <div className="mt-8 flex items-center gap-2">
                {blocks.map((_, i) => (
                  <span
                    key={i}
                    className={`h-[2px] transition-all duration-500 ${
                      i === activeIndex
                        ? 'w-10 bg-aphoria-gold'
                        : i < activeIndex
                        ? 'w-5 bg-aphoria-black/30'
                        : 'w-5 bg-aphoria-black/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling editorial column */}
          <div className="flex flex-col gap-20 md:gap-32 lg:gap-40 lg:py-16">
            {blocks.map((b, i) => (
              <div
                key={b.index}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.4, margin: '-15% 0px -15% 0px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Mobile-only inline KPI number — sits above each block so
                      users see every metric while reading the matching copy.
                      Hidden at lg+ where the sticky column takes over. */}
                  <div className="lg:hidden mb-6">
                    <span className="block text-[11px] uppercase tracking-[0.36em] text-aphoria-gold font-medium mb-3">
                      {b.index}
                    </span>
                    <span className="font-brand font-light text-aphoria-black leading-none tracking-tight text-[72px] sm:text-[96px] tabular-nums">
                      <InlineCountUp target={b.target} format={b.format} />
                      <span className="text-aphoria-gold">{b.suffix}</span>
                    </span>
                    <span className="block mt-3 text-[10px] uppercase tracking-[0.3em] text-aphoria-mid font-medium">
                      {b.label}
                    </span>
                  </div>

                  {/* Desktop-only block index (mobile shows it above the number) */}
                  <span className="hidden lg:block text-[12px] uppercase tracking-[0.4em] text-aphoria-gold font-medium mb-5">
                    {b.index}
                  </span>
                  <h3 className="text-2xl md:text-[32px] lg:text-[38px] font-brand font-light tracking-tight text-aphoria-black mb-6 leading-[1.15]">
                    {b.title}
                  </h3>
                  <p className="text-[15px] md:text-[17px] leading-[1.7] text-aphoria-mid font-light max-w-lg">
                    {b.body}
                  </p>
                  {i < blocks.length - 1 && (
                    <div className="mt-12 h-px w-12 bg-aphoria-black/15" />
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyStorytelling;
