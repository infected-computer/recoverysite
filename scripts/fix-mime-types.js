#!/usr/bin/env node

/**
 * Post-build script to fix MIME type issues in Netlify
 * This script ensures CSS and JS files are properly recognized
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');

/**
 * Check if dist directory exists and has the expected structure
 */
function validateBuild() {
  console.log('🔍 Validating build output...');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found!');
    process.exit(1);
  }
  
  // Check for index.html
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found in dist!');
    process.exit(1);
  }
  
  // Check for assets directory
  const assetsDir = path.join(DIST_DIR, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('❌ Assets directory not found!');
    process.exit(1);
  }
  
  console.log('✅ Build structure validated');
}

/**
 * Find all CSS and JS files in the build
 */
function findAssetFiles() {
  const assetsDir = path.join(DIST_DIR, 'assets');
  
  // Look in subdirectories
  const cssDir = path.join(assetsDir, 'css');
  const jsDir = path.join(assetsDir, 'js');
  
  let cssFiles = [];
  let jsFiles = [];
  
  // Find CSS files
  if (fs.existsSync(cssDir)) {
    cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  }
  
  // Find JS files
  if (fs.existsSync(jsDir)) {
    jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
  }
  
  console.log(`📄 Found ${cssFiles.length} CSS files:`, cssFiles);
  console.log(`📄 Found ${jsFiles.length} JS files:`, jsFiles);
  
  return { cssFiles, jsFiles };
}

/**
 * Create a _headers file specifically for assets
 */
function createAssetsHeaders() {
  const { cssFiles, jsFiles } = findAssetFiles();
  
  let headersContent = '# Generated headers for assets\n\n';
  
  // Add specific headers for each CSS file
  cssFiles.forEach(file => {
    headersContent += `/assets/css/${file}\n`;
    headersContent += '  Content-Type: text/css\n';
    headersContent += '  Cache-Control: public, max-age=31536000, immutable\n\n';
  });
  
  // Add specific headers for each JS file
  jsFiles.forEach(file => {
    headersContent += `/assets/js/${file}\n`;
    headersContent += '  Content-Type: application/javascript\n';
    headersContent += '  Cache-Control: public, max-age=31536000, immutable\n\n';
  });
  
  // Write to dist/_headers (will be merged with public/_headers)
  const headersPath = path.join(DIST_DIR, '_headers_assets');
  fs.writeFileSync(headersPath, headersContent);
  
  console.log('✅ Created asset-specific headers file');
}

/**
 * Verify that CSS and JS files contain actual content
 */
function verifyAssetContent() {
  const { cssFiles, jsFiles } = findAssetFiles();
  
  // Verify CSS files
  cssFiles.forEach(file => {
    const filePath = path.join(DIST_DIR, 'assets', 'css', file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it's actually CSS (should contain CSS rules)
    if (!content.includes('{') || !content.includes('}')) {
      console.warn(`⚠️  ${file} might not contain valid CSS`);
    } else {
      console.log(`✅ ${file} contains valid CSS (${content.length} chars)`);
    }
  });
  
  // Verify JS files
  jsFiles.forEach(file => {
    const filePath = path.join(DIST_DIR, 'assets', 'js', file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it's actually JS (should contain JS code)
    if (content.includes('<!DOCTYPE html>') || content.includes('<html')) {
      console.error(`❌ ${file} contains HTML instead of JavaScript!`);
      process.exit(1);
    } else if (content.length < 100) {
      console.warn(`⚠️  ${file} seems too small (${content.length} chars)`);
    } else {
      console.log(`✅ ${file} contains valid JavaScript (${content.length} chars)`);
    }
  });
}

/**
 * Create a debug info file
 */
function createDebugInfo() {
  const { cssFiles, jsFiles } = findAssetFiles();
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    buildDir: DIST_DIR,
    assets: {
      css: cssFiles.map(file => ({
        name: file,
        size: fs.statSync(path.join(DIST_DIR, 'assets', 'css', file)).size,
        path: `/assets/css/${file}`
      })),
      js: jsFiles.map(file => ({
        name: file,
        size: fs.statSync(path.join(DIST_DIR, 'assets', 'js', file)).size,
        path: `/assets/js/${file}`
      }))
    }
  };
  
  fs.writeFileSync(
    path.join(DIST_DIR, 'build-debug.json'),
    JSON.stringify(debugInfo, null, 2)
  );
  
  console.log('✅ Created debug info file');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Running MIME type fix script...');
  
  try {
    validateBuild();
    createAssetsHeaders();
    verifyAssetContent();
    createDebugInfo();
    
    console.log('✅ MIME type fix completed successfully!');
  } catch (error) {
    console.error('❌ Error fixing MIME types:', error);
    process.exit(1);
  }
}

main();