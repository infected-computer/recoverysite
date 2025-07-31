import React, { useEffect, useState } from 'react';
import { CoreWebVitalsManager, WebVitalsMetrics, initializeCoreWebVitals } from '../../utils/coreWebVitals';

interface PerformanceMonitorProps {
  /** האם להציג מידע debug */
  showDebugInfo?: boolean;
  /** האם לשלוח דיווחים לאנליטיקס */
  enableReporting?: boolean;
  /** endpoint לשליחת דיווחים */
  reportingEndpoint?: string;
  /** callback לקבלת עדכוני ביצועים */
  onMetricsUpdate?: (metrics: WebVitalsMetrics) => void;
}

/**
 * רכיב לניטור ביצועי Core Web Vitals
 * מציג מידע על ביצועי האתר ומבצע אופטימיזציות אוטומטיות
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showDebugInfo = false,
  enableReporting = true,
  reportingEndpoint,
  onMetricsUpdate
}) => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    tti: null
  });

  const [performanceScore, setPerformanceScore] = useState<any>(null);
  const [manager, setManager] = useState<CoreWebVitalsManager | null>(null);

  useEffect(() => {
    // אתחול Core Web Vitals Manager
    const webVitalsManager = initializeCoreWebVitals({
      enableReporting,
      reportingEndpoint,
      enableOptimizations: true,
      enablePreloading: true,
      enableLazyLoading: true
    });

    if (webVitalsManager) {
      setManager(webVitalsManager);

      // עדכון מטריקות כל 5 שניות
      const interval = setInterval(() => {
        const currentMetrics = webVitalsManager.getMetrics();
        const currentScore = webVitalsManager.getPerformanceScore();
        
        setMetrics(currentMetrics);
        setPerformanceScore(currentScore);
        
        if (onMetricsUpdate) {
          onMetricsUpdate(currentMetrics);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [enableReporting, reportingEndpoint, onMetricsUpdate]);

  if (!showDebugInfo) {
    return null;
  }

  return (
    <div className="performance-monitor">
      <style>{`
        .performance-monitor {
          position: fixed;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 15px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 12px;
          z-index: 10000;
          max-width: 300px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .performance-monitor h3 {
          margin: 0 0 10px 0;
          color: #4CAF50;
          font-size: 14px;
        }
        
        .metric {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          padding: 3px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .metric:last-child {
          border-bottom: none;
        }
        
        .metric-name {
          font-weight: bold;
        }
        
        .metric-value {
          color: #FFD700;
        }
        
        .metric-value.good {
          color: #4CAF50;
        }
        
        .metric-value.needs-improvement {
          color: #FF9800;
        }
        
        .metric-value.poor {
          color: #F44336;
        }
        
        .overall-score {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          font-weight: bold;
        }
        
        .score-circle {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          line-height: 40px;
          text-align: center;
          margin: 5px;
          font-weight: bold;
        }
        
        .score-good {
          background: #4CAF50;
        }
        
        .score-needs-improvement {
          background: #FF9800;
        }
        
        .score-poor {
          background: #F44336;
        }
      `}</style>

      <h3>🚀 Core Web Vitals</h3>
      
      <div className="metric">
        <span className="metric-name">LCP:</span>
        <span className={`metric-value ${performanceScore?.lcp || ''}`}>
          {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'מודד...'}
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-name">FID:</span>
        <span className={`metric-value ${performanceScore?.fid || ''}`}>
          {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : 'מחכה לאינטראקציה'}
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-name">CLS:</span>
        <span className={`metric-value ${performanceScore?.cls || ''}`}>
          {metrics.cls ? metrics.cls.toFixed(3) : 'מודד...'}
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-name">FCP:</span>
        <span className="metric-value">
          {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'מודד...'}
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-name">TTFB:</span>
        <span className="metric-value">
          {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'מודד...'}
        </span>
      </div>

      {performanceScore && (
        <div className="overall-score">
          <div>ציון כללי</div>
          <div 
            className={`score-circle ${
              performanceScore.overall >= 80 ? 'score-good' : 
              performanceScore.overall >= 50 ? 'score-needs-improvement' : 
              'score-poor'
            }`}
          >
            {performanceScore.overall.toFixed(0)}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Hook לשימוש במטריקות ביצועים
 */
