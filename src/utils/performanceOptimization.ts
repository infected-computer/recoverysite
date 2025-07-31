/**
 * Performance optimization utilities
 */

// Lazy loading utility for components
export const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(() => 
    importFn().then(module => ({
      default: module.default || module
    }))
  );
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const performanceEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  const navigationEntry = performanceEntries[0];

  if (navigationEntry) {
    const metrics = {
      domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
      loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0
    };

    // Get paint metrics
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-paint') {
        metrics.firstPaint = entry.startTime;
      } else if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = entry.startTime;
      }
    });

    // Get LCP
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint') as PerformancePaintTiming[];
    if (lcpEntries.length > 0) {
      metrics.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
    }

    console.group('📊 Performance Metrics');
    console.log('DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
    console.log('Load Complete:', `${metrics.loadComplete.toFixed(2)}ms`);
    console.log('First Paint:', `${metrics.firstPaint.toFixed(2)}ms`);
    console.log('First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`);
    console.log('Largest Contentful Paint:', `${metrics.largestContentfulPaint.toFixed(2)}ms`);
    console.groupEnd();

    return metrics;
  }
};

// CSS optimization utilities
export const optimizeCSS = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const stylesheets = Array.from(document.styleSheets);
  let totalRules = 0;
  let unusedRules = 0;

  stylesheets.forEach(stylesheet => {
    try {
      const rules = Array.from(stylesheet.cssRules || []);
      totalRules += rules.length;

      rules.forEach(rule => {
        if (rule instanceof CSSStyleRule) {
          try {
            const elements = document.querySelectorAll(rule.selectorText);
            if (elements.length === 0) {
              unusedRules++;
            }
          } catch (e) {
            // Invalid selector, skip
          }
        }
      });
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  });

  console.group('🎨 CSS Optimization');
  console.log('Total CSS Rules:', totalRules);
  console.log('Potentially Unused Rules:', unusedRules);
  console.log('Usage Ratio:', `${((totalRules - unusedRules) / totalRules * 100).toFixed(1)}%`);
  console.groupEnd();

  return {
    totalRules,
    unusedRules,
    usageRatio: (totalRules - unusedRules) / totalRules
  };
};

// Image optimization checker
export const checkImageOptimization = () => {
  const images = Array.from(document.querySelectorAll('img'));
  const issues: string[] = [];
  let totalSize = 0;

  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // Check if image is oversized
    if (naturalWidth > displayWidth * 2 || naturalHeight > displayHeight * 2) {
      issues.push(`Image ${index + 1} is oversized: ${naturalWidth}x${naturalHeight} displayed as ${displayWidth.toFixed(0)}x${displayHeight.toFixed(0)}`);
    }

    // Check for missing lazy loading
    if (!img.loading && img.getBoundingClientRect().top > window.innerHeight) {
      issues.push(`Image ${index + 1} should use lazy loading`);
    }

    // Check for missing alt text
    if (!img.alt && !img.getAttribute('aria-hidden')) {
      issues.push(`Image ${index + 1} is missing alt text`);
    }

    // Estimate file size (rough approximation)
    const estimatedSize = (naturalWidth * naturalHeight * 3) / 1024; // KB
    totalSize += estimatedSize;
  });

  console.group('🖼️ Image Optimization');
  console.log('Total Images:', images.length);
  console.log('Estimated Total Size:', `${totalSize.toFixed(0)}KB`);
  console.log('Issues Found:', issues.length);
  issues.forEach(issue => console.warn(`- ${issue}`));
  console.groupEnd();

  return {
    totalImages: images.length,
    estimatedSize: totalSize,
    issues,
    optimized: issues.length === 0
  };
};

// Font loading optimization
export const optimizeFontLoading = () => {
  const fontFaces = Array.from(document.fonts);
  const loadedFonts = fontFaces.filter(font => font.status === 'loaded');
  const loadingFonts = fontFaces.filter(font => font.status === 'loading');
  const failedFonts = fontFaces.filter(font => font.status === 'error');

  console.group('🔤 Font Loading');
  console.log('Total Fonts:', fontFaces.length);
  console.log('Loaded Fonts:', loadedFonts.length);
  console.log('Loading Fonts:', loadingFonts.length);
  console.log('Failed Fonts:', failedFonts.length);

  if (failedFonts.length > 0) {
    console.warn('Failed to load fonts:', failedFonts.map(f => f.family));
  }

  console.groupEnd();

  return {
    total: fontFaces.length,
    loaded: loadedFonts.length,
    loading: loadingFonts.length,
    failed: failedFonts.length,
    optimized: failedFonts.length === 0
  };
};

// JavaScript bundle analysis
export const analyzeJavaScriptBundle = () => {
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'));

  console.group('📦 JavaScript Bundle Analysis');
  console.log('External Scripts:', scripts.length);
  console.log('Inline Scripts:', inlineScripts.length);

  // Check for duplicate scripts
  const scriptSrcs = scripts.map(script => script.src);
  const uniqueSrcs = [...new Set(scriptSrcs)];
  
  if (scriptSrcs.length !== uniqueSrcs.length) {
    console.warn('Duplicate scripts detected');
  }

  // Check for async/defer attributes
  const asyncScripts = scripts.filter(script => script.async).length;
  const deferScripts = scripts.filter(script => script.defer).length;
  const blockingScripts = scripts.length - asyncScripts - deferScripts;

  console.log('Async Scripts:', asyncScripts);
  console.log('Defer Scripts:', deferScripts);
  console.log('Blocking Scripts:', blockingScripts);

  if (blockingScripts > 0) {
    console.warn(`${blockingScripts} scripts are blocking page rendering`);
  }

  console.groupEnd();

  return {
    external: scripts.length,
    inline: inlineScripts.length,
    async: asyncScripts,
    defer: deferScripts,
    blocking: blockingScripts,
    optimized: blockingScripts === 0
  };
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    
    console.group('💾 Memory Usage');
    console.log('Used JS Heap Size:', `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    console.log('Total JS Heap Size:', `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    console.log('JS Heap Size Limit:', `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`);
    console.groupEnd();

    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };
  }

  return null;
};

// Comprehensive performance audit
export const runPerformanceAudit = () => {
  console.group('🚀 Performance Audit');

  const results = {
    metrics: analyzeBundleSize(),
    css: optimizeCSS(),
    images: checkImageOptimization(),
    fonts: optimizeFontLoading(),
    javascript: analyzeJavaScriptBundle(),
    memory: monitorMemoryUsage(),
    timestamp: new Date().toISOString()
  };

  // Calculate overall performance score
  const scores = [
    results.css?.usageRatio || 0,
    results.images?.optimized ? 1 : 0,
    results.fonts?.optimized ? 1 : 0,
    results.javascript?.optimized ? 1 : 0
  ];

  const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length * 100;

  console.log(`Overall Performance Score: ${overallScore.toFixed(1)}%`);

  if (overallScore < 80) {
    console.warn('⚠️ Performance improvements needed');
  } else {
    console.log('✅ Good performance metrics');
  }

  console.groupEnd();

  return {
    ...results,
    overallScore
  };
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Run audit after component mount
      setTimeout(() => {
        runPerformanceAudit();
      }, 3000);
    }
  }, []);
};

// Critical resource preloader
export const preloadCriticalResources = (resources: string[]) => {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    // Determine resource type
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
      link.as = 'image';
    } else if (resource.match(/\.(woff|woff2|ttf|otf)$/)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
};

// Export for development use
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).performanceAudit = runPerformanceAudit;
  (window as any).preloadResources = preloadCriticalResources;
}