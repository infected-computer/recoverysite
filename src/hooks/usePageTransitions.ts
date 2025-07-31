import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type TransitionType = 'fade' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'scale';

export const usePageTransitions = (duration: number = 400) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>('fade');
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  // מיפוי דפים לסוגי אנימציה
  const getTransitionType = (from: string, to: string): TransitionType => {
    // אנימציה מיוחדת לדפי שירותים
    if (to.startsWith('/services/') && !from.startsWith('/services/')) {
      return 'slideLeft';
    }
    if (from.startsWith('/services/') && !to.startsWith('/services/')) {
      return 'slideRight';
    }
    
    // אנימציה לדפי תהליך ותשלום
    if (to === '/process' || to.startsWith('/payment')) {
      return 'slideUp';
    }
    
    // חזרה לעמוד הבית
    if (to === '/' && from !== '/') {
      return 'slideDown';
    }
    
    // דפי מאמרים
    if (to.startsWith('/article/')) {
      return 'scale';
    }
    
    // ברירת מחדל
    return 'fade';
  };

  useEffect(() => {
    const currentPath = location.pathname;
    
    if (currentPath !== prevLocation) {
      const newTransitionType = getTransitionType(prevLocation, currentPath);
      setTransitionType(newTransitionType);
      
      // התחלת אנימציה יציאה
      setIsVisible(false);
      setIsTransitioning(true);
      
      // אנימציה כניסה לאחר חצי מהזמן
      const enterTimer = setTimeout(() => {
        setIsVisible(true);
      }, duration / 2);

      // סיום האנימציה
      const exitTimer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevLocation(currentPath);
      }, duration);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [location.pathname, prevLocation, duration]);

  const triggerTransition = (type: TransitionType = 'fade') => {
    setTransitionType(type);
    setIsVisible(false);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsVisible(true);
    }, duration / 2);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, duration);
  };

  return {
    isTransitioning,
    isVisible,
    transitionType,
    transitionDuration: duration,
    triggerTransition,
    currentPath: location.pathname,
    previousPath: prevLocation
  };
};

export const useScrollAnimations = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const isVisible = (elementId: string) => visibleElements.has(elementId);

  return { isVisible };
};