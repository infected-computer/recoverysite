// Layout Shift Prevention Utilities

/**
 * Calculate aspect ratio from dimensions
 */
export const calculateAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

/**
 * Generate CSS for aspect ratio container
 */
export const getAspectRatioStyles = (aspectRatio: string) => ({
  aspectRatio,
  width: '100%',
  height: 'auto'
});

/**
 * Preload fonts to prevent layout shifts
 */
export const preloadFonts = (fonts: Array<{ family: string; weight?: string; style?: string }>) => {
  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    // Construct Google Fonts URL
    const family = font.family.replace(/\s+/g, '+');
    const weight = font.weight || '400';
    const style = font.style || 'normal';
    
    link.href = `https://fonts.gstatic.com/s/${family.toLowerCase()}/v1/${family}-${weight}-${style}.woff2`;
    
    document.head.appendChild(link);
  });
};

/**
 * Reserve space for dynamic content
 */
export class SpaceReserver {
  private static reservedElements = new Map<string, HTMLElement>();

  /**
   * Reserve space for an element that will load dynamically
   */
  static reserveSpace(
    containerId: string,
    dimensions: { width?: number; height?: number; aspectRatio?: string }
  ): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    const placeholder = document.createElement('div');
    placeholder.className = 'space-reservoir';
    placeholder.style.visibility = 'hidden';
    placeholder.style.pointerEvents = 'none';
    
    if (dimensions.aspectRatio) {
      placeholder.style.aspectRatio = dimensions.aspectRatio;
      placeholder.style.width = '100%';
    } else {
      if (dimensions.width) placeholder.style.width = `${dimensions.width}px`;
      if (dimensions.height) placeholder.style.height = `${dimensions.height}px`;
    }

    container.appendChild(placeholder);
    this.reservedElements.set(containerId, placeholder);
  }

  /**
   * Release reserved space when content loads
   */
  static releaseSpace(containerId: string): void {
    const placeholder = this.reservedElements.get(containerId);
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
      this.reservedElements.delete(containerId);
    }
  }

  /**
   * Update reserved space dimensions
   */
  static updateReservedSpace(
    containerId: string,
    dimensions: { width?: number; height?: number; aspectRatio?: string }
  ): void {
    const placeholder = this.reservedElements.get(containerId);
    if (!placeholder) return;

    if (dimensions.aspectRatio) {
      placeholder.style.aspectRatio = dimensions.aspectRatio;
      placeholder.style.width = '100%';
      placeholder.style.height = 'auto';
    } else {
      if (dimensions.width) placeholder.style.width = `${dimensions.width}px`;
      if (dimensions.height) placeholder.style.height = `${dimensions.height}px`;
    }
  }
}

/**
 * Optimize images to prevent layout shifts
 */
export const optimizeImageForCLS = (
  img: HTMLImageElement,
  options: {
    width?: number;
    height?: number;
    aspectRatio?: string;
    placeholder?: string;
  } = {}
): void => {
  const { width, height, aspectRatio, placeholder } = options;

  // Set dimensions to prevent layout shift
  if (aspectRatio) {
    img.style.aspectRatio = aspectRatio;
    img.style.width = '100%';
    img.style.height = 'auto';
  } else if (width && height) {
    img.width = width;
    img.height = height;
  }

  // Add loading placeholder
  if (placeholder) {
    img.style.backgroundColor = placeholder;
  }

  // Ensure image doesn't cause layout shift when loading
  img.style.display = 'block';
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
};

/**
 * Monitor and prevent layout shifts in a container
 */
export class LayoutShiftMonitor {
  private observer: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private shifts: number = 0;
  private onShift?: (shifts: number) => void;

  constructor(
    element: HTMLElement,
    options: {
      onShift?: (shifts: number) => void;
      threshold?: number;
    } = {}
  ) {
    this.onShift = options.onShift;
    this.startMonitoring(element);
  }

  private startMonitoring(element: HTMLElement): void {
    let lastRect = element.getBoundingClientRect();

    // Monitor size changes
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        const currentRect = element.getBoundingClientRect();
        
        // Check for position changes (potential layout shift)
        if (
          Math.abs(lastRect.top - currentRect.top) > 1 ||
          Math.abs(lastRect.left - currentRect.left) > 1
        ) {
          this.shifts++;
          this.onShift?.(this.shifts);
          
          if (import.meta.env.DEV) {
            console.warn(`Layout shift detected in element:`, element, {
              oldPosition: { top: lastRect.top, left: lastRect.left },
              newPosition: { top: currentRect.top, left: currentRect.left },
              totalShifts: this.shifts
            });
          }
        }
        
        lastRect = currentRect;
      });

      this.observer.observe(element);
    }

    // Monitor DOM changes that might cause shifts
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if added nodes might cause layout shifts
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                
                // Warn about elements that commonly cause layout shifts
                if (
                  element.tagName === 'IMG' ||
                  element.tagName === 'IFRAME' ||
                  element.tagName === 'VIDEO'
                ) {
                  if (import.meta.env.DEV) {
                    console.warn(`Element added that might cause layout shift:`, element);
                  }
                }
              }
            });
          }
        });
      });

      this.mutationObserver.observe(element, {
        childList: true,
        subtree: true
      });
    }
  }

  getShiftCount(): number {
    return this.shifts;
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.mutationObserver?.disconnect();
  }
}

/**
 * CSS-in-JS helper for preventing layout shifts
 */
export const layoutShiftPreventionStyles = {
  // Container for images with known aspect ratio
  imageContainer: (aspectRatio: string) => ({
    position: 'relative' as const,
    overflow: 'hidden' as const,
    aspectRatio,
    width: '100%',
    height: 'auto'
  }),

  // Image that fills container without causing shifts
  responsiveImage: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'opacity 0.3s ease'
  },

  // Skeleton loader to prevent shifts
  skeleton: {
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  },

  // Container for dynamic content
  dynamicContainer: {
    minHeight: '200px', // Prevent collapse
    transition: 'min-height 0.3s ease'
  }
};

/**
 * Inject critical CSS to prevent layout shifts
 */
export const injectCriticalCSS = (): void => {
  const css = `
    /* Prevent layout shifts from images */
    img:not([width]):not([height]) {
      aspect-ratio: attr(width) / attr(height);
    }
    
    /* Skeleton animation */
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
    
    /* Prevent font loading shifts */
    body {
      font-display: swap;
    }
    
    /* Prevent iframe shifts */
    iframe {
      width: 100%;
      height: auto;
      aspect-ratio: 16/9;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};