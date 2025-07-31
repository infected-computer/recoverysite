import { SitemapUrl, SitemapConfig, RouteConfig, SitemapIndex, SitemapType } from '../types/sitemap';
import { seoConfig } from '../config/seo';

export class SitemapGenerator {
  private config: SitemapConfig;
  private routes: RouteConfig[] = [];

  constructor(config: Partial<SitemapConfig> = {}) {
    this.config = {
      baseUrl: seoConfig.siteUrl,
      defaultChangefreq: 'weekly',
      defaultPriority: 0.5,
      excludePatterns: ['/admin', '/api', '/_next', '/static'],
      includeImages: true,
      includeVideos: false,
      maxUrls: 50000,
      compress: false,
      ...config
    };
  }

  /**
   * Add route configuration
   */
  addRoute(route: RouteConfig): void {
    this.routes.push(route);
  }

  /**
   * Add multiple routes
   */
  addRoutes(routes: RouteConfig[]): void {
    this.routes.push(...routes);
  }

  /**
   * Generate sitemap URLs from routes
   */
  async generateUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [];

    for (const route of this.routes) {
      if (this.shouldExcludeRoute(route.path)) {
        continue;
      }

      if (route.dynamic && route.generator) {
        // Generate dynamic URLs
        try {
          const dynamicUrls = await route.generator();
          urls.push(...dynamicUrls);
        } catch (error) {
          console.error(`Error generating dynamic URLs for route ${route.path}:`, error);
        }
      } else {
        // Static route
        const url: SitemapUrl = {
          loc: this.normalizeUrl(route.path),
          lastmod: route.lastmod || new Date().toISOString().split('T')[0],
          changefreq: route.changefreq || this.config.defaultChangefreq,
          priority: route.priority || this.config.defaultPriority
        };

        urls.push(url);
      }
    }

