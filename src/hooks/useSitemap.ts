import { useState, useEffect, useCallback } from 'react';
import { SitemapGenerator, defaultRoutes } from '../utils/sitemapGenerator';
import { RouteConfig, SitemapUrl } from '../types/sitemap';
import { seoConfig } from '../config/seo';

interface UseSitemapOptions {
  baseUrl?: string;
  autoUpdate?: boolean;
  includeImages?: boolean;
}

export const useSitemap = (options: UseSitemapOptions = {}) => {
  const {
    baseUrl = seoConfig.siteUrl,
    autoUpdate = false,
    includeImages = true
  } = options;

  const [urls, setUrls] = useState<SitemapUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  const generator = new SitemapGenerator({
    baseUrl,
    includeImages
  });

  // Add default routes
  generator.addRoutes(defaultRoutes);

  const generateSitemap = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const generatedUrls = await generator.generateUrls();
      setUrls(generatedUrls);
      setLastGenerated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate sitemap';
      setError(errorMessage);
      console.error('Sitemap generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [generator]);

  const addRoute = useCallback((route: RouteConfig) => {
    generator.addRoute(route);
    if (autoUpdate) {
      generateSitemap();
    }
  }, [generator, autoUpdate, generateSitemap]);

  const addRoutes = useCallback((routes: RouteConfig[]) => {
    generator.addRoutes(routes);
    if (autoUpdate) {
      generateSitemap();
    }
  }, [generator, autoUpdate, generateSitemap]);

  const generateXML = useCallback(async (type: 'main' | 'images' | 'mobile' = 'main') => {
    try {
      return await generator.generateXML(type);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate XML';
      setError(errorMessage);
      throw err;
    }
  }, [generator]);

  const downloadSitemap = useCallback(async (type: 'main' | 'images' | 'mobile' = 'main') => {
    try {
      const xml = await generateXML(type);
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `sitemap-${type}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download sitemap:', err);
    }
  }, [generateXML]);

  const validateSitemap = useCallback(() => {
    const issues: string[] = [];

    urls.forEach((url, index) => {
      // Check URL format
      try {
        new URL(url.loc);
      } catch {
        issues.push(`Invalid URL at index ${index}: ${url.loc}`);
      }

      // Check priority range
      if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
        issues.push(`Invalid priority at index ${index}: ${url.priority}`);
      }

      // Check lastmod format
      if (url.lastmod && !isValidDate(url.lastmod)) {
        issues.push(`Invalid lastmod format at index ${index}: ${url.lastmod}`);
      }
    });

    // Check total URL count
    if (urls.length > 50000) {
      issues.push(`Too many URLs: ${urls.length} (max: 50,000)`);
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }, [urls]);

  const getSitemapStats = useCallback(() => {
    const stats = {
      totalUrls: urls.length,
      byPriority: {} as Record<string, number>,
      byChangefreq: {} as Record<string, number>,
      withImages: 0,
      withVideos: 0,
      lastGenerated: lastGenerated?.toISOString() || null
    };

    urls.forEach(url => {
      // Count by priority
      const priority = url.priority?.toFixed(1) || '0.5';
      stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;

      // Count by changefreq
      const changefreq = url.changefreq || 'monthly';
      stats.byChangefreq[changefreq] = (stats.byChangefreq[changefreq] || 0) + 1;

      // Count images and videos
      if (url.images && url.images.length > 0) {
        stats.withImages++;
      }
      if (url.videos && url.videos.length > 0) {
        stats.withVideos++;
      }
    });

    return stats;
  }, [urls, lastGenerated]);

  // Auto-generate on mount
  useEffect(() => {
    generateSitemap();
  }, [generateSitemap]);

  return {
    urls,
    isLoading,
    error,
    lastGenerated,
    generateSitemap,
    addRoute,
    addRoutes,
    generateXML,
    downloadSitemap,
    validateSitemap,
    getSitemapStats
  };
};

// Helper function to validate date format
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// Hook for sitemap submission to search engines
export const useSitemapSubmission = () => {
  const [submissions, setSubmissions] = useState<Record<string, { status: string; date: Date }>>({});

  const submitToGoogle = useCallback(async (sitemapUrl: string) => {
    try {
      // In a real implementation, you would use Google Search Console API
      // For now, we'll just open the submission URL
      const submitUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      window.open(submitUrl, '_blank');
      
      setSubmissions(prev => ({
        ...prev,
        google: { status: 'submitted', date: new Date() }
      }));
    } catch (error) {
      console.error('Failed to submit to Google:', error);
      setSubmissions(prev => ({
        ...prev,
        google: { status: 'error', date: new Date() }
      }));
    }
  }, []);

  const submitToBing = useCallback(async (sitemapUrl: string) => {
    try {
      // In a real implementation, you would use Bing Webmaster Tools API
      const submitUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      window.open(submitUrl, '_blank');
      
      setSubmissions(prev => ({
        ...prev,
        bing: { status: 'submitted', date: new Date() }
      }));
    } catch (error) {
      console.error('Failed to submit to Bing:', error);
      setSubmissions(prev => ({
        ...prev,
        bing: { status: 'error', date: new Date() }
      }));
    }
  }, []);

  return {
    submissions,
    submitToGoogle,
    submitToBing
  };
};