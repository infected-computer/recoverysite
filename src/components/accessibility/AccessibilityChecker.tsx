/**
 * Development-time accessibility checker component
 * Only runs in development mode
 */

import React, { useEffect } from 'react';
import { auditImageAltText } from '../../utils/imageAltAudit';
import { runPerformanceAudit } from '../../utils/performanceOptimization';
import { auditContentConsistency } from '../../utils/contentConsistency';
import { runAllResponsiveTests } from '../../tests/responsive.test';

interface AccessibilityCheckerProps {
  children: React.ReactNode;
}

const AccessibilityChecker: React.FC<AccessibilityCheckerProps> = ({ children }) => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    let axe: any;

    // Dynamically import axe-core to avoid including it in production
    const loadAxe = async () => {
      try {
        const axeModule = await import('@axe-core/react');
        axe = axeModule.default;
        
        // Configure axe
        axe(React, React.DOM, 1000, {
          rules: {
            // Enable all WCAG 2.2 AA rules
            'color-contrast': { enabled: true },
            'color-contrast-enhanced': { enabled: true },
            'focus-order-semantics': { enabled: true },
            'hidden-content': { enabled: true },
            'label-title-only': { enabled: true },
            'link-in-text-block': { enabled: true },
            'meta-refresh': { enabled: true },
            'p-as-heading': { enabled: true },
            'region': { enabled: true },
            'skip-link': { enabled: true },
            'tabindex': { enabled: true }
          },
          tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
        });

        console.log('🔍 Accessibility checker initialized');
        
        // Run comprehensive audits after a short delay
        setTimeout(() => {
          auditImageAltText();
          auditContentConsistency();
          runAllResponsiveTests();
          runPerformanceAudit();
        }, 2000);
      } catch (error) {
        console.warn('Failed to load accessibility checker:', error);
      }
    };

    loadAxe();

    // Cleanup
    return () => {
      if (axe && typeof axe.tearDown === 'function') {
        axe.tearDown();
      }
    };
  }, []);

  return <>{children}</>;
};

export default AccessibilityChecker;