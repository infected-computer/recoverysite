/**
 * Font loading utilities with fallback handling
 */

interface FontConfig {
  family: string;
  weight: string;
  style: string;
  url: string;
}

const CRITICAL_FONTS: FontConfig[] = [
  {
    family: 'Plex Sans Hebrew',
    weight: '400',
    style: 'normal',
    url: '/src/assets/fonts/plex-sans-hebrew/PlexSansHebrew-Regular.ttf'
  },
  {
    family: 'Plex Sans Hebrew',
    weight: '600',
    style: 'normal',
    url: '/src/assets/fonts/plex-sans-hebrew/PlexSansHebrew-SemiBold.ttf'
  },
  {
    family: 'Space Grotesk',
    weight: '400',
    style: 'normal',
    url: '/src/assets/fonts/space-grotesk/SpaceGrotesk-Regular.ttf'
  }
];

const FALLBACK_FONTS = [
  'Assistant',
  'Heebo',
  'Rubik',
  'Arial',
  'Tahoma',
  'system-ui',
  'sans-serif'
];

/**
 * Check if a font is available
 */
export const isFontAvailable = (fontFamily: string): boolean => {
  if (typeof document === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return false;

  // Test text
  const testText = 'אבגדהוזחטיכלמנסעפצקרשת';
  
  // Set fallback font
  context.font = '16px monospace';
  const fallbackWidth = context.measureText(testText).width;
  
  // Set test font
  context.font = `16px "${fontFamily}", monospace`;
  const testWidth = context.measureText(testText).width;
  
  return testWidth !== fallbackWidth;
};

/**
 * Load a font with timeout and error handling
 */
export const loadFont = async (config: FontConfig, timeout = 3000): Promise<boolean> => {
  if (typeof document === 'undefined') return false;
  
  try {
    const font = new FontFace(config.family, `url(${config.url})`, {
      weight: config.weight,
      style: config.style,
      display: 'swap'
    });

    // Add timeout
    const loadPromise = font.load();
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Font load timeout')), timeout);
    });

    await Promise.race([loadPromise, timeoutPromise]);
    document.fonts.add(font);
    
    console.log(`✅ Font loaded successfully: ${config.family} ${config.weight}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Failed to load font: ${config.family} ${config.weight}`, error);
    return false;
  }
};

/**
 * Load all critical fonts with fallback
 */
export const loadCriticalFonts = async (): Promise<void> => {
  if (typeof document === 'undefined') return;

  console.log('🔤 Loading critical fonts...');
  
  const loadPromises = CRITICAL_FONTS.map(font => loadFont(font));
  const results = await Promise.allSettled(loadPromises);
  
  const successCount = results.filter(result => 
    result.status === 'fulfilled' && result.value === true
  ).length;
  
  console.log(`🔤 Loaded ${successCount}/${CRITICAL_FONTS.length} critical fonts`);
  
  // If no fonts loaded successfully, ensure fallback fonts are available
  if (successCount === 0) {
    console.log('🔤 Using fallback fonts');
    applyFallbackFonts();
  }
};

/**
 * Apply fallback fonts to CSS variables
 */
export const applyFallbackFonts = (): void => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const fallbackStack = FALLBACK_FONTS.join(', ');
  
  root.style.setProperty('--font-family-primary', fallbackStack);
  root.style.setProperty('--font-family-secondary', fallbackStack);
  
  console.log('🔤 Applied fallback font stack:', fallbackStack);
};

/**
 * Monitor font loading and apply optimizations
 */
export const initFontOptimization = (): void => {
  if (typeof document === 'undefined') return;
  
  // Load critical fonts immediately
  loadCriticalFonts();
  
  // Monitor document fonts
  if ('fonts' in document) {
    document.fonts.addEventListener('loadingdone', () => {
      console.log('🔤 All fonts finished loading');
    });
    
    document.fonts.addEventListener('loadingerror', (event) => {
      console.warn('🔤 Font loading error:', event);
      applyFallbackFonts();
    });
  }
  
  // Fallback timeout - if fonts don't load within 5 seconds, use fallbacks
  setTimeout(() => {
    const primaryFont = getComputedStyle(document.documentElement)
      .getPropertyValue('--font-family-primary');
    
    if (!isFontAvailable('Plex Sans Hebrew') && !isFontAvailable('Assistant')) {
      console.log('🔤 Font loading timeout - applying fallbacks');
      applyFallbackFonts();
    }
  }, 5000);
};

/**
 * Get optimal font stack based on availability
 */
export const getOptimalFontStack = (): string => {
  const availableFonts: string[] = [];
  
  // Check primary fonts
  if (isFontAvailable('Plex Sans Hebrew')) {
    availableFonts.push('Plex Sans Hebrew');
  }
  
  if (isFontAvailable('Assistant')) {
    availableFonts.push('Assistant');
  }
  
  if (isFontAvailable('Heebo')) {
    availableFonts.push('Heebo');
  }
  
  // Add fallbacks
  availableFonts.push(...FALLBACK_FONTS);
  
  return availableFonts.join(', ');
};

/**
 * Preload fonts for better performance
 */
export const preloadFonts = (): void => {
  if (typeof document === 'undefined') return;
  
  CRITICAL_FONTS.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/ttf';
    link.crossOrigin = 'anonymous';
    link.href = font.url;
    
    // Add to head if not already present
    if (!document.querySelector(`link[href="${font.url}"]`)) {
      document.head.appendChild(link);
    }
  });
  
  console.log('🔤 Preloaded critical fonts');
};

export default {
  loadCriticalFonts,
  initFontOptimization,
  preloadFonts,
  getOptimalFontStack,
  isFontAvailable
};