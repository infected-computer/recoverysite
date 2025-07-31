import React from 'react';
import { Link } from 'react-router-dom';
import { faqData, FAQItem } from '../../data/faqData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';

interface FAQSummaryProps {
  itemsToShow?: number;
}

const FAQSummary: React.FC<FAQSummaryProps> = ({ itemsToShow = 3 }) => {
  const summarizedFaq = faqData.slice(0, itemsToShow);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            שאלות נפוצות
          </h2>
          <p className="text-lg text-gray-600">
            תשובות מהירות לשאלות הנפוצות ביותר של לקוחותינו.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {summarizedFaq.map((item: FAQItem) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-lg font-semibold text-right">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700 text-right leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <Link to="/faq">
            <Button variant="outline" size="lg">
              לכל השאלות והתשובות
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSummary;
