import React, { useState, useEffect } from 'react';
import { ErrorDetails, ErrorSeverity } from '../../services/errorHandler';

interface UserFeedbackProps {
  error?: ErrorDetails | null;
  isLoading?: boolean;
  isRetrying?: boolean;
  retryCount?: number;
  maxRetries?: number;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const UserFeedback: React.FC<UserFeedbackProps> = ({
  error,
  isLoading = false,
  isRetrying = false,
  retryCount = 0,
  maxRetries = 3,
  onRetry,
  onDismiss,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);

  // Show/hide feedback based on state
  useEffect(() => {
    const shouldShow = error || isLoading || isRetrying;
    setIsVisible(shouldShow);

    // Auto-hide low severity errors
    if (error && error.severity === ErrorSeverity.LOW && !autoHideTimer) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) {
          onDismiss();
        }
      }, 5000);
      setAutoHideTimer(timer);
    }

    return () => {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        setAutoHideTimer(null);
      }
    };
  }, [error, isLoading, isRetrying, autoHideTimer, onDismiss]);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  // Loading state
  if (isLoading && !error) {
    return (
      <div className={`user-feedback loading ${className}`}>
        <div className="feedback-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <div className="feedback-message">
            <p>Processing your request...</p>
          </div>
        </div>
      </div>
    );
  }

  // Retrying state
  if (isRetrying) {
    return (
      <div className={`user-feedback retrying ${className}`}>
        <div className="feedback-content">
          <div className="retry-icon">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="feedback-message">
            <p>Retrying... (Attempt {retryCount} of {maxRetries})</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    const severityClass = error.severity.toLowerCase();
    const canRetry = error.retryable && retryCount < maxRetries;

    return (
      <div className={`user-feedback error ${severityClass} ${className}`}>
        <div className="feedback-content">
          <div className="error-icon">
            {error.severity === ErrorSeverity.CRITICAL ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            ) : error.severity === ErrorSeverity.HIGH ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          
          <div className="feedback-message">
            <p className="error-title">
              {error.severity === ErrorSeverity.CRITICAL ? 'Critical Error' :
               error.severity === ErrorSeverity.HIGH ? 'Error' :
               error.severity === ErrorSeverity.MEDIUM ? 'Warning' : 'Notice'}
            </p>
            <p className="error-description">{error.userMessage}</p>
            
            {error.code && (
              <p className="error-code">Error Code: {error.code}</p>
            )}
            
            {retryCount > 0 && (
              <p className="retry-info">
                Retry attempt {retryCount} of {maxRetries}
              </p>
            )}
          </div>
          
          <div className="feedback-actions">
            {canRetry && onRetry && (
              <button
                onClick={onRetry}
                className="btn btn-retry"
                disabled={isRetrying}
              >
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </button>
            )}
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="btn btn-dismiss"
                aria-label="Dismiss"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        {error.retryAfter && (
          <div className="retry-countdown">
            <p>Please wait {error.retryAfter} seconds before retrying</p>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default UserFeedback;