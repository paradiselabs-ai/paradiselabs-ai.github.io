import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Use default React transformation
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
      'Cross-Origin-Resource-Policy': 'same-origin'
    }
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
    rollupOptions: {
      output: {
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
    // Modern JS optimizations
    cssMinify: true,
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
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }
})
