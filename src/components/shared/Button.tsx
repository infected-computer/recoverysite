import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-2xl
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
    group
  `;

  const variants = {
    primary: `
      text-white
      hover:scale-105 active:scale-95
      focus:ring-primary-redesign/50
      shadow-lg hover:shadow-xl
      transform-gpu
    `,
    secondary: `
      border-2 border-text-dark-redesign
      text-text-dark-redesign
      hover:text-white
      hover:scale-105 active:scale-95
      focus:ring-text-dark-redesign/50
      shadow-md hover:shadow-lg
      transform-gpu
    `,
    outline: `
      border border-border-redesign
      text-text-dark-redesign
      hover:bg-gray-50
      focus:ring-gray-500/50
    `,
    ghost: `
      text-text-dark-redesign
      hover:bg-gray-100
      focus:ring-gray-500/50
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--gradient-primary)',
          boxShadow: '0 4px 15px rgba(125, 211, 252, 0.4)'
        };
      case 'secondary':
        return {
          background: 'transparent'
        };
      default:
        return {};
    }
  };

  const getHoverStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'var(--color-text-dark)'
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      style={getVariantStyles()}
      disabled={disabled || loading}
      {...props}
    >
      {/* Background hover effect for secondary */}
      {variant === 'secondary' && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={getHoverStyles()}
        />
      )}

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-800 ease-out overflow-hidden">
        <div 
          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.2) 70%, transparent 100%)',
            width: '200%'
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading && (
          <svg 
            className="animate-spin h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </span>
    </button>
  );
};

export { Button };
export default Button;