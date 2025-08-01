import React from 'react';

interface AdminAuthProps {
  onAuthenticated: (token: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuthenticated }) => {
  return (
    <div>
      <h1>Admin Authentication</h1>
      <button onClick={() => onAuthenticated('mock-admin-token')}>Authenticate</button>
    </div>
  );
};

export default AdminAuth;