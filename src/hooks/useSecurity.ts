import { useState, useEffect, useCallback } from 'react';
import { securityService } from '../utils/security';

interface UseSecurityOptions {
  identifier?: string;
  maxAttempts?: number;
  windowMs?: number;
  blockDurationMs?: number;
}

export const useSecurity = (options: UseSecurityOptions = {}) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [resetTime, setResetTime] = useState(0);
  const [securityStats, setSecurityStats] = useState({
    activeRateLimits: 0,
    blockedIPs: 0,
    suspiciousActivities: 0,
    recentAlerts: 0,
  });

  const identifier = options.identifier || 'default';

  // Check if currently blocked
  useEffect(() => {
    const blocked = securityService.isBlocked(identifier);
    setIsBlocked(blocked);
  }, [identifier]);

  // Update security stats periodically
  useEffect(() => {
    const updateStats = () => {
      const stats = securityService.getSecurityStats();
      setSecurityStats(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Check rate limit
  const checkRateLimit = useCallback(() => {
    const result = securityService.checkRateLimit(identifier, {
      maxAttempts: options.maxAttempts,
      windowMs: options.windowMs,
      blockDurationMs: options.blockDurationMs,
    });

    setIsBlocked(!result.allowed);
    setRemainingAttempts(result.remainingAttempts);
    setResetTime(result.resetTime);

    return result;
  }, [identifier, options.maxAttempts, options.windowMs, options.blockDurationMs]);

  // Sanitize input
  const sanitizeInput = useCallback((input: string): string => {
    return securityService.sanitizeInput(input);
  }, []);

  // Generate CSRF token
  const generateCSRFToken = useCallback((sessionToken: string): string => {
    return securityService.generateCSRFToken(sessionToken);
  }, []);

  // Validate CSRF token
  const validateCSRFToken = useCallback((token: string, sessionToken: string): boolean => {
    return securityService.validateCSRFToken(token, sessionToken);
  }, []);

  // Enforce HTTPS
  const enforceHTTPS = useCallback((): boolean => {
    return securityService.enforceHTTPS();
  }, []);

  // Log suspicious activity
  const logSuspiciousActivity = useCallback((activity: string, details?: any) => {
    securityService.logSuspiciousActivity(identifier, activity, details);
  }, [identifier]);

  // Get suspicious activities
  const getSuspiciousActivities = useCallback((limit?: number) => {
    return securityService.getSuspiciousActivities(limit);
  }, []);

  // Validate payment amount
  const validatePaymentAmount = useCallback((amount: number, currency: string) => {
    return securityService.validatePaymentAmount(amount, currency);
  }, []);

  // Generate session token
  const generateSessionToken = useCallback((): string => {
    return securityService.generateSessionToken();
  }, []);

  // Validate session token
  const validateSessionToken = useCallback((token: string): boolean => {
    return securityService.validateSessionToken(token);
  }, []);

  // Get CSP header
  const getCSPHeader = useCallback((): string => {
    return securityService.getCSPHeader();
  }, []);

  // Cleanup rate limits
  const cleanupRateLimits = useCallback(() => {
    securityService.cleanupRateLimits();
  }, []);

  return {
    // State
    isBlocked,
    remainingAttempts,
    resetTime,
    securityStats,

    // Methods
    checkRateLimit,
    sanitizeInput,
    generateCSRFToken,
    validateCSRFToken,
    enforceHTTPS,
    logSuspiciousActivity,
    getSuspiciousActivities,
    validatePaymentAmount,
    generateSessionToken,
    validateSessionToken,
    getCSPHeader,
    cleanupRateLimits,
  };
};