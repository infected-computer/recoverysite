import { useState, useEffect, useCallback } from 'react';

// Core Web Vitals metrics
export interface WebVitalsMetrics {
  // Largest Contentful Paint
  lcp?: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    element?: string;
  };
  
  // First Input Delay
  fid?: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    eventType?: string;
  };
  
  // Cumulative Layout Shift
  cls?: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    sources?: string[];
  };
  
  // First Contentful Paint
  fcp?: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  };
  
  // Time to First Byte
  ttfb?: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  };
  
  // Interaction to Next Paint (replacing FID)
  inp?: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  };
}

interface WebVitalsOptions {
  reportAllChanges?: boolean;
  onMetric?: (metric: any) => void;
  debug?: boolean;
}

export const useWebVitals = (options: WebVitalsOptions = {}) => {
  const { reportAllChanges = false, onMetric, debug = false } = options;
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});
  const [isSupported, setIsSupported] = useState(true);

  // Rating thresholds based on Google's recommendations
  const getRating = (value: number, thresholds: [number, number]): 'good' | 'needs-improvement' | 'poor' => {
    if (value <= thresholds[0]) return 'good';
    if (value <= thresholds[1]) return 'needs-improvement';
    return 'poor';
  };

  const updateMetric = useCallback((name: keyof WebVitalsMetrics, value: number, additionalData?: any) => {
    let rating: 'good' | 'needs-improvement' | 'poor';
    
    switch (name) {
      case 'lcp':
        rating = getRating(value, [2500, 4000]);
        break;
      case 'fid':
        rating = getRating(value, [100, 300]);
        break;
      case 'cls':
        rating = getRating(value, [0.1, 0.25]);
        break;
      case 'fcp':
        rating = getRating(value, [1800, 3000]);
        break;
      case 'ttfb':
        rating = getRating(value, [800, 1800]);
        break;
      case 'inp':
        rating = getRating(value, [200, 500]);
        break;
      default:
        rating = 'good';
    }

    const metric = {
      value,
      rating,
      ...additionalData
    };

    setMetrics(prev => ({
      ...prev,
      [name]: metric
    }));

    if (debug) {
      console.log(`Web Vital - ${name.toUpperCase()}:`, metric);
    }

    onMetric?.(metric);
  }, [onMetric, debug]);

  useEffect(() => {
    // Check if Performance Observer is supported
    if (typeof PerformanceObserver === 'undefined') {
      setIsSupported(false);
      return;
    }

    const observers: PerformanceObserver[] = [];

    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          element?: Element;
          size?: number;
        };
        
        if (lastEntry) {
          const elementInfo = lastEntry.element ? {
            element: `${lastEntry.element.tagName}${lastEntry.element.id ? '#' + lastEntry.element.id : ''}${lastEntry.element.className ? '.' + lastEntry.element.className.split(' ')[0] : ''}`
          } : {};
          
          updateMetric('lcp', lastEntry.startTime, elementInfo);
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      observers.push(lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & {
            processingStart?: number;
            target?: Element;
          };
          
          if (fidEntry.processingStart) {
            const fid = fidEntry.processingStart - entry.startTime;
            updateMetric('fid', fid, {
              eventType: entry.name
            });
          }
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });
      observers.push(fidObserver);

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsSources: string[] = [];
      
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & {
            value?: number;
            hadRecentInput?: boolean;
            sources?: Array<{ node?: Element }>;
          };
          
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            clsValue += clsEntry.value;
            
            // Track sources of layout shifts
            if (clsEntry.sources) {
              clsEntry.sources.forEach(source => {
                if (source.node) {
                  const element = source.node as Element;
                  const elementDesc = `${element.tagName}${element.id ? '#' + element.id : ''}${element.className ? '.' + element.className.split(' ')[0] : ''}`;
                  if (!clsSources.includes(elementDesc)) {
                    clsSources.push(elementDesc);
                  }
                }
              });
            }
            
            updateMetric('cls', clsValue, { sources: clsSources });
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
      observers.push(clsObserver);

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            updateMetric('fcp', entry.startTime);
          }
        });
      });

      fcpObserver.observe({ entryTypes: ['paint'] });
      observers.push(fcpObserver);

      // Navigation Timing for TTFB
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const navEntry = entry as PerformanceNavigationTiming;
          if (navEntry.responseStart && navEntry.requestStart) {
            const ttfb = navEntry.responseStart - navEntry.requestStart;
            updateMetric('ttfb', ttfb);
          }
        });
      });

      navObserver.observe({ entryTypes: ['navigation'] });
      observers.push(navObserver);

      // Interaction to Next Paint (INP) - newer metric
      try {
        const inpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const inpEntry = entry as PerformanceEntry & {
              processingStart?: number;
              processingEnd?: number;
            };
            
            if (inpEntry.processingStart && inpEntry.processingEnd) {
              const inp = inpEntry.processingEnd - entry.startTime;
              updateMetric('inp', inp);
            }
          });
        });

        inpObserver.observe({ entryTypes: ['event'] });
        observers.push(inpObserver);
      } catch (error) {
        // INP might not be supported in all browsers yet
        if (debug) {
          console.warn('INP observation not supported:', error);
        }
      }

    } catch (error) {
      console.error('Error setting up Web Vitals observers:', error);
      setIsSupported(false);
    }

    // Cleanup function
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [updateMetric, reportAllChanges]);

  // Calculate overall performance score
  const getPerformanceScore = useCallback((): number => {
    const scores: number[] = [];
    
    Object.values(metrics).forEach(metric => {
      if (metric?.rating) {
        switch (metric.rating) {
          case 'good':
            scores.push(100);
            break;
          case 'needs-improvement':
            scores.push(50);
            break;
          case 'poor':
            scores.push(0);
            break;
        }
      }
    });

    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  }, [metrics]);

  // Get recommendations for improvement
  const getRecommendations = useCallback((): string[] => {
    const recommendations: string[] = [];

    if (metrics.lcp?.rating === 'poor') {
      recommendations.push('שפר את זמן הטעינה של התמונות והתוכן הראשי');
    }

    if (metrics.fid?.rating === 'poor') {
      recommendations.push('הפחת את זמן החסימה של JavaScript');
    }

    if (metrics.cls?.rating === 'poor') {
      recommendations.push('הוסף מידות קבועות לתמונות ואלמנטים');
    }

    if (metrics.fcp?.rating === 'poor') {
      recommendations.push('אופטם את הטעינה הראשונית של הדף');
    }

    if (metrics.ttfb?.rating === 'poor') {
      recommendations.push('שפר את זמן התגובה של השרת');
    }

    return recommendations;
  }, [metrics]);

  return {
    metrics,
    isSupported,
    performanceScore: getPerformanceScore(),
    recommendations: getRecommendations()
  };
};

// Hook for monitoring specific elements that might cause CLS
export const useLayoutShiftMonitor = (elementRef: React.RefObject<HTMLElement>) => {
  const [shifts, setShifts] = useState<number>(0);

  useEffect(() => {
    if (!elementRef.current || typeof ResizeObserver === 'undefined') return;

    const element = elementRef.current;
    let lastRect = element.getBoundingClientRect();

    const observer = new ResizeObserver(() => {
      const currentRect = element.getBoundingClientRect();
      
      // Check if position changed (potential layout shift)
      if (lastRect.top !== currentRect.top || lastRect.left !== currentRect.left) {
        setShifts(prev => prev + 1);
      }
      
      lastRect = currentRect;
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef]);

  return shifts;
};