import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </motion.button>
  );
};

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  amplitude?: number;
  duration?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  amplitude = 10,
  duration = 3,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface PulseAnimationProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  scale = 1.05,
  duration = 2,
  className = ''
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  className = '',
  staggerDelay = 0.1
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

interface CountUpAnimationProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  from,
  to,
  duration = 2,
  suffix = '',
  className = ''
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.span
        initial={{ textContent: from }}
        whileInView={{ textContent: to }}
        viewport={{ once: true }}
        transition={{ duration, ease: 'easeOut' }}
        onUpdate={(latest) => {
          if (typeof latest.textContent === 'number') {
            const current = Math.round(latest.textContent);
            return `${current}${suffix}`;
          }
        }}
      />
    </motion.span>
  );
};