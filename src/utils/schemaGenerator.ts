import { 
  FAQItem, 
  ServiceData, 
  LocalBusinessData
} from '../types/seo';

export class SchemaGenerator {
  private siteUrl: string;

  constructor(siteUrl: string) {
    this.siteUrl = siteUrl;
  }

  generateLocalBusiness(data: LocalBusinessData): Record<string, any> {
    return {
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
        }
      ],
      "openingHours": [
        "Mo-Th 09:00-18:00",
        "Fr 09:00-14:00"
      ]
    };
  }

  generateService(data: ServiceData): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.name,
      "description": data.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "דוקטור פיקס - שחזור קבצים"
      },
      "serviceType": data.category,
      "offers": {
        "@type": "Offer",
        "price": data.pricing?.from?.toString() || "100",
        "priceCurrency": "ILS"
      }
    };
  }

  generateFAQ(faqData: FAQItem[]): Record<string, any> {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }

  generateMultipleSchemas(schemas: Record<string, any>[]): string {
    return JSON.stringify(schemas, null, 2);
  }
}