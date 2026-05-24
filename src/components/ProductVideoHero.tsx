import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../constants';
import { useCartStore } from '../store/useCartStore';

const ProductVideoHero: React.FC = () => {
  const product = FEATURED_PRODUCTS[1];

  const addItemAndOpen = useCartStore((s) => s.addItemAndOpen);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver: play when visible, pause when not
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const addAvocadoToCart = () => {
    const v = product.variants['1pc'];
    addItemAndOpen({
      variantId: v.id,
      title: product.name,
      variantTitle: v.name,
      price: v.price,
      img: v.img,
    });
  };
  const videoSrc = '/section%20avocado/avocado-video.mp4';

  return (
    <section ref={sectionRef} id="signature-video" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: '-webkit-optimize-contrast' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* On mobile a stronger bottom gradient gives the smaller copy enough
          contrast against the bright sky/jar without darkening the whole image. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent md:from-black/40 md:via-black/10" />

      <div className="relative z-10 h-full w-full">
        {/* Bottom padding on mobile is large enough to clear the sticky cart bar
            (~64px) plus breathing room. On desktop the bar is part of nav, so we
            keep the original pb-24. */}
        <div className="max-w-[1360px] mx-auto h-full px-6 md:px-12 flex items-end pb-24 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.28em] md:tracking-[0.32em] text-aphoria-gold">
              Signature Treatment
            </span>
            <h2 className="mt-2 md:mt-4 text-[22px] md:text-[40px] font-light leading-[1.1] text-white tracking-tight">
              {product.name}
            </h2>
            <p className="mt-2 md:mt-4 text-[10px] md:text-[14px] uppercase tracking-[0.18em] md:tracking-[0.24em] text-white/75">
              {product.tagline}
            </p>
            {/* Long description + price + service pills hidden on mobile —
                they crowd the jar. Desktop keeps the full block. */}
            <p className="hidden md:block mt-5 text-[15px] leading-relaxed text-white/85 max-w-xl">
              {product.description}
            </p>

            <div className="hidden md:flex mt-6 items-center gap-4">
              <span className="text-[22px] font-medium text-white">
                ${product.variants['1pc'].price}
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">50ml</span>
            </div>

            <div className="mt-4 md:mt-8 flex flex-wrap items-center gap-2 md:gap-4">
              <Link
                to="/product/avocado-mask"
                className="inline-flex items-center gap-2 md:gap-3 px-5 md:px-12 py-2.5 md:py-4 bg-aphoria-black text-white rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.18em] md:tracking-[0.2em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl group"
              >
                <span className="md:hidden">Shop now</span>
                <span className="hidden md:inline">Shop Avocado Ceramide Mask</span>
                <ChevronRight size={12} className="md:w-[14px] md:h-[14px] group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={addAvocadoToCart}
                className="rounded-full border border-white/30 px-4 md:px-7 py-2.5 md:py-[13px] text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.18em] md:tracking-[0.22em] text-white/85 transition-all duration-500 hover:border-white/60 hover:text-white"
              >
                Add to cart
              </button>
              <Link
                to="/product/avocado-mask"
                className="group relative overflow-hidden rounded-full border border-white/30 px-4 md:px-6 py-2.5 md:py-[12px] text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.18em] md:tracking-[0.24em] text-white/85 transition-all duration-500 hover:border-white/70 hover:text-white"
              >
                <span className="relative z-10">Learn more</span>
                <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0"></span>
              </Link>
              <Link
                to="/product/avocado-mask"
                className="hidden md:inline text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white"
              >
                Clinical evidence
              </Link>
            </div>

            {/* Service pills hidden on mobile — already shown on /product page. */}
            <div className="hidden md:flex mt-6 flex-wrap items-center gap-3">
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
        </div>
      </div>
    </section>
  );
};

export default ProductVideoHero;
