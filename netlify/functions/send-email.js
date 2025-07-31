// Netlify serverless function for sending emails via Resend
// This function handles contact form submissions securely on the backend

import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_CONFIG = {
  // השתמש בכתובת ברירת המחדל של Resend לסביבת בדיקות
  FROM_EMAIL: 'onboarding@resend.dev',
  TO_EMAIL: 'doctorfix79@gmail.com',
  SUBJECT: 'בקשת יצירת קשר חדשה מהאתר',
  FROM_NAME: 'דוקטור פיקס - טופס יצירת קשר'
};

// Generate HTML email template
const generateEmailHTML = (data) => {
  const currentDate = new Date().toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Sanitize data to prevent XSS
  const sanitize = (str) => {
    if (!str) return '';
    return str.toString().replace(/[<>&"']/g, (char) => {
      const chars = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return chars[char];
    });
  };

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>בקשת יצירת קשר חדשה</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f8f9fa;
          margin: 0;
          padding: 20px;
          direction: rtl;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #0E73FF 0%, #7A2BFF 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 30px;
        }
        .info-row {
          display: flex;
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          align-items: center;
        }
        .info-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0E73FF 0%, #7A2BFF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 15px;
          flex-shrink: 0;
        }
        .info-content {
          flex: 1;
        }
        .info-label {
          font-weight: bold;
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .info-value {
          font-size: 16px;
          color: #333;
          word-break: break-word;
        }
        .message-box {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        .message-label {
          font-weight: bold;
          color: #666;
          margin-bottom: 10px;
          display: block;
        }
        .message-content {
          color: #333;
          line-height: 1.6;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 14px;
          border-top: 1px solid #e9ecef;
        }
        .timestamp {
          color: #999;
          font-size: 12px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔧 בקשת יצירת קשר חדשה</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">דוקטור פיקס - שחזור קבצים</p>
        </div>
        
        <div class="content">
          <div class="info-row">
            <div class="info-icon">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div class="info-content">
              <div class="info-label">שם מלא</div>
              <div class="info-value">${sanitize(data.name)}</div>
            </div>
          </div>

          <div class="info-row">
            <div class="info-icon">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div class="info-content">
              <div class="info-label">טלפון</div>
              <div class="info-value">
                <a href="tel:${sanitize(data.phone)}" style="color: #0E73FF; text-decoration: none;">${sanitize(data.phone)}</a>
              </div>
            </div>
          </div>

          ${data.email ? `
          <div class="info-row">
            <div class="info-icon">
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div class="info-content">
              <div class="info-label">אימייל</div>
              <div class="info-value">
                <a href="mailto:${sanitize(data.email)}" style="color: #0E73FF; text-decoration: none;">${sanitize(data.email)}</a>
              </div>
            </div>
          </div>
          ` : ''}

          <div class="message-box">
            <span class="message-label">תוכן ההודעה:</span>
            <div class="message-content">${sanitize(data.message)}</div>
          </div>
        </div>

        <div class="footer">
          <p><strong>דוקטור פיקס</strong> - שירותי שחזור קבצים מקצועיים</p>
          <p>📧 doctorfix79@gmail.com | 🌐 recoverysite.netlify.app</p>
          <div class="timestamp">נשלח ב: ${currentDate}</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate plain text email
const generateEmailText = (data) => {
  const currentDate = new Date().toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
🔧 בקשת יצירת קשר חדשה - דוקטור פיקס

פרטי הפנייה:
━━━━━━━━━━━━━━━
👤 שם מלא: ${data.name}
📞 טלפון: ${data.phone}
${data.email ? `📧 אימייל: ${data.email}` : ''}

💬 תוכן ההודעה:
━━━━━━━━━━━━━━━
${data.message}

━━━━━━━━━━━━━━━
📅 נשלח ב: ${currentDate}
🌐 מקור: recoverysite.netlify.app
📧 דוקטור פיקס - שירותי שחזור קבצים מקצועיים
  `.trim();
};

// Validation functions
const validateRequired = (data) => {
  const required = ['name', 'phone', 'message'];
  const missing = required.filter(field => !data[field]?.trim());
  return missing.length === 0 ? null : `שדות חובה חסרים: ${missing.join(', ')}`;
};

const validatePhone = (phone) => {
  if (!phone) return 'מספר טלפון הוא שדה חובה';
  const phoneRegex = /^(\+972|0)([1-9]\d{8})$/;
  const cleanPhone = phone.replace(/[\s-]/g, '');
  return phoneRegex.test(cleanPhone) ? null : 'מספר טלפון לא תקין. אנא הזן מספר ישראלי תקין';
};

const validateEmail = (email) => {
  if (!email) return null; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'כתובת אימייל לא תקינה';
};

const validateMessage = (message) => {
  if (!message) return 'הודעה היא שדה חובה';
  if (message.length < 10) return 'ההודעה קצרה מדי. אנא כתב לפחות 10 תווים';
  if (message.length > 1000) return 'ההודעה ארוכה מדי (מקסימום 1000 תווים)';
  return null;
};

// Main handler function
export const handler = async (event, context) => {
  console.log(`[send-email] Received ${event.httpMethod} request from ${event.headers.origin || 'unknown origin'}`);

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log("[send-email] Responding to OPTIONS preflight request");
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.warn(`[send-email] Blocked non-POST request: ${event.httpMethod}`);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Method not allowed. Use POST.' 
      })
    };
  }

  console.log("[send-email] Processing POST request");

  try {
    // Parse request body
    let data;
    try {
      data = JSON.parse(event.body);
      console.log("[send-email] Successfully parsed request body");
    } catch (parseError) {
      console.error("[send-email] Invalid JSON in request body:", parseError.message);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON in request body' 
        })
      };
    }

    // Validate input data
    console.log("[send-email] Validating form data...");
    const requiredError = validateRequired(data);
    if (requiredError) {
      console.warn("[send-email] Validation failed:", requiredError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: requiredError })
      };
    }

    const phoneError = validatePhone(data.phone);
    if (phoneError) {
      console.warn("[send-email] Phone validation failed:", phoneError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: phoneError })
      };
    }

    const emailError = validateEmail(data.email);
    if (emailError) {
      console.warn("[send-email] Email validation failed:", emailError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: emailError })
      };
    }

    const messageError = validateMessage(data.message);
    if (messageError) {
      console.warn("[send-email] Message validation failed:", messageError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: messageError })
      };
    }

    console.log("[send-email] Validation passed");

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('[send-email] FATAL: RESEND_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Email service not configured. Please contact administrator.' 
        })
      };
    }

    const cleanName = data.name.replace(/["'`]/g, '');

    // Prepare email data
    const emailData = {
      from: `${EMAIL_CONFIG.FROM_NAME} <${EMAIL_CONFIG.FROM_EMAIL}>`,
      to: [EMAIL_CONFIG.TO_EMAIL],
      subject: `${EMAIL_CONFIG.SUBJECT} - ${cleanName}`,
      html: generateEmailHTML(data),
      text: generateEmailText(data),
      // Add reply-to if email is provided
      ...(data.email && { reply_to: data.email }),
      // Add tags for tracking
      tags: [
        { name: 'source', value: 'contact_form' },
        { name: 'type', value: 'contact_request' },
        { name: 'domain', value: 'recoverysite' }
      ]
    };

    console.log("[send-email] Sending email via Resend API...");

    // Send email using Resend
    try {
      const result = await resend.emails.send(emailData);
      console.log("[send-email] Resend API response received");

      if (result.error) {
        console.error('[send-email] Resend API error:', result.error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            error: result.error.message || 'Failed to send email'
          })
        };
      }

      // Log successful send
      console.log('[send-email] Email sent successfully:', {
        id: result.data?.id,
        to: EMAIL_CONFIG.TO_EMAIL,
        from: data.name,
        timestamp: new Date().toISOString()
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          id: result.data?.id,
          message: 'Email sent successfully'
        })
      };

    } catch (resendError) {
      console.error('[send-email] Resend API request failed:', resendError);
      
      // Handle specific Resend API errors
      let errorMessage = 'שגיאה בשליחת המייל';
      if (resendError.message?.includes('401')) {
        errorMessage = 'שגיאת אימות - API key לא תקין';
        console.error('[send-email] Invalid API key');
      } else if (resendError.message?.includes('403')) {
        errorMessage = 'הדומיין לא מאומת ב-Resend';
        console.error('[send-email] Domain not verified');
      } else if (resendError.message?.includes('429')) {
        errorMessage = 'חרגת מהמגבלה היומית. נסה שוב מאוחר יותר';
        console.error('[send-email] Rate limit exceeded');
      } else if (resendError.message?.includes('5')) {
        errorMessage = 'שגיאת שרת זמנית. נסה שוב בעוד כמה דקות';
        console.error('[send-email] Server error');
      }

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: errorMessage
        })
      };
    }

  } catch (error) {
    console.error('[send-email] Unexpected error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'שגיאה לא צפויה. נסה שוב מאוחר יותר'
      })
    };
  }
};