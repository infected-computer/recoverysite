import React, { useState } from 'react';
import { validateAccessToken } from '../../utils/paymentValidation';
import ErrorMessage from '../common/ErrorMessage';

interface AdminAuthProps {
  onAuthenticated: (token: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    token: '',
  });
  const [authMethod, setAuthMethod] = useState<'password' | 'token'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple admin credentials (in production, use proper authentication)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123', // This should be hashed and stored securely
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let isValid = false;

      if (authMethod === 'password') {
        // Validate username/password
        isValid = credentials.username === ADMIN_CREDENTIALS.username &&
                 credentials.password === ADMIN_CREDENTIALS.password;
      } else {
        // Validate token
        isValid = validateAccessToken(credentials.token);
      }

      if (isValid) {
        // Generate session token
        const sessionToken = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Store in sessionStorage
        sessionStorage.setItem('admin_session', sessionToken);
        
        onAuthenticated(sessionToken);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof credentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <div className="admin-auth">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Admin Authentication</h1>
            <p>Please authenticate to access the admin dashboard</p>
          </div>

          <div className="auth-method-selector">
            <button
              type="button"
              className={`method-btn ${authMethod === 'password' ? 'active' : ''}`}
              onClick={() => setAuthMethod('password')}
            >
              Username & Password
            </button>
            <button
              type="button"
              className={`method-btn ${authMethod === 'token' ? 'active' : ''}`}
              onClick={() => setAuthMethod('token')}
            >
              Access Token
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {authMethod === 'password' ? (
              <>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={credentials.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="token">Access Token</label>
                <input
                  type="password"
                  id="token"
                  value={credentials.token}
                  onChange={(e) => handleInputChange('token', e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Enter your access token"
                />
              </div>
            )}

            {error && (
              <ErrorMessage message={error} />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary auth-submit"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-info">
            <div className="info-box">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3>Security Notice</h3>
                <p>
                  This admin dashboard provides access to sensitive payment data. 
                  Please ensure you are authorized to access this information.
                </p>
              </div>
            </div>
          </div>

          {/* Demo credentials info (remove in production) */}
          <div className="demo-info">
            <h4>Demo Credentials</h4>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
            <p><em>Note: These are demo credentials. Use proper authentication in production.</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;