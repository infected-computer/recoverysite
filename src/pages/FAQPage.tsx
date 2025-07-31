import React from 'react';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import SEO from "../components/SEO";
import { faqData, FAQItem } from '../data/faqData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const FAQPage: React.FC = () => {
  const seoData = {
    title: "שאלות ותשובות נפוצות - דוקטור פיקס",
    description: "כל מה שרציתם לדעת על שחזור מידע. שאלות נפוצות על עלויות, זמני טיפול, אבטחת מידע ועוד.",
    keywords: "שאלות ותשובות, שחזור מידע, עלות שחזור, זמן שחזור, אבטחת מידע",
    canonical: "/faq"
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                 שאלות נפוצות
                </h1>
                <p className="text-lg text-gray-600">
                  ריכזנו עבורכם את כל מה שחשוב לדעת על תהליך שחזור המידע.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((item: FAQItem) => (
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
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
};

export default FAQPage;
