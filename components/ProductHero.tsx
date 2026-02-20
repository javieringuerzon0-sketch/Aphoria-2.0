import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../constants';

const ProductHero: React.FC = () => {
  const ShopifyContext = 'shopify-context' as any;
  const ShopifyData = 'shopify-data' as any;
  const ShopifyMoney = 'shopify-money' as any;
  const product = FEATURED_PRODUCTS[0];
  const productHeroImage = '/seccion%20gold%20mask/imagen-section.png';
  const productCardImage = '/seccion%20gold%20mask/imagen-producto.png';
  const cardHeight = 'h-[520px] md:h-[620px]';

  return (
    <section id="signature" className="relative py-20 md:py-28 bg-white px-6 overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className={`group relative overflow-hidden rounded-2xl bg-white cursor-pointer ${cardHeight}`}>
              <img
                src={productHeroImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformOrigin: 'center center',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <motion.div
                animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-black/80 backdrop-blur"
              >
                <Truck className="h-3.5 w-3.5 text-aphoria-gold" />
                Free shipping
              </motion.div>
              <motion.div
                animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-black/80 backdrop-blur"
              >
                <RefreshCw className="h-3.5 w-3.5 text-aphoria-gold" />
                30-day returns
              </motion.div>
              <motion.div
                animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/10 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-aphoria-black/80 backdrop-blur"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-aphoria-gold" />
                Secure checkout
              </motion.div>
            </motion.div>
          </motion.div>

          <ShopifyContext type="product" handle={product.handle}>
            <template>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className={`rounded-2xl bg-aphoria-bg/40 p-8 ${cardHeight} flex flex-col justify-between`}>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold">Signature Protocol</span>
                    <h2 className="mt-4 text-[30px] md:text-[38px] font-light text-aphoria-black tracking-tight">
                      <ShopifyData query="product.title" />
                    </h2>
                    <p className="mt-3 text-[13px] uppercase tracking-[0.24em] text-aphoria-mid">
                      {product.tagline}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                      <span className="text-[22px] font-medium text-aphoria-black">
                        <ShopifyMoney query="product.selectedOrFirstAvailableVariant.price" />
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.24em] text-aphoria-mid">50ml</span>
                    </div>

                    <p className="mt-5 text-[15px] leading-relaxed text-aphoria-mid">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-aphoria-gold"></span>
                      <div>
                        <div className="text-[12px] uppercase tracking-[0.28em] text-aphoria-black">Clinical delivery</div>
                        <div className="text-[13px] text-aphoria-mid">Precision dosed for visible results.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-aphoria-gold"></span>
                      <div>
                        <div className="text-[12px] uppercase tracking-[0.28em] text-aphoria-black">Barrier support</div>
                        <div className="text-[13px] text-aphoria-mid">Supports lipid balance and resilience.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Urgency/Scarcity Badges */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-aphoria-gold/10 border border-aphoria-gold/20 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-aphoria-gold">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Limited Stock: Only 8 Left
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-aphoria-green/10 border border-aphoria-green/20 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-aphoria-green">
                    ✓ 15% Off First Order
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={(e) => (document.querySelector('shopify-store') as any)?.buyNow(e)}
                    className="rounded-full bg-aphoria-green px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[0.26em] text-white shadow-[0_12px_28px_rgba(15,59,46,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(15,59,46,0.35)]"
                  >
                    Get My Transformation Kit
                  </button>
                  <button
                    onClick={(e) => (document.getElementById('main-cart') as any).addLine(e).showModal()}
                    className="rounded-full border border-aphoria-black/15 px-7 py-[13px] text-[11px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/80 transition-all duration-500 hover:border-aphoria-black/40 hover:text-aphoria-black"
                  >
                    Add to cart
                  </button>
                  <a
                    href="#science"
                    className="text-[11px] uppercase tracking-[0.24em] text-aphoria-black/60 hover:text-aphoria-black"
                  >
                    See clinical results
                  </a>
                </div>

              </motion.div>
            </template>

            <div shopify-loading-placeholder className="rounded-2xl bg-white/80">
              <div className={`group w-full rounded-2xl bg-white overflow-hidden cursor-pointer ${cardHeight}`}>
                <img
                  src={productCardImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformOrigin: 'center center',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button className="rounded-full bg-aphoria-black px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[0.26em] text-white transition-all duration-500 hover:-translate-y-[2px] hover:opacity-95">
                  Shop now
                </button>
                <button className="rounded-full border border-aphoria-black/15 px-7 py-[13px] text-[11px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/80 transition-all duration-500 hover:border-aphoria-black/40 hover:text-aphoria-black">
                  Add to cart
                </button>
              </div>
            </div>
          </ShopifyContext>
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
