export interface RouteConfig {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
}

export interface SitemapConfig {
  baseUrl: string;
  routes: RouteConfig[];
}

export class SitemapGenerator {
  private static baseUrl = 'https://recoverysite.netlify.app';

  static getRoutes(): RouteConfig[] {
    return [
      {
        path: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/services/data-recovery',
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/services/remote-support',
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/services/system-repair',
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/pricing',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/process',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/contact',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/about',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/faq',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/articles',
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/privacy',
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString().split('T')[0]
      },
      {
        path: '/terms',
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString().split('T')[0]
      }
    ];
  }

  static generateSitemap(config?: SitemapConfig): string {
    const routes = config?.routes || this.getRoutes();
    const baseUrl = config?.baseUrl || this.baseUrl;

    const urlElements = routes.map(route => {
      const url = `${baseUrl}${route.path}`;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  static generateRobotsTxt(config?: { baseUrl?: string; sitemapUrl?: string }): string {
    const baseUrl = config?.baseUrl || this.baseUrl;
    const sitemapUrl = config?.sitemapUrl || `${baseUrl}/sitemap.xml`;

    return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /api/

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /favicon.ico

# Sitemap location
Sitemap: ${sitemapUrl}

# Crawl delay (optional)
Crawl-delay: 1`;
  }

  static async writeSitemapFiles(distPath: string): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');

    try {
      // Generate sitemap.xml
      const sitemapContent = this.generateSitemap();
      await fs.writeFile(path.join(distPath, 'sitemap.xml'), sitemapContent, 'utf-8');
      console.log('✅ sitemap.xml generated successfully');

      // Generate robots.txt
      const robotsContent = this.generateRobotsTxt();
      await fs.writeFile(path.join(distPath, 'robots.txt'), robotsContent, 'utf-8');
      console.log('✅ robots.txt generated successfully');

    } catch (error) {
      console.error('❌ Error generating sitemap files:', error);
      throw error;
    }
  }
}