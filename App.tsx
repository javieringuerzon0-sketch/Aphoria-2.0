import React, { useEffect, lazy, Suspense } from 'react';
import { Agentation } from 'agentation';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ExitIntent from './components/ExitIntent';
import LiveNotifications from './components/LiveNotifications';
import StickyBar from './components/StickyBar';

// Lazy load components below the fold
const Manifesto = lazy(() => import('./components/Manifesto'));
const ProductHero = lazy(() => import('./components/ProductHero'));
const ProductVideoHero = lazy(() => import('./components/ProductVideoHero'));
const IngredientGrid = lazy(() => import('./components/IngredientGrid'));
const ProductGallery = lazy(() => import('./components/ProductGallery'));
const BeforeAfterHero = lazy(() => import('./components/BeforeAfterHero'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  useEffect(() => {
    // Instant scroll for anchor links with passive listeners
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
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
    <div className="min-h-screen bg-aphoria-bg selection:bg-aphoria-green selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Suspense fallback={<div className="h-screen" />}>
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
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ExitIntent />
      <LiveNotifications />
      <StickyBar />
      <Agentation />
      <SpeedInsights />
    </div>
  );
}

export default App;
