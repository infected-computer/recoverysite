import { 
  PaymentFormData, 
  PaymentResult, 
  LemonSqueezyConfig, 
  LemonSqueezyCheckout,
  LemonSqueezyError,
  LemonSqueezyErrorType 
} from '../types/payment';
import { getPaymentConfig } from '../config/payment';
import { amountToCents } from '../utils/paymentValidation';

class LemonSqueezyService {
  private config: LemonSqueezyConfig;

  constructor() {
    const paymentConfig = getPaymentConfig();
    this.config = paymentConfig.LEMON_SQUEEZY;
  }

  /**
   * Create a checkout session with Lemon Squeezy
   */
  async createCheckout(paymentData: PaymentFormData): Promise<string> {
    try {
      const checkoutData: LemonSqueezyCheckout = {
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              custom: {
                amount: amountToCents(paymentData.amount),
                currency: paymentData.currency,
              },
            },
            product_options: {
              name: 'Custom Payment',
              description: `Payment of ${paymentData.amount} ${paymentData.currency}`,
              redirect_url: getPaymentConfig().REDIRECT_URLS.SUCCESS,
            },
            checkout_options: {
              embed: false,
              media: false,
              logo: false,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: this.config.STORE_ID,
              },
            },
          },
        },
      };

      // Add customer information if provided
      if (paymentData.customerEmail || paymentData.customerName) {
        checkoutData.data.attributes.checkout_data.custom = {
          ...checkoutData.data.attributes.checkout_data.custom,
          customer_email: paymentData.customerEmail || '',
          customer_name: paymentData.customerName || '',
        };
      }

      const response = await fetch(`${this.config.API_BASE_URL}/checkouts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.API_KEY}`,
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.errors?.[0]?.detail || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      
      if (!result.data?.attributes?.url) {
        throw new Error('Invalid response from Lemon Squeezy - missing checkout URL');
      }

      return result.data.attributes.url;
    } catch (error) {
      console.error('Lemon Squeezy checkout creation failed:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Process payment by redirecting to Lemon Squeezy checkout
   */
  async processPayment(paymentData: PaymentFormData): Promise<PaymentResult> {
    try {
      // Validate the payment data
      if (!this.validatePaymentData(paymentData)) {
        throw new Error('Invalid payment data');
      }

      // Create checkout session
      const checkoutUrl = await this.createCheckout(paymentData);

      // Redirect to Lemon Squeezy checkout
      window.location.href = checkoutUrl;

      // Return success result (though user will be redirected)
      return {
        success: true,
        transactionId: `pending-${Date.now()}`,
      };
    } catch (error) {
      console.error('Payment processing failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  /**
   * Validate payment data before processing
   */
  private validatePaymentData(data: PaymentFormData): boolean {
    if (!data.amount || data.amount <= 0) {
      return false;
    }

    if (!data.currency || !['ILS', 'USD', 'EUR'].includes(data.currency)) {
      return false;
    }

    if (data.customerEmail && !this.isValidEmail(data.customerEmail)) {
      return false;
    }

    return true;
  }

  /**
   * Simple email validation
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Handle and categorize errors
   */
  private handleError(error: any): LemonSqueezyError {
    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch')) {
        return {
          type: LemonSqueezyErrorType.NETWORK_ERROR,
          message: 'Network connection failed. Please check your internet connection.',
          details: error.message,
        };
      }

      // API errors
      if (error.message.includes('HTTP')) {
        return {
          type: LemonSqueezyErrorType.API_ERROR,
          message: 'Payment service is temporarily unavailable. Please try again later.',
          details: error.message,
        };
      }

      // Invalid amount errors
      if (error.message.toLowerCase().includes('amount')) {
        return {
          type: LemonSqueezyErrorType.INVALID_AMOUNT,
          message: 'Invalid payment amount. Please check the amount and try again.',
          details: error.message,
        };
      }

      // Generic API error
      return {
        type: LemonSqueezyErrorType.API_ERROR,
        message: error.message,
        details: error,
      };
    }

    // Unknown error
    return {
      type: LemonSqueezyErrorType.API_ERROR,
      message: 'An unexpected error occurred. Please try again.',
      details: error,
    };
  }

  /**
   * Get checkout status (for webhook handling)
   */
  async getCheckoutStatus(checkoutId: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.API_BASE_URL}/checkouts/${checkoutId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.API_KEY}`,
          'Accept': 'application/vnd.api+json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get checkout status:', error);
      throw error;
    }
  }

  /**
   * Verify webhook signature (for security)
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // This would typically use crypto to verify the webhook signature
    // For now, we'll do a simple check
    return signature === this.config.WEBHOOK_SECRET;
  }
}

// Export singleton instance
export const lemonSqueezyService = new LemonSqueezyService();
export default lemonSqueezyService;