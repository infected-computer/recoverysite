import { lemonSqueezyService } from '../../services/lemonSqueezyService';
import { PaymentFormData } from '../../types/payment';

// Mock fetch
global.fetch = jest.fn();

describe('LemonSqueezyService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCheckout', () => {
    it('should create a checkout successfully', async () => {
      const mockResponse = {
        data: {
          attributes: {
            url: 'https://lemonsqueezy.com/checkout/test-url'
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const paymentData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      const checkoutUrl = await lemonSqueezyService.createCheckout(paymentData);
      expect(checkoutUrl).toBe('https://lemonsqueezy.com/checkout/test-url');
    });

    it('should handle API errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve({
          errors: [{ detail: 'Invalid request' }]
        })
      });

      const paymentData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      await expect(lemonSqueezyService.createCheckout(paymentData))
        .rejects.toThrow('Invalid request');
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const paymentData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      await expect(lemonSqueezyService.createCheckout(paymentData))
        .rejects.toThrow();
    });
  });

  describe('processPayment', () => {
    it('should process payment successfully', async () => {
      const mockResponse = {
        data: {
          attributes: {
            url: 'https://lemonsqueezy.com/checkout/test-url'
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      // Mock window.location.href
      delete (window as any).location;
      (window as any).location = { href: '' };

      const paymentData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      const result = await lemonSqueezyService.processPayment(paymentData);
      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
    });

    it('should validate payment data', async () => {
      const invalidPaymentData: PaymentFormData = {
        amount: 0,
        currency: 'USD',
        customerEmail: 'invalid-email',
        customerName: 'John Doe'
      };

      const result = await lemonSqueezyService.processPayment(invalidPaymentData);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('validatePaymentData', () => {
    it('should validate correct payment data', () => {
      const validData: PaymentFormData = {
        amount: 100,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      // Access private method through any
      const isValid = (lemonSqueezyService as any).validatePaymentData(validData);
      expect(isValid).toBe(true);
    });

    it('should reject invalid amounts', () => {
      const invalidData: PaymentFormData = {
        amount: 0,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      const isValid = (lemonSqueezyService as any).validatePaymentData(invalidData);
      expect(isValid).toBe(false);
    });

    it('should reject invalid currencies', () => {
      const invalidData: PaymentFormData = {
        amount: 100,
        currency: 'INVALID' as any,
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      };

      const isValid = (lemonSqueezyService as any).validatePaymentData(invalidData);
      expect(isValid).toBe(false);
    });
  });
});