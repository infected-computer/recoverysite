import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { optInToAnalytics, optOutOfAnalytics } from '../../config/analytics';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    optInToAnalytics();
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    optOutOfAnalytics();
    setIsVisible(false);
    onDecline?.();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            <Cookie className="w-6 h-6 text-blue-600" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-800 mb-3">
              <p className="font-medium mb-2">
                🍪 אנחנו משתמשים בעוגיות כדי לשפר את החוויה שלך
              </p>
              <p className="text-gray-600">
                האתר שלנו משתמש בעוגיות אנליטיקס כדי להבין איך המבקרים משתמשים באתר ולשפר את השירות. 
                המידע נאסף באופן אנונימי ולא משותף עם צדדים שלישיים.
              </p>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    סוגי העוגיות שאנו משתמשים בהן:
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• <strong>עוגיות חיוניות:</strong> נדרשות לתפקוד בסיסי של האתר</li>
                    <li>• <strong>עוגיות אנליטיקס:</strong> Google Analytics לניתוח תנועה באתר</li>
                    <li>• <strong>עוגיות פונקציונליות:</strong> שמירת העדפות המשתמש</li>
                  </ul>
                  <p className="mt-2 text-gray-500">
                    ניתן לשנות את ההעדפות בכל עת דרך הגדרות הדפדפן או ליצור איתנו קשר.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                אני מסכים
              </button>
              
              <button
                onClick={handleDecline}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                לא תודה
              </button>
              
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                <Settings className="w-4 h-4 inline mr-1" />
                {showDetails ? 'הסתר פרטים' : 'עוד פרטים'}
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
            aria-label="סגור הודעת עוגיות"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Privacy settings component for managing cookie preferences
 */
export const PrivacySettings: React.FC = () => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const optOut = localStorage.getItem('analytics_opt_out');
    setAnalyticsEnabled(optOut !== 'true');
  }, []);

  const handleAnalyticsToggle = (enabled: boolean) => {
    setAnalyticsEnabled(enabled);
    if (enabled) {
      optInToAnalytics();
    } else {
      optOutOfAnalytics();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        הגדרות פרטיות
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium text-gray-800">עוגיות אנליטיקס</label>
            <p className="text-sm text-gray-600">עוזרות לנו לשפר את האתר</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => handleAnalyticsToggle(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${
              analyticsEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                analyticsEnabled ? 'translate-x-5' : 'translate-x-0'
              } mt-0.5 ml-0.5`} />
            </div>
          </label>
        </div>
        
        <div className="text-xs text-gray-500 pt-2 border-t">
          השינויים יכנסו לתוקף בטעינה הבאה של הדף
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;