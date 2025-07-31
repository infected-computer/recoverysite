/**
 * Automatic color fallbacks for accessibility compliance
 */

import { calculateContrastRatio, meetsWCAGAA } from './accessibilityUtils';

// High contrast fallback colors
const fallbackColors = {
  // Dark colors for light backgrounds
  darkFallbacks: [
    '#000000', // Pure black - 21:1
    '#1a1a1a', // Very dark gray - 16:1
    '#333333', // Dark gray - 12.6:1
    '#4a4a4a', // Medium dark gray - 9:1
    '#666666', // Gray - 5.7:1
    '#757575'  // Light gray - 4.5:1
  ],
  
  // Light colors for dark backgrounds
  lightFallbacks: [
    '#ffffff', // Pure white - 21:1
    '#f5f5f5', // Very light gray - 18:1
    '#e0e0e0', // Light gray - 13:1
    '#cccccc', // Medium light gray - 9:1
    '#b3b3b3', // Gray - 6:1
    '#9e9e9e'  // Dark light gray - 4.5:1
  ]
};

/**
 * Find the best accessible color for a given background
 */
export const findAccessibleColor = (
  preferredColor: string,
  backgroundColor: string,
  isLargeText = false
): string => {
  // Check if preferred color already meets requirements
  if (meetsWCAGAA(preferredColor, backgroundColor, isLargeText)) {
    return preferredColor;
  }

  // Determine if background is light or dark
  const bgLuminance = getLuminance(backgroundColor);
  const isLightBackground = bgLuminance > 0.5;
  
  // Choose appropriate fallback array
  const fallbacks = isLightBackground ? fallbackColors.darkFallbacks : fallbackColors.lightFallbacks;
  
  // Find first fallback that meets requirements
  for (const fallback of fallbacks) {
    if (meetsWCAGAA(fallback, backgroundColor, isLargeText)) {
      console.warn(
        `🎨 Color fallback applied: ${preferredColor} → ${fallback} ` +
        `(${calculateContrastRatio(fallback, backgroundColor).toFixed(2)}:1)`
      );
      return fallback;
    }
  }
  
  // If no fallback works, return high contrast option
  const highContrast = isLightBackground ? '#000000' : '#ffffff';
  console.error(
    `🚨 No suitable fallback found, using high contrast: ${highContrast}`
  );
  return highContrast;
};

/**
 * Get luminance of a color (helper function)
 */
function getLuminance(color: string): number {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const sRGB = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Generate accessible color palette from a base color
 */
export const generateAccessiblePalette = (baseColor: string) => {
  const baseLuminance = getLuminance(baseColor);
  const isLight = baseLuminance > 0.5;
  
  return {
    50: isLight ? lighten(baseColor, 0.4) : darken(baseColor, 0.4),
    100: isLight ? lighten(baseColor, 0.3) : darken(baseColor, 0.3),
    200: isLight ? lighten(baseColor, 0.2) : darken(baseColor, 0.2),
    300: isLight ? lighten(baseColor, 0.1) : darken(baseColor, 0.1),
    400: baseColor,
    500: isLight ? darken(baseColor, 0.1) : lighten(baseColor, 0.1),
    600: isLight ? darken(baseColor, 0.2) : lighten(baseColor, 0.2),
    700: isLight ? darken(baseColor, 0.3) : lighten(baseColor, 0.3),
    800: isLight ? darken(baseColor, 0.4) : lighten(baseColor, 0.4),
    900: isLight ? darken(baseColor, 0.5) : lighten(baseColor, 0.5),
  };
};

/**
 * Lighten a color by a percentage
 */
function lighten(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + Math.round(255 * amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Darken a color by a percentage
 */
function darken(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.round(255 * amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * CSS custom property with automatic fallback
 */
export const createAccessibleCSSVar = (
  varName: string,
  preferredColor: string,
  backgroundColor: string,
  isLargeText = false
): string => {
  const accessibleColor = findAccessibleColor(preferredColor, backgroundColor, isLargeText);
  return `var(${varName}, ${accessibleColor})`;
};