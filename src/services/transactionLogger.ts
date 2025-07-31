import { 
  Transaction, 
  TransactionLogger, 
  TransactionFilter, 
  TransactionStatus 
} from '../types/payment';

class TransactionLoggerService implements TransactionLogger {
  private readonly STORAGE_KEY = 'payment_transactions';
  private readonly MAX_TRANSACTIONS = 1000; // Limit stored transactions

  /**
   * Log a new transaction
   */
  logTransaction(transaction: Transaction): void {
    try {
      const transactions = this.getStoredTransactions();
      
      // Add timestamp if not provided
      const transactionWithTimestamp = {
        ...transaction,
        createdAt: transaction.createdAt || new Date(),
      };

      // Add to beginning of array (most recent first)
      transactions.unshift(transactionWithTimestamp);

      // Limit the number of stored transactions
      if (transactions.length > this.MAX_TRANSACTIONS) {
        transactions.splice(this.MAX_TRANSACTIONS);
      }

      // Save to localStorage
      this.saveTransactions(transactions);

      // Log to console for debugging
      console.log('Transaction logged:', transactionWithTimestamp);
    } catch (error) {
      console.error('Failed to log transaction:', error);
    }
  }

  /**
   * Get transactions with optional filtering
   */
  getTransactions(filter?: TransactionFilter): Transaction[] {
    try {
      let transactions = this.getStoredTransactions();

      if (!filter) {
        return transactions;
      }

      // Apply filters
      if (filter.status) {
        transactions = transactions.filter(t => t.status === filter.status);
      }

      if (filter.dateFrom) {
        transactions = transactions.filter(t => 
          new Date(t.createdAt) >= filter.dateFrom!
        );
      }

      if (filter.dateTo) {
        transactions = transactions.filter(t => 
          new Date(t.createdAt) <= filter.dateTo!
        );
      }

      if (filter.minAmount !== undefined) {
        transactions = transactions.filter(t => t.amount >= filter.minAmount!);
      }

      if (filter.maxAmount !== undefined) {
        transactions = transactions.filter(t => t.amount <= filter.maxAmount!);
      }

      return transactions;
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return [];
    }
  }

  /**
   * Export transactions in specified format
   */
  exportTransactions(format: 'csv' | 'json'): string {
    try {
      const transactions = this.getStoredTransactions();

      if (format === 'json') {
        return JSON.stringify(transactions, null, 2);
      }

      if (format === 'csv') {
        return this.convertToCSV(transactions);
      }

      throw new Error(`Unsupported export format: ${format}`);
    } catch (error) {
      console.error('Failed to export transactions:', error);
      return '';
    }
  }

  /**
   * Get transaction by ID
   */
  getTransactionById(id: string): Transaction | null {
    try {
      const transactions = this.getStoredTransactions();
      return transactions.find(t => t.id === id) || null;
    } catch (error) {
      console.error('Failed to get transaction by ID:', error);
      return null;
    }
  }

