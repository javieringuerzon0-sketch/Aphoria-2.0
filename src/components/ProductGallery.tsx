import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

const STYLES = `
  @keyframes appleFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-15px); }
  }

  .product-image-container {
    animation: appleFloat 6s ease-in-out infinite;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-image-container img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.08));
  }

  .bundle-image-box {
    width: 200px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .ground-shadow {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 20px;
    background: radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%);
    z-index: -1;
  }
`;

const ProductGallery: React.FC = () => {
  const products = PRODUCTS;
  const goldMask = products.find(p => p.handle === '24-gold-mask')!;
  const avocadoMask = products.find(p => p.handle === 'avocado-mask')!;

  const bundlePrice = 53.98;
  const bundleRegular = goldMask.variants['1pc'].price + avocadoMask.variants['1pc'].price;
  const bundleSavings = (bundleRegular - bundlePrice).toFixed(2);

  const { addItem, open: openCart, checkout } = useCartStore();
  const BUNDLE_DISCOUNT_CODE = import.meta.env.VITE_BUNDLE_DISCOUNT_CODE || '';

  const addBundleAndCheckout = () => {
    const gv = goldMask.variants['1pc'];
    addItem({ variantId: gv.shopifyVariantId || `local-${gv.id}`, title: goldMask.name, variantTitle: gv.name, price: gv.price, img: gv.img });
    const av = avocadoMask.variants['1pc'];
    addItem({ variantId: av.shopifyVariantId || `local-${av.id}`, title: avocadoMask.name, variantTitle: av.name, price: av.price, img: av.img });
    checkout(BUNDLE_DISCOUNT_CODE || undefined);
  };

  const addProductToCart = (product: Product) => {
    const v = product.variants['1pc'];
    addItem({ variantId: v.shopifyVariantId || `local-${v.id}`, title: product.name, variantTitle: v.name, price: v.price, img: v.img });
    openCart();
  };

  const buyProductNow = (product: Product) => {
    const v = product.variants['1pc'];
    addItem({ variantId: v.shopifyVariantId || `local-${v.id}`, title: product.name, variantTitle: v.name, price: v.price, img: v.img });
    checkout();
  };

  return (
    <section id="bundle" className="relative py-24 md:py-32 bg-[#F9F9F7] px-6">
      <style>{STYLES}</style>

      <div className="max-w-[1280px] mx-auto relative">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.3em] text-aphoria-gold font-bold">The Protocol</span>
          <h2 className="mt-4 text-[32px] md:text-[42px] font-brand font-light text-aphoria-black tracking-tight leading-tight">
            Complete Facial Transformation
          </h2>
          <p className="mt-6 text-[16px] text-aphoria-mid">Experience the synergistic power of Gold and Avocado. A clinical protocol designed for cellular regeneration and barrier restoration.</p>
        </div>

        {/* BUNDLE BOARD */}
        <div className="mb-32 bg-white rounded-[32px] border border-aphoria-black/5 p-8 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.03)] ring-1 ring-aphoria-black/5 relative mt-6">
          <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 bg-aphoria-black text-white px-6 py-2.5 sm:py-3 rounded-full border border-aphoria-gold/20 shadow-xl flex items-center gap-3 z-10 w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aphoria-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-aphoria-gold"></span>
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-aphoria-gold">Special Bundle Offer</span>
          </div>
          <div className="grid lg:grid-cols-[1.5fr_0.5fr_1.5fr_1.8fr] gap-12 items-center">

            {/* Product 1 */}
            <div className="flex flex-col items-center group">
              <div className="bundle-image-box transition-transform duration-500 ease-out group-hover:scale-110 cursor-pointer">
                <div className="product-image-container">
                  <img src="/bundlee/goldmask-bundle.png" alt="Gold Mask" className="max-h-[220px]" style={{ mixBlendMode: 'multiply' }} loading="lazy" decoding="async" />
                </div>
                <div className="ground-shadow" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-[18px] font-bold text-aphoria-black">{goldMask.name}</h3>
                <p className="text-[11px] uppercase tracking-widest text-aphoria-gold font-bold">Radiance Treatment</p>
              </div>
            </div>

            {/* Plus Sign */}
            <div className="text-center text-[60px] font-light text-aphoria-gold/40">+</div>

            {/* Product 2 */}
            <div className="flex flex-col items-center group">
              <div className="bundle-image-box transition-transform duration-500 ease-out group-hover:scale-110 cursor-pointer">
                <div className="product-image-container" style={{ animationDelay: '0.5s' }}>
                  <img src="/bundlee/avocado-bundelle.png" alt="Avocado Mask" className="max-h-[200px]" style={{ mixBlendMode: 'multiply' }} loading="lazy" decoding="async" />
                </div>
                <div className="ground-shadow" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-[18px] font-bold text-aphoria-black">{avocadoMask.name}</h3>
                <p className="text-[11px] uppercase tracking-widest text-aphoria-green font-bold">Barrier Support</p>
              </div>
            </div>

            {/* Bundle CTA Box */}
            <div className="lg:border-l border-aphoria-black/10 lg:pl-16 flex flex-col justify-center text-center lg:text-left pt-12 lg:pt-0">
              <h3 className="text-[28px] font-brand font-light text-aphoria-black mb-4">Transformation Kit</h3>
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="text-[18px] text-aphoria-mid line-through">${bundleRegular.toFixed(2)}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[16px]">$</span>
                  <span className="text-[48px] font-bold text-aphoria-black">{Math.floor(bundlePrice)}</span>
                  <span className="text-[24px]">.{(bundlePrice % 1).toFixed(2).substring(2)}</span>
                </div>
              </div>

              <div className="bg-aphoria-bg/50 rounded-2xl p-4 mb-8">
                <p className="text-[13px] text-aphoria-black leading-relaxed">⭐ <strong>Best Seller:</strong> 92% of customers see faster results when following the combined protocol.</p>
              </div>

              <button
                onClick={addBundleAndCheckout}
                className="w-full bg-aphoria-black text-white rounded-full py-5 text-[12px] uppercase tracking-[0.25em] font-bold hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-300 shadow-xl"
              >
                Add Kit - Save $10
              </button>
              <p className="text-[10px] text-aphoria-mid mt-4 text-center uppercase tracking-widest">Free Shipping • 60-Day Guarantee</p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="mb-20 flex items-center justify-center gap-6">
          <div className="h-px w-full bg-aphoria-black/5"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-aphoria-mid font-bold whitespace-nowrap">Individual Products</span>
          <div className="h-px w-full bg-aphoria-black/5"></div>
        </div>

        {/* INDIVIDUAL PRODUCTS GRID */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group bg-white rounded-[24px] border border-aphoria-black/5 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative overflow-hidden rounded-xl mb-10">
                <div className="product-image-container">
                  <OptimizedImage src={product.galleryImg} alt={product.name} className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="absolute top-0 right-0">
                  <div className="bg-aphoria-bg px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-aphoria-mid border border-aphoria-black/5 font-bold">Bestseller</div>
                </div>
              </div>

              <div className="text-center">
                <Link to={`/product/${product.handle}`}>
                  <h3 className="text-[24px] font-brand font-light text-aphoria-black mb-2 hover:text-aphoria-gold transition-colors">{product.name}</h3>
                </Link>
                <p className="text-[11px] uppercase tracking-widest text-aphoria-gold font-bold mb-6">{product.tagline}</p>
                <p className="text-[14px] text-aphoria-mid mb-8 leading-relaxed max-w-sm mx-auto">{product.description}</p>

                <div className="flex items-center justify-center gap-6 mb-8 pt-6 border-t border-aphoria-black/5">
                  <div className="text-center">
                    <span className="block text-[10px] text-aphoria-mid line-through">${product.variants['1pc'].regularPrice.toFixed(2)}</span>
                    <span className="text-[28px] font-bold text-aphoria-black">${product.variants['1pc'].price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => addProductToCart(product)}
                    className="flex-1 bg-aphoria-black text-white rounded-full py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-aphoria-gold hover:text-aphoria-black transition-all"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => buyProductNow(product)}
                    className="flex-1 border border-aphoria-black/20 text-aphoria-black rounded-full py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-aphoria-black hover:text-white transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductGallery;
