import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generatePageStructuredData } from '../../data/structuredData';

interface StructuredDataProps {
  /** סוג הדף לקביעת ה-Schema המתאים */
  pageType?: string;
  /** נתונים נוספים לדף (למאמרים, שירותים וכו') */
  pageData?: any;
  /** Schema מותאם ידנית */
  customSchemas?: any[];
  /** האם להוסיף schemas בסיסיים אוטומטית */
  includeBaseSchemas?: boolean;
}

/**
 * רכיב לניהול Structured Data (JSON-LD) מתקדם
 * מוסיף אוטומטית את כל ה-Schema הנדרש לכל סוג דף
 */
export const StructuredData: React.FC<StructuredDataProps> = ({
  pageType,
  pageData,
  customSchemas = [],
  includeBaseSchemas = true
}) => {
  const location = useLocation();

  useEffect(() => {
    // הסרת schemas קיימים
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    // קביעת סוג הדף אוטומטית אם לא סופק
    const autoPageType = pageType || getPageTypeFromPath(location.pathname);
    
    // יצירת schemas
    let schemas: any[] = [];
    
    if (includeBaseSchemas) {
      schemas = generatePageStructuredData(autoPageType, pageData);
    }
    
    // הוספת schemas מותאמים
    schemas = [...schemas, ...customSchemas];

    // הוספת schemas לראש הדף
    schemas.forEach(schema => {
      if (schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
      }
    });

    // ניקוי בעת unmount
    return () => {
      const schemasToRemove = document.querySelectorAll('script[type="application/ld+json"]');
      schemasToRemove.forEach(script => script.remove());
    };
  }, [pageType, pageData, customSchemas, includeBaseSchemas, location.pathname]);

  return null;
};

/**
 * פונקציה לקביעת סוג הדף לפי נתיב
 */
const getPageTypeFromPath = (pathname: string): string => {
  if (pathname === '/') return 'homepage';
  if (pathname.includes('/שירותים/שחזור-דיסק-קשיח')) return 'service-hard-drive';
  if (pathname.includes('/שירותים/שחזור-כרטיס-זיכרון')) return 'service-memory-card';
  if (pathname.includes('/שירותים/שחזור-נתונים-מרחוק')) return 'service-remote';
  if (pathname.includes('/שאלות-נפוצות')) return 'faq';
  if (pathname.includes('/מאמרים/')) return 'article';
  if (pathname.includes('/איך-לשחזר')) return 'howto';
  if (pathname.includes('/אזורי-שירות/')) return 'local';
  return 'default';
};

/**
 * רכיב StructuredData מותאם לדף הבית
 */
export const HomePageStructuredData: React.FC = () => {
  return <StructuredData pageType="homepage" />;
};

/**
 * רכיב StructuredData מותאם לדפי שירות
 */
interface ServiceStructuredDataProps {
  serviceType: 'hard-drive' | 'memory-card' | 'remote' | 'ssd' | 'raid';
  serviceName?: string;
  description?: string;
  priceRange?: string;
}

export const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({
  serviceType,
  serviceName,
  description,
  priceRange
}) => {
  const pageType = `service-${serviceType}`;
  const pageData = serviceName ? {
    name: serviceName,
    description,
    priceRange
  } : undefined;

  return <StructuredData pageType={pageType} pageData={pageData} />;
};

/**
 * רכיב StructuredData מותאם למאמרים
 */
interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  image?: string;
  wordCount?: number;
  readingTime?: number;
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  headline,
  description,
  author,
  publishedDate,
  modifiedDate,
  image,
  wordCount,
  readingTime
}) => {
  const location = useLocation();
  const baseUrl = 'https://doctorfix.co.il';
  
  const articleData = {
    headline,
    description,
    url: `${baseUrl}${location.pathname}`,
    author,
    publishedDate,
    modifiedDate,
    image: image ? `${baseUrl}${image}` : undefined,
    wordCount,
    readingTime
  };

  return <StructuredData pageType="article" pageData={articleData} />;
};

/**
 * רכיב StructuredData מותאם לדפי FAQ
 */
