import { useState, useCallback } from 'react';
import { PaymentFormData, PaymentResult } from '../types/payment';
import { lemonSqueezyService } from '../services/lemonSqueezyService';

interface UsePaymentProcessingState {
  isProcessing: boolean;
  error: string | null;
  result: PaymentResult | null;
}

export const usePaymentProcessing = () => {
  const [state, setState] = useState<UsePaymentProcessingState>({
    isProcessing: false,
    error: null,
    result: null,
  });

  const processPayment = useCallback(async (paymentData: PaymentFormData): Promise<PaymentResult> => {
    setState({
      isProcessing: true,
      error: null,
      result: null,
    });

    try {
      const result = await lemonSqueezyService.processPayment(paymentData);
      
      setState({
        isProcessing: false,
        error: result.success ? null : result.error || 'Payment failed',
        result,
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      
      setState({
        isProcessing: false,
        error: errorMessage,
        result: { success: false, error: errorMessage },
      });

      return { success: false, error: errorMessage };
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isProcessing: false,
      error: null,
      result: null,
    });
  }, []);

  const retry = useCallback(async (paymentData: PaymentFormData) => {
    return await processPayment(paymentData);
  }, [processPayment]);

  return {
    ...state,
    processPayment,
    reset,
    retry,
  };
};