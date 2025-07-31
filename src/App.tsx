import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { AdvancedPageTransition } from './components/animations/SimplePageTransition';
import { NavigationLoader } from './components/ui/NavigationLoader';
import AccessibilityChecker from './components/accessibility/AccessibilityChecker';

import { BundleAnalyzer, ResourcePreloader } from './utils/bundleAnalyzer';
import { injectCriticalCSS } from './utils/layoutShiftPrevention';


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
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentErrorPage = lazy(() => import('./pages/PaymentErrorPage'));
const PaymentCancelPage = lazy(() => import('./pages/PaymentCancelPage'));
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
  // Initialize performance monitoring and preloading
  useEffect(() => {
    // Inject critical CSS to prevent layout shifts
    injectCriticalCSS();

    // Initialize bundle analyzer
    if (import.meta.env.DEV) {
      BundleAnalyzer.init();
    }

    // Preconnect to external domains
    ResourcePreloader.preconnectDomains([
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]);

    // Preload critical routes after initial load
    const preloadTimer = setTimeout(() => {
      // Preload most likely next pages
      import('./pages/PricingPage').catch(() => {});
      import('./pages/ContactPage').catch(() => {});
    }, 2000);

    return () => {
      clearTimeout(preloadTimer);
      BundleAnalyzer.cleanup();
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AccessibilityChecker>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <NavigationLoader />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                <Route path="/" element={<AdvancedPageTransition><Index /></AdvancedPageTransition>} />
                <Route path="/pricing" element={<AdvancedPageTransition><PricingPage /></AdvancedPageTransition>} />
                <Route path="/process" element={<AdvancedPageTransition><ProcessPage /></AdvancedPageTransition>} />
                <Route path="/articles" element={<AdvancedPageTransition><ArticlesPage /></AdvancedPageTransition>} />
                <Route path="/article/:id" element={<AdvancedPageTransition><ArticleDetailPage /></AdvancedPageTransition>} />
                <Route path="/contact" element={<AdvancedPageTransition><ContactPage /></AdvancedPageTransition>} />
                <Route path="/about" element={<AdvancedPageTransition><AboutPage /></AdvancedPageTransition>} />
                <Route path="/privacy" element={<AdvancedPageTransition><PrivacyPage /></AdvancedPageTransition>} />
                <Route path="/terms" element={<AdvancedPageTransition><TermsPage /></AdvancedPageTransition>} />
                <Route path="/faq" element={<AdvancedPageTransition><FAQPage /></AdvancedPageTransition>} />
                
                {/* Payment system routes */}
                <Route path="/secure-payment" element={<AdvancedPageTransition><PaymentPage /></AdvancedPageTransition>} />
                <Route path="/payment-success" element={<AdvancedPageTransition><PaymentSuccessPage /></AdvancedPageTransition>} />
                <Route path="/payment-error" element={<AdvancedPageTransition><PaymentErrorPage /></AdvancedPageTransition>} />
                <Route path="/payment-cancel" element={<AdvancedPageTransition><PaymentCancelPage /></AdvancedPageTransition>} />
                
                {/* Legacy payment route (redirect) */}
                <Route path="/payment-secret" element={<AdvancedPageTransition><PaymentPage /></AdvancedPageTransition>} />
                
                {/* Service pages */}
                <Route path="/services/data-recovery" element={<AdvancedPageTransition><DataRecoveryPage /></AdvancedPageTransition>} />
                <Route path="/services/remote-support" element={<AdvancedPageTransition><RemoteSupportPage /></AdvancedPageTransition>} />
                <Route path="/services/system-repair" element={<AdvancedPageTransition><SystemRepairPage /></AdvancedPageTransition>} />
                
                <Route path="*" element={<AdvancedPageTransition><NotFound /></AdvancedPageTransition>} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AccessibilityChecker>
        </TooltipProvider>
      </QueryClientProvider>
      

    </HelmetProvider>
  );
};

export default App;