export const useWebVitals = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    tti: null
  });

  const [performanceScore, setPerformanceScore] = useState<any>(null);

  useEffect(() => {
    const manager = initializeCoreWebVitals();
    
    if (manager) {
      const interval = setInterval(() => {
        const currentMetrics = manager.getMetrics();
        const currentScore = manager.getPerformanceScore();
        
        setMetrics(currentMetrics);
        setPerformanceScore(currentScore);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return { metrics, performanceScore };
};

/**
 * רכיב להצגת אזהרות ביצועים
 */
interface PerformanceAlertsProps {
  thresholds?: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

export const PerformanceAlerts: React.FC<PerformanceAlertsProps> = ({
  thresholds = { lcp: 2500, fid: 100, cls: 0.1 }
}) => {
  const { metrics } = useWebVitals();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const newAlerts: string[] = [];

    if (metrics.lcp && metrics.lcp > thresholds.lcp) {
      newAlerts.push(`LCP איטי: ${metrics.lcp.toFixed(0)}ms (יעד: <${thresholds.lcp}ms)`);
    }

    if (metrics.fid && metrics.fid > thresholds.fid) {
      newAlerts.push(`FID גבוה: ${metrics.fid.toFixed(0)}ms (יעד: <${thresholds.fid}ms)`);
    }

    if (metrics.cls && metrics.cls > thresholds.cls) {
      newAlerts.push(`CLS גבוה: ${metrics.cls.toFixed(3)} (יעד: <${thresholds.cls})`);
    }

    setAlerts(newAlerts);
  }, [metrics, thresholds]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="performance-alerts">
      <style>{`
        .performance-alerts {
          position: fixed;
          bottom: 10px;
          right: 10px;
          background: #F44336;
          color: white;
          padding: 10px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 10001;
          max-width: 300px;
        }
        
        .alert-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .alert-item {
          margin: 3px 0;
        }
      `}</style>

      <div className="alert-title">⚠️ אזהרות ביצועים</div>
      {alerts.map((alert, index) => (
        <div key={index} className="alert-item">{alert}</div>
      ))}
    </div>
  );
};

/**
 * רכיב לאופטימיזציית תמונות אוטומטית
 */
export const ImageOptimizer: React.FC = () => {
  useEffect(() => {
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Add loading="lazy" for images below the fold
        if (!img.hasAttribute('loading')) {
          const rect = img.getBoundingClientRect();
          if (rect.top > window.innerHeight) {
            img.loading = 'lazy';
          }
        }

        // Add decoding="async"
        if (!img.hasAttribute('decoding')) {
          img.decoding = 'async';
        }

        // Convert to WebP if supported
        if (supportsWebP() && !img.src.includes('.webp')) {
          const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          // Test if WebP version exists
          const testImg = new Image();
          testImg.onload = () => {
            img.src = webpSrc;
          };
          testImg.src = webpSrc;
        }
      });
    };

    // Run optimization after page load
    if (document.readyState === 'complete') {
      optimizeImages();
    } else {
      window.addEventListener('load', optimizeImages);
    }

    // Observe new images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const images = element.querySelectorAll('img');
            images.forEach(img => {
              if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
              }
              if (!img.hasAttribute('decoding')) {
                img.decoding = 'async';
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('load', optimizeImages);
      observer.disconnect();
    };
  }, []);

  return null;
};

/**
 * בדיקת תמיכה ב-WebP
 */
const supportsWebP = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * רכיב לאופטימיזציית פונטים
 */
export const FontOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical fonts
    const criticalFonts = [
      '/fonts/main-regular.woff2',
      '/fonts/main-bold.woff2'
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = fontUrl;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Use font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Main';
        src: url('/fonts/main-regular.woff2') format('woff2');
        font-display: swap;
        font-weight: 400;
      }
      
      @font-face {
        font-family: 'Main';
        src: url('/fonts/main-bold.woff2') format('woff2');
        font-display: swap;
        font-weight: 700;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
};

/**
 * רכיב מקיף לאופטימיזציית ביצועים
 */
interface PerformanceOptimizerProps {
  enableMonitoring?: boolean;
  enableImageOptimization?: boolean;
  enableFontOptimization?: boolean;
  showDebugInfo?: boolean;
  reportingEndpoint?: string;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  enableMonitoring = true,
  enableImageOptimization = true,
  enableFontOptimization = true,
  showDebugInfo = false,
  reportingEndpoint
}) => {
  return (
    <>
      {enableMonitoring && (
        <PerformanceMonitor
          showDebugInfo={showDebugInfo}
          enableReporting={true}
          reportingEndpoint={reportingEndpoint}
        />
      )}
      
      {enableImageOptimization && <ImageOptimizer />}
      {enableFontOptimization && <FontOptimizer />}
      
      <PerformanceAlerts />
    </>
  );
};