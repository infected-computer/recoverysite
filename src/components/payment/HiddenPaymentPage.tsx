import React from 'react';

interface HiddenPaymentPageProps {
  accessToken?: string;
}

const HiddenPaymentPage: React.FC<HiddenPaymentPageProps> = ({ accessToken }) => {
  return (
    <div>
      <h1>Hidden Payment Page</h1>
      <p>Access Token: {accessToken || 'None'}</p>
    </div>
  );
};

export default HiddenPaymentPage;