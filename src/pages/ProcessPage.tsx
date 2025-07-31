import React from 'react';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import SEO from "../components/SEO";
import { useSEO, useBreadcrumbs } from "../hooks/useSEO";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Shield } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Users } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Download } from 'lucide-react';
import { Link2 } from 'lucide-react';
import { Search } from 'lucide-react';
import { Eye } from 'lucide-react';
import { FileCheck } from 'lucide-react';

const ProcessPage = () => {
  const breadcrumbs = useBreadcrumbs();

  // SEO data for process page
  const seoData = {
    title: "תהליך שחזור קבצים מקצועי | איך זה עובד | דוקטור פיקס",
    description: "מדריך מפורט על תהליך שחזור הקבצים המקצועי שלנו. 6 שלבים פשוטים, בדיקה חינמית, תשלום רק בהצלחה. למדו איך אנחנו מחזירים לכם את הקבצים החשובים.",
    keywords: ["תהליך שחזור קבצים", "איך עובד שחזור נתונים", "שלבי שחזור", "שחזור מרחוק", "שחזור נתונים מקצועי"],
    canonical: "https://doctorfix.co.il/process"
  };

  useSEO(seoData);

  const processSteps = [
    {
      id: 1,
      icon: Phone,
      title: "יצירת קשר ראשוני",
      subtitle: "התחלה חינמית ללא התחייבות",
      description: "פנו אלינו בטלפון או WhatsApp לתיאור הבעיה וקבלת הערכה ראשונית חינמית",
      duration: "5-10 דקות",
      details: [
        "תיאור הבעיה והנסיבות בהן היא התרחשה",
        "הערכה ראשונית של סיכויי השחזור",
        "הסבר על התהליך והמחירים",
        "קביעת זמן מתאים לחיבור"
      ],
      tips: [
        "הכינו מידע על סוג הכונן והבעיה",
        "ציינו אילו קבצים חשובים לכם במיוחד",
        "שאלו כל שאלה שעולה לכם"
      ],
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      icon: Download,
      title: "התקנת תוכנת חיבור מרחוק",
      subtitle: "חיבור מאובטח ופשוט",
      description: "הורידו והתקינו תוכנה פשוטה ובטוחה על המחשב שלכם לחיבור מרחוק מאובטח",
      duration: "2-3 דקות",
      details: [
        "הורדה חינמית של התוכנה מהאתר הרשמי",
        "התקנה פשוטה ומהירה",
        "חיבור מוצפן ומאובטח לחלוטין",
        "אין צורך ברישום או תשלום"
      ],
      tips: [
        "וודאו שאתם מורידים מהקישור שאנחנו נשלח לכם",
        "התוכנה בטוחה לחלוטין ומשמשת מיליוני משתמשים",
        "אתם שולטים על החיבור ויכולים לנתק בכל רגע"
      ],
      color: "bg-green-500",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      icon: Link2,
      title: "חיבור מרחוק ובדיקה ראשונית",
      subtitle: "אבחון מקצועי של הבעיה",
      description: "המומחה שלנו יתחבר למחשב שלכם ויבצע בדיקה מקצועית של המדיה הפגומה",
      duration: "15-30 דקות",
      details: [
        "חיבור מאובטח למחשב שלכם",
        "בדיקת מצב הכונן הקשיח",
        "זיהוי סוג הנזק והבעיה",
        "הערכה ראשונית של כמות הנתונים"
      ],
      tips: [
        "אתם יכולים לראות בדיוק מה אנחנו עושים",
        "אנחנו מסבירים כל שלב בתהליך",
        "אין שינויים במחשב בשלב זה"
      ],
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      icon: Search,
      title: "סריקה מעמיקה מקצועית",
      subtitle: "גילוי הקבצים הניתנים לשחזור",
      description: "ביצוע סריקה מקצועית עם כלים מתקדמים לזיהוי כל הקבצים הניתנים לשחזור",
      duration: "30-60 דקות",
      details: [
        "שימוש בכלים מקצועיים מתקדמים",
        "סריקה מעמיקה של כל הכונן",
        "זיהוי קבצים שנמחקו או פגומים",
        "יצירת רשימה מפורטת של הקבצים"
      ],
      tips: [
        "התהליך עלול לקחת זמן בהתאם לגודל הכונן",
        "אתם יכולים לראות את התקדמות הסריקה",
        "נמצא לרוב יותר קבצים ממה שציפיתם"
      ],
      color: "bg-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      id: 5,
      icon: Eye,
      title: "הצגת התוצאות וציון מחיר",
      subtitle: "רואים לפני שמשלמים",
      description: "הצגת כל הקבצים שנמצאו, בדיקת תקינותם וקבלת מחיר סופי לשחזור",
      duration: "10-15 דקות",
      details: [
        "הצגת רשימה מלאה של הקבצים שנמצאו",
        "בדיקת תקינות הקבצים החשובים",
        "הערכת איכות השחזור הצפויה",
        "מחיר סופי ללא הפתעות"
      ],
      tips: [
        "אתם רואים בדיוק מה תקבלו",
        "יכולים לבחור קבצים ספציפיים לשחזור",
        "המחיר נקבע לפי כמות וסוג הקבצים"
      ],
      color: "bg-red-500",
      bgColor: "bg-red-50"
    },
    {
      id: 6,
      icon: FileCheck,
      title: "שחזור ומסירת הקבצים",
      subtitle: "תשלום רק לאחר הצלחה מלאה",
      description: "ביצוע השחזור הסופי והעברת הקבצים אליכם בצורה מאובטחת",
      duration: "30-90 דקות",
      details: [
        "שחזור מלא של הקבצים שבחרתם",
        "העברה לכונן חיצוני או ענן",
        "אימות שהקבצים תקינים ופתיחים",
        "תשלום רק לאחר הצלחת השחזור"
      ],
      tips: [
        "הקבצים מועברים בצורה מאובטחת",
        "אתם מקבלים אישור על השלמת התהליך",
        "יש אחריות על איכות השחזור"
      ],
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "100% מאובטח",
      description: "חיבור מוצפן ובטוח לחלוטין"
    },
    {
      icon: Clock,
      title: "מהיר ויעיל",
      description: "התהליך כולו אורך 1-2 שעות"
    },
    {
      icon: Users,
      title: "מומחים מנוסים",
      description: "צוות עם 7+ שנות ניסיון"
    }
  ];

  const stats = [
    { number: "97%", label: "שיעור הצלחה" },
    { number: "1-2", label: "שעות בממוצע" },
    { number: "7+", label: "שנות ניסיון" },
    { number: "24/6", label: "זמינות" }
  ];

  const howToData = {
    name: "איך לשחזר קבצים מרחוק עם דוקטור פיקס",
    description: "מדריך שלב אחר שלב לשחזור קבצים מרחוק באמצעות שירות דוקטור פיקס",
    totalTime: "PT2H",
    estimatedCost: {
      currency: "ILS",
      value: "350-1200"
    },
    tool: ["תוכנת חיבור מרחוק", "כלים מקצועיים לשחזור", "כלים מותאמים אישית", "מחשב עם חיבור אינטרנט"],
    supply: ["הדיסק הקשיח או המדיה הפגומה"],
    steps: processSteps.map(step => ({
      name: step.title,
      text: step.description,
      url: step.id === 1 ? "/contact" : undefined
    }))
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני מעוניין לדעת עוד על תהליך שחזור הקבצים.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  return (
    <>
      <SEO
        {...seoData}
        breadcrumbs={breadcrumbs}
        howToData={howToData}
        ogType="website"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4 text-sm">
                  תהליך פשוט ושקוף
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  איך זה עובד?
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                  מדריך מפורט על התהליך השלם של שחזור קבצים מרחוק -
                  מההתחברות הראשונית ועד לשחזור המלא. פשוט, מהיר ובטוח.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-md">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Process Summary */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  תקציר התהליך
                </h2>
                <div className="bg-blue-50 rounded-2xl p-8 text-right">
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                      <div className="text-gray-700">שלבים פשוטים</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">1-2</div>
                      <div className="text-gray-700">שעות בממוצע</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">97%</div>
                      <div className="text-gray-700">שיעור הצלחה</div>
                    </div>
                  </div>

                  <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                    <p>
                      <strong>התהליך מתחיל</strong> בפנייה טלפונית או WhatsApp שלכם אלינו, שם אנחנו מבינים את הבעיה ונותנים הערכה ראשונית חינמית.
                    </p>
                    <p>
                      <strong>לאחר מכן</strong> אתם מורידים תוכנה פשוטה ובטוחה שמאפשרת לנו להתחבר למחשב שלכם מרחוק. אתם שולטים על החיבור ויכולים לנתק בכל רגע.
                    </p>
                    <p>
                      <strong>אנחנו מבצעים</strong> בדיקה מקצועית של הכונן הפגום, מזהים את הבעיה ומריצים סריקה מעמיקה כדי למצוא את כל הקבצים הניתנים לשחזור.
                    </p>
                    <p>
                      <strong>לפני התשלום</strong> אתם רואים בדיוק אילו קבצים נמצאו ובאיזו איכות, ומקבלים מחיר סופי ללא הפתעות. רק אחרי האישור שלכם אנחנו מבצעים את השחזור הסופי.
                    </p>
                    <p className="font-semibold text-blue-800">
                      💡 העיקרון שלנו פשוט: תשלום רק לאחר שחזור מוצלח ואישור שלכם שהקבצים תקינים!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Steps - Clean Layout */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  התהליך שלב אחר שלב
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  6 שלבים פשוטים לשחזור מוצלח של הקבצים החשובים לכם
                </p>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="space-y-12">
                  {processSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Connection Line */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute right-8 top-20 w-0.5 h-16 bg-gray-300 hidden md:block" />
                      )}

                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Step Icon & Number */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg mb-3`}>
                            {React.createElement(step.icon, { className: "w-8 h-8 text-white" })}
                          </div>
                          <Badge variant="outline" className="text-sm font-semibold">
                            שלב {step.id}
                          </Badge>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                <h3 className="text-2xl font-bold text-gray-900">
                                  {step.title}
                                </h3>
                                <Badge variant="secondary" className="text-sm w-fit">
                                  {step.duration}
                                </Badge>
                              </div>
                              <p className="text-lg text-blue-600 font-medium">
                                {step.subtitle}
                              </p>
                              <p className="text-gray-700 leading-relaxed">
                                {step.description}
                              </p>
                            </CardHeader>

                            <CardContent className="pt-0">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                    מה קורה בשלב זה
                                  </h4>
                                  <ul className="space-y-2">
                                    {step.details.map((detail, detailIndex) => (
                                      <li key={detailIndex} className="flex items-start gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-700">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                                    טיפים חשובים
                                  </h4>
                                  <ul className="space-y-2">
                                    {step.tips.map((tip, tipIndex) => (
                                      <li key={tipIndex} className="flex items-start gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-700">{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  המספרים מדברים בעד עצמם
                </h2>
                <p className="text-xl text-blue-100">
                  נתונים על הביצועים והיעילות שלנו
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-blue-100 text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  שאלות נפוצות על התהליך
                </h2>
                <p className="text-lg text-gray-600">
                  תשובות לשאלות הנפוצות ביותר על תהליך השחזור
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">כמה זמן אורך התהליך?</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      התהליך כולו אורך בדרך כלל 1-2 שעות, תלוי בגודל הכונן ומורכבות הבעיה.
                      הבדיקה הראשונית אורכת 15-30 דקות, הסריקה 30-60 דקות, והשחזור עצמו 30-90 דקות.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">האם זה בטוח? מה עם הפרטיות שלי?</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      כן, זה בטוח לחלוטין. אנחנו משתמשים בחיבור מוצפן ומאובטח, אתם שולטים על החיבור
                      ויכולים לנתק בכל רגע. אנחנו לא שומרים מידע אישי ולא ניגשים לקבצים שלא קשורים לשחזור.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">מה אם לא מצליחים לשחזר?</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      אם לא מצליחים לשחזר קבצים, אתם לא משלמים כלום. אנחנו גובים תשלום רק לאחר
                      שחזור מוצלח ואישור שלכם שהקבצים תקינים ופתיחים.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">איך אני יודע שהקבצים תקינים?</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      לפני התשלום, אנחנו מראים לכם את הקבצים שנמצאו ובודקים יחד איתכם שהם תקינים
                      ונפתחים כראוי. רק לאחר האישור שלכם אנחנו מבקשים תשלום.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                מוכנים להתחיל?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                התהליך פשוט ומהיר. פנו אלינו עכשיו לבדיקה חינמית ללא התחייבות
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
                >
                  התחל עכשיו - בדיקה חינמית
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
                  onClick={() => window.location.href = '/contact'}
                >
                  יצירת קשר
                </Button>
              </div>

              <div className="text-sm text-blue-100">
                <p>⭐ בדיקה ראשונית חינמית | 💯 תשלום רק בהצלחה | 🔒 חיבור מאובטח</p>
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

export default ProcessPage;