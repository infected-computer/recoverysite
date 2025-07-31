export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  error?: string;
  id?: string;
  message?: string;
}

// Send email using Netlify serverless function
export const sendContactEmail = async (data: ContactFormData): Promise<EmailResponse> => {
  console.log('[EmailService] Starting email send process with data:', { 
    name: data.name, 
    phone: data.phone?.slice(0, 3) + '***', 
    email: data.email ? data.email.split('@')[0] + '@***' : 'none',
    messageLength: data.message?.length 
  });

  try {
    // Clean and validate data
    const cleanData = {
      name: data.name?.trim() || '',
      phone: data.phone?.trim() || '',
      email: data.email?.trim() || '',
      message: data.message?.trim() || ''
    };

    // Basic validation
    if (!cleanData.name || !cleanData.phone || !cleanData.message) {
      const missingFields = [];
      if (!cleanData.name) missingFields.push('שם');
      if (!cleanData.phone) missingFields.push('טלפון');
      if (!cleanData.message) missingFields.push('הודעה');
      
      console.error('[EmailService] Missing required fields:', missingFields);
      return {
        success: false,
        error: `שדות חובה חסרים: ${missingFields.join(', ')}`
      };
    }

    if (cleanData.message.length < 5) {
      console.error('[EmailService] Message too short');
      return {
        success: false,
        error: 'ההודעה קצרה מדי'
      };
    }

    console.log('[EmailService] Validation passed, sending to Netlify function...');

    // Try different URL formats for the API call
    const apiUrl = '/.netlify/functions/send-email';
    console.log('[EmailService] Using API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(cleanData)
    });

    console.log('[EmailService] Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    // Try to parse response
    let result;
    try {
      const responseText = await response.text();
      console.log('[EmailService] Raw response:', responseText);
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[EmailService] Failed to parse response:', parseError);
      throw new Error('תגובה לא תקינה מהשרת');
    }

    if (!response.ok) {
      console.error('[EmailService] API error:', result);
      return {
        success: false,
        error: result?.error || `שגיאת שרת (${response.status})`
      };
    }

    console.log('[EmailService] Email sent successfully:', result);
    return {
      success: true,
      id: result.id,
      message: result.message || 'הודעה נשלחה בהצלחה'
    };

  } catch (error) {
    console.error('[EmailService] Unexpected error:', error);
    
    // Provide specific error messages based on error type
    let errorMessage = 'שגיאה בשליחת ההודעה';
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = 'בעיית חיבור. בדוק את החיבור לאינטרנט';
    } else if (error.message?.includes('404')) {
      errorMessage = 'שירות המייל אינו זמין כרגע';
    } else if (error.message?.includes('500')) {
      errorMessage = 'שגיאת שרת פנימית';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Fallback to WhatsApp when email fails
export const sendToWhatsApp = (data: ContactFormData): void => {
  const message = `שלום! שמי ${data.name}
טלפון: ${data.phone}
${data.email ? `אימייל: ${data.email}` : ''}
הודעה: ${data.message}`;
  
  const whatsappUrl = `https://wa.me/972536657279?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};''