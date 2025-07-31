import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for debouncing callbacks
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook for throttling values
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

/**
 * Hook for throttling callbacks
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  limit: number,
  deps: React.DependencyList = []
): T {
  const lastRan = useRef<number>(0);
  const callbackRef = useRef(callback);

  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  const throttledCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRan.current >= limit) {
        callbackRef.current(...args);
        lastRan.current = Date.now();
      }
    }) as T,
    [limit]
  );

  return throttledCallback;
}

/**
 * Advanced debounce hook with immediate execution option
 */
export function useAdvancedDebounce<T>(
  value: T,
  delay: number,
  options: {
    immediate?: boolean;
    maxWait?: number;
  } = {}
): T {
  const { immediate = false, maxWait } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxTimeoutRef = useRef<NodeJS.Timeout>();
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    // If immediate and this is the first call, update immediately
    if (immediate && previousValueRef.current !== value) {
      setDebouncedValue(value);
      previousValueRef.current = value;
      return;
    }

    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up debounce timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      previousValueRef.current = value;
      
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    }, delay);

    // Set up max wait timeout if specified
    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        previousValueRef.current = value;
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }, maxWait);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    };
  }, [value, delay, immediate, maxWait]);

  return debouncedValue;
}

/**
 * Hook for form field validation with debouncing
 */
export function useDebouncedValidation<T>(
  value: T,
  validator: (value: T) => string | null,
  delay: number = 300
): {
  error: string | null;
  isValidating: boolean;
  isValid: boolean;
} {
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    if (debouncedValue !== value) {
      setIsValidating(true);
      return;
    }

    setIsValidating(false);
    const validationError = validator(debouncedValue);
    setError(validationError);
  }, [debouncedValue, value, validator]);

  return {
    error,
    isValidating,
    isValid: !error && !isValidating
  };
}