/**
 * Accessible FAQ component with accordion functionality
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAccessibleColors } from '@/hooks/useAccessibleColors';
import { ariaUtils } from '@/utils/accessibilityUtils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({
  title = "שאלות נפוצות",
  items,
  className = ""
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const { colors } = useAccessibleColors();

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
      ariaUtils.announce('התשובה נסגרה', 'polite');
    } else {
      newOpenItems.add(id);
      ariaUtils.announce('התשובה נפתחה', 'polite');
    }
    setOpenItems(newOpenItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <section className={`py-16 ${className}`} aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto container-mobile">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle 
              className="h-8 w-8" 
              style={{ color: colors.primary[500] }}
              aria-hidden="true"
            />
            <h2 
              id="faq-title"
              className="font-hebrew text-3xl font-bold"
              style={{ color: colors.text.primary }}
            >
              {title}
            </h2>
          </div>
          <p 
            className="font-hebrew text-lg max-w-2xl mx-auto"
            style={{ color: colors.text.muted }}
          >
            מענה לשאלות הנפוצות ביותר שלקוחותינו שואלים
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4" role="list">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);
            const buttonId = `faq-button-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <Card 
                key={item.id} 
                className="overflow-hidden transition-shadow hover:shadow-md"
                role="listitem"
              >
                <div>
                  {/* Question Button */}
                  <button
                    id={buttonId}
                    className="w-full px-6 py-4 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors hover:bg-gray-50"
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    style={{
                      backgroundColor: isOpen ? `${colors.primary[50]}` : 'transparent'
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 
                          className="font-hebrew text-lg font-semibold text-right"
                          style={{ color: colors.text.primary }}
                        >
                          {item.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp 
                            className="h-5 w-5 transition-transform" 
                            style={{ color: colors.primary[500] }}
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDown 
                            className="h-5 w-5 transition-transform" 
                            style={{ color: colors.text.muted }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Answer Panel */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <CardContent className="px-6 pb-6 pt-0">
                      <div 
                        className="font-hebrew text-base leading-relaxed"
                        style={{ color: colors.text.secondary }}
                      >
                        {item.answer.split('\n').map((paragraph, index) => (
                          <p key={index} className={index > 0 ? 'mt-4' : ''}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <Card 
            className="p-6"
            style={{ 
              backgroundColor: `${colors.primary[50]}`,
              borderColor: `${colors.primary[200]}`
            }}
          >
            <h3 
              className="font-hebrew text-xl font-semibold mb-3"
              style={{ color: colors.text.primary }}
            >
              לא מצאת את התשובה שחיפשת?
            </h3>
            <p 
              className="font-hebrew mb-4"
              style={{ color: colors.text.muted }}
            >
              אנחנו כאן לעזור! צור קשר ונענה על כל שאלה
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent("שלום, יש לי שאלה שלא מופיעה ב-FAQ");
                window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
              }}
              className="font-hebrew px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-target"
              style={{
                backgroundColor: colors.primary[500],
                color: colors.text.inverse
              }}
              aria-label="פתח שיחה בוואטסאפ לשאלות נוספות"
            >
              שאל אותנו בוואטסאפ
            </button>
          </Card>
        </div>

        {/* Screen reader instructions */}
        <div className="sr-only">
          <p>רשימת שאלות נפוצות. לחץ על שאלה כדי לפתוח או לסגור את התשובה.</p>
          <p>ניתן לנווט בין השאלות באמצעות מקשי החצים או הטאב.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;