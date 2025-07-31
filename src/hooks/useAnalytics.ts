import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../components/analytics/GoogleAnalytics';

/**
 * Hook for tracking page views and analytics events
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    // Small delay to ensure page title is updated
    const timer = setTimeout(() => {
      analytics.pageView(location.pathname + location.search, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return analytics;
};

/**
 * Hook for tracking scroll depth
 */
export const useScrollTracking = (thresholds: number[] = [25, 50, 75, 90, 100]) => {
  useEffect(() => {
    const trackedThresholds = new Set<number>();
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          analytics.trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholds]);
};

/**
 * Hook for tracking time on page
 */
export const useTimeTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();
    const pageName = location.pathname;

    // Track time intervals
    const intervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    const timers = intervals.map(seconds => 
      setTimeout(() => {
        analytics.trackTimeOnPage(seconds, pageName);
      }, seconds * 1000)
    );

    return () => {
      // Clear timers
      timers.forEach(timer => clearTimeout(timer));
      
      // Track final time on page
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) { // Only track if user spent more than 10 seconds
        analytics.trackTimeOnPage(timeSpent, pageName);
      }
    };
  }, [location]);
};

/**
 * Hook for tracking form interactions
 */
export const useFormTracking = (formName: string) => {
  const trackFormStart = () => {
    analytics.event('form_start', 'engagement', formName);
  };

  const trackFormStep = (step: string) => {
    analytics.event('form_step', 'engagement', `${formName}_${step}`);
  };

  const trackFormSubmit = (success: boolean = true) => {
    analytics.trackFormSubmission(formName, success);
  };

  const trackFormError = (errorType: string) => {
    analytics.event('form_error', 'engagement', `${formName}_${errorType}`);
  };

  return {
    trackFormStart,
    trackFormStep,
    trackFormSubmit,
    trackFormError
  };
};

/**
 * Hook for tracking user interactions
 */
export const useInteractionTracking = () => {
  const trackClick = (elementName: string, location: string) => {
    analytics.trackButtonClick(elementName, location);
  };

  const trackWhatsApp = (location: string) => {
    analytics.trackWhatsAppClick(location);
  };

  const trackPhone = (location: string) => {
    analytics.trackPhoneClick(location);
  };

  const trackEmail = (location: string) => {
    analytics.trackEmailClick(location);
  };

  const trackDownload = (fileName: string, fileType: string) => {
    analytics.event('download', 'engagement', `${fileName}.${fileType}`);
  };

  const trackExternalLink = (url: string, linkText: string) => {
    analytics.event('external_link', 'engagement', `${linkText}_${url}`);
  };

  return {
    trackClick,
    trackWhatsApp,
    trackPhone,
    trackEmail,
    trackDownload,
    trackExternalLink
  };
};

export default useAnalytics;