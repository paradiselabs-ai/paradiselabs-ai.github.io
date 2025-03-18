import React, { useEffect } from 'react';

/**
 * FontPreloader component - enhances font loading strategy
 * Uses the Font Loading API with proper error handling
 */
const FontPreloader: React.FC = () => {
  useEffect(() => {
    // Check if fonts already exist in the document
    const fontsLoaded = document.fonts.check('1em "Merriweather Sans"') && 
                       document.fonts.check('1em "Open Sans"') &&
                       document.fonts.check('1em "Material Symbols Outlined"');
                       
    if (fontsLoaded) {
      // Fonts already available, add class immediately
      document.documentElement.classList.add('fonts-loaded');
      return;
    }
    
    // Use requestAnimationFrame for better timing relative to rendering
    requestAnimationFrame(() => {
      if ('fonts' in document) {
        // Track loading status
        let loadingAttempted = false;
        
        // Try to load fonts
        Promise.all([
          document.fonts.load('1em "Merriweather Sans"'),
          document.fonts.load('1em "Open Sans"'),
          document.fonts.load('1em "Material Symbols Outlined"')
        ]).then(() => {
          loadingAttempted = true;
          document.documentElement.classList.add('fonts-loaded');
        }).catch(() => {
          loadingAttempted = true;
          // Still add the class for graceful fallback
          document.documentElement.classList.add('fonts-loaded');
        });
        
        // Safety fallback in case Promise.all() never resolves
        setTimeout(() => {
          if (!loadingAttempted) {
            document.documentElement.classList.add('fonts-loaded');
          }
        }, 1000);
      } else {
        // Browser doesn't support the Font Loading API
        // Use type assertion to tell TypeScript that document is the Document type
        (document as Document).documentElement.classList.add('fonts-loaded');
      }
    });
    
    // Cleanup isn't necessary for this effect
  }, []);
  
  return null;
};

export default FontPreloader; 