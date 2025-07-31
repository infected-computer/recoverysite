import { Loader2 } from 'lucide-react';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
  timeout?: number;
  onTimeout?: () => void;
}

const LoadingSpinner = ({ 
  message = "טוען...", 
  showProgress = false,
  timeout = 10000,
  onTimeout 
}: LoadingSpinnerProps) => {
  const [progress, setProgress] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [showProgress]);

  useEffect(() => {
    if (!timeout) return;

    const timer = setTimeout(() => {
      setIsTimeout(true);
      onTimeout?.();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  if (isTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-destructive mb-4">
            <svg className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="font-hebrew text-lg font-semibold mb-2">הטעינה נמשכת זמן רב</h3>
          <p className="font-hebrew text-muted-foreground mb-4">
            ייתכן שיש בעיה בחיבור לאינטרנט או שהשרת עמוס
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-hebrew hover:bg-primary/90 transition-colors"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-sm mx-auto">
        <motion.div 
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Animated loader with pulse effect */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto relative z-10" />
          </div>
          
          {showProgress && (
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-muted rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </motion.div>
        
        <motion.p 
          className="font-hebrew text-muted-foreground mb-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
        
        {showProgress && (
          <motion.p 
            className="font-hebrew text-xs text-muted-foreground"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}% הושלם
          </motion.p>
        )}

        {/* Animated dots */}
        <motion.div 
          className="flex justify-center gap-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary/60 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
