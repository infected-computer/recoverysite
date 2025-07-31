import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: 'blur' | 'empty';
  quality?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  onError,
  placeholder = 'blur',
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string): string => {
    const formats = ['webp', 'jpg'];
    const sizes = [480, 768, 1024, 1280, 1920];
    
    // For now, we'll create a basic srcset
    // In a real implementation, you'd have a service that generates these
    const srcSet = sizes.map(size => {
      const webpSrc = baseSrc.replace(/\.(jpg|jpeg|png)$/i, `.${size}w.webp`);
      return `${webpSrc} ${size}w`;
    }).join(', ');
    
    return srcSet;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate aspect ratio for layout stability
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  // Placeholder styles
  const placeholderStyles = placeholder === 'blur' ? {
    filter: 'blur(10px)',
    transform: 'scale(1.1)',
    transition: 'filter 0.3s ease, transform 0.3s ease'
  } : {};

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-gray-100',
        className
      )}
      style={{
        aspectRatio: aspectRatio ? `${width}/${height}` : undefined,
        paddingBottom: aspectRatio ? `${aspectRatio}%` : undefined
      }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          style={placeholderStyles}
        />
      )}

      {/* Main Image */}
      {isInView && (
        <picture>
          {/* WebP source */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback image */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding={decoding}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              hasError && 'hidden'
            )}
            style={{
              filter: isLoaded ? 'none' : 'blur(10px)',
              transform: isLoaded ? 'scale(1)' : 'scale(1.1)'
            }}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">שגיאה בטעינת התמונה</div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Hook for preloading critical images
export const useImagePreload = (src: string) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);
};

// Utility function to generate optimized image URLs
export const getOptimizedImageUrl = (
  src: string, 
  width?: number, 
  quality: number = 80,
  format: 'webp' | 'jpg' = 'webp'
): string => {
  // In a real implementation, this would integrate with an image optimization service
  // For now, we'll return the original src with some basic transformations
  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());
  params.set('f', format);
  
  return `${src}?${params.toString()}`;
};