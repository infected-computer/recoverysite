// Core payment system interfaces and types

export interface PaymentFormData {
  amount: number;
  currency: 'ILS' | 'USD' | 'EUR';
  customerEmail?: string;
  customerName?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  receipt?: Receipt;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: Date;
  completedAt?: Date;
  paymentMethodId: string;
  receiptUrl?: string;
  refundId?: string;
  customerInfo?: CustomerInfo;
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface Receipt {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  issuedAt: Date;
  businessDetails: BusinessDetails;
  customerDetails?: CustomerDetails;
  taxInfo: TaxInfo;
}

export interface CustomerInfo {
  email?: string;
  name?: string;
  id?: string;
}

export interface BusinessDetails {
  name: string;
  address: string;
  taxId: string;
  email: string;
}

export interface CustomerDetails {
  name?: string;
  email?: string;
  address?: string;
}

export interface TaxInfo {
  rate: number;
  amount: number;
  type: string;
}

export interface PaymentPageState {
  isAuthorized: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface HiddenPaymentPageProps {
  accessToken?: string;
}

export interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  isProcessing: boolean;
}

// Lemon Squeezy specific interfaces
export interface LemonSqueezyConfig {
  apiKey: string;
  storeId: string;
  environment: 'sandbox' | 'production';
}

export interface LemonSqueezyCheckout {
  data: {
    type: 'checkouts';
    attributes: {
      checkout_data: {
        custom: {
          amount: number;
          currency: string;
        };
      };
      product_options: {
        name: string;
        description: string;
      };
    };
    relationships: {
      store: {
        data: {
          type: 'stores';
          id: string;
        };
      };
    };
  };
}

export interface LemonSqueezyOrder {
  id: string;
  status: string;
  total: number;
  currency: string;
  customer_email: string;
}

export interface LemonSqueezyError {
  type: LemonSqueezyErrorType;
  message: string;
  details?: any;
}

export enum LemonSqueezyErrorType {
  PAYMENT_DECLINED = 'PAYMENT_DECLINED',
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  USER_CANCELLED = 'USER_CANCELLED'
}

export interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string;
    custom_data: Record<string, any>;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      status: string;
      total: number;
      currency: string;
      customer_email: string;
    };
  };
}

// Service interfaces
export interface PaymentService {
  processPayment(data: PaymentFormData): Promise<PaymentResult>;
  validateAmount(amount: number): boolean;
  generateReceipt(transaction: Transaction): Receipt;
}

export interface TransactionLogger {
  logTransaction(transaction: Transaction): void;
  getTransactions(filter?: TransactionFilter): Transaction[];
  exportTransactions(format: 'csv' | 'json'): string;
}

export interface TransactionFilter {
  status?: TransactionStatus;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export interface ErrorHandler {
  handleValidationError(error: ValidationError): void;
  handlePaymentError(error: PaymentError): void;
  handleNetworkError(error: NetworkError): void;
  logError(error: Error, context: string): void;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface PaymentError {
  code: string;
  message: string;
  details?: any;
}

export interface NetworkError {
  status: number;
  message: string;
  url?: string;
}