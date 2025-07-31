import { useState, useEffect } from 'react';
import { useWebVitals } from '../hooks/useWebVitals';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import SitemapManager from './SitemapManager';
import { Activity } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Server } from 'lucide-react';
import { MousePointer } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { Globe } from 'lucide-react';

interface PerformanceMonitorProps {
  showDetails?: boolean;
  onClose?: () => void;
}

const PerformanceMonitor = ({ showDetails = false, onClose }: PerformanceMonitorProps) => {
  const { metrics, isSupported, performanceScore, recommendations } = useWebVitals({
    debug: import.meta.env.DEV,
    reportAllChanges: true
  });

  const [isVisible, setIsVisible] = useState(showDetails);
  const [showSitemapManager, setShowSitemapManager] = useState(false);

  useEffect(() => {
    setIsVisible(showDetails);
  }, [showDetails]);

  if (!isSupported || !import.meta.env.DEV) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingIcon = (rating?: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'poor':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'ms') {
      return `${Math.round(value)}ms`;
    }
    if (unit === 'score') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}${unit}`;
  };

  if (!isVisible) {
    // Floating performance indicator
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm border-2"
        >
          <Activity className="h-4 w-4 mr-2" />
          <span className={getScoreColor(performanceScore)}>
            {performanceScore}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <Card className="bg-background/95 backdrop-blur-sm border-2 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              ביצועי האתר
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getScoreColor(performanceScore)}>
                {performanceScore}/100
              </Badge>
              <Button
                onClick={() => {
                  setIsVisible(false);
                  onClose?.();
                }}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Core Web Vitals */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">Core Web Vitals</h4>
            
            {/* LCP */}
            {metrics.lcp && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  <span>LCP</span>
                  {getRatingIcon(metrics.lcp.rating)}
                </div>
                <span>{formatValue(metrics.lcp.value, 'ms')}</span>
              </div>
            )}

            {/* FID */}
            {metrics.fid && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-3 w-3" />
                  <span>FID</span>
                  {getRatingIcon(metrics.fid.rating)}
                </div>
                <span>{formatValue(metrics.fid.value, 'ms')}</span>
              </div>
            )}

            {/* CLS */}
            {metrics.cls && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3" />
                  <span>CLS</span>
                  {getRatingIcon(metrics.cls.rating)}
                </div>
                <span>{formatValue(metrics.cls.value, 'score')}</span>
              </div>
            )}
          </div>

          {/* Additional Metrics */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">מדדים נוספים</h4>
            
            {/* FCP */}
            {metrics.fcp && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  <span>FCP</span>
                  {getRatingIcon(metrics.fcp.rating)}
                </div>
                <span>{formatValue(metrics.fcp.value, 'ms')}</span>
              </div>
            )}

            {/* TTFB */}
            {metrics.ttfb && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Server className="h-3 w-3" />
                  <span>TTFB</span>
                  {getRatingIcon(metrics.ttfb.rating)}
                </div>
                <span>{formatValue(metrics.ttfb.value, 'ms')}</span>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">המלצות לשיפור</h4>
              <div className="space-y-1">
                {recommendations.slice(0, 2).map((rec, index) => (
                  <div key={index} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => window.location.reload()}
              size="sm"
              variant="outline"
              className="text-xs h-7"
            >
              רענן
            </Button>
            <Button
              onClick={() => setShowSitemapManager(true)}
              size="sm"
              variant="outline"
              className="text-xs h-7"
            >
              <Globe className="h-3 w-3 mr-1" />
              Sitemap
            </Button>
            <Button
              onClick={() => {
                console.log('Web Vitals Metrics:', metrics);
                console.log('Performance Score:', performanceScore);
                console.log('Recommendations:', recommendations);
              }}
              size="sm"
              variant="outline"
              className="text-xs h-7"
            >
              לוג
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <SitemapManager 
        isOpen={showSitemapManager} 
        onClose={() => setShowSitemapManager(false)} 
      />
    </div>
  );
};

export default PerformanceMonitor;