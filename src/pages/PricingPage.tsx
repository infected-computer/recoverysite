import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check } from 'lucide-react';
import { Star } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Shield } from 'lucide-react';
import SEO from "../components/SEO";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import { useSEO, useBreadcrumbs } from "../hooks/useSEO";
import { faqData } from "../config/seo";
import pricingBg from "../assets/pricing-background.jpg";
import FAQ from "../components/sections/FAQ";
import TrustGuarantee from "../components/sections/TrustGuarantee";

const pricingPlans = [
  {
    name: "אבחון ראשוני",
    price: "ללא עלות",
    priceOrder: 0,
    description: "הערכה מקצועית של הנזק ואפשרויות השחזור",
    features: [
      "בדיקה מקצועית של המדיה",
      "הערכת זמן העבודה",
      "ייעוץ טכני מקצועי"
    ],
    color: "border-primary"
  },
  {
    name: "שחזור כרטיסי זיכרון ודיסקים אונקיים",
    price: "₪350-₪600",
    priceOrder: 350,
    description: "שחזור מכל סוגי כרטיסי הזיכרון ודיסקים אונקיים",
    features: [
      "כרטיסי SD, MicroSD, CF",
      "דיסקים אונקיים USB",
      "SSD חיצוניים",
    ],
    color: "border-accent"
  },
  {
    name: "שחזור דיסקים קשיחים",
    price: "₪700-₪1,200",
    priceOrder: 700,
    description: "שחזור מדיסקים קשיחים פנימיים וחיצוניים",
    features: [
      "דיסקים קשיחים HDD ו-SSD",
      "שחזור מטא-דאטה ומבנה תיקיות"
    ],
    color: "border-warning"
  }
].sort((a, b) => a.priceOrder - b.priceOrder);

const additionalServices = [
  {
    title: "התקנת מערכות גיבוי",
    price: "₪200-₪500",
    priceOrder: 200,
    description: "הקמת מערכת גיבוי אוטומטית למניעת אובדן נתונים עתידי"
  },
  {
    title: "הדרכה אישית",
    price: "₪250/שעה",
    priceOrder: 250,
    description: "הדרכה על כלי שחזור וגיבוי לשימוש עצמאי"
  },
  {
    title: "ייעוץ אבטחת מידע",
    price: "₪300/שעה",
    priceOrder: 300,
    description: "הערכת סיכונים והמלצות להגנה על הנתונים"
  }
].sort((a, b) => a.priceOrder - b.priceOrder);

