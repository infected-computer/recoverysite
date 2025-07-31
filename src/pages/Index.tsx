import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import SEO from "../components/SEO";
import { useSEO, useBreadcrumbs } from "../hooks/useSEO";
import { useAnalytics, useScrollTracking, useTimeTracking } from "../hooks/useAnalytics";

// Import new SEO components
import { SEOHead } from "../components/seo/SEOHead";
import { LocalBusinessSchema } from "../components/seo/LocalBusinessSchema";

// Import new redesigned components
import { HomePageHero } from "../components/sections/HeroSlider";
import Services from "../components/sections/Services";
import PricingSummary from "../components/sections/PricingSummary";
import About from "../components/sections/About";
import Testimonials from "../components/sections/Testimonials";
import FAQSummary from "../components/sections/FAQSummary";

const Index = () => {
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
  
  // Analytics tracking
  const analytics = useAnalytics();
  useScrollTracking();
  useTimeTracking();
  
  // SEO data for homepage
  const seoData = {
    title: "שחזור קבצים מקצועי בישראל | דוקטור פיקס - שיעור הצלחה 97%",
    description: "שירות שחזור קבצים מקצועי מרחוק עם מעל 7 שנות ניסיון. שחזור דיסקים קשיחים, כרטיסי זיכרון ונתונים דיגיטליים. הערכת מחיר חינמית!",
    keywords: ["שחזור קבצים", "שחזור נתונים", "שחזור דיסק קשיח"],
    canonical: "https://recoverysite.netlify.app/"
  };
  
  useSEO(seoData);

  // SEO component data (with correct types)
  const seoComponentData = {
    ...seoData,
    keywords: seoData.keywords.join(', ')
  };

  const serviceData = {
    name: "שחזור קבצים מקצועי מרחוק",
    description: "שירותי שחזור קבצים מקצועיים מרחוק עם מעל 7 שנות ניסיון",
    serviceType: "שחזור קבצים מרחוק",
    provider: "דוקטור פיקס",
    areaServed: ["ישראל", "תל אביב", "ירושלים", "חיפה", "באר שבע"],
    offers: {
      priceCurrency: "ILS",
      availability: "InStock",
      validFrom: "2024-01-01",
      validThrough: "2024-12-31"
    }
  };

  // Services data
  const services = [
    {
      id: "hard-drive-recovery",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      ),
      title: "הדיסק הקשיח קרס? אנחנו נציל את המידע שלך.",
      description: "איבדתם גישה לקבצים קריטיים, תמונות משפחתיות או עבודה של שנים? אנחנו מבינים את הלחץ. עם טכנולוגיה מתקדמת וניסיון מוכח, אנו מתמחים בהצלת מידע גם מדיסקים שנראים אבודים לחלוטין.",
      bullets: [
        "הצילו זיכרונות יקרים: שחזור תמונות משפחתיות, סרטונים וקבצים אישיים.",
        "מנעו נזק עסקי: החזרת מסמכי עבודה, קבצי לקוחות ומידע פיננסי חיוני.",
        "שקט נפשי מובטח: אבחון ראשוני חינם וללא כל התחייבות מצדכם.",
        "אל תרימו ידיים: אנו מצטיינים בשחזור גם ממקרים שנראים בלתי אפשריים."
      ],
      onLinkClick: () => navigate("/services/data-recovery")
    },
    {
      id: "usb-recovery",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "דיסק און קי לא מגיב? הקבצים שלכם בהישג יד.",
      description: "הדיסק און קי לא מזוהה? הקבצים החשובים נעלמו? לפני שאתם מרימים ידיים, תנו למומחים שלנו להחזיר לכם את הגישה למידע היקר שלכם במהירות ובבטחה.",
      bullets: [
        "שחזור קבצי עבודה חשובים.",
        "הצלת מצגות ופרויקטים.",
        "אבחון מהיר ופתרון יעיל.",
        "תמיכה בכל סוגי הדיסק און קי."
      ],
      onLinkClick: () => navigate("/services/data-recovery")
    },
    {
      id: "memory-card-recovery",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 16" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12h.01M4 4h16v16H4z" />
        </svg>
      ),
      title: "התמונות מכרטיס הזיכרון נמחקו? יש לנו פתרון.",
      description: "תקלה בכרטיס הזיכרון של המצלמה או הסמארטפון היא לא סוף העולם. אנו מתמחים בשחזור תמונות, סרטונים וקבצים מכרטיסי זיכרון פגומים, גם אם עברו פירמוט.",
      bullets: [
        "הצלת תמונות מטיולים ואירועים.",
        "שחזור סרטונים משפחתיים.",
        "תמיכה בכל סוגי הכרטיסים (SD, microSD).",
        "אבחון חינם וללא התחייבות."
      ],
      onLinkClick: () => navigate("/services/data-recovery")
    }
  ];

  // Client logos removed - no longer displaying client information

  // Testimonials data - without client identifying information
  const testimonials = [
    {
      id: "testimonial-1",
      quote: "השירות היה מעולה! הצליחו לשחזר לי קבצים חשובים שחשבתי שאבדו לנצח. מקצועיות ברמה הגבוהה ביותר ושירות אדיב ומהיר.",
      author: "לקוח מרוצה",
      position: "מנהל IT",
      company: "חברה פרטית",
      rating: 5
    },
    {
      id: "testimonial-2", 
      quote: "לאחר שהדיסק הקשיח שלי התקלקל לחלוטין, חשבתי שאיבדתי את כל התמונות המשפחתיות. הצוות כאן הצליח לשחזר הכל תוך 24 שעות!",
      author: "לקוחה מרוצה",
      position: "מעצבת גרפית",
      company: "עסק משפחתי",
      rating: 5
    },
    {
      id: "testimonial-3",
      quote: "השירות המרחוק החסיך לי המון זמן וכסף. תוך שעות ספורות הם הצליחו לשחזר את כל הקבצים החשובים שלי מהמחשב הנייד.",
      author: "לקוח מרוצה", 
      position: "יועץ עסקי",
      company: "משרד ייעוץ",
      rating: 5
    },
    {
      id: "testimonial-4",
      quote: "כשכרטיס הזיכרון של החתונה התקלקל, פניתי אליהם במצב של פאניקה. הם הרגיעו אותי ותוך יומיים כל התמונות חזרו אליי.",
      author: "לקוח מרוצה",
      position: "צלם אירועים", 
      company: "צלם עצמאי",
      rating: 5
    }
  ];

  // Stats data for About section
  const aboutStats = [
    { number: "97%", label: "שיעור הצלחה" },
    { number: "24/6", label: "זמינות" },
    { number: "7+", label: "שנות ניסיון" },
    { number: "15+", label: "כלים מותאמים" }
  ];

  const handleHeroCTA = () => {
    // Scroll to services section
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutCTA = () => {
    // Navigate to about page
    navigate("/about");
  };

  return (
    <>
      <SEOHead
        title="שחזור קבצים מקצועי מרחוק | שירות אמין ללא הגעה פיזית"
        description="שירותי שחזור קבצים מקצועיים מרחוק. מעל 7 שנות ניסיון, בדיקה חינמית, תשלום רק לאחר הצלחה."
        keywords={["שחזור קבצים", "שחזור נתונים", "שחזור דיסק קשיח", "שחזור מרחוק", "תמיכה טכנית"]}
        canonicalUrl="https://recoverysite.netlify.app/"
        ogType="website"
        structuredData={[]}
      />
      <LocalBusinessSchema />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded">
          דלג לתוכן הראשי
        </a>
        
        <Header />
        
        <main id="main-content" role="main">
          {/* Hero Section */}
          <HomePageHero />

          {/* Services Section */}
          <div id="services-section">
            <Services
              title="השירותים שלנו"
              services={services}
            />
          </div>

          {/* Pricing Summary Section */}
          <PricingSummary />

          {/* About Section */}
          <About
            title="קצת עלינו"
            content="אנחנו מומחי טכנולוגיה עם ניסיון רב בתחום שחזור קבצים ותמיכה טכנית. פיתחנו כלים ותוכנות מיוחדים שמאפשרים לנו להתמודד עם המקרים המורכבים ביותר. המטרה שלנו היא לספק פתרונות מהירים, יעילים ואמינים לכל לקוח."
            ctaText="קרא עוד"
            ctaAction={handleAboutCTA}
            stats={aboutStats}
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          />

          {/* Testimonials Section */}
          <Testimonials
            testimonials={testimonials}
            autoPlay={true}
            autoPlayInterval={7000}
            showDots={true}
            showArrows={false}
          />

          {/* FAQ Summary Section */}
          <FAQSummary />
        </main>
        
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
};

export default Index;