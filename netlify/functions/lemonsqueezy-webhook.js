
// Netlify serverless function for handling Lemon Squeezy webhooks

const crypto = require('crypto');

// Main handler function
exports.handler = async (event, context) => {
  // Immediately return a 200 OK response to Lemon Squeezy
  // This is important to prevent timeouts and retries.
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Webhook received" })
  };

  // Verify the webhook signature for security
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(event.body).digest('hex'), 'utf8');
  const signature = Buffer.from(event.headers['x-signature'], 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    console.warn('Invalid webhook signature');
    // Even if the signature is invalid, we return a 200 to prevent
    // Lemon Squeezy from retrying. The warning is logged for security monitoring.
    return response;
  }

  // Process the webhook event
  try {
    const payload = JSON.parse(event.body);
    const eventName = payload.meta.event_name;

    // Example: Handle a successful order
    if (eventName === 'order_created') {
      const orderData = payload.data.attributes;
      console.log(`Order ${orderData.order_number} created successfully!`);
      // Here you can:
      // - Send a confirmation email to the customer
      // - Add the customer to your mailing list
      // - Update your database
    }

    // Add more event handlers as needed

  } catch (error) {
    console.error('Error processing webhook:', error);
  }

  return response;
};
