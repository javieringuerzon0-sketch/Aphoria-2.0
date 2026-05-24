import React from 'react';
import OptimizedImage from './OptimizedImage';
import FadeInView from './FadeInView';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../constants';

const ProductHero: React.FC = () => {
  const product = FEATURED_PRODUCTS[0];
  const productHeroImage = '/seccion%20gold%20mask/PROTOCOL%201.png';
  const productCardImage = '/seccion%20gold%20mask/PROTOCOL%202.png';
  const cardHeight = 'h-[520px] md:h-[620px]';

  return (
    <section id="ritual" className="relative py-20 md:py-28 bg-white px-6 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(198,161,91,0.16),_transparent_60%)]"></div>
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_bottom_right,_rgba(15,59,46,0.08),_transparent_60%)]"></div>

      <div className="max-w-[1360px] mx-auto relative">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold">Signature Treatment</span>
          <h2 className="mt-4 text-[28px] md:text-[36px] font-light text-aphoria-black tracking-tight">
            The protocol centerpiece for visible transformation
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-aphoria-mid">
            A focused hero built to anchor the ritual. Designed to integrate seamlessly with the full Aphoria protocol.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <FadeInView className="relative">
            <div className={`group relative overflow-hidden rounded-2xl bg-white cursor-pointer ${cardHeight}`}>
              <OptimizedImage
                src={productHeroImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-110 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] origin-center"
                loading="lazy"
                decoding="async"
              />
            </div>
            <FadeInView delay={100} className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-black/80 backdrop-blur">
                <Truck className="h-3.5 w-3.5 text-aphoria-gold" />
                Free shipping
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-black/80 backdrop-blur">
                <RefreshCw className="h-3.5 w-3.5 text-aphoria-gold" />
                30-day returns
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-black/80 backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-aphoria-gold" />
                Secure checkout
              </div>
            </FadeInView>

            {/* Trust block — fills the empty vertical space below the lifestyle
                image on desktop so both columns balance visually. Glassmorphism
                cards reuse the same visual language as Hero credentialing pills. */}
            {/* Premium trust block — applies to BOTH mobile and desktop.
                Soft warm gradient + gold ring + subtle hover lift + layered
                shadow. Same visual language as Hero pills but elevated as a
                primary content block. */}
            <FadeInView delay={180} className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
              {[
                { value: '1', label: <>Use for<br />visible glow</>, icon: null },
                { value: '10K+', label: <>Women trust<br />Aphoria</>, icon: null },
                { value: null, label: <>Dermatologist<br />tested</>, icon: <ShieldCheck className="h-7 w-7 text-aphoria-gold" strokeWidth={1.5} /> },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl px-3 md:px-4 py-5 md:py-7 text-center
                             border border-aphoria-gold/25
                             bg-gradient-to-br from-white/90 via-white/75 to-aphoria-bg/50
                             backdrop-blur-md
                             shadow-[0_8px_30px_-12px_rgba(198,161,91,0.20),0_2px_8px_-4px_rgba(0,0,0,0.04)]
                             hover:shadow-[0_18px_40px_-12px_rgba(198,161,91,0.32),0_4px_12px_-4px_rgba(0,0,0,0.06)]
                             active:shadow-[0_18px_40px_-12px_rgba(198,161,91,0.32),0_4px_12px_-4px_rgba(0,0,0,0.06)]
                             hover:-translate-y-1 active:-translate-y-1
                             hover:border-aphoria-gold/45 active:border-aphoria-gold/45
                             transition-all duration-500 ease-out"
                >
                  {/* Subtle gold corner glow — appears on hover/active touch */}
                  <div
                    className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700"
                    style={{ background: 'radial-gradient(circle, rgba(198,161,91,0.35) 0%, transparent 70%)' }}
                  />
                  {/* Hairline gold accent at top */}
                  <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-8 bg-aphoria-gold/50 rounded-full" />
                  <div className="relative flex flex-col items-center justify-center min-h-[44px] md:min-h-[56px]">
                    {stat.value ? (
                      <div className="font-brand text-[30px] md:text-[42px] font-light text-aphoria-gold leading-none tracking-tight">
                        {stat.value}
                      </div>
                    ) : (
                      stat.icon
                    )}
                  </div>
                  <div className="relative mt-3 text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-aphoria-black/70 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </FadeInView>

          </FadeInView>

          <FadeInView delay={120} className="w-full">
            {/* Product image card — visually balances the left lifestyle shot.
                Hover lift mirrors the left card so both feel like a pair. */}
            <div className={`group relative overflow-hidden rounded-2xl bg-white cursor-pointer ${cardHeight}`}>
              <OptimizedImage
                src={productCardImage}
                alt={`${product.name} product shot`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] origin-center"
                loading="lazy"
                decoding="async"
              />
              {/* Bottom gradient + name overlay — gives the image card a tagline without breaking the photographic feel */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-aphoria-black/75 via-aphoria-black/30 to-transparent px-6 pt-16 pb-6">
                <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold">Signature Protocol</span>
                <h3 className="mt-2 text-[24px] md:text-[28px] font-light text-white tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/75">
                  {product.tagline}
                </p>
              </div>
            </div>

            {/* Detail panel — minimal premium layout: description, price, 2
                badges, single primary CTA, sutil link. */}
            <div className="mt-6 px-1 md:px-2">
              <p className="text-[15px] md:text-[16px] leading-relaxed text-aphoria-mid max-w-md">
                {product.description}
              </p>

              <div className="mt-7 text-[32px] md:text-[36px] font-light text-aphoria-black tracking-tight leading-none">
                ${product.variants['1pc'].price}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-aphoria-gold/25 bg-aphoria-gold/5 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-aphoria-gold/90">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Limited Stock · 8 Left
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-aphoria-green/25 bg-aphoria-green/5 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-aphoria-green">
                  ✓ 10% Off First Order
                </span>
              </div>

              <Link
                to="/product/24-gold-mask"
                className="mt-7 inline-flex w-full md:w-auto items-center justify-center gap-3 px-10 md:px-12 py-4 bg-aphoria-black text-white rounded-full text-[10px] font-bold tracking-[0.22em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl group"
              >
                Get My Transformation Kit
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInView>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="group relative rounded-2xl border border-aphoria-gold/20 bg-gradient-to-br from-white via-aphoria-bg/50 to-white/80 px-6 py-6 shadow-[0_8px_30px_rgba(198,161,91,0.08)] hover:shadow-[0_12px_40px_rgba(198,161,91,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-aphoria-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-aphoria-gold text-lg">✦</span>
                <div className="text-[10px] uppercase tracking-[0.3em] text-aphoria-gold font-medium">Protocol fit</div>
              </div>
              <div className="text-[14px] text-aphoria-black leading-relaxed">Built to pair with your daily routine.</div>
            </div>
          </div>
          <div className="group relative rounded-2xl border border-aphoria-green/20 bg-gradient-to-br from-white via-aphoria-bg/50 to-white/80 px-6 py-6 shadow-[0_8px_30px_rgba(15,59,46,0.08)] hover:shadow-[0_12px_40px_rgba(15,59,46,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-aphoria-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-aphoria-green text-lg">✦</span>
                <div className="text-[10px] uppercase tracking-[0.3em] text-aphoria-green font-medium">Clinical focus</div>
              </div>
              <div className="text-[14px] text-aphoria-black leading-relaxed">Actives selected for measurable change.</div>
            </div>
          </div>
          <div className="group relative rounded-2xl border border-aphoria-gold/20 bg-gradient-to-br from-white via-aphoria-bg/50 to-white/80 px-6 py-6 shadow-[0_8px_30px_rgba(198,161,91,0.08)] hover:shadow-[0_12px_40px_rgba(198,161,91,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-aphoria-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-aphoria-gold text-lg">✦</span>
                <div className="text-[10px] uppercase tracking-[0.3em] text-aphoria-gold font-medium">Simple ritual</div>
              </div>
              <div className="text-[14px] text-aphoria-black leading-relaxed">Two minutes, morning and evening.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
