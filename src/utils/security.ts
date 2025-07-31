// Security utilities for payment system

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

interface SecurityConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

class SecurityService {
  private rateLimitMap = new Map<string, RateLimitEntry>();
  private blockedIPs = new Set<string>();
  private suspiciousActivities: Array<{
    ip: string;
    activity: string;
    timestamp: Date;
    details?: any;
  }> = [];

  private readonly DEFAULT_CONFIG: SecurityConfig = {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 60 * 60 * 1000, // 1 hour
  };

  /**
   * Check if an IP is rate limited
   */
  checkRateLimit(identifier: string, config: Partial<SecurityConfig> = {}): {
    allowed: boolean;
    remainingAttempts: number;
    resetTime: number;
  } {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    const now = Date.now();
    const entry = this.rateLimitMap.get(identifier);

    if (!entry) {
      // First attempt
      this.rateLimitMap.set(identifier, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
      });

      return {
        allowed: true,
        remainingAttempts: finalConfig.maxAttempts - 1,
        resetTime: now + finalConfig.windowMs,
      };
    }

    // Check if window has expired
    if (now - entry.firstAttempt > finalConfig.windowMs) {
      // Reset the window
      this.rateLimitMap.set(identifier, {
        count: 1,
        firstAttempt: now,
        lastAttempt: now,
      });

      return {
        allowed: true,
        remainingAttempts: finalConfig.maxAttempts - 1,
        resetTime: now + finalConfig.windowMs,
      };
    }

    // Increment attempt count
    entry.count++;
    entry.lastAttempt = now;

    const allowed = entry.count <= finalConfig.maxAttempts;
    const remainingAttempts = Math.max(0, finalConfig.maxAttempts - entry.count);
    const resetTime = entry.firstAttempt + finalConfig.windowMs;

    if (!allowed) {
      // Block the IP temporarily
      this.blockedIPs.add(identifier);
      setTimeout(() => {
        this.blockedIPs.delete(identifier);
        this.rateLimitMap.delete(identifier);
      }, finalConfig.blockDurationMs);

      // Log suspicious activity
      this.logSuspiciousActivity(identifier, 'rate_limit_exceeded', {
        attempts: entry.count,
        windowMs: finalConfig.windowMs,
      });
    }

