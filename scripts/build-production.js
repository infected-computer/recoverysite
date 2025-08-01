#!/usr/bin/env node

import { execSync } from 'child_process';
import { build } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Ensure PostCSS can find modules
process.env.NODE_PATH = path.join(rootDir, 'node_modules');

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
Disallow: /.netlify/
Disallow: /api/

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /favicon.ico

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
};

async function buildProduction() {
  console.log('🚀 Starting production build process...');
  console.log('📍 Root directory:', rootDir);
  console.log('📍 Node version:', process.version);
  
  try {
    // Step 1: Clean dist directory
    console.log('\n🧹 Cleaning dist directory...');
    await fs.rm(distDir, { recursive: true, force: true });
    
    // Step 2: Install dependencies if needed
    console.log('\n📦 Checking dependencies...');
    try {
      await fs.access(path.join(rootDir, 'node_modules'));
      console.log('✅ Dependencies already installed');
    } catch {
      console.log('📥 Installing dependencies...');
      execSync('npm ci', { stdio: 'inherit', cwd: rootDir });
    }
    
    // Step 3: Run Vite build
    console.log('\n🏗️ Building with Vite...');
    await build({
      configFile: path.join(rootDir, 'vite.config.ts'),
      mode: 'production',
      build: {
        emptyOutDir: true,
        outDir: 'dist'
      }
    });
    
    // Step 4: Generate static files
    console.log('\n📄 Generating static files...');
    
    // Ensure dist directory exists
    await fs.mkdir(distDir, { recursive: true });
    
    // Generate sitemap
    const sitemapContent = generateSitemap();
    await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
    console.log('✅ Generated sitemap.xml');
    
    // Generate robots.txt
    const robotsContent = generateRobotsTxt();
    await fs.writeFile(path.join(distDir, 'robots.txt'), robotsContent, 'utf-8');
    console.log('✅ Generated robots.txt');
    
    // Step 5: Create _headers file for Netlify
    console.log('\n📋 Creating Netlify headers...');
    const headersContent = `# Auto-generated headers for optimal performance
/assets/*.css
  Content-Type: text/css; charset=UTF-8
  Cache-Control: public, max-age=31536000, immutable

/assets/*.js
  Content-Type: application/javascript; charset=UTF-8
  Cache-Control: public, max-age=31536000, immutable

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/images/*
  Cache-Control: public, max-age=2592000

/*.html
  Cache-Control: public, max-age=3600, s-maxage=86400

/
  Cache-Control: public, max-age=3600, s-maxage=86400

/sitemap.xml
  Content-Type: application/xml; charset=UTF-8
  Cache-Control: public, max-age=86400

/robots.txt
  Content-Type: text/plain; charset=UTF-8
  Cache-Control: public, max-age=86400`;
    
    await fs.writeFile(path.join(distDir, '_headers'), headersContent, 'utf-8');
    console.log('✅ Created _headers file');
    
    // Step 6: Verify build output
    console.log('\n🔍 Verifying build output...');
    const distFiles = await fs.readdir(distDir);
    console.log(`📁 Files in dist: ${distFiles.length}`);
    
    const indexExists = await fs.access(path.join(distDir, 'index.html')).then(() => true).catch(() => false);
    if (!indexExists) {
      throw new Error('index.html not found in dist directory!');
    }
    
    const assetsExists = await fs.access(path.join(distDir, 'assets')).then(() => true).catch(() => false);
    if (!assetsExists) {
      throw new Error('assets directory not found in dist!');
    }
    
    console.log('✅ Build verification passed');
    console.log('\n🎉 Production build completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the build
buildProduction();