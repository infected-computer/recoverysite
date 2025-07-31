import React from 'react';
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { WhatsAppFloat } from "../../components/layout/WhatsAppFloat";
import SEO from "../../components/SEO";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { CheckCircle } from 'lucide-react';
import { Monitor } from 'lucide-react';
import { Wifi } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Headphones } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Zap } from 'lucide-react';

// Import new SEO components
import { SEOHead } from "../../components/seo/SEOHead";
import { ServiceSchema } from "../../components/seo/ServiceSchema";
import { TLDRBox, getTLDRContent } from "../../components/seo/TLDRBox";
import { FAQSection, getServiceFAQs } from "../../components/seo/FAQSection";
import { ExpertProfile } from "../../components/seo/ExpertProfile";
import { PersonSchema, getExpertProfiles } from "../../components/seo/PersonSchema";

const RemoteSupportPage = () => {
  const seoData = {
    title: "תמיכה מרחוק 24/6 - דוקטור פיקס",
    description: "שירות תמיכה טכנית מקצועי מרחוק בכל שעות היממה. פתרון בעיות מחשב, התקנת תוכנות ותחזוקה שוטפת",
    keywords: "תמיכה מרחוק, תמיכה טכנית, פתרון בעיות מחשב, התקנת תוכנות, תחזוקת מחשב, תמיכה 24/6",
    canonical: "/services/remote-support"
  };

  const supportTypes = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "פתרון בעיות מחשב",
      description: "אבחון ותיקון תקלות במחשב, מערכת הפעלה ותוכנות"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "התקנת תוכנות",
      description: "התקנה והגדרה של תוכנות, עדכונים ומערכות הפעלה"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "אבטחת מידע",
      description: "הגנה מפני וירוסים, תוכנות זדוניות ואיומי סייבר"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "אופטימיזציה",
      description: "שיפור ביצועי המחשב, ניקוי וארגון הקבצים"
    }
  ];

  const features = [
    "זמינות 24/6 בכל ימות השנה",
    "חיבור מאובטח ומוצפן",
    "פתרון מיידי ללא המתנה",
    "תמיכה בעברית ובאנגלית",
    "ללא צורך בהגעה פיזית",
    "תיעוד מלא של הפעולות",
    "גיבוי אוטומטי לפני שינויים",
    "מחיר קבוע ללא הפתעות"
  ];

  const process = [
    {
      step: "1",
      title: "יצירת קשר",
      description: "צור קשר איתנו בטלפון או WhatsApp"
    },
    {
      step: "2", 
      title: "חיבור מרחוק",
      description: "נתחבר למחשב שלך בצורה מאובטחת"
    },
    {
      step: "3",
      title: "אבחון ותיקון",
      description: "נאבחן את הבעיה ונתקן אותה מיידית"
    },
    {
      step: "4",
      title: "בדיקה וסיכום",
      description: "נוודא שהכל עובד ונסכם את הפעולות"
    }
  ];

  const commonIssues = [
    "מחשב איטי או תקוע",
    "בעיות בחיבור לאינטרנט",
    "וירוסים ותוכנות זדוניות",
    "בעיות בהפעלת תוכנות",
    "עדכוני מערכת הפעלה",
    "הגדרת אימייל ותוכנות",
    "בעיות בהדפסה",
    "גיבוי וארגון קבצים"
  ];

  // Get expert data
  const expertProfiles = getExpertProfiles();
  const remoteSupportExpert = expertProfiles[1]; // Sarah Levy

  return (
    <>
      <SEOHead
        title="תמיכה טכנית מרחוק 24/6 | שירות מקצועי ומהיר"
        description="שירות תמיכה טכנית מקצועי מרחוק בכל שעות היממה. פתרון בעיות מחשב, התקנת תוכנות ותחזוקה שוטפת."
        keywords={["תמיכה מרחוק", "תמיכה טכנית", "פתרון בעיות מחשב", "התקנת תוכנות", "תחזוקת מחשב"]}
        canonicalUrl="https://recoverysite.netlify.app/services/remote-support"
        ogType="service"
      />
      <ServiceSchema serviceType="remote-support" />
      <PersonSchema person={remoteSupportExpert} />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  תמיכה מרחוק 24/6
                </h1>
                
                {/* TL;DR Box */}
                <div className="mb-8">
                  <TLDRBox 
                    points={getTLDRContent('remote-support')}
                    variant="highlighted"
                    className="max-w-3xl mx-auto"
                  />
                </div>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  שירות תמיכה טכנית מקצועי מרחוק בכל שעות היממה. פותרים כל בעיה טכנית מהבית שלך, ללא צורך בהגעה פיזית.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    קבל תמיכה עכשיו
                  </Button>
                  <Button variant="outline" size="lg">
                    שאל שאלה
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Support Types */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  סוגי התמיכה שאנחנו מספקים
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  פתרונות מקיפים לכל הבעיות הטכניות שלך
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {supportTypes.map((type, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-green-600 mb-4 flex justify-center">
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

          {/* Common Issues */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    בעיות נפוצות שאנחנו פותרים
                  </h2>
                  <p className="text-lg text-gray-600">
                    הנה כמה מהבעיות הנפוצות שאנחנו פותרים מדי יום
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {commonIssues.map((issue, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    למה לבחור בתמיכה המרחוק שלנו?
                  </h2>
                  <p className="text-lg text-gray-600">
                    יתרונות ייחודיים שמבדילים אותנו מהמתחרים
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
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  איך התהליך עובד?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  תהליך פשוט ומהיר לקבלת תמיכה מרחוק
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {process.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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

          {/* Security */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-blue-50 rounded-2xl p-8">
                  <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    אבטחה ופרטיות מלאה
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    אנחנו משתמשים בחיבור מוצפן ומאובטח לחלוטין. כל הפעולות מתועדות ואנחנו לא שומרים מידע אישי או קבצים מהמחשב שלך.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">256-bit</div>
                      <div className="text-gray-600">הצפנה</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
                      <div className="text-gray-600">שמירת מידע</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                      <div className="text-gray-600">פרטיות</div>
                    </div>
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
                  המומחית שלנו
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  הכירי את המומחית שתספק לך תמיכה טכנית מקצועית
                </p>
              </div>
              
              <ExpertProfile
                name={remoteSupportExpert.name}
                title={remoteSupportExpert.jobTitle}
                experience="מעל 7 שנות ניסיון בתחום התמיכה הטכנית ופתרון בעיות מחשב"
                certifications={[
                  "הסמכה בתמיכה טכנית מתקדמת",
                  "מומחית במערכות הפעלה Windows ו-macOS",
                  "הסמכת אבטחת מידע ופתרון בעיות רשת",
                  "הכשרה בכלי תמיכה מרחוק מקצועיים"
                ]}
                linkedinUrl={remoteSupportExpert.sameAs?.[0]}
                bio={remoteSupportExpert.description}
                specialties={remoteSupportExpert.knowsAbout}
                education={remoteSupportExpert.alumniOf}
                yearsOfExperience={7}
              />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <FAQSection
                items={getServiceFAQs('remote-support')}
                title="שאלות נפוצות על תמיכה מרחוק"
                structured={true}
              />
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-green-600 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  צריך תמיכה עכשיו?
                </h2>
                <p className="text-lg text-green-100 mb-8">
                  אנחנו זמינים 24/6 לפתור כל בעיה טכנית. צור קשר עכשיו וקבל פתרון מיידי
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                    התחבר עכשיו
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                    שלח הודעה
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

export default RemoteSupportPage;