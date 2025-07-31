import React, { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { validateAccessToken } from '../../utils/paymentValidation';
import { HiddenPaymentPageProps, PaymentPageState } from '../../types/payment';
import PaymentForm from './PaymentForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const HiddenPaymentPage: React.FC<HiddenPaymentPageProps> = ({ accessToken }) => {
  const [searchParams] = useSearchParams();
  const [pageState, setPageState] = useState<PaymentPageState>({
    isAuthorized: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const validateAccess = () => {
      // Get token from props or URL parameters
      const token = accessToken || searchParams.get('token') || searchParams.get('access');
      
      if (!token) {
        setPageState({
          isAuthorized: false,
          isLoading: false,
          error: 'Access token is required',
        });
        return;
      }

      // Validate the access token
      const isValid = validateAccessToken(token);
      
      if (isValid) {
        setPageState({
          isAuthorized: true,
          isLoading: false,
          error: null,
        });
      } else {
        setPageState({
          isAuthorized: false,
          isLoading: false,
          error: 'Invalid access token',
        });
      }
    };

    // Add a small delay to prevent flash of loading state
    const timer = setTimeout(validateAccess, 100);
    return () => clearTimeout(timer);
  }, [accessToken, searchParams]);

  // Show loading state
  if (pageState.isLoading) {
    return (
      <div className="hidden-payment-page">
        <div className="container">
          <LoadingSpinner message="Verifying access..." />
        </div>
      </div>
    );
  }

  // Show 404 for unauthorized access
  if (!pageState.isAuthorized) {
    return <Navigate to="/404" replace />;
  }

  // Show error if there's an error
  if (pageState.error) {
    return (
      <div className="hidden-payment-page">
        <div className="container">
          <ErrorMessage 
            message={pageState.error}
            title="Access Denied"
          />
        </div>
      </div>
    );
  }

  // Show the payment form for authorized users
  return (
    <div className="hidden-payment-page">
      <div className="container">
        <div className="payment-wrapper">
          <div className="payment-header">
            <h1>Secure Payment</h1>
            <p>Complete your payment securely below</p>
          </div>
          
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default HiddenPaymentPage;