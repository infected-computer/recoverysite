/**
 * כלים לאופטימיזציית תמונות עבור SEO
 * כולל יצירת תמונות Open Graph ו-Twitter Cards
 */

export interface ImageSEOConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpg' | 'png';
  quality?: number;
}

export interface SocialImageConfig {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  logo?: string;
  template?: 'default' | 'article' | 'service' | 'local';
}

/**
 * מפת תמונות Open Graph לדפים שונים
 */
export const openGraphImages = {
  // דף הבית
  homepage: {
    url: '/images/og/homepage-og.jpg',
    width: 1200,
    height: 630,
    alt: 'דוקטור פיקס - שחזור קבצים מקצועי בישראל'
  },
  
  // דפי שירות
  hardDriveRecovery: {
    url: '/images/og/hard-drive-recovery-og.jpg',
    width: 1200,
    height: 630,
    alt: 'שחזור דיסק קשיח מקצועי - דוקטור פיקס'
  },
  
  memoryCardRecovery: {
    url: '/images/og/memory-card-recovery-og.jpg',
    width: 1200,
    height: 630,
    alt: 'שחזור כרטיס זיכרון מקצועי - דוקטור פיקס'
  },
  
  remoteRecovery: {
    url: '/images/og/remote-recovery-og.jpg',
    width: 1200,
    height: 630,
    alt: 'שחזור נתונים מרחוק - דוקטור פיקס'
  },
  
  // דפי מידע
  pricing: {
    url: '/images/og/pricing-og.jpg',
    width: 1200,
    height: 630,
    alt: 'מחירון שחזור קבצים - דוקטור פיקס'
  },
  
  contact: {
    url: '/images/og/contact-og.jpg',
    width: 1200,
    height: 630,
    alt: 'יצירת קשר - דוקטור פיקס'
  },
  
  // מאמרים
  howToRecoverDeletedFiles: {
    url: '/images/og/how-to-recover-deleted-files-og.jpg',
    width: 1200,
    height: 630,
    alt: 'איך לשחזר קבצים שנמחקו - מדריך מלא'
  },
  
  hardDriveFailureSigns: {
    url: '/images/og/hard-drive-failure-signs-og.jpg',
    width: 1200,
    height: 630,
    alt: '5 סימנים לכשל דיסק קשיח'
  },
  
  // דפים מקומיים
  telAviv: {
    url: '/images/og/tel-aviv-recovery-og.jpg',
    width: 1200,
    height: 630,
    alt: 'שחזור נתונים בתל אביב - דוקטור פיקס'
  },
  
  jerusalem: {
    url: '/images/og/jerusalem-recovery-og.jpg',
    width: 1200,
    height: 630,
    alt: 'שחזור נתונים בירושלים - דוקטור פיקס'
  },
  
  // ברירת מחדל
  default: {
    url: '/images/og/default-og.jpg',
    width: 1200,
    height: 630,
    alt: 'דוקטור פיקס - שחזור קבצים מקצועי'
  }
};

/**
 * מפת תמונות Twitter Cards
 */
export const twitterImages = {
  homepage: {
    url: '/images/twitter/homepage-twitter.jpg',
    width: 1200,
    height: 600,
    alt: 'דוקטור פיקס - שחזור קבצים מקצועי בישראל'
  },
  
  hardDriveRecovery: {
    url: '/images/twitter/hard-drive-recovery-twitter.jpg',
    width: 1200,
    height: 600,
    alt: 'שחזור דיסק קשיח מקצועי'
  },
  
  memoryCardRecovery: {
    url: '/images/twitter/memory-card-recovery-twitter.jpg',
    width: 1200,
    height: 600,
    alt: 'שחזור כרטיס זיכרון מקצועי'
  },
  
  default: {
    url: '/images/twitter/default-twitter.jpg',
    width: 1200,
    height: 600,
    alt: 'דוקטור פיקס - שחזור קבצים מקצועי'
  }
};

/**
 * פונקציה לקבלת תמונת Open Graph לפי דף
 */
export const getOpenGraphImage = (pageKey: string) => {
  return openGraphImages[pageKey as keyof typeof openGraphImages] || openGraphImages.default;
};

/**
 * פונקציה לקבלת תמונת Twitter Card לפי דף
 */
export const getTwitterImage = (pageKey: string) => {
  return twitterImages[pageKey as keyof typeof twitterImages] || twitterImages.default;
};

/**
 * פונקציה ליצירת URL תמונה מותאם
 */
export const generateOptimizedImageUrl = (
  basePath: string,
  config: Partial<ImageSEOConfig> = {}
): string => {
  const {
    width,
    height,
    format = 'webp',
    quality = 85
  } = config;

  const url = basePath;
  const params = new URLSearchParams();

  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (format) params.append('f', format);
  if (quality) params.append('q', quality.toString());

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
};

