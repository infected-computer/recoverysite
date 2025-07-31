import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HiddenPaymentPage from '../components/payment/HiddenPaymentPage';
import AdminAuth from '../components/admin/AdminAuth';
import AdminDashboard from '../components/admin/AdminDashboard';
import SecurityProvider from '../components/security/SecurityProvider';
import '../styles/payment.css';
import '../styles/paymentResults.css';
import '../styles/admin.css';
import '../styles/feedback.css';

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [adminSession, setAdminSession] = useState<string | null>(
    sessionStorage.getItem('admin_session')
  );

  // Check if this is an admin request
  const isAdminRequest = searchParams.get('admin') === 'true';
  
  // Get access token from URL
  const accessToken = searchParams.get('token') || searchParams.get('access');

  const handleAdminAuthenticated = (token: string) => {
    setAdminSession(token);
  };

  const handleAuthRequired = () => {
    // Redirect to admin auth if needed
    console.log('Admin authentication required');
  };

  return (
    <SecurityProvider>
      <div className="payment-page">
        <Helmet>
          <title>Secure Payment - Data Recovery Services</title>
          <meta name="description" content="Secure payment processing for data recovery services" />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Security headers */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          
          {/* Preconnect to payment providers */}
          <link rel="preconnect" href="https://api.lemonsqueezy.com" />
          <link rel="preconnect" href="https://lemonsqueezy.com" />
          
          {/* Disable caching for security */}
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
        </Helmet>

        {isAdminRequest ? (
          // Admin interface
          adminSession ? (
            <AdminDashboard 
              isAuthenticated={true}
              onAuthRequired={handleAuthRequired}
            />
          ) : (
            <AdminAuth onAuthenticated={handleAdminAuthenticated} />
          )
        ) : (
          // Regular payment interface
          <HiddenPaymentPage accessToken={accessToken} />
        )}
      </div>
    </SecurityProvider>
  );
};

export default PaymentPage;