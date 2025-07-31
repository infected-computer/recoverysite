import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

// אנימציות חלקות ומהירות יותר
const getPageVariants = (pathname: string) => {
  // אנימציה מיוחדת לדפי שירותים - slide מצד
  if (pathname.startsWith('/services/')) {
    return {
      initial: { opacity: 0, x: 50 },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: -50 }
    };
  }
  
  // אנימציה לדף תהליך העבודה - slide מלמעלה
  if (pathname === '/process') {
    return {
      initial: { opacity: 0, y: 30 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -30 }
    };
  }
  
  // אנימציה לדפי תשלום - scale עדין
  if (pathname.startsWith('/payment') || pathname === '/secure-payment') {
    return {
      initial: { opacity: 0, scale: 0.96 },
      in: { opacity: 1, scale: 1 },
      out: { opacity: 0, scale: 1.04 }
    };
  }
  
  // אנימציה לדפי מאמרים - fade עם scale קל
  if (pathname.startsWith('/article/')) {
    return {
      initial: { opacity: 0, scale: 0.98 },
      in: { opacity: 1, scale: 1 },
      out: { opacity: 0, scale: 1.02 }
    };
  }
  
  // אנימציה לעמוד הבית - fade פשוט
  if (pathname === '/') {
    return {
      initial: { opacity: 0 },
      in: { opacity: 1 },
      out: { opacity: 0 }
    };
  }
  
  // ברירת מחדל - fade עדין עם תזוזה קלה
  return {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  };
};

const getPageTransition = (pathname: string) => {
  // מעברים מהירים לכל הדפים
  return {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1], // cubic-bezier חלק
    duration: 0.3 // מהיר יותר
  };
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const pageVariants = getPageVariants(pathname);
  const pageTransition = getPageTransition(pathname);

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full min-h-screen"
        style={{
          transformOrigin: 'center center',
          perspective: '1000px'
        }}
        onAnimationComplete={() => {
          // Scroll to top after animation completes
          window.scrollTo(0, 0);
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// רכיב מהיר יותר לעמודים פשוטים
export const QuickPageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  const quickVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const quickTransition = {
    duration: 0.2,
    ease: 'easeInOut'
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={quickVariants}
        transition={quickTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// רכיב לאנימציות סקשנים
interface SectionAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const SectionAnimation: React.FC<SectionAnimationProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { y: 0, x: 50 };
      case 'right': return { y: 0, x: -50 };
      default: return { y: 50, x: 0 };
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...getInitialPosition()
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// רכיב לאנימציות כרטיסים
interface CardAnimationProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export const CardAnimation: React.FC<CardAnimationProps> = ({
  children,
  index = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// רכיב לאנימציות טקסט
interface TextAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};