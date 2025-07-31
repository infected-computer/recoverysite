import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSecurity } from '../../hooks/useSecurity';

interface SecurityContextType {
  isSecure: boolean;
  csrfToken: string;
  sessionToken: string;
  securityStats: {
    activeRateLimits: number;
    blockedIPs: number;
    suspiciousActivities: number;
    recentAlerts: number;
  };
  enforceHTTPS: () => boolean;
  sanitizeInput: (input: string) => string;
  logSuspiciousActivity: (activity: string, details?: any) => void;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string>('');
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isSecure, setIsSecure] = useState(false);

  const {
    securityStats,
    enforceHTTPS,
    sanitizeInput,
    generateSessionToken,
    generateCSRFToken,
    logSuspiciousActivity,
    getCSPHeader,
  } = useSecurity();

  // Initialize security on mount
  useEffect(() => {
    const initializeSecurity = () => {
      // Enforce HTTPS
      const httpsEnforced = enforceHTTPS();
      
      // Generate session token
      const newSessionToken = generateSessionToken();
      setSessionToken(newSessionToken);
      
      // Generate CSRF token
      const newCsrfToken = generateCSRFToken(newSessionToken);
      setCsrfToken(newCsrfToken);
      
      // Set CSP headers (if possible)
      try {
        const cspHeader = getCSPHeader();
        const metaTag = document.createElement('meta');
        metaTag.httpEquiv = 'Content-Security-Policy';
        metaTag.content = cspHeader;
        document.head.appendChild(metaTag);
      } catch (error) {
        console.warn('Could not set CSP headers:', error);
      }
      
      setIsSecure(httpsEnforced);
      
      // Log security initialization
      logSuspiciousActivity('security_initialized', {
        httpsEnforced,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
    };

    initializeSecurity();
  }, [enforceHTTPS, generateSessionToken, generateCSRFToken, getCSPHeader, logSuspiciousActivity]);

  // Refresh tokens periodically
  useEffect(() => {
    const refreshTokens = () => {
      const newSessionToken = generateSessionToken();
      setSessionToken(newSessionToken);
      
      const newCsrfToken = generateCSRFToken(newSessionToken);
      setCsrfToken(newCsrfToken);
    };

    // Refresh tokens every 30 minutes
    const interval = setInterval(refreshTokens, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [generateSessionToken, generateCSRFToken]);

  // Monitor for security events
  useEffect(() => {
    const handleSecurityEvent = (event: Event) => {
      logSuspiciousActivity('security_event', {
        type: event.type,
        timestamp: new Date().toISOString(),
      });
    };

    // Listen for various security-related events
    window.addEventListener('beforeunload', handleSecurityEvent);
    window.addEventListener('focus', handleSecurityEvent);
    window.addEventListener('blur', handleSecurityEvent);
    
    // Listen for potential XSS attempts
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('script') || message.includes('eval') || message.includes('innerHTML')) {
        logSuspiciousActivity('potential_xss', { message });
      }
      originalConsoleError.apply(console, args);
    };

    return () => {
      window.removeEventListener('beforeunload', handleSecurityEvent);
      window.removeEventListener('focus', handleSecurityEvent);
      window.removeEventListener('blur', handleSecurityEvent);
      console.error = originalConsoleError;
    };
  }, [logSuspiciousActivity]);

  const contextValue: SecurityContextType = {
    isSecure,
    csrfToken,
    sessionToken,
    securityStats,
    enforceHTTPS,
    sanitizeInput,
    logSuspiciousActivity,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurityContext = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

export default SecurityProvider;