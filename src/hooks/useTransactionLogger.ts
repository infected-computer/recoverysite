import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionFilter, TransactionStatus } from '../types/payment';
import { transactionLogger } from '../services/transactionLogger';

interface UseTransactionLoggerState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  stats: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    totalAmount: number;
    averageAmount: number;
  };
}

export const useTransactionLogger = (filter?: TransactionFilter) => {
  const [state, setState] = useState<UseTransactionLoggerState>({
    transactions: [],
    isLoading: true,
    error: null,
    stats: {
      total: 0,
      completed: 0,
      pending: 0,
      failed: 0,
      totalAmount: 0,
      averageAmount: 0,
    },
  });

  // Load transactions
  const loadTransactions = useCallback(() => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const transactions = transactionLogger.getTransactions(filter);
      const stats = transactionLogger.getTransactionStats();
      
      setState({
        transactions,
        stats,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load transactions',
      }));
    }
  }, [filter]);

  // Log a new transaction
  const logTransaction = useCallback((transaction: Transaction) => {
    try {
      transactionLogger.logTransaction(transaction);
      loadTransactions(); // Refresh the list
    } catch (error) {
      console.error('Failed to log transaction:', error);
    }
  }, [loadTransactions]);

  // Update transaction status
  const updateTransactionStatus = useCallback((
    id: string, 
    status: TransactionStatus, 
    completedAt?: Date
  ) => {
    try {
      const success = transactionLogger.updateTransactionStatus(id, status, completedAt);
      if (success) {
        loadTransactions(); // Refresh the list
      }
      return success;
    } catch (error) {
      console.error('Failed to update transaction status:', error);
      return false;
    }
  }, [loadTransactions]);

  // Export transactions
  const exportTransactions = useCallback((format: 'csv' | 'json') => {
    try {
      const exportData = transactionLogger.exportTransactions(format);
      
      // Create and download file
      const blob = new Blob([exportData], { 
        type: format === 'csv' ? 'text/csv' : 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Failed to export transactions:', error);
      return false;
    }
  }, []);

  // Get transaction by ID
  const getTransactionById = useCallback((id: string): Transaction | null => {
    return transactionLogger.getTransactionById(id);
  }, []);

  // Detect suspicious transactions
  const getSuspiciousTransactions = useCallback((): Transaction[] => {
    return transactionLogger.detectSuspiciousTransactions();
  }, []);

  // Clear all transactions (admin function)
  const clearAllTransactions = useCallback(() => {
    try {
      const success = transactionLogger.clearAllTransactions();
      if (success) {
        loadTransactions(); // Refresh the list
      }
      return success;
    } catch (error) {
      console.error('Failed to clear transactions:', error);
      return false;
    }
  }, [loadTransactions]);

  // Load transactions on mount and when filter changes
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Refresh function
  const refresh = useCallback(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    ...state,
    logTransaction,
    updateTransactionStatus,
    exportTransactions,
    getTransactionById,
    getSuspiciousTransactions,
    clearAllTransactions,
    refresh,
  };
};