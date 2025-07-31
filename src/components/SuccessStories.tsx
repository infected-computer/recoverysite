import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle } from 'lucide-react';
import { Star } from 'lucide-react';

const successStories = [
  {
    id: 1,
    client: "יוסי כ.",
    problem: "מחיקה בטעות של תמונות חתונה",
    solution: "שחזור מלא תוך 24 שעות",
    filesRecovered: "2,847 תמונות",
    rating: 5,
    quote: "הצילו לי את החתונה! כל התמונות חזרו במצב מושלם"
  },
  {
    id: 2,
    client: "לקוח עסקי",
    problem: "קריסת שרת עם בסיס נתונים קריטי",
    solution: "שחזור מלא של בסיס הנתונים",
    filesRecovered: "15GB נתונים עסקיים",
    rating: 5,
    quote: "שירות מקצועי שחסך לנו מיליונים. תודה רבה!"
  },
  {
    id: 3,
    client: "רחל מ.",
    problem: "דיסק קשיח שנשרף במחשב נייד",
    solution: "שחזור מרחוק של כל הקבצים",
    filesRecovered: "450GB קבצי עבודה",
    rating: 5,
    quote: "לא האמנתי שזה אפשרי! כל הפרויקטים שלי חזרו"
  }
];

const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);

  // Counter animation for total files recovered
  useEffect(() => {
    const target = 28470; // Total files recovered this month
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setTotalRecovered(target);
        clearInterval(timer);
      } else {
        setTotalRecovered(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-hebrew text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            סיפורי הצלחה אמיתיים
          </h2>
          <p className="font-hebrew text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            כל יום אנחנו עוזרים לאנשים לשחזר את הקבצים החשובים ביותר שלהם
          </p>
          
          {/* Dynamic counter */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-100 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="font-hebrew text-lg font-semibold text-gray-700">החודש שוחזרו</span>
            </div>
            <div className="text-5xl font-bold text-green-600 counter-animation">
              {totalRecovered.toLocaleString()}
            </div>
            <div className="font-hebrew text-gray-600 mt-2">קבצים בהצלחה</div>
          </div>
        </div>

        {/* Success Stories Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="success-story border-2 border-green-200 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                {/* Client Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {successStories[currentStory].client.charAt(0)}
                  </div>
                </div>
                
                {/* Story Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-hebrew text-xl font-bold text-gray-900">
                      {successStories[currentStory].client}
                    </h3>
                    <div className="flex gap-1">
                      {[...Array(successStories[currentStory].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Badge variant="destructive" className="mb-2">הבעיה</Badge>
                      <p className="font-hebrew text-gray-700">
                        {successStories[currentStory].problem}
                      </p>
                    </div>
                    <div>
                      <Badge variant="default" className="mb-2 bg-green-600">הפתרון</Badge>
                      <p className="font-hebrew text-gray-700">
                        {successStories[currentStory].solution}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-hebrew font-semibold text-green-700">
                        {successStories[currentStory].filesRecovered}
                      </span>
                    </div>
                  </div>
                  
                  <blockquote className="font-hebrew text-lg italic text-gray-800 border-r-4 border-green-500 pr-4">
                    "{successStories[currentStory].quote}"
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Story indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStory 
                    ? 'bg-green-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`סיפור ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;