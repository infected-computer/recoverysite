/**
 * Responsive design testing utilities
 */

// Viewport sizes for testing
export const viewportSizes = {
  mobile: { width: 375, height: 667 },
  mobileLarge: { width: 414, height: 896 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1024, height: 768 },
  desktopLarge: { width: 1440, height: 900 },
  ultraWide: { width: 1920, height: 1080 }
};

// Test horizontal scroll detection
export const checkHorizontalScroll = (): boolean => {
  const body = document.body;
  const html = document.documentElement;
  
  const documentWidth = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  );
  
  const viewportWidth = window.innerWidth;
  
  return documentWidth > viewportWidth;
};

// Test touch target sizes
export const checkTouchTargets = (): Array<{element: Element, size: {width: number, height: number}, passes: boolean}> => {
  const interactiveElements = document.querySelectorAll(
    'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])'
  );
  
  const results: Array<{element: Element, size: {width: number, height: number}, passes: boolean}> = [];
  
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const size = { width: rect.width, height: rect.height };
    const passes = size.width >= 44 && size.height >= 44;
    
    results.push({ element, size, passes });
  });
  
  return results;
};

// Test form responsiveness
export const checkFormResponsiveness = (): {
  formsFound: number;
  issues: string[];
  passes: boolean;
} => {
  const forms = document.querySelectorAll('form');
  const issues: string[] = [];
  
  forms.forEach((form, index) => {
    const formRect = form.getBoundingClientRect();
    
    // Check if form overflows viewport
    if (formRect.width > window.innerWidth) {
      issues.push(`Form ${index + 1} overflows viewport width`);
    }
    
    // Check form inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach((input, inputIndex) => {
      const inputRect = input.getBoundingClientRect();
      
      // Check input size on mobile
      if (window.innerWidth <= 768) {
        if (inputRect.height < 44) {
          issues.push(`Form ${index + 1}, Input ${inputIndex + 1} is too small for touch (${inputRect.height}px)`);
        }
      }
      
      // Check if input overflows
      if (inputRect.width > window.innerWidth - 32) { // 32px for padding
        issues.push(`Form ${index + 1}, Input ${inputIndex + 1} overflows viewport`);
      }
    });
    
    // Check form layout on mobile
    if (window.innerWidth <= 768) {
      const formStyle = window.getComputedStyle(form);
      if (formStyle.display === 'grid' && formStyle.gridTemplateColumns.includes('repeat')) {
        const gridCols = formStyle.gridTemplateColumns;
        if (!gridCols.includes('1fr') && gridCols.split(' ').length > 1) {
          issues.push(`Form ${index + 1} may not be responsive - using multi-column grid on mobile`);
        }
      }
    }
  });
  
  return {
    formsFound: forms.length,
    issues,
    passes: issues.length === 0
  };
};

// Test pricing cards responsiveness
export const checkPricingCardsResponsiveness = (): {
  cardsFound: number;
  issues: string[];
  passes: boolean;
} => {
  const pricingCards = document.querySelectorAll('.pricing-card, [class*="pricing"], [class*="card"]');
  const issues: string[] = [];
  
  if (window.innerWidth <= 768) {
    pricingCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      
      // Check if cards are stacked vertically on mobile
      const cardStyle = window.getComputedStyle(card);
      const parent = card.parentElement;
      
      if (parent) {
        const parentStyle = window.getComputedStyle(parent);
        
        // Check if parent uses flex-direction: column on mobile
        if (parentStyle.display === 'flex' && parentStyle.flexDirection !== 'column') {
          issues.push(`Pricing cards container should use flex-direction: column on mobile`);
        }
        
        // Check if parent uses grid with single column on mobile
        if (parentStyle.display === 'grid') {
          const gridCols = parentStyle.gridTemplateColumns;
          if (gridCols !== '1fr' && !gridCols.includes('minmax')) {
            issues.push(`Pricing cards should use single column grid on mobile`);
          }
        }
      }
      
      // Check card width
      if (cardRect.width > window.innerWidth - 32) { // 32px for margins
        issues.push(`Pricing card ${index + 1} is too wide for mobile viewport`);
      }
      
      // Check buttons in cards
      const buttons = card.querySelectorAll('button');
      buttons.forEach((button, buttonIndex) => {
        const buttonRect = button.getBoundingClientRect();
        if (buttonRect.height < 44) {
          issues.push(`Button ${buttonIndex + 1} in pricing card ${index + 1} is too small for touch`);
        }
      });
    });
  }
  
  return {
    cardsFound: pricingCards.length,
    issues,
    passes: issues.length === 0
  };
};

