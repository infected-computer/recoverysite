import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationLoader } from '../../hooks/useNavigationLoader';

/**
 * רכיב loading bar עליון לאנימציות מעבר בין דפים
 */
export const NavigationLoader: React.FC = () => {
  const { isNavigating, navigationProgress } = useNavigationLoader();

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: navigationProgress / 100, 
            opacity: 1 
          }}
          exit={{ 
            scaleX: 1,
            opacity: 0,
            transition: { duration: 0.3 }
          }}
          style={{ 
            transformOrigin: 'left',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }}
          transition={{
            scaleX: { duration: 0.2, ease: 'easeOut' },
            opacity: { duration: 0.1 }
          }}
        />
      )}
    </AnimatePresence>
  );
};

/**
 * רכיב loading overlay מלא למעברים מתקדמים
 */
export const FullPageLoader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex items-center space-x-4 rtl:space-x-reverse"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {/* מספר נקודות מונפשות */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationLoader;