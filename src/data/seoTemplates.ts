import { SEOData } from '../hooks/useSEO';

/**
 * Templates למeta tags מותאמים לכל סוג דף
 * מבוסס על מחקר מילות המפתח ואסטרטגיית התוכן
 */

export interface SEOTemplate {
  title: string;
  description: string;
  keywords: string[];
  robots?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  jsonLd?: object[];
}

/**
 * Template לדף הבית - מילת מפתח: "שחזור קבצים"
 */
export const homePageTemplate: SEOTemplate = {
  title: "שחזור קבצים מקצועי בישראל | דוקטור פיקס - שיעור הצלחה 95%",
  description: "שירות שחזור קבצים מקצועי מרחוק עם מעל 7 שנות ניסיון. שחזור דיסקים קשיחים, כרטיסי זיכרון ונתונים דיגיטליים. הערכת מחיר חינמית!",
  keywords: [
    "שחזור קבצים",
    "שחזור נתונים", 
    "שחזור קבצים בישראל",
    "שחזור דיסק קשיח",
    "שחזור כרטיס זיכרון",
    "שירות שחזור מקצועי",
    "דוקטור פיקס"
  ],
  robots: "index,follow",
  openGraph: {
    title: "שחזור קבצים מקצועי בישראל - דוקטור פיקס",
    description: "שירות שחזור קבצים מקצועי עם שיעור הצלחה 95%. מעל 7 שנות ניסיון בשחזור נתונים מכל סוגי המכשירים.",
    image: "/images/og/homepage-og.jpg",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "שחזור קבצים מקצועי - דוקטור פיקס",
    description: "שירות שחזור נתונים מקצועי עם שיעור הצלחה 95%",
    image: "/images/twitter/homepage-twitter.jpg"
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://doctorfix.co.il/#organization",
      "name": "דוקטור פיקס - שחזור קבצים מקצועי",
      "alternateName": "Doctor Fix",
      "description": "שירותי שחזור קבצים מקצועיים מרחוק עם מעל 7 שנות ניסיון. שחזור דיסקים קשיחים, כרטיסי זיכרון ונתונים דיגיטליים.",
      "url": "https://doctorfix.co.il",
      "telephone": "+972-50-123-4567",
      "email": "doctorfix79@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IL",
        "addressRegion": "מרכז",
        "addressLocality": "תל אביב"
      },
      "areaServed": {
        "@type": "Country",
        "name": "ישראל"
      },
      "priceRange": "₪₪",
      "openingHours": "Mo-Th 09:00-18:00",
      "image": "https://doctorfix.co.il/logo-large.jpg",
      "logo": "https://doctorfix.co.il/logo.png"
    }
  ]
};

/**
 * Template לדף שחזור דיסק קשיח
 */
export const hardDriveRecoveryTemplate: SEOTemplate = {
  title: "שחזור דיסק קשיח מקצועי | תיקון HDD פגום - דוקטור פיקס",
  description: "שירות שחזור דיסק קשיח מקצועי עם שיעור הצלחה 95%. מתמחים בתיקון דיסקים קשיחים פגומים וכשלים מכניים. הערכת מחיר חינמית!",
  keywords: [
    "שחזור דיסק קשיח",
    "תיקון דיסק קשיח",
    "שחזור HDD",
    "דיסק קשיח פגום",
    "שחזור נתונים מדיסק פגום",
    "כשל דיסק קשיח",
    "תיקון כונן קשיח"
  ],
  robots: "index,follow",
  openGraph: {
    title: "שחזור דיסק קשיח מקצועי - דוקטור פיקס",
    description: "מתמחים בשחזור נתונים מדיסקים קשיחים פגומים. שיעור הצלחה 95% בכל סוגי הכשלים.",
    image: "/images/og/hard-drive-recovery-og.jpg",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "שחזור דיסק קשיח מקצועי",
    description: "שירות מקצועי לשחזור נתונים מדיסקים קשיחים פגומים",
    image: "/images/twitter/hard-drive-recovery-twitter.jpg"
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "שחזור דיסק קשיח",
      "description": "שירות שחזור מקצועי לדיסקים קשיחים פגומים עם שיעור הצלחה של 95%",
      "provider": {
        "@id": "https://doctorfix.co.il/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "ישראל"
      },
      "offers": {
        "@type": "Offer",
        "priceRange": "₪400-₪1200",
        "priceCurrency": "ILS"
      }
    }
  ]
};

/**
 * Template לדף שחזור כרטיס זיכרון
 */
