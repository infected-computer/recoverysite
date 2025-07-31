// Payment system configuration

export const PAYMENT_CONFIG = {
  // Lemon Squeezy configuration
  LEMON_SQUEEZY: {
    API_BASE_URL: 'https://api.lemonsqueezy.com/v1',
    API_KEY: import.meta.env.VITE_LEMON_SQUEEZY_API_KEY || '',
    STORE_ID: import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID || '',
    ENVIRONMENT: (import.meta.env.VITE_LEMON_SQUEEZY_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
    WEBHOOK_SECRET: import.meta.env.VITE_LEMON_SQUEEZY_WEBHOOK_SECRET || '',
  },

  // Hidden page configuration
  HIDDEN_PAGE: {
    ACCESS_TOKEN: import.meta.env.VITE_HIDDEN_PAGE_ACCESS_TOKEN || 'default-token',
    PATH: '/secure-payment',
  },

  // Payment validation rules
  VALIDATION: {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 10000,
    SUPPORTED_CURRENCIES: ['ILS'] as const,
    AMOUNT_DECIMAL_PLACES: 2,
  },

  // Security settings
  SECURITY: {
    RATE_LIMIT_ATTEMPTS: 5,
    RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  },

  // UI settings
  UI: {
    LOADING_TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 2000, // 2 seconds
  },

  // Business details for receipts
  BUSINESS: {
    NAME: 'דוקטור פיקס - שירותי שחזור קבצים',
    ADDRESS: 'ישראל',
    TAX_ID: 'ח.פ. ישראלי',
    EMAIL: 'doctorfix79@gmail.com',
  },
} as const;

// Environment validation
export const validateEnvironment = (): boolean => {
  const requiredEnvVars = [
    'VITE_LEMON_SQUEEZY_API_KEY',
    'VITE_LEMON_SQUEEZY_STORE_ID',
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    return false;
  }

  return true;
};

// Get configuration with environment validation
export const getPaymentConfig = () => {
  console.log("Attempting to get payment config...");
  console.log("VITE_LEMON_SQUEEZY_API_KEY:", import.meta.env.VITE_LEMON_SQUEEZY_API_KEY);
  console.log("VITE_LEMON_SQUEEZY_STORE_ID:", import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID);

  if (!validateEnvironment()) {
    console.error("Payment system configuration validation failed.");
    throw new Error('Payment system configuration is incomplete');
  }
  
  console.log("Payment config loaded successfully.");
  return PAYMENT_CONFIG;
};

// Add redirect URLs for Lemon Squeezy
export const REDIRECT_URLS = {
  SUCCESS: 'https://recoverysite.netlify.app/payment-success',
  ERROR: 'https://recoverysite.netlify.app/payment-error',
  CANCEL: 'https://recoverysite.netlify.app/payment-cancel',
} as const;

// Update PAYMENT_CONFIG to include redirect URLs
(PAYMENT_CONFIG as any).REDIRECT_URLS = REDIRECT_URLS;