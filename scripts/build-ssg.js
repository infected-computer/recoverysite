import { build } from 'vite';
import { createServer } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Import sitemap generator
const { SitemapGenerator } = await import('../src/utils/sitemapGenerator.ts');

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
      await SitemapGenerator.writeSitemapFiles(distDir);
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