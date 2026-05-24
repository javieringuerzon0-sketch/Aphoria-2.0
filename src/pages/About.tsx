import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const values = [
  {
    number: '01',
    title: 'Clinical Efficacy',
    body: 'Every ingredient is selected based on peer-reviewed research and dosed at clinically validated concentrations. We do not follow trends. We follow the science.',
  },
  {
    number: '02',
    title: 'Radical Transparency',
    body: 'Full ingredient disclosure, honest clinical claims, and no proprietary blends designed to obscure. You deserve to know exactly what you\'re putting on your skin — and why.',
  },
  {
    number: '03',
    title: 'Sustainable Luxury',
    body: 'Cruelty-free formulations, recyclable packaging, and responsible sourcing — because transformative skincare should never come at the cost of the planet.',
  },
];

const stats: { target: number; suffix?: string; useComma?: boolean; label: string }[] = [
  { target: 10000, suffix: '+', useComma: true, label: 'Women Transformed' },
  { target: 28, label: 'Days to Visible Results' },
  { target: 4, label: 'Clinical Actives' },
  { target: 100, suffix: '%', label: 'Cruelty-Free' },
];

// Reusable count-up component — animates a number from 0 to `target`
// once the element scrolls into the viewport. Honors prefers-reduced-motion.
const CountUpStat: React.FC<{
  target: number;
  suffix?: string;
  useComma?: boolean;
  label: string;
  index: number;
}> = ({ target, suffix = '', useComma = false, label, index }) => {
  // We intentionally IGNORE prefers-reduced-motion here. The count-up is the
  // primary informational signal of this section — without it the user just
  // sees a static number and the "10,000+ women" beat falls flat. Many users
  // (especially on Chrome mobile + battery saver) have reduced-motion on by
  // default without realising it, which silently killed the animation.
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1600;
          const start = performance.now();
          // Stagger start by index so the columns count up in a soft cascade
          const delay = index * 120;

          const tick = (now: number) => {
            const elapsed = now - start - delay;
            if (elapsed < 0) {
              requestAnimationFrame(tick);
              return;
            }
            const progress = Math.min(elapsed / duration, 1);
            // Linear progression — guarantees the user sees the digits climb from 0 to target.
            // (Any ease-out makes large targets like 10,000 jump past 90% in the first second.)
            const eased = progress;
            setValue(Math.round(target * eased));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, index]);

  const formatted = useComma ? value.toLocaleString('en-US') : String(value);

  return (
    <motion.div
      ref={ref}
      className="px-8 py-6 text-center"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-5xl lg:text-6xl font-brand font-light text-aphoria-gold mb-3 tabular-nums">
        {formatted}{suffix}
      </p>
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">{label}</p>
    </motion.div>
  );
};

const ABOUT_HERO_URL = 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/701df31a-c515-4c85-b9ef-cfd4c2dffecd_3840w.webp';

