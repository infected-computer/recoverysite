import React from 'react';
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { WhatsAppFloat } from "../../components/layout/WhatsAppFloat";
import SEO from "../../components/SEO";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { CheckCircle } from 'lucide-react';
import { HardDrive } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Usb } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Award } from 'lucide-react';

// Import new SEO components
import { SEOHead } from "../../components/seo/SEOHead";
import { ServiceSchema } from "../../components/seo/ServiceSchema";
import { TLDRBox, getTLDRContent } from "../../components/seo/TLDRBox";
import { useAnalytics, useScrollTracking, useTimeTracking } from '../../hooks/useAnalytics';
import { FAQSection, getServiceFAQs } from "../../components/seo/FAQSection";
import { ExpertProfile } from "../../components/seo/ExpertProfile";
import { PersonSchema, getExpertProfiles } from "../../components/seo/PersonSchema";

const DataRecoveryPage = () => {
  // Analytics tracking
  const analytics = useAnalytics();
  useScrollTracking();
  useTimeTracking();
  
  // Track service page view
  React.useEffect(() => {
    analytics.trackServiceView('data_recovery');
  }, [analytics]);
  
  const seoData = {
    title: "שחזור קבצים מתקדם - דוקטור פיקס",
    description: "שירותי שחזור קבצים מקצועיים מכל סוגי האמצעי אחסון. דיסקים קשיחים, SSD, כרטיסי זיכרון ועוד. שיעור הצלחה 97%",
    keywords: "שחזור קבצים, שחזור נתונים, דיסק קשיח, SSD, כרטיס זיכרון, שחזור תמונות, שחזור מסמכים",
    canonical: "/services/data-recovery"
  };

  const recoveryTypes = [
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: "שחזור דיסק קשיח HDD",
      description: "שחזור מידע מקצועי מדיסקים קשיחים (HDD) שניזוקו פיזית או לוגית."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "שחזור דיסק קשיח SSD",
      description: "שחזור מידע מקצועי מדיסקי SSD שניזוקו פיזית או לוגית."
    },
    {
      icon: <Usb className="w-8 h-8" />,
      title: "שחזור דיסק און קי",
      description: "שחזור קבצים ותיקיות מהתקני דיסק און קי (USB) מכל הסוגים והגדלים."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "שחזור כרטיס זיכרון",
      description: "שחזור תמונות, סרטונים וקבצים מכרטיסי זיכרון (SD, MicroSD) של מצלמות וסמארטפונים."
    }
  ];

  const features = [
    "שיעור הצלחה של 97%",
    "שחזור מרחוק ללא צורך בהגעה פיזית",
    "כלים מתקדמים שפיתחנו במיוחד",
    "תמיכה בכל סוגי הקבצים",
    "שחזור גם ממקרים קשים",
    "שירות 24/6",
    "אבטחת מידע מלאה",
    "ללא תשלום אם לא מצליחים"
  ];

  const process = [
    {
      step: "1",
      title: "פנייה ראשונית",
      description: "צור קשר איתנו ותאר את הבעיה"
    },
    {
      step: "2", 
      title: "אבחון מקדים",
      description: "נבצע אבחון ראשוני ונעריך את הסיכויים"
    },
    {
      step: "3",
      title: "התחלת התהליך",
      description: "נתחיל בתהליך השחזור עם הכלים המתקדמים שלנו"
    },
    {
      step: "4",
      title: "השלמה והעברה",
      description: "נעביר לך את הקבצים המשוחזרים בצורה מאובטחת"
    }
  ];

  // Get expert data
  const expertProfiles = getExpertProfiles();
  const dataRecoveryExpert = expertProfiles[0]; // David Cohen

  return (
    <>
      <SEOHead
        title="שחזור קבצים מרחוק | שירות מקצועי עם שיעור הצלחה 97%"
        description="שירות שחזור קבצים מקצועי מרחוק מכל סוגי המדיה - דיסקים קשיחים, SSD, כרטיסי זיכרון. בדיקה חינמית ותשלום רק לאחר הצלחה."
        keywords={["שחזור קבצים", "שחזור נתונים", "דיסק קשיח", "SSD", "כרטיס זיכרון", "שחזור מרחוק"]}
        canonicalUrl="https://recoverysite.netlify.app/services/data-recovery"
        ogType="service"
      />
      <ServiceSchema serviceType="data-recovery" />
      <PersonSchema person={dataRecoveryExpert} />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  שחזור קבצים מתקדם
                </h1>
                
                {/* TL;DR Box */}
                <div className="mb-8">
                  <TLDRBox 
                    points={getTLDRContent('data-recovery')}
                    variant="highlighted"
                    className="max-w-3xl mx-auto"
                  />
                </div>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  אנחנו מתמחים בשחזור קבצים מכל סוגי האמצעי אחסון. עם כלים מתקדמים שפיתחנו במיוחד ושיעור הצלחה של 97%, אנחנו מחזירים לך את הקבצים החשובים ביותר.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    התחל שחזור עכשיו
                  </Button>
                  <Button variant="outline" size="lg">
                    קבל הערכת מחיר
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Recovery Types */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  סוגי שחזור שאנחנו מבצעים
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  אנחנו מתמחים בשחזור קבצים מכל סוגי האמצעי אחסון
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {recoveryTypes.map((type, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-blue-600 mb-4 flex justify-center">
                        {type.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {type.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {type.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    למה לבחור בנו?
                  </h2>
                  <p className="text-lg text-gray-600">
                    אנחנו מציעים שירות מקצועי ואמין עם יתרונות ייחודיים
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  איך התהליך עובד?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  תהליך פשוט ומהיר לשחזור הקבצים שלך
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {process.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">97%</div>
                  <div className="text-blue-100">שיעור הצלחה</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24/6</div>
                  <div className="text-blue-100">זמינות</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">7+</div>
                  <div className="text-blue-100">שנות ניסיון</div>
                </div>
              </div>
            </div>
          </section>

          {/* Expert Profile */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  המומחה שלנו
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  הכר את המומחה שיטפל בשחזור הקבצים שלך
                </p>
              </div>
              
              <ExpertProfile
                name={dataRecoveryExpert.name}
                title={dataRecoveryExpert.jobTitle}
                experience="מעל 10 שנות ניסיון בתחום שחזור קבצים ותמיכה טכנית"
                certifications={[
                  "הסמכה בשחזור קבצים מתקדם",
                  "מומחה בטכנולוגיות אחסון",
                  "הסמכת אבטחת מידע",
                  "הכשרה בכלי שחזור מקצועיים"
                ]}
                linkedinUrl={dataRecoveryExpert.sameAs?.[0]}
                bio={dataRecoveryExpert.description}
                specialties={dataRecoveryExpert.knowsAbout}
                education={dataRecoveryExpert.alumniOf}
                yearsOfExperience={10}
              />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <FAQSection
                items={getServiceFAQs('data-recovery')}
                title="שאלות נפוצות על שחזור קבצים"
                structured={true}
              />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  מוכן להתחיל?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  צור קשר איתנו עכשיו ונתחיל בתהליך שחזור הקבצים שלך
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    צור קשר עכשיו
                  </Button>
                  <Button variant="outline" size="lg">
                    שאל שאלה
                  </Button>
                </div>
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

export default DataRecoveryPage;