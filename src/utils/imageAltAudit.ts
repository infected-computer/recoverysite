/**
 * Image alt text audit utilities
 */

// Development-time image alt text checker
export const auditImageAltText = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Check all images on the page
  const images = document.querySelectorAll('img');
  const issues: string[] = [];

  images.forEach((img, index) => {
    const alt = img.getAttribute('alt');
    const src = img.getAttribute('src');
    const ariaHidden = img.getAttribute('aria-hidden');

    // Skip decorative images
    if (ariaHidden === 'true') {
      return;
    }

    // Check for missing alt text
    if (!alt) {
      issues.push(`Image ${index + 1} (${src}) is missing alt text`);
      return;
    }

    // Check for poor alt text
    const poorAltPatterns = [
      /^image$/i,
      /^picture$/i,
      /^photo$/i,
      /^img$/i,
      /^תמונה$/i,
      /^צילום$/i
    ];

    if (poorAltPatterns.some(pattern => pattern.test(alt))) {
      issues.push(`Image ${index + 1} (${src}) has generic alt text: "${alt}"`);
    }

    // Check for very short alt text (unless it's decorative)
    if (alt.length < 3) {
      issues.push(`Image ${index + 1} (${src}) has very short alt text: "${alt}"`);
    }

    // Check for very long alt text
    if (alt.length > 125) {
      issues.push(`Image ${index + 1} (${src}) has very long alt text (${alt.length} chars): "${alt.substring(0, 50)}..."`);
    }
  });

  if (issues.length > 0) {
    console.group('🖼️ Image Alt Text Issues');
    issues.forEach(issue => console.warn(issue));
    console.groupEnd();
  } else {
    console.log('✅ All images have appropriate alt text');
  }

  return issues;
};

// Helper to generate descriptive alt text
export const generateAltText = (context: string, description?: string): string => {
  const baseContext = context || 'תמונה';
  const fullDescription = description || 'תוכן רלוונטי לשחזור נתונים';
  
  return `${baseContext} - ${fullDescription}`;
};

// Common alt text patterns for the recovery site
export const altTextPatterns = {
  hero: (title: string) => `תמונת נושא: ${title} - שירותי שחזור נתונים מקצועיים`,
  article: (title: string) => `תמונה למאמר: ${title} - מדריך מקצועי לשחזור נתונים`,
  team: (name?: string) => name ? `תמונת צוות: ${name} - מומחה שחזור נתונים` : 'תמונת צוות מקצועי לשחזור נתונים',
  process: (step: string) => `איור תהליך: ${step} - שלבי שחזור נתונים`,
  equipment: (type: string) => `ציוד מקצועי: ${type} - כלים לשחזור נתונים`,
  before_after: (type: 'before' | 'after', context: string) => 
    `תמונת ${type === 'before' ? 'לפני' : 'אחרי'}: ${context} - תוצאות שחזור נתונים`,
  testimonial: (name?: string) => name ? `תמונת לקוח: ${name} - המלצה על שירותי שחזור נתונים` : 'תמונת לקוח מרוצה',
  background: (context: string) => `רקע דקורטיבי: ${context}`,
  icon: (purpose: string) => `אייקון: ${purpose}`,
  logo: (company: string) => `לוגו: ${company}`,
  placeholder: () => 'תמונה בטעינה - תוכן יוצג בקרוב'
};

// Validate alt text quality
export const validateAltText = (alt: string, context?: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} => {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check length
  if (alt.length === 0) {
    issues.push('Alt text is empty');
    suggestions.push('Add descriptive alt text');
  } else if (alt.length < 3) {
    issues.push('Alt text is too short');
    suggestions.push('Provide more descriptive text');
  } else if (alt.length > 125) {
    issues.push('Alt text is too long');
    suggestions.push('Keep alt text under 125 characters');
  }

  // Check for generic terms
  const genericTerms = ['image', 'picture', 'photo', 'img', 'תמונה', 'צילום'];
  if (genericTerms.some(term => alt.toLowerCase() === term.toLowerCase())) {
    issues.push('Alt text is too generic');
    suggestions.push('Describe what the image shows or its purpose');
  }

  // Check for file extensions
  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(alt)) {
    issues.push('Alt text contains file extension');
    suggestions.push('Remove file extension from alt text');
  }

  // Check for redundant phrases
  const redundantPhrases = ['image of', 'picture of', 'photo of', 'תמונה של', 'צילום של'];
  if (redundantPhrases.some(phrase => alt.toLowerCase().includes(phrase.toLowerCase()))) {
    issues.push('Alt text contains redundant phrases');
    suggestions.push('Remove redundant phrases like "image of" or "תמונה של"');
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions
  };
};