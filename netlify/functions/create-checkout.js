
// Netlify serverless function for creating a Lemon Squeezy checkout URL

const fetch = require('node-fetch');

// Main handler function
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Adjust for production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Check for required environment variables
  const { LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID } = process.env;
  if (!LEMON_SQUEEZY_API_KEY || !LEMON_SQUEEZY_STORE_ID) {
    console.error('Missing Lemon Squeezy API key or Store ID');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Payment service is not configured correctly.' })
    };
  }

  try {
    const { price, name, description } = JSON.parse(event.body);

    // Basic validation
    if (typeof price !== 'number' || price <= 0 || !name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid payment data provided.' })
      };
    }

    const checkoutData = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            custom: {
              description: description || name, // Use description or name
            },
          },
          product_options: {
            name: name,
            description: description || `Payment for ${name}`,
            receipt_button_text: 'Return to Site',
            receipt_link_url: process.env.REDIRECT_URL_SUCCESS || 'https://recoverysite.netlify.app',
          },
          custom_price: price * 100, // Convert to cents
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: LEMON_SQUEEZY_STORE_ID,
            },
          },
        },
      },
    };

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Lemon Squeezy API error:', errorData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Failed to create checkout.', details: errorData })
      };
    }

    const result = await response.json();
    const checkoutUrl = result.data?.attributes?.url;

    if (!checkoutUrl) {
      console.error('Invalid response from Lemon Squeezy - missing checkout URL');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to retrieve checkout URL.' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ checkoutUrl }),
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'An unexpected error occurred.' })
    };
  }
};
