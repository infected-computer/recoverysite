import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HiddenPaymentPage from '../../components/payment/HiddenPaymentPage';

// Mock the validation function
jest.mock('../../utils/paymentValidation', () => ({
  validateAccessToken: jest.fn()
}));

// Mock PaymentForm component
jest.mock('../../components/payment/PaymentForm', () => {
  return function MockPaymentForm() {
    return <div data-testid="payment-form">Payment Form</div>;
  };
});

// Mock LoadingSpinner component
jest.mock('../../components/common/LoadingSpinner', () => {
  return function MockLoadingSpinner({ message }: { message?: string }) {
    return <div data-testid="loading-spinner">{message}</div>;
  };
});

// Mock ErrorMessage component
jest.mock('../../components/common/ErrorMessage', () => {
  return function MockErrorMessage({ message, title }: { message: string; title?: string }) {
    return <div data-testid="error-message">{title}: {message}</div>;
  };
});

import { validateAccessToken } from '../../utils/paymentValidation';

const renderWithRouter = (component: React.ReactElement, searchParams = '') => {
  const url = `/?${searchParams}`;
  window.history.pushState({}, 'Test page', url);
  
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('HiddenPaymentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    validateAccessToken.mockReturnValue(true);
    
    renderWithRouter(<HiddenPaymentPage />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Verifying access...')).toBeInTheDocument();
  });

  it('should show payment form with valid token', async () => {
    validateAccessToken.mockReturnValue(true);
    
    renderWithRouter(<HiddenPaymentPage accessToken="valid-token" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('payment-form')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Secure Payment')).toBeInTheDocument();
    expect(screen.getByText('Complete your payment securely below')).toBeInTheDocument();
  });

  it('should redirect to 404 with invalid token', async () => {
    validateAccessToken.mockReturnValue(false);
    
    // Mock Navigate component to test redirect
    const mockNavigate = jest.fn();
    jest.doMock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      Navigate: ({ to, replace }: { to: string; replace: boolean }) => {
        mockNavigate(to, replace);
        return <div data-testid="navigate">Redirecting to {to}</div>;
      }
    }));
    
    renderWithRouter(<HiddenPaymentPage accessToken="invalid-token" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('navigate')).toBeInTheDocument();
    });
  });

  it('should get token from URL parameters', async () => {
    validateAccessToken.mockReturnValue(true);
    
    renderWithRouter(<HiddenPaymentPage />, 'token=url-token');
    
    await waitFor(() => {
      expect(validateAccessToken).toHaveBeenCalledWith('url-token');
      expect(screen.getByTestId('payment-form')).toBeInTheDocument();
    });
  });

  it('should prioritize access parameter over token parameter', async () => {
    validateAccessToken.mockReturnValue(true);
    
    renderWithRouter(<HiddenPaymentPage />, 'token=token-param&access=access-param');
    
    await waitFor(() => {
      expect(validateAccessToken).toHaveBeenCalledWith('access-param');
    });
  });

  it('should show error message when no token provided', async () => {
    renderWithRouter(<HiddenPaymentPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText(/Access Denied: Access token is required/)).toBeInTheDocument();
    });
  });

  it('should handle token validation errors gracefully', async () => {
    validateAccessToken.mockImplementation(() => {
      throw new Error('Validation error');
    });
    
    renderWithRouter(<HiddenPaymentPage accessToken="error-token" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('navigate')).toBeInTheDocument();
    });
  });

  it('should show error for invalid token', async () => {
    validateAccessToken.mockReturnValue(false);
    
    renderWithRouter(<HiddenPaymentPage accessToken="invalid-token" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('navigate')).toBeInTheDocument();
    });
  });
});