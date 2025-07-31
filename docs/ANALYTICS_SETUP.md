# Google Analytics Setup Guide

## התקנה והגדרה

Google Analytics הותקן בהצלחה באתר עם התכונות הבאות:

### 🎯 תכונות מותקנות

1. **Google Analytics 4 (GA4)** - Tracking ID: `G-82L3JHL449`
2. **Privacy Compliance** - תואם GDPR ו-CCPA
3. **Cookie Consent Banner** - באנר הסכמה לעוגיות
4. **Automatic Page Tracking** - מעקב אוטומטי אחרי דפים
5. **Custom Event Tracking** - מעקב אחרי פעולות מותאמות
6. **Form Analytics** - מעקב אחרי טפסים
7. **User Interaction Tracking** - מעקב אחרי לחיצות ופעולות

### 📊 Events שנעקבים אוטומטית

#### Contact Events
- `whatsapp_click` - לחיצה על כפתורי WhatsApp
- `phone_click` - לחיצה על מספרי טלפון
- `email_click` - לחיצה על כתובות מייל

#### Form Events
- `form_start` - התחלת מילוי טופס
- `form_step` - מעבר בין שלבי טופס
- `form_submit_success` - שליחת טופס מוצלחת
- `form_submit_error` - שגיאה בשליחת טופס
- `form_error` - שגיאות validation

#### Engagement Events
- `scroll` - עומק גלילה (25%, 50%, 75%, 90%, 100%)
- `time_on_page` - זמן שהייה בדף
- `click` - לחיצות על כפתורים
- `service_view` - צפייה בדפי שירותים
- `download` - הורדת קבצים
- `external_link` - לחיצה על קישורים חיצוניים

#### Pricing Events
- `pricing_view` - צפייה בדף מחירון
- `pricing_interaction` - אינטראקציה עם מחירון

### 🔧 קבצים שנוצרו/עודכנו

```
src/
├── components/
│   ├── analytics/
│   │   └── GoogleAnalytics.tsx          # רכיב Google Analytics
│   └── privacy/
│       └── CookieConsent.tsx            # באנר הסכמה לעוגיות
├── hooks/
│   └── useAnalytics.ts                  # Hooks לניהול Analytics
├── config/
│   └── analytics.ts                     # קונפיגורציה של Analytics
└── App.tsx                              # עודכן עם Analytics
```

### 🚀 איך להשתמש

#### 1. מעקב אחרי Events מותאמים

```typescript
import { useInteractionTracking } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { trackClick, trackWhatsApp, trackDownload } = useInteractionTracking();
  
  const handleButtonClick = () => {
    trackClick('my_button', 'header');
    // Your button logic here
  };
  
  const handleWhatsAppClick = () => {
    trackWhatsApp('footer');
    // Open WhatsApp
  };
  
  const handleDownload = () => {
    trackDownload('brochure', 'pdf');
    // Download logic
  };
};
```

#### 2. מעקב אחרי טפסים

```typescript
import { useFormTracking } from '@/hooks/useAnalytics';

const MyForm = () => {
  const { trackFormStart, trackFormSubmit, trackFormError } = useFormTracking('contact_form');
  
  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      trackFormSubmit(true);
    } catch (error) {
      trackFormSubmit(false);
      trackFormError('submission_failed');
    }
  };
};
```

#### 3. מעקב אוטומטי בדפים

```typescript
import { useAnalytics, useScrollTracking, useTimeTracking } from '@/hooks/useAnalytics';

const MyPage = () => {
  const analytics = useAnalytics();
  useScrollTracking(); // מעקב אחרי גלילה
  useTimeTracking();   // מעקב אחרי זמן שהייה
  
  // מעקב מותאם
  useEffect(() => {
    analytics.trackServiceView('my_service');
  }, []);
};
```

### 🔒 Privacy & GDPR Compliance

#### תכונות פרטיות מובנות:
- **IP Anonymization** - כתובות IP מוסתרות
- **No Ad Personalization** - ללא התאמה אישית של פרסומות
- **Cookie Consent** - באנר הסכמה לעוגיות
- **Opt-out Option** - אפשרות לביטול מעקב
- **Data Retention** - שמירת נתונים למשך 2 שנים בלבד

#### ניהול הסכמות:
```typescript
import { optInToAnalytics, optOutOfAnalytics } from '@/config/analytics';

// אישור מעקב
optInToAnalytics();

// ביטול מעקב
optOutOfAnalytics();
```

### 🎛️ הגדרות Environment

```env
# .env.local
VITE_ENABLE_ANALYTICS=true          # הפעלה ב-development
VITE_ANALYTICS_DEBUG=true           # מצב debug
```

### 📈 דוחות ב-Google Analytics

#### דוחות מומלצים לבדיקה:
1. **Realtime** - תנועה בזמן אמת
2. **Acquisition** - מקורות תנועה
3. **Engagement** - התנהגות משתמשים
4. **Events** - פעולות מותאמות
5. **Conversions** - המרות (טפסים, לחיצות WhatsApp)

#### Custom Events לבדיקה:
- חפש `whatsapp_click` - לחיצות WhatsApp
- חפש `form_submit_success` - שליחות טפסים
- חפש `service_view` - צפיות בשירותים
- חפש `scroll` - עומק גלילה

### 🔍 Debug ו-Testing

#### בדיקה ב-Development:
1. פתח Developer Tools
2. לך ל-Console
3. חפש הודעות: `Google Analytics initialized`
4. בדוק ש-`window.gtag` קיים

#### בדיקה ב-Production:
1. השתמש ב-Google Analytics Debugger Extension
2. בדוק ב-Network tab שהקריאות נשלחות
3. בדוק ב-Realtime reports ב-GA4

### 🚨 Troubleshooting

#### בעיות נפוצות:
1. **Analytics לא עובד ב-development** - הגדר `VITE_ENABLE_ANALYTICS=true`
2. **Events לא מגיעים** - בדוק שה-tracking ID נכון
3. **Cookie banner לא מופיע** - נקה localStorage
4. **Debug messages לא מופיעים** - הגדר `VITE_ANALYTICS_DEBUG=true`

#### פקודות בדיקה:
```javascript
// בדיקה ב-Console
console.log(window.gtag); // צריך להיות function
console.log(window.dataLayer); // צריך להיות array

// שליחת event ידני לבדיקה
gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'manual_test'
});
```

### 📞 תמיכה

אם יש בעיות עם ה-Analytics:
1. בדוק את ה-Console לשגיאות
2. ודא שה-tracking ID נכון
3. בדוק שהאתר נטען ב-HTTPS
4. ודא שאין Ad Blockers שחוסמים

---

**הערה:** Google Analytics יעבוד רק ב-production או כאשר `VITE_ENABLE_ANALYTICS=true` מוגדר ב-environment variables.