export const memoryCardRecoveryTemplate: SEOTemplate = {
  title: "שחזור כרטיס זיכרון | שחזור תמונות מ-SD Card - דוקטור פיקס",
  description: "שירות שחזור כרטיס זיכרון מקצועי. מתמחים בשחזור תמונות וקבצים מכרטיסי SD, MicroSD ו-CF פגומים. שירות מהיר ואמין!",
  keywords: [
    "שחזור כרטיס זיכרון",
    "שחזור תמונות מכרטיס זיכרון",
    "שחזור SD",
    "שחזור MicroSD",
    "כרטיס זיכרון פגום",
    "שחזור תמונות מצלמה",
    "שחזור CF card"
  ],
  robots: "index,follow",
  openGraph: {
    title: "שחזור כרטיס זיכרון מקצועי - דוקטור פיקס",
    description: "שירות מקצועי לשחזור תמונות וקבצים מכרטיסי זיכרון פגומים מכל הסוגים.",
    image: "/images/og/memory-card-recovery-og.jpg",
    type: "article"
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "שחזור כרטיס זיכרון",
      "description": "שירות שחזור מקצועי לכרטיסי זיכרון פגומים מכל הסוגים",
      "provider": {
        "@id": "https://doctorfix.co.il/#organization"
      },
      "offers": {
        "@type": "Offer",
        "priceRange": "₪200-₪450",
        "priceCurrency": "ILS"
      }
    }
  ]
};

/**
 * Template לדף שחזור נתונים מרחוק
 */
export const remoteRecoveryTemplate: SEOTemplate = {
  title: "שחזור נתונים מרחוק | שירות שחזור קבצים אונליין - דוקטור פיקס",
  description: "שירות שחזור נתונים מרחוק נוח ומהיר. שחזור קבצים אונליין ללא צורך בהגעה פיזית. מאובטח ומקצועי עם תמיכה 24/6.",
  keywords: [
    "שחזור קבצים מרחוק",
    "שחזור נתונים מרחוק",
    "שירות שחזור מרחוק",
    "שחזור קבצים אונליין",
    "שחזור נתונים אונליין",
    "שירות שחזור 24/6"
  ],
  robots: "index,follow",
  openGraph: {
    title: "שחזור נתונים מרחוק - דוקטור פיקס",
    description: "שירות שחזור נתונים מרחוק נוח ומאובטח. ללא צורך בהגעה פיזית.",
    image: "/images/og/remote-recovery-og.jpg",
    type: "article"
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "שחזור נתונים מרחוק",
      "description": "שירות שחזור נתונים מרחוק מאובטח ומקצועי",
      "provider": {
        "@id": "https://doctorfix.co.il/#organization"
      },
      "offers": {
        "@type": "Offer",
        "priceRange": "₪300-₪800",
        "priceCurrency": "ILS"
      }
    }
  ]
};

/**
 * Template לדף מחירון
 */
export const pricingTemplate: SEOTemplate = {
  title: "מחיר שחזור קבצים | מחירון שקוף לשחזור נתונים - דוקטור פיקס",
  description: "מחירון שקוף לשחזור קבצים. עלות שחזור נתונים מ-₪300. הערכת מחיר חינמית לכל סוגי הדיסקים וכרטיסי הזיכרון. התקשרו עכשיו!",
  keywords: [
    "מחיר שחזור קבצים",
    "עלות שחזור נתונים",
    "מחירון שחזור",
    "כמה עולה שחזור קבצים",
    "מחיר שחזור דיסק קשיח",
    "מחיר שחזור כרטיס זיכרון"
  ],
  robots: "index,follow",
  openGraph: {
    title: "מחירון שחזור קבצים - דוקטור פיקס",
    description: "מחירון שקוף ומפורט לכל שירותי שחזור הנתונים. הערכת מחיר חינמית.",
    image: "/images/og/pricing-og.jpg",
    type: "article"
  }
};

/**
 * Template למאמרים - "איך לשחזר קבצים שנמחקו"
 */
export const howToRecoverDeletedFilesTemplate: SEOTemplate = {
  title: "איך לשחזר קבצים שנמחקו - מדריך מלא לשחזור נתונים 2024",
  description: "מדריך מפורט איך לשחזר קבצים שנמחקו בטעות. שיטות שחזור יעילות, תוכנות מומלצות וטיפים מקצועיים. כולל הוראות שלב אחר שלב.",
  keywords: [
    "איך לשחזר קבצים שנמחקו",
    "שחזור קבצים שנמחקו",
    "שחזור קבצים מהפח",
    "קבצים נמחקו בטעות",
    "מדריך שחזור קבצים",
    "תוכנות שחזור קבצים"
  ],
  robots: "index,follow",
  openGraph: {
    title: "איך לשחזר קבצים שנמחקו - מדריך מלא",
    description: "מדריך מפורט לשחזור קבצים שנמחקו עם הוראות שלב אחר שלב ותוכנות מומלצות.",
    image: "/images/og/how-to-recover-deleted-files-og.jpg",
    type: "article"
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "איך לשחזר קבצים שנמחקו",
      "description": "מדריך שלב אחר שלב לשחזור קבצים שנמחקו בטעות",
      "image": "https://doctorfix.co.il/images/how-to-recover-files.jpg",
      "step": [
        {
          "@type": "HowToStep",
          "name": "בדיקת פח המיחזור",
          "text": "בדקו תחילה את פח המיחזור במחשב"
        },
        {
          "@type": "HowToStep", 
          "name": "שימוש בתוכנת שחזור",
          "text": "השתמשו בתוכנת שחזור מקצועית"
        }
      ]
    }
  ]
};

