import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { MANIFESTO_COPY } from '../constants';

// Scroll-driven word reveal with a real gold GLOW (no blur, no fuzziness).
//
// Each word morphs across two states, always sharp:
//   color       → light gray (#C8C2B4)   ⟶  aphoria-black (#0A0A0A)
//   text-shadow → none                   ⟶  soft gold glow (briefly, mid-range)
//
// The glow peaks while the word is "actively being read" (mid of its window)
// and then settles to none once the word is fully lit, so the paragraph reads
// crisp at both ends and gilded only in motion.
//
// Fully reversible — useTransform reads scrollYProgress live in both directions.

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}> = ({ word, progress, start, end }) => {
  const mid = (start + end) / 2;
  // Color: gray ⟶ black, monotonic so it always reaches full black.
  const color = useTransform(progress, [start, end], ['#C8C2B4', '#0A0A0A']);
  // Glow: 0 ⟶ peak (at the midpoint while the word is "in motion") ⟶ 0
  // text-shadow uses the aphoria-gold tone.
  const textShadow = useTransform(
    progress,
    [start, mid, end],
    [
      '0 0 0 rgba(198,161,91,0)',
      '0 0 18px rgba(198,161,91,0.75)',
      '0 0 0 rgba(198,161,91,0)',
    ]
  );

  return (
    <motion.span
      style={{ color, textShadow }}
      className="inline-block mr-[0.32em] will-change-[color,text-shadow]"
    >
      {word}
    </motion.span>
  );
};

const Manifesto: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // Reveal window — wide and symmetric.
  //   start 0.6 → progress begins when paragraph top reaches 60% of viewport
  //               (much earlier than 0.85; user sees the effect before the
  //                paragraph is fully on screen)
  //   end   0.4 → progress completes when paragraph bottom reaches 40% of viewport
  //               (last words finish well before the paragraph leaves; reverse
  //                scroll triggers the un-reveal early and smoothly)
  // This widens the active scroll range significantly, so every scroll tick
  // moves progress only a tiny amount → words morph continuously, never in
  // jarring jumps.
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.6', 'end 0.4'],
  });

  const words = MANIFESTO_COPY.body.split(' ');
  const total = words.length;

  return (
    <section
      id="manifesto"
      className="relative py-24 md:py-32 px-6 bg-aphoria-bg flex flex-col items-center overflow-hidden"
    >
      <div className="max-w-[860px] text-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-aphoria-gold mb-12 md:mb-16"
        >
          {MANIFESTO_COPY.h2}
        </motion.h2>

        <p
          ref={paragraphRef}
          className="text-[22px] md:text-[32px] lg:text-[38px] leading-[1.4] font-light tracking-tight"
        >
          {words.map((word, i) => {
            // Each word reveals across a wide window that overlaps heavily
            // with its neighbors. Width = 3/total → roughly 6 words are in
            // transition at any moment, producing a continuous "wave" instead
            // of staccato per-word flips.
            //
            // All windows are compressed into the first 90% of progress so
            // the last word finishes its reveal before the paragraph fully
            // leaves the active range, while the wave still feels continuous.
            //
            // Constraint: `start < end` must always hold (WAAPI requires
            // monotonically non-decreasing offsets), so we scale per word
            // instead of using a global clamp.
            const reveal = 0.9;
            const center = ((i + 0.5) / total) * reveal;
            const half = (1.5 / total) * reveal;
            const start = Math.max(0, center - half);
            const end = Math.min(1, center + half);
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="h-[1px] w-12 bg-aphoria-black/15 mb-6" />
          <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-mid font-medium">
            Clinical Integrity • Architectural Precision
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
