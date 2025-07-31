import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import AccessibilityChecker from './components/accessibility/AccessibilityChecker';

import { injectCriticalCSS } from './utils/layoutShiftPrevention';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import { getAnalyticsConfig } from './config/analytics';
import CookieConsent from './components/privacy/CookieConsent';
import fontLoader from './utils/fontLoader';
import FontFallbackNotice from './components/ui/FontFallbackNotice';


// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const PricingPage = lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage').then(module => ({ default: module.ArticlesPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then(module => ({ default: module.ArticleDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));

const NotFound = lazy(() => import('./pages/NotFound'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

// Service pages
const DataRecoveryPage = lazy(() => import('./pages/services/DataRecoveryPage'));
const RemoteSupportPage = lazy(() => import('./pages/services/RemoteSupportPage'));
const SystemRepairPage = lazy(() => import('./pages/services/SystemRepairPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  const analyticsConfig = getAnalyticsConfig();
  
  // Initialize performance monitoring and preloading
  useEffect(() => {
    // Inject critical CSS to prevent layout shifts
    injectCriticalCSS();

    // Initialize font optimization
    fontLoader.initFontOptimization();

    // Preconnect to external domains for better performance
    const preconnectDomains = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preload critical routes after initial load
    const preloadTimer = setTimeout(() => {
      // Preload most likely next pages
      import('./pages/PricingPage').catch(() => {});
      import('./pages/ContactPage').catch(() => {});
    }, 2000);

    return () => {
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <HelmetProvider>
      <GoogleAnalytics 
        trackingId={analyticsConfig.trackingId} 
        enabled={analyticsConfig.enabled}
      />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AccessibilityChecker>
            <Toaster />
            <Sonner />
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/article/:id" element={<ArticleDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                
                {/* Payment system routes */}
                <Route path="/secure-payment" element={<PaymentPage />} />
                
                {/* Legacy payment route (redirect) */}
                <Route path="/payment-secret" element={<PaymentPage />} />
                
                {/* Service pages */}
                <Route path="/services/data-recovery" element={<DataRecoveryPage />} />
                <Route path="/services/remote-support" element={<RemoteSupportPage />} />
                <Route path="/services/system-repair" element={<SystemRepairPage />} />
                
                <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
            <CookieConsent />
            <FontFallbackNotice />
          </AccessibilityChecker>
        </TooltipProvider>
      </QueryClientProvider>
      

    </HelmetProvider>
  );
};

export default App;
