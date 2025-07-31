import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import PaymentPage from '../../pages/PaymentPage';

// Mock all the dependencies
jest.mock('../../components/security/SecurityProvider', () => {
  return function MockSecurityProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="security-provider">{children}</div>;
  };
});

jest.mock('../../components/payment/HiddenPaymentPage', () => {
  return function MockHiddenPaymentPage({ accessToken }: { accessToken?: string }) {
    return (
      <div data-testid="hidden-payment-page">
        <div>Access Token: {accessToken || 'none'}</div>
        <div data-testid="payment-form">
          <input data-testid="amount-input" placeholder="Amount" />
          <input data-testid="email-input" placeholder="Email" />
          <button data-testid="submit-button">Pay Now</button>
        </div>
      </div>
    );
  };
});

jest.mock('../../components/admin/AdminAuth', () => {
  return function MockAdminAuth({ onAuthenticated }: { onAuthenticated: (token: string) => void }) {
    return (
      <div data-testid="admin-auth">
        <button onClick={() => onAuthenticated('admin-token')}>
          Sign In as Admin
        </button>
      </div>
    );
  };
});

jest.mock('../../components/admin/AdminDashboard', () => {
  return function MockAdminDashboard() {
    return <div data-testid="admin-dashboard">Admin Dashboard</div>;
  };
});

const renderWithRouter = (searchParams = '') => {
  const url = `/secure-payment?${searchParams}`;
  window.history.pushState({}, 'Test page', url);
  
  return render(
    <BrowserRouter>
      <PaymentPage />
    </BrowserRouter>
  );
};

describe('Payment Flow Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true
    });
  });

  describe('Regular Payment Flow', () => {
    it('should render payment page with access token', () => {
      renderWithRouter('token=test-token');
      
      expect(screen.getByTestId('security-provider')).toBeInTheDocument();
      expect(screen.getByTestId('hidden-payment-page')).toBeInTheDocument();
      expect(screen.getByText('Access Token: test-token')).toBeInTheDocument();
    });

    it('should render payment page without token', () => {
      renderWithRouter();
      
      expect(screen.getByTestId('hidden-payment-page')).toBeInTheDocument();
      expect(screen.getByText('Access Token: none')).toBeInTheDocument();
    });

    it('should handle payment form interaction', async () => {
      renderWithRouter('token=test-token');
      
      const amountInput = screen.getByTestId('amount-input');
      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');
      
      await user.type(amountInput, '100');
      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);
      
      // Verify interactions work
      expect(amountInput).toHaveValue('100');
      expect(emailInput).toHaveValue('test@example.com');
    });
  });

  describe('Admin Flow', () => {
    it('should show admin auth when admin=true', () => {
      renderWithRouter('admin=true');
      
      expect(screen.getByTestId('admin-auth')).toBeInTheDocument();
      expect(screen.queryByTestId('hidden-payment-page')).not.toBeInTheDocument();
    });

    it('should show admin dashboard after authentication', async () => {
      renderWithRouter('admin=true');
      
      const signInButton = screen.getByText('Sign In as Admin');
      await user.click(signInButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
      });
      
      expect(screen.queryByTestId('admin-auth')).not.toBeInTheDocument();
    });

    it('should show admin dashboard if already authenticated', () => {
      // Mock existing session
      (window.sessionStorage.getItem as jest.Mock).mockReturnValue('existing-admin-token');
      
      renderWithRouter('admin=true');
      
      expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
      expect(screen.queryByTestId('admin-auth')).not.toBeInTheDocument();
    });
  });

  describe('Security Headers', () => {
    it('should set appropriate meta tags', () => {
      renderWithRouter();
      
      // Check for security-related meta tags
      const metaTags = document.querySelectorAll('meta');
      const metaTagsArray = Array.from(metaTags);
      
      expect(metaTagsArray.some(tag => 
        tag.getAttribute('name') === 'robots' && 
        tag.getAttribute('content') === 'noindex, nofollow'
      )).toBe(true);
      
      expect(metaTagsArray.some(tag => 
        tag.getAttribute('http-equiv') === 'X-Content-Type-Options' && 
        tag.getAttribute('content') === 'nosniff'
      )).toBe(true);
    });

    it('should preconnect to payment providers', () => {
      renderWithRouter();
      
      const linkTags = document.querySelectorAll('link[rel="preconnect"]');
      const linkTagsArray = Array.from(linkTags);
      
      expect(linkTagsArray.some(link => 
        link.getAttribute('href') === 'https://api.lemonsqueezy.com'
      )).toBe(true);
      
      expect(linkTagsArray.some(link => 
        link.getAttribute('href') === 'https://lemonsqueezy.com'
      )).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle component errors gracefully', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // This would test error boundaries if implemented
      renderWithRouter();
      
      expect(screen.getByTestId('security-provider')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('should have proper page title', () => {
      renderWithRouter();
      
      expect(document.title).toContain('Secure Payment');
    });

    it('should have proper viewport meta tag', () => {
      renderWithRouter();
      
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      expect(viewportMeta?.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });
  });
});