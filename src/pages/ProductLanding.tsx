import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ShieldCheck, Star, ChevronRight, CheckCircle, Truck, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCartStore } from '../store/useCartStore';
import { pixel } from '../lib/metaPixel';
import CartDrawer from '../components/CartDrawer';

const ProductLanding: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const product = PRODUCTS.find(p => p.handle === handle) || PRODUCTS[0];
    const variant = product.variants['1pc'];
    const addItemAndOpen = useCartStore((s) => s.addItemAndOpen);
    const openCart = useCartStore((s) => s.open);
    const totalItems = useCartStore((s) => s.totalItems);
    const cartCount = totalItems();
    const discount = Math.round((1 - variant.price / variant.regularPrice) * 100);
    const savings = (variant.regularPrice - variant.price).toFixed(2);

    // Sticky CTA visibility
    const [showSticky, setShowSticky] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowSticky(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Meta tags + ViewContent pixel
    useEffect(() => {
        document.title = `${product.name} — ${discount}% Off | Aphoria Beauty`;
        let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
        metaDesc.content = `${product.shortDesc} ${product.reviews.toLocaleString()}+ verified reviews. 30-Day Money-Back Guarantee.`;
        pixel.viewContent(product.name, variant.price);
    }, [product, discount, variant.price]);

    const handleBuyNow = () => {
        pixel.addToCart(product.name, variant.price);
        addItemAndOpen({ variantId: variant.shopifyVariantId || `local-${variant.id}`, title: product.name, variantTitle: variant.name, price: variant.price, img: variant.img });
    };

    const handleAddCart = () => {
        pixel.addToCart(product.name, variant.price);
        addItemAndOpen({ variantId: variant.shopifyVariantId || `local-${variant.id}`, title: product.name, variantTitle: variant.name, price: variant.price, img: variant.img });
    };

    return (
        <div className="min-h-screen bg-white font-sans antialiased">

            {/* ── Minimal Header ── */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur border-b border-aphoria-black/8 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="font-brand text-[20px] font-medium uppercase tracking-[0.32em] text-aphoria-black">
                        Aphoria
                    </Link>
                    <div className="flex items-center gap-5">
                        <div className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-aphoria-gold">
                            {discount}% Off — Limited Stock
                        </div>
                        <button onClick={openCart} className="relative p-1" aria-label="Cart">
                            <ShoppingBag size={20} className="text-aphoria-black" strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-aphoria-gold text-[8px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-[72px]">

                {/* ── Hero Section ── */}
                <section className="max-w-5xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative bg-aphoria-bg rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-10 lg:sticky lg:top-24"
                    >
                        <img
                            src={variant.img}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                        {/* Discount badge */}
                        <div className="absolute top-5 left-5 bg-aphoria-gold text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                            -{discount}% Today
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        {/* Stars */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={15} className="text-aphoria-gold" fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-[13px] text-aphoria-mid">
                                <strong className="text-aphoria-black">{product.reviews.toLocaleString()}</strong> verified reviews
                            </span>
                        </div>

                        <span className="text-[10px] uppercase tracking-[0.3em] text-aphoria-gold font-bold mb-2 block">{product.clinicalClassification}</span>
                        <h1 className="text-[36px] lg:text-[44px] font-brand font-light text-aphoria-black tracking-tight leading-[1.1] mb-4">
                            {product.name}
                        </h1>
                        <p className="text-[16px] text-aphoria-mid leading-relaxed mb-8">
                            {product.shortDesc}
                        </p>

                        {/* Price Block */}
                        <div className="flex items-baseline gap-4 mb-3">
                            <span className="text-[42px] font-light text-aphoria-black tabular-nums">${variant.price.toFixed(2)}</span>
                            <span className="text-[20px] text-aphoria-mid/50 line-through tabular-nums">${variant.regularPrice.toFixed(2)}</span>
                            <span className="bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                                You save ${savings}
                            </span>
                        </div>
                        <p className="text-[11px] text-aphoria-mid mb-8 uppercase tracking-widest">As low as ${product.perUsePrice}/use</p>

                        {/* Benefits */}
                        <ul className="space-y-3 mb-8">
                            {product.benefits.map(b => (
                                <li key={b} className="flex items-center gap-3 text-[14px] text-aphoria-black">
                                    <CheckCircle size={16} className="text-aphoria-gold flex-shrink-0" />
                                    {b}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-aphoria-black text-white rounded-full py-5 text-[11px] font-bold uppercase tracking-[0.24em] hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-xl"
                            >
                                Buy Now — ${variant.price.toFixed(2)}
                            </button>
                            <button
                                onClick={handleAddCart}
                                className="w-full border border-aphoria-black/15 text-aphoria-black rounded-full py-4 text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-aphoria-black hover:text-white transition-all duration-500"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap items-center justify-center gap-6 py-5 border-t border-b border-aphoria-black/8 mb-6">
                            <div className="flex items-center gap-2 text-[11px] text-aphoria-mid">
                                <ShieldCheck size={15} className="text-aphoria-gold" />
                                30-Day Guarantee
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-aphoria-mid">
                                <Truck size={15} className="text-aphoria-gold" />
                                Free Shipping +$50
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-aphoria-mid">
                                <RefreshCw size={15} className="text-aphoria-gold" />
                                Easy Returns
                            </div>
                        </div>

                        {/* Usage info */}
                        <div className="bg-aphoria-bg/60 rounded-2xl p-5 text-[13px] text-aphoria-mid leading-relaxed">
                            <strong className="text-aphoria-black text-[11px] uppercase tracking-widest block mb-2">How to use</strong>
                            {product.accordions[0]?.content}
                        </div>
                    </motion.div>
                </section>

                {/* ── Social Proof Strip ── */}
                <section className="bg-aphoria-bg py-14 px-6">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-center text-[11px] uppercase tracking-[0.3em] text-aphoria-gold font-bold mb-10">
                            Real customers. Real results.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {product.ugc.slice(0, 4).map((item) => (
                                <div key={item.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                                    <img
                                        src={item.img}
                                        alt={item.user}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                                        <div>
                                            <p className="text-aphoria-gold text-[10px] font-bold">★★★★★</p>
                                            <p className="text-white text-[11px] italic leading-snug">"{item.text}"</p>
                                            <p className="text-white/60 text-[10px] mt-1">{item.user}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <p className="text-[13px] text-aphoria-mid">
                                <strong className="text-aphoria-black">{product.reviews.toLocaleString()}+</strong> verified customers trust Aphoria
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Protocol Steps ── */}
                <section className="py-14 px-6 max-w-5xl mx-auto">
                    <h2 className="text-[28px] font-brand font-light text-aphoria-black text-center mb-12 tracking-tight">
                        3 Steps. Instant Results. Incredible at 28 Days.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {product.protocolSteps.map((step) => (
                            <div key={step.step} className="text-center">
                                <div className="w-20 h-20 rounded-full bg-aphoria-bg border border-aphoria-gold/20 flex items-center justify-center mx-auto mb-5 overflow-hidden">
                                    <img src={step.img} alt={step.label} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-aphoria-gold font-bold">{step.step}</span>
                                <h3 className="text-[18px] font-medium text-aphoria-black mt-1 mb-3">{step.name}</h3>
                                <p className="text-[13px] text-aphoria-mid leading-relaxed">{step.copy}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="py-12 px-6 bg-aphoria-bg">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-[26px] font-brand font-light text-aphoria-black text-center mb-10 tracking-tight">Common Questions</h2>
                        {product.accordions.map((item, i) => (
                            <details key={i} className="group py-5 border-b border-aphoria-black/10 cursor-pointer">
                                <summary className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-widest outline-none list-none">
                                    {item.title}
                                    <ChevronRight size={15} className="transition-transform duration-300 group-open:rotate-90 text-aphoria-gold flex-shrink-0" />
                                </summary>
                                <p className="mt-4 text-[14px] text-aphoria-mid leading-relaxed">{item.content}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ── Final CTA ── */}
                <section className="bg-aphoria-black py-16 px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-aphoria-gold font-bold block mb-4">
                        {discount}% Off — Today Only
                    </span>
                    <h2 className="text-[32px] lg:text-[40px] font-brand font-light text-white mb-4 tracking-tight">
                        Feel It in Minutes. Incredible at 28 Days.
                    </h2>
                    <p className="text-white/50 text-[14px] mb-8 max-w-md mx-auto">
                        {product.shortDesc}
                    </p>
                    <button
                        onClick={handleBuyNow}
                        className="inline-flex items-center gap-3 bg-aphoria-gold text-aphoria-black px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.24em] hover:bg-white transition-all duration-300 shadow-2xl"
                    >
                        Get {product.name} — ${variant.price.toFixed(2)}
                        <ChevronRight size={16} />
                    </button>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/40">
                        <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-aphoria-gold" /> 30-Day Money Back</span>
                        <span className="flex items-center gap-1.5"><Truck size={13} className="text-aphoria-gold" /> Free Shipping</span>
                    </div>
                </section>
            </main>

            {/* ── Sticky Bottom CTA (mobile) ── */}
            {showSticky && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-aphoria-black/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] p-4 flex items-center gap-3 md:hidden">
                    <div className="flex-1">
                        <p className="text-[11px] font-bold text-aphoria-black">{product.name}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-[16px] font-bold text-aphoria-black">${variant.price.toFixed(2)}</span>
                            <span className="text-[12px] text-aphoria-mid line-through">${variant.regularPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBuyNow}
                        className="bg-aphoria-black text-white rounded-full px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                        Buy Now
                    </button>
                </div>
            )}

            <CartDrawer />
        </div>
    );
};

export default ProductLanding;
