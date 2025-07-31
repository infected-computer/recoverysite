import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { LemonSqueezyErrorType } from '../../types/payment';
import ErrorMessage from '../common/ErrorMessage';

interface PaymentErrorProps {
  error?: string;
  errorType?: LemonSqueezyErrorType;
  onRetry?: () => void;
}

const PaymentError: React.FC<PaymentErrorProps> = ({ 
  error, 
  errorType, 
  onRetry 
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState({
    message: error || 'An error occurred during payment processing',
    type: errorType || LemonSqueezyErrorType.API_ERROR,
    canRetry: true,
  });

  useEffect(() => {
    // Extract error details from URL parameters
    const errorParam = searchParams.get('error');
    const errorTypeParam = searchParams.get('error_type');
    const errorMessageParam = searchParams.get('error_message');

    if (errorParam || errorMessageParam) {
      setErrorDetails({
        message: errorMessageParam || errorParam || 'Payment failed',
        type: (errorTypeParam as LemonSqueezyErrorType) || LemonSqueezyErrorType.API_ERROR,
        canRetry: errorTypeParam !== LemonSqueezyErrorType.USER_CANCELLED,
      });
    }
  }, [searchParams]);

  const getErrorIcon = () => {
    switch (errorDetails.type) {
      case LemonSqueezyErrorType.USER_CANCELLED:
        return (
          <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case LemonSqueezyErrorType.PAYMENT_DECLINED:
        return (
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getErrorTitle = () => {
    switch (errorDetails.type) {
      case LemonSqueezyErrorType.USER_CANCELLED:
        return 'Payment Cancelled';
      case LemonSqueezyErrorType.PAYMENT_DECLINED:
        return 'Payment Declined';
      case LemonSqueezyErrorType.INVALID_AMOUNT:
        return 'Invalid Amount';
      case LemonSqueezyErrorType.NETWORK_ERROR:
        return 'Connection Error';
      default:
        return 'Payment Failed';
    }
  };

  const getErrorDescription = () => {
    switch (errorDetails.type) {
      case LemonSqueezyErrorType.USER_CANCELLED:
        return 'You cancelled the payment process. No charges were made to your account.';
      case LemonSqueezyErrorType.PAYMENT_DECLINED:
        return 'Your payment was declined. Please check your payment details and try again.';
      case LemonSqueezyErrorType.INVALID_AMOUNT:
        return 'The payment amount is invalid. Please check the amount and try again.';
      case LemonSqueezyErrorType.NETWORK_ERROR:
        return 'There was a problem connecting to our payment service. Please check your internet connection and try again.';
      default:
        return 'An unexpected error occurred while processing your payment. Please try again or contact support if the problem persists.';
    }
  };

  const getSuggestions = () => {
    switch (errorDetails.type) {
      case LemonSqueezyErrorType.PAYMENT_DECLINED:
        return [
          'Check that your card details are correct',
          'Ensure you have sufficient funds',
          'Try a different payment method',
          'Contact your bank if the problem persists',
        ];
      case LemonSqueezyErrorType.NETWORK_ERROR:
        return [
          'Check your internet connection',
          'Try refreshing the page',
          'Disable any VPN or proxy',
          'Try again in a few minutes',
        ];
      case LemonSqueezyErrorType.INVALID_AMOUNT:
        return [
          'Check that the amount is valid',
          'Ensure the amount is above the minimum',
          'Try entering the amount again',
        ];
      default:
        return [
          'Try the payment again',
          'Check your internet connection',
          'Contact support if the problem continues',
        ];
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Navigate back to payment form
      navigate(-1);
    }
  };

  return (
    <div className="payment-error-page">
      <div className="container">
        <div className="error-card">
          {/* Error Icon */}
          <div className="error-icon">
            {getErrorIcon()}
          </div>

          {/* Error Message */}
          <h1>{getErrorTitle()}</h1>
          <p className="error-description">{getErrorDescription()}</p>

          {/* Detailed Error Message */}
          {errorDetails.message && errorDetails.message !== getErrorDescription() && (
            <div className="error-details">
              <ErrorMessage 
                message={errorDetails.message}
                title="Error Details"
              />
            </div>
          )}

          {/* Suggestions */}
          <div className="suggestions">
            <h2>What you can do:</h2>
            <ul>
              {getSuggestions().map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="actions">
            {errorDetails.canRetry && (
              <button 
                onClick={handleRetry}
                className="btn btn-primary"
              >
                Try Again
              </button>
            )}
            <Link to="/" className="btn btn-secondary">
              Return to Home
            </Link>
          </div>

          {/* Support Information */}
          <div className="support-info">
            <div className="info-box">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>Need Help?</h3>
                <p>
                  If you continue to experience problems, please contact our support team. 
                  Include the error details above when contacting support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;