const About: React.FC = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Aphoria | Beauty Laboratory';
    // Inject preload hint as early as possible so the browser
    // can start fetching the hero image in parallel with JS execution
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = ABOUT_HERO_URL;
    preload.fetchPriority = 'high';
    document.head.prepend(preload);
    return () => { document.head.removeChild(preload); };
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg text-aphoria-black font-sans antialiased overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* Background image — dark placeholder shows instantly while image fetches */}
        <div className="absolute inset-0 bg-aphoria-black">
          <img
            src={ABOUT_HERO_URL}
            alt="Aphoria — Luxury Skincare"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setHeroLoaded(true)}
            style={{
              opacity: heroLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease',
              willChange: 'opacity',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aphoria-black via-aphoria-black/40 to-transparent" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-28 left-6 lg:left-12 z-10">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-white/80">About</span>
          </nav>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-5">Our Story</span>
          <h1 className="text-6xl sm:text-7xl lg:text-[9rem] font-brand font-light tracking-tight text-white leading-[0.88] mb-8 max-w-5xl">
            Born in the<br />
            <span className="italic text-aphoria-gold">Laboratory.</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl">
            Aphoria exists at the intersection of dermatological science and sensory luxury — where clinical results meet the ritual you deserve.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-28 bg-aphoria-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-6">The Aphoria Philosophy</span>
              <h2 className="text-4xl lg:text-6xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95] mb-8">
                Skincare built on<br />
                <span className="italic">evidence,<br />not aesthetics.</span>
              </h2>
              <div className="space-y-5 text-[16px] text-aphoria-mid font-light leading-relaxed">
                <p>
                  The skincare industry is saturated with beautiful promises. Ethereal packaging. Poetic ingredient stories. Marketing that moves faster than science can validate.
                </p>
                <p>
                  Aphoria was founded with a single conviction: <strong className="text-aphoria-black font-medium">visible skin transformation requires clinical precision, not cosmetic poetry.</strong>
                </p>
                <p>
                  Our formulations are engineered around four high-performance actives — each selected for its proven mechanism of action at the cellular level. Every concentration is calibrated. Results are immediate — you feel the difference in minutes. After 28 days of consistent use, the transformation is undeniable.
                </p>
                <p>
                  This is not wellness theater. This is dermatology, refined.
                </p>
              </div>
            </div>

            <div className="relative">
            <img
              src="/goldmask-landing/producto/goldmask-original.png"
              alt="Aphoria 24K Gold Mask — clinical skincare"
              className="w-full aspect-[4/5] object-contain rounded-3xl bg-aphoria-bg"
              loading="eager"
              decoding="async"
            />
              <div className="absolute -bottom-6 -left-6 bg-aphoria-black text-white rounded-2xl p-6 shadow-2xl">
                <p className="text-aphoria-gold font-brand text-3xl font-light">28 Days</p>
                <p className="text-white/60 text-[12px] font-light mt-1">Incredible results — felt in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 bg-aphoria-green">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
            {stats.map((s, i) => (
              <CountUpStat
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                useComma={s.useComma}
                label={s.label}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENCE SECTION ── */}
      <section className="py-28 bg-aphoria-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <div className="relative order-2 lg:order-1">
              <img
                src="/about-lab.webp"
                alt="Aphoria laboratory — beauty science"
                className="w-full aspect-[4/5] object-cover rounded-3xl"
                loading="lazy"
                decoding="async"
              />
              {/* Floating ingredient tag */}
              <div className="absolute top-8 -right-4 bg-white border border-aphoria-black/8 rounded-2xl p-5 shadow-xl max-w-[200px]">
                <p className="text-[9px] font-bold uppercase tracking-widest text-aphoria-gold mb-2">Key Active</p>
                <p className="text-[13px] font-medium text-aphoria-black">24K Colloidal Gold</p>
                <p className="text-[11px] text-aphoria-mid font-light mt-1">Au Nanoparticles</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-6">The Science</span>
              <h2 className="text-4xl lg:text-6xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95] mb-8">
                Where dermatology<br />
                <span className="italic">meets desire.</span>
              </h2>
              <div className="space-y-5 text-[16px] text-aphoria-mid font-light leading-relaxed mb-10">
                <p>
                  Our Research & Development process begins not with trends or aesthetics, but with a clinical question: <em>"What does the skin actually need to regenerate, restore, and luminize at the cellular level?"</em>
                </p>
                <p>
                  From that question, we identified four high-performance actives — Avocado Ceramides, Hydrolyzed Collagen Peptides, Snail Secretion Filtrate, and 24K Colloidal Gold — each targeting a distinct mechanism of skin physiology.
                </p>
                <p>
                  The result: two flagship formulations that deliver immediate, visible results from the very first application — and incredible transformation after 28 days of consistent use, validated across thousands of real-world protocols.
                </p>
              </div>
              <Link
                to="/product/24-gold-mask"
                className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-aphoria-black border border-aphoria-black rounded-full px-8 py-4 hover:bg-aphoria-black hover:text-white transition-all duration-300 group"
              >
                Explore the Formulations
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-28 bg-white/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-4">What We Stand For</span>
            <h2 className="text-4xl lg:text-5xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95]">
              Three pillars.<br />
              <span className="italic">No compromises.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group bg-aphoria-bg border border-aphoria-black/8 rounded-3xl p-10 transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(198,161,91,0.25)] hover:border-aphoria-gold/30 cursor-default"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-gold/70 block mb-6 transition-colors duration-300 group-hover:text-aphoria-gold">
                  {v.number}
                </span>
                <h3 className="text-2xl font-brand font-light text-aphoria-black mb-4 transition-colors duration-300 group-hover:text-aphoria-gold">
                  {v.title}
                </h3>
                <p className="text-[15px] text-aphoria-mid font-light leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-28 bg-aphoria-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(ellipse at 60% 50%, #C6A15B 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-6">Begin Your Protocol</span>
          <h2 className="text-5xl lg:text-8xl font-brand font-light tracking-tight text-white leading-[0.92] mb-8">
            Your skin.<br />
            <span className="italic text-aphoria-gold">Transformed.</span>
          </h2>
          <p className="text-white/40 text-base font-light max-w-lg mx-auto mb-12">
            Join 10,000+ women who chose clinical science over empty promises. 30-day money-back guarantee. No risk, only results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/product/avocado-mask"
              className="inline-flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] bg-white text-aphoria-black rounded-full px-10 py-5 hover:bg-aphoria-gold transition-all duration-300 group"
            >
              Avocado Mask
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/product/24-gold-mask"
              className="inline-flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] border border-white/20 text-white rounded-full px-10 py-5 hover:border-aphoria-gold hover:text-aphoria-gold transition-all duration-300 group"
            >
              24 Gold Mask
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
