/**
 * מערכת Structured Data מתקדמת לאתר שחזור קבצים
 * כולל כל סוגי ה-Schema הנדרשים לSEO מתקדם
 */

export interface StructuredDataConfig {
  type: string;
  data: any;
  context?: string;
}

/**
 * LocalBusiness Schema - עסק מקומי
 */
export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://recoverysite.netlify.app/#organization",
  "name": "דוקטור פיקס - שחזור קבצים מקצועי",
  "alternateName": "Doctor Fix",
  "description": "שירותי שחזור קבצים מקצועיים מרחוק עם מעל 7 שנות ניסיון. שחזור דיסקים קשיחים, כרטיסי זיכרון ונתונים דיגיטליים.",
  "url": "https://recoverysite.netlify.app",
  "telephone": "+972-50-123-4567",
  "email": "doctorfix79@gmail.com",
  "foundingDate": "2017",
  "founder": {
    "@type": "Person",
    "name": "דוקטור פיקס",
    "jobTitle": "מומחה שחזור נתונים"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IL",
    "addressRegion": "מרכז",
    "addressLocality": "תל אביב",
    "postalCode": "6789012"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 32.0853,
    "longitude": 34.7818
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "ישראל"
    },
    {
      "@type": "State",
      "name": "מרכז"
    },
    {
      "@type": "City",
      "name": "תל אביב"
    },
    {
      "@type": "City",
      "name": "ירושלים"
    },
    {
      "@type": "City",
      "name": "חיפה"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 32.0853,
      "longitude": 34.7818
    },
    "geoRadius": "200000"
  },
  "priceRange": "₪₪",
  "currenciesAccepted": "ILS",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "PayPal"],
  "openingHours": [
    "Mo-Th 09:00-18:00",
    "Su 10:00-16:00"
  ],
  "specialOpeningHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Friday",
    "opens": "09:00",
    "closes": "14:00"
  },
  "image": [
    "https://recoverysite.netlify.app/images/business/office-1.jpg",
    "https://recoverysite.netlify.app/images/business/equipment-1.jpg",
    "https://recoverysite.netlify.app/images/business/team-1.jpg"
  ],
  "logo": {
    "@type": "ImageObject",
    "url": "https://recoverysite.netlify.app/logo.png",
    "width": 200,
    "height": 200
  },
  "sameAs": [
    "https://www.facebook.com/doctorfix",
    "https://wa.me/972501234567",
    "https://www.linkedin.com/company/doctorfix"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+972-50-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Hebrew", "English"],
      "areaServed": "IL"
    },
    {
      "@type": "ContactPoint",
      "email": "doctorfix79@gmail.com",
      "contactType": "technical support",
      "availableLanguage": "Hebrew"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "שירותי שחזור נתונים",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "שחזור דיסק קשיח",
          "description": "שירות שחזור מקצועי לדיסקים קשיחים פגומים"
        },
        "price": "400-1200",
        "priceCurrency": "ILS"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "שחזור כרטיס זיכרון",
          "description": "שירות שחזור לכרטיסי זיכרון פגומים"
        },
        "price": "200-450",
        "priceCurrency": "ILS"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "יוסי כהן"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "שירות מעולה! שיחזרו לי את כל התמונות מהחתונה אחרי שהדיסק התקלקל. מקצועיים ומהירים.",
      "datePublished": "2024-01-15"
    }
  ]
});

/**
 * Service Schema - שירות ספציפי
 */
export const createServiceSchema = (serviceConfig: {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
  category?: string;
  duration?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceConfig.name,
  "description": serviceConfig.description,
  "url": serviceConfig.url,
  "category": serviceConfig.category || "Data Recovery Service",
  "provider": {
    "@id": "https://recoverysite.netlify.app/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "ישראל"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": serviceConfig.url,
    "serviceSmsNumber": "+972-50-123-4567",
    "servicePhone": "+972-50-123-4567"
  },
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "offers": serviceConfig.priceRange ? {
    "@type": "Offer",
    "priceRange": serviceConfig.priceRange,
    "priceCurrency": "ILS",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01",
    "priceValidUntil": "2024-12-31"
  } : undefined,
  "serviceType": "Data Recovery",
  "serviceOutput": "Recovered Data Files",
  "duration": serviceConfig.duration || "P1DT12H"
});

/**
 * FAQ Schema - שאלות נפוצות
 */
export const createFAQSchema = (faqItems: Array<{
  question: string;
  answer: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});

/**
 * Article Schema - מאמר
 */
