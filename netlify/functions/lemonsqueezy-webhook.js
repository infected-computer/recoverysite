
// Netlify serverless function for handling Lemon Squeezy webhooks

import crypto from 'crypto';

// Main handler function
export const handler = async (event, context) => {
  // Immediately return a 200 OK response to Lemon Squeezy
  // This is important to prevent timeouts and retries.
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Webhook received" })
  };

  // Verify the webhook signature for security
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  
  if (!secret) {
    console.error('LEMON_SQUEEZY_WEBHOOK_SECRET is not configured');
    return response;
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(event.body).digest('hex'), 'utf8');
  const signature = Buffer.from(event.headers['x-signature'] || '', 'utf8');

  if (signature.length === 0 || !crypto.timingSafeEqual(digest, signature)) {
    console.warn('Invalid webhook signature from IP:', event.headers['x-forwarded-for'] || 'unknown');
    // Even if the signature is invalid, we return a 200 to prevent
    // Lemon Squeezy from retrying. The warning is logged for security monitoring.
    return response;
  }

  // Process the webhook event
  try {
    const payload = JSON.parse(event.body);
    const eventName = payload.meta.event_name;
    
    console.log(`Received webhook event: ${eventName}`);

    switch (eventName) {
      case 'order_created':
        const orderData = payload.data.attributes;
        console.log(`Order ${orderData.order_number} created for ${orderData.total} ${orderData.currency}`);
        console.log(`Customer: ${orderData.customer_email}`);
        // Here you can:
        // - Send a confirmation email to the customer
        // - Add the customer to your mailing list
        // - Update your database
        break;

      case 'order_refunded':
        const refundData = payload.data.attributes;
        console.log(`Order ${refundData.order_number} was refunded`);
        // Handle refund logic
        break;

      case 'subscription_created':
        const subData = payload.data.attributes;
        console.log(`Subscription created for ${subData.customer_email}`);
        // Handle subscription logic
        break;

      case 'subscription_cancelled':
        const cancelData = payload.data.attributes;
        console.log(`Subscription cancelled for ${cancelData.customer_email}`);
        // Handle cancellation logic
        break;

      default:
        console.log(`Unhandled webhook event: ${eventName}`);
        break;
    }

  } catch (error) {
    console.error('Error processing webhook:', error);
  }

  return response;
};
