import { z } from 'zod';
import { PAYMENT_CONFIG } from '../config/payment';
import { PaymentFormData, ValidationError } from '../types/payment';

// Zod schema for payment form validation
export const paymentFormSchema = z.object({
  amount: z
    .number()
    .min(PAYMENT_CONFIG.VALIDATION.MIN_AMOUNT, `הסכום חייב להיות לפחות ₪${PAYMENT_CONFIG.VALIDATION.MIN_AMOUNT}`)
    .max(PAYMENT_CONFIG.VALIDATION.MAX_AMOUNT, `הסכום לא יכול לעלות על ₪${PAYMENT_CONFIG.VALIDATION.MAX_AMOUNT}`)
    .refine(
      (val) => Number.isFinite(val) && val > 0,
      'הסכום חייב להיות מספר חיובי תקין'
    )
    .refine(
      (val) => {
        const decimalPlaces = (val.toString().split('.')[1] || '').length;
        return decimalPlaces <= PAYMENT_CONFIG.VALIDATION.AMOUNT_DECIMAL_PLACES;
      },
      `הסכום יכול להכיל לכל היותר ${PAYMENT_CONFIG.VALIDATION.AMOUNT_DECIMAL_PLACES} ספרות אחרי הנקודה`
    ),
  
  currency: z.enum(PAYMENT_CONFIG.VALIDATION.SUPPORTED_CURRENCIES, {
    errorMap: () => ({ message: 'מטבע חייב להיות שקלים' })
  }),
  
  customerEmail: z
    .string()
    .email('אנא הזן כתובת אימייל תקינה')
    .optional()
    .or(z.literal('')),
  
  customerName: z
    .string()
    .min(2, 'השם חייב להכיל לפחות 2 תווים')
    .max(100, 'השם לא יכול להכיל יותר מ-100 תווים')
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
  // Use appropriate locale for currency formatting
  const locale = currency === 'ILS' ? 'he-IL' : 'en-US';
  
  return new Intl.NumberFormat(locale, {
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