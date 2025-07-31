import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  easing?: string;
  staggerDelay?: number;
}

interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
}

export const useScrollAnimations = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  const [visibleElements, setVisibleElements] = useState<Map<string, AnimationState>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<string, Element>>(new Map());

  // Initialize Intersection Observer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-animate-id');
          if (!elementId) return;

          const currentState = visibleElements.get(elementId) || { isVisible: false, hasAnimated: false };
          
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Map(prev.set(elementId, {
              isVisible: true,
              hasAnimated: true
            })));
          } else if (!triggerOnce || !currentState.hasAnimated) {
            setVisibleElements(prev => new Map(prev.set(elementId, {
              ...currentState,
              isVisible: false
            })));
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Observe existing elements
    elementsRef.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, visibleElements]);

  // Register element for animation
  const registerElement = useCallback((id: string, element: Element | null) => {
    if (!element) {
      elementsRef.current.delete(id);
      setVisibleElements(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      return;
    }

    element.setAttribute('data-animate-id', id);
    elementsRef.current.set(id, element);
    
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  // Get animation state for element
  const getAnimationState = useCallback((id: string): AnimationState => {
    return visibleElements.get(id) || { isVisible: false, hasAnimated: false };
  }, [visibleElements]);

  // Check if element is visible
  const isVisible = useCallback((id: string): boolean => {
    return getAnimationState(id).isVisible;
  }, [getAnimationState]);

  // Check if element has been animated
  const hasAnimated = useCallback((id: string): boolean => {
    return getAnimationState(id).hasAnimated;
  }, [getAnimationState]);

  return {
    registerElement,
    isVisible,
    hasAnimated,
    getAnimationState,
    visibleElements: Array.from(visibleElements.keys()).filter(id => visibleElements.get(id)?.isVisible)
  };
};

// Hook for individual element animation
export const useElementAnimation = (
  id: string, 
  options: ScrollAnimationOptions = {}
) => {
  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Adaptive settings based on device and preferences
  const getAdaptiveOptions = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const reducedMotion = prefersReducedMotion();
    
    if (reducedMotion) {
      return {
        threshold: 0.5,
        rootMargin: '0px',
        triggerOnce: true,
        ...options
      };
    }
    
    if (isMobile) {
      return {
        threshold: 0.1,
        rootMargin: '50px 0px -20px 0px',
        triggerOnce: true,
        ...options
      };
    }
    
    // Desktop default
    return {
      threshold: 0.05,
      rootMargin: '100px 0px -50px 0px',
      triggerOnce: true,
      ...options
    };
  }, [options, prefersReducedMotion]);
  
  const { registerElement, isVisible, hasAnimated } = useScrollAnimations(getAdaptiveOptions());
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      registerElement(id, elementRef.current);
    }
  }, [id, registerElement]);

  // Adaptive animation classes with stagger support
  const getAnimationClass = useCallback(() => {
    const reducedMotion = prefersReducedMotion();
    const animationType = options.animationType || 'fadeInUp';
    const delay = options.delay || 0;
    const staggerDelay = options.staggerDelay || 0;
    
    if (reducedMotion) {
      return isVisible(id) ? 'opacity-100 transition-opacity duration-300' : 'opacity-0';
    }
    
    const baseClasses = {
      fadeInUp: isVisible(id) ? 'animate-fade-in-up' : 'opacity-0 translate-y-5',
      fadeIn: isVisible(id) ? 'animate-fade-in' : 'opacity-0',
      slideInLeft: isVisible(id) ? 'animate-fade-in-left' : 'opacity-0 -translate-x-5',
      slideInRight: isVisible(id) ? 'animate-fade-in-right' : 'opacity-0 translate-x-5',
      scaleIn: isVisible(id) ? 'animate-scale-in' : 'opacity-0 scale-95'
    };
    
    let className = baseClasses[animationType];
    
    // Add delay classes if specified
    if (isVisible(id) && (delay > 0 || staggerDelay > 0)) {
      const totalDelay = delay + staggerDelay;
      className += ` animation-delay-${Math.min(Math.floor(totalDelay * 10), 50)}`;
    }
    
    return className;
  }, [isVisible, id, prefersReducedMotion, options]);

  return {
    ref: elementRef,
    isVisible: isVisible(id),
    hasAnimated: hasAnimated(id),
    className: getAnimationClass()
  };
};

// Predefined animation classes
export const animationClasses = {
  fadeInUp: 'transition-all duration-600 ease-out',
  fadeInUpVisible: 'opacity-100 translate-y-0',
  fadeInUpHidden: 'opacity-0 translate-y-5',
  
  fadeIn: 'transition-opacity duration-600 ease-out',
  fadeInVisible: 'opacity-100',
  fadeInHidden: 'opacity-0',
  
  slideInLeft: 'transition-all duration-600 ease-out',
  slideInLeftVisible: 'opacity-100 translate-x-0',
  slideInLeftHidden: 'opacity-0 -translate-x-10',
  
  slideInRight: 'transition-all duration-600 ease-out',
  slideInRightVisible: 'opacity-100 translate-x-0',
  slideInRightHidden: 'opacity-0 translate-x-10',
  
  scaleIn: 'transition-all duration-600 ease-out',
  scaleInVisible: 'opacity-100 scale-100',
  scaleInHidden: 'opacity-0 scale-95'
};

export default useScrollAnimations;