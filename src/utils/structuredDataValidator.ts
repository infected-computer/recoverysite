/**
 * כלים לבדיקה ואימות של Structured Data
 * מוודא שה-Schema תקין ומותאם לדרישות Google
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface SchemaValidationConfig {
  checkRequiredFields: boolean;
  checkImageSizes: boolean;
  checkUrls: boolean;
  checkDates: boolean;
  strictMode: boolean;
}

/**
 * מחלקה לאימות Structured Data
 */
export class StructuredDataValidator {
  private config: SchemaValidationConfig;

  constructor(config: Partial<SchemaValidationConfig> = {}) {
    this.config = {
      checkRequiredFields: true,
      checkImageSizes: true,
      checkUrls: true,
      checkDates: true,
      strictMode: false,
      ...config
    };
  }

  /**
   * אימות Schema כללי
   */
  validateSchema(schema: any): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: []
    };

    // בדיקות בסיסיות
    this.validateBasicStructure(schema, result);
    
    // בדיקות ספציפיות לפי סוג Schema
    switch (schema['@type']) {
      case 'LocalBusiness':
        this.validateLocalBusiness(schema, result);
        break;
      case 'Service':
        this.validateService(schema, result);
        break;
      case 'Article':
        this.validateArticle(schema, result);
        break;
      case 'FAQPage':
        this.validateFAQPage(schema, result);
        break;
      case 'HowTo':
        this.validateHowTo(schema, result);
        break;
      case 'Review':
        this.validateReview(schema, result);
        break;
      case 'BreadcrumbList':
        this.validateBreadcrumbList(schema, result);
        break;
      case 'Event':
        this.validateEvent(schema, result);
        break;
      case 'Product':
        this.validateProduct(schema, result);
        break;
      default:
        result.warnings.push(`סוג Schema לא מוכר: ${schema['@type']}`);
    }

    result.isValid = result.errors.length === 0;
    return result;
  }

  /**
   * בדיקת מבנה בסיסי
   */
  private validateBasicStructure(schema: any, result: ValidationResult): void {
    // בדיקת @context
    if (!schema['@context']) {
      result.errors.push('@context חסר');
    } else if (schema['@context'] !== 'https://schema.org') {
      result.warnings.push('@context צריך להיות https://schema.org');
    }

    // בדיקת @type
    if (!schema['@type']) {
      result.errors.push('@type חסר');
    }

    // בדיקת name (אם קיים)
    if (schema.name && typeof schema.name !== 'string') {
      result.errors.push('name צריך להיות מחרוזת');
    }

    // בדיקת description (אם קיים)
    if (schema.description && typeof schema.description !== 'string') {
      result.errors.push('description צריך להיות מחרוזת');
    }

    // בדיקת URL (אם קיים)
    if (this.config.checkUrls && schema.url) {
      if (!this.isValidUrl(schema.url)) {
        result.errors.push(`URL לא תקין: ${schema.url}`);
      }
    }
  }

  /**
   * אימות LocalBusiness Schema
   */
  private validateLocalBusiness(schema: any, result: ValidationResult): void {
    const requiredFields = ['name', 'address', 'telephone'];
    
    if (this.config.checkRequiredFields) {
      requiredFields.forEach(field => {
        if (!schema[field]) {
          result.errors.push(`שדה חובה חסר ב-LocalBusiness: ${field}`);
        }
      });
    }

    // בדיקת address
    if (schema.address) {
      if (!schema.address['@type'] || schema.address['@type'] !== 'PostalAddress') {
        result.warnings.push('address צריך להיות מסוג PostalAddress');
      }
      
      if (!schema.address.addressCountry) {
        result.warnings.push('addressCountry חסר בכתובת');
      }
    }

    // בדיקת geo coordinates
    if (schema.geo) {
      if (!schema.geo.latitude || !schema.geo.longitude) {
        result.warnings.push('קואורדינטות גיאוגרפיות לא מלאות');
      }
    }

    // בדיקת שעות פתיחה
    if (schema.openingHours) {
      if (!Array.isArray(schema.openingHours)) {
        result.warnings.push('openingHours צריך להיות מערך');
      }
    }

    // בדיקת aggregateRating
    if (schema.aggregateRating) {
      this.validateAggregateRating(schema.aggregateRating, result);
    }
  }

  /**
   * אימות Service Schema
   */
  private validateService(schema: any, result: ValidationResult): void {
    const requiredFields = ['name', 'description', 'provider'];
    
    if (this.config.checkRequiredFields) {
      requiredFields.forEach(field => {
        if (!schema[field]) {
          result.errors.push(`שדה חובה חסר ב-Service: ${field}`);
        }
      });
    }

    // בדיקת provider
    if (schema.provider && !schema.provider['@id']) {
      result.warnings.push('provider צריך להכיל @id');
    }

    // בדיקת offers
    if (schema.offers) {
      this.validateOffer(schema.offers, result);
    }

    // בדיקת areaServed
    if (!schema.areaServed) {
      result.suggestions.push('מומלץ להוסיף areaServed לשירות');
    }
  }

  /**
   * אימות Article Schema
   */
  private validateArticle(schema: any, result: ValidationResult): void {
    const requiredFields = ['headline', 'author', 'publisher', 'datePublished'];
    
    if (this.config.checkRequiredFields) {
      requiredFields.forEach(field => {
        if (!schema[field]) {
          result.errors.push(`שדה חובה חסר ב-Article: ${field}`);
        }
      });
    }

    // בדיקת תאריכים
    if (this.config.checkDates) {
      if (schema.datePublished && !this.isValidDate(schema.datePublished)) {
        result.errors.push(`datePublished לא תקין: ${schema.datePublished}`);
      }
      
      if (schema.dateModified && !this.isValidDate(schema.dateModified)) {
        result.errors.push(`dateModified לא תקין: ${schema.dateModified}`);
      }
    }

    // בדיקת תמונה
    if (this.config.checkImageSizes && schema.image) {
      this.validateImage(schema.image, result, 'Article');
    }

    // בדיקת author
    if (schema.author && !schema.author.name) {
      result.warnings.push('author צריך להכיל name');
    }

    // בדיקת publisher
    if (schema.publisher && !schema.publisher.logo) {
      result.warnings.push('publisher צריך להכיל logo');
    }
  }

  /**
   * אימות FAQPage Schema
   */
  private validateFAQPage(schema: any, result: ValidationResult): void {
    if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
      result.errors.push('FAQPage צריך להכיל mainEntity כמערך');
      return;
    }

    if (schema.mainEntity.length === 0) {
      result.warnings.push('FAQPage ריק - אין שאלות');
    }

    schema.mainEntity.forEach((question: any, index: number) => {
      if (!question.name) {
        result.errors.push(`שאלה ${index + 1}: חסר name`);
      }
      
      if (!question.acceptedAnswer || !question.acceptedAnswer.text) {
        result.errors.push(`שאלה ${index + 1}: חסרה תשובה`);
      }
    });
  }

  /**
   * אימות HowTo Schema
   */
  private validateHowTo(schema: any, result: ValidationResult): void {
    const requiredFields = ['name', 'step'];
    
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`שדה חובה חסר ב-HowTo: ${field}`);
      }
    });

    if (schema.step && Array.isArray(schema.step)) {
      if (schema.step.length === 0) {
        result.errors.push('HowTo צריך להכיל לפחות שלב אחד');
      }

      schema.step.forEach((step: any, index: number) => {
        if (!step.name) {
          result.errors.push(`שלב ${index + 1}: חסר name`);
        }
        if (!step.text) {
          result.errors.push(`שלב ${index + 1}: חסר text`);
        }
      });
    }
  }

  /**
   * אימות Review Schema
   */
  private validateReview(schema: any, result: ValidationResult): void {
    const requiredFields = ['itemReviewed', 'reviewRating', 'author'];
    
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`שדה חובה חסר ב-Review: ${field}`);
      }
    });

    // בדיקת reviewRating
    if (schema.reviewRating) {
      if (!schema.reviewRating.ratingValue) {
        result.errors.push('reviewRating חסר ratingValue');
      } else {
        const rating = parseFloat(schema.reviewRating.ratingValue);
        if (rating < 1 || rating > 5) {
          result.warnings.push('ratingValue צריך להיות בין 1 ל-5');
        }
      }
    }
  }

  /**
   * אימות BreadcrumbList Schema
   */
  private validateBreadcrumbList(schema: any, result: ValidationResult): void {
    if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
      result.errors.push('BreadcrumbList צריך להכיל itemListElement כמערך');
      return;
    }

    schema.itemListElement.forEach((item: any, index: number) => {
      if (!item.position) {
        result.errors.push(`Breadcrumb ${index + 1}: חסר position`);
      }
      if (!item.name) {
        result.errors.push(`Breadcrumb ${index + 1}: חסר name`);
      }
    });
  }

  /**
   * אימות Event Schema
   */
  private validateEvent(schema: any, result: ValidationResult): void {
    const requiredFields = ['name', 'startDate', 'location'];
    
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`שדה חובה חסר ב-Event: ${field}`);
      }
    });

    // בדיקת תאריכים
    if (this.config.checkDates) {
      if (schema.startDate && !this.isValidDate(schema.startDate)) {
        result.errors.push(`startDate לא תקין: ${schema.startDate}`);
      }
    }
  }

  /**
   * אימות Product Schema
   */
  private validateProduct(schema: any, result: ValidationResult): void {
    const requiredFields = ['name', 'offers'];
    
    requiredFields.forEach(field => {
      if (!schema[field]) {
        result.errors.push(`שדה חובה חסר ב-Product: ${field}`);
      }
    });

    if (schema.offers) {
      this.validateOffer(schema.offers, result);
    }
  }

  /**
   * אימות Offer
   */
  private validateOffer(offer: any, result: ValidationResult): void {
    if (!offer.price && !offer.priceRange) {
      result.warnings.push('Offer צריך להכיל price או priceRange');
    }
    
    if (!offer.priceCurrency) {
      result.warnings.push('Offer צריך להכיל priceCurrency');
    }
  }

  /**
   * אימות AggregateRating
   */
  private validateAggregateRating(rating: any, result: ValidationResult): void {
    if (!rating.ratingValue) {
      result.errors.push('AggregateRating חסר ratingValue');
    }
    
    if (!rating.reviewCount) {
      result.warnings.push('AggregateRating צריך להכיל reviewCount');
    }
  }

  /**
   * אימות תמונה
   */
  private validateImage(image: any, result: ValidationResult, context: string): void {
    if (typeof image === 'string') {
      if (!this.isValidUrl(image)) {
        result.errors.push(`URL תמונה לא תקין ב-${context}: ${image}`);
      }
    } else if (typeof image === 'object') {
      if (!image.url) {
        result.errors.push(`תמונה ב-${context} חסרה URL`);
      }
      
      // בדיקת גדלי תמונה מומלצים
      if (context === 'Article') {
        if (image.width && image.width < 1200) {
          result.suggestions.push('מומלץ שרוחב התמונה במאמר יהיה לפחות 1200px');
        }
      }
    }
  }

  /**
   * בדיקת תקינות URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * בדיקת תקינות תאריך
   */
  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}