  /**
   * Update transaction status
   */
  updateTransactionStatus(id: string, status: TransactionStatus, completedAt?: Date): boolean {
    try {
      const transactions = this.getStoredTransactions();
      const transactionIndex = transactions.findIndex(t => t.id === id);

      if (transactionIndex === -1) {
        console.warn(`Transaction not found: ${id}`);
        return false;
      }

      transactions[transactionIndex] = {
        ...transactions[transactionIndex],
        status,
        completedAt: completedAt || (status === TransactionStatus.COMPLETED ? new Date() : undefined),
      };

      this.saveTransactions(transactions);
      console.log(`Transaction ${id} status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Failed to update transaction status:', error);
      return false;
    }
  }

  /**
   * Get transaction statistics
   */
  getTransactionStats(): {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    totalAmount: number;
    averageAmount: number;
  } {
    try {
      const transactions = this.getStoredTransactions();
      
      const stats = {
        total: transactions.length,
        completed: 0,
        pending: 0,
        failed: 0,
        totalAmount: 0,
        averageAmount: 0,
      };

      transactions.forEach(transaction => {
        switch (transaction.status) {
          case TransactionStatus.COMPLETED:
            stats.completed++;
            stats.totalAmount += transaction.amount;
            break;
          case TransactionStatus.PENDING:
            stats.pending++;
            break;
          case TransactionStatus.FAILED:
            stats.failed++;
            break;
        }
      });

      stats.averageAmount = stats.completed > 0 ? stats.totalAmount / stats.completed : 0;

      return stats;
    } catch (error) {
      console.error('Failed to get transaction stats:', error);
      return {
        total: 0,
        completed: 0,
        pending: 0,
        failed: 0,
        totalAmount: 0,
        averageAmount: 0,
      };
    }
  }

  /**
   * Clear all transactions (admin function)
   */
  clearAllTransactions(): boolean {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('All transactions cleared');
      return true;
    } catch (error) {
      console.error('Failed to clear transactions:', error);
      return false;
    }
  }

  /**
   * Detect suspicious transactions
   */
  detectSuspiciousTransactions(): Transaction[] {
    try {
      const transactions = this.getStoredTransactions();
      const suspicious: Transaction[] = [];
      const now = new Date();
      const oneHour = 60 * 60 * 1000;

      // Check for multiple failed transactions from same source
      const recentTransactions = transactions.filter(t => 
        now.getTime() - new Date(t.createdAt).getTime() < oneHour
      );

      // Group by customer info or IP (if available)
      const groupedTransactions = new Map<string, Transaction[]>();
      
      recentTransactions.forEach(transaction => {
        const key = transaction.customerInfo?.email || 
                   transaction.customerInfo?.id || 
                   'unknown';
        
        if (!groupedTransactions.has(key)) {
          groupedTransactions.set(key, []);
        }
        groupedTransactions.get(key)!.push(transaction);
      });

      // Check for suspicious patterns
      groupedTransactions.forEach((userTransactions, key) => {
        const failedCount = userTransactions.filter(t => 
          t.status === TransactionStatus.FAILED
        ).length;

        // Flag if more than 3 failed transactions in an hour
        if (failedCount > 3) {
          suspicious.push(...userTransactions);
        }

        // Flag unusually high amounts
        const highAmountTransactions = userTransactions.filter(t => 
          t.amount > 1000 // Configurable threshold
        );
        
        if (highAmountTransactions.length > 0) {
          suspicious.push(...highAmountTransactions);
        }
      });

      return [...new Set(suspicious)]; // Remove duplicates
    } catch (error) {
      console.error('Failed to detect suspicious transactions:', error);
      return [];
    }
  }

  /**
   * Get stored transactions from localStorage
   */
  private getStoredTransactions(): Transaction[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      
      // Ensure dates are properly parsed
      return parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Failed to parse stored transactions:', error);
      return [];
    }
  }

  /**
   * Save transactions to localStorage
   */
  private saveTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to save transactions:', error);
      
      // If localStorage is full, try to clear old transactions
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, clearing old transactions');
        const recentTransactions = transactions.slice(0, Math.floor(this.MAX_TRANSACTIONS / 2));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentTransactions));
      }
    }
  }

  /**
   * Convert transactions to CSV format
   */
  private convertToCSV(transactions: Transaction[]): string {
    if (transactions.length === 0) {
      return 'No transactions to export';
    }

    const headers = [
      'ID',
      'Amount',
      'Currency',
      'Status',
      'Created At',
      'Completed At',
      'Payment Method',
      'Customer Email',
      'Customer Name',
      'Receipt URL',
    ];

    const rows = transactions.map(t => [
      t.id,
      t.amount.toString(),
      t.currency,
      t.status,
      t.createdAt.toISOString(),
      t.completedAt?.toISOString() || '',
      t.paymentMethodId,
      t.customerInfo?.email || '',
      t.customerInfo?.name || '',
      t.receiptUrl || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    return csvContent;
  }
}

// Export singleton instance
export const transactionLogger = new TransactionLoggerService();
export default transactionLogger;