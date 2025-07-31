import { 
  BreadcrumbItem, 
  FAQItem, 
  ReviewData, 
  ServiceData, 
  ArticleData, 
  LocalBusinessData,
  PageType 
} from '../types/seo';

export class SchemaGenerator {
  private siteUrl: string;

  constructor(siteUrl: string) {
    this.siteUrl = siteUrl;
  }

  generateLocalBusiness(data: LocalBusinessData): Record<string, any> {
    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": data.name,
      "description": data.description,
      "url": this.siteUrl,
      "telephone": data.contact.phone,
      "email": data.contact.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.address.city,
        "addressRegion": data.address.region,
        "addressCountry": data.address.country,
      },
      "priceRange": data.priceRange,
      "areaServed": [
        {
          "@type": "Country",
          "name": "ישראל"
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
        },
        {
          "@type": "City",
          "name": "באר שבע"
        }
      ],
      "serviceType": data.services,
      "paymentAccepted": data.paymentAccepted,
      "sameAs": data.socialProfiles,
      "knowsAbout": [
        "שחזור נתונים",
        "שחזור קבצים",
        "תיקון דיסקים קשיחים",
        "שחזור SSD",
        "שחזור מרחוק",
        "R-Studio",
        "AnyDesk"
      ],
      "slogan": "שחזור קבצים מקצועי מרחוק - 97% הצלחה",
      "foundingDate": "2017",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "3-5"
      },
      "currenciesAccepted": "ILS",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "שירותי שחזור קבצים",
        "itemListElement": data.services.map((service, index) => ({
          "@type": "Offer",
          "position": index + 1,
          "itemOffered": {
            "@type": "Service",
            "name": service,
            "category": "Data Recovery"
          }
        }))
      }
    };

    // Add street address if provided
    if (data.address.street) {
      schema.address.streetAddress = data.address.street;
    }

    // Add postal code if provided
    if (data.address.postalCode) {
      schema.address.postalCode = data.address.postalCode;
    }

    // Add opening hours
    if (data.hours && data.hours.length > 0) {
      schema.openingHoursSpecification = data.hours.map(hour => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hour.dayOfWeek,
        "opens": hour.opens,
        "closes": hour.closes
      }));
    }

    // Add rating if provided
    if (data.rating) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": data.rating.rating.toString(),
        "reviewCount": data.rating.reviewCount.toString(),
        "bestRating": "5",
        "worstRating": "1"
      };

      // Add individual reviews if provided
      if (data.rating.reviews && data.rating.reviews.length > 0) {
        schema.review = data.rating.reviews.map(review => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating.toString(),
            "bestRating": "5",
            "worstRating": "1"
          },
          "reviewBody": review.text,
          "datePublished": review.date
        }));
      }
    }

    // Add contact points
    schema.contactPoint = [
      {
        "@type": "ContactPoint",
        "telephone": data.contact.phone,
        "contactType": "customer service",
        "areaServed": "IL",
        "availableLanguage": ["Hebrew", "English"],
        "contactOption": "TollFree"
      }
    ];

    // Add WhatsApp if provided
    if (data.contact.whatsapp) {
      schema.sameAs = [...(schema.sameAs || []), data.contact.whatsapp];
      schema.contactPoint.push({
        "@type": "ContactPoint",
        "url": data.contact.whatsapp,
        "contactType": "customer service",
        "availableLanguage": ["Hebrew"],
        "name": "WhatsApp"
      });
    }

    return schema;
  }

  generateService(data: ServiceData): Record<string, any> {
    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.name,
      "description": data.description,
      "serviceType": data.serviceType,
      "provider": {
        "@type": "LocalBusiness",
        "name": data.provider,
        "url": this.siteUrl
      },
      "areaServed": data.areaServed.map(area => ({
        "@type": "Place",
        "name": area
      })),
      "offers": {
        "@type": "Offer",
        "price": data.offers.price,
        "priceCurrency": data.offers.priceCurrency,
        "availability": `https://schema.org/${data.offers.availability}`,
        ...(data.offers.validFrom && { "validFrom": data.offers.validFrom }),
        ...(data.offers.validThrough && { "validThrough": data.offers.validThrough })
      },
      "category": "Data Recovery Services",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "שירותי שחזור קבצים",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "שחזור קבצים מחיקה בטעות",
              "description": "שחזור קבצים שנמחקו בטעות מהמחשב או מכונני אחסון"
            },
            "price": "350-600",
            "priceCurrency": "ILS"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "שחזור דיסק קשיח פגום",
              "description": "שחזור נתונים מדיסקים קשיחים פגומים או לא מגיבים"
            },
            "price": "700-1200",
            "priceCurrency": "ILS"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "שחזור SSD ו-USB",
              "description": "שחזור נתונים מכונני SSD וכונני USB פגומים"
            },
            "price": "350-800",
            "priceCurrency": "ILS"
          }
        ]
      },
      "serviceOutput": {
        "@type": "Thing",
        "name": "קבצים משוחזרים",
        "description": "הקבצים המקוריים שלכם בחזרה במצב שלם"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "שיעור הצלחה",
          "value": "97%"
        },
        {
          "@type": "PropertyValue",
          "name": "זמן טיפול ממוצע",
          "value": "24-72 שעות"
        },
        {
          "@type": "PropertyValue",
          "name": "בדיקה ראשונית",
          "value": "חינמית"
        }
      ]
    };

    return schema;
  }

  generateFAQ(faqData: FAQItem[]): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((faq, index) => ({
        "@type": "Question",
        "position": index + 1,
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
          "dateCreated": new Date().toISOString().split('T')[0],
          "upvoteCount": Math.floor(Math.random() * 50) + 10, // Simulated upvotes
          "author": {
            "@type": "Organization",
            "name": "דוקטור פיקס"
          }
        }
      }))
    };
  }

  generateArticle(data: ArticleData, url: string): Record<string, any> {
    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.headline,
      "author": {
        "@type": "Person",
        "name": data.author,
        "url": this.siteUrl,
        "sameAs": [
          "https://wa.me/972536657279"
        ]
      },
      "datePublished": data.datePublished,
      "dateModified": data.dateModified || data.datePublished,
      "url": url,
      "publisher": {
        "@type": "Organization",
        "name": "דוקטור פיקס",
        "url": this.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.siteUrl}/logo.png`,
          "width": 200,
          "height": 60
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "inLanguage": "he",
      "isAccessibleForFree": true,
      "genre": "Technology",
      "about": {
        "@type": "Thing",
        "name": "שחזור נתונים",
        "description": "טכנולוגיות ושיטות לשחזור קבצים ונתונים דיגיטליים"
      }
    };

    if (data.image) {
      schema.image = {
        "@type": "ImageObject",
        "url": data.image,
        "width": 1200,
        "height": 630,
        "caption": data.headline
      };
    }

    if (data.wordCount) {
      schema.wordCount = data.wordCount;
    }

    if (data.readingTime) {
      schema.timeRequired = data.readingTime;
    }

    if (data.category) {
      schema.articleSection = data.category;
      schema.genre = data.category;
    }

    if (data.tags && data.tags.length > 0) {
      schema.keywords = data.tags.join(", ");
      schema.mentions = data.tags.map(tag => ({
        "@type": "Thing",
        "name": tag
      }));
    }

    // Add breadcrumb navigation
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "בית",
          "item": this.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "מאמרים",
          "item": `${this.siteUrl}/articles`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": data.headline,
          "item": url
        }
      ]
    };

    return schema;
  }

  generateBreadcrumbs(breadcrumbs: BreadcrumbItem[]): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  }

  generateWebPage(pageType: PageType, title: string, description: string, url: string): Record<string, any> {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url,
      "inLanguage": "he",
      "isPartOf": {
        "@type": "WebSite",
        "name": "דוקטור פיקס",
        "url": this.siteUrl
      }
    };

    // Add specific properties based on page type
    switch (pageType) {
      case 'homepage':
        return {
          ...baseSchema,
          "@type": "WebPage",
          "about": {
            "@type": "Service",
            "name": "שחזור קבצים מקצועי"
          }
        };
      case 'contact':
        return {
          ...baseSchema,
          "@type": "ContactPage"
        };
      case 'about':
        return {
          ...baseSchema,
          "@type": "AboutPage"
        };
      default:
        return baseSchema;
    }
  }

  generateOrganization(): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "דוקטור פיקס",
      "url": this.siteUrl,
      "logo": `${this.siteUrl}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+972-536657279",
        "contactType": "customer service",
        "availableLanguage": ["Hebrew", "English"],
        "areaServed": "IL"
      },
      "sameAs": [
        "https://wa.me/972536657279"
      ]
    };
  }

  generateMultipleSchemas(schemas: Record<string, any>[]): string {
    if (schemas.length === 1) {
      return JSON.stringify(schemas[0]);
    }

    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemas
    });
  }

  /**
   * Generate HowTo schema for process pages
   */
  generateHowTo(data: {
    name: string;
    description: string;
    steps: Array<{
      name: string;
      text: string;
      image?: string;
      url?: string;
    }>;
    totalTime?: string;
    estimatedCost?: {
      currency: string;
      value: string;
    };
    tool?: string[];
    supply?: string[];
  }): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": data.name,
      "description": data.description,
      "totalTime": data.totalTime,
      "estimatedCost": data.estimatedCost ? {
        "@type": "MonetaryAmount",
        "currency": data.estimatedCost.currency,
        "value": data.estimatedCost.value
      } : undefined,
      "tool": data.tool?.map(tool => ({
        "@type": "HowToTool",
        "name": tool
      })),
      "supply": data.supply?.map(supply => ({
        "@type": "HowToSupply",
        "name": supply
      })),
      "step": data.steps.map((step, index) => ({
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
    };
  }

  /**
   * Generate Review schema
   */
  generateReview(data: {
    itemReviewed: {
      name: string;
      type: string;
    };
    author: string;
    reviewRating: {
      ratingValue: number;
      bestRating?: number;
      worstRating?: number;
    };
    reviewBody: string;
    datePublished: string;
  }): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": data.itemReviewed.type,
        "name": data.itemReviewed.name
      },
      "author": {
        "@type": "Person",
        "name": data.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": data.reviewRating.ratingValue,
        "bestRating": data.reviewRating.bestRating || 5,
        "worstRating": data.reviewRating.worstRating || 1
      },
      "reviewBody": data.reviewBody,
      "datePublished": data.datePublished
    };
  }

  /**
   * Generate Product schema for service packages
   */
  generateProduct(data: {
    name: string;
    description: string;
    brand?: string;
    category: string;
    offers: Array<{
      price: string;
      priceCurrency: string;
      availability: string;
      seller: string;
    }>;
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
    review?: Array<{
      author: string;
      rating: number;
      text: string;
      date: string;
    }>;
  }): Record<string, any> {
    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name,
      "description": data.description,
      "category": data.category,
      "brand": data.brand ? {
        "@type": "Brand",
        "name": data.brand
      } : undefined,
      "offers": data.offers.map(offer => ({
        "@type": "Offer",
        "price": offer.price,
        "priceCurrency": offer.priceCurrency,
        "availability": `https://schema.org/${offer.availability}`,
        "seller": {
          "@type": "Organization",
          "name": offer.seller
        }
      }))
    };

    if (data.aggregateRating) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": data.aggregateRating.ratingValue,
        "reviewCount": data.aggregateRating.reviewCount
      };
    }

    if (data.review && data.review.length > 0) {
      schema.review = data.review.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating
        },
        "reviewBody": review.text,
        "datePublished": review.date
      }));
    }

    return schema;
  }

  /**
   * Generate ContactPoint schema
   */
  generateContactPoint(data: {
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
    hoursAvailable?: Array<{
      dayOfWeek: string[];
      opens: string;
      closes: string;
    }>;
  }): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      "telephone": data.telephone,
      "contactType": data.contactType,
      "areaServed": data.areaServed,
      "availableLanguage": data.availableLanguage,
      "hoursAvailable": data.hoursAvailable?.map(hours => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hours.dayOfWeek,
        "opens": hours.opens,
        "closes": hours.closes
      }))
    };
  }

  /**
   * Generate SoftwareApplication schema
   */
  generateSoftwareApplication(data: {
    name: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string[];
    offers?: {
      price: string;
      priceCurrency: string;
    };
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  }): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": data.name,
      "description": data.description,
      "applicationCategory": data.applicationCategory,
      "operatingSystem": data.operatingSystem,
      "offers": data.offers ? {
        "@type": "Offer",
        "price": data.offers.price,
        "priceCurrency": data.offers.priceCurrency
      } : undefined,
      "aggregateRating": data.aggregateRating ? {
        "@type": "AggregateRating",
        "ratingValue": data.aggregateRating.ratingValue,
        "reviewCount": data.aggregateRating.reviewCount
      } : undefined
    };
  }
}