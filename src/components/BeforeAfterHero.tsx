import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BeforeAfterHero: React.FC = () => {
  const beforeAfterRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(50);
  const currentRef = useRef(50);
  const beforeImage = '/BEFORE-AFTER/BEFORE.jpg';
  const afterImage = '/BEFORE-AFTER/AFTER.jpg';

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const animateBeforeAfter = () => {
    const container = beforeAfterRef.current;
    if (!container) {
      rafRef.current = null;
      return;
    }
    const current = currentRef.current;
    const target = targetRef.current;
    const next = current + (target - current) * 0.12;
    currentRef.current = next;
    container.style.setProperty('--ba', `${next.toFixed(2)}`);

    if (Math.abs(target - next) > 0.1) {
      rafRef.current = requestAnimationFrame(animateBeforeAfter);
    } else {
      currentRef.current = target;
      container.style.setProperty('--ba', `${target.toFixed(2)}`);
      rafRef.current = null;
    }
  };

  const updateBeforeAfter = (clientX: number) => {
    const container = beforeAfterRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const percent = Math.max(0, Math.min(100, raw));
    targetRef.current = percent;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animateBeforeAfter);
    }
  };

  return (
    <section id="before-after" className="py-20 md:py-28 bg-aphoria-bg">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold">Before / After</span>
            <h3 className="mt-4 text-[24px] md:text-[32px] font-light text-aphoria-black tracking-tight">
              Visible change with consistent ritual
            </h3>
            <p className="mt-3 text-[12px] uppercase tracking-[0.26em] text-aphoria-mid">
              Results after 28 days • Verified client
            </p>
          </div>

          <div
            ref={beforeAfterRef}
            className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-2xl border border-aphoria-black/10 bg-white cursor-col-resize select-none"
            style={{ ['--ba' as any]: 50 }}
            onMouseMove={(e) => updateBeforeAfter(e.clientX)}
            onTouchMove={(e) => updateBeforeAfter(e.touches[0].clientX)}
            onTouchStart={(e) => updateBeforeAfter(e.touches[0].clientX)}
          >
            <img
              src={afterImage}
              alt="After results"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: 'calc(var(--ba) * 1%)', willChange: 'width' }}
            >
              <img
                src={beforeImage}
                alt="Before results"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              className="absolute top-0 h-full w-[2px] bg-white"
              style={{ left: 'calc(var(--ba) * 1%)', boxShadow: '0 0 0 1px rgba(255,255,255,0.65), 0 0 20px rgba(255,255,255,0.25)' }}
            >
              <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full border border-white/80 bg-white/30 backdrop-blur"></span>
            </div>

            <div
              className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/25 px-5 py-2 text-[11px] uppercase tracking-[0.32em] text-white backdrop-blur"
              style={{ opacity: 'clamp(0, calc(var(--ba) / 12), 1)' }}
            >
              Before
            </div>
            <div
              className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/25 px-5 py-2 text-[11px] uppercase tracking-[0.32em] text-white backdrop-blur"
              style={{ opacity: 'clamp(0, calc((100 - var(--ba)) / 12), 1)' }}
            >
              After
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/80">Combination skin • Age 38</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/70">Results vary by skin type</div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[240px] hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/80">
              <span className="h-[1px] w-10 bg-white/50"></span>
              Drag to reveal
              <span className="h-[1px] w-10 bg-white/50"></span>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/product/avocado-mask"
              className="rounded-full bg-aphoria-black px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[0.26em] text-white transition-all duration-500 hover:-translate-y-[2px] hover:opacity-95"
            >
              Start the 28-day protocol
            </Link>
            <a
              href="#science"
              className="rounded-full border border-aphoria-black/15 px-7 py-[13px] text-[11px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/80 transition-all duration-500 hover:border-aphoria-black/40 hover:text-aphoria-black"
            >
              See clinical evidence
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterHero;
