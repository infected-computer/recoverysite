/**
 * Content consistency validation utilities
 */

// Content patterns to check for consistency
export const contentPatterns = {
  successRate: /(\d+)%\s*שיעור\s*הצלחה/gi,
  pricing: /₪(\d+)(?:-₪(\d+))?/g,
  phone: /0\d{1,2}-?\d{7}/g,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  whatsapp: /wa\.me\/(\d+)/g
};

// Expected consistent values
export const expectedValues = {
  successRate: '97%',
  phone: '972536657279',
  email: 'info@doctorfix.co.il',
  companyName: 'דוקטור פיקס',
  experience: '7+ שנות ניסיון'
};

// Check success rate consistency
export const checkSuccessRateConsistency = (): {
  found: string[];
  consistent: boolean;
  issues: string[];
} => {
  const bodyText = document.body.innerText;
  const matches = Array.from(bodyText.matchAll(contentPatterns.successRate));
  const found = matches.map(match => match[0]);
  const uniqueRates = [...new Set(found)];
  
  const issues: string[] = [];
  
  if (uniqueRates.length > 1) {
    issues.push(`Multiple success rates found: ${uniqueRates.join(', ')}`);
  }
  
  if (uniqueRates.length > 0 && !uniqueRates.includes(expectedValues.successRate)) {
    issues.push(`Success rate should be ${expectedValues.successRate}, found: ${uniqueRates.join(', ')}`);
  }
  
  return {
    found,
    consistent: issues.length === 0,
    issues
  };
};

// Check pricing consistency and ordering
export const checkPricingConsistency = (): {
  found: Array<{text: string, min: number, max?: number}>;
  consistent: boolean;
  issues: string[];
} => {
  const bodyText = document.body.innerText;
  const matches = Array.from(bodyText.matchAll(contentPatterns.pricing));
  
  const found = matches.map(match => ({
    text: match[0],
    min: parseInt(match[1]),
    max: match[2] ? parseInt(match[2]) : undefined
  }));
  
  const issues: string[] = [];
  
  // Check if prices are in ascending order where they appear together
  const priceElements = document.querySelectorAll('[class*="pricing"], [class*="price"]');
  priceElements.forEach((element, index) => {
    const text = element.textContent || '';
    const priceMatches = Array.from(text.matchAll(contentPatterns.pricing));
    
    if (priceMatches.length > 1) {
      const prices = priceMatches.map(match => parseInt(match[1]));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      
      if (JSON.stringify(prices) !== JSON.stringify(sortedPrices)) {
        issues.push(`Prices in element ${index + 1} are not in ascending order: ${prices.join(', ')}`);
      }
    }
  });
  
  // Check for consistent price ranges
  const priceRanges = found.filter(price => price.max);
  const expectedRanges = [
    { min: 350, max: 600 },
    { min: 700, max: 1200 }
  ];
  
  priceRanges.forEach(range => {
    const matchesExpected = expectedRanges.some(expected => 
      expected.min === range.min && expected.max === range.max
    );
    
    if (!matchesExpected) {
      issues.push(`Unexpected price range: ₪${range.min}-₪${range.max}`);
    }
  });
  
  return {
    found,
    consistent: issues.length === 0,
    issues
  };
};

// Check contact information consistency
export const checkContactConsistency = (): {
  phones: string[];
  emails: string[];
  whatsapp: string[];
  consistent: boolean;
  issues: string[];
} => {
  const bodyText = document.body.innerText;
  const htmlContent = document.body.innerHTML;
  
  const phones = Array.from(bodyText.matchAll(contentPatterns.phone)).map(match => match[0]);
  const emails = Array.from(bodyText.matchAll(contentPatterns.email)).map(match => match[0]);
  const whatsapp = Array.from(htmlContent.matchAll(contentPatterns.whatsapp)).map(match => match[1]);
  
  const issues: string[] = [];
  
  // Check phone consistency
  const uniquePhones = [...new Set(phones)];
  if (uniquePhones.length > 1) {
    issues.push(`Multiple phone numbers found: ${uniquePhones.join(', ')}`);
  }
  
  // Check email consistency
  const uniqueEmails = [...new Set(emails)];
  if (uniqueEmails.length > 1) {
    issues.push(`Multiple email addresses found: ${uniqueEmails.join(', ')}`);
  }
  
  // Check WhatsApp consistency
  const uniqueWhatsApp = [...new Set(whatsapp)];
  if (uniqueWhatsApp.length > 1) {
    issues.push(`Multiple WhatsApp numbers found: ${uniqueWhatsApp.join(', ')}`);
  }
  
  // Check if WhatsApp matches expected phone
  if (uniqueWhatsApp.length > 0 && !uniqueWhatsApp.includes(expectedValues.phone)) {
    issues.push(`WhatsApp number should be ${expectedValues.phone}, found: ${uniqueWhatsApp.join(', ')}`);
  }
  
  return {
    phones,
    emails,
    whatsapp,
    consistent: issues.length === 0,
    issues
  };
};

