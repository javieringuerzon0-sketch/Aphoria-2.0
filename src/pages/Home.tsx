import React, { useEffect, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
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
    const [isReady, setIsReady] = React.useState(!window.location.hash);

    useEffect(() => {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);

            const doScroll = () => {
                const element = document.getElementById(targetId);
                if (element) {
                    // Use a slightly larger timeout to ensure layout is stable
                    // but keep the page invisible until this happens
                    window.scrollTo(0, element.offsetTop - 80); // Adjust for navbar height

                    // Small delay to let browser finish the scroll jump before showing
                    setTimeout(() => {
                        setIsReady(true);
                    }, 50);
                    return true;
                }
                return false;
            };

            // Attempt immediate scroll
            if (!doScroll()) {
                // If the element isn't there (lazy loading), poll for it
                const interval = setInterval(() => {
                    if (doScroll()) clearInterval(interval);
                }, 30);

                // Safety timeout
                setTimeout(() => {
                    clearInterval(interval);
                    setIsReady(true);
                }, 1500);

                return () => clearInterval(interval);
            }
        }

        // Instant scroll for anchor links with passive listeners
        const handleAnchorClick = (e: Event) => {
            const anchor = e.currentTarget as HTMLAnchorElement;
            const href = anchor.getAttribute('href');
            if (!href || !href.startsWith('#') || href === '#') return;

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick, { passive: false });
        });

        // Cleanup
        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };
    }, []);

    return (
        <div style={{ opacity: isReady ? 1 : 0, transition: isReady ? 'opacity 0.15s ease' : 'none' }}>
            <main>
                <Hero />
                <TrustBar />
                <Suspense fallback={<div className="min-h-screen" />}>
                    <Manifesto />
                    <ProductHero />
                    <ProductVideoHero />
                    <IngredientGrid />
                    <ProductGallery />
                    <BeforeAfterHero />
                    <Testimonials />
                    <Newsletter />
                </Suspense>
            </main>
        </div>
    );
}

export default Home;
