import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">תשלום הושלם בהצלחה!</h1>
          <p className="text-lg text-gray-600 mb-8">תודה רבה על תשלומך. אישור הזמנה ופרטים נוספים ישלחו אליך במייל.</p>
          <Link to="/">
            <Button>חזרה לדף הבית</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
