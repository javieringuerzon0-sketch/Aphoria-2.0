import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Diagnostic from './pages/Diagnostic';
import ThankYou from './pages/ThankYou';

// Common Components
const Footer = lazy(() => import('./components/Footer'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function AppInner() {
  const location = useLocation();
  const isThankYou = location.pathname === '/thank-you';

  return (
    <div className="min-h-screen bg-aphoria-bg selection:bg-aphoria-green selection:text-white">
      {!isThankYou && <Navbar />}

      <Suspense fallback={<div className="h-screen bg-aphoria-bg" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Suspense>

      {!isThankYou && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}

      <CartDrawer />
      <Agentation />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
