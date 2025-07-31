import { useState, useEffect } from 'react';
import { validateAccessToken } from '../utils/paymentValidation';
import { PaymentPageState } from '../types/payment';

interface UseAccessControlProps {
  token?: string;
  required?: boolean;
}

export const useAccessControl = ({ token, required = true }: UseAccessControlProps) => {
  const [state, setState] = useState<PaymentPageState>({
    isAuthorized: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (!required) {
          setState({
            isAuthorized: true,
            isLoading: false,
            error: null,
          });
          return;
        }

        if (!token) {
          setState({
            isAuthorized: false,
            isLoading: false,
            error: 'Access token is required',
          });
          return;
        }

        const isValid = validateAccessToken(token);
        
        setState({
          isAuthorized: isValid,
          isLoading: false,
          error: isValid ? null : 'Invalid or expired access token',
        });
      } catch (error) {
        setState({
          isAuthorized: false,
          isLoading: false,
          error: 'Failed to validate access',
        });
      }
    };

    // Add small delay to prevent flash
    const timer = setTimeout(checkAccess, 100);
    return () => clearTimeout(timer);
  }, [token, required]);

  const retry = () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
  };

  return {
    ...state,
    retry,
  };
};