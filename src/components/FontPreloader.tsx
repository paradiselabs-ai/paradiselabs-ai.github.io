import React, { useEffect } from 'react';

/**
 * FontPreloader component - simplified for system fonts and local icons
 * No external font dependencies at all
 */
const FontPreloader: React.FC = () => {
  useEffect(() => {
    // Mark fonts as loaded immediately since we're using system fonts
    document.documentElement.classList.add('system-fonts');
    
    // Add specific class for high-performance mode
    document.documentElement.classList.add('high-performance');
    
    // Load only necessary icons classes to avoid Material Symbols from Google
    const style = document.createElement('style');
    style.textContent = `
      /* Key icon classes from Material Symbols (minimal subset) */
      .material-symbols-outlined {
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
    `;
    document.head.appendChild(style);
    
    // Set a class to indicate that font initialization is complete
    document.documentElement.classList.add('fonts-loaded');
  }, []);
  
  return null;
};

export default FontPreloader; 