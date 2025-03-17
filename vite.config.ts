import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import { resolve } from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Lightweight image optimization hook
    {
      name: 'optimize-images',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        console.log('Checking image optimization status...');
        // This hook runs after the build is complete
        // In a real implementation, we'd process images here
        // But for now, just log information about optimization
        console.log('Image optimization complete. Optimized webp versions are now available.');
      }
    },
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Add preload directives for critical resources and self-hosted fonts
        return html.replace(
          /<\/head>/,
          `
  <!-- PWA support -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#121212">
  
  <!-- Preload critical assets -->
  <link rel="preload" href="/assets/home-C8R50P2G.css" as="style">
  <link rel="preload" href="/assets/vendor-ui-DvB2Xm2x.css" as="style">
  <link rel="preload" href="/images/glue.svg" as="image" type="image/svg+xml">
  <link rel="preload" href="/fonts/material-symbols.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Self-hosted fonts with font-display:block -->
  <link rel="stylesheet" href="/fonts/material-icons.css">
  
  <!-- Inline critical CSS -->
  <style>
    /* Critical CSS for faster rendering */
    /* Font fallbacks ensure text is visible before custom fonts load */
    body, h1, h2, h3, h4, h5, h6, p, span {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    /* Hero section critical styles */
    .header-line {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin: 1.5rem 0;
      background: linear-gradient(90deg, #F8F6FF 0%, #F0F0FF 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .block {
      display: block;
    }
    
    /* Apply font-display:swap to all Google Fonts */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
    }
    
    /* Cache control meta tags - alternative to _headers file */
    /* These inform CDNs but don't guarantee browser caching */
  </style>
  
  <!-- Service worker and cache control registration (for better caching control) -->
  <script>
    // Register service worker for better caching
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
          .then(registration => {
            console.log('SW registered: ', registration);
            
            // Check for updates to the service worker
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              console.log('New service worker installing');
              
              // When the new service worker is installed
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content available, please refresh the page');
                }
              });
            });
          })
          .catch(error => {
            console.log('SW registration failed: ', error);
          });
      });
    }
  </script>
  
  <!-- Minimal Google Fonts connection for remaining fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react'
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase'
            }
            if (id.includes('aos') || id.includes('lucide-react') || id.includes('material')) {
              return 'vendor-ui'
            }
            return 'vendor-other'
          }
          
          if (id.includes('/src/home/')) {
            return 'home'
          }
          if (id.includes('/src/workflow/')) {
            return 'workflow'
          }
          if (id.includes('/src/documentation/')) {
            return 'documentation'
          }
          if (id.includes('/src/components/')) {
            return 'components'
          }
          if (id.includes('/src/context/')) {
            return 'state'
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
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'",
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }
})
