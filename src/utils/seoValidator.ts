interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

interface SEOCheckData {
  title?: string;
  description?: string;
  keywords?: string;
  headings?: string[];
  images?: Array<{ src: string; alt: string }>;
  links?: Array<{ href: string; text: string }>;
}

export class SEOValidator {
  static validatePage(data: SEOCheckData): SEOValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Title validation
    if (!data.title) {
      errors.push('חסר כותרת עמוד (title tag)');
      score -= 20;
    } else {
      if (data.title.length < 30) {
        warnings.push('כותרת העמוד קצרה מדי (מומלץ 30-60 תווים)');
        score -= 5;
      }
      if (data.title.length > 60) {
        warnings.push('כותרת העמוד ארוכה מדי (מומלץ 30-60 תווים)');
        score -= 5;
      }
    }

    // Description validation
    if (!data.description) {
      errors.push('חסר תיאור עמוד (meta description)');
      score -= 15;
    } else {
      if (data.description.length < 120) {
        warnings.push('תיאור העמוד קצר מדי (מומלץ 120-160 תווים)');
        score -= 5;
      }
      if (data.description.length > 160) {
        warnings.push('תיאור העמוד ארוך מדי (מומלץ 120-160 תווים)');
        score -= 5;
      }
    }

    // Keywords validation
    if (!data.keywords) {
      warnings.push('לא הוגדרו מילות מפתח');
      score -= 5;
    }

    // Headings validation
    if (data.headings) {
      const h1Count = data.headings.filter(h => h.startsWith('h1')).length;
      if (h1Count === 0) {
        errors.push('חסרה כותרת H1');
        score -= 15;
      } else if (h1Count > 1) {
        warnings.push('יותר מכותרת H1 אחת בעמוד');
        score -= 5;
      }
    }

    // Images validation
    if (data.images) {
      const imagesWithoutAlt = data.images.filter(img => !img.alt || img.alt.trim() === '');
      if (imagesWithoutAlt.length > 0) {
        warnings.push(`${imagesWithoutAlt.length} תמונות ללא טקסט חלופי (alt text)`);
        score -= imagesWithoutAlt.length * 2;
      }
    }

    // Links validation
    if (data.links) {
      const emptyLinks = data.links.filter(link => !link.text || link.text.trim() === '');
      if (emptyLinks.length > 0) {
        warnings.push(`${emptyLinks.length} קישורים ללא טקסט תיאור`);
        score -= emptyLinks.length;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    };
  }

  static validateStructuredData(schema: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!schema) {
      errors.push('לא נמצא structured data');
      return { isValid: false, errors };
    }

    // Basic schema validation
    if (!schema['@context']) {
      errors.push('חסר @context בstructured data');
    }

    if (!schema['@type']) {
      errors.push('חסר @type בstructured data');
    }

    // LocalBusiness specific validation
    if (schema['@type'] === 'LocalBusiness') {
      if (!schema.name) errors.push('חסר שם עסק בLocalBusiness schema');
      if (!schema.telephone) errors.push('חסר טלפון בLocalBusiness schema');
      if (!schema.address) errors.push('חסרה כתובת בLocalBusiness schema');
    }

    // Service specific validation
    if (schema['@type'] === 'Service') {
      if (!schema.name) errors.push('חסר שם שירות בService schema');
      if (!schema.provider) errors.push('חסר ספק שירות בService schema');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static generateSEOReport(data: SEOCheckData): string {
    const result = this.validatePage(data);
    
    let report = `דוח SEO\n`;
    report += `=======\n\n`;
    report += `ציון כללי: ${result.score}/100\n\n`;

    if (result.errors.length > 0) {
      report += `שגיאות קריטיות:\n`;
      result.errors.forEach(error => {
        report += `❌ ${error}\n`;
      });
      report += `\n`;
    }

    if (result.warnings.length > 0) {
      report += `אזהרות:\n`;
      result.warnings.forEach(warning => {
        report += `⚠️ ${warning}\n`;
      });
      report += `\n`;
    }

    if (result.isValid && result.warnings.length === 0) {
      report += `✅ העמוד עובר את כל בדיקות ה-SEO!\n`;
    }

    return report;
  }
}

// Hook for real-time SEO validation
export const useSEOValidation = (data: SEOCheckData) => {
  return SEOValidator.validatePage(data);
};