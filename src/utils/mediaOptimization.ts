// Media optimization utilities
export class MediaOptimizer {
  private static imageCache = new Map<string, HTMLImageElement>();
  private static videoCache = new Map<string, HTMLVideoElement>();

  /**
   * Optimize image loading with WebP support and lazy loading
   */
  static async optimizeImage(
    src: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'webp' | 'jpg' | 'png';
      lazy?: boolean;
    } = {}
  ): Promise<string> {
    const {
      width,
      height,
      quality = 85,
      format = 'webp',
      lazy = true
    } = options;

    // Check if it's an Unsplash image
    if (src.includes('unsplash.com')) {
      const url = new URL(src);
      const params = new URLSearchParams(url.search);
      
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('q', quality.toString());
      params.set('fm', format);
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      
      url.search = params.toString();
      return url.toString();
    }

    return src;
  }

  /**
   * Preload critical images
   */
  static preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<HTMLImageElement> {
    if (this.imageCache.has(src)) {
      return Promise.resolve(this.imageCache.get(src)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      if (priority === 'high') {
        img.fetchPriority = 'high';
      }
      
      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };
      
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Create responsive image srcSet
   */
  static createSrcSet(
    baseSrc: string,
    breakpoints: number[] = [320, 640, 768, 1024, 1280, 1920]
  ): string {
    if (!baseSrc.includes('unsplash.com')) {
      return baseSrc;
    }

    return breakpoints
      .map(width => {
        const optimizedSrc = this.optimizeImage(baseSrc, { width });
        return `${optimizedSrc} ${width}w`;
      })
      .join(', ');
  }

  /**
   * Generate blur placeholder for images
   */
  static generateBlurPlaceholder(
    width: number = 400,
    height: number = 300,
    color1: string = '#f3f4f6',
    color2: string = '#e5e7eb'
  ): string {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'>
        <defs>
          <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' style='stop-color:${color1};stop-opacity:1' />
            <stop offset='100%' style='stop-color:${color2};stop-opacity:1' />
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#grad)'/>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Optimize video loading
   */
  static optimizeVideo(
    src: string,
    options: {
      autoplay?: boolean;
      muted?: boolean;
      loop?: boolean;
      preload?: 'none' | 'metadata' | 'auto';
    } = {}
  ): HTMLVideoElement {
    const {
      autoplay = false,
      muted = true,
      loop = false,
      preload = 'metadata'
    } = options;

    if (this.videoCache.has(src)) {
      return this.videoCache.get(src)!;
    }

    const video = document.createElement('video');
    video.src = src;
    video.autoplay = autoplay;
    video.muted = muted;
    video.loop = loop;
    video.preload = preload;
    video.playsInline = true;

    this.videoCache.set(src, video);
    return video;
  }

  /**
   * Lazy load media with Intersection Observer
   */
  static createLazyLoader(
    callback: () => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, defaultOptions);
  }

  /**
   * Compress image client-side
   */
  static async compressImage(
    file: File,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      format?: string;
    } = {}
  ): Promise<Blob> {
    const {
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
      format = 'image/jpeg'
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          format,
          quality
        );
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Monitor media loading performance
   */
  static monitorMediaPerformance(): void {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'img' || entry.initiatorType === 'video') {
          console.log(`${entry.initiatorType} loaded: ${entry.name} in ${entry.duration.toFixed(2)}ms`);
          
          // Report to analytics if available
          if ('gtag' in window) {
            (window as any).gtag('event', 'media_load_time', {
              event_category: 'Performance',
              event_label: entry.initiatorType,
              value: Math.round(entry.duration)
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  /**
   * Clear media caches to free memory
   */
  static clearCaches(): void {
    this.imageCache.clear();
    this.videoCache.clear();
  }

  /**
   * Get cache statistics
   */
  static getCacheStats(): { images: number; videos: number } {
    return {
      images: this.imageCache.size,
      videos: this.videoCache.size
    };
  }
}

// Initialize media optimization
export const initializeMediaOptimization = (): void => {
  // Monitor performance in development
  if (import.meta.env.DEV) {
    MediaOptimizer.monitorMediaPerformance();
  }

  // Clear caches periodically to prevent memory leaks
  setInterval(() => {
    const stats = MediaOptimizer.getCacheStats();
    if (stats.images > 50 || stats.videos > 10) {
      MediaOptimizer.clearCaches();
      console.log('Media caches cleared to free memory');
    }
  }, 5 * 60 * 1000); // Every 5 minutes
};

// MediaOptimizer is already exported as a class above