/**
 * פונקציות עזר לבדיקה מהירה
 */

/**
 * בדיקה מהירה של Schema
 */
export const quickValidateSchema = (schema: any): boolean => {
  const validator = new StructuredDataValidator();
  const result = validator.validateSchema(schema);
  return result.isValid;
};

/**
 * בדיקת כל ה-Schemas בדף
 */
export const validatePageSchemas = (): ValidationResult[] => {
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  const validator = new StructuredDataValidator();
  const results: ValidationResult[] = [];

  schemas.forEach(script => {
    try {
      const schema = JSON.parse(script.textContent || '');
      const result = validator.validateSchema(schema);
      results.push(result);
    } catch (error) {
      results.push({
        isValid: false,
        errors: [`שגיאת JSON: ${error}`],
        warnings: [],
        suggestions: []
      });
    }
  });

  return results;
};

/**
 * יצירת דוח אימות מפורט
 */
export const generateValidationReport = (): {
  totalSchemas: number;
  validSchemas: number;
  invalidSchemas: number;
  totalErrors: number;
  totalWarnings: number;
  details: ValidationResult[];
} => {
  const results = validatePageSchemas();
  
  return {
    totalSchemas: results.length,
    validSchemas: results.filter(r => r.isValid).length,
    invalidSchemas: results.filter(r => !r.isValid).length,
    totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
    totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
    details: results
  };
};

