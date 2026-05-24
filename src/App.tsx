import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Agentation } from 'agentation';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import CartDrawer from './components/CartDrawer';
import { useOmnisendCartSync } from './hooks/useOmnisendCartSync';

import ExitIntent from './components/ExitIntent';
import LiveNotifications from './components/LiveNotifications';
import StickyBar from './components/StickyBar';
import CookieBanner from './components/CookieBanner';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Diagnostic from './pages/Diagnostic';
import ThankYou from './pages/ThankYou';
const ProductLanding = lazy(() => import('./pages/ProductLanding'));
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
  useOmnisendCartSync();
  const location = useLocation();
  const isThankYou = location.pathname === '/thank-you';
  const isLandingPage = location.pathname.startsWith('/lp/');

  return (
    <div className="min-h-screen bg-white selection:bg-aphoria-green selection:text-white">
      {!isThankYou && !isLandingPage && <Navbar />}

      <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }} />}>
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
          <Route path="/lp/:handle" element={<ProductLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isThankYou && !isLandingPage && (
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
      {window.location.hostname === 'localhost' && (
        <Suspense fallback={null}>
          <Agentation />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* reducedMotion="never" forces framer-motion to ignore the OS-level
          prefers-reduced-motion: reduce setting. We do this because Chrome
          mobile + battery saver flips that preference on silently, which
          killed every whileInView / scroll animation in the site — the entire
          About page felt static on mobile because of it. The animations here
          are part of the brand experience (count-ups, card reveals, hero
          fades), not decoration, so we always show them. */}
      <MotionConfig reducedMotion="never">
        <Router>
          <AppInner />
        </Router>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
