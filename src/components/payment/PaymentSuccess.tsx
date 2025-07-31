import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Transaction, TransactionStatus } from '../../types/payment';
import { formatAmount } from '../../utils/paymentValidation';
import { useReceipts } from '../../hooks/useReceipts';
import LoadingSpinner from '../common/LoadingSpinner';

interface PaymentSuccessProps {
  transaction?: Transaction;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ transaction }) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<Transaction | null>(transaction || null);
  
  const {
    generateReceipt,
    downloadReceipt,
    printReceipt,
    emailReceipt,
    lastReceipt,
    isGenerating,
    error: receiptError,
  } = useReceipts();

  useEffect(() => {
    // Extract transaction details from URL parameters
    const transactionId = searchParams.get('transaction_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const status = searchParams.get('status');

    if (transactionId && amount && currency) {
      const parsedTransaction: Transaction = {
        id: transactionId,
        amount: parseFloat(amount),
        currency: currency,
        status: (status as TransactionStatus) || TransactionStatus.COMPLETED,
        createdAt: new Date(),
        completedAt: new Date(),
        paymentMethodId: 'lemon-squeezy',
      };

      setTransactionData(parsedTransaction);
      
      // Generate receipt for the transaction
      try {
        generateReceipt(parsedTransaction);
      } catch (error) {
        console.error('Failed to generate receipt:', error);
      }
    }

    setIsLoading(false);
  }, [searchParams, transaction, generateReceipt]);

  if (isLoading) {
    return (
      <div className="payment-success-page">
        <div className="container">
          <LoadingSpinner message="Loading payment details..." />
        </div>
      </div>
    );
  }

  if (!transactionData) {
    return (
      <div className="payment-success-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1>Payment Successful!</h1>
            <p>Your payment has been processed successfully.</p>
            <div className="actions">
              <Link to="/" className="btn btn-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-page">
      <div className="container">
        <div className="success-card">
          {/* Success Icon */}
          <div className="success-icon">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Success Message */}
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment. Your transaction has been completed successfully.</p>

          {/* Transaction Details */}
          <div className="transaction-details">
            <h2>Transaction Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Transaction ID:</span>
                <span className="value">{transactionData.id}</span>
              </div>
              <div className="detail-item">
                <span className="label">Amount:</span>
                <span className="value amount">
                  {formatAmount(transactionData.amount, transactionData.currency)}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className={`value status ${transactionData.status}`}>
                  {transactionData.status.charAt(0).toUpperCase() + transactionData.status.slice(1)}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">
                  {transactionData.completedAt?.toLocaleDateString() || new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Time:</span>
                <span className="value">
                  {transactionData.completedAt?.toLocaleTimeString() || new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Receipt Information */}
          <div className="receipt-info">
            <div className="info-box">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>Receipt</h3>
                <p>A receipt has been sent to your email address. You can also download it from your Lemon Squeezy account.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            {lastReceipt && (
              <>
                <button 
                  onClick={() => printReceipt(lastReceipt)} 
                  className="btn btn-secondary"
                  disabled={isGenerating}
                >
                  Print Receipt
                </button>
                <button 
                  onClick={() => downloadReceipt(lastReceipt, 'html')} 
                  className="btn btn-secondary"
                  disabled={isGenerating}
                >
                  Download Receipt
                </button>
              </>
            )}
          </div>

          {/* Support Information */}
          <div className="support-info">
            <p>
              If you have any questions about this transaction, please contact our support team 
              with your transaction ID: <strong>{transactionData.id}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;