import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { AlertTriangle } from 'lucide-react';

const PaymentErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">אופס, התשלום נכשל</h1>
          <p className="text-lg text-gray-600 mb-8">נראה שהייתה בעיה בעיבוד התשלום. אנא נסה שוב או צור איתנו קשר לסיוע.</p>
          <div className="space-x-4">
            <Link to="/pricing">
              <Button variant="outline">חזרה למחירון</Button>
            </Link>
            <Link to="/contact">
              <Button>צור קשר</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentErrorPage;
