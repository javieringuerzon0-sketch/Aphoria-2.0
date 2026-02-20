import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../constants';

const ProductVideoHero: React.FC = () => {
  const ShopifyContext = 'shopify-context' as any;
  const ShopifyData = 'shopify-data' as any;
  const ShopifyMoney = 'shopify-money' as any;
  const product = FEATURED_PRODUCTS[1];
  const videoSrc = '/section%20avocado/avocado-video.mp4';

  return (
    <section id="signature-video" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: '-webkit-optimize-contrast' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      <div className="relative z-10 h-full w-full">
        <div className="max-w-[1360px] mx-auto h-full px-6 md:px-12 flex items-end pb-16 md:pb-24">
          <ShopifyContext type="product" handle={product.handle}>
            <template>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold">
                  Signature Treatment
                </span>
                <h2 className="mt-4 text-[30px] md:text-[40px] font-light text-white tracking-tight">
                  <ShopifyData query="product.title" />
                </h2>
                <p className="mt-4 text-[14px] uppercase tracking-[0.24em] text-white/75">
                  {product.tagline}
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-white/85 max-w-xl">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <span className="text-[22px] font-medium text-white">
                    <ShopifyMoney query="product.selectedOrFirstAvailableVariant.price" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">50ml</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={(e) => (document.querySelector('shopify-store') as any)?.buyNow(e)}
                    className="rounded-full bg-white px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[0.26em] text-aphoria-black transition-all duration-500 hover:-translate-y-[2px]"
                  >
                    Shop Cellular Restoration Cream
                  </button>
                  <button
                    onClick={(e) => (document.getElementById('main-cart') as any).addLine(e).showModal()}
                    className="rounded-full border border-white/30 px-7 py-[13px] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 transition-all duration-500 hover:border-white/60 hover:text-white"
                  >
                    Add to cart
                  </button>
                  <a
                    href="#science"
                    className="group relative overflow-hidden rounded-full border border-white/30 px-6 py-[12px] text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 transition-all duration-500 hover:border-white/70 hover:text-white"
                  >
                    <span className="relative z-10">Learn more</span>
                    <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0"></span>
                  </a>
                  <a
                    href="#science"
                    className="text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white"
                  >
                    Clinical evidence
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/85">
                    <Truck className="h-3.5 w-3.5 text-aphoria-gold" />
                    Free shipping
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/85">
                    <RefreshCw className="h-3.5 w-3.5 text-aphoria-gold" />
                    30-day returns
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/85">
                    <ShieldCheck className="h-3.5 w-3.5 text-aphoria-gold" />
                    Secure checkout
                  </span>
                </div>
              </motion.div>
            </template>

            <div shopify-loading-placeholder className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold">
                Signature Treatment
              </div>
              <div className="mt-4 text-[30px] md:text-[40px] font-light text-white tracking-tight">
                {product.name}
              </div>
              <div className="mt-4 text-[14px] uppercase tracking-[0.24em] text-white/75">
                {product.tagline}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="rounded-full bg-white px-8 py-[14px] text-[11px] font-semibold uppercase tracking-[0.26em] text-aphoria-black transition-all duration-500 hover:-translate-y-[2px]">
                  Shop now
                </button>
                <button className="rounded-full border border-white/30 px-7 py-[13px] text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 transition-all duration-500 hover:border-white/60 hover:text-white">
                  Add to cart
                </button>
                <a
                  href="#science"
                  className="group relative overflow-hidden rounded-full border border-white/30 px-6 py-[12px] text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 transition-all duration-500 hover:border-white/70 hover:text-white"
                >
                  <span className="relative z-10">Learn more</span>
                  <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0"></span>
                </a>
              </div>
            </div>
          </ShopifyContext>
        </div>
      </div>
    </section>
  );
};

export default ProductVideoHero;
