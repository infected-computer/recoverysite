import React from 'react';
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { WhatsAppFloat } from "../../components/layout/WhatsAppFloat";
import SEO from "../../components/SEO";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { CheckCircle, Cpu, HardDrive, Wifi, Shield, Wrench, Zap, RefreshCw } from "lucide-react";

// Import new SEO components
import { SEOHead } from "../../components/seo/SEOHead";
import { ServiceSchema } from "../../components/seo/ServiceSchema";
import { TLDRBox, getTLDRContent } from "../../components/seo/TLDRBox";
import { FAQSection, getServiceFAQs } from "../../components/seo/FAQSection";
import { ExpertProfile } from "../../components/seo/ExpertProfile";
import { PersonSchema, getExpertProfiles } from "../../components/seo/PersonSchema";

const SystemRepairPage = () => {
  const seoData = {
    title: "תיקון מערכות מחשב - דוקטור פיקס",
    description: "אבחון ותיקון תקלות מחשב, עדכון מערכות הפעלה, ניקוי וירוסים ואופטימיזציה של ביצועי המחשב",
    keywords: "תיקון מחשב, אבחון תקלות, עדכון מערכת הפעלה, ניקוי וירוסים, אופטימיזציה, ביצועי מחשב",
    canonical: "/services/system-repair"
  };

  const repairTypes = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "אבחון תקלות חומרה",
      description: "זיהוי ותיקון בעיות במעבד, זיכרון, כרטיס מסך ורכיבים נוספים"
    },
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: "תיקון מערכת הפעלה",
      description: "פתרון בעיות Windows, Mac ו-Linux, עדכונים ותיקון קבצי מערכת"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ניקוי וירוסים",
      description: "הסרת וירוסים, תוכנות זדוניות ותוכנות לא רצויות"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "אופטימיזציה",
      description: "שיפור ביצועי המחשב, ניקוי דיסק וארגון קבצים"
    }
  ];

  const services = [
    "אבחון מקיף של המערכת",
    "תיקון בעיות הפעלה",
    "עדכון מערכת הפעלה",
    "התקנת דרייברים",
    "ניקוי וירוסים ותוכנות זדוניות",
    "אופטימיזציה וניקוי דיסק",
    "תיקון רישום המערכת",
    "גיבוי וארגון קבצים",
    "הגדרת אבטחה",
    "שיפור ביצועי המערכת"
  ];

  const process = [
    {
      step: "1",
      title: "אבחון ראשוני",
      description: "בדיקה מקיפה של המערכת לזיהוי הבעיות"
    },
    {
      step: "2", 
      title: "הערכת הנזק",
      description: "הערכת היקף הבעיה והפתרונות הנדרשים"
    },
    {
      step: "3",
      title: "ביצוע התיקונים",
      description: "תיקון הבעיות בצורה מקצועית ויסודית"
    },
    {
      step: "4",
      title: "בדיקה ואופטימיזציה",
      description: "וידוא שהכל עובד ושיפור ביצועי המערכת"
    }
  ];

  const commonProblems = [
    "מחשב לא נדלק או נתקע בהפעלה",
    "מערכת הפעלה איטית או תקועה",
    "מסך כחול (Blue Screen)",
    "בעיות בחיבור לאינטרנט",
    "תוכנות לא עובדות כראוי",
    "וירוסים ותוכנות זדוניות",
    "בעיות בהדפסה",
    "קבצים לא נפתחים",
    "שגיאות מערכת חוזרות",
    "ביצועים איטיים"
  ];

  const benefits = [
    "אבחון מקצועי ומדויק",
    "פתרון מהיר ויעיל",
    "שימוש בכלים מתקדמים",
    "גיבוי לפני כל שינוי",
    "אחריות על העבודה",
    "תמיכה לאחר התיקון",
    "מחירים הוגנים וקבועים",
    "שירות מקצועי ואמין"
  ];

  // Get expert data - using David Cohen for system repair as well
  const expertProfiles = getExpertProfiles();
  const systemRepairExpert = expertProfiles[0]; // David Cohen

  return (
    <>
      <SEOHead
        title="תיקון מערכות מחשב מרחוק | אבחון ותיקון מקצועי"
        description="אבחון ותיקון מקצועי של כל תקלות המחשב. עדכון מערכות הפעלה, ניקוי וירוסים ושיפור ביצועים."
        keywords={["תיקון מחשב", "אבחון תקלות", "עדכון מערכת הפעלה", "ניקוי וירוסים", "אופטימיזציה"]}
        canonicalUrl="https://recoverysite.netlify.app/services/system-repair"
        ogType="service"
      />
      <ServiceSchema serviceType="system-repair" />
      <PersonSchema person={systemRepairExpert} />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  תיקון מערכות מחשב
                </h1>
                
                {/* TL;DR Box */}
                <div className="mb-8">
                  <TLDRBox 
                    points={getTLDRContent('system-repair')}
                    variant="highlighted"
                    className="max-w-3xl mx-auto"
                  />
                </div>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  אבחון ותיקון מקצועי של כל תקלות המחשב. מעדכנים מערכות הפעלה, מנקים וירוסים ומשפרים ביצועים.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    קבל אבחון עכשיו
                  </Button>
                  <Button variant="outline" size="lg">
                    שאל שאלה
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Repair Types */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  סוגי התיקונים שאנחנו מבצעים
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  פתרונות מקיפים לכל בעיות המחשב
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {repairTypes.map((type, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-purple-600 mb-4 flex justify-center">
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

          {/* Common Problems */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    בעיות נפוצות שאנחנו פותרים
                  </h2>
                  <p className="text-lg text-gray-600">
                    הנה כמה מהבעיות הנפוצות שאנחנו מתקנים מדי יום
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {commonProblems.map((problem, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Wrench className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    השירותים שאנחנו מספקים
                  </h2>
                  <p className="text-lg text-gray-600">
                    רשימה מלאה של שירותי התיקון והתחזוקה שלנו
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  איך התהליך עובד?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  תהליך מקצועי ושיטתי לתיקון המחשב שלך
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {process.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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

          {/* Benefits */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    למה לבחור בנו לתיקון המחשב?
                  </h2>
                  <p className="text-lg text-gray-600">
                    יתרונות ייחודיים שמבדילים אותנו מהמתחרים
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tools */}
          <section className="py-20 bg-purple-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <RefreshCw className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  כלים מתקדמים ומותאמים
                </h2>
                <p className="text-lg text-purple-100 mb-8">
                  אנחנו משתמשים בכלים מתקדמים שפיתחנו במיוחד לאבחון ותיקון מערכות מחשב. הכלים שלנו מאפשרים לנו לזהות ולתקן בעיות שאחרים לא מצליחים לפתור.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-purple-100">כלים מותאמים</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">97%</div>
                    <div className="text-purple-100">שיעור הצלחה</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">7+</div>
                    <div className="text-purple-100">שנות פיתוח</div>
                  </div>
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
                  הכר את המומחה שיטפל בתיקון המערכת שלך
                </p>
              </div>
              
              <ExpertProfile
                name={systemRepairExpert.name}
                title="מומחה תיקון מערכות ושחזור קבצים"
                experience="מעל 10 שנות ניסיון בתחום תיקון מערכות מחשב ושחזור קבצים"
                certifications={[
                  "הסמכה בתיקון מערכות מתקדם",
                  "מומחה במערכות הפעלה Windows, macOS ו-Linux",
                  "הסמכת אבטחת מידע ופתרון בעיות מערכת",
                  "הכשרה בכלי אבחון ותיקון מקצועיים"
                ]}
                linkedinUrl={systemRepairExpert.sameAs?.[0]}
                bio={systemRepairExpert.description}
                specialties={systemRepairExpert.knowsAbout}
                education={systemRepairExpert.alumniOf}
                yearsOfExperience={10}
              />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <FAQSection
                items={getServiceFAQs('system-repair')}
                title="שאלות נפוצות על תיקון מערכות"
                structured={true}
              />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-purple-50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  המחשב שלך לא עובד כמו שצריך?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  צור קשר איתנו עכשיו ונתקן את המחשב שלך במהירות ובמקצועיות
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    קבל אבחון עכשיו
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

export default SystemRepairPage;