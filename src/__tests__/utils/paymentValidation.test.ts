import { 
  validatePaymentForm, 
  validateAmount, 
  sanitizeInput, 
  validateAccessToken,
  formatAmount,
  amountToCents,
  centsToAmount 
} from '../../utils/paymentValidation';
import { PaymentFormData } from '../../types/payment';

describe('Payment Validation Utils', () => {
  describe('validatePaymentForm', () => {
    it('should validate a correct payment form', () => {
      const validData: PaymentFormData = {
        amount: 100,
        currency: 'ILS',
        customerEmail: 'test@example.com',
        customerName: 'John Doe',
      };

      const errors = validatePaymentForm(validData);
      expect(errors).toHaveLength(0);
    });

    it('should reject invalid amounts', () => {
      const invalidData: PaymentFormData = {
        amount: 0,
        currency: 'ILS',
        customerEmail: 'test@example.com',
        customerName: 'John Doe',
      };

      const errors = validatePaymentForm(invalidData);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('amount');
    });

    it('should reject invalid email addresses', () => {
      const invalidData: PaymentFormData = {
        amount: 100,
        currency: 'ILS',
        customerEmail: 'invalid-email',
        customerName: 'John Doe',
      };

      const errors = validatePaymentForm(invalidData);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'customerEmail')).toBe(true);
    });

    it('should reject unsupported currencies', () => {
      const invalidData: PaymentFormData = {
        amount: 100,
        currency: 'JPY' as any,
        customerEmail: 'test@example.com',
        customerName: 'John Doe',
      };

      const errors = validatePaymentForm(invalidData);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'currency')).toBe(true);
    });
  });

  describe('validateAmount', () => {
    it('should validate correct amounts', () => {
      expect(validateAmount(100)).toBe(true);
      expect(validateAmount(1)).toBe(true);
      expect(validateAmount(9999)).toBe(true);
    });

    it('should reject invalid amounts', () => {
      expect(validateAmount(0)).toBe(false);
      expect(validateAmount(-1)).toBe(false);
      expect(validateAmount(10001)).toBe(false);
      expect(validateAmount(NaN)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      const dangerous = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(dangerous);
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
    });

    it('should trim whitespace', () => {
      const input = '  test  ';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('test');
    });

    it('should limit length', () => {
      const longInput = 'a'.repeat(2000);
      const sanitized = sanitizeInput(longInput);
      expect(sanitized.length).toBeLessThanOrEqual(1000);
    });
  });

  describe('validateAccessToken', () => {
    it('should validate correct token', () => {
      // This would depend on your actual token validation logic
      const validToken = 'default-token';
      expect(validateAccessToken(validToken)).toBe(true);
    });

    it('should reject invalid tokens', () => {
      expect(validateAccessToken('')).toBe(false);
      expect(validateAccessToken('invalid')).toBe(false);
    });
  });

  describe('formatAmount', () => {
    it('should format amounts correctly', () => {
      expect(formatAmount(100, 'USD')).toBe('$100.00');
      expect(formatAmount(99.99, 'EUR')).toBe('€99.99');
    });
  });

  describe('amount conversion', () => {
    it('should convert amounts to cents', () => {
      expect(amountToCents(100)).toBe(10000);
      expect(amountToCents(99.99)).toBe(9999);
    });

    it('should convert cents to amounts', () => {
      expect(centsToAmount(10000)).toBe(100);
      expect(centsToAmount(9999)).toBe(99.99);
    });
  });
});