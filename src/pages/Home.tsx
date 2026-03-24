import React, { useEffect, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import SkeletonSection from '../components/SkeletonSection';
// Lazy load components below the fold
const Manifesto = lazy(() => import('../components/Manifesto'));
const ProductHero = lazy(() => import('../components/ProductHero'));
const ProductVideoHero = lazy(() => import('../components/ProductVideoHero'));
const IngredientGrid = lazy(() => import('../components/IngredientGrid'));
const ProductGallery = lazy(() => import('../components/ProductGallery'));
const BeforeAfterHero = lazy(() => import('../components/BeforeAfterHero'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Newsletter = lazy(() => import('../components/Newsletter'));

function Home() {
    useEffect(() => {
        if (!window.location.hash) return;

        const targetId = window.location.hash.substring(1);

        const doScroll = () => {
            const element = document.getElementById(targetId);
            if (element) {
                window.scrollTo(0, element.offsetTop - 80);
                return true;
            }
            return false;
        };

        if (doScroll()) return;

        // Element not yet rendered (lazy loading) — poll without hiding the page
        const interval = setInterval(() => {
            if (doScroll()) clearInterval(interval);
        }, 30);
        const timeout = setTimeout(() => clearInterval(interval), 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="bg-aphoria-bg">
            <main>
                <Hero />
                <TrustBar />
                <Suspense fallback={<SkeletonSection height="300px" />}><Manifesto /></Suspense>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="100vh" />}><ProductHero /></Suspense></div>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="100vh" />}><ProductVideoHero /></Suspense></div>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="600px" />}><IngredientGrid /></Suspense></div>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="600px" />}><ProductGallery /></Suspense></div>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="600px" />}><BeforeAfterHero /></Suspense></div>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="500px" />}><Testimonials /></Suspense></div>
                <div className="below-fold"><Suspense fallback={<SkeletonSection height="300px" />}><Newsletter /></Suspense></div>
            </main>
        </div>
    );
}

export default Home;
