/**
 * מערכת מקיפה לאופטימיזציית Core Web Vitals
 * כולל מדידה, אופטימיזציה ודיווח על ביצועי האתר
 */

export interface WebVitalsMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  tti: number | null; // Time to Interactive
}

export interface PerformanceConfig {
  enableReporting: boolean;
  reportingEndpoint?: string;
  enableOptimizations: boolean;
  enablePreloading: boolean;
  enableLazyLoading: boolean;
}

/**
 * מחלקה לניהול Core Web Vitals
 */
export class CoreWebVitalsManager {
  private metrics: WebVitalsMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    tti: null
  };

  private config: PerformanceConfig;
  private observer: PerformanceObserver | null = null;

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableReporting: true,
      enableOptimizations: true,
      enablePreloading: true,
      enableLazyLoading: true,
      ...config
    };

    this.initializeMetrics();
    if (this.config.enableOptimizations) {
      this.applyOptimizations();
    }
  }

  /**
   * אתחול מדידת מטריקות
   */
  private initializeMetrics(): void {
    if (typeof window === 'undefined') return;

    // מדידת LCP (Largest Contentful Paint)
    this.measureLCP();
    
    // מדידת FID (First Input Delay)
    this.measureFID();
    
    // מדידת CLS (Cumulative Layout Shift)
    this.measureCLS();
    
    // מדידת FCP (First Contentful Paint)
    this.measureFCP();
    
    // מדידת TTFB (Time to First Byte)
    this.measureTTFB();
  }

  /**
   * מדידת LCP - Largest Contentful Paint
   */
  private measureLCP(): void {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      if (lastEntry) {
        this.metrics.lcp = lastEntry.startTime;
        this.reportMetric('LCP', lastEntry.startTime);
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }
  }

  /**
   * מדידת FID - First Input Delay
   */
  private measureFID(): void {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          const fid = entry.processingStart - entry.startTime;
          this.metrics.fid = fid;
          this.reportMetric('FID', fid);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement not supported');
    }
  }

  /**
   * מדידת CLS - Cumulative Layout Shift
   */
  private measureCLS(): void {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: any[] = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (sessionValue && 
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            this.metrics.cls = clsValue;
            this.reportMetric('CLS', clsValue);
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }
  }

  /**
   * מדידת FCP - First Contentful Paint
   */
  private measureFCP(): void {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.reportMetric('FCP', entry.startTime);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP measurement not supported');
    }
  }

  /**
   * מדידת TTFB - Time to First Byte
   */
  private measureTTFB(): void {
    if (typeof window === 'undefined' || !window.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0] as any;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      this.metrics.ttfb = ttfb;
      this.reportMetric('TTFB', ttfb);
    }
  }

  /**
   * יישום אופטימיזציות אוטומטיות
   */
  private applyOptimizations(): void {
    if (typeof window === 'undefined') return;

    // אופטימיזציית LCP
    this.optimizeLCP();
    
    // אופטימיזציית FID
    this.optimizeFID();
    
    // אופטימיזציית CLS
    this.optimizeCLS();
    
    // אופטימיזציות כלליות
    this.applyGeneralOptimizations();
  }

  /**
   * אופטימיזציית LCP
   */
  private optimizeLCP(): void {
    // Preload critical resources
    if (this.config.enablePreloading) {
      this.preloadCriticalResources();
    }

    // Optimize images
    this.optimizeImages();

    // Remove render-blocking resources
    this.removeRenderBlockingResources();
  }

  /**
   * אופטימיזציית FID
   */
  private optimizeFID(): void {
    // Break up long tasks
    this.breakUpLongTasks();

    // Optimize third-party code
    this.optimizeThirdPartyCode();

    // Use web workers for heavy computations
    this.setupWebWorkers();
  }

  /**
   * אופטימיזציית CLS
   */
  private optimizeCLS(): void {
    // Set size attributes on images and videos
    this.setSizeAttributesOnMedia();

    // Reserve space for ads and embeds
    this.reserveSpaceForDynamicContent();

    // Avoid inserting content above existing content
    this.preventContentShifts();
  }

  /**
   * Preload משאבים קריטיים
   */
  private preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2' },
      { href: '/css/critical.css', as: 'style' },
      { href: '/images/hero-image.webp', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * אופטימיזציית תמונות
   */
  private optimizeImages(): void {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading="lazy" for non-critical images
      if (!img.hasAttribute('loading') && !this.isCriticalImage(img)) {
        img.loading = 'lazy';
      }

      // Add decoding="async"
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }

      // Ensure width and height attributes
      if (!img.width || !img.height) {
        this.setImageDimensions(img);
      }
    });
  }

  /**
   * בדיקה אם תמונה קריטית
   */
  private isCriticalImage(img: HTMLImageElement): boolean {
    const rect = img.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // תמונה נחשבת קריטית אם היא בחלק העליון של המסך
    return rect.top < viewportHeight;
  }

  /**
   * הגדרת ממדי תמונה
   */
  private setImageDimensions(img: HTMLImageElement): void {
    // ניסיון לקבל ממדים מה-src או מ-CSS
    const computedStyle = window.getComputedStyle(img);
    const width = parseInt(computedStyle.width);
    const height = parseInt(computedStyle.height);
    
    if (width && height) {
      img.width = width;
      img.height = height;
    }
  }

  /**
   * הסרת משאבים חוסמי רינדור
   */
  private removeRenderBlockingResources(): void {
    // Move non-critical CSS to load asynchronously
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    stylesheets.forEach(link => {
      const href = (link as HTMLLinkElement).href;
      
      // Skip critical CSS
      if (href.includes('critical') || href.includes('above-fold')) {
        return;
      }

      // Load non-critical CSS asynchronously
      (link as HTMLLinkElement).media = 'print';
      (link as HTMLLinkElement).onload = function() {
        (this as HTMLLinkElement).media = 'all';
      };
    });
  }

  /**
   * פיצול משימות ארוכות
   */
  private breakUpLongTasks(): void {
    // Use scheduler.postTask if available
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      this.useSchedulerAPI();
    } else {
      // Fallback to setTimeout
      this.useSetTimeoutForTaskBreaking();
    }
  }

  /**
   * שימוש ב-Scheduler API
   */
  private useSchedulerAPI(): void {
    const scheduler = (window as any).scheduler;
    
    // Example of breaking up a long task
    const processLargeDataset = (data: any[]) => {
      const chunkSize = 100;
      let index = 0;

      const processChunk = () => {
        const chunk = data.slice(index, index + chunkSize);
        
        // Process chunk
        chunk.forEach(item => {
          // Process item
        });

        index += chunkSize;

        if (index < data.length) {
          scheduler.postTask(processChunk, { priority: 'background' });
        }
      };

      scheduler.postTask(processChunk, { priority: 'user-blocking' });
    };
  }

  /**
   * שימוש ב-setTimeout לפיצול משימות
   */
  private useSetTimeoutForTaskBreaking(): void {
    const yieldToMain = () => {
      return new Promise(resolve => {
        setTimeout(resolve, 0);
      });
    };

    // Example usage
    window.addEventListener('load', async () => {
      const tasks = this.getInitializationTasks();
      
      for (const task of tasks) {
        await task();
        await yieldToMain();
      }
    });
  }

  /**
   * קבלת משימות אתחול
   */
  private getInitializationTasks(): (() => void)[] {
    return [
      () => this.initializeAnalytics(),
      () => this.initializeChat(),
      () => this.initializeThirdPartyWidgets(),
      () => this.initializeNonCriticalFeatures()
    ];
  }

  /**
   * אופטימיזציית קוד צד שלישי
   */
  private optimizeThirdPartyCode(): void {
    // Lazy load third-party scripts
    this.lazyLoadThirdPartyScripts();
    
    // Use facade for heavy third-party components
    this.setupThirdPartyFacades();
  }

  /**
   * טעינה עצלה של סקריפטים
   */
  private lazyLoadThirdPartyScripts(): void {
    const thirdPartyScripts = [
      { src: 'https://www.google-analytics.com/analytics.js', condition: 'user-interaction' },
      { src: 'https://connect.facebook.net/en_US/fbevents.js', condition: 'idle' },
      { src: 'https://www.googletagmanager.com/gtag/js', condition: 'visible' }
    ];

    thirdPartyScripts.forEach(script => {
      this.loadScriptOnCondition(script.src, script.condition);
    });
  }

  /**
   * טעינת סקריפט לפי תנאי
   */
  private loadScriptOnCondition(src: string, condition: string): void {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    };

    switch (condition) {
      case 'user-interaction':
        ['click', 'scroll', 'keydown'].forEach(event => {
          document.addEventListener(event, loadScript, { once: true });
        });
        break;
      
      case 'idle':
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadScript);
        } else {
          setTimeout(loadScript, 2000);
        }
        break;
      
      case 'visible':
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                loadScript();
                observer.disconnect();
              }
            });
          });
          
          // Observe a trigger element
          const trigger = document.querySelector('.third-party-trigger');
          if (trigger) observer.observe(trigger);
        } else {
          loadScript();
        }
        break;
      
      default:
        loadScript();
    }
  }

  /**
   * הגדרת Web Workers
   */
  private setupWebWorkers(): void {
    if ('Worker' in window) {
      // Create worker for heavy computations
      const workerCode = `
        self.onmessage = function(e) {
          const { type, data } = e.data;
          
          switch (type) {
            case 'processData':
              const result = processLargeDataset(data);
              self.postMessage({ type: 'dataProcessed', result });
              break;
          }
        };
        
        function processLargeDataset(data) {
          // Heavy computation here
          return data.map(item => ({ ...item, processed: true }));
        }
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));

      // Store worker reference
      (window as any).dataWorker = worker;
    }
  }

  /**
   * הגדרת ממדים למדיה
   */
  private setSizeAttributesOnMedia(): void {
    // Images
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      this.setImageDimensions(img as HTMLImageElement);
    });

    // Videos
    const videos = document.querySelectorAll('video:not([width]):not([height])');
    videos.forEach(video => {
      const videoEl = video as HTMLVideoElement;
      if (videoEl.videoWidth && videoEl.videoHeight) {
        videoEl.width = videoEl.videoWidth;
        videoEl.height = videoEl.videoHeight;
      }
    });
  }

  /**
   * שמירת מקום לתוכן דינמי
   */
  private reserveSpaceForDynamicContent(): void {
    // Reserve space for ads
    const adSlots = document.querySelectorAll('.ad-slot');
    adSlots.forEach(slot => {
      if (!slot.getAttribute('style')?.includes('height')) {
        (slot as HTMLElement).style.minHeight = '250px';
      }
    });

    // Reserve space for embeds
    const embeds = document.querySelectorAll('.embed-container');
    embeds.forEach(embed => {
      if (!embed.getAttribute('style')?.includes('height')) {
        (embed as HTMLElement).style.minHeight = '400px';
      }
    });
  }

  /**
   * מניעת זעזועי תוכן
   */
  private preventContentShifts(): void {
    // Use CSS containment
    const containers = document.querySelectorAll('.dynamic-content');
    containers.forEach(container => {
      (container as HTMLElement).style.contain = 'layout style paint';
    });

    // Avoid inserting content above existing content
    this.setupContentInsertionObserver();
  }

  /**
   * הגדרת observer להכנסת תוכן
   */
  private setupContentInsertionObserver(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              
              // Check if content was inserted above the fold
              const rect = element.getBoundingClientRect();
              if (rect.top < window.innerHeight) {
                console.warn('Content inserted above the fold, may cause CLS');
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * אופטימיזציות כלליות
   */
  private applyGeneralOptimizations(): void {
    // Enable passive event listeners
    this.enablePassiveEventListeners();
    
    // Optimize animations
    this.optimizeAnimations();
    
    // Enable compression
    this.enableCompression();
  }

  /**
   * הפעלת passive event listeners
   */
  private enablePassiveEventListeners(): void {
    const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
    
    passiveEvents.forEach(eventType => {
      document.addEventListener(eventType, () => {}, { passive: true });
    });
  }

  /**
   * אופטימיזציית אנימציות
   */
  private optimizeAnimations(): void {
    // Use transform and opacity for animations
    const animatedElements = document.querySelectorAll('.animated');
    
    animatedElements.forEach(element => {
      (element as HTMLElement).style.willChange = 'transform, opacity';
    });

    // Use requestAnimationFrame for smooth animations
    this.setupRAFAnimations();
  }

  /**
   * הגדרת אנימציות עם RAF
   */
  private setupRAFAnimations(): void {
    let ticking = false;

    const updateAnimations = () => {
      // Update animation logic here
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  /**
   * דיווח על מטריקה
   */
  private reportMetric(name: string, value: number): void {
    if (!this.config.enableReporting) return;

    console.log(`${name}: ${value.toFixed(2)}ms`);

    // Send to analytics
    if (this.config.reportingEndpoint) {
      fetch(this.config.reportingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: name,
          value: value,
          url: window.location.href,
          timestamp: Date.now()
        })
      }).catch(console.error);
    }

    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        non_interaction: true
      });
    }
  }

  /**
   * קבלת מטריקות נוכחיות
   */
  public getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  /**
   * קבלת ציון ביצועים
   */
  public getPerformanceScore(): {
    lcp: 'good' | 'needs-improvement' | 'poor' | 'unknown';
    fid: 'good' | 'needs-improvement' | 'poor' | 'unknown';
    cls: 'good' | 'needs-improvement' | 'poor' | 'unknown';
    overall: number;
  } {
    const lcpScore = this.metrics.lcp ? 
      (this.metrics.lcp <= 2500 ? 'good' : this.metrics.lcp <= 4000 ? 'needs-improvement' : 'poor') : 'unknown';
    
    const fidScore = this.metrics.fid ? 
      (this.metrics.fid <= 100 ? 'good' : this.metrics.fid <= 300 ? 'needs-improvement' : 'poor') : 'unknown';
    
    const clsScore = this.metrics.cls ? 
      (this.metrics.cls <= 0.1 ? 'good' : this.metrics.cls <= 0.25 ? 'needs-improvement' : 'poor') : 'unknown';

    const scores = [lcpScore, fidScore, clsScore];
    const goodCount = scores.filter(s => s === 'good').length;
    const overall = (goodCount / 3) * 100;

    return { lcp: lcpScore, fid: fidScore, cls: clsScore, overall };
  }

  /**
   * אתחול פונקציות placeholder
   */
  private initializeAnalytics(): void {
    // Analytics initialization
  }

  private initializeChat(): void {
    // Chat widget initialization
  }

  private initializeThirdPartyWidgets(): void {
    // Third-party widgets initialization
  }

  private initializeNonCriticalFeatures(): void {
    // Non-critical features initialization
  }

  private setupThirdPartyFacades(): void {
    // Third-party facades setup
  }

  private enableCompression(): void {
    // Compression setup
  }
}

/**
 * פונקציות עזר גלובליות
 */

/**
 * אתחול Core Web Vitals Manager
 */
export const initializeCoreWebVitals = (config?: Partial<PerformanceConfig>) => {
  if (typeof window !== 'undefined') {
    const manager = new CoreWebVitalsManager(config);
    (window as any).webVitalsManager = manager;
    return manager;
  }
  return null;
};

/**
 * קבלת מטריקות נוכחיות
 */
export const getCurrentWebVitals = (): WebVitalsMetrics | null => {
  if (typeof window !== 'undefined' && (window as any).webVitalsManager) {
    return (window as any).webVitalsManager.getMetrics();
  }
  return null;
};

/**
 * קבלת ציון ביצועים
 */
export const getPerformanceScore = () => {
  if (typeof window !== 'undefined' && (window as any).webVitalsManager) {
    return (window as any).webVitalsManager.getPerformanceScore();
  }
  return null;
};