import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// import { sitemapPlugin, createSitemapDevMiddleware } from "./src/plugins/vite-sitemap-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 5173,
    ...(mode === 'development' && {
      preTransformRequests: true
    })
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),

    // Sitemap plugin disabled temporarily due to import issues
    // mode === 'production' && sitemapPlugin({
    //   baseUrl: 'https://recoverysite.netlify.app',
    //   generateRobots: true,
    //   generateImages: true
    // })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure single React instance
    dedupe: ['react', 'react-dom']
  },
  build: {
    // Enable source maps for production debugging
    sourcemap: mode === 'development',
    
    // Optimize chunk splitting
    rollupOptions: {
      // Ensure single instances of critical dependencies
      external: (id) => {
        // Don't externalize anything, but ensure single instances
        return false;
      },
      output: {
        // Fixed manual chunk splitting - ensure React stays together
        manualChunks: {
          // Keep React core together to avoid context issues
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'react-router': ['react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-toast',
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-select'
          ],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'query-vendor': ['@tanstack/react-query'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
          'utils-vendor': ['clsx', 'class-variance-authority', 'tailwind-merge', 'date-fns']
        },
        
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? 
            chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '') : 
            'chunk';
          return `assets/js/[name]-[hash].js`;
        },
        
        // Optimize asset file names with proper extensions
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          
          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `assets/css/[name]-[hash].css`;
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    
    // Optimize build performance
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.warn'] : [],
        // Additional optimizations for unused code removal
        dead_code: true,
        unused: true,
        keep_fargs: false,
        passes: 2
      },
      format: {
        comments: false
      },
      mangle: {
        safari10: true
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Asset inlining threshold - increase for better performance
    assetsInlineLimit: 8192,
    
    // Image optimization
    assetsInclude: ['**/*.webp', '**/*.avif'],
    
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: true,
    
    // Ensure proper file generation
    emptyOutDir: true,
    
    // Write bundle info for debugging
    reportCompressedSize: false
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react-router-dom',
      '@tanstack/react-query',
      'react-helmet-async'
    ],
    exclude: ['@vite/client', '@vite/env'],
    // Force pre-bundling of React to avoid runtime issues
    force: true
  },
  
  // Performance optimizations
  esbuild: {
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Enable tree shaking
    treeShaking: true,
    // Additional minification
    legalComments: 'none'
  }
}));