// Comprehensive responsive test
export const runResponsiveTests = () => {
  const results = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    horizontalScroll: {
      hasScroll: checkHorizontalScroll(),
      passes: !checkHorizontalScroll()
    },
    touchTargets: {
      results: checkTouchTargets(),
      passes: checkTouchTargets().every(result => result.passes)
    },
    forms: checkFormResponsiveness(),
    pricingCards: checkPricingCardsResponsiveness(),
    overall: true
  };
  
  // Calculate overall pass/fail
  results.overall = results.horizontalScroll.passes && 
                   results.touchTargets.passes && 
                   results.forms.passes && 
                   results.pricingCards.passes;
  
  return results;
};

// Development helper to test different viewports
export const testViewport = async (size: keyof typeof viewportSizes) => {
  const viewport = viewportSizes[size];
  
  // This would typically be used with a testing framework like Puppeteer
  console.log(`Testing viewport: ${size} (${viewport.width}x${viewport.height})`);
  
  // Simulate viewport change (for development testing)
  if (typeof window !== 'undefined') {
    // Note: This doesn't actually change the viewport, just logs what would be tested
    console.log('Current viewport:', window.innerWidth, 'x', window.innerHeight);
    
    const results = runResponsiveTests();
    console.log('Responsive test results:', results);
    
    return results;
  }
};

// CSS breakpoint testing
export const testBreakpoints = () => {
  const breakpoints = {
    mobile: window.matchMedia('(max-width: 767px)').matches,
    tablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches,
    desktop: window.matchMedia('(min-width: 1024px)').matches
  };
  
  const activeBreakpoint = Object.entries(breakpoints).find(([_, matches]) => matches)?.[0] || 'unknown';
  
  return {
    breakpoints,
    activeBreakpoint,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };
};

// Font size testing for accessibility
export const checkFontSizes = () => {
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, input, textarea');
  const issues: string[] = [];
  
  textElements.forEach((element, index) => {
    const style = window.getComputedStyle(element);
    const fontSize = parseFloat(style.fontSize);
    
    // Check minimum font size on mobile
    if (window.innerWidth <= 768) {
      if (fontSize < 16 && element.tagName.toLowerCase() === 'input') {
        issues.push(`Input element ${index + 1} has font size ${fontSize}px - should be at least 16px on mobile to prevent zoom`);
      }
      
      if (fontSize < 14 && ['p', 'span', 'div'].includes(element.tagName.toLowerCase())) {
        issues.push(`Text element ${index + 1} has font size ${fontSize}px - consider using at least 14px for readability`);
      }
    }
  });
  
  return {
    elementsChecked: textElements.length,
    issues,
    passes: issues.length === 0
  };
};

// Export test runner for development
export const runAllResponsiveTests = () => {
  console.group('🔍 Responsive Design Tests');
  
  const results = runResponsiveTests();
  const fontResults = checkFontSizes();
  const breakpointResults = testBreakpoints();
  
  console.log('Breakpoint Info:', breakpointResults);
  console.log('Responsive Results:', results);
  console.log('Font Size Results:', fontResults);
  
  if (!results.overall) {
    console.warn('❌ Some responsive tests failed');
  } else {
    console.log('✅ All responsive tests passed');
  }
  
  console.groupEnd();
  
  return {
    responsive: results,
    fonts: fontResults,
    breakpoints: breakpointResults,
    overall: results.overall && fontResults.passes
  };
};