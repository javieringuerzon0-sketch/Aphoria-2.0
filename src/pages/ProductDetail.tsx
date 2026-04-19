import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    ChevronRight,
    Minus,
    Plus,
    Heart,
    CheckCircle,
    ChevronDown,
    Beaker,
    Instagram,
    Quote,
    Sparkles
} from 'lucide-react';
import ProtocolTimeline from '../components/ProtocolTimeline';
import OptimizedImage from '../components/OptimizedImage';
import Newsletter from '../components/Newsletter';
import ReviewsSection from '../components/ReviewsSection';

import { PRODUCTS } from '../constants';
import { Product, Variant, Review } from '../types';
import { useCartStore } from '../store/useCartStore';

const ProductDetail: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const [quantity, setQuantity] = useState(1);
    const [wishlisted, setWishlisted] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('aphoria_wishlist') || '[]');
            return saved.includes(handle);
        } catch { return false; }
    });

    const toggleWishlist = () => {
        const saved: string[] = JSON.parse(localStorage.getItem('aphoria_wishlist') || '[]');
        const next = wishlisted
            ? saved.filter((h: string) => h !== handle)
            : [...saved, handle];
        localStorage.setItem('aphoria_wishlist', JSON.stringify(next));
        setWishlisted(!wishlisted);
    };

    // Find the current product based on the handle
    const currentProduct: Product = PRODUCTS.find(p => p.handle === handle) || PRODUCTS[0];

    // Default to the first available variant key
    const initialVariantKey = Object.keys(currentProduct.variants)[0];
    const [selectedVariant, setSelectedVariant] = useState(initialVariantKey);

    // Declare before useEffect so the dependency array can reference it
    const { variants, ugc } = currentProduct;
    const currentVariant: Variant = useMemo(
        () => variants[selectedVariant] || variants[Object.keys(variants)[0]],
        [variants, selectedVariant]
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${currentProduct.name} | Aphoria Beauty Laboratory`;

        // Meta description
        let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.name = 'description'; document.head.appendChild(metaDesc); }
        metaDesc.content = `${currentProduct.shortDesc} ${currentProduct.reviews.toLocaleString()}+ verified reviews. 30-Day Money-Back Guarantee. Free shipping over $50.`;

        // OG tags
        const setMeta = (prop: string, val: string, attr = 'property') => {
            let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${prop}"]`);
            if (!el) { el = document.createElement('meta'); el.setAttribute(attr, prop); document.head.appendChild(el); }
            el.content = val;
        };
        setMeta('og:title', `${currentProduct.name} | Aphoria Beauty Laboratory`);
        setMeta('og:description', `${currentProduct.shortDesc} ${currentProduct.reviews.toLocaleString()}+ verified reviews. 30-Day Money-Back Guarantee.`);
        setMeta('og:image', `https://aphoriabeauty.com${currentVariant.img}`);
        setMeta('og:url', `https://aphoriabeauty.com/product/${currentProduct.handle}`);
        setMeta('og:type', 'product');
        setMeta('twitter:card', 'summary_large_image', 'name');
        setMeta('twitter:title', `${currentProduct.name} | Aphoria Beauty`, 'name');
        setMeta('twitter:description', currentProduct.shortDesc, 'name');
        setMeta('twitter:image', `https://aphoriabeauty.com${currentVariant.img}`, 'name');

        // JSON-LD Product schema
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: currentProduct.name,
            description: currentProduct.shortDesc,
            image: `https://aphoriabeauty.com${currentVariant.img}`,
            brand: { '@type': 'Brand', name: 'Aphoria Beauty' },
            offers: {
                '@type': 'Offer',
                price: currentVariant.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: `https://aphoriabeauty.com/product/${currentProduct.handle}`,
                priceValidUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: currentProduct.reviews,
                bestRating: '5',
                worstRating: '1',
            },
        };
        let ldEl = document.getElementById('product-json-ld') as HTMLScriptElement | null;
        if (!ldEl) { ldEl = document.createElement('script'); ldEl.id = 'product-json-ld'; ldEl.type = 'application/ld+json'; document.head.appendChild(ldEl); }
        ldEl.textContent = JSON.stringify(schema);

        // Sync wishlist state when navigating between products
        try {
            const saved = JSON.parse(localStorage.getItem('aphoria_wishlist') || '[]');
            setWishlisted(saved.includes(handle));
        } catch { setWishlisted(false); }

        return () => { document.getElementById('product-json-ld')?.remove(); };
    }, [handle]); // eslint-disable-line react-hooks/exhaustive-deps

    // Preload all variant images so switching is instant
    useEffect(() => {
        Object.values(variants).forEach(v => {
            const img = new window.Image();
            img.src = v.img;
        });
    }, [variants]);

    // Shuffle UGC only once on mount or handle change
    const [shuffledUgc, setShuffledUgc] = useState<Review[]>(ugc);

    useEffect(() => {
        setShuffledUgc([...ugc].sort(() => Math.random() - 0.5));
        // Reset variant when product changes
        const newInitialVariant = Object.keys(currentProduct.variants)[0];
        setSelectedVariant(newInitialVariant);
    }, [ugc, currentProduct]);

    // Marquee: JS RAF-driven infinite scroll + drag
    // Fix 5: Pause marquee RAF when cart is open (avoids layout thrashing)
    const isCartOpen = useCartStore((s) => s.isOpen);
    const isCartOpenRef = useRef(isCartOpen);
    useEffect(() => { isCartOpenRef.current = isCartOpen; }, [isCartOpen]);

    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeOffset = useRef(0);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartOffset = useRef(0);
    const isHovered = useRef(false);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;
        const SPEED = 0.6; // px per frame ~36px/s at 60fps
        const animate = () => {
            if (!isDragging.current && !isHovered.current && !isCartOpenRef.current) {
                marqueeOffset.current -= SPEED;
                const halfWidth = el.scrollWidth / 2;
                if (Math.abs(marqueeOffset.current) >= halfWidth) {
                    marqueeOffset.current = 0;
                }
                el.style.transform = `translate3d(${marqueeOffset.current}px, 0, 0)`;
            }
            rafId.current = requestAnimationFrame(animate);
        };
        rafId.current = requestAnimationFrame(animate);
        return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
    }, []);

    const onMarqueePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragStartOffset.current = marqueeOffset.current;
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.style.cursor = 'grabbing';
    };
    const onMarqueePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        marqueeOffset.current = dragStartOffset.current + (e.clientX - dragStartX.current);
    };
    const onMarqueePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        isDragging.current = false;
        e.currentTarget.style.cursor = 'grab';
    };

    // Fix 3+4: Single atomic update — 1 set() call instead of 2
    const addItemAndOpen = useCartStore((s) => s.addItemAndOpen);

    const addToCart = () => {
        addItemAndOpen({
            variantId: currentVariant.shopifyVariantId || `local-${currentVariant.id}`,
            title: currentProduct.name,
            variantTitle: currentVariant.name,
            price: currentVariant.price,
            quantity,
            img: currentVariant.img,
        });
    };

    return (
        <div className="min-h-screen text-[#1A1A1A] font-sans selection:bg-aphoria-gold/20 selection:text-aphoria-black antialiased overflow-x-hidden" style={{ backgroundColor: '#FFFFFF' }}>

            <main className="pt-24 lg:pt-32" style={{ backgroundColor: '#FFFFFF' }}>
                <section className="max-w-7xl mx-auto px-6 lg:px-12" style={{ backgroundColor: '#FFFFFF' }}>

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-aphoria-mid mb-12">
                        <Link to="/" className="hover:text-aphoria-black transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <span className="cursor-default">{currentProduct.category}</span>
                        <ChevronRight size={10} />
                        <span className="text-aphoria-black font-semibold">{currentProduct.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Gallery - 7 Columns (Fixed Background Removal) */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="relative aspect-[4/5] flex items-center justify-center bg-white">

                                <OptimizedImage
                                    src={currentVariant.img}
                                    alt={currentProduct.name}
                                    className="w-full h-full object-contain relative z-10"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                />

                                <div className="absolute top-8 left-8 bg-aphoria-black text-white px-5 py-2 rounded-full z-20 flex items-center gap-2 shadow-xl border border-white/10">
                                    <Sparkles size={12} className="text-aphoria-gold" />
                                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Laboratory grade</span>
                                </div>
                            </div>
                        </div>

                        {/* Info - 5 Columns */}
                        <div className="lg:col-span-5 flex flex-col pt-4">
                            <div className="border-b border-aphoria-black/5 pb-10 mb-10">
                                <div className="flex items-center gap-1.5 text-aphoria-gold mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    <span className="text-aphoria-mid ml-3 font-medium text-[11px] underline cursor-pointer hover:text-aphoria-black transition-colors">
                                        {currentProduct.reviews} Verified Transformations
                                    </span>
                                </div>

                                <h1 className="text-6xl font-brand font-light tracking-tight text-aphoria-black mb-6 leading-[0.9]">
                                    {currentProduct.name}
                                </h1>
                                <div className="flex items-baseline gap-5 mb-8">
                                    <p className="text-4xl font-light text-aphoria-black tabular-nums">${currentVariant.price.toFixed(2)}</p>
                                    <p className="text-base font-light text-aphoria-mid line-through opacity-30">${currentVariant.regularPrice.toFixed(2)}</p>
                                    <div className="bg-aphoria-gold/10 text-aphoria-gold px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase">
                                        -{Math.round((1 - currentVariant.price / currentVariant.regularPrice) * 100)}% reward
                                    </div>
                                </div>

                                <p className="text-[16px] font-light text-aphoria-mid leading-relaxed max-w-lg">
                                    {currentProduct.shortDesc}
                                </p>
                            </div>


                            {/* Bundle Selection */}
                            <div className="mb-12">
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-aphoria-black mb-6 block">
                                    Select your system:
                                </span>
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(variants).map(([key, val]: [string, any]) => (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedVariant(key)}
                                            className={`p-6 border rounded-sm transition-all flex items-center justify-between relative overflow-hidden group ${selectedVariant === key ? 'border-aphoria-black bg-white shadow-xl' : 'border-aphoria-black/10 hover:border-aphoria-black/30 bg-white/40'}`}
                                        >
                                            <div className="flex flex-col items-start gap-1">
                                                <span className={`text-[12px] font-bold tracking-widest uppercase ${selectedVariant === key ? 'text-aphoria-black' : 'text-aphoria-black/60'}`}>{val.name}</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-xl font-light tabular-nums">${val.price.toFixed(2)}</span>
                                            </div>
                                            {selectedVariant === key && (
                                                <div className="absolute left-0 top-0 w-1 h-full bg-aphoria-gold" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Flow - Improved Premium Scale */}
                            <div className="flex gap-4 mb-12 items-center">
                                <div className="flex items-center border border-aphoria-black/10 rounded-full w-36 justify-between px-5 h-14 bg-white shadow-sm">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="text-aphoria-black/30 hover:text-aphoria-gold transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-sm font-medium tabular-nums">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="text-aphoria-black/30 hover:text-aphoria-gold transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <button
                                    onClick={addToCart}
                                    className="flex-1 h-14 inline-flex items-center justify-center gap-3 bg-aphoria-black text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl group active:scale-95"
                                >
                                    <span>GET MY TRANSFORMATION</span>
                                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                    <span className="text-[14px] leading-none">${(currentVariant.price * quantity).toFixed(2)}</span>
                                </button>

                                <button
                                    onClick={toggleWishlist}
                                    className="w-14 h-14 flex items-center justify-center border border-aphoria-black/10 rounded-full hover:border-aphoria-black transition-colors bg-white shadow-sm group"
                                    aria-label={wishlisted ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <Heart size={18} className={`transition-colors ${wishlisted ? 'text-red-500 fill-red-500' : 'text-aphoria-black/30 group-hover:text-red-900'}`} />
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div className="flex items-center gap-4 bg-aphoria-gold/5 p-4 rounded-sm mb-12 border border-aphoria-gold/10">
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aphoria-gold opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-aphoria-gold"></span>
                                </div>
                                <span className="text-[10px] font-bold text-aphoria-black/80 tracking-[0.2em] uppercase">
                                    High demand — Limited stock available
                                </span>
                            </div>

                            {/* Tech Details */}
                            <div className="space-y-0 border-t border-aphoria-black/5">
                                {currentProduct.accordions.map((item: any, i: number) => (
                                    <details key={i} className="group py-6 border-b border-aphoria-black/5 cursor-pointer">
                                        <summary className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.3em] outline-none list-none">
                                            {item.title}
                                            <ChevronDown size={14} className="text-aphoria-gold transition-transform duration-500 group-open:rotate-180" />
                                        </summary>
                                        <div className="mt-5 text-[15px] font-light text-aphoria-mid leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500">
                                            {item.content}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* SOCIAL PROOF WALL - INFINITE MARQUEE */}
                <section className="mt-0 pt-32 pb-32 bg-[#FAF8F5] relative overflow-hidden">
                    {/* Dynamic Background Typography */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                        <span className="text-[20vw] font-brand font-bold text-aphoria-black/[0.02] whitespace-nowrap tracking-tighter leading-none">
                            REAL RESULTS • CLINICAL PROOF
                        </span>
                    </div>

                    <div className="max-w-[1920px] mx-auto relative z-10">
                        <div className="mb-20 px-6 lg:px-12 flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold mb-6 animate-pulse">Community Verified</span>
                            <h2 className="text-5xl lg:text-7xl font-brand font-light tracking-tight text-aphoria-black leading-[0.9] mb-6">
                                The Aphoria <span className="italic text-aphoria-gold">Standard.</span>
                            </h2>
                            <p className="text-aphoria-mid/60 text-sm max-w-md">
                                Join 2,800+ others who trust their skin to our clinical protocols. Real results from verified purchases.
                            </p>
                        </div>

                        {/* INFINITE MARQUEE — JS RAF + drag, GPU composited */}
                        <div className="mask-fade-x relative w-full overflow-hidden">
                            <div
                                ref={marqueeRef}
                                className="flex py-10 will-change-transform"
                                style={{ cursor: 'grab' }}
                                onMouseEnter={() => { isHovered.current = true; }}
                                onMouseLeave={() => { isHovered.current = false; }}
                                onPointerDown={onMarqueePointerDown}
                                onPointerMove={onMarqueePointerMove}
                                onPointerUp={onMarqueePointerUp}
                                onPointerCancel={onMarqueePointerUp}
                            >
                                {[...shuffledUgc.slice(0, 8), ...shuffledUgc.slice(0, 8)].map((item: any, i) => (
                                    <div
                                        key={`${item.id}-${i}`}
                                        className="w-[300px] md:w-[360px] mx-5 flex-shrink-0 group"
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <div className="aspect-[9/16] relative rounded-[30px] overflow-hidden bg-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] [transition-property:scale,box-shadow] duration-500 hover:scale-[1.02] hover:shadow-[0_40px_80px_-20px_rgba(198,161,91,0.2)]">
                                            <OptimizedImage
                                                src={item.img}
                                                alt={`Review by ${item.user}`}
                                                className="w-full h-full object-cover [transition-property:scale,filter] duration-700 group-hover:scale-105 group-hover:blur-sm"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500 flex flex-col justify-end p-8">
                                                <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                                    <div className="text-center translate-y-4 group-hover:translate-y-0 [transition-property:translate] duration-500">
                                                        <Quote size={24} className="text-aphoria-gold mx-auto mb-4" />
                                                        <p className="text-white text-sm font-medium leading-relaxed italic">"{item.text}"</p>
                                                    </div>
                                                </div>
                                                <div className="group-hover:opacity-0 transition-opacity duration-300">
                                                    <div className="flex items-center gap-4 mb-2">
                                                        <div className="p-[2px] rounded-full bg-gradient-to-tr from-aphoria-gold via-[#FFF4E0] to-aphoria-gold/50">
                                                            <div className="p-[2px] rounded-full bg-black">
                                                                <div className="w-8 h-8 rounded-full bg-aphoria-bg overflow-hidden">
                                                                    <img src={item.img} alt={item.user} className="w-full h-full object-cover" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-white text-xs font-bold tracking-widest uppercase mb-0.5">{item.user}</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] text-white/60">Verified</span>
                                                                <span className="text-aphoria-gold text-[10px]">★★★★★</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Link to="/#testimonials" className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-mid hover:text-aphoria-black transition-colors border-b border-aphoria-mid/30 pb-1 hover:border-aphoria-black">
                                See All Reviews
                            </Link>
                        </div>
                    </div>
                </section>

                {/* VIDEO SALES SECTION */}
                <section className="py-20 lg:py-40 bg-[#111] relative overflow-hidden">
                    {/* Soft gradient transition */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

                    <div className="absolute inset-0 opacity-20 blur-[100px] bg-aphoria-gold/30 animate-pulse" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12 order-2 lg:order-1">
                                <div className="space-y-6">
                                    <h2 className="text-5xl lg:text-7xl font-brand font-light tracking-tight text-white leading-[0.9]">
                                        {currentProduct.videoSection?.headline.split(' ')[0]} <br />
                                        <span className="text-aphoria-gold">{currentProduct.videoSection?.headline.split(' ').slice(1).join(' ')}</span>
                                    </h2>
                                    <div className="flex flex-wrap gap-8 border-l border-aphoria-gold pl-6 py-2">
                                        {currentProduct.videoSection?.stats.map((stat: any, i: number) => (
                                            <div key={i}>
                                                <span className="block text-3xl text-white font-light tabular-nums">{stat.val}</span>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-aphoria-gold/80">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-lg font-light text-white/40 leading-relaxed max-w-xl">
                                    {currentProduct.videoSection?.desc}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-red-400 animate-pulse">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        High Demand — Limited stock available
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        className="inline-flex items-center gap-3 px-12 py-4 bg-white border border-aphoria-black/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-aphoria-black hover:text-white hover:border-aphoria-black transition-all duration-500 shadow-sm hover:shadow-xl group w-full sm:w-auto justify-center"
                                    >
                                        GET MY GLOW NOW
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                                    <span className="flex items-center gap-2">
                                        <CheckCircle size={12} className="text-aphoria-gold" />
                                        Ships within 24h
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <CheckCircle size={12} className="text-aphoria-gold" />
                                        30-Day Money-Back
                                    </span>
                                </div>
                            </div>

                            <div className="relative aspect-square overflow-hidden rounded-[80px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border border-white/5 order-1 lg:order-2 isolate">
                                <video
                                    key={currentProduct.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    poster={currentProduct.galleryImg}
                                    className="w-full h-full object-cover grayscale-[20%] brightness-110"
                                >
                                    <source src={currentProduct.video} type="video/mp4" />
                                </video>
                                <div className="absolute bottom-10 left-10 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[9px] font-bold text-white/90 tracking-[0.2em] uppercase">Live Feed • 84 Viewing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <ReviewsSection productHandle={currentProduct.handle} totalReviews={currentProduct.reviews} />

                <ProtocolTimeline productHandle={handle} />

                <Newsletter />

                <footer className="py-8 bg-[#FAF8F5] text-center border-t border-aphoria-black/5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.8em] text-aphoria-black/40">APHORIA BEAUTY LABORATORY — 2026</p>
                </footer>
            </main>
        </div>
    );
};

export default ProductDetail;
