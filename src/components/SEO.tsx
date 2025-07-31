import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';
import { EnhancedSEOProps } from '../types/seo';
import { SchemaGenerator } from '../utils/schemaGenerator';
import { seoConfig, defaultLocalBusinessData } from '../config/seo';

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  pageType = 'homepage',
  breadcrumbs,
  faqData,
  reviewData,
  serviceData,
  articleData,
  localBusinessData,
  howToData,
  productData,
  contactPointData,
  preloadResources = [],
  criticalCSS,
  customStructuredData = []
}: EnhancedSEOProps) => {
  
  // Use defaults from config if not provided
  const finalTitle = title || seoConfig.defaultTitle;
  const finalDescription = description || seoConfig.defaultDescription;
  const finalKeywords = keywords || seoConfig.defaultKeywords.join(', ');
  const finalOGImage = ogImage || seoConfig.defaultOGImage;
  
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : seoConfig.siteUrl);
  
  // Initialize schema generator
  const schemaGenerator = useMemo(() => new SchemaGenerator(seoConfig.siteUrl), []);
  
  // Generate structured data based on page type and provided data
  const structuredData = useMemo(() => {
    const schemas: Record<string, any>[] = [];
    
    // Always include Organization schema
    schemas.push(schemaGenerator.generateOrganization());
    
    // Add WebPage schema
    schemas.push(schemaGenerator.generateWebPage(pageType, finalTitle, finalDescription, currentUrl));
    
    // Add LocalBusiness schema (enhanced with provided data or defaults)
    const businessData = localBusinessData || defaultLocalBusinessData;
    if (reviewData) {
      businessData.rating = reviewData;
    }
    schemas.push(schemaGenerator.generateLocalBusiness(businessData));
    
    // Add Service schema if provided
    if (serviceData) {
      schemas.push(schemaGenerator.generateService(serviceData));
    }
    
    // Add Article schema if provided
    if (articleData) {
      schemas.push(schemaGenerator.generateArticle(articleData, currentUrl));
    }
    
    // Add FAQ schema if provided
    if (faqData && faqData.length > 0) {
      schemas.push(schemaGenerator.generateFAQ(faqData));
    }
    
    // Add HowTo schema if provided
    if (howToData) {
      schemas.push(schemaGenerator.generateHowTo(howToData));
    }
    
    // Add Product schema if provided
    if (productData) {
      schemas.push(schemaGenerator.generateProduct(productData));
    }
    
    // Add ContactPoint schema if provided
    if (contactPointData) {
      schemas.push(schemaGenerator.generateContactPoint(contactPointData));
    }
    
    // Add Breadcrumbs schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(schemaGenerator.generateBreadcrumbs(breadcrumbs));
    }
    
    // Add custom structured data
    if (customStructuredData.length > 0) {
      schemas.push(...customStructuredData);
    }
    
    return schemaGenerator.generateMultipleSchemas(schemas);
  }, [
    schemaGenerator, 
    pageType, 
    finalTitle, 
    finalDescription, 
    currentUrl, 
    localBusinessData, 
    reviewData, 
    serviceData, 
    articleData, 
    faqData, 
    howToData,
    productData,
    contactPointData,
    breadcrumbs, 
    customStructuredData
  ]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={currentUrl} />
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
      )}
      
      {/* Hebrew Language */}
      <html lang="he" dir="rtl" />
      
      {/* Site Verification */}
      {seoConfig.googleSiteVerification && (
        <meta name="google-site-verification" content={seoConfig.googleSiteVerification} />
      )}
      {seoConfig.bingSiteVerification && (
        <meta name="msvalidate.01" content={seoConfig.bingSiteVerification} />
      )}
      {seoConfig.yandexVerification && (
        <meta name="yandex-verification" content={seoConfig.yandexVerification} />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:site_name" content={seoConfig.siteName} />
      {seoConfig.facebookAppId && (
        <meta property="fb:app_id" content={seoConfig.facebookAppId} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOGImage} />
      <meta name="twitter:image:alt" content={finalTitle} />
      {seoConfig.twitterHandle && (
        <meta name="twitter:site" content={seoConfig.twitterHandle} />
      )}
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Apple */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="דוקטור פיקס" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Microsoft */}
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Performance Optimization */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload Critical Resources */}
      {preloadResources.map((resource, index) => (
        <link key={index} rel="preload" href={resource} as="script" />
      ))}
      
      {/* Critical CSS */}
      {criticalCSS && (
        <style type="text/css" dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      )}
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="author" content="דוקטור פיקס" />
      <meta name="publisher" content="דוקטור פיקס" />
      <meta name="copyright" content="© 2024 דוקטור פיקס. כל הזכויות שמורות." />
      <meta name="language" content="Hebrew" />
      <meta name="geo.region" content="IL" />
      <meta name="geo.placename" content="ישראל" />
      
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </Helmet>
  );
};

// Export both the component and the props interface for easier usage
export default SEO;
export type { EnhancedSEOProps };
