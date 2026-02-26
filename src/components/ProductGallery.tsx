import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

const STYLES = `
  @keyframes appleFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-22px); }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%       { opacity: 0.65; transform: scale(1.08); }
  }

  @keyframes aphoriaShadow {
    0%, 100% { transform: scaleX(1); opacity: 0.5; }
    50%       { transform: scaleX(0.8); opacity: 0.25; }
  }

  @keyframes gradientFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes appleShine {
    0%   { transform: translateX(-200%) rotate(45deg); opacity: 0; }
    50%  { opacity: 1; }
    100% { transform: translateX(200%) rotate(45deg); opacity: 0; }
  }

  .product-float-wrapper {
    /* SOLO translateY — sin perspective, sin preserve-3d, sin willChange */
    animation: appleFloat 7s ease-in-out infinite;
    position: relative;
  }

  .product-float-wrapper-delayed {
    animation: appleFloat 7s ease-in-out infinite 0.8s;
    position: relative;
  }

  .product-img-main {
    display: block;
    width: 100%;
    height: auto;
    image-rendering: auto;
    /* Removed heavy mix-blend-mode and will-change for better performance */
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .product-glow {
    position: absolute;
    inset: -2rem;
    border-radius: 50%;
    z-index: -1;
    /* Reduced blur for performance */
    filter: blur(40px);
    animation: glowPulse 4s ease-in-out infinite;
    pointer-events: none;
    opacity: 0.5;
  }

  .product-ground-shadow {
    position: absolute;
    bottom: -18px;
    left: 12%;
    width: 76%;
    height: 28px;
    background: radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 68%);
    /* Simplified shadow */
    animation: aphoriaShadow 7s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
  }

  .product-ground-shadow-delayed {
    animation: aphoriaShadow 7s ease-in-out infinite 0.8s;
  }

  .product-reflection {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 55%;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
    transform: scaleY(-1);
    transform-origin: top;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 65%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 65%);
    opacity: 0.4;
  }

  .product-reflection img {
    width: 100%;
    height: auto;
    display: block;
    /* MISMO transform que la imagen principal */
    transform: translateZ(0);
    image-rendering: auto;
    mix-blend-mode: multiply;
  }
`;

