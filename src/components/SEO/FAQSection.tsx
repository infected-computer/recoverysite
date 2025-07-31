import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { StructuredDataManager, FAQInfo } from '../../utils/structuredData';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  structured?: boolean;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  items,
  title = "שאלות נפוצות",
  structured = true,
  className = ""
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Generate structured data
  const faqSchema = structured ? StructuredDataManager.createFAQPage(
    items.map(item => ({
      question: item.question,
      answer: item.answer
    }))
  ) : null;

  return (
    <div className={`w-full ${className}`}>
      {/* Structured Data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
        />
      )}

      {/* FAQ Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600 ml-3" />
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          מצא תשובות לשאלות הנפוצות ביותר על שירותי שחזור הקבצים שלנו
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {items.map((item, index) => (
          <Card 
            key={index} 
            className="border border-gray-200 hover:border-blue-300 transition-colors duration-200"
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-right p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900 flex-1">
                  {item.question}
                </span>
                <div className="flex-shrink-0 mr-4">
                  {openItems.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openItems.has(index) && (
                <div 
                  id={`faq-answer-${index}`}
                  className="px-6 pb-6 border-t border-gray-100"
                >
                  <div className="pt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </div>
                  {item.category && (
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Service-specific FAQ data
export const getServiceFAQs = (serviceType: 'data-recovery' | 'remote-support' | 'system-repair'): FAQItem[] => {
  const commonFAQs: FAQItem[] = [
    {
      question: "כמה זמן לוקח התהליך?",
      answer: "זמן השחזור תלוי במורכבות הבעיה ובסוג המדיה. בדרך כלל התהליך לוקח בין 24-72 שעות. במקרים מורכבים יותר זה יכול לקחת עד שבוע.",
      category: "זמנים"
    },
    {
      question: "האם יש אחריות על השירות?",
      answer: "כן, אנו מעניקים אחריות מלאה על השירות. אם לא מצליחים לשחזר את הקבצים - לא גובים תשלום. על קבצים ששוחזרו בהצלחה יש אחריות של 30 ימים.",
      category: "אחריות"
    }
  ];

  switch (serviceType) {
    case 'data-recovery':
      return [
        {
          question: "איך עובד שחזור קבצים מרחוק?",
          answer: "השירות מתבצע באמצעות חיבור מאובטח למחשב שלך. אנו מתקינים תוכנה מיוחדת שמאפשרת לנו לגשת למחשב ולבצע את תהליך השחזור מרחוק, תוך שמירה מלאה על הפרטיות והאבטחה.",
          category: "תהליך"
        },
        {
          question: "אילו סוגי קבצים ניתן לשחזר?",
          answer: "אנו מצליחים לשחזר כמעט כל סוג של קובץ: תמונות, וידאו, מסמכים, מוזיקה, קבצי עבודה ועוד. התהליך עובד עם כל סוגי המדיה - דיסקים קשיחים, SSD, כרטיסי זיכרון, דיסקים חיצוניים.",
          category: "סוגי קבצים"
        },
        {
          question: "האם המידע שלי מאובטח במהלך התהליך?",
          answer: "בהחלט. אנו משתמשים בחיבור מוצפן ובפרוטוקולי אבטחה מתקדמים. כל המידע נשאר במחשב שלך ולא מועבר לשרתים חיצוניים. בסיום התהליך, התוכנה מוסרת לחלוטין.",
          category: "אבטחה"
        },
        {
          question: "מה קורה אם הדיסק לא מזוהה בכלל?",
          answer: "גם במקרים של דיסקים שלא מזוהים על ידי המערכת, יש לנו כלים מתקדמים לשחזור. במקרים קיצוניים, ייתכן שנצטרך להפנות למעבדה פיזית, אך ברוב המקרים נצליח לטפל בבעיה מרחוק.",
          category: "בעיות מורכבות"
        },
        {
          question: "כמה עולה השירות?",
          answer: "המחיר תלוי במורכבות המקרה וכמות הנתונים. בדיקה ראשונית חינמית לחלוטין. המחיר נקבע רק לאחר הבדיקה ורק אם אנו מצליחים לשחזר את הקבצים. המחירים מתחילים מ-300 ש״ח.",
          category: "תמחור"
        },
        ...commonFAQs
      ];

    case 'remote-support':
      return [
        {
          question: "איך מתחברים למחשב שלי מרחוק?",
          answer: "אנו משתמשים בתוכנות מאובטחות כמו TeamViewer או AnyDesk. אתה מקבל קוד חד-פעמי שמאפשר לנו להתחבר למחשב שלך באופן מאובטח. החיבור מתבצע רק בנוכחותך ובאישורך.",
          category: "תהליך"
        },
        {
          question: "אילו בעיות אתם יכולים לפתור מרחוק?",
          answer: "אנו פותרים מגוון רחב של בעיות: התקנת תוכנות, פתרון בעיות ווירוסים, אופטימיזציה של המחשב, תיקון בעיות אינטרנט, הגדרת מדפסות, ועוד. כמעט כל בעיה שלא דורשת טיפול פיזי.",
          category: "סוגי בעיות"
        },
        {
          question: "האם אני צריך להיות ליד המחשב כל הזמן?",
          answer: "לא בהכרח. לאחר החיבור הראשוני ובירור הבעיה, במקרים רבים אנו יכולים לעבוד באופן עצמאי. נעדכן אותך על ההתקדמות ונבקש אישור לפעולות חשובות.",
          category: "תהליך"
        },
        {
          question: "מה אם הבעיה לא נפתרת?",
          answer: "אם לא מצליחים לפתור את הבעיה מרחוק, לא גובים תשלום. במקרים מסוימים נוכל להפנות לטכנאי מקומי או להציע פתרונות חלופיים.",
          category: "אחריות"
        },
        {
          question: "כמה עולה שירות התמיכה?",
          answer: "התמחור נעשה לפי זמן עבודה או לפי פרויקט. בדיקה ראשונית וייעוץ חינמיים. המחירים מתחילים מ-150 ש״ח לשעת עבודה או מחיר קבוע לפי סוג הבעיה.",
          category: "תמחור"
        },
        ...commonFAQs
      ];

    case 'system-repair':
      return [
        {
          question: "אילו בעיות מערכת אתם מתקנים?",
          answer: "אנו מתמחים בתיקון מערכות הפעלה שקרסו, פתרון בעיות אתחול, תיקון רישום המערכת, פתרון בעיות עדכונים, ושחזור מערכת לפעילות תקינה.",
          category: "סוגי תיקונים"
        },
        {
          question: "האם תיקון המערכת ימחק את הקבצים שלי?",
          answer: "לא. אנו עושים כל מאמץ לשמר את כל הקבצים והנתונים שלך. לפני כל תיקון אנו יוצרים גיבוי של הנתונים החשובים ומוודאים שהם לא יאבדו.",
          category: "שמירת נתונים"
        },
        {
          question: "כמה זמן לוקח תיקון מערכת?",
          answer: "תלוי במורכבות הבעיה. תיקונים פשוטים יכולים להימשך שעה-שעתיים, בעוד תיקונים מורכבים יותר עשויים לקחת מספר שעות או יום עבודה.",
          category: "זמנים"
        },
        {
          question: "מה אם המערכת לא מתאתחלת בכלל?",
          answer: "גם במקרים של מערכות שלא מתאתחלות, יש לנו כלים מתקדמים לתיקון. אנו יכולים לגשת למערכת דרך מצבי אתחול מיוחדים או כלי תיקון חיצוניים.",
          category: "בעיות מורכבות"
        },
        {
          question: "האם אקבל הדרכה לשמירה על המערכת?",
          answer: "כן, בסיום התיקון נספק לך הנחיות לתחזוקה שוטפת של המערכת, כולל המלצות על תוכנות אנטי-וירוס, גיבויים, ועדכונים.",
          category: "הדרכה"
        },
        ...commonFAQs
      ];

    default:
      return commonFAQs;
  }
};