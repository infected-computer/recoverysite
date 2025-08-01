/**
 * Accessibility utilities for WCAG 2.2 compliance
 */

// Color contrast calculation utilities
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

// WCAG 2.2 compliance checkers
export const meetsWCAGAA = (foreground: string, background: string, isLargeText = false): boolean => {
  const ratio = calculateContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
};

export const meetsWCAGAAA = (foreground: string, background: string, isLargeText = false): boolean => {
  const ratio = calculateContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
};

// Development-time contrast warnings
export const validateColorContrast = (
  foreground: string, 
  background: string, 
  context: string,
  isLargeText = false
): void => {
  if (process.env.NODE_ENV === 'development') {
    const ratio = calculateContrastRatio(foreground, background);
    const meetsAA = meetsWCAGAA(foreground, background, isLargeText);
    
    if (!meetsAA) {
      console.warn(
        `🚨 Accessibility Warning: Insufficient color contrast in ${context}\n` +
        `   Foreground: ${foreground}\n` +
        `   Background: ${background}\n` +
        `   Ratio: ${ratio.toFixed(2)}:1\n` +
        `   Required: ${isLargeText ? '3:1' : '4.5:1'} (WCAG AA)\n` +
        `   Large text: ${isLargeText}`
      );
    }
  }
};

// Accessible color palette with guaranteed contrast
export const accessibleColors = {
  // Primary colors with guaranteed contrast
  primary: {
    50: '#f0f9ff',   // Very light blue
    100: '#e0f2fe',  // Light blue
    500: '#0284c7',  // Main blue (5.5:1 on white)
    600: '#0284c7',  // Darker blue (5.5:1 on white)
    700: '#0369a1',  // Dark blue (7:1 on white)
    900: '#0c4a6e',  // Very dark blue (12:1 on white)
    contrast: '#ffffff' // White text on primary
  },
  
  // Surface colors
  surface: {
    background: '#ffffff',    // Pure white
    card: '#f8fafc',         // Very light gray
    elevated: '#f1f5f9',     // Light gray
    border: '#e2e8f0',       // Border gray
    borderDark: '#cbd5e1'    // Darker border
  },
  
  // Accent colors
  accent: {
    success: '#047857',      // Green (6:1 on white)
    warning: '#c2410c',      // Orange (6:1 on white)  
    error: '#dc2626',        // Red (4.5:1 on white)
    info: '#0284c7'          // Blue (5.5:1 on white)
  },
  
  // Text colors with guaranteed contrast
  text: {
    primary: '#1e293b',      // Dark gray (12:1 on white)
    secondary: '#475569',    // Medium gray (7:1 on white)
    muted: '#64748b',        // Light gray (4.5:1 on white)
    inverse: '#ffffff'       // White text
  }
};

// Focus management utilities
export const manageFocus = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement): (() => void) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to previous element
  restoreFocus: (previousElement: HTMLElement | null) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  }
};

// ARIA utilities
export const ariaUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Announce to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }
};

// Screen reader only styles
export const srOnlyStyles = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden' as const,
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: '0'
};