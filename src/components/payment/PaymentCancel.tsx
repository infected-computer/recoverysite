import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface PaymentCancelProps {
  onRetry?: () => void;
}

const PaymentCancel: React.FC<PaymentCancelProps> = ({ onRetry }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Navigate back to payment form
      navigate(-1);
    }
  };

  return (
    <div className="payment-cancel-page">
      <div className="container">
        <div className="cancel-card">
          {/* Cancel Icon */}
          <div className="cancel-icon">
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Cancel Message */}
          <h1>Payment Cancelled</h1>
          <p>You cancelled the payment process. No charges were made to your account.</p>

          {/* Information */}
          <div className="cancel-info">
            <div className="info-box">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>What happened?</h3>
                <p>
                  You chose to cancel the payment before it was completed. 
                  Your payment method was not charged, and no transaction was processed.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <h2>What would you like to do?</h2>
            <ul>
              <li>Try the payment again with the same or different details</li>
              <li>Return to the main website</li>
              <li>Contact support if you need assistance</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="actions">
            <button 
              onClick={handleRetry}
              className="btn btn-primary"
            >
              Try Payment Again
            </button>
            <Link to="/" className="btn btn-secondary">
              Return to Home
            </Link>
          </div>

          {/* Support Information */}
          <div className="support-info">
            <p>
              If you cancelled by mistake or need help with your payment, 
              please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;