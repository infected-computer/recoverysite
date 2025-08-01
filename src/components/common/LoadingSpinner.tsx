import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="loading-spinner">
      <div className="flex flex-col items-center justify-center p-8">
        <div 
          className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
          role="status"
          aria-label="Loading"
        />
        {message && (
          <p className="mt-4 text-gray-600 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;