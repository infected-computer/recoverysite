import { z } from 'zod';
import { PAYMENT_CONFIG } from '../config/payment';
import { PaymentFormData, ValidationError } from '../types/payment';

// Zod schema for payment form validation
export const paymentFormSchema = z.object({
  amount: z
    .number()
    .min(PAYMENT_CONFIG.VALIDATION.MIN_AMOUNT, `Amount must be at least $${PAYMENT_CONFIG.VALIDATION.MIN_AMOUNT}`)
    .max(PAYMENT_CONFIG.VALIDATION.MAX_AMOUNT, `Amount cannot exceed $${PAYMENT_CONFIG.VALIDATION.MAX_AMOUNT}`)
    .refine(
      (val) => Number.isFinite(val) && val > 0,
      'Amount must be a valid positive number'
    )
    .refine(
      (val) => {
        const decimalPlaces = (val.toString().split('.')[1] || '').length;
        return decimalPlaces <= PAYMENT_CONFIG.VALIDATION.AMOUNT_DECIMAL_PLACES;
      },
      `Amount can have at most ${PAYMENT_CONFIG.VALIDATION.AMOUNT_DECIMAL_PLACES} decimal places`
    ),
  
  currency: z.enum(PAYMENT_CONFIG.VALIDATION.SUPPORTED_CURRENCIES, {
    errorMap: () => ({ message: 'Please select a valid currency' })
  }),
  
  customerEmail: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
});

// Validate payment form data
export const validatePaymentForm = (data: PaymentFormData): ValidationError[] => {
  try {
    paymentFormSchema.parse(data);
    return [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        value: err.code === 'invalid_type' ? undefined : data[err.path[0] as keyof PaymentFormData],
      }));
    }
    return [{ field: 'general', message: 'Validation failed' }];
  }
};

// Validate amount specifically
export const validateAmount = (amount: number): boolean => {
  try {
    paymentFormSchema.shape.amount.parse(amount);
    return true;
  } catch {
    return false;
  }
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>"']/g, '') // Remove potentially dangerous characters
    .trim()
    .slice(0, 1000); // Limit length
};

// Validate access token for hidden page
export const validateAccessToken = (token: string): boolean => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Simple token validation - in production, use more secure method
  return token === PAYMENT_CONFIG.HIDDEN_PAGE.ACCESS_TOKEN;
};

// Format amount for display
export const formatAmount = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Convert amount to cents for API
export const amountToCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Convert cents to amount for display
export const centsToAmount = (cents: number): number => {
  return cents / 100;
};