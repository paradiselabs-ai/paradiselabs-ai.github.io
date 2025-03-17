import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Add preload directives for critical resources and self-hosted fonts
        return html.replace(
          /<\/head>/,
          `
  <!-- Preload critical assets -->
  <link rel="preload" href="/assets/home-C8R50P2G.css" as="style">
  <link rel="preload" href="/assets/vendor-ui-DvB2Xm2x.css" as="style">
  <link rel="preload" href="/images/glue.svg" as="image" type="image/svg+xml">
  
  <!-- Self-hosted fonts with font-display:swap -->
  <link rel="stylesheet" href="/fonts/material-icons.css">
  
  <!-- Font loading optimization -->
  <style>
    /* Font fallbacks ensure text is visible before custom fonts load */
    body, h1, h2, h3, h4, h5, h6, p, span {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
  </style>
  
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
