import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Zap, CheckCircle } from 'lucide-react';

export interface TLDRBoxProps {
  points: string[];
  title?: string;
  className?: string;
  variant?: 'default' | 'highlighted' | 'compact';
  showIcon?: boolean;
}

export const TLDRBox: React.FC<TLDRBoxProps> = ({
  points,
  title = "עיקרי הדברים",
  className = "",
  variant = 'default',
  showIcon = true
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'highlighted':
        return {
          container: "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg",
          header: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
          badge: "bg-yellow-100 text-yellow-800 border-yellow-300"
        };
      case 'compact':
        return {
          container: "bg-gray-50 border border-gray-200",
          header: "bg-gray-100 text-gray-900",
          badge: "bg-blue-100 text-blue-800"
        };
      default:
        return {
          container: "bg-blue-50 border border-blue-200",
          header: "bg-blue-100 text-blue-900",
          badge: "bg-blue-100 text-blue-800"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card className={`w-full max-w-4xl mx-auto ${styles.container} ${className}`}>
      <CardHeader className={`${styles.header} py-3 px-6 rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showIcon && <Zap className="w-5 h-5" />}
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <Badge variant="secondary" className={`${styles.badge} font-medium`}>
            TL;DR
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800 leading-relaxed font-medium">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Predefined TL;DR content for different pages
export const getTLDRContent = (pageType: string): string[] => {
  switch (pageType) {
    case 'homepage':
      return [
        "שירות שחזור קבצים מקצועי מרחוק ללא הגעה פיזית למקום",
        "מעל 7 שנות ניסיון בשחזור מכל סוגי המדיה - דיסקים קשיחים, SSD, כרטיסי זיכרון",
        "בדיקה חינמית ותשלום רק לאחר הצלחת השחזור",
        "זמינות 24/7 עם מענה מהיר ושירות אישי",
        "אחריות מלאה על השירות ושמירה על פרטיות המידע"
      ];

    case 'data-recovery':
      return [
        "שחזור קבצים מרחוק מכל סוגי המדיה הדיגיטלית",
        "טכנולוגיה מתקדמת לשחזור גם ממדיה פגומה קשות",
        "תהליך מאובטח לחלוטין עם שמירה על פרטיות המידע",
        "בדיקה חינמית וללא התחייבות",
        "תשלום רק במקרה של הצלחת השחזור"
      ];

    case 'remote-support':
      return [
        "תמיכה טכנית מקצועית מרחוק לפתרון בעיות מחשב",
        "חיבור מאובטח למחשב שלך ללא סיכון לפרטיות",
        "פתרון מגוון רחב של בעיות תוכנה ומערכת",
        "זמינות גמישה בהתאם לצרכים שלך",
        "מחיר הוגן לפי זמן עבודה או פרויקט"
      ];

    case 'system-repair':
      return [
        "תיקון מערכות הפעלה שקרסו או לא מתאתחלות",
        "שמירה מלאה על כל הקבצים והנתונים במהלך התיקון",
        "פתרון בעיות מורכבות של רישום המערכת ועדכונים",
        "שחזור מערכת לפעילות תקינה ומהירה",
        "הדרכה לתחזוקה עתידית של המערכת"
      ];

    case 'pricing':
      return [
        "תמחור שקוף וללא עלויות נסתרות",
        "בדיקה ראשונית חינמית לכל השירותים",
        "תשלום רק לאחר הצלחת השירות",
        "מחירים תחרותיים עם אחריות מלאה",
        "אפשרות לתשלום בשלבים במקרים מורכבים"
      ];

    case 'process':
      return [
        "תהליך פשוט ומהיר בן 4 שלבים בלבד",
        "יצירת קשר ראשוני וזיהוי הבעיה",
        "בדיקה חינמית ומתן הצעת מחיר",
        "ביצוע השירות מרחוק באופן מאובטח",
        "מסירת התוצאות ומתן אחריות"
      ];

    case 'contact':
      return [
        "מספר דרכי יצירת קשר נוחות ומהירות",
        "מענה מקצועי בעברית 24/7",
        "ייעוץ ראשוני חינם ללא התחייבות",
        "זמן מענה מהיר - עד 2 שעות",
        "שירות אישי ומותאם לצרכים שלך"
      ];

    case 'about':
      return [
        "צוות מומחים עם מעל 10 שנות ניסיון בתחום",
        "מאות לקוחות מרוצים ומקרי הצלחה מוכחים",
        "השקעה מתמדת בטכנולוגיות מתקדמות",
        "מחויבות לשירות מעולה ושביעות רצון הלקוח",
        "פעילות בכל רחבי הארץ עם זמינות מלאה"
      ];

    case 'faq':
      return [
        "תשובות מפורטות לשאלות הנפוצות ביותר",
        "מידע על תהליכי העבודה ושיטות הפעולה",
        "הסברים על זמנים, מחירים ואחריות",
        "טיפים לשמירה על המידע ומניעת אובדן קבצים",
        "דרכי יצירת קשר למידע נוסף"
      ];

    default:
      return [
        "שירותי שחזור קבצים ותמיכה טכנית מקצועיים",
        "עבודה מרחוק עם טכנולוגיה מתקדמת ומאובטחת",
        "ניסיון רב שנים ומאות מקרי הצלחה",
        "שירות אמין עם אחריות מלאה",
        "זמינות גבוהה ומענה מהיר"
      ];
  }
};