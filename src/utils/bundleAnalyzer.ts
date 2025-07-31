// Bundle analysis and performance monitoring utilities

interface BundleMetrics {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  loadTime: number;
  cacheHitRate: number;
}

interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  loadTime: number;
  cached: boolean;
}

export class BundleAnalyzer {
  private static metrics: BundleMetrics | null = null;
  private static observers: PerformanceObserver[] = [];

  /**
   * Initialize bundle performance monitoring
   */
  static init(): void {
    if (typeof window === 'undefined') return;

    // Monitor resource loading
    this.monitorResourceLoading();
    
    // Monitor navigation timing
    this.monitorNavigationTiming();
    
    // Monitor long tasks
    this.monitorLongTasks();
  }

  /**
   * Monitor resource loading performance
   */
  private static monitorResourceLoading(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.name.includes('.js') || entry.name.includes('.css')) {
          this.trackResourceMetrics(entry as PerformanceResourceTiming);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Resource timing observation not supported:', error);
    }
  }

  /**
   * Monitor navigation timing
   */
  private static monitorNavigationTiming(): void {
    if ('navigation' in performance) {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        dns: navTiming.domainLookupEnd - navTiming.domainLookupStart,
        tcp: navTiming.connectEnd - navTiming.connectStart,
        request: navTiming.responseStart - navTiming.requestStart,
        response: navTiming.responseEnd - navTiming.responseStart,
        dom: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
        load: navTiming.loadEventEnd - navTiming.loadEventStart,
        total: navTiming.loadEventEnd - navTiming.navigationStart
      };

      console.log('Navigation Timing Metrics:', metrics);
    }
  }

  /**
   * Monitor long tasks that block the main thread
   */
  private static monitorLongTasks(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration}ms`, entry);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Long task observation not supported:', error);
    }
  }

  /**
   * Track individual resource metrics
   */
  private static trackResourceMetrics(entry: PerformanceResourceTiming): void {
    const resourceInfo = {
      name: entry.name,
      size: entry.transferSize || 0,
      loadTime: entry.responseEnd - entry.requestStart,
      cached: entry.transferSize === 0 && entry.decodedBodySize > 0,
      type: this.getResourceType(entry.name)
    };

    // Log slow resources
    if (resourceInfo.loadTime > 1000) {
      console.warn(`Slow resource detected: ${resourceInfo.name} (${resourceInfo.loadTime}ms)`);
    }

    // Log large resources
    if (resourceInfo.size > 500000) { // 500KB
      console.warn(`Large resource detected: ${resourceInfo.name} (${(resourceInfo.size / 1024).toFixed(2)}KB)`);
    }
  }

  /**
   * Get resource type from URL
   */
  private static getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.webp')) return 'image';
    return 'other';
  }

  /**
   * Get current bundle metrics
   */
  static getMetrics(): BundleMetrics | null {
    return this.metrics;
  }

  /**
   * Generate bundle performance report
   */
  static generateReport(): string {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsResources = resources.filter(r => r.name.includes('.js'));
    const cssResources = resources.filter(r => r.name.includes('.css'));

    let report = 'Bundle Performance Report\n';
    report += '========================\n\n';

    // JavaScript bundles
    report += 'JavaScript Bundles:\n';
    jsResources.forEach(resource => {
      const size = resource.transferSize || 0;
      const loadTime = resource.responseEnd - resource.requestStart;
      const cached = resource.transferSize === 0 && resource.decodedBodySize > 0;
      
      report += `- ${resource.name.split('/').pop()}: ${(size / 1024).toFixed(2)}KB, ${loadTime.toFixed(2)}ms${cached ? ' (cached)' : ''}\n`;
    });

    // CSS bundles
    report += '\nCSS Bundles:\n';
    cssResources.forEach(resource => {
      const size = resource.transferSize || 0;
      const loadTime = resource.responseEnd - resource.requestStart;
      const cached = resource.transferSize === 0 && resource.decodedBodySize > 0;
      
      report += `- ${resource.name.split('/').pop()}: ${(size / 1024).toFixed(2)}KB, ${loadTime.toFixed(2)}ms${cached ? ' (cached)' : ''}\n`;
    });

    // Total metrics
    const totalSize = [...jsResources, ...cssResources].reduce((sum, r) => sum + (r.transferSize || 0), 0);
    const totalLoadTime = Math.max(...[...jsResources, ...cssResources].map(r => r.responseEnd - r.requestStart));
    
    report += `\nTotal Bundle Size: ${(totalSize / 1024).toFixed(2)}KB\n`;
    report += `Max Load Time: ${totalLoadTime.toFixed(2)}ms\n`;

    return report;
  }

  /**
   * Cleanup observers
   */
  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Preloading utilities
export class ResourcePreloader {
  private static preloadedResources = new Set<string>();

  /**
   * Preload critical resources
   */
  static preloadCriticalResources(resources: string[]): void {
    resources.forEach(resource => {
      if (!this.preloadedResources.has(resource)) {
        this.preloadResource(resource);
        this.preloadedResources.add(resource);
      }
    });
  }

  /**
   * Preload a single resource
   */
  private static preloadResource(href: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    // Determine resource type
    if (href.includes('.js')) {
      link.as = 'script';
    } else if (href.includes('.css')) {
      link.as = 'style';
    } else if (href.includes('.woff') || href.includes('.ttf')) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (href.includes('.png') || href.includes('.jpg') || href.includes('.webp')) {
      link.as = 'image';
    }
    
    link.href = href;
    document.head.appendChild(link);
  }

  /**
   * Prefetch resources for future navigation
   */
  static prefetchResources(resources: string[]): void {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  /**
   * Preconnect to external domains
   */
  static preconnectDomains(domains: string[]): void {
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }
}

// Code splitting utilities
export class CodeSplitter {
  /**
   * Dynamically import a component with loading state
   */
  static async importComponent<T>(
    importFn: () => Promise<{ default: T }>,
    fallback?: T
  ): Promise<T> {
    try {
      const module = await importFn();
      return module.default;
    } catch (error) {
      console.error('Failed to load component:', error);
      if (fallback) {
        return fallback;
      }
      throw error;
    }
  }

  /**
   * Preload a component for faster future loading
   */
  static preloadComponent(importFn: () => Promise<any>): void {
    // Start loading the component but don't wait for it
    importFn().catch(error => {
      console.warn('Failed to preload component:', error);
    });
  }
}

// Initialize bundle analyzer in development
if (import.meta.env.DEV) {
  BundleAnalyzer.init();
}