export const PricingPage = () => {
  const breadcrumbs = useBreadcrumbs();
  
  // SEO data for pricing page
  const seoData = {
    title: "מחירון שחזור קבצים | מחירים שקופים - דוקטור פיקס",
    description: "מחירון שקוף לשחזור קבצים. עלות שחזור נתונים מ-₪300. הערכת מחיר חינמית לכל סוגי הדיסקים וכרטיסי הזיכרון.",
    keywords: ["מחיר שחזור קבצים", "מחירון שחזור נתונים", "עלות שחזור"],
    canonical: "https://doctorfix.co.il/pricing"
  };
  
  useSEO(seoData);

  const handlePayment = async (price: number, name: string, description: string) => {
    try {
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout');
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Payment initiation failed:', error);
      // You can add a user-facing error message here, e.g., using a toast notification
    }
  };

  const pricingStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "מחירון שחזור קבצים",
      "itemListElement": [
        {
          "@type": "Offer",
          "position": 1,
          "name": "בדיקה ראשונית",
          "price": "0",
          "priceCurrency": "ILS",
          "description": "הערכת סיכויי השחזור ללא עלות",
          "seller": {
            "@type": "Organization",
            "name": "דוקטור פיקס"
          }
        },
        {
          "@type": "Offer", 
          "position": 2,
          "name": "שחזור כרטיסי זיכרון ודיסקים אונקיים",
          "priceRange": "350-600",
          "priceCurrency": "ILS",
          "description": "שחזור מכל סוגי כרטיסי הזיכרון ודיסקים אונקיים",
          "seller": {
            "@type": "Organization",
            "name": "דוקטור פיקס"
          }
        },
        {
          "@type": "Offer",
          "position": 3,
          "name": "שחזור דיסקים קשיחים",
          "priceRange": "700-1200",
          "priceCurrency": "ILS",
          "description": "שחזור מדיסקים קשיחים פנימיים וחיצוניים",
          "seller": {
            "@type": "Organization",
            "name": "דוקטור פיקס"
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        {...seoData}
        breadcrumbs={breadcrumbs}
        customStructuredData={pricingStructuredData}
        ogType="website"
      />
      <Header />
      <div className="min-h-screen bg-background py-12 relative no-horizontal-scroll">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={pricingBg}
            alt="רקע דקורטיבי של מעבדת שחזור נתונים עם ציוד טכנולוגי מתקדם"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        <div className="relative z-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto container-mobile text-center mb-16">
        <h1 className="font-hebrew text-4xl md:text-5xl font-bold mb-6">
          מחירון שירותי שחזור קבצים
        </h1>
        <p className="font-hebrew text-xl text-muted-foreground max-w-3xl mx-auto">
          תמחור שקוף והוגן ללא הפתעות. בדיקה ראשונית תמיד ללא עלות
        </p>
      </div>

      {/* Service Pricing Table */}
      <div className="max-w-5xl mx-auto container-mobile mb-20">
        <div className="table-responsive">
          <div className="bg-card rounded-lg border shadow-lg overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b">
              <h2 className="font-hebrew text-2xl font-bold text-center">
                תעריפי שחזור קבצים
              </h2>
            </div>
            
            <div className="divide-y pricing-grid">
              {pricingPlans.map((plan, index) => (
                <div key={index} className="pricing-card p-6 hover:bg-muted/30 transition-colors">
                  <div className="pricing-card-content flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-hebrew text-xl font-semibold text-foreground">
                          {plan.name}
                        </h3>
                      </div>
                      <p className="font-hebrew text-muted-foreground mb-3">
                        {plan.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {plan.features.slice(0, 3).map((feature, featureIndex) => (
                          <span key={featureIndex} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <Check className="h-3 w-3 text-success" aria-hidden="true" />
                            <span className="font-hebrew">{feature}</span>
                          </span>
                        ))}
                        {plan.features.length > 3 && (
                          <span className="text-sm text-muted-foreground font-hebrew">
                            +{plan.features.length - 3} נוספים
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:text-right">
                      <div className="text-2xl lg:text-3xl font-bold text-primary">
                        {plan.price}
                      </div>
                      <Button 
                        onClick={() => handlePayment(plan.priceOrder, plan.name, plan.description)}
                        size="sm"
                        className="font-hebrew bg-primary hover:bg-primary/90 touch-target"
                        aria-label={`קבל פרטים נוספים על ${plan.name}`}
                      >
                        קבל פרטים נוספים 
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="max-w-7xl mx-auto container-mobile mb-16">
        <h2 className="font-hebrew text-3xl font-bold text-center mb-12">
          שירותים נוספים
        </h2>
        
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <Card key={index} className="pricing-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="font-hebrew text-lg text-center">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pricing-card-content text-center">
                <div className="text-2xl font-bold text-accent mb-3">
                  {service.price}
                </div>
                <p className="font-hebrew text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <Button 
                  onClick={openWhatsApp}
                  variant="outline" 
                  className="font-hebrew touch-target"
                  aria-label={`קבל פרטים נוספים על ${service.title}`}
                >
                  קבל פרטים נוספים
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ 
        items={faqData.pricing}
        className="mb-20"
      />

      {/* Trust and Security Guarantee */}
      <TrustGuarantee className="mb-20" />

      {/* Guarantee Section */}
      <div className="max-w-4xl mx-auto container-mobile">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h3 className="font-hebrew text-2xl font-bold mb-4">
              ההבטחה שלנו
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                <h4 className="font-hebrew font-semibold mb-2">בדיקה חינמית</h4>
                <p className="font-hebrew text-sm text-muted-foreground">
                  לא משלמים עד שרואים תוצאות
                </p>
              </div>
              
              <div>
                <Shield className="h-8 w-8 text-success mx-auto mb-2" />
                <h4 className="font-hebrew font-semibold mb-2">אחריות מלאה</h4>
                <p className="font-hebrew text-sm text-muted-foreground">
                  אחריות לכל הקבצים שנשחזרו
                </p>
              </div>
              
              <div>
                <Check className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-hebrew font-semibold mb-2">שקיפות מלאה</h4>
                <p className="font-hebrew text-sm text-muted-foreground">
                  מחירים קבועים ללא הפתעות
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                onClick={() => window.location.href = '/contact'}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-hebrew touch-target"
                aria-label="התחל עכשיו עם בדיקה חינמית"
              >
                התחל עכשיו - בדיקה חינמית
              </Button>
              <Button 
                onClick={() => window.location.href = '/secure-payment'}
                size="lg"
                variant="outline"
                className="font-hebrew touch-target"
                aria-label="בצע תשלום מיידי"
              >
                תשלום מיידי →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>
      </div>
    <Footer />
    <WhatsAppFloat />
    </>
  );
};
