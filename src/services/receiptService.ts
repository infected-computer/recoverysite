import { Receipt, Transaction, BusinessDetails, CustomerDetails, TaxInfo } from '../types/payment';
import { PAYMENT_CONFIG } from '../config/payment';
import { formatAmount } from '../utils/paymentValidation';

class ReceiptService {
  private readonly businessDetails: BusinessDetails = {
    name: PAYMENT_CONFIG.BUSINESS.NAME,
    address: PAYMENT_CONFIG.BUSINESS.ADDRESS,
    taxId: PAYMENT_CONFIG.BUSINESS.TAX_ID,
    email: PAYMENT_CONFIG.BUSINESS.EMAIL,
  };

  /**
   * Generate receipt from transaction
   */
  generateReceipt(transaction: Transaction): Receipt {
    const receipt: Receipt = {
      id: `receipt_${transaction.id}`,
      transactionId: transaction.id,
      amount: transaction.amount,
      currency: transaction.currency,
      issuedAt: new Date(),
      businessDetails: this.businessDetails,
      customerDetails: this.extractCustomerDetails(transaction),
      taxInfo: this.calculateTaxInfo(transaction.amount, transaction.currency),
    };

    return receipt;
  }

  /**
   * Generate receipt HTML for display/printing
   */
  generateReceiptHTML(receipt: Receipt): string {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt - ${receipt.id}</title>
        <style>
          ${this.getReceiptCSS()}
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="receipt-header">
            <h1>Payment Receipt</h1>
            <div class="receipt-id">Receipt #${receipt.id}</div>
          </div>

          <div class="business-info">
            <h2>${receipt.businessDetails.name}</h2>
            <p>${receipt.businessDetails.address}</p>
            <p>Tax ID: ${receipt.businessDetails.taxId}</p>
            <p>Email: ${receipt.businessDetails.email}</p>
          </div>

          <div class="receipt-details">
            <div class="detail-row">
              <span class="label">Transaction ID:</span>
              <span class="value">${receipt.transactionId}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${receipt.issuedAt.toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${receipt.issuedAt.toLocaleTimeString()}</span>
            </div>
            ${receipt.customerDetails?.name ? `
              <div class="detail-row">
                <span class="label">Customer:</span>
                <span class="value">${receipt.customerDetails.name}</span>
              </div>
            ` : ''}
            ${receipt.customerDetails?.email ? `
              <div class="detail-row">
                <span class="label">Email:</span>
                <span class="value">${receipt.customerDetails.email}</span>
              </div>
            ` : ''}
          </div>

          <div class="payment-details">
            <h3>Payment Details</h3>
            <div class="payment-row">
              <span class="label">Amount:</span>
              <span class="value">${formatAmount(receipt.amount, receipt.currency)}</span>
            </div>
            ${receipt.taxInfo.amount > 0 ? `
              <div class="payment-row">
                <span class="label">Tax (${receipt.taxInfo.rate}%):</span>
                <span class="value">${formatAmount(receipt.taxInfo.amount, receipt.currency)}</span>
              </div>
              <div class="payment-row total">
                <span class="label">Total:</span>
                <span class="value">${formatAmount(receipt.amount + receipt.taxInfo.amount, receipt.currency)}</span>
              </div>
            ` : ''}
          </div>

          <div class="receipt-footer">
            <p>Thank you for your payment!</p>
            <p class="disclaimer">
              This receipt was generated automatically by our payment system.
              If you have any questions, please contact us at ${receipt.businessDetails.email}.
            </p>
            <div class="mor-info">
              <p><strong>Merchant of Record:</strong> Lemon Squeezy</p>
              <p>This transaction was processed by Lemon Squeezy as the Merchant of Record.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return html;
  }

  /**
   * Generate receipt PDF (placeholder - would need PDF library)
   */
  async generateReceiptPDF(receipt: Receipt): Promise<Blob> {
    // This would typically use a PDF generation library like jsPDF or Puppeteer
    // For now, we'll create a simple text-based PDF placeholder
    
    const receiptText = this.generateReceiptText(receipt);
    const blob = new Blob([receiptText], { type: 'text/plain' });
    
    return blob;
  }

  /**
   * Generate receipt text format
   */
  generateReceiptText(receipt: Receipt): string {
    const lines = [
      '='.repeat(50),
      'PAYMENT RECEIPT',
      '='.repeat(50),
      '',
      `Receipt ID: ${receipt.id}`,
      `Transaction ID: ${receipt.transactionId}`,
      `Date: ${receipt.issuedAt.toLocaleDateString()}`,
      `Time: ${receipt.issuedAt.toLocaleTimeString()}`,
      '',
      'BUSINESS INFORMATION:',
      '-'.repeat(30),
      receipt.businessDetails.name,
      receipt.businessDetails.address,
      `Tax ID: ${receipt.businessDetails.taxId}`,
      `Email: ${receipt.businessDetails.email}`,
      '',
    ];

    if (receipt.customerDetails?.name || receipt.customerDetails?.email) {
      lines.push('CUSTOMER INFORMATION:');
      lines.push('-'.repeat(30));
      if (receipt.customerDetails.name) {
        lines.push(`Name: ${receipt.customerDetails.name}`);
      }
      if (receipt.customerDetails.email) {
        lines.push(`Email: ${receipt.customerDetails.email}`);
      }
      lines.push('');
    }

    lines.push('PAYMENT DETAILS:');
    lines.push('-'.repeat(30));
    lines.push(`Amount: ${formatAmount(receipt.amount, receipt.currency)}`);
    
    if (receipt.taxInfo.amount > 0) {
      lines.push(`Tax (${receipt.taxInfo.rate}%): ${formatAmount(receipt.taxInfo.amount, receipt.currency)}`);
      lines.push(`Total: ${formatAmount(receipt.amount + receipt.taxInfo.amount, receipt.currency)}`);
    }

    lines.push('');
    lines.push('MERCHANT OF RECORD:');
    lines.push('-'.repeat(30));
    lines.push('Lemon Squeezy');
    lines.push('This transaction was processed by Lemon Squeezy');
    lines.push('as the Merchant of Record.');
    lines.push('');
    lines.push('Thank you for your payment!');
    lines.push('');
    lines.push('For questions, contact: ' + receipt.businessDetails.email);
    lines.push('='.repeat(50));

    return lines.join('\n');
  }

  /**
   * Download receipt as file
   */
  downloadReceipt(receipt: Receipt, format: 'html' | 'txt' | 'pdf' = 'html'): void {
    let content: string;
    let mimeType: string;
    let filename: string;

    switch (format) {
      case 'html':
        content = this.generateReceiptHTML(receipt);
        mimeType = 'text/html';
        filename = `receipt_${receipt.id}.html`;
        break;
      case 'txt':
        content = this.generateReceiptText(receipt);
        mimeType = 'text/plain';
        filename = `receipt_${receipt.id}.txt`;
        break;
      case 'pdf':
        // For PDF, we'd need to implement proper PDF generation
        content = this.generateReceiptText(receipt);
        mimeType = 'text/plain';
        filename = `receipt_${receipt.id}.txt`;
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  /**
   * Email receipt (placeholder - would need email service)
   */
  async emailReceipt(receipt: Receipt, emailAddress: string): Promise<boolean> {
    try {
      // This would typically integrate with an email service like SendGrid, Mailgun, etc.
      console.log('Sending receipt via email:', {
        to: emailAddress,
        receiptId: receipt.id,
        amount: formatAmount(receipt.amount, receipt.currency),
      });

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error('Failed to send receipt email:', error);
      return false;
    }
  }

  /**
   * Validate receipt data for compliance
   */
  validateReceiptCompliance(receipt: Receipt): {
    valid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    // Check required business information
    if (!receipt.businessDetails.name) {
      issues.push('Business name is required');
    }
    if (!receipt.businessDetails.address) {
      issues.push('Business address is required');
    }
    if (!receipt.businessDetails.taxId) {
      issues.push('Business tax ID is required');
    }

    // Check transaction information
    if (!receipt.transactionId) {
      issues.push('Transaction ID is required');
    }
    if (receipt.amount <= 0) {
      issues.push('Amount must be greater than zero');
    }
    if (!receipt.currency) {
      issues.push('Currency is required');
    }

    // Check date information
    if (!receipt.issuedAt) {
      issues.push('Issue date is required');
    }

    // Check tax information for compliance
    if (receipt.taxInfo.rate < 0) {
      issues.push('Tax rate cannot be negative');
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Generate MoR compliance report
   */
  generateMoRReport(transactions: Transaction[]): {
    totalTransactions: number;
    totalAmount: number;
    totalTax: number;
    currencyBreakdown: Record<string, { count: number; amount: number; tax: number }>;
    complianceIssues: string[];
  } {
    const report = {
      totalTransactions: transactions.length,
      totalAmount: 0,
      totalTax: 0,
      currencyBreakdown: {} as Record<string, { count: number; amount: number; tax: number }>,
      complianceIssues: [] as string[],
    };

    transactions.forEach(transaction => {
      const receipt = this.generateReceipt(transaction);
      const validation = this.validateReceiptCompliance(receipt);

      // Add compliance issues
      if (!validation.valid) {
        report.complianceIssues.push(
          `Transaction ${transaction.id}: ${validation.issues.join(', ')}`
        );
      }

      // Update totals
      report.totalAmount += transaction.amount;
      report.totalTax += receipt.taxInfo.amount;

      // Update currency breakdown
      if (!report.currencyBreakdown[transaction.currency]) {
        report.currencyBreakdown[transaction.currency] = {
          count: 0,
          amount: 0,
          tax: 0,
        };
      }

      const currencyData = report.currencyBreakdown[transaction.currency];
      currencyData.count++;
      currencyData.amount += transaction.amount;
      currencyData.tax += receipt.taxInfo.amount;
    });

    return report;
  }

  /**
   * Extract customer details from transaction
   */
  private extractCustomerDetails(transaction: Transaction): CustomerDetails | undefined {
    if (!transaction.customerInfo) {
      return undefined;
    }

    return {
      name: transaction.customerInfo.name,
      email: transaction.customerInfo.email,
      // Address would be added if available
    };
  }

  /**
   * Calculate tax information
   */
  private calculateTaxInfo(amount: number, currency: string): TaxInfo {
    // This is a simplified tax calculation
    // In a real implementation, you'd integrate with a tax service
    // or have more complex tax rules based on location, product type, etc.

    let taxRate = 0;
    let taxType = 'No Tax';

    // Example tax rates (these would be dynamic in a real system)
    switch (currency.toUpperCase()) {
      case 'USD':
        // US sales tax varies by state, this is just an example
        taxRate = 0; // Lemon Squeezy handles US tax
        taxType = 'Sales Tax';
        break;
      case 'EUR':
        // EU VAT
        taxRate = 0; // Lemon Squeezy handles EU VAT
        taxType = 'VAT';
        break;
      default:
        taxRate = 0;
        taxType = 'No Tax';
    }

    const taxAmount = amount * (taxRate / 100);

    return {
      rate: taxRate,
      amount: taxAmount,
      type: taxType,
    };
  }

  /**
   * Get CSS styles for receipt HTML
   */
  private getReceiptCSS(): string {
    return `
      body {
        font-family: 'Courier New', monospace;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: white;
        color: #333;
      }
      
      .receipt {
        border: 2px solid #333;
        padding: 20px;
      }
      
      .receipt-header {
        text-align: center;
        border-bottom: 2px solid #333;
        padding-bottom: 15px;
        margin-bottom: 20px;
      }
      
      .receipt-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
      
      .receipt-id {
        font-size: 14px;
        margin-top: 5px;
      }
      
      .business-info {
        text-align: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #333;
      }
      
      .business-info h2 {
        margin: 0 0 10px 0;
        font-size: 18px;
      }
      
      .business-info p {
        margin: 2px 0;
        font-size: 12px;
      }
      
      .receipt-details, .payment-details {
        margin-bottom: 20px;
      }
      
      .payment-details h3 {
        margin: 0 0 10px 0;
        font-size: 16px;
        border-bottom: 1px solid #333;
        padding-bottom: 5px;
      }
      
      .detail-row, .payment-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 12px;
      }
      
      .payment-row {
        font-size: 14px;
      }
      
      .payment-row.total {
        font-weight: bold;
        font-size: 16px;
        border-top: 1px solid #333;
        padding-top: 5px;
        margin-top: 10px;
      }
      
      .label {
        font-weight: bold;
      }
      
      .receipt-footer {
        text-align: center;
        border-top: 2px solid #333;
        padding-top: 15px;
        font-size: 12px;
      }
      
      .disclaimer {
        font-style: italic;
        margin: 10px 0;
      }
      
      .mor-info {
        background: #f5f5f5;
        padding: 10px;
        margin-top: 15px;
        border: 1px solid #ddd;
      }
      
      .mor-info p {
        margin: 5px 0;
      }
      
      @media print {
        body {
          margin: 0;
          padding: 10px;
        }
        
        .receipt {
          border: 1px solid #333;
          padding: 15px;
        }
      }
    `;
  }
}

// Export singleton instance
export const receiptService = new ReceiptService();
export default receiptService;