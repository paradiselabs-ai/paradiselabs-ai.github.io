import React, { memo } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

/**
 * Responsive Image component with WebP support
 * Automatically handles WebP conversion with fallback to original format
 */
export const Image = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw'
}: ImageProps) => {
  // Generate the WebP source path from the original
  // For images from optimized folder, use as is
  // For other images, assume WebP version is available in /images/optimized/
  const getWebPSource = () => {
    if (src.includes('/optimized/')) {
      return src;
    }
    
    // Extract the filename without extension
    const srcPath = src.substring(0, src.lastIndexOf('.')) || src;
    const filename = srcPath.split('/').pop();
    
    // Create path to WebP version
    return `/images/optimized/${filename}.webp`;
  };
  
  return (
    <picture>
      {/* WebP source */}
      <source
        srcSet={getWebPSource()}
        type="image/webp"
        sizes={sizes}
      />
      {/* Original format fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={className}
        onError={(e) => {
          // If WebP fails to load, ensure fallback works
          console.log(`Image load error for ${src}`, e);
        }}
      />
    </picture>
  );
});

export default Image; 