/**
 * Trust and security guarantee section
 */

import React from 'react';
import { Shield, Lock, CheckCircle, Award, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAccessibleColors } from '@/hooks/useAccessibleColors';

interface GuaranteeItem {
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: boolean;
}

interface TrustGuaranteeProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const TrustGuarantee: React.FC<TrustGuaranteeProps> = ({
  title = "הבטחת הצלחה ואבטחה",
  subtitle = "המחויבות שלנו לשירות מקצועי ובטוח",
  className = ""
}) => {
  const { colors } = useAccessibleColors();

  const guarantees: GuaranteeItem[] = [
    {
      icon: Shield,
      title: "הבטחת הצלחה 97%",
      description: "שיעור הצלחה גבוה המבוסס על ניסיון של מעל 7 שנים ואלפי פרויקטים מוצלחים",
      highlight: true
    },
    {
      icon: Lock,
      title: "אבטחת נתונים מלאה",
      description: "הצפנה מתקדמת, פרוטוקולי אבטחה מחמירים והסכם סודיות לכל פרויקט"
    },
    {
      icon: CheckCircle,
      title: "תשלום רק בהצלחה",
      description: "אתם משלמים רק אם אנחנו מצליחים לשחזר את הקבצים שלכם - ללא סיכון כלכלי"
    },
    {
      icon: Award,
      title: "אחריות מלאה",
      description: "אחריות על כל הקבצים המשוחזרים וטיפול מיידי בכל בעיה שעלולה להתגלות"
    },
    {
      icon: Clock,
      title: "זמינות 24/6",
      description: "צוות מקצועי זמין כמעט בכל שעות היממה לייעוץ ותמיכה טכנית"
    },
    {
      icon: Users,
      title: "שירות אישי",
      description: "יחס אישי לכל לקוח, התאמה מלאה לצרכים ועדכונים שוטפים לאורך התהליך"
    }
  ];

  return (
    <section className={`py-16 ${className}`} aria-labelledby="trust-title">
      <div className="max-w-6xl mx-auto container-mobile">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: `${colors.primary[100]}` }}
            >
              <Shield 
                className="h-8 w-8" 
                style={{ color: colors.primary[600] }}
                aria-hidden="true"
              />
            </div>
            <h2 
              id="trust-title"
              className="font-hebrew text-3xl font-bold"
              style={{ color: colors.text.primary }}
            >
              {title}
            </h2>
          </div>
          <p 
            className="font-hebrew text-lg max-w-3xl mx-auto"
            style={{ color: colors.text.muted }}
          >
            {subtitle}
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon;
            
            return (
              <Card 
                key={index}
                className={`h-full transition-all duration-300 hover:shadow-lg ${
                  guarantee.highlight 
                    ? 'ring-2 ring-blue-200 bg-blue-50/50' 
                    : 'hover:shadow-md'
                }`}
                style={{
                  borderColor: guarantee.highlight ? colors.primary[300] : colors.surface.border
                }}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ 
                        backgroundColor: guarantee.highlight 
                          ? colors.primary[500] 
                          : `${colors.primary[100]}` 
                      }}
                    >
                      <IconComponent 
                        className="h-6 w-6" 
                        style={{ 
                          color: guarantee.highlight 
                            ? colors.text.inverse 
                            : colors.primary[600] 
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="font-hebrew text-lg font-semibold flex-1"
                      style={{ 
                        color: guarantee.highlight 
                          ? colors.primary[700] 
                          : colors.text.primary 
                      }}
                    >
                      {guarantee.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p 
                    className="font-hebrew text-sm leading-relaxed flex-1"
                    style={{ color: colors.text.secondary }}
                  >
                    {guarantee.description}
                  </p>

                  {/* Highlight badge */}
                  {guarantee.highlight && (
                    <div className="mt-4">
                      <span 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: colors.primary[500],
                          color: colors.text.inverse
                        }}
                      >
                        המובילים בתחום
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security Details */}
        <Card 
          className="p-8"
          style={{ 
            backgroundColor: `${colors.surface.elevated}`,
            borderColor: colors.surface.border
          }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock 
                className="h-6 w-6" 
                style={{ color: colors.primary[600] }}
                aria-hidden="true"
              />
              <h3 
                className="font-hebrew text-xl font-semibold"
                style={{ color: colors.text.primary }}
              >
                פרטי האבטחה שלנו
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div 
                  className="font-hebrew font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  הצפנה מתקדמת
                </div>
                <p 
                  className="font-hebrew text-sm"
                  style={{ color: colors.text.muted }}
                >
                  כל הנתונים מוצפנים ב-AES-256
                </p>
              </div>
              
              <div>
                <div 
                  className="font-hebrew font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  הסכם סודיות
                </div>
                <p 
                  className="font-hebrew text-sm"
                  style={{ color: colors.text.muted }}
                >
                  חתימה על NDA לכל פרויקט
                </p>
              </div>
              
              <div>
                <div 
                  className="font-hebrew font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  מחיקה מאובטחת
                </div>
                <p 
                  className="font-hebrew text-sm"
                  style={{ color: colors.text.muted }}
                >
                  מחיקת נתונים לאחר השחזור
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Screen reader information */}
        <div className="sr-only">
          <p>סעיף הבטחות ואבטחה מכיל 6 הבטחות עיקריות לשירות מקצועי ובטוח</p>
          <p>כל הבטחה כוללת תיאור מפורט של המחויבות שלנו כלפי הלקוחות</p>
        </div>
      </div>
    </section>
  );
};

export default TrustGuarantee;