/**
 * פונקציה ליצירת srcSet לתמונות responsive
 */
export const generateImageSrcSet = (basePath: string, sizes: number[]): string => {
  return sizes
    .map(size => `${generateOptimizedImageUrl(basePath, { width: size })} ${size}w`)
    .join(', ');
};

/**
 * פונקציה ליצירת alt text מותאם SEO
 */
export const generateSEOAltText = (
  mainKeyword: string,
  context: string,
  brandName: string = 'דוקטור פיקס'
): string => {
  return `${mainKeyword} ${context} - ${brandName}`;
};

/**
 * רשימת גדלי תמונות מומלצים לסוגי תמונות שונים
 */
export const imageSizePresets = {
  // Open Graph
  openGraph: {
    width: 1200,
    height: 630,
    aspectRatio: '1.91:1'
  },
  
  // Twitter Card
  twitterCard: {
    width: 1200,
    height: 600,
    aspectRatio: '2:1'
  },
  
  // תמונות תוכן
  contentImage: {
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 }
  },
  
  // תמונות שירות
  serviceImage: {
    thumbnail: { width: 300, height: 200 },
    card: { width: 600, height: 400 },
    hero: { width: 1200, height: 600 }
  },
  
  // לוגו
  logo: {
    small: { width: 100, height: 100 },
    medium: { width: 200, height: 200 },
    large: { width: 400, height: 400 }
  }
};

/**
 * פונקציה לבדיקת תקינות תמונה לSEO
 */
export const validateImageForSEO = (imageConfig: ImageSEOConfig): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // בדיקת alt text
  if (!imageConfig.alt || imageConfig.alt.trim().length === 0) {
    errors.push('Alt text חסר');
  } else if (imageConfig.alt.length > 125) {
    warnings.push('Alt text ארוך מדי (מעל 125 תווים)');
  }

  // בדיקת גודל תמונה
  if (imageConfig.width && imageConfig.height) {
    const aspectRatio = imageConfig.width / imageConfig.height;
    
    // בדיקה לOpen Graph
    if (Math.abs(aspectRatio - 1.91) < 0.1) {
      // תמונה מתאימה לOpen Graph
    } else if (Math.abs(aspectRatio - 2) < 0.1) {
      // תמונה מתאימה לTwitter Card
    } else {
      warnings.push('יחס גובה-רוחב לא אופטימלי לרשתות חברתיות');
    }
  }

  // בדיקת פורמט
  if (imageConfig.format && !['webp', 'jpg', 'png'].includes(imageConfig.format)) {
    errors.push('פורמט תמונה לא נתמך');
  }

  // בדיקת איכות
  if (imageConfig.quality && (imageConfig.quality < 60 || imageConfig.quality > 95)) {
    warnings.push('איכות תמונה לא אופטימלית (מומלץ 75-90)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * פונקציה ליצירת תמונות דינמיות לרשתות חברתיות
 */
export const generateSocialImage = async (config: SocialImageConfig): Promise<string> => {
  // זוהי פונקציה מדומה - בפועל תצטרך להשתמש בספרייה כמו canvas או puppeteer
  // ליצירת תמונות דינמיות
  
  const { title, subtitle, template = 'default' } = config;
  
  // כאן יהיה הקוד ליצירת תמונה דינמית
  // לדוגמה עם canvas או שירות חיצוני
  
  return `/images/generated/${template}-${Date.now()}.jpg`;
};

/**
 * מפת תמונות לפי מילות מפתח
 */
export const keywordImageMap = {
  'שחזור קבצים': 'homepage',
  'שחזור דיסק קשיח': 'hardDriveRecovery',
  'שחזור כרטיס זיכרון': 'memoryCardRecovery',
  'שחזור נתונים מרחוק': 'remoteRecovery',
  'מחיר שחזור קבצים': 'pricing',
  'איך לשחזר קבצים שנמחקו': 'howToRecoverDeletedFiles',
  'סימנים לכשל דיסק קשיח': 'hardDriveFailureSigns',
  'שחזור נתונים תל אביב': 'telAviv',
  'שחזור נתונים ירושלים': 'jerusalem'
};

/**
 * פונקציה לקבלת תמונה מתאימה לפי מילת מפתח
 */
export const getImageByKeyword = (keyword: string) => {
  const imageKey = keywordImageMap[keyword as keyof typeof keywordImageMap] || 'default';
  return {
    openGraph: getOpenGraphImage(imageKey),
    twitter: getTwitterImage(imageKey)
  };
};