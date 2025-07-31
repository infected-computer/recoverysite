import { useState, useCallback, useEffect } from 'react';
import { errorHandler, ErrorDetails, ErrorType, ErrorSeverity } from '../services/errorHandler';

interface UseErrorHandlerState {
  currentError: ErrorDetails | null;
  errorHistory: ErrorDetails[];
  isRetrying: boolean;
  retryCount: number;
}

interface UseErrorHandlerOptions {
  context?: string;
  autoRetry?: boolean;
  maxRetries?: number;
  onError?: (error: ErrorDetails) => void;
  onRetry?: (attempt: number) => void;
  onMaxRetriesReached?: (error: ErrorDetails) => void;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}) => {
  const [state, setState] = useState<UseErrorHandlerState>({
    currentError: null,
    errorHistory: [],
    isRetrying: false,
    retryCount: 0,
  });

  const {
    context,
    autoRetry = false,
    maxRetries = 3,
    onError,
    onRetry,
    onMaxRetriesReached,
  } = options;

  // Handle error
  const handleError = useCallback((error: any, errorContext?: string): ErrorDetails => {
    const errorDetails = errorHandler.handleError(error, errorContext || context);
    
    setState(prev => ({
      ...prev,
      currentError: errorDetails,
      errorHistory: [errorDetails, ...prev.errorHistory.slice(0, 9)], // Keep last 10 errors
    }));

    // Call custom error handler
    if (onError) {
      onError(errorDetails);
    }

    return errorDetails;
  }, [context, onError]);

  // Clear current error
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentError: null,
      isRetrying: false,
      retryCount: 0,
    }));
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setState({
      currentError: null,
      errorHistory: [],
      isRetrying: false,
      retryCount: 0,
    });
  }, []);

  // Retry function
  const retry = useCallback(async <T>(
    fn: () => Promise<T>,
    retryContext?: string
  ): Promise<T> => {
    const currentRetryCount = state.retryCount + 1;
    
    setState(prev => ({
      ...prev,
      isRetrying: true,
      retryCount: currentRetryCount,
    }));

    if (onRetry) {
      onRetry(currentRetryCount);
    }

    try {
      const result = await fn();
      
      // Success - clear error state
      setState(prev => ({
        ...prev,
        currentError: null,
        isRetrying: false,
        retryCount: 0,
      }));
      
      return result;
    } catch (error) {
      const errorDetails = handleError(error, retryContext);
      
      setState(prev => ({
        ...prev,
        isRetrying: false,
      }));

      // Check if we should retry again
      if (errorDetails.retryable && currentRetryCount < maxRetries) {
        // Auto-retry if enabled
        if (autoRetry) {
          const delay = errorDetails.retryAfter 
            ? errorDetails.retryAfter * 1000 
            : 2000 * currentRetryCount;
          
          setTimeout(() => {
            retry(fn, retryContext);
          }, delay);
        }
      } else if (currentRetryCount >= maxRetries && onMaxRetriesReached) {
        onMaxRetriesReached(errorDetails);
      }

      throw error;
    }
  }, [state.retryCount, handleError, maxRetries, autoRetry, onRetry, onMaxRetriesReached]);

  // Create retry function for a specific operation
  const createRetryFunction = useCallback(<T>(
    fn: () => Promise<T>,
    retryContext?: string
  ) => {
    return errorHandler.createRetryFunction(fn, retryContext || context);
  }, [context]);

  // Get error statistics
  const getErrorStats = useCallback(() => {
    return errorHandler.getErrorStats();
  }, []);

  // Get recent errors
  const getRecentErrors = useCallback((limit?: number) => {
    return errorHandler.getRecentErrors(limit);
  }, []);

  // Check if error is of specific type
  const isErrorType = useCallback((type: ErrorType): boolean => {
    return state.currentError?.type === type;
  }, [state.currentError]);

  // Check if error has specific severity
  const isErrorSeverity = useCallback((severity: ErrorSeverity): boolean => {
    return state.currentError?.severity === severity;
  }, [state.currentError]);

  // Check if current error is retryable
  const isRetryable = useCallback((): boolean => {
    return state.currentError?.retryable === true && state.retryCount < maxRetries;
  }, [state.currentError, state.retryCount, maxRetries]);

  // Get user-friendly error message
  const getUserMessage = useCallback((): string => {
    return state.currentError?.userMessage || 'An unexpected error occurred.';
  }, [state.currentError]);

  // Get technical error message
  const getTechnicalMessage = useCallback((): string => {
    return state.currentError?.message || '';
  }, [state.currentError]);

  // Auto-clear errors after a delay
  useEffect(() => {
    if (state.currentError && state.currentError.severity === ErrorSeverity.LOW) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000); // Clear low-severity errors after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [state.currentError, clearError]);

  return {
    // State
    currentError: state.currentError,
    errorHistory: state.errorHistory,
    isRetrying: state.isRetrying,
    retryCount: state.retryCount,
    hasError: state.currentError !== null,

    // Methods
    handleError,
    clearError,
    clearAllErrors,
    retry,
    createRetryFunction,
    getErrorStats,
    getRecentErrors,

    // Helpers
    isErrorType,
    isErrorSeverity,
    isRetryable,
    getUserMessage,
    getTechnicalMessage,
  };
};