export const createArticleSchema = (articleConfig: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  wordCount?: number;
  readingTime?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": articleConfig.headline,
  "description": articleConfig.description,
  "url": articleConfig.url,
  "image": articleConfig.image ? {
    "@type": "ImageObject",
    "url": articleConfig.image,
    "width": 1200,
    "height": 630
  } : undefined,
  "author": {
    "@type": "Person",
    "name": articleConfig.author || "דוקטור פיקס",
    "url": "https://recoverysite.netlify.app/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "דוקטור פיקס",
    "logo": {
      "@type": "ImageObject",
      "url": "https://recoverysite.netlify.app/logo.png",
      "width": 200,
      "height": 200
    }
  },
  "datePublished": articleConfig.publishedDate,
  "dateModified": articleConfig.modifiedDate || articleConfig.publishedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": articleConfig.url
  },
  "wordCount": articleConfig.wordCount,
  "timeRequired": articleConfig.readingTime ? `PT${articleConfig.readingTime}M` : undefined,
  "inLanguage": "he-IL",
  "about": {
    "@type": "Thing",
    "name": "שחזור נתונים",
    "description": "שירותי שחזור קבצים ונתונים דיגיטליים"
  }
});

/**
 * HowTo Schema - מדריך
 */
export const createHowToSchema = (howToConfig: {
  name: string;
  description: string;
  url: string;
  image?: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howToConfig.name,
  "description": howToConfig.description,
  "url": howToConfig.url,
  "image": howToConfig.image ? {
    "@type": "ImageObject",
    "url": howToConfig.image
  } : undefined,
  "totalTime": howToConfig.totalTime || "PT30M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "ILS",
    "value": "0"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "מחשב"
    },
    {
      "@type": "HowToSupply", 
      "name": "תוכנת שחזור"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "תוכנת שחזור קבצים"
    }
  ],
  "step": howToConfig.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image ? {
      "@type": "ImageObject",
      "url": step.image
    } : undefined,
    "url": step.url
  }))
});

/**
 * Breadcrumb Schema - נתיב ניווט
 */
export const createBreadcrumbSchema = (breadcrumbs: Array<{
  name: string;
  url?: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url ? crumb.url : undefined
  }))
});

/**
 * Review Schema - ביקורת
 */
export const createReviewSchema = (reviewConfig: {
  itemName: string;
  reviewBody: string;
  ratingValue: number;
  authorName: string;
  datePublished: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": reviewConfig.itemName,
    "@id": "https://recoverysite.netlify.app/#organization"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": reviewConfig.ratingValue,
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": reviewConfig.authorName
  },
  "reviewBody": reviewConfig.reviewBody,
  "datePublished": reviewConfig.datePublished,
  "publisher": {
    "@type": "Organization",
    "name": "דוקטור פיקס"
  }
});

/**
 * WebSite Schema - אתר אינטרנט
 */
export const createWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://recoverysite.netlify.app/#website",
  "url": "https://recoverysite.netlify.app",
  "name": "דוקטור פיקס - שחזור קבצים מקצועי",
  "description": "שירותי שחזור קבצים מקצועיים בישראל. מתמחים בשחזור דיסקים קשיחים, כרטיסי זיכרון ונתונים דיגיטליים.",
  "publisher": {
    "@id": "https://recoverysite.netlify.app/#organization"
  },
  "inLanguage": "he-IL",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://recoverysite.netlify.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

/**
 * Organization Schema - ארגון
 */
export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://recoverysite.netlify.app/#organization",
  "name": "דוקטור פיקס",
  "alternateName": "Doctor Fix",
  "url": "https://recoverysite.netlify.app",
  "logo": {
    "@type": "ImageObject",
    "url": "https://recoverysite.netlify.app/logo.png",
    "width": 200,
    "height": 200
  },
  "description": "מומחים בשחזור קבצים ונתונים דיגיטליים עם מעל 7 שנות ניסיון",
  "foundingDate": "2017",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "3-5"
  },
  "knowsAbout": [
    "שחזור נתונים",
    "שחזור דיסק קשיח",
    "שחזור כרטיס זיכרון",
    "תיקון מחשבים",
    "שירותי IT"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "איגוד טכנאי המחשבים בישראל"
  }
});

/**
 * Product Schema - מוצר/שירות
 */
