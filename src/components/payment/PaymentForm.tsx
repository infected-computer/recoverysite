import React, { useState, useEffect } from 'react';
import { PaymentFormData, PaymentFormProps, ValidationError } from '../../types/payment';
import { validatePaymentForm, formatAmount, sanitizeInput } from '../../utils/paymentValidation';
import { useSecurity } from '../../hooks/useSecurity';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { PAYMENT_CONFIG } from '../../config/payment';
import { lemonSqueezyService } from '../../services/lemonSqueezyService';
import { transactionLogger } from '../../services/transactionLogger';
import { Transaction, TransactionStatus } from '../../types/payment';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import UserFeedback from '../feedback/UserFeedback';

const PaymentForm: React.FC<Partial<PaymentFormProps>> = ({ 
  onSubmit,
  isProcessing = false 
}) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    currency: 'ILS',
    customerEmail: '',
    customerName: '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Security hooks
  const {
    isBlocked,
    remainingAttempts,
    checkRateLimit,
    sanitizeInput: securitySanitize,
    validatePaymentAmount,
    logSuspiciousActivity,
    enforceHTTPS,
  } = useSecurity({
    identifier: 'payment_form',
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  });

  // Error handling hooks
  const {
    currentError,
    handleError,
    clearError,
    retry,
    isRetrying,
    retryCount,
    isRetryable,
    getUserMessage,
  } = useErrorHandler({
    context: 'payment_form',
    maxRetries: 3,
    onError: (error) => {
      logSuspiciousActivity('payment_error', {
        type: error.type,
        severity: error.severity,
        message: error.message,
      });
    },
  });

  // Enforce HTTPS on component mount
  useEffect(() => {
    enforceHTTPS();
  }, [enforceHTTPS]);

  const handleInputChange = (field: keyof PaymentFormData, value: string | number) => {
    let processedValue = value;
    
    // Sanitize string inputs with security service
    if (typeof value === 'string') {
      processedValue = securitySanitize(value);
    }
    
    // Handle amount input specifically
    if (field === 'amount' && typeof value === 'string') {
      const numericValue = parseFloat(value);
      processedValue = isNaN(numericValue) ? 0 : numericValue;
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue,
    }));

    // Clear field-specific errors when user starts typing
    setErrors(prev => prev.filter(error => error.field !== field));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if blocked by rate limiting
    if (isBlocked) {
      setSubmitError(`Too many attempts. Please try again later. Remaining attempts: ${remainingAttempts}`);
      return;
    }

    // Check rate limit
    const rateLimitResult = checkRateLimit();
    if (!rateLimitResult.allowed) {
      setSubmitError(`Rate limit exceeded. Please try again later.`);
      logSuspiciousActivity('rate_limit_exceeded', { attempts: rateLimitResult.remainingAttempts });
      return;
    }

    // Validate form data
    const validationErrors = validatePaymentForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      logSuspiciousActivity('validation_failed', { errors: validationErrors });
      return;
    }

    // Security validation for payment amount
    const amountValidation = validatePaymentAmount(formData.amount, formData.currency);
    if (!amountValidation.valid) {
      setSubmitError(`Payment amount validation failed: ${amountValidation.reasons.join(', ')}`);
      logSuspiciousActivity('suspicious_amount', {
        amount: formData.amount,
        currency: formData.currency,
        risk: amountValidation.risk,
        reasons: amountValidation.reasons,
      });
      return;
    }

    // Log high-risk transactions
    if (amountValidation.risk === 'high') {
      logSuspiciousActivity('high_risk_transaction', {
        amount: formData.amount,
        currency: formData.currency,
        reasons: amountValidation.reasons,
      });
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setErrors([]);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Create transaction record
        const transaction: Transaction = {
          id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: formData.amount,
          currency: formData.currency,
          status: TransactionStatus.PENDING,
          createdAt: new Date(),
          paymentMethodId: 'lemon-squeezy',
          customerInfo: {
            email: formData.customerEmail,
            name: formData.customerName,
          },
        };

        // Log the transaction
        transactionLogger.logTransaction(transaction);

        // Process payment with Lemon Squeezy
        const result = await lemonSqueezyService.processPayment(formData);
        
        if (!result.success) {
          // Update transaction status to failed
          transactionLogger.updateTransactionStatus(transaction.id, TransactionStatus.FAILED);
          throw new Error(result.error || 'Payment processing failed');
        }
        
        // If we reach here, the user should have been redirected to Lemon Squeezy
        // This is a fallback in case the redirect didn't work
        console.log('Payment initiated successfully:', result);
      }
    } catch (error) {
      const errorDetails = handleError(error, 'payment_submission');
      setSubmitError(errorDetails.userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  const isFormValid = errors.length === 0 && formData.amount > 0;
  const showProcessing = isProcessing || isSubmitting;

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Payment Amount *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                {formData.currency === 'ILS' ? '₪' : formData.currency === 'USD' ? '$' : '€'}
              </span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              min={PAYMENT_CONFIG.VALIDATION.MIN_AMOUNT}
              max={PAYMENT_CONFIG.VALIDATION.MAX_AMOUNT}
              step="0.01"
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className={`block w-full pl-7 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                getFieldError('amount') ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.00"
              disabled={showProcessing}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="border-0 bg-transparent text-gray-500 focus:ring-0 focus:border-0"
                disabled={showProcessing}
              >
                {PAYMENT_CONFIG.VALIDATION.SUPPORTED_CURRENCIES.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {getFieldError('amount') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('amount')}</p>
          )}
          {formData.amount > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              Total: {formatAmount(formData.amount, formData.currency)}
            </p>
          )}
        </div>

        {/* Customer Email */}
        <div className="form-group">
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address (Optional)
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              getFieldError('customerEmail') ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
            disabled={showProcessing}
          />
          {getFieldError('customerEmail') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('customerEmail')}</p>
          )}
        </div>

        {/* Customer Name */}
        <div className="form-group">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name (Optional)
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              getFieldError('customerName') ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Your full name"
            disabled={showProcessing}
          />
          {getFieldError('customerName') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('customerName')}</p>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <ErrorMessage 
            message={submitError}
            title="Payment Error"
            onRetry={isRetryable() ? () => retry(() => handleSubmit({ preventDefault: () => {} } as any)) : undefined}
          />
        )}

        {/* User Feedback */}
        <UserFeedback
          error={currentError}
          isLoading={showProcessing}
          isRetrying={isRetrying}
          retryCount={retryCount}
          maxRetries={3}
          onRetry={isRetryable() ? () => retry(() => handleSubmit({ preventDefault: () => {} } as any)) : undefined}
          onDismiss={clearError}
        />

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            disabled={!isFormValid || showProcessing}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              !isFormValid || showProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {showProcessing ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Processing...</span>
              </>
            ) : (
              <>
                Proceed to Payment
                {formData.amount > 0 && (
                  <span className="ml-2">
                    ({formatAmount(formData.amount, formData.currency)})
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure payment powered by Lemon Squeezy</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;