const ProductGallery: React.FC = () => {
  // Use centralized products
  const products = PRODUCTS;

  // Bundle calculation based on centralized data
  const goldMask = products.find(p => p.handle === '24-gold-mask')!;
  const avocadoMask = products.find(p => p.handle === 'avocado-mask')!;

  const bundlePrice = 53.98; // Offer price ($63.98 - $10.00)
  const bundleRegular = goldMask.variants['1pc'].price + avocadoMask.variants['1pc'].price; // $63.98
  const bundleSavings = (bundleRegular - bundlePrice).toFixed(2); // $10.00
  const bundleDiscount = Math.round(((bundleRegular - bundlePrice) / bundleRegular) * 100); // 16%

  const { addItem, open: openCart, checkout } = useCartStore();

  const BUNDLE_DISCOUNT_CODE = import.meta.env.VITE_BUNDLE_DISCOUNT_CODE || '';

  const addBundleAndCheckout = () => {
    const gv = goldMask.variants['1pc'];
    addItem({ variantId: gv.shopifyVariantId || `local-${gv.id}`, title: goldMask.name, variantTitle: gv.name, price: gv.price, img: goldMask.galleryImg || gv.img });
    const av = avocadoMask.variants['1pc'];
    addItem({ variantId: av.shopifyVariantId || `local-${av.id}`, title: avocadoMask.name, variantTitle: av.name, price: av.price, img: avocadoMask.galleryImg || av.img });
    checkout(BUNDLE_DISCOUNT_CODE || undefined);
  };

  const addProductToCart = (product: Product) => {
    const v = product.variants['1pc'];
    addItem({ variantId: v.shopifyVariantId || `local-${v.id}`, title: product.name, variantTitle: v.name, price: v.price, img: product.galleryImg || v.img });
    openCart();
  };

  const buyProductNow = (product: Product) => {
    const v = product.variants['1pc'];
    addItem({ variantId: v.shopifyVariantId || `local-${v.id}`, title: product.name, variantTitle: v.name, price: v.price, img: product.galleryImg || v.img });
    checkout();
  };


  return (
    <section id="bundle" className="relative py-20 md:py-28 bg-aphoria-bg px-6" style={{ willChange: 'transform' }}>
      <style>{STYLES}</style>

      {/* Decorative accents */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(198,161,91,0.15),_transparent_60%)]"></div>
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_bottom_right,_rgba(15,59,46,0.1),_transparent_60%)]"></div>

      <div className="max-w-[1360px] mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-aphoria-gold">The Collection</span>
          <h2 className="mt-4 text-[28px] md:text-[36px] font-brand font-light text-aphoria-black tracking-tight mb-4">
            Transform Your Skin in 28 Days
          </h2>
          <p className="text-[15px] text-aphoria-mid leading-relaxed">
            Bioactive formulations designed to deliver visible results. Each mask targets specific skin concerns with clinical-grade ingredients.
          </p>
        </motion.div>

        {/* BUNDLE OFFER - Complete Transformation Kit */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-16 relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-aphoria-gold/20 via-aphoria-green/20 to-aphoria-gold/20 blur-3xl opacity-50 rounded-3xl"></div>

          <div className="relative bg-white rounded-3xl border-2 border-aphoria-gold/30 p-6 md:p-8 shadow-2xl overflow-visible">
            {/* Badge */}
            <div style={{ position: 'absolute', top: '-1.25rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
              <div className="text-white px-6 md:px-8 py-2.5 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.24em] md:tracking-[0.28em] font-bold shadow-xl flex items-center gap-2 whitespace-nowrap" style={{ background: 'linear-gradient(to right, #C6A15B, #0F3B2E)', color: 'white' }}>
                <span className="text-[14px]">⚡</span>
                <span>Best Value • Save ${bundleSavings}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_auto_1fr_1.2fr] gap-10 md:gap-16 items-center mt-8">
              {/* Gold Mask - Apple Premium Style */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Wrapper con SOLO translateY — sin preserve-3d ni willChange */}
                <div className="product-float-wrapper group">
                  {/* Imagen principal — SIN filter, SIN drop-shadow */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={'/bundlee/goldmask-bundlee.png'}
                      alt="24 Gold Mask"
                      className="product-img-main z-10 group-hover:scale-[1.04]"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />

                    {/* Reflejo — imagen duplicada SIN filter, solo mask */}
                    <div className="product-reflection">
                      <img
                        src={'/bundlee/goldmask-bundlee.png'}
                        alt=""
                      />
                    </div>

                    {/* Sombra en el suelo — div separado */}
                    <div className="product-ground-shadow" />
                  </div>

                  {/* Shine on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)',
                        animation: 'appleShine 1.5s ease-out',
                        transform: 'translateX(-100%)'
                      }}
                    />
                  </div>
                </div>

                <motion.div
                  className="mt-20 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <Link to="/product/24-gold-mask">
                    <h3 className="text-[20px] font-bold text-aphoria-black tracking-tight mb-2 hover:text-aphoria-gold transition-colors" style={{ letterSpacing: '-0.02em' }}>
                      24 Gold Mask
                    </h3>
                  </Link>
                  <p className="text-[13px] text-aphoria-gold uppercase tracking-[0.2em] font-semibold">
                    Radiance Treatment
                  </p>
                </motion.div>
              </motion.div>

              {/* Plus Symbol - Apple Style */}
              <motion.div
                className="flex flex-col items-center justify-center self-center lg:mx-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div
                  className="text-[72px] font-thin text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #C6A15B 0%, #0F3B2E 50%, #C6A15B 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientFlow 4s ease infinite',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 4px 20px rgba(198,161,91,0.3)',
                    fontWeight: 100
                  }}
                >
                  +
                </div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-aphoria-mid mt-3 font-semibold">
                  Complete Kit
                </div>
              </motion.div>

              {/* Avocado Mask - Apple Premium Style */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="product-float-wrapper-delayed group">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={'/bundlee/avocado-bundlee.png'}
                      alt="Avocado Mask"
                      className="product-img-main z-10 group-hover:scale-[1.04]"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />

                    <div className="product-reflection">
                      <img
                        src={'/bundlee/avocado-bundlee.png'}
                        alt=""
                      />
                    </div>

                    <div className="product-ground-shadow product-ground-shadow-delayed" />
                  </div>

                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)',
                        animation: 'appleShine 1.5s ease-out',
                        transform: 'translateX(-100%)'
                      }}
                    />
                  </div>
                </div>

                <motion.div
                  className="mt-20 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.8 }}
                >
                  <h3 className="text-[20px] font-bold text-aphoria-black tracking-tight mb-2" style={{ letterSpacing: '-0.02em' }}>
                    Avocado Mask
                  </h3>
                  <p className="text-[13px] text-aphoria-green uppercase tracking-[0.2em] font-semibold">
                    Hydration Treatment
                  </p>
                </motion.div>
              </motion.div>

              {/* Bundle Details */}
              <div className="lg:col-start-4 text-center">
                <h3 className="text-[24px] md:text-[28px] font-brand font-light text-aphoria-black mb-2 leading-tight">
                  28-Day Complete
                  <br />
                  Transformation Kit
                </h3>
                <p className="text-[13px] text-aphoria-mid mb-4">
                  Gold Mask + Avocado Mask
                </p>

                {/* Price */}
                <div className="flex items-center justify-center gap-4 mb-5">
                  <span className="text-[18px] text-aphoria-mid line-through">
                    ${bundleRegular.toFixed(2)}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] text-aphoria-black">$</span>
                    <span className="text-[48px] font-bold text-aphoria-black tabular-nums leading-none">
                      {Math.floor(bundlePrice)}
                    </span>
                    <span className="text-[24px] text-aphoria-black">
                      .{(bundlePrice % 1).toFixed(2).substring(2)}
                    </span>
                  </div>
                  <div className="bg-aphoria-green text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide">
                    Save {bundleDiscount}%
                  </div>
                </div>

                {/* Social Proof */}
                <div className="bg-aphoria-bg/50 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="flex -space-x-2">
                      {[
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=160&h=160&q=80',
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=160&h=160&q=80',
                        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=facearea&w=160&h=160&q=80',
                        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=160&h=160&q=80'
                      ].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Customer ${i + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-aphoria-mid">
                      <strong className="text-aphoria-black">2,847</strong> bought this week
                    </span>
                  </div>
                  <p className="text-[13px] text-aphoria-black leading-relaxed">
                    ⭐ <strong>92% of customers</strong> who buy both see faster, more dramatic results
                  </p>
                </div>
              </div>
            </div>

            {/* CTA — centered across full card width */}
            <div className="mt-8 max-w-md mx-auto px-4">
              <button
                onClick={addBundleAndCheckout}
                className="w-full relative overflow-hidden rounded-full py-5 text-[12px] uppercase tracking-[0.28em] font-bold shadow-[0_16px_40px_rgba(15,59,46,0.3)] hover:opacity-90 transition-all flex items-center justify-center"
                style={{ background: 'linear-gradient(to right, #0F3B2E, #1a5c47)', color: 'white' }}
              >
                <span style={{ color: 'white' }} className="flex items-center gap-2">
                  Get Complete Kit - Save $10
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
              <p className="text-[10px] text-aphoria-mid mt-3 text-center uppercase tracking-wide">
                🔒 60-Day Guarantee • Free Shipping • Save ${bundleSavings}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-16 flex items-center justify-center">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-aphoria-black/10 to-transparent"></div>
          <span className="px-6 text-[10px] uppercase tracking-[0.28em] text-aphoria-mid whitespace-nowrap">
            Or Choose Individual Masks
          </span>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-aphoria-black/10 to-transparent"></div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.15 }}
              className="group"
            >
              {/* Product Card */}
              <div className="relative rounded-2xl border border-aphoria-black/10 bg-white/80 backdrop-blur overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500">
                {/* Image */}
                {/* Image Wrap for Apple Style */}
                <div className="relative h-[480px] overflow-hidden bg-gradient-to-br from-aphoria-bg/50 to-white/80 flex items-center justify-center">
                  <div className="product-float-wrapper group/float w-full relative">
                    {/* Glow */}
                    <div
                      className="product-glow"
                      style={{
                        background: index % 2 === 0
                          ? 'radial-gradient(circle, rgba(198,161,91,0.3) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(15,59,46,0.3) 0%, transparent 70%)'
                      }}
                    />

                    <div className="relative">
                      <img
                        src={product.galleryImg || product.variants['1pc'].img}
                        alt={product.name}
                        className="product-img-main z-10 transition-transform duration-700 group-hover/float:scale-105"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                      />

                      {/* Reflection */}
                      <div className="product-reflection">
                        <img
                          src={product.galleryImg || product.variants['1pc'].img}
                          alt=""
                        />
                      </div>

                      {/* Ground Shadow */}
                      <div className="product-ground-shadow" />
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/float:opacity-100 transition-opacity duration-300 z-20">
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)',
                          animation: 'appleShine 1.5s ease-out',
                          transform: 'translateX(-100%)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 flex-wrap z-30">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-aphoria-green/95 backdrop-blur-sm border border-aphoria-green/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-white shadow-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Bestseller
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-aphoria-gold/95 backdrop-blur-sm border border-aphoria-gold/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.20em] text-white shadow-lg animate-pulse">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <CountdownTimer />
                    </div>
                  </div>

                  {/* Recommended badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-30">
                    <div className="inline-flex items-center gap-2 rounded-full bg-aphoria-black/80 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/90 shadow-xl">
                      ✦ {product.recommended}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <Link to={`/product/${product.handle}`}>
                      <h3 className="text-[24px] font-brand font-light text-aphoria-black tracking-tight mb-2 hover:text-aphoria-gold transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-aphoria-mid">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-[14px] text-aphoria-mid leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-6 space-y-2">
                    {product.benefits?.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-aphoria-black">
                        <svg className="w-4 h-4 text-aphoria-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>


                  {/* Price & CTA - ENHANCED */}
                  <div className="pt-6 border-t border-aphoria-black/10">
                    {/* Price Display */}
                    <div className="bg-aphoria-bg/50 rounded-xl p-4 mb-4">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-[11px] uppercase tracking-wide text-aphoria-mid block mb-1">
                            Regular Price
                          </span>
                          <div className="text-[20px] text-aphoria-mid line-through">
                            ${product.variants['1pc'].regularPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-aphoria-gold text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide">
                          Save {Math.round(((product.variants['1pc'].regularPrice - product.variants['1pc'].price) / product.variants['1pc'].regularPrice) * 100)}%
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-[16px] text-aphoria-black/70">$</span>
                        <span className="text-[52px] font-bold text-aphoria-black tabular-nums leading-none">
                          {Math.floor(product.variants['1pc'].price)}
                        </span>
                        <span className="text-[28px] text-aphoria-black/70">
                          .{(product.variants['1pc'].price % 1).toFixed(2).substring(2)}
                        </span>
                      </div>

                      <div className="text-[11px] text-aphoria-mid">
                        Less than <strong className="text-aphoria-green font-semibold">
                          ${(product.perUsePrice || 1).toFixed(2)} per use
                        </strong>

                        <span className="block text-[9px] mt-1 text-aphoria-mid/80">
                          Based on 2-3x weekly application for 28 days
                        </span>
                      </div>
                    </div>

                    {/* Guarantee & Shipping */}
                    <div className="mb-4 p-3 rounded-lg bg-aphoria-gold/5 border border-aphoria-gold/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-aphoria-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="text-[11px] font-medium text-aphoria-gold uppercase tracking-[0.22em]">
                              60-Day Guarantee
                            </div>
                            <div className="text-[10px] text-aphoria-mid mt-0.5">
                              Free worldwide shipping included
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* Primary CTA */}
                      <button
                        onClick={() => addProductToCart(product)}
                        className="w-full rounded-full px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] shadow-[0_12px_28px_rgba(15,59,46,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_20px_40px_rgba(15,59,46,0.35)] hover:brightness-110"
                        style={{ background: 'linear-gradient(to right, #0F3B2E, #1a5c47)', color: 'white' }}
                      >
                        Add to Cart
                      </button>

                      {/* Secondary CTA */}
                      <button
                        onClick={() => buyProductNow(product)}
                        className="w-full rounded-full border-2 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] hover:bg-aphoria-black hover:text-white hover:border-aphoria-black text-aphoria-black/80"
                        style={{ borderColor: 'rgba(17,17,17,0.15)' }}
                      >
                        Buy Now — Fast Checkout
                      </button>

                      {/* Additional CTA */}
                      <a
                        href="#science"
                        className="text-center text-[10px] uppercase tracking-[0.24em] hover:text-aphoria-gold transition-colors flex items-center justify-center gap-2 py-2"
                        style={{ color: '#888880' }}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        See Clinical Results
                      </a>
                    </div>

                    <p className="mt-4 text-[10px] text-aphoria-mid text-center">
                      {product.usage}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-aphoria-mid">
            <svg className="w-5 h-5 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            60-Day Money-Back Guarantee • Free Shipping Worldwide
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ProductGallery;
