import React, { useEffect } from 'react';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import ProductHero from './components/ProductHero';
import ProductVideoHero from './components/ProductVideoHero';
import IngredientGrid from './components/IngredientGrid';
import ProductGallery from './components/ProductGallery';
import BeforeAfterHero from './components/BeforeAfterHero';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import TrustBar from './components/TrustBar';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg selection:bg-aphoria-green selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Manifesto />
        <ProductHero />
        <ProductVideoHero />
        <IngredientGrid />
        <ProductGallery />
        <BeforeAfterHero />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <Agentation />
    </div>
  );
}

export default App;
