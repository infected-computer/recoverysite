import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: "אבחון ראשוני",
    price: "ללא עלות",
    features: [
      "הערכת סיכויי שחזור",
      "זיהוי סוג התקלה",
      "הצעת מחיר שקופה",
    ],
  },
  {
    name: "שחזור קבצים",
    price: "החל מ-₪350",
    features: [
      "מדיסקים קשיחים ו-SSD",
      "מכרטיסי זיכרון ודיסק-און-קי",
      "תשלום מבוסס הצלחה",
    ],
  },
  {
    name: "שירותים מתקדמים",
    price: "צרו קשר",
    features: [
      "שחזור שרתים ומערכי RAID",
      "מקרים מורכבים במיוחד",
      "פתרונות מותאמים לעסקים",
    ],
  },
];

const PricingSummary: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            תמחור שקוף והוגן
          </h2>
          <p className="text-lg text-gray-600">
            בדיקה ראשונית תמיד בחינם. התשלום מתבצע רק לאחר שחזור מוצלח של המידע שלכם.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <div className="text-4xl font-bold text-center my-4">{plan.price}</div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className="mt-auto">
                  <Button className="w-full" variant="outline">
                    פרטים נוספים
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/pricing">
            <Button size="lg">
              צפו במחירון המלא
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSummary;