    return urls.slice(0, this.config.maxUrls);
  }

  /**
   * Generate XML sitemap
   */
  async generateXML(type: SitemapType = 'main'): Promise<string> {
    const urls = await this.generateUrls();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    
    switch (type) {
      case 'images':
        xml += this.generateImageSitemap(urls);
        break;
      case 'videos':
        xml += this.generateVideoSitemap(urls);
        break;
      case 'mobile':
        xml += this.generateMobileSitemap(urls);
        break;
      default:
        xml += this.generateMainSitemap(urls);
    }

    return xml;
  }

  /**
   * Generate main sitemap XML
   */
  private generateMainSitemap(urls: SitemapUrl[]): string {
    let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
    
    if (this.config.includeImages) {
      xml += '\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';
    }
    
    if (this.config.includeVideos) {
      xml += '\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"';
    }
    
    xml += '>\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      
      if (url.lastmod) {
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority !== undefined) {
        xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }

      // Add image information
      if (url.images && this.config.includeImages) {
        url.images.forEach(image => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${this.escapeXml(image.loc)}</image:loc>\n`;
          
          if (image.caption) {
            xml += `      <image:caption>${this.escapeXml(image.caption)}</image:caption>\n`;
          }
          
          if (image.title) {
            xml += `      <image:title>${this.escapeXml(image.title)}</image:title>\n`;
          }
          
          xml += '    </image:image>\n';
        });
      }

      // Add video information
      if (url.videos && this.config.includeVideos) {
        url.videos.forEach(video => {
          xml += '    <video:video>\n';
          xml += `      <video:thumbnail_loc>${this.escapeXml(video.thumbnail_loc)}</video:thumbnail_loc>\n`;
          xml += `      <video:title>${this.escapeXml(video.title)}</video:title>\n`;
          xml += `      <video:description>${this.escapeXml(video.description)}</video:description>\n`;
          
          if (video.content_loc) {
            xml += `      <video:content_loc>${this.escapeXml(video.content_loc)}</video:content_loc>\n`;
          }
          
          if (video.duration) {
            xml += `      <video:duration>${video.duration}</video:duration>\n`;
          }
          
          xml += '    </video:video>\n';
        });
      }

      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Generate image sitemap XML
   */
  private generateImageSitemap(urls: SitemapUrl[]): string {
    const imageUrls = urls.filter(url => url.images && url.images.length > 0);
    
    let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    imageUrls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      
      url.images!.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${this.escapeXml(image.loc)}</image:loc>\n`;
        
        if (image.caption) {
          xml += `      <image:caption>${this.escapeXml(image.caption)}</image:caption>\n`;
        }
        
        xml += '    </image:image>\n';
      });
      
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Generate video sitemap XML
   */
  private generateVideoSitemap(urls: SitemapUrl[]): string {
    const videoUrls = urls.filter(url => url.videos && url.videos.length > 0);
    
    let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    videoUrls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      
      url.videos!.forEach(video => {
        xml += '    <video:video>\n';
        xml += `      <video:thumbnail_loc>${this.escapeXml(video.thumbnail_loc)}</video:thumbnail_loc>\n`;
        xml += `      <video:title>${this.escapeXml(video.title)}</video:title>\n`;
        xml += `      <video:description>${this.escapeXml(video.description)}</video:description>\n`;
        xml += '    </video:video>\n';
      });
      
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Generate mobile sitemap XML
   */
  private generateMobileSitemap(urls: SitemapUrl[]): string {
    let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      xml += '    <mobile:mobile/>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Generate sitemap index XML
   */
  generateSitemapIndex(sitemaps: SitemapIndex['sitemaps']): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    sitemaps.forEach(sitemap => {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.escapeXml(sitemap.loc)}</loc>\n`;
      
      if (sitemap.lastmod) {
        xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
      }
      
      xml += '  </sitemap>\n';
    });

    xml += '</sitemapindex>';
    return xml;
  }

  /**
   * Check if route should be excluded
   */
  private shouldExcludeRoute(path: string): boolean {
    return this.config.excludePatterns.some(pattern => 
      path.includes(pattern) || path.match(new RegExp(pattern))
    );
  }

  /**
   * Normalize URL
   */
  private normalizeUrl(path: string): string {
    const url = path.startsWith('http') ? path : `${this.config.baseUrl}${path}`;
    return url.endsWith('/') && url !== this.config.baseUrl + '/' ? url.slice(0, -1) : url;
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Get robots.txt content
   */
  generateRobotsTxt(): string {
    let robots = '# Robots.txt for דוקטור פיקס\n';
    robots += `# ${this.config.baseUrl}\n\n`;
    
    robots += 'User-agent: *\n';
    robots += 'Allow: /\n';
    
    // Disallow patterns
    this.config.excludePatterns.forEach(pattern => {
      robots += `Disallow: ${pattern}\n`;
    });
    
    robots += '\n# Sitemap location\n';
    robots += `Sitemap: ${this.config.baseUrl}/sitemap.xml\n`;
    
    if (this.config.includeImages) {
      robots += `Sitemap: ${this.config.baseUrl}/sitemap-images.xml\n`;
    }
    
    robots += '\n# Crawl-delay for being nice to servers\n';
    robots += 'Crawl-delay: 1\n\n';
    
    robots += '# Special rules for Google\n';
    robots += 'User-agent: Googlebot\n';
    robots += 'Allow: /\n';
    robots += 'Crawl-delay: 0\n\n';
    
    robots += '# Special rules for Bing\n';
    robots += 'User-agent: Bingbot\n';
    robots += 'Allow: /\n';
    robots += 'Crawl-delay: 1\n';

    return robots;
  }
}

// Default route configurations for the website
export const defaultRoutes: RouteConfig[] = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/pricing',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/process',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    path: '/about',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/articles',
    priority: 0.8,
    changefreq: 'weekly',
    dynamic: true,
    generator: async () => {
      // This would typically fetch from a CMS or database
      // For now, we'll generate static article URLs
      const articles = [
        { id: 1, title: '5-שגיאות-נפוצות-שגורמות-לאובדן-נתונים', lastmod: '2024-01-15' },
        { id: 2, title: 'איך-לבחור-שירות-שחזור-קבצים-מהימן', lastmod: '2024-01-10' },
        { id: 3, title: 'מדריך-למניעת-אובדן-נתונים-חשובים', lastmod: '2024-01-05' },
        { id: 4, title: 'שחזור-קבצים-מדיסק-קשיח-פגום', lastmod: '2024-01-01' },
        { id: 5, title: 'טיפים-לגיבוי-נתונים-יעיל', lastmod: '2023-12-28' }
      ];

      return articles.map(article => ({
        loc: `/article/${article.id}`,
        lastmod: article.lastmod,
        changefreq: 'monthly' as const,
        priority: 0.6
      }));
    }
  },
  {
    path: '/privacy',
    priority: 0.3,
    changefreq: 'yearly'
  },
  {
    path: '/terms',
    priority: 0.3,
    changefreq: 'yearly'
  }
];