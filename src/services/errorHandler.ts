// Comprehensive error handling service

export enum ErrorType {
  VALIDATION = 'validation',
  NETWORK = 'network',
  PAYMENT = 'payment',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  RATE_LIMIT = 'rate_limit',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown',
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface ErrorDetails {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  userMessage: string;
  code?: string;
  details?: any;
  timestamp: Date;
  context?: string;
  stack?: string;
  retryable: boolean;
  retryAfter?: number;
}

export interface ErrorHandlerConfig {
  enableLogging: boolean;
  enableReporting: boolean;
  maxRetries: number;
  retryDelay: number;
  reportingEndpoint?: string;
}

class ErrorHandlerService {
  private config: ErrorHandlerConfig = {
    enableLogging: true,
    enableReporting: true,
    maxRetries: 3,
    retryDelay: 2000,
  };

  private errorLog: ErrorDetails[] = [];
  private readonly MAX_LOG_SIZE = 1000;

  /**
   * Configure error handler
   */
  configure(config: Partial<ErrorHandlerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Handle error and return user-friendly details
   */
  handleError(error: any, context?: string): ErrorDetails {
    const errorDetails = this.parseError(error, context);
    
    // Log the error
    if (this.config.enableLogging) {
      this.logError(errorDetails);
    }

    // Report the error
    if (this.config.enableReporting && errorDetails.severity !== ErrorSeverity.LOW) {
      this.reportError(errorDetails);
    }

    return errorDetails;
  }

  /**
   * Parse different types of errors
   */
  private parseError(error: any, context?: string): ErrorDetails {
    const timestamp = new Date();
    let errorDetails: ErrorDetails;

    if (error instanceof Error) {
      errorDetails = this.parseJavaScriptError(error, context, timestamp);
    } else if (typeof error === 'string') {
      errorDetails = this.parseStringError(error, context, timestamp);
    } else if (error?.response) {
      errorDetails = this.parseHTTPError(error, context, timestamp);
    } else if (error?.type) {
      errorDetails = this.parseCustomError(error, context, timestamp);
    } else {
      errorDetails = this.parseUnknownError(error, context, timestamp);
    }

    return errorDetails;
  }

  /**
   * Parse JavaScript Error objects
   */
  private parseJavaScriptError(error: Error, context?: string, timestamp: Date = new Date()): ErrorDetails {
    let type = ErrorType.CLIENT;
    let severity = ErrorSeverity.MEDIUM;
    let userMessage = 'An unexpected error occurred. Please try again.';
    let retryable = true;

    // Categorize based on error message
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
      type = ErrorType.NETWORK;
      userMessage = 'Network connection failed. Please check your internet connection and try again.';
    } else if (message.includes('validation') || message.includes('invalid')) {
      type = ErrorType.VALIDATION;
      severity = ErrorSeverity.LOW;
      userMessage = 'Please check your input and try again.';
      retryable = false;
    } else if (message.includes('payment') || message.includes('transaction')) {
      type = ErrorType.PAYMENT;
      severity = ErrorSeverity.HIGH;
      userMessage = 'Payment processing failed. Please try again or contact support.';
    } else if (message.includes('auth')) {
      type = ErrorType.AUTHENTICATION;
      severity = ErrorSeverity.HIGH;
      userMessage = 'Authentication failed. Please verify your credentials.';
      retryable = false;
    } else if (message.includes('rate limit') || message.includes('too many')) {
      type = ErrorType.RATE_LIMIT;
      userMessage = 'Too many requests. Please wait a moment and try again.';
    }

    return {
      type,
      severity,
      message: error.message,
      userMessage,
      timestamp,
      context,
      stack: error.stack,
      retryable,
    };
  }

  /**
   * Parse string errors
   */
  private parseStringError(error: string, context?: string, timestamp: Date = new Date()): ErrorDetails {
    return {
      type: ErrorType.CLIENT,
      severity: ErrorSeverity.LOW,
      message: error,
      userMessage: error,
      timestamp,
      context,
      retryable: true,
    };
  }

  /**
   * Parse HTTP errors
   */
  private parseHTTPError(error: any, context?: string, timestamp: Date = new Date()): ErrorDetails {
    const status = error.response?.status || 0;
    const statusText = error.response?.statusText || 'Unknown';
    const data = error.response?.data;

    let type = ErrorType.SERVER;
    let severity = ErrorSeverity.MEDIUM;
    let userMessage = 'Server error occurred. Please try again later.';
    let retryable = true;
    let retryAfter: number | undefined;

    // Categorize based on HTTP status
    if (status >= 400 && status < 500) {
      type = ErrorType.CLIENT;
      retryable = false;

      switch (status) {
        case 400:
          userMessage = 'Invalid request. Please check your input.';
          break;
        case 401:
          type = ErrorType.AUTHENTICATION;
          severity = ErrorSeverity.HIGH;
          userMessage = 'Authentication required. Please sign in.';
          break;
        case 403:
          type = ErrorType.AUTHORIZATION;
          severity = ErrorSeverity.HIGH;
          userMessage = 'Access denied. You do not have permission to perform this action.';
          break;
        case 404:
          userMessage = 'The requested resource was not found.';
          break;
        case 429:
          type = ErrorType.RATE_LIMIT;
          userMessage = 'Too many requests. Please wait and try again.';
          retryable = true;
          retryAfter = parseInt(error.response?.headers?.['retry-after']) || 60;
          break;
        default:
          userMessage = 'Request failed. Please check your input and try again.';
      }
    } else if (status >= 500) {
      severity = ErrorSeverity.HIGH;
      userMessage = 'Server error occurred. Please try again later.';
    }

    return {
      type,
      severity,
      message: `HTTP ${status}: ${statusText}`,
      userMessage,
      code: status.toString(),
      details: data,
      timestamp,
      context,
      retryable,
      retryAfter,
    };
  }

