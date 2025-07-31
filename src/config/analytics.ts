/**
 * Analytics configuration
 */

export const ANALYTICS_CONFIG = {
  // Google Analytics tracking ID
  GA_TRACKING_ID: 'G-82L3JHL449',
  
  // Enable analytics in production only by default
  ENABLED: import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // Debug mode for development
  DEBUG: import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
  
  // Privacy settings
  PRIVACY: {
    ANONYMIZE_IP: true,
    ALLOW_GOOGLE_SIGNALS: false,
    ALLOW_AD_PERSONALIZATION: false,
    COOKIE_EXPIRES: 63072000, // 2 years in seconds
  },
  
  // Custom dimensions and metrics
  CUSTOM_DIMENSIONS: {
    USER_TYPE: 'custom_dimension_1',
    PAGE_TYPE: 'custom_dimension_2',
    FORM_TYPE: 'custom_dimension_3',
  },
  
  // Event categories
  EVENT_CATEGORIES: {
    ENGAGEMENT: 'engagement',
    CONTACT: 'contact',
    SERVICES: 'services',
    PRICING: 'pricing',
    NAVIGATION: 'navigation',
    FORM: 'form',
    ERROR: 'error',
  },
  
  // Common event actions
  EVENT_ACTIONS: {
    CLICK: 'click',
    SUBMIT: 'submit',
    VIEW: 'view',
    DOWNLOAD: 'download',
    SCROLL: 'scroll',
    SEARCH: 'search',
    SHARE: 'share',
    ERROR: 'error',
  },
} as const;

/**
 * Get analytics configuration based on environment
 */
export const getAnalyticsConfig = () => {
  return {
    trackingId: ANALYTICS_CONFIG.GA_TRACKING_ID,
    enabled: ANALYTICS_CONFIG.ENABLED,
    debug: ANALYTICS_CONFIG.DEBUG,
    privacy: ANALYTICS_CONFIG.PRIVACY,
  };
};

/**
 * Check if analytics should be loaded
 */
export const shouldLoadAnalytics = (): boolean => {
  // Don't load if user has opted out
  if (typeof window !== 'undefined' && window.localStorage) {
    const optOut = localStorage.getItem('analytics_opt_out');
    if (optOut === 'true') {
      return false;
    }
  }
  
  return ANALYTICS_CONFIG.ENABLED;
};

/**
 * Opt out of analytics
 */
export const optOutOfAnalytics = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics_opt_out', 'true');
    
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  }
};

/**
 * Opt in to analytics
 */
export const optInToAnalytics = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('analytics_opt_out');
    
    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  }
};

export default ANALYTICS_CONFIG;