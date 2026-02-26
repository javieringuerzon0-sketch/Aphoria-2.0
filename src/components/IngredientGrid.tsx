import { motion } from 'framer-motion';
import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { SCIENCE_INGREDIENTS } from '../constants';

const IngredientGrid: React.FC = () => {
  const VARIANTS = {
    clinical: {
      section: 'relative py-20 md:py-28 bg-white px-6',
      showAccents: false,
      badge: 'text-[11px] uppercase tracking-[0.3em] text-aphoria-black/60',
      heading: 'mt-4 text-[28px] md:text-[34px] font-medium text-aphoria-black tracking-tight',
      subcopy: 'mt-5 max-w-md text-aphoria-mid text-[15px] leading-relaxed',
      chip: 'rounded-sm border border-aphoria-black/10 bg-white px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-aphoria-black',
      cta: 'inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-aphoria-black/70 hover:text-aphoria-black',
      card: 'group relative rounded-lg border border-aphoria-black/10 bg-white p-8 transition-all duration-500 hover:border-aphoria-black/30',
      cardShadow: 'hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]',
      activeLabel: 'text-[10px] uppercase tracking-[0.3em] text-aphoria-black/50',
      mechanismLabel: 'text-[10px] uppercase tracking-[0.24em] text-aphoria-black/50',
      title: 'text-[18px] font-medium text-aphoria-black mb-3 tracking-tight',
      body: 'text-[14px] leading-relaxed text-aphoria-mid font-normal mb-6',
      divider: 'border-aphoria-black/10',
      ingredientName: 'text-[11px] uppercase tracking-[0.28em] text-aphoria-mid mb-2',
      clinicalName: 'font-mono text-[11px] uppercase tracking-[0.2em] text-aphoria-black/70 mb-3',
      mechanism: 'text-[13px] leading-relaxed text-aphoria-mid font-light'
    },
    luxury: {
      section: 'relative py-20 md:py-28 bg-aphoria-bg px-6 overflow-hidden',
      showAccents: true,
      badge: 'text-[11px] uppercase tracking-[0.3em] text-aphoria-gold',
      heading: 'mt-4 text-[28px] md:text-[34px] font-light text-aphoria-black tracking-tight',
      subcopy: 'mt-5 max-w-md text-aphoria-mid text-[15px] leading-relaxed',
      chip: 'rounded-full border border-aphoria-black/10 bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-aphoria-black',
      cta: 'inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-aphoria-black/80 hover:text-aphoria-black',
      card: 'group relative rounded-2xl border border-aphoria-black/10 bg-white/70 p-8 backdrop-blur transition-all duration-500 hover:border-aphoria-gold/40',
      cardShadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]',
      activeLabel: 'text-[10px] uppercase tracking-[0.3em] text-aphoria-gold',
      mechanismLabel: 'text-[10px] uppercase tracking-[0.24em] text-aphoria-mid',
      title: 'text-[18px] font-medium text-aphoria-black mb-3 tracking-tight',
      body: 'text-[14px] leading-relaxed text-aphoria-mid font-normal mb-6',
      divider: 'border-aphoria-black/10',
      ingredientName: 'text-[11px] uppercase tracking-[0.28em] text-aphoria-mid mb-2',
      clinicalName: 'font-mono text-[11px] uppercase tracking-[0.2em] text-aphoria-gold mb-3',
      mechanism: 'text-[13px] leading-relaxed text-aphoria-mid font-light'
    },
    balanced: {
      section: 'relative py-20 md:py-28 bg-gradient-to-b from-aphoria-bg to-white px-6 overflow-hidden',
      showAccents: true,
      badge: 'text-[11px] uppercase tracking-[0.3em] text-aphoria-gold',
      heading: 'mt-4 text-[28px] md:text-[34px] font-light text-aphoria-black tracking-tight',
      subcopy: 'mt-5 max-w-md text-aphoria-mid text-[15px] leading-relaxed',
      chip: 'rounded-full border border-aphoria-black/10 bg-white px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-aphoria-black',
      cta: 'inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-aphoria-black/80 hover:text-aphoria-black',
      card: 'group relative rounded-xl border border-aphoria-black/10 bg-white/90 p-8 transition-all duration-500 hover:border-aphoria-black/25',
      cardShadow: 'shadow-[0_18px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_26px_52px_rgba(0,0,0,0.1)]',
      activeLabel: 'text-[10px] uppercase tracking-[0.3em] text-aphoria-gold',
      mechanismLabel: 'text-[10px] uppercase tracking-[0.24em] text-aphoria-mid',
      title: 'text-[18px] font-medium text-aphoria-black mb-3 tracking-tight',
      body: 'text-[14px] leading-relaxed text-aphoria-mid font-normal mb-6',
      divider: 'border-aphoria-black/10',
      ingredientName: 'text-[11px] uppercase tracking-[0.28em] text-aphoria-mid mb-2',
      clinicalName: 'font-mono text-[11px] uppercase tracking-[0.2em] text-aphoria-gold mb-3',
      mechanism: 'text-[13px] leading-relaxed text-aphoria-mid font-light'
    }
  } as const;

  const variant: keyof typeof VARIANTS = 'luxury';
  const styles = VARIANTS[variant];
  const ingredientImages: Record<string, string> = {
    'Deep Hydration': '/clinical%20index/deep-hydratation.PNG',
    'Radiance Activation': '/clinical%20index/radiance-ativation.PNG'
  };
  const ingredientMeta: Record<
    string,
    { result: string; timeline: string; badges: string[]; feel: string[]; summary: string }
  > = {
    'Deep Hydration': {
      result: 'Soft, hydrated skin',
      timeline: '1-2 weeks',
      badges: ['Dryness relief', 'Comfort boost'],
      feel: ['Locks in moisture', 'Keeps skin calm'],
      summary: 'Daily hydration that keeps skin supple and comfortable from morning to night.'
    },
    'Radiance Activation': {
      result: 'Healthy glow',
      timeline: '1-3 weeks',
      badges: ['Tone brightening', 'Glow boost'],
      feel: ['Brightens dullness', 'Evens tone'],
      summary: 'Brings back radiance and helps your complexion look more even and luminous.'
    }
  };
  const orderedIngredients = [...SCIENCE_INGREDIENTS].filter(
    (item) => item.benefitHeadline === 'Deep Hydration' || item.benefitHeadline === 'Radiance Activation'
  ).sort(
    (a, b) =>
      ['Deep Hydration', 'Radiance Activation'].indexOf(a.benefitHeadline) -
      ['Deep Hydration', 'Radiance Activation'].indexOf(b.benefitHeadline)
  );

  return (
    <section id="science" className={styles.section}>
      {styles.showAccents && (
        <>
          <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(198,161,91,0.22),_transparent_60%)]"></div>
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_bottom_right,_rgba(17,17,17,0.08),_transparent_65%)]"></div>
        </>
      )}

      <div className="max-w-[1360px] mx-auto relative">
        <div className="grid lg:grid-cols-[1.05fr_2fr] gap-16 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className={styles.badge}>Clinical Index</span>
              <h2 className={styles.heading}>
                Formulation Intelligence
              </h2>
              <p className={styles.subcopy}>
                Evidence-led actives mapped to cellular mechanisms. Precision dosage, no filler, full biocompatibility.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className={styles.chip}>
                  Skin-friendly
                </span>
                <span className={styles.chip}>
                  Premium Quality
                </span>
                <span className={styles.chip}>
                  Carefully Balanced
                </span>
              </div>
              <div className="mt-8 rounded-2xl border border-aphoria-black/10 bg-white/70 p-5">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] text-[10px] uppercase tracking-[0.24em] text-aphoria-mid mb-3">
                  <span></span>
                  <span>Aphoria</span>
                  <span>Others</span>
                </div>
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] text-[12px] text-aphoria-black">
                  <span>Premium ingredients</span>
                  <span className="text-aphoria-gold">✓</span>
                  <span className="text-aphoria-mid">Varies</span>
                </div>
                <div className="mt-2 grid grid-cols-[1.2fr_0.8fr_0.8fr] text-[12px] text-aphoria-black">
                  <span>Optimal concentration</span>
                  <span className="text-aphoria-gold">✓</span>
                  <span className="text-aphoria-mid">Not always</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#ritual"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-aphoria-green px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_32px_rgba(15,59,46,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_20px_44px_rgba(15,59,46,0.35)]"
                >
                  Shop clinical treatments
                  <span className="text-[12px]">→</span>
                </a>
                <a
                  href="#protocol"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-aphoria-black/70 hover:text-aphoria-black"
                >
                  See protocol steps
                  <span className="h-[1px] w-8 bg-aphoria-black/40"></span>
                </a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-aphoria-black/10 bg-white/70 p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-aphoria-mid mb-2">Before</div>
                  <div className="text-[12px] text-aphoria-black">Dullness, dehydration</div>
                </div>
                <div className="rounded-xl border border-aphoria-black/10 bg-white/70 p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-aphoria-mid mb-2">After 28 days</div>
                  <div className="text-[12px] text-aphoria-black">Comfort, luminosity</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orderedIngredients.map((item, index) => {
              const imgSrc = ingredientImages[item.benefitHeadline];
              const [isExpanded, setIsExpanded] = useState(false);
              return (
                <div
                  key={item.name}
                  className={`${styles.card} ${styles.cardShadow}`}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <div className="mb-6 overflow-hidden rounded-xl border border-white/60 bg-aphoria-bg/60">
                    <OptimizedImage
                      src={imgSrc}
                      alt={item.name}
                      className="h-44 md:h-48 lg:h-52 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={styles.activeLabel}>Focus 0{index + 1}</span>
                    <span className={styles.mechanismLabel}>Benefit</span>
                  </div>

                  <h3 className={styles.title}>
                    {item.benefitHeadline}
                  </h3>
                  <p className={styles.body}>
                    {ingredientMeta[item.benefitHeadline]?.summary}
                  </p>

                  <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-aphoria-mid">
                    <span>Result: {ingredientMeta[item.benefitHeadline]?.result}</span>
                    <span>{ingredientMeta[item.benefitHeadline]?.timeline}</span>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {ingredientMeta[item.benefitHeadline]?.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-aphoria-black/10 bg-white/70 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-aphoria-black/80"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className={`pt-6 border-t ${styles.divider}`}>
                    <div className={styles.ingredientName}>
                      {item.name}
                    </div>
                    <div className="mt-4">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-aphoria-mid mb-2">What you'll notice</div>
                      <div className="text-[13px] text-aphoria-mid">
                        {ingredientMeta[item.benefitHeadline]?.feel.join('. ')}.
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientGrid;
