import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface SimplePageTransitionProps {
  children: ReactNode;
}

/**
 * רכיב אנימציה פשוט ומהיר למעבר בין דפים
 * מתחיל עם העמוד מוסתר ואז מפעיל אנימציה חלקה
 */
export const SimplePageTransition: React.FC<SimplePageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const variants = {
    fadeIn: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    fadeOut: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.6, 1]
      }
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen"
      variants={variants}
      initial={{ opacity: 0, y: 20 }}
      animate={transitionStage}
      onAnimationComplete={() => {
        if (transitionStage === "fadeOut") {
          setDisplayLocation(location);
          setTransitionStage("fadeIn");
          window.scrollTo(0, 0);
        }
      }}
    >
      {displayLocation.pathname === location.pathname ? children : null}
    </motion.div>
  );
};

/**
 * רכיב אנימציה עם Framer Motion AnimatePresence
 * גישה מתקדמת יותר לאנימציות חלקות
 */
export const AdvancedPageTransition: React.FC<SimplePageTransitionProps> = ({ children }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.4
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full min-h-screen"
          onAnimationStart={() => {
            // הוסף class לbody כדי למנוע scroll
            document.body.style.overflow = 'hidden';
          }}
          onAnimationComplete={() => {
            // החזר scroll ו scroll to top
            document.body.style.overflow = 'unset';
            window.scrollTo(0, 0);
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SimplePageTransition;