/**
 * Template לדפים מקומיים - תל אביב
 */
export const telAvivTemplate: SEOTemplate = {
  title: "שחזור נתונים בתל אביב | שירות מקצועי במרכז - דוקטור פיקס",
  description: "שירות שחזור נתונים מקצועי בתל אביב. מתמחים בשחזור קבצים ודיסקים קשיחים באזור המרכז. שירות מהיר ואמין. התקשרו עכשיו!",
  keywords: [
    "שחזור נתונים תל אביב",
    "שחזור קבצים תל אביב",
    "שחזור דיסק קשיח תל אביב",
    "שירות שחזור במרכז",
    "שחזור נתונים במרכז"
  ],
  robots: "index,follow",
  openGraph: {
    title: "שחזור נתונים בתל אביב - דוקטור פיקס",
    description: "שירות שחזור נתונים מקצועי באזור תל אביב והמרכז. מהיר, אמין ומקצועי.",
    image: "/images/og/tel-aviv-recovery-og.jpg",
    type: "article"
  },
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "דוקטור פיקס - שחזור נתונים בתל אביב",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "תל אביב",
        "addressRegion": "מרכז",
        "addressCountry": "IL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 32.0853,
        "longitude": 34.7818
      },
      "areaServed": {
        "@type": "City",
        "name": "תל אביב"
      }
    }
  ]
};

/**
 * פונקציה ליצירת SEO data מותאם לדף ספציפי
 */
export const generateSEOData = (
  template: SEOTemplate,
  customData?: Partial<SEOData>,
  currentUrl?: string
): SEOData => {
  const baseUrl = 'https://recoverysite.netlify.app';
  const canonical = currentUrl ? `${baseUrl}${currentUrl}` : baseUrl;

  return {
    title: template.title,
    description: template.description,
    keywords: template.keywords,
    robots: template.robots || 'index,follow',
    canonical,
    author: 'דוקטור פיקס',
    openGraph: {
      title: template.openGraph?.title || template.title,
      description: template.openGraph?.description || template.description,
      image: template.openGraph?.image ? `${baseUrl}${template.openGraph.image}` : `${baseUrl}/images/og/default-og.jpg`,
      url: canonical,
      type: template.openGraph?.type || 'website',
      siteName: 'דוקטור פיקס',
      locale: 'he_IL',
      ...template.openGraph
    },
    twitter: {
      card: template.twitter?.card || 'summary_large_image',
      title: template.twitter?.title || template.title,
      description: template.twitter?.description || template.description,
      image: template.twitter?.image ? `${baseUrl}${template.twitter.image}` : `${baseUrl}/images/twitter/default-twitter.jpg`,
      creator: '@doctorfix_il',
      site: '@doctorfix_il',
      ...template.twitter
    },
    jsonLd: template.jsonLd || [],
    hreflang: {
      'he-IL': canonical,
      'x-default': canonical
    },
    ...customData
  };
};

/**
 * מפה של templates לפי route
 */
export const seoTemplateMap: { [key: string]: SEOTemplate } = {
  '/': homePageTemplate,
  '/שירותים/שחזור-דיסק-קשיח': hardDriveRecoveryTemplate,
  '/שירותים/שחזור-כרטיס-זיכרון': memoryCardRecoveryTemplate,
  '/שירותים/שחזור-נתונים-מרחוק': remoteRecoveryTemplate,
  '/מחירון-שחזור-קבצים': pricingTemplate,
  '/מאמרים/איך-לשחזר-קבצים-שנמחקו': howToRecoverDeletedFilesTemplate,
  '/אזורי-שירות/שחזור-קבצים-תל-אביב': telAvivTemplate
};

/**
 * פונקציה לקבלת template לפי route נוכחי
 */
export const getSEOTemplate = (pathname: string): SEOTemplate => {
  return seoTemplateMap[pathname] || homePageTemplate;
};