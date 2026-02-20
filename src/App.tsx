import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Diagnostic from './pages/Diagnostic';

// Common Components
const Footer = lazy(() => import('./components/Footer'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-aphoria-bg selection:bg-aphoria-green selection:text-white">
        <Navbar />

        <Suspense fallback={<div className="h-screen bg-aphoria-bg" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
          </Routes>
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        <Agentation />
      </div>
    </Router>
  );
}

export default App;
