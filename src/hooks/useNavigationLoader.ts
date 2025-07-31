import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook לטיפול באנימציות טעינה בעת מעבר בין דפים
 */
export const useNavigationLoader = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationProgress, setNavigationProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // סימון תחילת ניווט
    setIsNavigating(true);
    setNavigationProgress(0);

    // סימולציה של התקדמות טעינה
    const progressInterval = setInterval(() => {
      setNavigationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    // סיום האנימציה לאחר זמן קצר
    const navigationTimer = setTimeout(() => {
      setNavigationProgress(100);
      setTimeout(() => {
        setIsNavigating(false);
        setNavigationProgress(0);
      }, 200);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(navigationTimer);
    };
  }, [location.pathname]);

  // פונקציה לניווט עם אנימציה
  const navigateWithLoader = (to: string) => {
    setIsNavigating(true);
    setNavigationProgress(0);
    
    // התחלת אנימציה
    const progressTimer = setInterval(() => {
      setNavigationProgress(prev => {
        if (prev >= 70) {
          clearInterval(progressTimer);
          return 70;
        }
        return prev + 10;
      });
    }, 50);

    // מעבר לדף חדש לאחר אנימציה קצרה
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  return {
    isNavigating,
    navigationProgress,
    navigateWithLoader
  };
};