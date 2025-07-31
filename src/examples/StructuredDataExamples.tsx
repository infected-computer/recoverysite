import React from 'react';
import {
  StructuredData,
  HomePageStructuredData,
  ServiceStructuredData,
  ArticleStructuredData,
  FAQStructuredData,
  HowToStructuredData,
  ReviewStructuredData,
  LocalStructuredData,
  BreadcrumbStructuredData,
  EventStructuredData
} from '../components/SEO/StructuredData';

/**
 * דוגמאות שימוש מעשיות ברכיבי Structured Data
 * מכסה את כל סוגי הדפים באתר שחזור הקבצים
 */

// ===== דוגמה 1: דף הבית עם Structured Data בסיסי =====
export const HomePageExample: React.FC = () => {
  return (
    <div>
      {/* Structured Data אוטומטי לדף הבית */}
      <HomePageStructuredData />
      
      <main>
        <h1>שחזור קבצים מקצועי בישראל</h1>
        <p>שירותי שחזור נתונים מתקדמים...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 2: דף שירות עם Service Schema =====
export const HardDriveServiceExample: React.FC = () => {
  return (
    <div>
      <ServiceStructuredData
        serviceType="hard-drive"
        serviceName="שחזור דיסק קשיח מקצועי"
        description="שירות שחזור מקצועי לדיסקים קשיחים פגומים עם שיעור הצלחה של 95%"
        priceRange="₪400-₪1200"
      />
      
      <main>
        <h1>שחזור דיסק קשיח מקצועי</h1>
        <p>מתמחים בשחזור נתונים מדיסקים קשיחים פגומים...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 3: מאמר עם Article Schema =====
export const ArticleExample: React.FC = () => {
  return (
    <div>
      <ArticleStructuredData
        headline="איך לשחזר קבצים שנמחקו - מדריך מלא לשחזור נתונים"
        description="מדריך מפורט איך לשחזר קבצים שנמחקו בטעות. שיטות שחזור יעילות, תוכנות מומלצות וטיפים מקצועיים."
        author="דוקטור פיקס"
        publishedDate="2024-01-15"
        modifiedDate="2024-01-20"
        image="/images/articles/how-to-recover-deleted-files.jpg"
        wordCount={1500}
        readingTime={8}
      />
      
      <article>
        <h1>איך לשחזר קבצים שנמחקו</h1>
        <p>מדריך מפורט לשחזור קבצים...</p>
      </article>
    </div>
  );
};

// ===== דוגמה 4: דף FAQ עם FAQ Schema =====
export const FAQPageExample: React.FC = () => {
  const faqItems = [
    {
      question: "כמה עולה שחזור קבצים?",
      answer: "מחיר שחזור קבצים נע בין ₪300 ל-₪1200 בהתאם לסוג הנזק ומורכבות השחזור. אנו מציעים הערכת מחיר חינמית."
    },
    {
      question: "כמה זמן לוקח שחזור קבצים?",
      answer: "תהליך שחזור קבצים לוקח בדרך כלל 24-72 שעות, בהתאם למורכבות המקרה וכמות הנתונים."
    },
    {
      question: "האם אפשר לשחזר קבצים שנמחקו?",
      answer: "כן, ברוב המקרים ניתן לשחזר קבצים שנמחקו, במיוחד אם לא נכתבו נתונים חדשים על הדיסק."
    },
    {
      question: "איך עובד שירות השחזור מרחוק?",
      answer: "שירות השחזור מרחוק מתבצע באמצעות חיבור מאובטח למחשב שלכם, כך שאנו יכולים לבצע את תהליך השחזור ללא צורך בהגעה פיזית."
    }
  ];

  return (
    <div>
      <FAQStructuredData faqItems={faqItems} />
      
      <main>
        <h1>שאלות נפוצות על שחזור קבצים</h1>
        <div className="faq-section">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// ===== דוגמה 5: מדריך עם HowTo Schema =====
export const HowToGuideExample: React.FC = () => {
  const steps = [
    {
      name: "בדיקת פח המיחזור",
      text: "בדקו תחילה את פח המיחזור במחשב - לעיתים הקבצים עדיין נמצאים שם",
      image: "/images/guides/step1-recycle-bin.jpg"
    },
    {
      name: "הפסקת שימוש במחשב",
      text: "הפסיקו מיד להשתמש במחשב כדי למנוע כתיבה על הקבצים הנמחקים"
    },
    {
      name: "הורדת תוכנת שחזור",
      text: "הורידו תוכנת שחזור מקצועית כמו Recuva או PhotoRec",
      image: "/images/guides/step3-download-software.jpg"
    },
    {
      name: "הרצת תהליך השחזור",
      text: "הריצו את תוכנת השחזור ובחרו את הכונן שממנו נמחקו הקבצים"
    }
  ];

  return (
    <div>
      <HowToStructuredData
        name="איך לשחזר קבצים שנמחקו"
        description="מדריך שלב אחר שלב לשחזור קבצים שנמחקו בטעות"
        totalTime="PT30M"
        steps={steps}
        supplies={["מחשב", "חיבור אינטרנט"]}
        tools={["תוכנת שחזור קבצים"]}
      />
      
      <main>
        <h1>איך לשחזר קבצים שנמחקו</h1>
        <div className="how-to-steps">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <h3>שלב {index + 1}: {step.name}</h3>
              <p>{step.text}</p>
              {step.image && <img src={step.image} alt={step.name} />}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// ===== דוגמה 6: דף המלצות עם Review Schema =====
export const TestimonialsExample: React.FC = () => {
  const reviews = [
    {
      author: "יוסי כהן",
      rating: 5,
      reviewText: "שירות מעולה! שיחזרו לי את כל התמונות מהחתונה אחרי שהדיסק התקלקל. מקצועיים ומהירים.",
      date: "2024-01-15"
    },
    {
      author: "שרה לוי",
      rating: 5,
      reviewText: "המחשב שלי התקלקל והחשבתי שאיבדתי את כל הקבצים. דוקטור פיקס הציל את המצב!",
      date: "2024-01-10"
    },
    {
      author: "דוד מזרחי",
      rating: 4,
      reviewText: "שירות מקצועי ומהיר. שיחזרו לי את רוב הקבצים מהדיסק הפגום.",
      date: "2024-01-05"
    }
  ];

  const aggregateRating = {
    ratingValue: 4.9,
    reviewCount: 127
  };

  return (
    <div>
      <ReviewStructuredData 
        reviews={reviews}
        aggregateRating={aggregateRating}
      />
      
      <main>
        <h1>המלצות לקוחות</h1>
        <div className="reviews-section">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <h3>{review.author}</h3>
              <div className="rating">{'★'.repeat(review.rating)}</div>
              <p>{review.reviewText}</p>
              <small>{review.date}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// ===== דוגמה 7: דף מקומי עם Local Schema =====
export const LocalServiceExample: React.FC = () => {
  return (
    <div>
      <LocalStructuredData
        cityName="תל אביב"
        serviceName="שחזור נתונים"
        description="שירות שחזור נתונים מקצועי בתל אביב. מתמחים בשחזור קבצים ודיסקים קשיחים באזור המרכז."
        coordinates={{
          latitude: 32.0853,
          longitude: 34.7818
        }}
      />
      
      <main>
        <h1>שחזור נתונים בתל אביב</h1>
        <p>שירות מקצועי באזור המרכז...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 8: דף עם Breadcrumb Schema =====
export const ServicePageWithBreadcrumbs: React.FC = () => {
  const breadcrumbs = [
    { name: "דף הבית", url: "https://doctorfix.co.il/" },
    { name: "שירותים", url: "https://doctorfix.co.il/שירותים/" },
    { name: "שחזור דיסק קשיח" }
  ];

  return (
    <div>
      <ServiceStructuredData serviceType="hard-drive" />
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <nav className="breadcrumbs">
        <a href="/">דף הבית</a> > 
        <a href="/שירותים/">שירותים</a> > 
        <span>שחזור דיסק קשיח</span>
      </nav>
      
      <main>
        <h1>שחזור דיסק קשיח מקצועי</h1>
        <p>תוכן הדף...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 9: דף אירוע עם Event Schema =====
export const EventPageExample: React.FC = () => {
  return (
    <div>
      <EventStructuredData
        name="סדנת שחזור נתונים לעסקים"
        description="סדנה מקצועית לעסקים על שחזור נתונים ומניעת אובדן מידע"
        startDate="2024-03-15T10:00:00+02:00"
        endDate="2024-03-15T16:00:00+02:00"
        location="מרכז עסקים, תל אביב"
        price="150"
      />
      
      <main>
        <h1>סדנת שחזור נתונים לעסקים</h1>
        <p>למדו כיצד להגן על הנתונים העסקיים שלכם...</p>
      </main>
    </div>
  );
};

// ===== דוגמה 10: דף מותאם עם Structured Data מרובה =====
export const ComplexPageExample: React.FC = () => {
  // FAQ items
  const faqItems = [
    {
      question: "מה כלול בשירות שחזור SSD?",
      answer: "השירות כולל אבחון מלא, שחזור נתונים מכונני SSD פגומים, ובדיקת תקינות הקבצים המשוחזרים."
    }
  ];

  // Breadcrumbs
  const breadcrumbs = [
    { name: "דף הבית", url: "https://doctorfix.co.il/" },
    { name: "שירותים", url: "https://doctorfix.co.il/שירותים/" },
    { name: "שחזור SSD" }
  ];

  // Custom schemas
  const customSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "שירות שחזור SSD",
      "description": "שירות מקצועי לשחזור נתונים מכונני SSD פגומים",
      "brand": {
        "@type": "Brand",
        "name": "דוקטור פיקס"
      },
      "offers": {
        "@type": "Offer",
        "price": "500-1500",
        "priceCurrency": "ILS",
        "availability": "https://schema.org/InStock"
      }
    }
  ];

  return (
    <div>
      {/* מספר רכיבי Structured Data */}
      <StructuredData customSchemas={customSchemas} />
      <FAQStructuredData faqItems={faqItems} />
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <nav className="breadcrumbs">
        <a href="/">דף הבית</a> > 
        <a href="/שירותים/">שירותים</a> > 
        <span>שחזור SSD</span>
      </nav>
      
      <main>
        <h1>שחזור SSD מקצועי</h1>
        <p>שירות מתקדם לשחזור נתונים מכונני SSD...</p>
        
        <section className="faq">
          <h2>שאלות נפוצות</h2>
          {faqItems.map((item, index) => (
            <div key={index}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

// ===== דוגמה 11: דף עם Structured Data דינמי =====
export const DynamicStructuredDataExample: React.FC = () => {
  const [serviceData, setServiceData] = React.useState({
    name: "שחזור RAID",
    description: "שירות מתקדם לשחזור מערכות RAID פגומות",
    priceRange: "₪800-₪2000"
  });

  // עדכון דינמי של הנתונים
  React.useEffect(() => {
    // כאן יכול להיות קוד לטעינת נתונים מ-API
    setTimeout(() => {
      setServiceData(prev => ({
        ...prev,
        description: "שירות מתקדם לשחזור מערכות RAID פגומות עם טכנולוגיה חדשנית"
      }));
    }, 2000);
  }, []);

  return (
    <div>
      <ServiceStructuredData
        serviceType="raid"
        serviceName={serviceData.name}
        description={serviceData.description}
        priceRange={serviceData.priceRange}
      />
      
      <main>
        <h1>{serviceData.name}</h1>
        <p>{serviceData.description}</p>
      </main>
    </div>
  );
};

export default {
  HomePageExample,
  HardDriveServiceExample,
  ArticleExample,
  FAQPageExample,
  HowToGuideExample,
  TestimonialsExample,
  LocalServiceExample,
  ServicePageWithBreadcrumbs,
  EventPageExample,
  ComplexPageExample,
  DynamicStructuredDataExample
};