/**
 * Hook for accessible color management and validation
 */

import { useEffect } from 'react';
import { accessibleColors, validateColorContrast, meetsWCAGAA } from '../utils/accessibilityUtils';

export const useAccessibleColors = () => {
  // Validate color combinations on mount (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Validate primary text combinations
      validateColorContrast(
        accessibleColors.text.primary,
        accessibleColors.surface.background,
        'Primary text on background'
      );

      validateColorContrast(
        accessibleColors.text.secondary,
        accessibleColors.surface.background,
        'Secondary text on background'
      );

      validateColorContrast(
        accessibleColors.text.muted,
        accessibleColors.surface.background,
        'Muted text on background'
      );

      // Validate primary button combinations
      validateColorContrast(
        accessibleColors.text.inverse,
        accessibleColors.primary[500],
        'White text on primary button'
      );

      // Validate accent color combinations
      validateColorContrast(
        accessibleColors.text.inverse,
        accessibleColors.accent.success,
        'White text on success background'
      );

      validateColorContrast(
        accessibleColors.text.inverse,
        accessibleColors.accent.error,
        'White text on error background'
      );

      validateColorContrast(
        accessibleColors.text.inverse,
        accessibleColors.accent.warning,
        'White text on warning background'
      );

      console.log('✅ Color contrast validation completed');
    }
  }, []);

  return {
    colors: accessibleColors,
    validateContrast: validateColorContrast,
    meetsWCAG: meetsWCAGAA
  };
};

// Color combination presets that are guaranteed to be accessible
export const accessibleCombinations = {
  // Text on backgrounds
  primaryText: {
    color: accessibleColors.text.primary,
    backgroundColor: accessibleColors.surface.background
  },
  secondaryText: {
    color: accessibleColors.text.secondary,
    backgroundColor: accessibleColors.surface.background
  },
  mutedText: {
    color: accessibleColors.text.muted,
    backgroundColor: accessibleColors.surface.background
  },
  
  // Buttons
  primaryButton: {
    color: accessibleColors.text.inverse,
    backgroundColor: accessibleColors.primary[500],
    borderColor: accessibleColors.primary[600]
  },
  secondaryButton: {
    color: accessibleColors.text.primary,
    backgroundColor: accessibleColors.surface.card,
    borderColor: accessibleColors.surface.borderDark
  },
  
  // Status indicators
  successButton: {
    color: accessibleColors.text.inverse,
    backgroundColor: accessibleColors.accent.success
  },
  warningButton: {
    color: accessibleColors.text.inverse,
    backgroundColor: accessibleColors.accent.warning
  },
  errorButton: {
    color: accessibleColors.text.inverse,
    backgroundColor: accessibleColors.accent.error
  },
  
  // Form elements
  input: {
    color: accessibleColors.text.primary,
    backgroundColor: accessibleColors.surface.background,
    borderColor: accessibleColors.surface.borderDark
  },
  inputFocus: {
    color: accessibleColors.text.primary,
    backgroundColor: accessibleColors.surface.background,
    borderColor: accessibleColors.primary[500],
    boxShadow: `0 0 0 2px ${accessibleColors.primary[100]}`
  },
  inputError: {
    color: accessibleColors.text.primary,
    backgroundColor: accessibleColors.surface.background,
    borderColor: accessibleColors.accent.error,
    boxShadow: `0 0 0 2px ${accessibleColors.accent.error}20`
  }
};

// Development helper to check if a color combination is accessible
export const checkAccessibility = (foreground: string, background: string, context: string) => {
  if (process.env.NODE_ENV === 'development') {
    const isAccessible = meetsWCAGAA(foreground, background);
    const isAccessibleLarge = meetsWCAGAA(foreground, background, true);
    
    console.log(`🎨 Accessibility check for ${context}:`, {
      foreground,
      background,
      normalText: isAccessible ? '✅ Pass' : '❌ Fail',
      largeText: isAccessibleLarge ? '✅ Pass' : '❌ Fail'
    });
    
    return { isAccessible, isAccessibleLarge };
  }
  
  return { isAccessible: true, isAccessibleLarge: true };
};