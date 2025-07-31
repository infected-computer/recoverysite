import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  author?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
    site?: string;
  };
  jsonLd?: object[];
  hreflang?: { [key: string]: string };
}

/**
 * Hook לניהול Meta Tags דינמי
 * מאפשר עדכון של כל ה-meta tags בראש הדף
 */
export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // עדכון Title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // עדכון Meta Description
    updateMetaTag('name', 'description', seoData.description);

    // עדכון Keywords
    if (seoData.keywords && seoData.keywords.length > 0) {
      updateMetaTag('name', 'keywords', seoData.keywords.join(', '));
    }

    // עדכון Robots
    updateMetaTag('name', 'robots', seoData.robots || 'index,follow');

    // עדכון Author
    if (seoData.author) {
      updateMetaTag('name', 'author', seoData.author);
    }

    // עדכון Canonical
    if (seoData.canonical) {
      updateLinkTag('canonical', seoData.canonical);
    }

    // עדכון Open Graph
    if (seoData.openGraph) {
      updateOpenGraphTags(seoData.openGraph);
    }

    // עדכון Twitter Cards
    if (seoData.twitter) {
      updateTwitterTags(seoData.twitter);
    }

    // עדכון Hreflang
    if (seoData.hreflang) {
      updateHreflangTags(seoData.hreflang);
    }

    // עדכון JSON-LD
    if (seoData.jsonLd && seoData.jsonLd.length > 0) {
      updateJsonLdTags(seoData.jsonLd);
    }

    // ניקוי בעת unmount
    return () => {
      // ניקוי JSON-LD tags
      const existingJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
      existingJsonLd.forEach(script => script.remove());
    };
  }, [seoData]);
};

/**
 * עדכון meta tag כללי
 */
const updateMetaTag = (attribute: string, value: string, content: string) => {
  if (!content) return;

  let tag = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('content', content);
};

/**
 * עדכון link tag (canonical, hreflang)
 */
const updateLinkTag = (rel: string, href: string) => {
  if (!href) return;

  let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('href', href);
};

/**
 * עדכון Open Graph tags
 */
const updateOpenGraphTags = (og: NonNullable<SEOData['openGraph']>) => {
  const ogTags = {
    'og:title': og.title,
    'og:description': og.description,
    'og:image': og.image,
    'og:url': og.url,
    'og:type': og.type || 'website',
    'og:site_name': og.siteName || 'דוקטור פיקס',
    'og:locale': og.locale || 'he_IL'
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    if (content) {
      updateMetaTag('property', property, content);
    }
  });
};

/**
 * עדכון Twitter Card tags
 */
const updateTwitterTags = (twitter: NonNullable<SEOData['twitter']>) => {
  const twitterTags = {
    'twitter:card': twitter.card || 'summary_large_image',
    'twitter:title': twitter.title,
    'twitter:description': twitter.description,
    'twitter:image': twitter.image,
    'twitter:creator': twitter.creator,
    'twitter:site': twitter.site
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    if (content) {
      updateMetaTag('name', name, content);
    }
  });
};

/**
 * עדכון Hreflang tags
 */
const updateHreflangTags = (hreflang: { [key: string]: string }) => {
  // הסרת hreflang tags קיימים
  const existingHreflang = document.querySelectorAll('link[hreflang]');
  existingHreflang.forEach(tag => tag.remove());

  // הוספת hreflang tags חדשים
  Object.entries(hreflang).forEach(([lang, url]) => {
    const tag = document.createElement('link');
    tag.setAttribute('rel', 'alternate');
    tag.setAttribute('hreflang', lang);
    tag.setAttribute('href', url);
    document.head.appendChild(tag);
  });
};

/**
 * עדכון JSON-LD structured data
 */
const updateJsonLdTags = (jsonLdArray: object[]) => {
  // הסרת JSON-LD tags קיימים
  const existingJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  existingJsonLd.forEach(script => script.remove());

  // הוספת JSON-LD tags חדשים
  jsonLdArray.forEach(jsonLd => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  });
};

/**
 * Hook לקבלת meta tags נוכחיים (לצורכי debug)
 */
export const useCurrentSEO = () => {
  const getCurrentSEO = (): Partial<SEOData> => {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content')?.split(', ') || [];
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    
    return {
      title,
      description,
      keywords,
      canonical
    };
  };

  return { getCurrentSEO };
};

/**
 * Hook לניהול breadcrumbs
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = window.location.pathname;
  
  // מפת breadcrumbs לפי נתיבים
  const breadcrumbMap: { [key: string]: BreadcrumbItem[] } = {
    '/': [
      { name: 'דף הבית', url: '/' }
    ],
    '/about': [
      { name: 'דף הבית', url: '/' },
      { name: 'מי אנחנו', url: '/about' }
    ],
    '/pricing': [
      { name: 'דף הבית', url: '/' },
      { name: 'מחירון', url: '/pricing' }
    ],
    '/process': [
      { name: 'דף הבית', url: '/' },
      { name: 'תהליך העבודה', url: '/process' }
    ],
    '/contact': [
      { name: 'דף הבית', url: '/' },
      { name: 'יצירת קשר', url: '/contact' }
    ],
    '/articles': [
      { name: 'דף הבית', url: '/' },
      { name: 'מאמרים', url: '/articles' }
    ]
  };

  // ברירת מחדל אם הנתיב לא נמצא
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { name: 'דף הבית', url: '/' },
    { name: 'דף', url: pathname }
  ];

  return breadcrumbMap[pathname] || defaultBreadcrumbs;
};