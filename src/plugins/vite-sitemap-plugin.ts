import { Plugin } from 'vite';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { SitemapGenerator, defaultRoutes } from '../utils/sitemapGenerator';
import { seoConfig } from '../config/seo';

interface SitemapPluginOptions {
  baseUrl?: string;
  outDir?: string;
  routes?: Array<{
    path: string;
    priority?: number;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }>;
  generateRobots?: boolean;
  generateImages?: boolean;
}

export function sitemapPlugin(options: SitemapPluginOptions = {}): Plugin {
  const {
    baseUrl = seoConfig.siteUrl,
    outDir = 'dist',
    routes = [],
    generateRobots = true,
    generateImages = true
  } = options;

  return {
    name: 'vite-sitemap-plugin',
    apply: 'build',
    
    async generateBundle() {
      console.log('🗺️  Generating sitemap...');
      
      try {
        const generator = new SitemapGenerator({
          baseUrl,
          includeImages: generateImages,
          includeVideos: false
        });

        // Add default routes
        generator.addRoutes(defaultRoutes);
        
        // Add custom routes
        if (routes.length > 0) {
          generator.addRoutes(routes.map(route => ({
            path: route.path,
            priority: route.priority || 0.5,
            changefreq: route.changefreq || 'monthly'
          })));
        }

        // Generate main sitemap
        const sitemapXml = await generator.generateXML('main');
        
        // Generate image sitemap if enabled
        let imageSitemapXml = '';
        if (generateImages) {
          imageSitemapXml = await generator.generateXML('images');
        }

        // Generate mobile sitemap
        const mobileSitemapXml = await generator.generateXML('mobile');

        // Generate sitemap index
        const sitemaps = [
          {
            loc: `${baseUrl}/sitemap.xml`,
            lastmod: new Date().toISOString().split('T')[0]
          }
        ];

        if (generateImages) {
          sitemaps.push({
            loc: `${baseUrl}/sitemap-images.xml`,
            lastmod: new Date().toISOString().split('T')[0]
          });
        }

        sitemaps.push({
          loc: `${baseUrl}/sitemap-mobile.xml`,
          lastmod: new Date().toISOString().split('T')[0]
        });

        const sitemapIndexXml = generator.generateSitemapIndex(sitemaps);

        // Generate robots.txt
        let robotsTxt = '';
        if (generateRobots) {
          robotsTxt = generator.generateRobotsTxt();
        }

        // Emit files
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemapXml
        });

        this.emitFile({
          type: 'asset',
          fileName: 'sitemap-index.xml',
          source: sitemapIndexXml
        });

        if (generateImages && imageSitemapXml) {
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap-images.xml',
            source: imageSitemapXml
          });
        }

        this.emitFile({
          type: 'asset',
          fileName: 'sitemap-mobile.xml',
          source: mobileSitemapXml
        });

        if (generateRobots && robotsTxt) {
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: robotsTxt
          });
        }

        console.log('✅ Sitemap generated successfully!');
        console.log(`   - sitemap.xml (main)`);
        console.log(`   - sitemap-index.xml`);
        if (generateImages) console.log(`   - sitemap-images.xml`);
        console.log(`   - sitemap-mobile.xml`);
        if (generateRobots) console.log(`   - robots.txt`);
        
      } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        throw error;
      }
    }
  };
}

// Development server sitemap endpoint
export function createSitemapDevMiddleware(options: SitemapPluginOptions = {}) {
  const {
    baseUrl = 'http://localhost:8080',
    generateImages = true
  } = options;

  return async (req: any, res: any, next: any) => {
    const url = req.url;

    if (url === '/sitemap.xml' || url === '/sitemap-index.xml' || 
        url === '/sitemap-images.xml' || url === '/sitemap-mobile.xml' ||
        url === '/robots.txt') {
      
      try {
        const generator = new SitemapGenerator({
          baseUrl,
          includeImages: generateImages
        });

        generator.addRoutes(defaultRoutes);

        let content = '';
        let contentType = 'application/xml';

        switch (url) {
          case '/sitemap.xml':
            content = await generator.generateXML('main');
            break;
          case '/sitemap-images.xml':
            content = await generator.generateXML('images');
            break;
          case '/sitemap-mobile.xml':
            content = await generator.generateXML('mobile');
            break;
          case '/sitemap-index.xml':
            const sitemaps = [
              { loc: `${baseUrl}/sitemap.xml`, lastmod: new Date().toISOString().split('T')[0] },
              { loc: `${baseUrl}/sitemap-images.xml`, lastmod: new Date().toISOString().split('T')[0] },
              { loc: `${baseUrl}/sitemap-mobile.xml`, lastmod: new Date().toISOString().split('T')[0] }
            ];
            content = generator.generateSitemapIndex(sitemaps);
            break;
          case '/robots.txt':
            content = generator.generateRobotsTxt();
            contentType = 'text/plain';
            break;
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
        res.end(content);
        return;
      } catch (error) {
        console.error('Error generating sitemap in dev mode:', error);
        res.status(500).end('Error generating sitemap');
        return;
      }
    }

    next();
  };
}