/**
 * בדיקת תאימות לGoogle Rich Results
 */
export const checkGoogleRichResultsCompatibility = (schema: any): {
  isCompatible: boolean;
  supportedFeatures: string[];
  missingFeatures: string[];
} => {
  const supportedFeatures: string[] = [];
  const missingFeatures: string[] = [];

  switch (schema['@type']) {
    case 'LocalBusiness':
      if (schema.aggregateRating) supportedFeatures.push('Star Ratings');
      if (schema.priceRange) supportedFeatures.push('Price Range');
      if (schema.openingHours) supportedFeatures.push('Opening Hours');
      if (!schema.image) missingFeatures.push('Business Image');
      break;

    case 'Article':
      if (schema.image) supportedFeatures.push('Article Image');
      if (schema.author) supportedFeatures.push('Author Info');
      if (schema.datePublished) supportedFeatures.push('Publish Date');
      if (!schema.headline) missingFeatures.push('Headline');
      break;

    case 'FAQPage':
      supportedFeatures.push('FAQ Rich Results');
      if (!schema.mainEntity || schema.mainEntity.length === 0) {
        missingFeatures.push('FAQ Questions');
      }
      break;

    case 'HowTo':
      supportedFeatures.push('How-to Rich Results');
      if (schema.image) supportedFeatures.push('Step Images');
      if (!schema.step || schema.step.length === 0) {
        missingFeatures.push('How-to Steps');
      }
      break;
  }

  return {
    isCompatible: missingFeatures.length === 0,
    supportedFeatures,
    missingFeatures
  };
};

/**
 * כלי debug לStructured Data
 */
export const debugStructuredData = () => {
  console.group('🔍 Structured Data Debug');
  
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  console.log(`נמצאו ${schemas.length} schemas בדף`);
  
  schemas.forEach((script, index) => {
    try {
      const schema = JSON.parse(script.textContent || '');
      console.group(`Schema ${index + 1}: ${schema['@type']}`);
      console.log('Schema:', schema);
      
      const validator = new StructuredDataValidator();
      const result = validator.validateSchema(schema);
      
      if (result.isValid) {
        console.log('✅ Schema תקין');
      } else {
        console.log('❌ Schema לא תקין');
        console.log('שגיאות:', result.errors);
      }
      
      if (result.warnings.length > 0) {
        console.log('⚠️ אזהרות:', result.warnings);
      }
      
      if (result.suggestions.length > 0) {
        console.log('💡 הצעות:', result.suggestions);
      }
      
      console.groupEnd();
    } catch (error) {
      console.error(`שגיאה בSchema ${index + 1}:`, error);
    }
  });
  
  console.groupEnd();
};