import React, { useState, useEffect } from 'react';
import { useTransactionLogger } from '../../hooks/useTransactionLogger';
import { Transaction, TransactionFilter, TransactionStatus } from '../../types/payment';
import { formatAmount } from '../../utils/paymentValidation';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface AdminDashboardProps {
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  isAuthenticated, 
  onAuthRequired 
}) => {
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const {
    transactions,
    stats,
    isLoading,
    error,
    exportTransactions,
    getSuspiciousTransactions,
    clearAllTransactions,
    refresh,
  } = useTransactionLogger(filter);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      onAuthRequired();
    }
  }, [isAuthenticated, onAuthRequired]);

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="auth-required">
            <h1>Authentication Required</h1>
            <p>Please authenticate to access the admin dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleFilterChange = (newFilter: Partial<TransactionFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleExport = (format: 'csv' | 'json') => {
    const success = exportTransactions(format);
    if (success) {
      setShowExportModal(false);
    }
  };

  const handleClearTransactions = () => {
    if (window.confirm('Are you sure you want to clear all transactions? This action cannot be undone.')) {
      clearAllTransactions();
    }
  };

  const suspiciousTransactions = getSuspiciousTransactions();

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Payment Dashboard</h1>
          <div className="header-actions">
            <button onClick={refresh} className="btn btn-secondary">
              Refresh
            </button>
            <button 
              onClick={() => setShowExportModal(true)} 
              className="btn btn-primary"
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Transactions</h3>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p className="stat-value">{stats.completed}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Pending</h3>
              <p className="stat-value">{stats.pending}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Failed</h3>
              <p className="stat-value">{stats.failed}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-value">${stats.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Average Amount</h3>
              <p className="stat-value">${stats.averageAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Suspicious Transactions Alert */}
        {suspiciousTransactions.length > 0 && (
          <div className="alert alert-warning">
            <div className="alert-icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h4>Suspicious Activity Detected</h4>
              <p>{suspiciousTransactions.length} suspicious transactions found. Please review them carefully.</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <h2>Filters</h2>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Status</label>
              <select
                value={filter.status || ''}
                onChange={(e) => handleFilterChange({ 
                  status: e.target.value as TransactionStatus || undefined 
                })}
              >
                <option value="">All Statuses</option>
                <option value={TransactionStatus.COMPLETED}>Completed</option>
                <option value={TransactionStatus.PENDING}>Pending</option>
                <option value={TransactionStatus.FAILED}>Failed</option>
                <option value={TransactionStatus.REFUNDED}>Refunded</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date From</label>
              <input
                type="date"
                value={filter.dateFrom?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleFilterChange({ 
                  dateFrom: e.target.value ? new Date(e.target.value) : undefined 
                })}
              />
            </div>

            <div className="filter-group">
              <label>Date To</label>
              <input
                type="date"
                value={filter.dateTo?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleFilterChange({ 
                  dateTo: e.target.value ? new Date(e.target.value) : undefined 
                })}
              />
            </div>

            <div className="filter-group">
              <label>Min Amount</label>
              <input
                type="number"
                step="0.01"
                value={filter.minAmount || ''}
                onChange={(e) => handleFilterChange({ 
                  minAmount: e.target.value ? parseFloat(e.target.value) : undefined 
                })}
              />
            </div>

            <div className="filter-group">
              <label>Max Amount</label>
              <input
                type="number"
                step="0.01"
                value={filter.maxAmount || ''}
                onChange={(e) => handleFilterChange({ 
                  maxAmount: e.target.value ? parseFloat(e.target.value) : undefined 
                })}
              />
            </div>

            <div className="filter-actions">
              <button 
                onClick={() => setFilter({})} 
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="transactions-section">
          <div className="section-header">
            <h2>Transactions ({transactions.length})</h2>
            <div className="section-actions">
              <button 
                onClick={handleClearTransactions}
                className="btn btn-danger"
                disabled={transactions.length === 0}
              >
                Clear All
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner message="Loading transactions..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refresh} />
          ) : transactions.length === 0 ? (
            <div className="empty-state">
              <p>No transactions found matching your criteria.</p>
            </div>
          ) : (
            <div className="transactions-table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr 
                      key={transaction.id}
                      className={suspiciousTransactions.includes(transaction) ? 'suspicious' : ''}
                    >
                      <td className="transaction-id">{transaction.id}</td>
                      <td className="amount">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </td>
                      <td>
                        <span className={`status-badge ${transaction.status}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="customer">
                        {transaction.customerInfo?.email || 
                         transaction.customerInfo?.name || 
                         'Anonymous'}
                      </td>
                      <td className="date">
                        {transaction.createdAt.toLocaleDateString()}
                      </td>
                      <td className="actions">
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="btn btn-sm btn-secondary"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="modal-overlay" onClick={() => setSelectedTransaction(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Transaction Details</h3>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="transaction-details">
                  <div className="detail-row">
                    <span className="label">ID:</span>
                    <span className="value">{selectedTransaction.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Amount:</span>
                    <span className="value">
                      {formatAmount(selectedTransaction.amount, selectedTransaction.currency)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`value status-badge ${selectedTransaction.status}`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Created:</span>
                    <span className="value">
                      {selectedTransaction.createdAt.toLocaleString()}
                    </span>
                  </div>
                  {selectedTransaction.completedAt && (
                    <div className="detail-row">
                      <span className="label">Completed:</span>
                      <span className="value">
                        {selectedTransaction.completedAt.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">Payment Method:</span>
                    <span className="value">{selectedTransaction.paymentMethodId}</span>
                  </div>
                  {selectedTransaction.customerInfo?.email && (
                    <div className="detail-row">
                      <span className="label">Customer Email:</span>
                      <span className="value">{selectedTransaction.customerInfo.email}</span>
                    </div>
                  )}
                  {selectedTransaction.customerInfo?.name && (
                    <div className="detail-row">
                      <span className="label">Customer Name:</span>
                      <span className="value">{selectedTransaction.customerInfo.name}</span>
                    </div>
                  )}
                  {selectedTransaction.receiptUrl && (
                    <div className="detail-row">
                      <span className="label">Receipt:</span>
                      <span className="value">
                        <a 
                          href={selectedTransaction.receiptUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Receipt
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Export Transactions</h3>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Choose the format for exporting transaction data:</p>
                <div className="export-options">
                  <button 
                    onClick={() => handleExport('csv')}
                    className="btn btn-primary"
                  >
                    Export as CSV
                  </button>
                  <button 
                    onClick={() => handleExport('json')}
                    className="btn btn-secondary"
                  >
                    Export as JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;