  /**
   * Parse custom error objects
   */
  private parseCustomError(error: any, context?: string, timestamp: Date = new Date()): ErrorDetails {
    return {
      type: error.type || ErrorType.UNKNOWN,
      severity: error.severity || ErrorSeverity.MEDIUM,
      message: error.message || 'Unknown error',
      userMessage: error.userMessage || 'An error occurred. Please try again.',
      code: error.code,
      details: error.details,
      timestamp,
      context,
      retryable: error.retryable !== false,
      retryAfter: error.retryAfter,
    };
  }

  /**
   * Parse unknown errors
   */
  private parseUnknownError(error: any, context?: string, timestamp: Date = new Date()): ErrorDetails {
    return {
      type: ErrorType.UNKNOWN,
      severity: ErrorSeverity.MEDIUM,
      message: JSON.stringify(error),
      userMessage: 'An unexpected error occurred. Please try again.',
      details: error,
      timestamp,
      context,
      retryable: true,
    };
  }

  /**
   * Log error to console and internal log
   */
  private logError(errorDetails: ErrorDetails): void {
    // Log to console
    const logMethod = this.getLogMethod(errorDetails.severity);
    logMethod(`[${errorDetails.type.toUpperCase()}] ${errorDetails.message}`, {
      context: errorDetails.context,
      timestamp: errorDetails.timestamp,
      details: errorDetails.details,
      stack: errorDetails.stack,
    });

    // Add to internal log
    this.errorLog.unshift(errorDetails);
    
    // Limit log size
    if (this.errorLog.length > this.MAX_LOG_SIZE) {
      this.errorLog.splice(this.MAX_LOG_SIZE);
    }
  }

  /**
   * Get appropriate console log method based on severity
   */
  private getLogMethod(severity: ErrorSeverity): (...args: any[]) => void {
    switch (severity) {
      case ErrorSeverity.LOW:
        return console.info;
      case ErrorSeverity.MEDIUM:
        return console.warn;
      case ErrorSeverity.HIGH:
      case ErrorSeverity.CRITICAL:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * Report error to external service
   */
  private async reportError(errorDetails: ErrorDetails): Promise<void> {
    try {
      // In production, send to error reporting service like Sentry, Bugsnag, etc.
      if (this.config.reportingEndpoint) {
        await fetch(this.config.reportingEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...errorDetails,
            userAgent: navigator.userAgent,
            url: window.location.href,
            userId: this.getUserId(),
          }),
        });
      }

      // Send to analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: errorDetails.message,
          fatal: errorDetails.severity === ErrorSeverity.CRITICAL,
          error_type: errorDetails.type,
        });
      }
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError);
    }
  }

  /**
   * Get user ID for error reporting (if available)
   */
  private getUserId(): string | undefined {
    // This would typically get the user ID from authentication context
    return undefined;
  }

  /**
   * Get error statistics
   */
  getErrorStats(): {
    total: number;
    byType: Record<ErrorType, number>;
    bySeverity: Record<ErrorSeverity, number>;
    recent: number;
  } {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    const stats = {
      total: this.errorLog.length,
      byType: {} as Record<ErrorType, number>,
      bySeverity: {} as Record<ErrorSeverity, number>,
      recent: 0,
    };

    // Initialize counters
    Object.values(ErrorType).forEach(type => {
      stats.byType[type] = 0;
    });
    Object.values(ErrorSeverity).forEach(severity => {
      stats.bySeverity[severity] = 0;
    });

    // Count errors
    this.errorLog.forEach(error => {
      stats.byType[error.type]++;
      stats.bySeverity[error.severity]++;
      
      if (error.timestamp.getTime() > oneHourAgo) {
        stats.recent++;
      }
    });

    return stats;
  }

  /**
   * Get recent errors
   */
  getRecentErrors(limit = 50): ErrorDetails[] {
    return this.errorLog.slice(0, limit);
  }

  /**
   * Clear error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Create retry function for retryable errors
   */
  createRetryFunction<T>(
    fn: () => Promise<T>,
    context?: string
  ): () => Promise<T> {
    return async (): Promise<T> => {
      let lastError: any;
      
      for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
        try {
          return await fn();
        } catch (error) {
          lastError = error;
          const errorDetails = this.handleError(error, context);
          
          if (!errorDetails.retryable || attempt === this.config.maxRetries) {
            throw error;
          }
          
          // Wait before retrying
          const delay = errorDetails.retryAfter 
            ? errorDetails.retryAfter * 1000 
            : this.config.retryDelay * attempt;
          
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      
      throw lastError;
    };
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandlerService();
export default errorHandler;