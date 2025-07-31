import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSEO, SEOData } from '../../hooks/useSEO';
import { getSEOTemplate, generateSEOData } from '../../data/seoTemplates';

interface SEOHeadProps {
  /** נתוני SEO מותאמים אישית (אופציונלי) */
  customSEO?: Partial<SEOData>;
  /** האם להשתמש ב-template אוטומטי לפי route */
  useAutoTemplate?: boolean;
  /** נתוני SEO מלאים (דורס את ה-template) */
  seoData?: SEOData;
}

/**
 * רכיב SEO מתקדם שמנהל את כל ה-meta tags בראש הדף
 * תומך ב-templates אוטומטיים לפי route ובהתאמה אישית
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  customSEO,
  useAutoTemplate = true,
  seoData
}) => {
  const location = useLocation();
  
  // קבלת נתוני SEO סופיים
  const finalSEOData = React.useMemo(() => {
    if (seoData) {
      return seoData;
    }

    if (useAutoTemplate) {
      const template = getSEOTemplate(location.pathname);
      return generateSEOData(template, customSEO, location.pathname);
    }

    // fallback לדף הבית אם אין template
    const homeTemplate = getSEOTemplate('/');
    return generateSEOData(homeTemplate, customSEO, location.pathname);
  }, [location.pathname, customSEO, useAutoTemplate, seoData]);

  // שימוש ב-hook לעדכון ה-meta tags
  useSEO(finalSEOData);

  // הרכיב לא מרנדר כלום - הוא רק מעדכן את ה-head
  return null;
};

/**
 * רכיב SEO פשוט לדפים עם נתונים בסיסיים
 */
interface SimpleSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

export const SimpleSEO: React.FC<SimpleSEOProps> = ({
  title,
  description,
  keywords = [],
  image
}) => {
  const location = useLocation();
  const baseUrl = 'https://doctorfix.co.il';
  
  const seoData: SEOData = {
    title,
    description,
    keywords,
    canonical: `${baseUrl}${location.pathname}`,
    robots: 'index,follow',
    author: 'דוקטור פיקס',
    openGraph: {
      title,
      description,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/images/og/default-og.jpg`,
      url: `${baseUrl}${location.pathname}`,
      type: 'website',
      siteName: 'דוקטור פיקס',
      locale: 'he_IL'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/images/twitter/default-twitter.jpg`,
      creator: '@doctorfix_il',
      site: '@doctorfix_il'
    },
    hreflang: {
      'he-IL': `${baseUrl}${location.pathname}`,
      'x-default': `${baseUrl}${location.pathname}`
    }
  };

  return <SEOHead seoData={seoData} useAutoTemplate={false} />;
};

/**
 * רכיב SEO למאמרים עם structured data מתקדם
 */
interface ArticleSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  readingTime?: number;
}

export const ArticleSEO: React.FC<ArticleSEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  author = 'דוקטור פיקס',
  publishedDate,
  modifiedDate,
  readingTime
}) => {
  const location = useLocation();
  const baseUrl = 'https://doctorfix.co.il';
  
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image ? `${baseUrl}${image}` : `${baseUrl}/images/og/default-og.jpg`,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "דוקטור פיקס",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}${location.pathname}`
    }
  };

  if (readingTime) {
    articleJsonLd["timeRequired"] = `PT${readingTime}M`;
  }

  const seoData: SEOData = {
    title,
    description,
    keywords,
    canonical: `${baseUrl}${location.pathname}`,
    robots: 'index,follow',
    author,
    openGraph: {
      title,
      description,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/images/og/default-og.jpg`,
      url: `${baseUrl}${location.pathname}`,
      type: 'article',
      siteName: 'דוקטור פיקס',
      locale: 'he_IL'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/images/twitter/default-twitter.jpg`,
      creator: '@doctorfix_il',
      site: '@doctorfix_il'
    },
    jsonLd: [articleJsonLd],
    hreflang: {
      'he-IL': `${baseUrl}${location.pathname}`,
      'x-default': `${baseUrl}${location.pathname}`
    }
  };

  return <SEOHead seoData={seoData} useAutoTemplate={false} />;
};

/**
 * רכיב SEO לדפי שירות עם structured data מתקדם
 */
interface ServiceSEOProps {
  serviceName: string;
  description: string;
  keywords?: string[];
  image?: string;
  priceRange?: string;
  areaServed?: string;
}

export const ServiceSEO: React.FC<ServiceSEOProps> = ({
  serviceName,
  description,
  keywords = [],
  image,
  priceRange,
  areaServed = "ישראל"
}) => {
  const location = useLocation();
  const baseUrl = 'https://doctorfix.co.il';
  
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}${location.pathname}`,
      "serviceSmsNumber": "+972-50-123-4567"
    }
  };

  if (priceRange) {
    serviceJsonLd["offers"] = {
      "@type": "Offer",
      "priceRange": priceRange,
      "priceCurrency": "ILS"
    };
  }

  const title = `${serviceName} מקצועי | דוקטור פיקס`;
  
  const seoData: SEOData = {
    title,
    description,
    keywords,
    canonical: `${baseUrl}${location.pathname}`,
    robots: 'index,follow',
    author: 'דוקטור פיקס',
    openGraph: {
      title,
      description,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/images/og/default-og.jpg`,
      url: `${baseUrl}${location.pathname}`,
      type: 'website',
      siteName: 'דוקטור פיקס',
      locale: 'he_IL'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/images/twitter/default-twitter.jpg`,
      creator: '@doctorfix_il',
      site: '@doctorfix_il'
    },
    jsonLd: [serviceJsonLd],
    hreflang: {
      'he-IL': `${baseUrl}${location.pathname}`,
      'x-default': `${baseUrl}${location.pathname}`
    }
  };

  return <SEOHead seoData={seoData} useAutoTemplate={false} />;
};