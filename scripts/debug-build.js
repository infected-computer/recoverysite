#!/usr/bin/env node

/**
 * Debug script to check build output and identify issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');

/**
 * Check all files in dist directory
 */
function analyzeDistDirectory() {
  console.log('🔍 Analyzing dist directory...');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found!');
    return;
  }
  
  const walkDir = (dir, level = 0) => {
    const files = fs.readdirSync(dir);
    const indent = '  '.repeat(level);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const relativePath = path.relative(DIST_DIR, filePath);
      
      if (stat.isDirectory()) {
        console.log(`${indent}📁 ${file}/`);
        walkDir(filePath, level + 1);
      } else {
        const size = (stat.size / 1024).toFixed(2);
        console.log(`${indent}📄 ${file} (${size}KB)`);
        
        // Check for suspicious files
        if (file.endsWith('.js') && file !== 'sw.js') {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('<!DOCTYPE html>')) {
            console.error(`${indent}❌ ${file} contains HTML instead of JS!`);
          }
        }
        
        if (file.endsWith('.css')) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('<!DOCTYPE html>')) {
            console.error(`${indent}❌ ${file} contains HTML instead of CSS!`);
          }
        }
      }
    });
  };
  
  walkDir(DIST_DIR);
}

/**
 * Check index.html for correct asset references
 */
function checkIndexHtml() {
  console.log('\n🔍 Checking index.html...');
  
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found!');
    return;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // Find all script and link tags
  const scriptMatches = content.match(/<script[^>]*src="([^"]*)"[^>]*>/g) || [];
  const linkMatches = content.match(/<link[^>]*href="([^"]*)"[^>]*>/g) || [];
  
  console.log('📜 Script tags found:');
  scriptMatches.forEach(match => {
    const src = match.match(/src="([^"]*)"/)?.[1];
    if (src) {
      const filePath = path.join(DIST_DIR, src.replace(/^\//, ''));
      const exists = fs.existsSync(filePath);
      console.log(`  ${exists ? '✅' : '❌'} ${src} ${exists ? '' : '(FILE NOT FOUND)'}`);
    }
  });
  
  console.log('🔗 Link tags found:');
  linkMatches.forEach(match => {
    const href = match.match(/href="([^"]*)"/)?.[1];
    if (href && (href.endsWith('.css') || href.startsWith('/assets/'))) {
      const filePath = path.join(DIST_DIR, href.replace(/^\//, ''));
      const exists = fs.existsSync(filePath);
      console.log(`  ${exists ? '✅' : '❌'} ${href} ${exists ? '' : '(FILE NOT FOUND)'}`);
    }
  });
}

/**
 * Generate Netlify-specific debug info
 */
function generateNetlifyDebug() {
  console.log('\n🌐 Generating Netlify debug info...');
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    distExists: fs.existsSync(DIST_DIR),
    indexExists: fs.existsSync(path.join(DIST_DIR, 'index.html')),
    assetsDir: fs.existsSync(path.join(DIST_DIR, 'assets')),
    files: {}
  };
  
  if (fs.existsSync(path.join(DIST_DIR, 'assets'))) {
    const assetsDir = path.join(DIST_DIR, 'assets');
    const files = fs.readdirSync(assetsDir);
    
    files.forEach(file => {
      const filePath = path.join(assetsDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        return;
      }
      const content = fs.readFileSync(filePath, 'utf8');
      
      debugInfo.files[file] = {
        size: stat.size,
        isHtml: content.includes('<!DOCTYPE html>'),
        firstChars: content.substring(0, 100),
        extension: path.extname(file)
      };
    });
  }
  
  // Write debug file
  fs.writeFileSync(
    path.join(DIST_DIR, 'netlify-debug.json'),
    JSON.stringify(debugInfo, null, 2)
  );
  
  console.log('✅ Debug info written to netlify-debug.json');
  
  // Print summary
  console.log('\n📊 Summary:');
  console.log(`- Dist directory exists: ${debugInfo.distExists}`);
  console.log(`- Index.html exists: ${debugInfo.indexExists}`);
  console.log(`- Assets directory exists: ${debugInfo.assetsDir}`);
  console.log(`- Total files in assets: ${Object.keys(debugInfo.files).length}`);
  
  const htmlFiles = Object.entries(debugInfo.files).filter(([_, info]) => info.isHtml);
  if (htmlFiles.length > 0) {
    console.log(`❌ Files containing HTML instead of expected content:`);
    htmlFiles.forEach(([file, _]) => console.log(`  - ${file}`));
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Running build debug analysis...\n');
  
  try {
    analyzeDistDirectory();
    checkIndexHtml();
    generateNetlifyDebug();
    
    console.log('\n✅ Debug analysis completed!');
  } catch (error) {
    console.error('❌ Error during debug analysis:', error);
    process.exit(1);
  }
}

main();