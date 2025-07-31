import { useEffect, useCallback } from 'react';
import { webhookHandler } from '../services/webhookHandler';
import { LemonSqueezyWebhookEvent } from '../types/payment';

interface UseWebhookHandlerConfig {
  onPaymentCompleted?: (event: LemonSqueezyWebhookEvent) => void;
  onPaymentFailed?: (event: LemonSqueezyWebhookEvent) => void;
  onPaymentRefunded?: (event: LemonSqueezyWebhookEvent) => void;
  onSuspiciousActivity?: (event: LemonSqueezyWebhookEvent) => void;
}

export const useWebhookHandler = (config?: UseWebhookHandlerConfig) => {
  // Configure webhook handlers
  useEffect(() => {
    if (config) {
      webhookHandler.configure(config);
    }
  }, [config]);

  // Handle webhook manually (for testing or direct integration)
  const handleWebhook = useCallback(async (payload: string, signature: string) => {
    return await webhookHandler.handleWebhook(payload, signature);
  }, []);

  // Simulate webhook for testing
  const simulateWebhook = useCallback((eventType: string, data: any) => {
    const mockEvent: LemonSqueezyWebhookEvent = {
      meta: {
        event_name: eventType,
        custom_data: data.custom_data || {},
      },
      data: {
        type: 'orders',
        id: data.id || `test_${Date.now()}`,
        attributes: {
          status: data.status || 'paid',
          total: data.total || 1000, // in cents
          currency: data.currency || 'usd',
          customer_email: data.customer_email || 'test@example.com',
        },
      },
    };

    return handleWebhook(JSON.stringify(mockEvent), 'test_signature');
  }, [handleWebhook]);

  // Get webhook statistics
  const getStats = useCallback(() => {
    return webhookHandler.getWebhookStats();
  }, []);

  return {
    handleWebhook,
    simulateWebhook,
    getStats,
  };
};