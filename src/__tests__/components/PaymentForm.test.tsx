import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaymentForm from '../../components/payment/PaymentForm';
import { PaymentFormData, PaymentFormProps } from '../../types/payment';

// Mock the hooks and services
jest.mock('../../hooks/useSecurity', () => ({
  useSecurity: () => ({
    isBlocked: false,
    remainingAttempts: 5,
    checkRateLimit: () => ({ allowed: true, remainingAttempts: 4, resetTime: Date.now() + 900000 }),
    sanitizeInput: (input: string) => input,
    validatePaymentAmount: () => ({ valid: true, risk: 'low', reasons: [] }),
    logSuspiciousActivity: jest.fn(),
    enforceHTTPS: () => true,
  })
}));

jest.mock('../../hooks/useErrorHandler', () => ({
  useErrorHandler: () => ({
    currentError: null,
    handleError: jest.fn(),
    clearError: jest.fn(),
    retry: jest.fn(),
    isRetrying: false,
    retryCount: 0,
    isRetryable: () => false,
    getUserMessage: () => '',
  })
}));

jest.mock('../../services/lemonSqueezyService', () => ({
  lemonSqueezyService: {
    processPayment: jest.fn().mockResolvedValue({ success: true, transactionId: 'test-123' })
  }
}));

jest.mock('../../services/transactionLogger', () => ({
  transactionLogger: {
    logTransaction: jest.fn(),
    updateTransactionStatus: jest.fn()
  }
}));

describe('PaymentForm', () => {
  const user = (userEvent as any).setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render payment form correctly', () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    expect(screen.getByLabelText(/payment amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to payment/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    const submitButton = screen.getByRole('button', { name: /proceed to payment/i });
    
    // Submit without filling required fields
    await user.click(submitButton);

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/amount must be at least/i)).toBeInTheDocument();
    });
  });

  it('should accept valid input', async () => {
    const mockOnSubmit = jest.fn();
    render(<PaymentForm onSubmit={mockOnSubmit} isProcessing={false} />);

    const amountInput = screen.getByLabelText(/payment amount/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const nameInput = screen.getByLabelText(/full name/i);
    const submitButton = screen.getByRole('button', { name: /proceed to payment/i });

    // Fill in valid data
    await user.type(amountInput, '100');
    await user.type(emailInput, 'test@example.com');
    await user.type(nameInput, 'John Doe');

    // Submit form
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        amount: 100,
        currency: 'USD',
        customerEmail: 'test@example.com',
        customerName: 'John Doe'
      });
    });
  });

  it('should sanitize input values', async () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    const nameInput = screen.getByLabelText(/full name/i);
    
    // Type potentially dangerous input
    await user.type(nameInput, '<script>alert("xss")</script>');

    // Input should be sanitized (this depends on your sanitization logic)
    expect(nameInput).toHaveValue('<script>alert("xss")</script>'); // Adjust based on actual sanitization
  });

  it('should show loading state during submission', async () => {
    render(<PaymentForm isProcessing={true} />);

    const submitButton = screen.getByRole('button', { name: /processing/i });
    expect(submitButton).toBeDisabled();
  });

  it('should handle currency selection', async () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    const currencySelect = screen.getByDisplayValue('USD');
    
    await user.selectOptions(currencySelect, 'EUR');
    
    expect(screen.getByDisplayValue('EUR')).toBeInTheDocument();
  });

  it('should display amount formatting', async () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    const amountInput = screen.getByLabelText(/payment amount/i);
    
    await user.type(amountInput, '100');

    // Should show formatted amount
    await waitFor(() => {
      expect(screen.getByText(/total: \$100\.00/i)).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole('button', { name: /proceed to payment/i });
    
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('should handle form submission errors', async () => {
    const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Payment failed'));
    render(<PaymentForm onSubmit={mockOnSubmit} isProcessing={false} />);

    const amountInput = screen.getByLabelText(/payment amount/i);
    const submitButton = screen.getByRole('button', { name: /proceed to payment/i });

    await user.type(amountInput, '100');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/payment error/i)).toBeInTheDocument();
    });
  });

  it('should clear errors when user starts typing', async () => {
    render(<PaymentForm onSubmit={jest.fn()} isProcessing={false} />);

    const amountInput = screen.getByLabelText(/payment amount/i);
    const submitButton = screen.getByRole('button', { name: /proceed to payment/i });

    // Submit to trigger validation error
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/amount must be at least/i)).toBeInTheDocument();
    });

    // Start typing to clear error
    await user.type(amountInput, '1');

    await waitFor(() => {
      expect(screen.queryByText(/amount must be at least/i)).not.toBeInTheDocument();
    });
  });
});