export const createProductSchema = (productConfig: {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": productConfig.name,
  "description": productConfig.description,
  "image": productConfig.image,
  "brand": {
    "@type": "Brand",
    "name": productConfig.brand || "דוקטור פיקס"
  },
  "offers": {
    "@type": "Offer",
    "price": productConfig.offers.price,
    "priceCurrency": productConfig.offers.priceCurrency,
    "availability": productConfig.offers.availability,
    "seller": {
      "@id": "https://recoverysite.netlify.app/#organization"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
});

/**
 * Event Schema - אירוע
 */
export const createEventSchema = (eventConfig: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  organizer?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": eventConfig.name,
  "description": eventConfig.description,
  "startDate": eventConfig.startDate,
  "endDate": eventConfig.endDate,
  "location": {
    "@type": "Place",
    "name": eventConfig.location,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IL"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": eventConfig.organizer || "דוקטור פיקס",
    "@id": "https://recoverysite.netlify.app/#organization"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "ILS",
    "availability": "https://schema.org/InStock"
  }
});

/**
 * פונקציות עזר ליצירת Structured Data מותאם
 */

// שירותי שחזור ספציפיים
export const hardDriveRecoveryService = createServiceSchema({
  name: "שחזור דיסק קשיח",
  description: "שירות שחזור מקצועי לדיסקים קשיחים פגומים עם שיעור הצלחה של 95%",
  url: "https://recoverysite.netlify.app/שירותים/שחזור-דיסק-קשיח",
  priceRange: "₪400-₪1200",
  category: "Hard Drive Data Recovery",
  duration: "P1DT24H"
});

export const memoryCardRecoveryService = createServiceSchema({
  name: "שחזור כרטיס זיכרון",
  description: "שירות שחזור מקצועי לכרטיסי זיכרון פגומים מכל הסוגים",
  url: "https://recoverysite.netlify.app/שירותים/שחזור-כרטיס-זיכרון",
  priceRange: "₪200-₪450",
  category: "Memory Card Data Recovery",
  duration: "PT12H"
});

export const remoteRecoveryService = createServiceSchema({
  name: "שחזור נתונים מרחוק",
  description: "שירות שחזור נתונים מרחוק מאובטח ומקצועי",
  url: "https://recoverysite.netlify.app/שירותים/שחזור-נתונים-מרחוק",
  priceRange: "₪300-₪800",
  category: "Remote Data Recovery",
  duration: "PT6H"
});

// FAQ נפוצות
export const commonFAQs = createFAQSchema([
  {
    question: "כמה עולה שחזור קבצים?",
    answer: "מחיר שחזור קבצים נע בין ₪300 ל-₪1200 בהתאם לסוג הנזק ומורכבות השחזור. אנו מציעים הערכת מחיר חינמית לכל לקוח."
  },
  {
    question: "כמה זמן לוקח שחזור קבצים?",
    answer: "תהליך שחזור קבצים לוקח בדרך כלל 24-72 שעות, בהתאם למורכבות המקרה וכמות הנתונים."
  },
  {
    question: "האם אפשר לשחזר קבצים שנמחקו?",
    answer: "כן, ברוב המקרים ניתן לשחזר קבצים שנמחקו, במיוחד אם לא נכתבו נתונים חדשים על הדיסק."
  },
  {
    question: "איך עובד שירות השחזור מרחוק?",
    answer: "שירות השחזור מרחוק מתבצע באמצעות חיבור מאובטח למחשב שלכם, כך שאנו יכולים לבצע את תהליך השחזור ללא צורך בהגעה פיזית."
  },
  {
    question: "האם השירות מאובטח?",
    answer: "כן, אנו משתמשים בפרוטוקולי אבטחה מתקדמים ומתחייבים לשמירה מלאה על פרטיות הנתונים שלכם."
  }
]);

// מדריך שחזור קבצים
export const howToRecoverFilesGuide = createHowToSchema({
  name: "איך לשחזר קבצים שנמחקו",
  description: "מדריך שלב אחר שלב לשחזור קבצים שנמחקו בטעות",
  url: "https://recoverysite.netlify.app/מאמרים/איך-לשחזר-קבצים-שנמחקו",
  image: "https://recoverysite.netlify.app/images/guides/how-to-recover-files.jpg",
  totalTime: "PT30M",
  steps: [
    {
      name: "בדיקת פח המיחזור",
      text: "בדקו תחילה את פח המיחזור במחשב - לעיתים הקבצים עדיין נמצאים שם",
      image: "https://recoverysite.netlify.app/images/guides/step1-recycle-bin.jpg"
    },
    {
      name: "הפסקת שימוש במחשב",
      text: "הפסיקו מיד להשתמש במחשב כדי למנוע כתיבה על הקבצים הנמחקים",
      image: "https://recoverysite.netlify.app/images/guides/step2-stop-using.jpg"
    },
    {
      name: "הורדת תוכנת שחזור",
      text: "הורידו תוכנת שחזור מקצועית כמו Recuva או PhotoRec",
      image: "https://recoverysite.netlify.app/images/guides/step3-download-software.jpg"
    },
    {
      name: "הרצת תהליך השחזור",
      text: "הריצו את תוכנת השחזור ובחרו את הכונן שממנו נמחקו הקבצים",
      image: "https://recoverysite.netlify.app/images/guides/step4-run-recovery.jpg"
    }
  ]
});

/**
 * פונקציה ליצירת כל ה-Structured Data לדף ספציפי
 */
export const generatePageStructuredData = (pageType: string, pageData?: any): any[] => {
  const baseSchemas = [
    createWebSiteSchema(),
    createOrganizationSchema(),
    createLocalBusinessSchema()
  ];

  switch (pageType) {
    case 'homepage':
      return baseSchemas;
    
    case 'service-hard-drive':
      return [...baseSchemas, hardDriveRecoveryService];
    
    case 'service-memory-card':
      return [...baseSchemas, memoryCardRecoveryService];
    
    case 'service-remote':
      return [...baseSchemas, remoteRecoveryService];
    
    case 'faq':
      return [...baseSchemas, commonFAQs];
    
    case 'article':
      if (pageData) {
        return [...baseSchemas, createArticleSchema(pageData)];
      }
      return baseSchemas;
    
    case 'howto':
      return [...baseSchemas, howToRecoverFilesGuide];
    
    default:
      return baseSchemas;
  }
};