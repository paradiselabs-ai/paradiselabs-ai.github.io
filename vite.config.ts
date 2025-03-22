import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

// Custom plugin to fix MIME type issues
const fixMimeTypes = (): Plugin => {
  return {
    name: 'fix-mime-types',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Force correct MIME types for JavaScript modules
        if (req.url?.endsWith('.js') || req.url?.endsWith('.mjs')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (req.url?.endsWith('.ts') || req.url?.endsWith('.tsx')) {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (req.url?.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }
        next();
      });
    }
  };
};

// Custom plugin for efficient cache headers
const efficientCachePolicy = (): Plugin => {
  return {
    name: 'efficient-cache-policy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Skip for HTML requests
        if (req.url?.endsWith('.html') || req.url === '/' || req.url === '/GLUE/') {
          // Set no-cache for HTML to ensure fresh content
          res.setHeader('Cache-Control', 'no-cache');
          next();
          return;
        }

        // Determine appropriate cache policy based on asset type
        const url = req.url || '';
        
        // Immutable assets with hash in filename (JS, CSS with content hash)
        if (/\.[0-9a-f]{8,}\.(?:js|css|woff2?)$/i.test(url)) {
          // Long-term cache with immutable directive
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } 
        // Static assets that change less frequently
        else if (/\.(?:js|css|woff2?|svg|png|jpe?g|gif|webp|avif)$/i.test(url)) {
          // Middle-term cache with validation
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
        // API or dynamic content
        else if (/\/api\//.test(url)) {
          // No cache for API endpoints
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        }
        // Default moderate cache for other static assets
        else {
          res.setHeader('Cache-Control', 'public, max-age=3600');
        }
        
        // Add Vary header for proper cache invalidation
        res.setHeader('Vary', 'Accept-Encoding');
        
        next();
      });
    },
    configurePreviewServer(server) {
      // Same as development server
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        
        // HTML files - no cache
        if (url.endsWith('.html') || url === '/' || url === '/GLUE/') {
          res.setHeader('Cache-Control', 'no-cache');
        }
        // Hashed assets - long cache
        else if (/\.[0-9a-f]{8,}\.(?:js|css|woff2?)$/i.test(url)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
        // Other static assets - moderate cache
        else if (/\.(?:js|css|woff2?|svg|png|jpe?g|gif|webp|avif)$/i.test(url)) {
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
        // API endpoints
        else if (url.includes('/api/')) {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        }
        // Other resources
        else {
          res.setHeader('Cache-Control', 'public, max-age=3600');
        }
        
        res.setHeader('Vary', 'Accept-Encoding');
        next();
      });
    },
    // Generate headers.json for deployment platforms
    closeBundle() {
      // Create a headers file for deployment platforms like Netlify/Vercel
      try {
        const headers = {
          '/*': [
            'X-Content-Type-Options: nosniff',
            'X-Frame-Options: DENY',
            'X-XSS-Protection: 1; mode=block',
            'Referrer-Policy: strict-origin-when-cross-origin',
            'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
            'Content-Security-Policy: default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; font-src \'self\'; img-src \'self\' data:; connect-src \'self\' https://*.supabase.co; frame-ancestors \'none\'',
            'Cross-Origin-Opener-Policy: same-origin',
            'Cross-Origin-Embedder-Policy: require-corp',
            'Cross-Origin-Resource-Policy: same-origin',
            'Permissions-Policy: camera=(), microphone=(), geolocation=()',
            'Vary: Accept-Encoding'
          ],
          '/index.html': [
            'Cache-Control: no-cache'
          ],
          '/assets/*.js': [
            'Cache-Control: public, max-age=31536000, immutable'
          ],
          '/assets/*.css': [
            'Cache-Control: public, max-age=31536000, immutable'
          ],
          '/assets/*.woff2': [
            'Cache-Control: public, max-age=31536000, immutable'
          ],
          '/assets/*.woff': [
            'Cache-Control: public, max-age=31536000, immutable'
          ],
          '/assets/*.png': [
            'Cache-Control: public, max-age=86400, stale-while-revalidate=604800'
          ],
          '/assets/*.jpg': [
            'Cache-Control: public, max-age=86400, stale-while-revalidate=604800'
          ],
          '/assets/*.svg': [
            'Cache-Control: public, max-age=86400, stale-while-revalidate=604800'
          ]
        };
        
        // Create _headers file for Netlify
        try {
          const netlifyHeaders = Object.entries(headers)
            .map(([route, headerList]) => `${route}\n  ${headerList.join('\n  ')}`)
            .join('\n\n');
          
          const distDir = path.resolve(process.cwd(), 'dist');
          if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
          }
          
          fs.writeFileSync(path.resolve(distDir, '_headers'), netlifyHeaders);
          console.log('✅ Generated Netlify _headers file');
        } catch (err) {
          console.error('❌ Failed to generate Netlify _headers file:', err);
        }
        
        // Create vercel.json file with headers config
        try {
          const vercelConfig = {
            headers: Object.entries(headers).map(([source, headersList]) => ({
              source,
              headers: headersList.map(header => {
                const [key, value] = header.split(': ');
                return { key, value };
              })
            }))
          };
          
          const distDir = path.resolve(process.cwd(), 'dist');
          fs.writeFileSync(
            path.resolve(distDir, 'vercel.json'),
            JSON.stringify(vercelConfig, null, 2)
          );
          console.log('✅ Generated Vercel headers configuration');
        } catch (err) {
          console.error('❌ Failed to generate Vercel configuration:', err);
        }
      } catch (err) {
        console.warn('⚠️ Headers generation skipped in this environment:', err);
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Use default React transformation
    fixMimeTypes(), // Apply MIME type fixes
    efficientCachePolicy(), // Apply efficient cache policies
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Inline critical CSS and use system fonts
        return html.replace(
          /<\/head>/,
          `
  <!-- Critical CSS inline -->
  <style>
    /* Critical rendering path optimization */
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    
    /* System font strategy - no external downloads */
    body, button, input, select, textarea {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    
    /* Critical icons styling - ensure icon classes work without render blocking */
    .material-icons, .material-symbols-outlined {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Performance optimization - content-visibility for below-the-fold content */
    .below-fold {
      content-visibility: auto;
      contain-intrinsic-size: 1px 5000px;
    }
    
    /* Initial paint optimization */
    #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  </style>
  
  <!-- Material icons now loaded via npm package import -->
  <!-- <link rel="stylesheet" href="/fonts/material-icons.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="/fonts/material-icons.css"></noscript> -->
  </head>`
        );
      },
    },
  ],
  base: process.env.BASE_URL || '/GLUE/', 
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Content-Type': 'application/javascript; charset=utf-8'
    },
    strictPort: true,
    middlewareMode: false
  },
  test: {
    environment: 'jsdom',
    globals: true,
    exclude: [...configDefaults.exclude, 'e2e/*'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    // Target modern browsers only for smaller bundle size
    target: 'es2020',
    // Enable hashing for cache busting
    cssMinify: true,
    assetsInlineLimit: 4096, // Inline files < 4kb
    // Configure chunk naming based on content hash for efficient caching
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Aggressive code splitting for better performance
        manualChunks: (id) => {
          // Only load what's needed immediately
          if (id.includes('node_modules')) {
            // Essential React - keep small and targeted
            if (id.includes('react/jsx-runtime') || 
                id.includes('react/jsx-dev-runtime') || 
                id.includes('react-dom/client')) {
              return 'react-core';
            }
            
            // React libraries that can load after initial paint
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-full';
            }
            
            // Backend functionality - can load after UI
            if (id.includes('@supabase')) {
              return 'backend';
            }
            
            // UI libraries - load after core UI is visible
            if (id.includes('aos') || id.includes('lucide-react') || id.includes('material')) {
              return 'ui-libs';
            }
            
            // Everything else
            return 'vendor';
          }
          
          // Split app code for better loading priority
          if (id.includes('/src/home/')) {
            // Critical homepage components load first
            if (id.includes('Hero')) {
              return 'home-critical';
            }
            return 'home';
          }
          
          // Routes that can load later
          if (id.includes('/src/workflow/')) {
            return 'workflow';
          }
          if (id.includes('/src/documentation/')) {
            return 'documentation';
          }
          if (id.includes('/src/components/')) {
            return 'components';
          }
          if (id.includes('/src/context/')) {
            return 'state';
          }
        }
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    modulePreload: {
      polyfill: true,
    },
  },
  // Set modern browser targets for better optimization
  esbuild: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    legalComments: 'none',
    treeShaking: true,
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'",
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Vary': 'Accept-Encoding'
    },
    open: true,
    port: 4173
  }
})
