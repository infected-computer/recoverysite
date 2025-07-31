import { useState, useCallback } from 'react';
import { Receipt, Transaction } from '../types/payment';
import { receiptService } from '../services/receiptService';

interface UseReceiptsState {
  isGenerating: boolean;
  error: string | null;
  lastReceipt: Receipt | null;
}

export const useReceipts = () => {
  const [state, setState] = useState<UseReceiptsState>({
    isGenerating: false,
    error: null,
    lastReceipt: null,
  });

  // Generate receipt from transaction
  const generateReceipt = useCallback((transaction: Transaction): Receipt => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));
      
      const receipt = receiptService.generateReceipt(transaction);
      
      setState(prev => ({
        ...prev,
        isGenerating: false,
        lastReceipt: receipt,
      }));
      
      return receipt;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate receipt';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Generate receipt HTML
  const generateReceiptHTML = useCallback((receipt: Receipt): string => {
    return receiptService.generateReceiptHTML(receipt);
  }, []);

  // Generate receipt text
  const generateReceiptText = useCallback((receipt: Receipt): string => {
    return receiptService.generateReceiptText(receipt);
  }, []);

  // Download receipt
  const downloadReceipt = useCallback((receipt: Receipt, format: 'html' | 'txt' | 'pdf' = 'html') => {
    try {
      receiptService.downloadReceipt(receipt, format);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to download receipt';
      setState(prev => ({ ...prev, error: errorMessage }));
      return false;
    }
  }, []);

  // Email receipt
  const emailReceipt = useCallback(async (receipt: Receipt, emailAddress: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));
      
      const success = await receiptService.emailReceipt(receipt, emailAddress);
      
      setState(prev => ({ ...prev, isGenerating: false }));
      
      if (!success) {
        setState(prev => ({ ...prev, error: 'Failed to send receipt email' }));
      }
      
      return success;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send receipt email';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  // Validate receipt compliance
  const validateReceiptCompliance = useCallback((receipt: Receipt) => {
    return receiptService.validateReceiptCompliance(receipt);
  }, []);

  // Generate MoR compliance report
  const generateMoRReport = useCallback((transactions: Transaction[]) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));
      
      const report = receiptService.generateMoRReport(transactions);
      
      setState(prev => ({ ...prev, isGenerating: false }));
      
      return report;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate MoR report';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  // Print receipt
  const printReceipt = useCallback((receipt: Receipt) => {
    try {
      const receiptHTML = receiptService.generateReceiptHTML(receipt);
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Could not open print window');
      }
      
      printWindow.document.write(receiptHTML);
      printWindow.document.close();
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to print receipt';
      setState(prev => ({ ...prev, error: errorMessage }));
      return false;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      error: null,
      lastReceipt: null,
    });
  }, []);

  return {
    ...state,
    generateReceipt,
    generateReceiptHTML,
    generateReceiptText,
    downloadReceipt,
    emailReceipt,
    validateReceiptCompliance,
    generateMoRReport,
    printReceipt,
    clearError,
    reset,
  };
};