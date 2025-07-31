import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = true,
  onClick
}) => {
  const baseStyles = `
    border border-border-light-redesign
    rounded-3xl
    transition-all duration-300
    overflow-hidden
    group
    backdrop-blur-sm
  `;

  const hoverStyles = hoverable ? `
    hover:scale-[1.02] hover:-translate-y-2
    cursor-pointer
    hover-lift-gentle
    hover-glow-primary
  ` : '';

  return (
    <div
      className={cn(baseStyles, hoverStyles, className)}
      onClick={onClick}
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(255, 255, 255, 0.92) 100%
          )
        `,
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div className="relative z-10 p-8 h-full">
        {children}
      </div>

      {/* Hover overlay effect - darker for better text readability */}
      {hoverable && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(248, 250, 252, 0.95) 0%, 
                rgba(241, 245, 249, 0.92) 100%
              )
            `
          }}
        />
      )}

      {/* Subtle glow effect on hover */}
      {hoverable && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 ease-out -z-20 blur-xl bg-primary-redesign" />
      )}

      {/* Very subtle shimmer effect - only on hover */}
      {hoverable && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-800 ease-out overflow-hidden -z-10">
          <div 
            className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.03) 70%, transparent 100%)',
              width: '200%'
            }}
          />
        </div>
      )}

      {/* Shimmer effect */}
      {hoverable && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
      )}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      'mb-6 group-hover:text-gray-800 transition-colors duration-500 ease-out',
      className
    )}>
      {children}
    </div>
  );
};

const CardContent: React.FC<CardContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      'mb-6 text-text-muted-redesign group-hover:text-gray-700 transition-colors duration-500 ease-out',
      className
    )}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      'mt-auto',
      className
    )}>
      {children}
    </div>
  );
};

// Link component with special hover effect
interface CardLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const CardLink: React.FC<CardLinkProps> = ({
  href,
  children,
  className
}) => {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center text-text-dark-redesign font-medium',
        'group-hover:text-secondary-redesign transition-colors duration-300',
        'hover:underline',
        className
      )}
    >
      {children}
      <svg
        className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </a>
  );
};

export { Card, CardHeader, CardContent, CardFooter };
export default Card;