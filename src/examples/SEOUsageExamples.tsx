import React from 'react';
import { SEOHead, SimpleSEO, ArticleSEO, ServiceSEO } from '../components/SEO/SEOHead';

/**
 * דוגמאות שימוש ברכיבי SEO השונים
 * קובץ זה מכיל דוגמאות מעשיות לשימוש במערכת ה-SEO
 */

// ===== דוגמה 1: דף הבית עם template אוטומטי =====
export const HomePage: React.FC = () => {
  return (
    <div>
      {/* SEO אוטומטי לפי route - ישתמש ב-homePageTemplate */}
      <SEOHead />
      
      <main>
        <h1>שחזור קבצים מקצועי בישראל</h1>
        <p>תוכן הדף...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 2: דף שירות עם template מותאם =====
export const HardDriveRecoveryPage: React.FC = () => {
  return (
    <div>
      {/* SEO אוטומטי עם התאמות אישיות */}
      <SEOHead 
        customSEO={{
          title: "שחזור דיסק קשיח מקצועי | מחיר מ-₪400 - דוקטור פיקס",
          description: "שירות שחזור דיסק קשיח מקצועי עם שיעור הצלחה 95%. מחיר התחלתי ₪400. הערכת מחיר חינמית!"
        }}
      />
      
      <main>
        <h1>שחזור דיסק קשיח מקצועי</h1>
        <p>תוכן הדף...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 3: דף שירות עם רכיב ServiceSEO =====
export const MemoryCardRecoveryPage: React.FC = () => {
  return (
    <div>
      <ServiceSEO
        serviceName="שחזור כרטיס זיכרון"
        description="שירות שחזור מקצועי לכרטיסי זיכרון פגומים מכל הסוגים. שחזור תמונות, וידאו וקבצים."
        keywords={[
          "שחזור כרטיס זיכרון",
          "שחזור תמונות מכרטיס זיכרון", 
          "שחזור SD",
          "כרטיס זיכרון פגום"
        ]}
        image="/images/services/memory-card-recovery.jpg"
        priceRange="₪200-₪450"
      />
      
      <main>
        <h1>שחזור כרטיס זיכרון מקצועי</h1>
        <p>תוכן הדף...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 4: מאמר עם ArticleSEO =====
export const HowToRecoverDeletedFilesArticle: React.FC = () => {
  return (
    <div>
      <ArticleSEO
        title="איך לשחזר קבצים שנמחקו - מדריך מלא לשחזור נתונים 2024"
        description="מדריך מפורט איך לשחזר קבצים שנמחקו בטעות. שיטות שחזור יעילות, תוכנות מומלצות וטיפים מקצועיים."
        keywords={[
          "איך לשחזר קבצים שנמחקו",
          "שחזור קבצים שנמחקו",
          "מדריך שחזור קבצים",
          "תוכנות שחזור קבצים"
        ]}
        image="/images/articles/how-to-recover-deleted-files.jpg"
        author="דוקטור פיקס"
        publishedDate="2024-01-15"
        modifiedDate="2024-01-20"
        readingTime={8}
      />
      
      <main>
        <article>
          <h1>איך לשחזר קבצים שנמחקו</h1>
          <p>תוכן המאמר...</p>
        </article>
      </main>
    </div>
  );
};

// ===== דוגמה 5: דף פשוט עם SimpleSEO =====
export const ContactPage: React.FC = () => {
  return (
    <div>
      <SimpleSEO
        title="יצירת קשר | דוקטור פיקס - שחזור קבצים מקצועי"
        description="צרו קשר עם דוקטור פיקס לשחזור קבצים מקצועי. טלפון: 050-123-4567. הערכת מחיר חינמית ושירות 24/6."
        keywords={[
          "יצירת קשר שחזור קבצים",
          "דוקטור פיקס טלפון",
          "שחזור נתונים יצירת קשר"
        ]}
        image="/images/contact/contact-hero.jpg"
      />
      
      <main>
        <h1>יצירת קשר</h1>
        <p>פרטי יצירת קשר...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 6: דף מקומי עם template אוטומטי =====
export const TelAvivServicePage: React.FC = () => {
  return (
    <div>
      {/* ישתמש ב-telAvivTemplate אוטומטית */}
      <SEOHead />
      
      <main>
        <h1>שחזור נתונים בתל אביב</h1>
        <p>תוכן הדף המקומי...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 7: דף עם SEO מותאם לחלוטין =====
export const CustomSEOPage: React.FC = () => {
  const customSEOData = {
    title: "שחזור SSD מקצועי | שחזור נתונים מ-SSD פגום - דוקטור פיקס",
    description: "שירות שחזור SSD מקצועי עם טכנולוגיה מתקדמת. מתמחים בשחזור נתונים מכונני SSD פגומים מכל היצרנים.",
    keywords: [
      "שחזור SSD",
      "שחזור נתונים SSD",
      "SSD פגום",
      "שחזור כונן SSD"
    ],
    canonical: "https://doctorfix.co.il/שירותים/שחזור-ssd",
    robots: "index,follow",
    openGraph: {
      title: "שחזור SSD מקצועי - דוקטור פיקס",
      description: "שירות מקצועי לשחזור נתונים מכונני SSD פגומים עם טכנולוגיה מתקדמת.",
      image: "https://doctorfix.co.il/images/services/ssd-recovery.jpg",
      type: "article"
    },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "שחזור SSD",
        "description": "שירות שחזור מקצועי לכונני SSD פגומים",
        "provider": {
          "@id": "https://doctorfix.co.il/#organization"
        },
        "offers": {
          "@type": "Offer",
          "priceRange": "₪500-₪1500",
          "priceCurrency": "ILS"
        }
      }
    ]
  };

  return (
    <div>
      <SEOHead seoData={customSEOData} useAutoTemplate={false} />
      
      <main>
        <h1>שחזור SSD מקצועי</h1>
        <p>תוכן מותאם...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 8: דף עם FAQ Schema =====
export const FAQPage: React.FC = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "כמה עולה שחזור קבצים?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "מחיר שחזור קבצים נע בין ₪300 ל-₪1200 בהתאם לסוג הנזק ומורכבות השחזור. אנו מציעים הערכת מחיר חינמית."
        }
      },
      {
        "@type": "Question",
        "name": "כמה זמן לוקח שחזור קבצים?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "תהליך שחזור קבצים לוקח בדרך כלל 24-72 שעות, בהתאם למורכבות המקרה וכמות הנתונים."
        }
      }
    ]
  };

  return (
    <div>
      <SEOHead 
        customSEO={{
          title: "שאלות נפוצות על שחזור קבצים | דוקטור פיקס",
          description: "תשובות לשאלות הנפוצות ביותר על שחזור קבצים ונתונים. מחירים, זמני ביצוע ותהליכי עבודה.",
          jsonLd: [faqJsonLd]
        }}
      />
      
      <main>
        <h1>שאלות נפוצות על שחזור קבצים</h1>
        <div className="faq-content">
          {/* תוכן FAQ */}
        </div>
      </main>
    </div>
  );
};

// ===== דוגמה 9: דף עם Breadcrumb Schema =====
export const ServiceCategoryPage: React.FC = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "דף הבית",
        "item": "https://doctorfix.co.il/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "שירותים",
        "item": "https://doctorfix.co.il/שירותים/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "שחזור דיסק קשיח"
      }
    ]
  };

  return (
    <div>
      <SEOHead 
        customSEO={{
          jsonLd: [breadcrumbJsonLd]
        }}
      />
      
      <nav className="breadcrumbs">
        <a href="/">דף הבית</a> > 
        <a href="/שירותים/">שירותים</a> > 
        <span>שחזור דיסק קשיח</span>
      </nav>
      
      <main>
        <h1>שחזור דיסק קשיח</h1>
        <p>תוכן הדף...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 10: דף עם Review Schema =====
export const TestimonialsPage: React.FC = () => {
  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://doctorfix.co.il/#organization",
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "יוסי כהן"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "שירות מעולה! שיחזרו לי את כל התמונות מהחתונה אחרי שהדיסק התקלקל. מקצועיים ומהירים."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  return (
    <div>
      <SEOHead 
        customSEO={{
          title: "המלצות לקוחות | דוקטור פיקס - שחזור קבצים",
          description: "קראו המלצות של לקוחות מרוצים על שירותי שחזור הקבצים של דוקטור פיקס. דירוג 4.9/5 מ-127 ביקורות.",
          jsonLd: [reviewJsonLd]
        }}
      />
      
      <main>
        <h1>המלצות לקוחות</h1>
        <div className="testimonials">
          {/* תוכן המלצות */}
        </div>
      </main>
    </div>
  );
};

export default {
  HomePage,
  HardDriveRecoveryPage,
  MemoryCardRecoveryPage,
  HowToRecoverDeletedFilesArticle,
  ContactPage,
  TelAvivServicePage,
  CustomSEOPage,
  FAQPage,
  ServiceCategoryPage,
  TestimonialsPage
};