import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import PaymentForm from '../components/payment/PaymentForm';
import '../styles/payment.css';

const PaymentPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>תשלום מאובטח - דוקטור פיקס</title>
        <meta name="description" content="דף תשלום מאובטח - הזן סכום ושלם בקלות" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Security headers - X-Frame-Options removed as it should be set via HTTP headers only */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Preconnect to payment providers */}
        <link rel="preconnect" href="https://api.lemonsqueezy.com" />
        <link rel="preconnect" href="https://lemonsqueezy.com" />
        
        {/* Disable caching for security */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>

      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  תשלום מאובטח
                </h1>
                <p className="text-lg text-gray-600">
                  הזן את הסכום שברצונך לשלם ובצע תשלום מאובטח
                </p>
              </div>
              
              <PaymentForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;