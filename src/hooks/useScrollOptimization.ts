import React, { useEffect, useCallback, useRef, useState } from 'react';

interface ScrollOptimizationOptions {
  throttleMs?: number;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScrollOptimization = (options: ScrollOptimizationOptions = {}) => {
  const {
    throttleMs = 16, // ~60fps
    rootMargin = '0px',
    threshold = 0.1
  } = options;

  const scrollCallbacks = useRef<Set<(scrollY: number) => void>>(new Set());
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY !== lastScrollY.current) {
          scrollCallbacks.current.forEach(callback => callback(scrollY));
          lastScrollY.current = scrollY;
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  // Add scroll listener
  const addScrollListener = useCallback((callback: (scrollY: number) => void) => {
    scrollCallbacks.current.add(callback);
    return () => scrollCallbacks.current.delete(callback);
  }, []);

  // Intersection Observer for element visibility
  const createIntersectionObserver = useCallback((
    callback: (entries: IntersectionObserverEntry[]) => void
  ) => {
    const observer = new IntersectionObserver(callback, {
      rootMargin,
      threshold
    });
    return observer;
  }, [rootMargin, threshold]);

  // Smooth scroll to element
  const scrollToElement = useCallback((
    element: HTMLElement | string,
    options: ScrollIntoViewOptions = {}
  ) => {
    const target = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        ...options
      });
    }
  }, []);

  // Initialize scroll listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const throttledHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, throttleMs);
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandler);
      clearTimeout(timeoutId);
    };
  }, [handleScroll, throttleMs]);

  return {
    addScrollListener,
    createIntersectionObserver,
    scrollToElement,
    currentScrollY: lastScrollY.current
  };
};

// Hook for scroll-based animations
export const useScrollAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  animationClass: string = 'animate-fade-in-up',
  options: IntersectionObserverInit = {}
) => {
  const { createIntersectionObserver } = useScrollOptimization();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, animationClass, createIntersectionObserver]);
};

// Hook for lazy loading content
export const useLazyLoad = <T extends HTMLElement>(
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<T>(null);
  const { createIntersectionObserver } = useScrollOptimization();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, createIntersectionObserver]);

  return elementRef;
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const { addScrollListener } = useScrollOptimization();
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const removeListener = addScrollListener((scrollY) => {
      const direction = scrollY > lastScrollY.current ? 'down' : 'up';
      if (Math.abs(scrollY - lastScrollY.current) > 5) { // Threshold to avoid jitter
        setScrollDirection(direction);
      }
      lastScrollY.current = scrollY;
    });

    return removeListener;
  }, [addScrollListener]);

  return scrollDirection;
};