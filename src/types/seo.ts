// SEO Types and Interfaces

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewData {
  rating: number;
  reviewCount: number;
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
}

export interface ServiceData {
  name: string;
  description: string;
  serviceType: string;
  provider: string;
  areaServed: string[];
  offers: {
    price?: string;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
    validThrough?: string;
  };
}

export interface ArticleData {
  headline: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  wordCount?: number;
  readingTime?: string;
  category?: string;
  tags?: string[];
}

export interface LocalBusinessData {
  name: string;
  description: string;
  address: {
    street?: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  hours: Array<{
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  services: string[];
  priceRange: string;
  rating?: ReviewData;
  socialProfiles: string[];
  paymentAccepted: string[];
}

export type PageType = 'homepage' | 'service' | 'article' | 'contact' | 'about' | 'pricing' | 'process';

export type SchemaType = 
  | 'LocalBusiness'
  | 'Service' 
  | 'FAQPage'
  | 'Article'
  | 'BreadcrumbList'
  | 'AggregateRating'
  | 'ContactPoint'
  | 'WebPage'
  | 'Organization'
  | 'HowTo'
  | 'Review'
  | 'Product'
  | 'SoftwareApplication';

export interface HowToData {
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
}

export interface ProductData {
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
}

export interface ContactPointData {
  telephone: string;
  contactType: string;
  areaServed: string;
  availableLanguage: string[];
  hoursAvailable?: Array<{
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
}

export interface EnhancedSEOProps {
  // Basic SEO props
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  
  // Enhanced props
  pageType?: PageType;
  breadcrumbs?: BreadcrumbItem[];
  faqData?: FAQItem[];
  reviewData?: ReviewData;
  serviceData?: ServiceData;
  articleData?: ArticleData;
  localBusinessData?: LocalBusinessData;
  howToData?: HowToData;
  productData?: ProductData;
  contactPointData?: ContactPointData;
  
  // Performance props
  preloadResources?: string[];
  criticalCSS?: string;
  
  // Custom structured data
  customStructuredData?: Record<string, any>[];
}

export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOGImage: string;
  twitterHandle?: string;
  facebookAppId?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  yandexVerification?: string;
}