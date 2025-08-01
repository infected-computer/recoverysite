import React, { useState } from 'react';
import { lemonSqueezyService } from '../../services/lemonSqueezyService';

interface SimplePaymentFormData {
  amount: number;
  customerEmail: string;
  customerName: string;
}

interface PaymentFormProps {
  onSubmit?: (data: SimplePaymentFormData) => void;
  isProcessing?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isProcessing = false }) => {
  const [formData, setFormData] = useState<SimplePaymentFormData>({
    amount: 0,
    customerEmail: '',
    customerName: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SimplePaymentFormData, value: string | number) => {
    if (field === 'amount' && typeof value === 'string') {
      const numericValue = parseFloat(value);
      value = isNaN(numericValue) ? 0 : numericValue;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount <= 0) {
      setError('אנא הזן סכום תקין');
      return;
    }

    if (formData.amount < 10) {
      setError('סכום מינימלי לתשלום: 10 ₪');
      return;
    }

    if (formData.amount > 10000) {
      setError('סכום מקסימלי לתשלום: 10,000 ₪');
      return;
    }

    setError(null);

    try {
      const paymentData = {
        amount: formData.amount,
        currency: 'ILS' as const,
        customerEmail: formData.customerEmail || undefined,
        customerName: formData.customerName || undefined,
      };

      const result = await lemonSqueezyService.processPayment(paymentData);
      
      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else if (!result.success) {
        throw new Error(result.error || 'התשלום נכשל. אנא נסה שוב.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'אירעה שגיאה בעיבוד התשלום');
    }
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(amount);
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            סכום לתשלום (בשקלים) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₪</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              min="10"
              max="10000"
              step="1"
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="הזן סכום בשקלים"
              disabled={isProcessing}
              required
            />
          </div>
          {formData.amount > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              סה"כ: {formatAmount(formData.amount)}
            </p>
          )}
        </div>

        {/* Customer Email */}
        <div className="form-group">
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
            כתובת אימייל (אופציונלי)
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
            disabled={isProcessing}
          />
        </div>

        {/* Customer Name */}
        <div className="form-group">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            שם מלא (אופציונלי)
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="השם המלא שלך"
            disabled={isProcessing}
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            disabled={formData.amount <= 0 || isProcessing}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              formData.amount <= 0 || isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <span>מעבד תשלום...</span>
            ) : (
              <>
                המשך לתשלום
                {formData.amount > 0 && (
                  <span className="mr-2">
                    ({formatAmount(formData.amount)})
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>תשלום מאובטח באמצעות Lemon Squeezy</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;