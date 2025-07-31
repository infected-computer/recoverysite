#!/bin/bash

echo "🚀 Testing build process..."

# Clean previous build
rm -rf dist/

# Run build
npm run build

# Check if files were created
echo "📁 Checking dist directory:"
ls -la dist/

echo "📁 Checking assets directory:"
ls -la dist/assets/

# Check for JS files specifically
echo "🔍 JavaScript files:"
find dist/ -name "*.js" -type f

# Check for CSS files specifically  
echo "🎨 CSS files:"
find dist/ -name "*.css" -type f

# Run debug script
npm run debug:build

echo "✅ Build test completed!"