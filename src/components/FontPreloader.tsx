import React, { useEffect } from 'react';

/**
 * FontPreloader component - enhances font loading strategy
 * This works alongside HTML-level optimizations
 */
const FontPreloader: React.FC = () => {
  useEffect(() => {
    // Font loading optimization
    if ('fonts' in document) {
      // Load primary fonts with font-display:swap
      Promise.all([
        document.fonts.load('1em "Merriweather Sans"'),
        document.fonts.load('1em "Open Sans"'),
        document.fonts.load('1em "Material Symbols Outlined"')
      ]).then(() => {
        // Add a class to the document when fonts are loaded
        document.documentElement.classList.add('fonts-loaded');
      }).catch(() => {
        // Fallback behavior - still add the class after 2s if loading fails
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
        }, 2000);
      });
    } else {
      // Browser doesn't support the Font Loading API
      // Set fonts-loaded class after a short timeout as fallback
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded');
      }, 500);
    }
  }, []);
  
  return null;
};

export default FontPreloader; 