import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';
import { SchemaGenerator } from '../utils/schemaGenerator';
import { seoConfig, defaultLocalBusinessData } from '../config/seo';
import { FAQItem, ServiceData, LocalBusinessData } from '../types/seo';

interface SimpleSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  faqData?: FAQItem[];
  serviceData?: ServiceData;
  localBusinessData?: LocalBusinessData;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  faqData,
  serviceData,
  localBusinessData
}: SimpleSEOProps) => {
  
  // Use defaults from config if not provided
  const finalTitle = title || seoConfig.defaultTitle;
  const finalDescription = description || seoConfig.defaultDescription;
  const finalKeywords = keywords || seoConfig.defaultKeywords.join(', ');
  const finalOGImage = ogImage || seoConfig.defaultOGImage;
  
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : seoConfig.siteUrl);
  
  // Initialize schema generator
  const schemaGenerator = useMemo(() => new SchemaGenerator(seoConfig.siteUrl), []);
  
  // Generate simplified structured data
  const structuredData = useMemo(() => {
    const schemas: Record<string, any>[] = [];
    
    // Add LocalBusiness schema
    const businessData = localBusinessData || defaultLocalBusinessData;
    schemas.push(schemaGenerator.generateLocalBusiness(businessData));
    
    // Add Service schema if provided
    if (serviceData) {
      schemas.push(schemaGenerator.generateService(serviceData));
    }
    
    // Add FAQ schema if provided
    if (faqData && faqData.length > 0) {
      schemas.push(schemaGenerator.generateFAQ(faqData));
    }
    
    return schemaGenerator.generateMultipleSchemas(schemas);
  }, [schemaGenerator, localBusinessData, serviceData, faqData]);

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={finalOGImage} />
      <meta property="og:site_name" content="דוקטור פיקס - שחזור קבצים" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOGImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {structuredData}
      </script>
    </Helmet>
  );
};

export default SEO;