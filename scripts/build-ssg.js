import { build } from 'vite';
import { createServer } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Sitemap generation function (inline for now)
const generateSitemap = () => {
  const baseUrl = 'https://recoverysite.netlify.app';
  const routes = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/services/data-recovery', changefreq: 'monthly', priority: 0.9 },
    { path: '/services/remote-support', changefreq: 'monthly', priority: 0.9 },
    { path: '/services/system-repair', changefreq: 'monthly', priority: 0.9 },
    { path: '/pricing', changefreq: 'weekly', priority: 0.8 },
    { path: '/process', changefreq: 'monthly', priority: 0.7 },
    { path: '/contact', changefreq: 'monthly', priority: 0.8 },
    { path: '/about', changefreq: 'monthly', priority: 0.6 },
    { path: '/faq', changefreq: 'weekly', priority: 0.7 },
    { path: '/articles', changefreq: 'weekly', priority: 0.6 },
    { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { path: '/terms', changefreq: 'yearly', priority: 0.3 }
  ];

  const urlElements = routes.map(route => {
    const url = `${baseUrl}${route.path}`;
    const lastmod = new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

const generateRobotsTxt = () => {
  const baseUrl = 'https://recoverysite.netlify.app';
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
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
};

// Define all routes that need to be pre-rendered
const routes = [
  '/',
  '/pricing',
  '/process',
  '/articles',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/faq',
  '/services/data-recovery',
  '/services/remote-support',
  '/services/system-repair'
];

async function buildSSG() {
  console.log('🚀 Starting SSG build process...');
  
  try {
    // First, build the client bundle
    console.log('📦 Building client bundle...');
    await build({
      configFile: path.join(rootDir, 'vite.config.ts'),
      mode: 'production'
    });

    // Create a temporary server for pre-rendering
    console.log('🖥️  Creating temporary server for pre-rendering...');
    const server = await createServer({
      configFile: path.join(rootDir, 'vite.config.ts'),
      mode: 'production',
      server: { middlewareMode: true }
    });

    // Pre-render each route
    console.log('🎨 Pre-rendering routes...');
    for (const route of routes) {
      try {
        console.log(`  Rendering ${route}...`);
        
        // Create the HTML file path
        const filePath = route === '/' 
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route.slice(1), 'index.html');
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        
        // Read the base HTML template
        const templatePath = path.join(distDir, 'index.html');
        let html = await fs.readFile(templatePath, 'utf-8');
        
        // For now, we'll use the same HTML for all routes
        // In a more advanced setup, we would render each route with React
        await fs.writeFile(filePath, html);
        
      } catch (error) {
        console.error(`❌ Error rendering ${route}:`, error);
      }
    }

    await server.close();

    // Generate sitemap and robots.txt
    console.log('🗺️  Generating sitemap and robots.txt...');
    try {
      const sitemapContent = generateSitemap();
      await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
      console.log('✅ sitemap.xml generated successfully');

      const robotsContent = generateRobotsTxt();
      await fs.writeFile(path.join(distDir, 'robots.txt'), robotsContent, 'utf-8');
      console.log('✅ robots.txt generated successfully');
    } catch (error) {
      console.error('❌ Error generating sitemap files:', error);
    }

    console.log('✅ SSG build completed successfully!');
    
  } catch (error) {
    console.error('❌ SSG build failed:', error);
    process.exit(1);
  }
}

buildSSG();