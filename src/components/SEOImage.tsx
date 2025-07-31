import { useState, useCallback } from 'react';

interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const SEOImage = ({
  src,
  alt,
  title,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes,
  srcSet,
  priority = false,
  onLoad,
  onError
}: SEOImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate responsive srcSet if not provided
  const generateSrcSet = useCallback((baseSrc: string) => {
    if (srcSet) return srcSet;
    
    const baseUrl = baseSrc.split('?')[0];
    const params = baseSrc.includes('?') ? baseSrc.split('?')[1] : '';
    
    // Generate different sizes for responsive images
    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => `${baseUrl}?w=${size}&${params} ${size}w`)
      .join(', ');
  }, [srcSet]);

  // Generate sizes attribute if not provided
  const generateSizes = useCallback(() => {
    if (sizes) return sizes;
    
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }, [sizes]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500 text-sm">תמונה לא זמינה</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      loading={priority ? 'eager' : loading}
      srcSet={generateSrcSet(src)}
      sizes={generateSizes()}
      onLoad={handleLoad}
      onError={handleError}
      decoding="async"
      // Add structured data for images
      itemProp="image"
    />
  );
};

export default SEOImage;