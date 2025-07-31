export interface BusinessInfo {
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  areaServed: string[];
}

export interface ServiceInfo {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
  category: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export interface PersonInfo {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  worksFor: string;
  knowsAbout: string[];
  alumniOf?: string[];
}

export interface FAQInfo {
  question: string;
  answer: string;
}

export class StructuredDataManager {
  private static baseUrl = 'https://recoverysite.netlify.app';

  static createLocalBusiness(business: BusinessInfo): object {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${this.baseUrl}/#business`,
      "name": business.name,
      "description": business.description,
      "url": business.url,
      "logo": business.logo,
      "image": business.image,
      "telephone": business.telephone,
      "email": business.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address.streetAddress,
        "addressLocality": business.address.addressLocality,
        "postalCode": business.address.postalCode,
        "addressCountry": business.address.addressCountry
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": business.geo.latitude,
        "longitude": business.geo.longitude
      },
      "openingHours": business.openingHours,
      "priceRange": business.priceRange,
      "areaServed": business.areaServed.map(area => ({
        "@type": "City",
        "name": area
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "שירותי שחזור קבצים",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "שחזור קבצים מרחוק",
              "description": "שירות שחזור קבצים מקצועי מרחוק ללא הגעה פיזית"
            }
          }
        ]
      }
    };
  }

  static createService(service: ServiceInfo): object {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.name,
      "description": service.description,
      "provider": {
        "@type": "LocalBusiness",
        "@id": `${this.baseUrl}/#business`
      },
      "areaServed": service.areaServed.map(area => ({
        "@type": "City",
        "name": area
      })),
      "serviceType": service.serviceType,
      "category": service.category
    };

    if (service.offers) {
      schema.offers = {
        "@type": "Offer",
        "price": service.offers.price,
        "priceCurrency": service.offers.priceCurrency,
        "availability": service.offers.availability
      };
    }

    return schema;
  }

  static createPerson(person: PersonInfo): object {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": person.name,
      "jobTitle": person.jobTitle,
      "description": person.description,
      "worksFor": {
        "@type": "LocalBusiness",
        "@id": `${this.baseUrl}/#business`
      },
      "knowsAbout": person.knowsAbout
    };

    if (person.image) {
      schema.image = person.image;
    }

    if (person.url) {
      schema.url = person.url;
    }

    if (person.sameAs && person.sameAs.length > 0) {
      schema.sameAs = person.sameAs;
    }

    if (person.alumniOf && person.alumniOf.length > 0) {
      schema.alumniOf = person.alumniOf.map(school => ({
        "@type": "EducationalOrganization",
        "name": school
      }));
    }

    return schema;
  }

  static createFAQPage(faqs: FAQInfo[]): object {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  static createBreadcrumbList(items: Array<{ name: string; url: string }>): object {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  static validateSchema(schema: object): boolean {
    try {
      // Basic validation - check for required @context and @type
      const schemaObj = schema as any;
      return schemaObj["@context"] && schemaObj["@type"];
    } catch (error) {
      console.error('Schema validation error:', error);
      return false;
    }
  }

  static getBusinessData(): BusinessInfo {
    return {
      name: "שחזור קבצים מקצועי",
      description: "שירותי שחזור קבצים מקצועיים מרחוק. מעל 7 שנות ניסיון, בדיקה חינמית, תשלום רק לאחר הצלחה.",
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      image: `${this.baseUrl}/og-image.jpg`,
      telephone: "+972-50-123-4567",
      email: "info@recoverysite.co.il",
      address: {
        streetAddress: "רחוב הטכנולוגיה 1",
        addressLocality: "תל אביב",
        postalCode: "12345",
        addressCountry: "IL"
      },
      geo: {
        latitude: 32.0853,
        longitude: 34.7818
      },
      openingHours: [
        "Mo-Th 09:00-18:00",
        "Fr 09:00-14:00",
        "Su 09:00-18:00"
      ],
      priceRange: "₪₪",
      areaServed: ["תל אביב", "ירושלים", "חיפה", "באר שבע", "כל הארץ"]
    };
  }
}