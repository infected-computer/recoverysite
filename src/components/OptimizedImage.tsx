import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  // Performance optimization props
  preload?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  // Responsive image props
  breakpoints?: { [key: string]: number };
  aspectRatio?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes,
  quality = 80,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  preload = false,
  fetchPriority = 'auto',
  breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 },
  aspectRatio,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [srcSet, setSrcSet] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, priority]);

  // Generate optimized image URLs and srcSet
  useEffect(() => {
    if (!isInView && !priority) return;

    const generateOptimizedUrl = (baseUrl: string, width?: number, quality?: number) => {
      if (baseUrl.includes('unsplash.com')) {
        const params = new URLSearchParams();
        params.set('auto', 'format');
        params.set('fit', 'crop');
        params.set('q', (quality || 80).toString());
        if (width) params.set('w', width.toString());
        
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}${params.toString()}`;
      }
      return baseUrl;
    };

    // Generate main image source
    const optimizedSrc = generateOptimizedUrl(src, width, quality);
    setImageSrc(optimizedSrc);

    // Generate srcSet for responsive images
    if (width) {
      const srcSetArray = Object.values(breakpoints)
        .filter(bp => bp <= (width * 2)) // Don't generate sizes larger than 2x the display size
        .map(bp => `${generateOptimizedUrl(src, bp, quality)} ${bp}w`);
      
      // Add the original width
      srcSetArray.push(`${generateOptimizedUrl(src, width, quality)} ${width}w`);
      
      setSrcSet(srcSetArray.join(', '));
    }
  }, [src, width, quality, breakpoints, isInView, priority]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate blur placeholder
  const generateBlurPlaceholder = useCallback(() => {
    if (blurDataURL) return blurDataURL;
    
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'>
        <defs>
          <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' style='stop-color:#f3f4f6;stop-opacity:1' />
            <stop offset='100%' style='stop-color:#e5e7eb;stop-opacity:1' />
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#grad)'/>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [blurDataURL, width, height]);

  // Generate sizes attribute
  const generateSizes = useCallback(() => {
    if (sizes) return sizes;
    
    return Object.entries(breakpoints)
      .sort(([,a], [,b]) => a - b)
      .map(([name, size], index, array) => {
        if (index === array.length - 1) {
          return `${width || size}px`;
        }
        return `(max-width: ${size}px) ${Math.round(size * 0.9)}px`;
      })
      .join(', ');
  }, [sizes, breakpoints, width]);

  // Preload critical images
  useEffect(() => {
    if (preload && imageSrc) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      if (srcSet) link.setAttribute('imagesrcset', srcSet);
      if (sizes) link.setAttribute('imagesizes', generateSizes());
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [preload, imageSrc, srcSet, sizes, generateSizes]);

  const containerStyle = aspectRatio ? { aspectRatio } : {};

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={containerStyle}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && isLoading && !hasError && (
        <img
          src={generateBlurPlaceholder()}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Loading placeholder */}
      {placeholder === 'empty' && isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden="true"
        />
      )}
      
      {/* Error state */}
      {hasError ? (
        <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
          <span className="font-hebrew text-sm">שגיאה בטעינת התמונה</span>
        </div>
      ) : (
        isInView && (
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            srcSet={srcSet || undefined}
            sizes={generateSizes()}
            loading={priority ? 'eager' : loading}
            fetchPriority={fetchPriority}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            decoding="async"
          />
        )
      )}
    </div>
  );
};

export default OptimizedImage;
