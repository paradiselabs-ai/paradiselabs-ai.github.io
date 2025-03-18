import React, { useEffect } from 'react';

/**
 * FontPreloader component - simplified for system fonts
 * No need to load external fonts, just apply system font styles
 */
const FontPreloader: React.FC = () => {
  useEffect(() => {
    // Mark fonts as loaded immediately since we're using system fonts
    document.documentElement.classList.add('system-fonts');
    
    // Add specific class for high-performance mode
    document.documentElement.classList.add('high-performance');
    
    // Set a class to indicate that font initialization is complete
    document.documentElement.classList.add('fonts-loaded');
  }, []);
  
  return null;
};

export default FontPreloader; 