// Check text styling consistency
export const checkTextStylingConsistency = (): {
  headings: Array<{level: string, text: string, styles: any}>;
  buttons: Array<{text: string, styles: any}>;
  issues: string[];
  consistent: boolean;
} => {
  const headings: Array<{level: string, text: string, styles: any}> = [];
  const buttons: Array<{text: string, styles: any}> = [];
  const issues: string[] = [];
  
  // Check heading consistency
  const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headingElements.forEach(heading => {
    const style = window.getComputedStyle(heading);
    headings.push({
      level: heading.tagName.toLowerCase(),
      text: heading.textContent?.substring(0, 50) || '',
      styles: {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        color: style.color,
        fontFamily: style.fontFamily
      }
    });
  });
  
  // Check button consistency
  const buttonElements = document.querySelectorAll('button, .btn, [role="button"]');
  buttonElements.forEach(button => {
    const style = window.getComputedStyle(button);
    buttons.push({
      text: button.textContent?.substring(0, 30) || '',
      styles: {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        backgroundColor: style.backgroundColor,
        color: style.color,
        padding: style.padding,
        borderRadius: style.borderRadius
      }
    });
  });
  
  // Check for inconsistent heading styles within same level
  const headingsByLevel = headings.reduce((acc, heading) => {
    if (!acc[heading.level]) acc[heading.level] = [];
    acc[heading.level].push(heading);
    return acc;
  }, {} as Record<string, typeof headings>);
  
  Object.entries(headingsByLevel).forEach(([level, levelHeadings]) => {
    if (levelHeadings.length > 1) {
      const firstStyle = levelHeadings[0].styles;
      const inconsistent = levelHeadings.slice(1).some(heading => 
        heading.styles.fontSize !== firstStyle.fontSize ||
        heading.styles.fontWeight !== firstStyle.fontWeight ||
        heading.styles.color !== firstStyle.color
      );
      
      if (inconsistent) {
        issues.push(`Inconsistent styling for ${level} headings`);
      }
    }
  });
  
  return {
    headings,
    buttons,
    issues,
    consistent: issues.length === 0
  };
};

// Check content language consistency
export const checkLanguageConsistency = (): {
  hebrewContent: number;
  englishContent: number;
  mixedContent: string[];
  issues: string[];
  consistent: boolean;
} => {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, button, a');
  const issues: string[] = [];
  const mixedContent: string[] = [];
  
  let hebrewContent = 0;
  let englishContent = 0;
  
  textElements.forEach(element => {
    const text = element.textContent?.trim() || '';
    if (text.length < 3) return; // Skip very short text
    
    const hebrewChars = (text.match(/[\u0590-\u05FF]/g) || []).length;
    const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
    const totalChars = hebrewChars + englishChars;
    
    if (totalChars === 0) return;
    
    const hebrewRatio = hebrewChars / totalChars;
    const englishRatio = englishChars / totalChars;
    
    if (hebrewRatio > 0.7) {
      hebrewContent++;
    } else if (englishRatio > 0.7) {
      englishContent++;
    } else if (hebrewChars > 0 && englishChars > 0) {
      mixedContent.push(text.substring(0, 50));
    }
  });
  
  // Check for unexpected English content in Hebrew site
  if (englishContent > hebrewContent * 0.1) { // Allow up to 10% English content
    issues.push(`High amount of English content detected (${englishContent} elements vs ${hebrewContent} Hebrew elements)`);
  }
  
  return {
    hebrewContent,
    englishContent,
    mixedContent,
    issues,
    consistent: issues.length === 0
  };
};

// Comprehensive content consistency check
export const runContentConsistencyCheck = () => {
  const results = {
    successRate: checkSuccessRateConsistency(),
    pricing: checkPricingConsistency(),
    contact: checkContactConsistency(),
    styling: checkTextStylingConsistency(),
    language: checkLanguageConsistency(),
    overall: true
  };
  
  // Calculate overall consistency
  results.overall = results.successRate.consistent &&
                   results.pricing.consistent &&
                   results.contact.consistent &&
                   results.styling.consistent &&
                   results.language.consistent;
  
  return results;
};

// Development helper
export const auditContentConsistency = () => {
  console.group('📝 Content Consistency Audit');
  
  const results = runContentConsistencyCheck();
  
  console.log('Success Rate Check:', results.successRate);
  console.log('Pricing Check:', results.pricing);
  console.log('Contact Info Check:', results.contact);
  console.log('Text Styling Check:', results.styling);
  console.log('Language Check:', results.language);
  
  if (!results.overall) {
    console.warn('❌ Content consistency issues found');
    
    // Log all issues
    const allIssues = [
      ...results.successRate.issues,
      ...results.pricing.issues,
      ...results.contact.issues,
      ...results.styling.issues,
      ...results.language.issues
    ];
    
    allIssues.forEach(issue => console.warn(`- ${issue}`));
  } else {
    console.log('✅ All content consistency checks passed');
  }
  
  console.groupEnd();
  
  return results;
};