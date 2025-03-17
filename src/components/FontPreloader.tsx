import React from 'react';

/**
 * FontPreloader component that optimizes font loading with font-display:swap
 * to prevent invisible text during font loading.
 */
const FontPreloader: React.FC = () => {
  return (
    <>
      {/* Preconnect to Google Fonts domain to establish early connection */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Add font-display:swap for better font loading */}
      <style>
        {`
          /* Apply font-display:swap to ensure text remains visible during font loading */
          @font-face {
            font-family: 'Material Symbols Outlined';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }
        `}
      </style>
    </>
  );
};

export default FontPreloader; 