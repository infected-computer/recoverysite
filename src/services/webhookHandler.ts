import { LemonSqueezyWebhookEvent, TransactionStatus } from '../types/payment';
import { transactionLogger } from './transactionLogger';
import { lemonSqueezyService } from './lemonSqueezyService';

interface WebhookHandlerConfig {
  onPaymentCompleted?: (event: LemonSqueezyWebhookEvent) => void;
  onPaymentFailed?: (event: LemonSqueezyWebhookEvent) => void;
  onPaymentRefunded?: (event: LemonSqueezyWebhookEvent) => void;
  onSuspiciousActivity?: (event: LemonSqueezyWebhookEvent) => void;
}

class WebhookHandlerService {
  private config: WebhookHandlerConfig = {};
  private readonly WEBHOOK_EVENTS = {
    ORDER_CREATED: 'order_created',
    ORDER_REFUNDED: 'order_refunded',
    SUBSCRIPTION_CREATED: 'subscription_created',
    SUBSCRIPTION_UPDATED: 'subscription_updated',
    SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  } as const;

  /**
   * Configure webhook event handlers
   */
  configure(config: WebhookHandlerConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Handle incoming webhook from Lemon Squeezy
   */
  async handleWebhook(
    payload: string, 
    signature: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Verify webhook signature
      if (!this.verifySignature(payload, signature)) {
        console.error('Webhook signature verification failed');
        return { success: false, message: 'Invalid signature' };
      }

      // Parse webhook payload
      const event: LemonSqueezyWebhookEvent = JSON.parse(payload);
      
      // Log webhook event
      console.log('Webhook received:', event.meta.event_name, event.data.id);

      // Handle different event types
      await this.processWebhookEvent(event);

      return { success: true, message: 'Webhook processed successfully' };
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Webhook processing failed' 
      };
    }
  }

  /**
   * Process different types of webhook events
   */
  private async processWebhookEvent(event: LemonSqueezyWebhookEvent): Promise<void> {
    switch (event.meta.event_name) {
      case this.WEBHOOK_EVENTS.ORDER_CREATED:
        await this.handleOrderCreated(event);
        break;
      
      case this.WEBHOOK_EVENTS.ORDER_REFUNDED:
        await this.handleOrderRefunded(event);
        break;
      
      case this.WEBHOOK_EVENTS.SUBSCRIPTION_CREATED:
        await this.handleSubscriptionCreated(event);
        break;
      
      case this.WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED:
        await this.handleSubscriptionUpdated(event);
        break;
      
      case this.WEBHOOK_EVENTS.SUBSCRIPTION_CANCELLED:
        await this.handleSubscriptionCancelled(event);
        break;
      
      default:
        console.warn('Unhandled webhook event:', event.meta.event_name);
    }
  }

  /**
   * Handle order created event (payment completed)
   */
  private async handleOrderCreated(event: LemonSqueezyWebhookEvent): Promise<void> {
    try {
      const { data } = event;
      
      // Find the corresponding transaction in our logs
      const customData = event.meta.custom_data;
      const transactionId = customData?.transaction_id;
      
      if (transactionId) {
        // Update transaction status to completed
        const success = transactionLogger.updateTransactionStatus(
          transactionId,
          TransactionStatus.COMPLETED,
          new Date()
        );
        
        if (success) {
          console.log(`Transaction ${transactionId} marked as completed`);
        }
      }

      // Create new transaction record if not found
      if (!transactionId || !transactionLogger.getTransactionById(transactionId)) {
        const newTransaction = {
          id: `lemon_${data.id}`,
          amount: data.attributes.total / 100, // Convert from cents
          currency: data.attributes.currency.toUpperCase(),
          status: TransactionStatus.COMPLETED,
          createdAt: new Date(),
          completedAt: new Date(),
          paymentMethodId: 'lemon-squeezy',
          customerInfo: {
            email: data.attributes.customer_email,
          },
        };

        transactionLogger.logTransaction(newTransaction);
      }

      // Call custom handler if configured
      if (this.config.onPaymentCompleted) {
        this.config.onPaymentCompleted(event);
      }

      // Send notification (could be email, push notification, etc.)
      this.sendPaymentNotification('completed', event);
    } catch (error) {
      console.error('Failed to handle order created event:', error);
    }
  }

  /**
   * Handle order refunded event
   */
  private async handleOrderRefunded(event: LemonSqueezyWebhookEvent): Promise<void> {
    try {
      const { data } = event;
      
      // Find the corresponding transaction
      const transactionId = `lemon_${data.id}`;
      const transaction = transactionLogger.getTransactionById(transactionId);
      
      if (transaction) {
        // Update transaction status to refunded
        transactionLogger.updateTransactionStatus(
          transactionId,
          TransactionStatus.REFUNDED,
          new Date()
        );
        
        console.log(`Transaction ${transactionId} marked as refunded`);
      }

      // Call custom handler if configured
      if (this.config.onPaymentRefunded) {
        this.config.onPaymentRefunded(event);
      }

      // Send notification
      this.sendPaymentNotification('refunded', event);
    } catch (error) {
      console.error('Failed to handle order refunded event:', error);
    }
  }

  /**
   * Handle subscription created event
   */
  private async handleSubscriptionCreated(event: LemonSqueezyWebhookEvent): Promise<void> {
    try {
      console.log('Subscription created:', event.data.id);
      
      // Log subscription as a transaction
      const subscriptionTransaction = {
        id: `sub_${event.data.id}`,
        amount: event.data.attributes.total / 100,
        currency: event.data.attributes.currency.toUpperCase(),
        status: TransactionStatus.COMPLETED,
        createdAt: new Date(),
        completedAt: new Date(),
        paymentMethodId: 'lemon-squeezy-subscription',
        customerInfo: {
          email: event.data.attributes.customer_email,
        },
      };

      transactionLogger.logTransaction(subscriptionTransaction);
    } catch (error) {
      console.error('Failed to handle subscription created event:', error);
    }
  }

  /**
   * Handle subscription updated event
   */
  private async handleSubscriptionUpdated(event: LemonSqueezyWebhookEvent): Promise<void> {
    try {
      console.log('Subscription updated:', event.data.id);
      // Handle subscription updates (plan changes, etc.)
    } catch (error) {
      console.error('Failed to handle subscription updated event:', error);
    }
  }

  /**
   * Handle subscription cancelled event
   */
  private async handleSubscriptionCancelled(event: LemonSqueezyWebhookEvent): Promise<void> {
    try {
      console.log('Subscription cancelled:', event.data.id);
      // Handle subscription cancellation
    } catch (error) {
      console.error('Failed to handle subscription cancelled event:', error);
    }
  }

  /**
   * Verify webhook signature
   */
  private verifySignature(payload: string, signature: string): boolean {
    try {
      // Use Lemon Squeezy service to verify signature
      return lemonSqueezyService.verifyWebhookSignature(payload, signature);
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  /**
   * Send payment notification
   */
  private sendPaymentNotification(type: 'completed' | 'failed' | 'refunded', event: LemonSqueezyWebhookEvent): void {
    try {
      // This could send email notifications, push notifications, etc.
      console.log(`Payment ${type} notification:`, {
        orderId: event.data.id,
        amount: event.data.attributes.total / 100,
        currency: event.data.attributes.currency,
        customerEmail: event.data.attributes.customer_email,
      });

      // Example: Send to analytics service
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          transaction_id: event.data.id,
          value: event.data.attributes.total / 100,
          currency: event.data.attributes.currency,
        });
      }
    } catch (error) {
      console.error('Failed to send payment notification:', error);
    }
  }

  /**
   * Detect suspicious webhook activity
   */
  private detectSuspiciousActivity(event: LemonSqueezyWebhookEvent): boolean {
    try {
      // Check for suspicious patterns
      const amount = event.data.attributes.total / 100;
      
      // Flag unusually high amounts
      if (amount > 10000) {
        console.warn('Suspicious high amount transaction:', event.data.id);
        if (this.config.onSuspiciousActivity) {
          this.config.onSuspiciousActivity(event);
        }
        return true;
      }

      // Add more suspicious activity detection logic here
      
      return false;
    } catch (error) {
      console.error('Failed to detect suspicious activity:', error);
      return false;
    }
  }

  /**
   * Get webhook event statistics
   */
  getWebhookStats(): {
    totalEvents: number;
    eventsByType: Record<string, number>;
    lastEventTime: Date | null;
  } {
    // This would typically be stored in a database
    // For now, return mock data
    return {
      totalEvents: 0,
      eventsByType: {},
      lastEventTime: null,
    };
  }
}

// Export singleton instance
export const webhookHandler = new WebhookHandlerService();
export default webhookHandler;