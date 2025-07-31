import React, { useState, useRef, useEffect } from 'react';

export interface OptimizedImageProps {
  /** מקור התמונה */
  src: string;
  /** טקסט חלופי לנגישות ו-SEO */
  alt: string;
  /** רוחב התמונה */
  width?: number;
  /** גובה התמונה */
  height?: number;
  /** מחלקות CSS */
  className?: string;
  /** סגנון CSS */
  style?: React.CSSProperties;
  /** האם לטעון בעצלנות */
  lazy?: boolean;
  /** איכות התמונה (1-100) */
  quality?: number;
  /** פורמט התמונה המועדף */
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'auto';
  /** גדלים responsive */
  sizes?: string;
  /** נקודות שבירה לתמונות responsive */
  breakpoints?: number[];
  /** תמונת placeholder */
  placeholder?: string;
  /** צבע רקע לplaceholder */
  placeholderColor?: string;
  /** האם להציג blur effect בטעינה */
  blurPlaceholder?: boolean;
  /** callback כשהתמונה נטענת */
  onLoad?: () => void;
  /** callback כשיש שגיאה בטעינה */
  onError?: () => void;
  /** עדיפות טעינה */
  priority?: 'high' | 'low' | 'auto';
}

/**
 * רכיב תמונה מותאם לביצועים ו-SEO
 * כולל אופטימיזציות אוטומטיות, lazy loading ותמיכה בפורמטים מתקדמים
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  lazy = true,
  quality = 85,
  format = 'auto',
  sizes,
  breakpoints = [640, 768, 1024, 1280, 1536],
  placeholder,
  placeholderColor = '#f0f0f0',
  blurPlaceholder = true,
  onLoad,
  onError,
  priority = 'auto'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer לlazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px' // טען תמונה 50px לפני שהיא נכנסת לתצוגה
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // יצירת URL מותאם
  const generateOptimizedUrl = (
    baseSrc: string,
    targetWidth?: number,
    targetFormat?: string
  ): string => {
    const url = new URL(baseSrc, window.location.origin);
    const params = new URLSearchParams();

    if (targetWidth) params.set('w', targetWidth.toString());
    if (quality !== 85) params.set('q', quality.toString());
    if (targetFormat && targetFormat !== 'auto') params.set('f', targetFormat);

    const queryString = params.toString();
    return queryString ? `${url.pathname}?${queryString}` : url.pathname;
  };

  // בחירת פורמט אופטימלי
  const getOptimalFormat = (): string => {
    if (format !== 'auto') return format;

    // בדיקת תמיכה בפורמטים מתקדמים
    if (supportsAVIF()) return 'avif';
    if (supportsWebP()) return 'webp';
    
    // fallback לפורמט מקורי
    const extension = src.split('.').pop()?.toLowerCase();
    return extension === 'png' ? 'png' : 'jpg';
  };

  // יצירת srcSet לתמונות responsive
  const generateSrcSet = (): string => {
    const optimalFormat = getOptimalFormat();
    
    return breakpoints
      .map(bp => `${generateOptimizedUrl(src, bp, optimalFormat)} ${bp}w`)
      .join(', ');
  };

  // עדכון src כשהתמונה נכנסת לתצוגה
  useEffect(() => {
    if (isInView && !currentSrc) {
      const optimalFormat = getOptimalFormat();
      const optimizedSrc = generateOptimizedUrl(src, width, optimalFormat);
      setCurrentSrc(optimizedSrc);
    }
  }, [isInView, src, width, quality, format]);

  // טיפול בטעינת התמונה
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // טיפול בשגיאת טעינה
  const handleError = () => {
    setHasError(true);
    
    // נסה לטעון את התמונה המקורית
    if (currentSrc !== src) {
      setCurrentSrc(src);
      setHasError(false);
    } else if (onError) {
      onError();
    }
  };

  // יצירת placeholder
  const renderPlaceholder = () => {
    if (placeholder) {
      return (
        <img
          src={placeholder}
          alt=""
          className="placeholder-image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: blurPlaceholder ? 'blur(10px)' : 'none',
            transition: 'opacity 0.3s ease'
          }}
        />
      );
    }

    return (
      <div
        className="placeholder-color"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: placeholderColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '14px'
        }}
      >
        {hasError ? '❌ שגיאה בטעינה' : '📷 טוען...'}
      </div>
    );
  };

  // חישוב loading attribute
  const getLoadingAttribute = (): 'lazy' | 'eager' => {
    if (priority === 'high') return 'eager';
    if (priority === 'low') return 'lazy';
    
    // auto: eager לתמונות above-the-fold
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight ? 'eager' : 'lazy';
    }
    
    return lazy ? 'lazy' : 'eager';
  };

  // חישוב fetchpriority attribute
  const getFetchPriority = (): 'high' | 'low' | 'auto' => {
    if (priority === 'high') return 'high';
    if (priority === 'low') return 'low';
    return 'auto';
  };

  return (
    <div
      ref={containerRef}
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        ...style
      }}
    >
      {/* Placeholder */}
      {!isLoaded && renderPlaceholder()}

      {/* תמונה ראשית */}
      {isInView && currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          srcSet={breakpoints.length > 0 ? generateSrcSet() : undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={getLoadingAttribute()}
          decoding="async"
          fetchPriority={getFetchPriority()}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* CSS לאנימציות */}
      <style jsx>{`
        .optimized-image-container {
          overflow: hidden;
        }
        
        .placeholder-image {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

/**
 * בדיקת תמיכה ב-WebP
 */
const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * בדיקת תמיכה ב-AVIF
 */
const supportsAVIF = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
};

/**
 * רכיב תמונה עם Picture element לתמיכה מלאה בפורמטים
 */
interface PictureImageProps extends OptimizedImageProps {
  /** פורמטים נוספים לנסות */
  fallbackFormats?: string[];
}

export const PictureImage: React.FC<PictureImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  quality = 85,
  breakpoints = [640, 768, 1024, 1280, 1536],
  fallbackFormats = ['avif', 'webp'],
  ...props
}) => {
  const generateSourceSet = (format: string) => {
    return breakpoints
      .map(bp => {
        const url = new URL(src, window.location.origin);
        const params = new URLSearchParams();
        params.set('w', bp.toString());
        params.set('q', quality.toString());
        params.set('f', format);
        return `${url.pathname}?${params.toString()} ${bp}w`;
      })
      .join(', ');
  };

  return (
    <picture className={className} style={style}>
      {/* מקורות בפורמטים מתקדמים */}
      {fallbackFormats.map(format => (
        <source
          key={format}
          srcSet={generateSourceSet(format)}
          type={`image/${format}`}
          sizes={props.sizes}
        />
      ))}
      
      {/* תמונה fallback */}
      <OptimizedImage
        {...props}
        src={src}
        alt={alt}
        width={width}
        height={height}
        format="jpg"
      />
    </picture>
  );
};

/**
 * Hook לאופטימיזציית תמונות קיימות בדף
 */
export const useImageOptimization = () => {
  useEffect(() => {
    const optimizeExistingImages = () => {
      const images = document.querySelectorAll('img:not([data-optimized])');
      
      images.forEach((img) => {
        const imageEl = img as HTMLImageElement;
        
        // הוסף loading="lazy" לתמונות שלא above-the-fold
        if (!imageEl.hasAttribute('loading')) {
          const rect = imageEl.getBoundingClientRect();
          imageEl.loading = rect.top > window.innerHeight ? 'lazy' : 'eager';
        }
        
        // הוסף decoding="async"
        if (!imageEl.hasAttribute('decoding')) {
          imageEl.decoding = 'async';
        }
        
        // הוסף fetchpriority
        if (!imageEl.hasAttribute('fetchpriority')) {
          const rect = imageEl.getBoundingClientRect();
          imageEl.setAttribute('fetchpriority', rect.top < window.innerHeight ? 'high' : 'auto');
        }
        
        // וודא שיש alt text
        if (!imageEl.alt) {
          console.warn('תמונה ללא alt text:', imageEl.src);
          imageEl.alt = 'תמונה'; // alt text בסיסי
        }
        
        // סמן כמותאם
        imageEl.setAttribute('data-optimized', 'true');
      });
    };

    // הרץ אופטימיזציה אחרי טעינת הדף
    if (document.readyState === 'complete') {
      optimizeExistingImages();
    } else {
      window.addEventListener('load', optimizeExistingImages);
    }

    // צפה בתמונות חדשות
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const newImages = element.querySelectorAll('img:not([data-optimized])');
            
            newImages.forEach((img) => {
              const imageEl = img as HTMLImageElement;
              
              if (!imageEl.hasAttribute('loading')) {
                imageEl.loading = 'lazy';
              }
              if (!imageEl.hasAttribute('decoding')) {
                imageEl.decoding = 'async';
              }
              if (!imageEl.alt) {
                imageEl.alt = 'תמונה';
              }
              
              imageEl.setAttribute('data-optimized', 'true');
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('load', optimizeExistingImages);
      observer.disconnect();
    };
  }, []);
};

/**
 * רכיב לטעינה מוקדמת של תמונות קריטיות
 */
interface ImagePreloaderProps {
  /** תמונות לטעינה מוקדמת */
  images: Array<{
    src: string;
    format?: string;
    sizes?: number[];
  }>;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images }) => {
  useEffect(() => {
    images.forEach(({ src, format = 'webp', sizes = [1920] }) => {
      sizes.forEach(size => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        
        // יצירת URL מותאם
        const url = new URL(src, window.location.origin);
        const params = new URLSearchParams();
        params.set('w', size.toString());
        params.set('f', format);
        
        link.href = `${url.pathname}?${params.toString()}`;
        
        // הוסף type לפורמטים מתקדמים
        if (format === 'webp') link.type = 'image/webp';
        if (format === 'avif') link.type = 'image/avif';
        
        document.head.appendChild(link);
      });
    });
  }, [images]);

  return null;
};

/**
 * רכיב גלריית תמונות מותאמת
 */
interface OptimizedGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: number;
  gap?: number;
  lazy?: boolean;
}

export const OptimizedGallery: React.FC<OptimizedGalleryProps> = ({
  images,
  columns = 3,
  gap = 16,
  lazy = true
}) => {
  return (
    <div
      className="optimized-gallery"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%'
      }}
    >
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            lazy={lazy && index > 6} // טען את 6 הראשונות מיד
            priority={index < 3 ? 'high' : 'auto'} // עדיפות גבוהה ל-3 הראשונות
            breakpoints={[400, 600, 800]}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              width: '100%',
              height: '200px',
              borderRadius: '8px'
            }}
          />
          {image.caption && (
            <p style={{ 
              marginTop: '8px', 
              fontSize: '14px', 
              color: '#666',
              textAlign: 'center'
            }}>
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};