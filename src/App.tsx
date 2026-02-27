import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import CartDrawer from './components/CartDrawer';

import ExitIntent from './components/ExitIntent';
import LiveNotifications from './components/LiveNotifications';
import StickyBar from './components/StickyBar';
import CookieBanner from './components/CookieBanner';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Diagnostic from './pages/Diagnostic';
import ThankYou from './pages/ThankYou';
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Common Components
const Footer = lazy(() => import('./components/Footer'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function AppInner() {
  const location = useLocation();
  const isThankYou = location.pathname === '/thank-you';
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <div className={`min-h-screen selection:bg-aphoria-green selection:text-white ${isProductPage ? 'bg-white' : 'bg-aphoria-bg'}`}>
      {!isThankYou && <Navbar />}

      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isThankYou && (
        <>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <ExitIntent />
          <LiveNotifications />
          <StickyBar />
        </>
      )}

      <CartDrawer />
      <CookieBanner />
      <Agentation />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppInner />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
