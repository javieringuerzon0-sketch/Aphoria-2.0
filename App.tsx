import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import IngredientGrid from './components/IngredientGrid';
import ProductGallery from './components/ProductGallery';
import ProtocolTimeline from './components/ProtocolTimeline';
import Validation from './components/Validation';
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
        <Manifesto />
        <IngredientGrid />
        <ProductGallery />
        <ProtocolTimeline />
        <Validation />
      </main>
      <Footer />
    </div>
  );
}

export default App;