    return {
      allowed,
      remainingAttempts,
      resetTime,
    };
  }

  /**
   * Check if an IP is currently blocked
   */
  isBlocked(identifier: string): boolean {
    return this.blockedIPs.has(identifier);
  }

  /**
   * Sanitize input to prevent XSS and injection attacks
   */
  sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }

    return input
      .replace(/[<>\"'&]/g, (match) => {
        const entities: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;',
        };
        return entities[match] || match;
      })
      .trim()
      .slice(0, 1000); // Limit length
  }

  /**
   * Validate CSRF token
   */
  validateCSRFToken(token: string, sessionToken: string): boolean {
    if (!token || !sessionToken) {
      return false;
    }

    // Simple CSRF validation - in production, use proper CSRF tokens
    const expectedToken = this.generateCSRFToken(sessionToken);
    return token === expectedToken;
  }

  /**
   * Generate CSRF token
   */
  generateCSRFToken(sessionToken: string): string {
    // Simple token generation - in production, use cryptographically secure methods
    const timestamp = Date.now().toString();
    const hash = this.simpleHash(sessionToken + timestamp);
    return `${timestamp}.${hash}`;
  }

  /**
   * Validate Content Security Policy
   */
  getCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://js.lemonsqueezy.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.lemonsqueezy.com",
      "frame-src https://lemonsqueezy.com",
      "form-action 'self' https://lemonsqueezy.com",
      "base-uri 'self'",
      "object-src 'none'",
    ].join('; ');
  }

  /**
   * Enforce HTTPS
   */
  enforceHTTPS(): boolean {
    if (typeof window === 'undefined') {
      return true; // Server-side, assume HTTPS is handled by server
    }

    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      // Redirect to HTTPS
      window.location.href = window.location.href.replace('http:', 'https:');
      return false;
    }

    return true;
  }

  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(
    identifier: string,
    activity: string,
    details?: any
  ): void {
    const entry = {
      ip: identifier,
      activity,
      timestamp: new Date(),
      details,
    };

    this.suspiciousActivities.push(entry);

    // Keep only last 1000 entries
    if (this.suspiciousActivities.length > 1000) {
      this.suspiciousActivities.splice(0, this.suspiciousActivities.length - 1000);
    }

    // Log to console for monitoring
    console.warn('Suspicious activity detected:', entry);

    // In production, send to monitoring service
    this.sendToMonitoringService(entry);
  }

  /**
   * Get suspicious activities
   */
  getSuspiciousActivities(limit = 100): Array<{
    ip: string;
    activity: string;
    timestamp: Date;
    details?: any;
  }> {
    return this.suspiciousActivities
      .slice(-limit)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Validate payment amount for suspicious patterns
   */
  validatePaymentAmount(amount: number, currency: string): {
    valid: boolean;
    risk: 'low' | 'medium' | 'high';
    reasons: string[];
  } {
    const reasons: string[] = [];
    let risk: 'low' | 'medium' | 'high' = 'low';

    // Check for unusually high amounts
    if (amount > 10000) {
      reasons.push('Unusually high amount');
      risk = 'high';
    } else if (amount > 1000) {
      reasons.push('High amount transaction');
      risk = 'medium';
    }

    // Check for suspicious round numbers
    if (amount % 1000 === 0 && amount >= 5000) {
      reasons.push('Suspicious round number');
      risk = risk === 'high' ? 'high' : 'medium';
    }

    // Check for very small amounts (potential testing)
    if (amount < 1) {
      reasons.push('Very small amount - potential testing');
      risk = 'medium';
    }

    // Validate currency
    const supportedCurrencies = ['USD', 'EUR'];
    if (!supportedCurrencies.includes(currency.toUpperCase())) {
      reasons.push('Unsupported currency');
      risk = 'high';
    }

    return {
      valid: risk !== 'high',
      risk,
      reasons,
    };
  }

  /**
   * Generate secure session token
   */
  generateSessionToken(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    const hash = this.simpleHash(timestamp + random);
    return `${timestamp}.${random}.${hash}`;
  }

  /**
   * Validate session token
   */
  validateSessionToken(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    const [timestamp, random, hash] = parts;
    const expectedHash = this.simpleHash(timestamp + random);

    // Check hash
    if (hash !== expectedHash) {
      return false;
    }

    // Check if token is not too old (24 hours)
    const tokenTime = parseInt(timestamp, 10);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (now - tokenTime > maxAge) {
      return false;
    }

    return true;
  }

  /**
   * Simple hash function (use proper crypto in production)
   */
  private simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Send to monitoring service (placeholder)
   */
  private sendToMonitoringService(entry: any): void {
    // In production, send to monitoring service like Sentry, DataDog, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_alert', {
        event_category: 'security',
        event_label: entry.activity,
        custom_parameter_ip: entry.ip,
      });
    }
  }

  /**
   * Clear old rate limit entries
   */
  cleanupRateLimits(): void {
    const now = Date.now();
    const maxAge = this.DEFAULT_CONFIG.windowMs;

    for (const [identifier, entry] of this.rateLimitMap.entries()) {
      if (now - entry.lastAttempt > maxAge) {
        this.rateLimitMap.delete(identifier);
      }
    }
  }

  /**
   * Get security statistics
   */
  getSecurityStats(): {
    activeRateLimits: number;
    blockedIPs: number;
    suspiciousActivities: number;
    recentAlerts: number;
  } {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const recentAlerts = this.suspiciousActivities.filter(
      activity => activity.timestamp.getTime() > oneHourAgo
    ).length;

    return {
      activeRateLimits: this.rateLimitMap.size,
      blockedIPs: this.blockedIPs.size,
      suspiciousActivities: this.suspiciousActivities.length,
      recentAlerts,
    };
  }
}

// Export singleton instance
export const securityService = new SecurityService();
export default securityService;