import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getAnalyticsConfig, shouldLoadAnalytics } from '../../config/analytics';

interface GoogleAnalyticsProps {
    trackingId: string;
    enabled?: boolean;
}

/**
 * Google Analytics component with privacy compliance
 * Only loads in production or when explicitly enabled
 */
export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
    trackingId,
    enabled
}) => {
    const config = getAnalyticsConfig();
    const shouldLoad = enabled !== undefined ? enabled : shouldLoadAnalytics();
    const finalTrackingId = trackingId || config.trackingId;

    // Don't load analytics if disabled or no tracking ID
    if (!shouldLoad || !finalTrackingId) {
        return null;
    }

    return (
        <Helmet>
            {/* Google Analytics gtag.js */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${finalTrackingId}`}
            />
            <script>
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Configure consent
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            functionality_storage: 'granted',
            personalization_storage: 'denied',
            security_storage: 'granted'
          });
          
          gtag('config', '${finalTrackingId}', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: ${config.privacy.ANONYMIZE_IP},
            allow_google_signals: ${config.privacy.ALLOW_GOOGLE_SIGNALS},
            allow_ad_personalization_signals: ${config.privacy.ALLOW_AD_PERSONALIZATION},
            cookie_expires: ${config.privacy.COOKIE_EXPIRES},
            send_page_view: true,
            debug_mode: ${config.debug}
          });
          
          ${config.debug ? `console.log('Google Analytics initialized with ID: ${finalTrackingId}');` : ''}
        `}
            </script>
        </Helmet>
    );
};

/**
 * Analytics utility functions
 */
export const analytics = {
    /**
     * Track page view
     */
    pageView: (path: string, title?: string) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', 'G-82L3JHL449', {
                page_path: path,
                page_title: title || document.title,
            });
        }
    },

    /**
     * Track custom event
     */
    event: (action: string, category: string, label?: string, value?: number) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    },

    /**
     * Track form submission
     */
    trackFormSubmission: (formName: string, success: boolean = true) => {
        analytics.event(
            success ? 'form_submit_success' : 'form_submit_error',
            'engagement',
            formName
        );
    },

    /**
     * Track button clicks
     */
    trackButtonClick: (buttonName: string, location: string) => {
        analytics.event('click', 'engagement', `${buttonName}_${location}`);
    },

    /**
     * Track WhatsApp clicks
     */
    trackWhatsAppClick: (location: string) => {
        analytics.event('whatsapp_click', 'contact', location);
    },

    /**
     * Track phone clicks
     */
    trackPhoneClick: (location: string) => {
        analytics.event('phone_click', 'contact', location);
    },

    /**
     * Track email clicks
     */
    trackEmailClick: (location: string) => {
        analytics.event('email_click', 'contact', location);
    },

    /**
     * Track service page views
     */
    trackServiceView: (serviceName: string) => {
        analytics.event('service_view', 'services', serviceName);
    },

    /**
     * Track pricing interactions
     */
    trackPricingInteraction: (action: string, plan?: string) => {
        analytics.event(action, 'pricing', plan);
    },

    /**
     * Track file upload attempts
     */
    trackFileUpload: (fileType: string, fileSize: number) => {
        analytics.event('file_upload', 'engagement', fileType, fileSize);
    },

    /**
     * Track search queries
     */
    trackSearch: (query: string) => {
        analytics.event('search', 'engagement', query);
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth: (depth: number) => {
        analytics.event('scroll', 'engagement', `${depth}%`, depth);
    },

    /**
     * Track time on page
     */
    trackTimeOnPage: (seconds: number, page: string) => {
        analytics.event('time_on_page', 'engagement', page, seconds);
    }
};

// Extend Window interface for TypeScript
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export default GoogleAnalytics;