interface FAQStructuredDataProps {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({
  faqItems
}) => {
  const faqSchema = {
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
  };

  return <StructuredData customSchemas={[faqSchema]} />;
};

/**
 * רכיב StructuredData מותאם למדריכים (HowTo)
 */
interface HowToStructuredDataProps {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  supplies?: string[];
  tools?: string[];
}

export const HowToStructuredData: React.FC<HowToStructuredDataProps> = ({
  name,
  description,
  totalTime,
  steps,
  supplies = [],
  tools = []
}) => {
  const location = useLocation();
  const baseUrl = 'https://doctorfix.co.il';

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "url": `${baseUrl}${location.pathname}`,
    "totalTime": totalTime || "PT30M",
    "supply": supplies.map(supply => ({
      "@type": "HowToSupply",
      "name": supply
    })),
    "tool": tools.map(tool => ({
      "@type": "HowToTool",
      "name": tool
    })),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image ? {
        "@type": "ImageObject",
        "url": `${baseUrl}${step.image}`
      } : undefined
    }))
  };

  return <StructuredData customSchemas={[howToSchema]} />;
};

/**
 * רכיב StructuredData מותאם לביקורות
 */
interface ReviewStructuredDataProps {
  reviews: Array<{
    author: string;
    rating: number;
    reviewText: string;
    date: string;
  }>;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export const ReviewStructuredData: React.FC<ReviewStructuredDataProps> = ({
  reviews,
  aggregateRating
}) => {
  const reviewSchemas = reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "דוקטור פיקס",
      "@id": "https://doctorfix.co.il/#organization"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewText,
    "datePublished": review.date
  }));

  // הוספת AggregateRating אם סופק
  if (aggregateRating) {
    const aggregateSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://doctorfix.co.il/#organization",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": "5"
      }
    };
    reviewSchemas.push(aggregateSchema);
  }

  return <StructuredData customSchemas={reviewSchemas} />;
};

/**
 * רכיב StructuredData מותאם לדפים מקומיים
 */
interface LocalStructuredDataProps {
  cityName: string;
  serviceName: string;
  description: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export const LocalStructuredData: React.FC<LocalStructuredDataProps> = ({
  cityName,
  serviceName,
  description,
  coordinates
}) => {
  const location = useLocation();
  const baseUrl = 'https://doctorfix.co.il';

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `דוקטור פיקס - ${serviceName} ב${cityName}`,
    "description": description,
    "url": `${baseUrl}${location.pathname}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": "IL"
    },
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "parentOrganization": {
      "@id": "https://doctorfix.co.il/#organization"
    }
  };

  if (coordinates) {
    localSchema["geo"] = {
      "@type": "GeoCoordinates",
      "latitude": coordinates.latitude,
      "longitude": coordinates.longitude
    };
  }

  return <StructuredData customSchemas={[localSchema]} />;
};

/**
 * רכיב StructuredData מותאם לנתיב ניווט (Breadcrumb)
 */
interface BreadcrumbStructuredDataProps {
  breadcrumbs: Array<{
    name: string;
    url?: string;
  }>;
}

export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({
  breadcrumbs
}) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url ? crumb.url : undefined
    }))
  };

  return <StructuredData customSchemas={[breadcrumbSchema]} includeBaseSchemas={false} />;
};

/**
 * רכיב StructuredData מותאם לאירועים
 */
interface EventStructuredDataProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  isOnline?: boolean;
  price?: string;
}

export const EventStructuredData: React.FC<EventStructuredDataProps> = ({
  name,
  description,
  startDate,
  endDate,
  location,
  isOnline = false,
  price = "0"
}) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "eventAttendanceMode": isOnline 
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    "location": isOnline ? {
      "@type": "VirtualLocation",
      "url": "https://doctorfix.co.il"
    } : {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IL"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "דוקטור פיקס",
      "@id": "https://doctorfix.co.il/#organization"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "ILS",
      "availability": "https://schema.org/InStock"
    }
  };

  return <StructuredData customSchemas={[eventSchema]} />;
};