import { transactionLogger } from '../../services/transactionLogger';
import { Transaction, TransactionStatus } from '../../types/payment';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('TransactionLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  const mockTransaction: Transaction = {
    id: 'test-transaction-1',
    amount: 100,
    currency: 'USD',
    status: TransactionStatus.COMPLETED,
    createdAt: new Date(),
    completedAt: new Date(),
    paymentMethodId: 'lemon-squeezy',
    customerInfo: {
      email: 'test@example.com',
      name: 'John Doe'
    }
  };

  describe('logTransaction', () => {
    it('should log a transaction successfully', () => {
      transactionLogger.logTransaction(mockTransaction);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'payment_transactions',
        expect.stringContaining(mockTransaction.id)
      );
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      // Should not throw
      expect(() => {
        transactionLogger.logTransaction(mockTransaction);
      }).not.toThrow();
    });
  });

  describe('getTransactions', () => {
    it('should return empty array when no transactions exist', () => {
      const transactions = transactionLogger.getTransactions();
      expect(transactions).toEqual([]);
    });

    it('should return stored transactions', () => {
      const storedTransactions = [mockTransaction];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedTransactions));

      const transactions = transactionLogger.getTransactions();
      expect(transactions).toHaveLength(1);
      expect(transactions[0].id).toBe(mockTransaction.id);
    });

    it('should filter transactions by status', () => {
      const transactions = [
        { ...mockTransaction, status: TransactionStatus.COMPLETED },
        { ...mockTransaction, id: 'test-2', status: TransactionStatus.PENDING }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const completedTransactions = transactionLogger.getTransactions({
        status: TransactionStatus.COMPLETED
      });

      expect(completedTransactions).toHaveLength(1);
      expect(completedTransactions[0].status).toBe(TransactionStatus.COMPLETED);
    });

    it('should filter transactions by amount range', () => {
      const transactions = [
        { ...mockTransaction, amount: 50 },
        { ...mockTransaction, id: 'test-2', amount: 150 }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const filteredTransactions = transactionLogger.getTransactions({
        minAmount: 100,
        maxAmount: 200
      });

      expect(filteredTransactions).toHaveLength(1);
      expect(filteredTransactions[0].amount).toBe(150);
    });
  });

  describe('updateTransactionStatus', () => {
    it('should update transaction status successfully', () => {
      const transactions = [mockTransaction];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const success = transactionLogger.updateTransactionStatus(
        mockTransaction.id,
        TransactionStatus.FAILED
      );

      expect(success).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should return false for non-existent transaction', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify([]));

      const success = transactionLogger.updateTransactionStatus(
        'non-existent',
        TransactionStatus.FAILED
      );

      expect(success).toBe(false);
    });
  });

  describe('exportTransactions', () => {
    it('should export transactions as JSON', () => {
      const transactions = [mockTransaction];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const exported = transactionLogger.exportTransactions('json');
      const parsed = JSON.parse(exported);

      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe(mockTransaction.id);
    });

    it('should export transactions as CSV', () => {
      const transactions = [mockTransaction];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const exported = transactionLogger.exportTransactions('csv');

      expect(exported).toContain('ID,Amount,Currency');
      expect(exported).toContain(mockTransaction.id);
      expect(exported).toContain(mockTransaction.amount.toString());
    });
  });

  describe('getTransactionStats', () => {
    it('should calculate statistics correctly', () => {
      const transactions = [
        { ...mockTransaction, status: TransactionStatus.COMPLETED, amount: 100 },
        { ...mockTransaction, id: 'test-2', status: TransactionStatus.PENDING, amount: 50 },
        { ...mockTransaction, id: 'test-3', status: TransactionStatus.FAILED, amount: 75 }
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const stats = transactionLogger.getTransactionStats();

      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(1);
      expect(stats.pending).toBe(1);
      expect(stats.failed).toBe(1);
      expect(stats.totalAmount).toBe(100); // Only completed transactions
      expect(stats.averageAmount).toBe(100);
    });
  });

  describe('detectSuspiciousTransactions', () => {
    it('should detect high-amount transactions', () => {
      const suspiciousTransaction = {
        ...mockTransaction,
        amount: 5000 // High amount
      };
      const transactions = [mockTransaction, suspiciousTransaction];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(transactions));

      const suspicious = transactionLogger.detectSuspiciousTransactions();

      expect(suspicious.length).toBeGreaterThan(0);
      expect(suspicious.some(t => t.amount === 5000)).toBe(true);
    });

    it('should detect multiple failed transactions', () => {
      const now = new Date();
      const failedTransactions = Array.from({ length: 5 }, (_, i) => ({
        ...mockTransaction,
        id: `failed-${i}`,
        status: TransactionStatus.FAILED,
        createdAt: now,
        customerInfo: { email: 'same@example.com' }
      }));

      localStorageMock.getItem.mockReturnValue(JSON.stringify(failedTransactions));

      const suspicious = transactionLogger.detectSuspiciousTransactions();

      expect(suspicious.length).toBeGreaterThan(0);
    });
  });
});