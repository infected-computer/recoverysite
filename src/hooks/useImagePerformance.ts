import { useEffect, useState, useCallback } from 'react';

interface ImagePerformanceMetrics {
  loadTime: number;
  size: number;
  format: string;
  isOptimized: boolean;
}

interface UseImagePerformanceOptions {
  trackMetrics?: boolean;
  onMetrics?: (metrics: ImagePerformanceMetrics) => void;
}

export const useImagePerformance = (
  src: string, 
  options: UseImagePerformanceOptions = {}
) => {
  const { trackMetrics = false, onMetrics } = options;
  const [metrics, setMetrics] = useState<ImagePerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const measureImagePerformance = useCallback(async (imageSrc: string) => {
    if (!trackMetrics) return;

    const startTime = performance.now();
    
    try {
      const img = new Image();
      
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      img.src = imageSrc;
      await loadPromise;

      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Try to get image size information
      let size = 0;
      let format = 'unknown';
      
      try {
        const response = await fetch(imageSrc, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');
        
        if (contentLength) {
          size = parseInt(contentLength, 10);
        }
        
        if (contentType) {
          format = contentType.split('/')[1] || 'unknown';
        }
      } catch (error) {
        console.warn('Could not fetch image metadata:', error);
      }

      // Determine if image is optimized
      const isOptimized = checkImageOptimization(imageSrc, format, size);

      const performanceMetrics: ImagePerformanceMetrics = {
        loadTime,
        size,
        format,
        isOptimized
      };

      setMetrics(performanceMetrics);
      onMetrics?.(performanceMetrics);
      
    } catch (error) {
      console.error('Error measuring image performance:', error);
    } finally {
      setIsLoading(false);
    }
  }, [trackMetrics, onMetrics]);

  useEffect(() => {
    if (src && trackMetrics) {
      measureImagePerformance(src);
    }
  }, [src, measureImagePerformance, trackMetrics]);

  return { metrics, isLoading };
};

function checkImageOptimization(src: string, format: string, size: number): boolean {
  // Check if image uses modern formats
  const modernFormats = ['webp', 'avif', 'jpeg'];
  const hasModernFormat = modernFormats.includes(format.toLowerCase());

  // Check if image has optimization parameters (for external services)
  const hasOptimizationParams = src.includes('auto=format') || 
                                src.includes('q=') || 
                                src.includes('quality=');

  // Check if image size is reasonable (less than 500KB for web)
  const reasonableSize = size === 0 || size < 500000;

  return hasModernFormat && (hasOptimizationParams || reasonableSize);
}

// Hook for tracking Core Web Vitals related to images
export const useImageWebVitals = () => {
  const [metrics, setMetrics] = useState<{
    lcp?: number;
    cls?: number;
    fid?: number;
  }>({});

  useEffect(() => {
    // Track Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        element?: Element;
        size?: number;
      };
      
      if (lastEntry && lastEntry.element?.tagName === 'IMG') {
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observation not supported:', error);
    }

    // Track Cumulative Layout Shift (CLS)
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & {
          value?: number;
          hadRecentInput?: boolean;
        };
        
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value || 0;
        }
      }
      
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observation not supported:', error);
    }

    return () => {
      observer.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return metrics;
};

// Hook for preloading critical images
export const useImagePreloader = (images: string[], priority: boolean = false) => {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!priority || images.length === 0) return;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, src]));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // Preload images in parallel
    Promise.allSettled(images.map(preloadImage))
      .then(results => {
        const failed = results.filter(result => result.status === 'rejected');
        if (failed.length > 0) {
          console.warn(`Failed to preload ${failed.length} images`);
        }
      });

  }, [images, priority]);

  return {
    preloadedImages,
    isImagePreloaded: (src: string) => preloadedImages.has(src)
  };
};