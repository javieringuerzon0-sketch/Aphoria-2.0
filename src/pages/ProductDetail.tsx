import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import Newsletter from '../components/Newsletter';

import { PRODUCTS } from '../constants';
import { Product, Variant, Review } from '../types';
import { useCartStore } from '../store/useCartStore';

const ProductDetail: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const [quantity, setQuantity] = useState(1);

    // Find the current product based on the handle
    const currentProduct: Product = PRODUCTS.find(p => p.handle === handle) || PRODUCTS[0];

    // Default to the first available variant key
    const initialVariantKey = Object.keys(currentProduct.variants)[0];
    const [selectedVariant, setSelectedVariant] = useState(initialVariantKey);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${currentProduct.name} | Aphoria Beauty Laboratory`;
    }, [handle, currentProduct.name]);

    const { variants, ugc } = currentProduct;

    // Default variant
    const currentVariant: Variant = variants[selectedVariant] || variants[Object.keys(variants)[0]];

    // Shuffle UGC only once on mount or handle change
    const [shuffledUgc, setShuffledUgc] = useState<Review[]>(ugc);

    useEffect(() => {
        setShuffledUgc([...ugc].sort(() => Math.random() - 0.5));
        // Reset variant when product changes
        const newInitialVariant = Object.keys(currentProduct.variants)[0];
        setSelectedVariant(newInitialVariant);
    }, [ugc, currentProduct]);

    // Track hero image load to avoid white-flash before mix-blend-mode composites
    const productImgRef = useRef<HTMLImageElement>(null);
    const [productImgLoaded, setProductImgLoaded] = useState(false);
    useEffect(() => {
        // Reset state for the new variant/image
        setProductImgLoaded(false);
        // For cached images: onLoad fires during DOM commit (BEFORE this effect runs),
        // so we must check .complete here and recover. React batches both calls → single render.
        const el = productImgRef.current;
        if (el && el.complete && el.naturalWidth > 0) {
            setProductImgLoaded(true);
        }
    }, [selectedVariant, currentVariant.img]);


    // UGC drag-to-scroll + auto-scroll via rAF
    const ugcTrackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);
    const autoScrollPos = useRef(0);
    const rafRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const track = ugcTrackRef.current;
        if (!track) return;
        autoScrollPos.current = track.scrollLeft;

        const tick = () => {
            if (!isDragging.current) {
                autoScrollPos.current += 0.7;
                const half = track.scrollWidth / 2;
                if (half > 0 && autoScrollPos.current >= half) {
                    autoScrollPos.current = 0;
                }
                track.scrollLeft = autoScrollPos.current;
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current); };
    }, [shuffledUgc]);

    const handleUgcMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        isDragging.current = true;
        dragStartX.current = e.pageX;
        dragScrollLeft.current = ugcTrackRef.current?.scrollLeft ?? 0;
    }, []);
    const handleUgcMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const walk = (dragStartX.current - e.pageX) * 1.5;
        if (ugcTrackRef.current) {
            ugcTrackRef.current.scrollLeft = dragScrollLeft.current + walk;
            autoScrollPos.current = ugcTrackRef.current.scrollLeft;
        }
    }, []);
    const handleUgcDragEnd = useCallback(() => {
        isDragging.current = false;
        if (ugcTrackRef.current) autoScrollPos.current = ugcTrackRef.current.scrollLeft;
    }, []);
    const handleUgcTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true;
        dragStartX.current = e.touches[0].pageX;
        dragScrollLeft.current = ugcTrackRef.current?.scrollLeft ?? 0;
    }, []);
    const handleUgcTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const walk = (dragStartX.current - e.touches[0].pageX) * 1.5;
        if (ugcTrackRef.current) {
            ugcTrackRef.current.scrollLeft = dragScrollLeft.current + walk;
            autoScrollPos.current = ugcTrackRef.current.scrollLeft;
        }
    }, []);

    const { addItem, open: openCart } = useCartStore();

    const addToCart = () => {
        addItem({
            variantId: currentVariant.shopifyVariantId || `local-${currentVariant.id}`,
            title: currentProduct.name,
            variantTitle: currentVariant.name,
            price: currentVariant.price,
            quantity,
            img: currentVariant.img,
        });
        openCart();
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans selection:bg-aphoria-gold/20 selection:text-aphoria-black antialiased overflow-x-hidden">

            <main className="pt-24 lg:pt-32">
                <section className="max-w-7xl mx-auto px-6 lg:px-12">

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
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative aspect-[4/5] flex items-center justify-center p-8 lg:p-12"
                            >
                                {/* Loading Skeleton - shows immediately to prevent white flash */}
                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${productImgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'} z-20`}>
                                    <div className="w-12 h-12 border-4 border-aphoria-gold/20 border-t-aphoria-gold rounded-full animate-spin" />
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        ref={productImgRef}
                                        key={selectedVariant}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: productImgLoaded ? 1 : 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        src={currentVariant.img}
                                        alt={currentProduct.name}
                                        className="w-full h-full object-contain relative z-10"
                                        style={{
                                            visibility: productImgLoaded ? 'visible' : 'hidden'
                                        }}
                                        onLoad={() => setProductImgLoaded(true)}
                                        fetchPriority="high"
                                        decoding="async"
                                    />
                                </AnimatePresence>

                                <div className="absolute top-8 left-8 bg-aphoria-black text-white px-5 py-2 rounded-full z-20 flex items-center gap-2 shadow-xl border border-white/10">
                                    <Sparkles size={12} className="text-aphoria-gold" />
                                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Laboratory grade</span>
                                </div>
                            </motion.div>
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
                                    className="w-14 h-14 flex items-center justify-center border border-aphoria-black/10 rounded-full hover:border-aphoria-black transition-colors bg-white shadow-sm group"
                                    aria-label="Add to favorites"
                                >
                                    <Heart size={18} className="text-aphoria-black/30 group-hover:text-red-900 transition-colors" />
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div className="flex items-center gap-4 bg-aphoria-gold/5 p-4 rounded-sm mb-12 border border-aphoria-gold/10">
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aphoria-gold opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-aphoria-gold"></span>
                                </div>
                                <span className="text-[10px] font-bold text-aphoria-black/80 tracking-[0.2em] uppercase">
                                    Allocation: 8 Units remaining in current batch
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

                        {/* INFINITE MARQUEE CONTAINER */}
                        <div className="mask-fade-x relative w-full overflow-hidden">
                            <div
                                ref={ugcTrackRef}
                                className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
                                onMouseDown={handleUgcMouseDown}
                                onMouseMove={handleUgcMouseMove}
                                onMouseUp={handleUgcDragEnd}
                                onMouseLeave={handleUgcDragEnd}
                                onTouchStart={handleUgcTouchStart}
                                onTouchMove={handleUgcTouchMove}
                                onTouchEnd={handleUgcDragEnd}
                            >
                                <div className="flex w-max py-10">
                                    {/* Duplicate array for seamless loop using shuffled data */}
                                    {[...shuffledUgc, ...shuffledUgc].map((item: any, i) => (
                                        <div
                                            key={`${item.id}-${i}`}
                                            className="w-[300px] md:w-[360px] mx-5 flex-shrink-0 group cursor-pointer"
                                        >
                                            {/* STORY CARD */}
                                            <div className="aspect-[9/16] relative rounded-[30px] overflow-hidden bg-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] [transition-property:scale,box-shadow] duration-500 hover:scale-[1.02] hover:shadow-[0_40px_80px_-20px_rgba(198,161,91,0.2)]">

                                                {/* IMAGE */}
                                                <img
                                                    src={item.img}
                                                    className="w-full h-full object-cover [transition-property:scale,filter] duration-700 group-hover:scale-105 group-hover:blur-sm"
                                                    alt={`Review by ${item.user}`}
                                                    loading="lazy"
                                                />

                                                {/* GRADIENT OVERLAY & CONTENT CONTAINER */}
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500 flex flex-col justify-end p-8">

                                                    {/* BLUR REVEAL TEXT (Centered when blurred) */}
                                                    <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                                        <div className="text-center translate-y-4 group-hover:translate-y-0 [transition-property:translate] duration-500">
                                                            <Quote size={24} className="text-aphoria-gold mx-auto mb-4" />
                                                            <p className="text-white text-sm font-medium leading-relaxed italic">
                                                                "{item.text}"
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* USER INFO (Fades out when text appears) */}
                                                    <div className="group-hover:opacity-0 transition-opacity duration-300">
                                                        <div className="flex items-center gap-4 mb-2">
                                                            <div className="p-[2px] rounded-full bg-gradient-to-tr from-aphoria-gold via-[#FFF4E0] to-aphoria-gold/50">
                                                                <div className="p-[2px] rounded-full bg-black">
                                                                    <div className="w-8 h-8 rounded-full bg-aphoria-bg overflow-hidden">
                                                                        <img src={item.img} className="w-full h-full object-cover" alt={item.user} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-white text-xs font-bold tracking-widest uppercase mb-0.5">{item.user}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] text-white/60">Verified</span>
                                                                    {/* Star icons removed/simplified to avoid reference errors if Star not imported, or added imports */}
                                                                    <span className="text-aphoria-gold text-[10px]">★★★★★</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* HOVER INTERACTION HINT */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                    {/* Icon hidden or removed as requested if causing lag */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-mid hover:text-aphoria-black transition-colors border-b border-aphoria-mid/30 pb-1 hover:border-aphoria-black">
                                Load 2,839 More Reviews
                            </button>
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
                                        High Demand: Only 12 units left in this batch
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        className="inline-flex items-center gap-3 px-12 py-4 bg-white border border-aphoria-black/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-aphoria-black hover:text-white hover:border-aphoria-black transition-all duration-500 shadow-sm hover:shadow-xl group w-full sm:w-auto justify-center"
                                    >
                                        INITIATE RADIANCE
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
                                        30-Day Guarantee
                                    </span>
                                </div>
                            </div>

                            <div className="relative aspect-square overflow-hidden rounded-[80px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] border border-white/5 order-1 lg:order-2">
                                <video
                                    key={currentProduct.video}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    poster={currentProduct.galleryImg}
                                    className="w-full h-full object-cover"
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
