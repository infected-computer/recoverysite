import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface FontFallbackNoticeProps {
  onDismiss?: () => void;
}

export const FontFallbackNotice: React.FC<FontFallbackNoticeProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this notice
    const dismissed = localStorage.getItem('font_fallback_notice_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      return;
    }

    // Check for font loading issues after a delay
    const timer = setTimeout(() => {
      // Simple check for font loading issues
      const hasSlowNetwork = navigator.connection && navigator.connection.effectiveType === 'slow-2g';
      const hasFontErrors = document.querySelectorAll('link[rel="stylesheet"]').length > 0;
      
      if (hasSlowNetwork || hasFontErrors) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('font_fallback_notice_dismissed', 'true');
    onDismiss?.();
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm bg-amber-50 border border-amber-200 rounded-lg shadow-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-amber-800 mb-1">
            טעינת פונטים איטית
          </h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            נראה שהפונטים נטענים לאט בגלל רשת איטית. האתר עובר לפונטים חלופיים לחוויה טובה יותר.
          </p>
          <p className="text-xs text-amber-600 mt-2">
            זה לא משפיע על תפקוד האתר.
          </p>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 text-amber-500 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded"
          aria-label="סגור הודעה"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FontFallbackNotice;