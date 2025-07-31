import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAccessControl } from '../../hooks/useAccessControl';
import LoadingSpinner from '../common/LoadingSpinner';

interface PaymentGuardProps {
  children: React.ReactNode;
  token?: string;
  requireAuth?: boolean;
}

const PaymentGuard: React.FC<PaymentGuardProps> = ({ 
  children, 
  token, 
  requireAuth = true 
}) => {
  const { isAuthorized, isLoading, error } = useAccessControl({
    token,
    required: requireAuth,
  });

  if (isLoading) {
    return (
      <div className="payment-guard-loading">
        <LoadingSpinner message="Verifying access..." />
      </div>
    );
  }

  if (requireAuth && !isAuthorized) {
    // Redirect to 404 to hide the existence of the payment page
    return <Navigate to="/404" replace />;
  }

  if (error) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

export default PaymentGuard;