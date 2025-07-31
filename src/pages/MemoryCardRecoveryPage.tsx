import React from 'react';
import { ServiceSEO } from '../components/SEO/SEOHead';
import { ServiceStructuredData, BreadcrumbStructuredData } from '../components/SEO/StructuredData';

/**
 * דף שירות שחזור כרטיס זיכרון מותאם SEO
 * מילת מפתח ראשית: "שחזור כרטיס זיכרון"
 * מילות מפתח משניות: שחזור תמונות מכרטיס זיכרון, שחזור SD, כרטיס זיכרון פגום
 * יעד: 1000+ מילים תוכן איכותי
 */
export const MemoryCardRecoveryPage: React.FC = () => {
  const breadcrumbs = [
    { name: "דף הבית", url: "https://doctorfix.co.il/" },
    { name: "שירותים", url: "https://doctorfix.co.il/שירותים/" },
    { name: "שחזור כרטיס זיכרון" }
  ];

  return (
    <>
      {/* SEO Components */}
      <ServiceSEO
        serviceName="שחזור כרטיס זיכרון מקצועי"
        description="שירות שחזור כרטיס זיכרון מקצועי. מתמחים בשחזור תמונות וקבצים מכרטיסי SD, MicroSD ו-CF פגומים. שירות מהיר ואמין!"
        keywords={[
          "שחזור כרטיס זיכרון",
          "שחזור תמונות מכרטיס זיכרון",
          "שחזור SD",
          "שחזור MicroSD",
          "כרטיס זיכרון פגום",
          "שחזור תמונות מצלמה",
          "שחזור CF card"
        ]}
        image="/images/services/memory-card-recovery.jpg"
        priceRange="₪200-₪450"
      />
      
      <ServiceStructuredData serviceType="memory-card" />
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumbs" aria-label="נתיב ניווט">
        <div className="container">
          <ol className="breadcrumb-list">
            <li><a href="/">דף הבית</a></li>
            <li><a href="/שירותים/">שירותים</a></li>
            <li aria-current="page">שחזור כרטיס זיכרון</li>
          </ol>
        </div>
      </nav>

      <main role="main" className="service-page memory-card-recovery">
        {/* Hero Section */}
        <section className="service-hero" aria-labelledby="service-title">
          <div className="container">
            <header>
              <h1 id="service-title" className="service-title">
                שחזור כרטיס זיכרון מקצועי - שחזור תמונות ווידאו
              </h1>
              <p className="service-subtitle" role="doc-subtitle">
                מתמחים בשחזור תמונות וקבצים מכרטיסי זיכרון פגומים מכל הסוגים. 
                שחזור SD, MicroSD, CF, XD ועוד עם שיעור הצלחה גבוה.
              </p>
            </header>
            
            <div className="service-highlights" role="list">
              <div className="highlight" role="listitem">
                <span className="highlight-number">97%</span>
                <span className="highlight-text">שיעור הצלחה</span>
              </div>
              <div className="highlight" role="listitem">
                <span className="highlight-number">12-24</span>
                <span className="highlight-text">שעות לביצוע</span>
              </div>
              <div className="highlight" role="listitem">
                <span className="highlight-number">כל</span>
                <span className="highlight-text">סוגי הכרטיסים</span>
              </div>
            </div>
          </div>
        </section>

        {/* Card Types Section */}
        <section className="card-types" aria-labelledby="card-types-heading">
          <div className="container">
            <header>
              <h2 id="card-types-heading" className="section-title">
                סוגי כרטיסי זיכרון שאנו מטפלים בהם
              </h2>
              <p className="section-subtitle">
                ניסיון עשיר בשחזור נתונים מכל סוגי כרטיסי הזיכרון הקיימים
              </p>
            </header>
            
            <div className="card-types-grid" role="list">
              <article className="card-type" role="listitem">
                <div className="card-icon" aria-hidden="true">💾</div>
                <header>
                  <h3 className="card-title">SD Card ו-SDHC/SDXC</h3>
                </header>
                <p className="card-description">
                  כרטיסי SD סטנדרטיים בכל הגדלים והמהירויות. מתמחים בשחזור תמונות 
                  ווידאו מכרטיסי SD פגומים או שנפרמטו בטעות.
                </p>
                <ul className="card-features" aria-label="תכונות">
                  <li>SD, SDHC, SDXC בכל הקיבולות</li>
                  <li>כרטיסים מהירים UHS-I/II</li>
                  <li>שחזור אחרי פורמט או מחיקה</li>
                  <li>תיקון כרטיסים פגומים פיזית</li>
                </ul>
                <div className="card-price">₪200-₪350</div>
              </article>

              <article className="card-type" role="listitem">
                <div className="card-icon" aria-hidden="true">📱</div>
                <header>
                  <h3 className="card-title">MicroSD ו-MicroSDHC/XC</h3>
                </header>
                <p className="card-description">
                  כרטיסי MicroSD קטנים מטלפונים, טאבלטים ומצלמות פעולה. 
                  שחזור תמונות, אפליקציות ונתונים אישיים.
                </p>
                <ul className="card-features" aria-label="תכונות">
                  <li>MicroSD מטלפונים וטאבלטים</li>
                  <li>כרטיסים ממצלמות פעולה</li>
                  <li>שחזור אפליקציות ונתונים</li>
                  <li>תיקון כרטיסים שבורים</li>
                </ul>
                <div className="card-price">₪200-₪400</div>
              </article>

              <article className="card-type" role="listitem">
                <div className="card-icon" aria-hidden="true">📷</div>
                <header>
                  <h3 className="card-title">CompactFlash (CF)</h3>
                </header>
                <p className="card-description">
                  כרטיסי CF ממצלמות מקצועיות. שחזור תמונות RAW איכותיות 
                  וקבצי וידאו כבדים ממצלמות DSLR.
                </p>
                <ul className="card-features" aria-label="תכונות">
                  <li>CF ממצלמות מקצועיות</li>
                  <li>שחזור קבצי RAW גדולים</li>
                  <li>תמונות איכות גבוהה</li>
                  <li>כרטיסים מהירים CFast</li>
                </ul>
                <div className="card-price">₪250-₪450</div>
              </article>

              <article className="card-type" role="listitem">
                <div className="card-icon" aria-hidden="true">🎥</div>
                <header>
                  <h3 className="card-title">XD, Memory Stick ועוד</h3>
                </header>
                <p className="card-description">
                  כרטיסים ישנים יותר כמו XD, Memory Stick, MMC ועוד. 
                  שחזור נתונים מכרטיסים נדירים וישנים.
                </p>
                <ul className="card-features" aria-label="תכונות">
                  <li>XD Picture Card</li>
                  <li>Memory Stick Pro/Duo</li>
                  <li>MMC ו-eMMC</li>
                  <li>כרטיסים נדירים וישנים</li>
                </ul>
                <div className="card-price">₪250-₪400</div>
              </article>
            </div>
          </div>
        </section>   
     {/* Common Problems Section */}
        <section className="common-problems" aria-labelledby="problems-heading">
          <div className="container">
            <header>
              <h2 id="problems-heading" className="section-title">
                בעיות נפוצות בכרטיסי זיכרון ופתרונות מקצועיים
              </h2>
              <p className="section-subtitle">
                הבעיות השכיחות ביותר שאנו פותרים בכרטיסי זיכרון
              </p>
            </header>
            
            <div className="problems-grid" role="list">
              <article className="problem-card" role="listitem">
                <div className="problem-icon" aria-hidden="true">❌</div>
                <header>
                  <h3 className="problem-title">כרטיס זיכרון לא נקרא</h3>
                </header>
                <div className="problem-content">
                  <p className="problem-description">
                    הכרטיס לא מזוהה על ידי המצלמה, המחשב או הטלפון. 
                    הודעות שגיאה כמו "כרטיס לא זוהה" או "שגיאה בכרטיס".
                  </p>
                  <h4>סיבות אפשריות:</h4>
                  <ul className="problem-causes">
                    <li>נזק לקונטקטים החשמליים</li>
                    <li>בעיה בקושחה הפנימית</li>
                    <li>שחיתות במערכת הקבצים</li>
                    <li>נזק פיזי למעגלים</li>
                  </ul>
                  <div className="problem-solution">
                    <strong>הפתרון שלנו:</strong> אבחון מעמיק, תיקון קונטקטים, 
                    שחזור קושחה ושחזור נתונים ברמה נמוכה.
                  </div>
                </div>
              </article>

              <article className="problem-card" role="listitem">
                <div className="problem-icon" aria-hidden="true">🗂️</div>
                <header>
                  <h3 className="problem-title">תמונות נמחקו בטעות</h3>
                </header>
                <div className="problem-content">
                  <p className="problem-description">
                    מחיקה בטעות של תמונות חשובות, פורמט שגוי של הכרטיס 
                    או איפוס לא מכוון של המצלמה.
                  </p>
                  <h4>מקרים נפוצים:</h4>
                  <ul className="problem-causes">
                    <li>מחיקת תמונות בטעות במצלמה</li>
                    <li>פורמט שגוי של כרטיס הזיכרון</li>
                    <li>איפוס הגדרות המצלמה</li>
                    <li>העברה שגויה למחשב</li>
                  </ul>
                  <div className="problem-solution">
                    <strong>הפתרון שלנו:</strong> שחזור מהיר של קבצים נמחקים 
                    עם שיעור הצלחה של 97% אם לא נכתבו נתונים חדשים.
                  </div>
                </div>
              </article>

              <article className="problem-card" role="listitem">
                <div className="problem-icon" aria-hidden="true">💔</div>
                <header>
                  <h3 className="problem-title">כרטיס זיכרון שבור פיזית</h3>
                </header>
                <div className="problem-content">
                  <p className="problem-description">
                    נזק פיזי לכרטיס הזיכרון מנפילה, לחיצה, חום יתר 
                    או נזק מים. הכרטיס נראה שבור או פגום.
                  </p>
                  <h4>סוגי נזק פיזי:</h4>
                  <ul className="problem-causes">
                    <li>שבירה של המארז הפלסטיק</li>
                    <li>נזק לקונטקטים המתכתיים</li>
                    <li>נזק מחום או לחות</li>
                    <li>כיפוף או עיוות הכרטיס</li>
                  </ul>
                  <div className="problem-solution">
                    <strong>הפתרון שלנו:</strong> מיקרו-כירורגיה לתיקון הכרטיס, 
                    העברת הצ'יפ למארז חדש ושחזור הנתונים.
                  </div>
                </div>
              </article>

              <article className="problem-card" role="listitem">
                <div className="problem-icon" aria-hidden="true">🔒</div>
                <header>
                  <h3 className="problem-title">כרטיס מוגן כתיבה או נעול</h3>
                </header>
                <div className="problem-content">
                  <p className="problem-description">
                    הכרטיס מוגן מכתיבה ולא ניתן למחוק או להוסיף קבצים. 
                    הודעות שגיאה על הגנת כתיבה או כרטיס נעול.
                  </p>
                  <h4>סיבות להגנת כתיבה:</h4>
                  <ul className="problem-causes">
                    <li>מתג הגנת כתיבה תקוע</li>
                    <li>בעיה בקושחה הפנימית</li>
                    <li>שחיתות במערכת הקבצים</li>
                    <li>הגנה אוטומטית מנזק</li>
                  </ul>
                  <div className="problem-solution">
                    <strong>הפתרון שלנו:</strong> ביטול הגנת כתיבה, תיקון קושחה 
                    ושחזור גישה מלאה לכרטיס.
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Recovery Process Section */}
        <section className="recovery-process" aria-labelledby="process-heading">
          <div className="container">
            <header>
              <h2 id="process-heading" className="section-title">
                תהליך שחזור כרטיס זיכרון המקצועי שלנו
              </h2>
              <p className="section-subtitle">
                3 שלבים פשוטים לשחזור מהיר ויעיל של התמונות והקבצים שלכם
              </p>
            </header>
            
            <ol className="process-steps" role="list">
              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">1</div>
                <div className="step-content">
                  <header>
                    <h3 className="step-title">
                      אבחון מהיר וזיהוי סוג הבעיה
                    </h3>
                  </header>
                  <p className="step-description">
                    בדיקה מקיפה של כרטיס הזיכרון לזיהוי סוג הבעיה והערכת 
                    אפשרויות השחזור. אבחון חינמי תוך 30 דקות.
                  </p>
                  <ul className="step-details" aria-label="פרטי השלב">
                    <li>בדיקת תקינות פיזית של הכרטיס</li>
                    <li>סריקת מערכת הקבצים</li>
                    <li>זיהוי סוג הנזק ומידת החומרה</li>
                    <li>הערכת אחוזי הצלחה לשחזור</li>
                  </ul>
                  <div className="step-duration">
                    <strong>משך זמן:</strong> 30 דקות | <strong>עלות:</strong> חינמי
                  </div>
                </div>
              </li>

              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">2</div>
                <div className="step-content">
                  <header>
                    <h3 className="step-title">
                      שחזור הנתונים באמצעות כלים מתקדמים
                    </h3>
                  </header>
                  <p className="step-description">
                    ביצוע תהליך השחזור עם תוכנות מקצועיות וציוד מתקדם. 
                    שחזור מדורג לפי סוג הקובץ ועדיפות.
                  </p>
                  <ul className="step-details" aria-label="פרטי השלב">
                    <li>יצירת עותק bit-by-bit של הכרטיס</li>
                    <li>שחזור תמונות ווידאו בעדיפות עליונה</li>
                    <li>שחזור מסמכים וקבצים אחרים</li>
                    <li>תיקון קבצים פגומים חלקית</li>
                  </ul>
                  <div className="step-duration">
                    <strong>משך זמן:</strong> 12-24 שעות | <strong>עלות:</strong> לפי הצעת מחיר
                  </div>
                </div>
              </li>

              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">3</div>
                <div className="step-content">
                  <header>
                    <h3 className="step-title">
                      בדיקת איכות ומסירה על מדיה חדשה
                    </h3>
                  </header>
                  <p className="step-description">
                    בדיקה יסודית של איכות התמונות והקבצים המשוחזרים 
                    ומסירתם על כרטיס זיכרון חדש או USB.
                  </p>
                  <ul className="step-details" aria-label="פרטי השלב">
                    <li>בדיקת תקינות כל התמונות</li>
                    <li>ארגון הקבצים לפי תאריכים</li>
                    <li>מסירה על מדיה חדשה ואמינה</li>
                    <li>הדרכה על שמירה נכונה</li>
                  </ul>
                  <div className="step-duration">
                    <strong>משך זמן:</strong> 1-2 שעות | <strong>עלות:</strong> כלול במחיר
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Tips Section */}
        <section className="tips-section" aria-labelledby="tips-heading">
          <div className="container">
            <header>
              <h2 id="tips-heading" className="section-title">
                טיפים חשובים למניעת אובדן נתונים מכרטיס זיכרון
              </h2>
              <p className="section-subtitle">
                עצות מקצועיות לשמירה על כרטיסי הזיכרון והנתונים שלכם
              </p>
            </header>
            
            <div className="tips-grid" role="list">
              <article className="tip-card do" role="listitem">
                <div className="tip-icon" aria-hidden="true">✅</div>
                <header>
                  <h3 className="tip-title">מה כדאי לעשות</h3>
                </header>
                <ul className="tip-list">
                  <li>גבו תמונות חשובות באופן קבוע</li>
                  <li>הוציאו את הכרטיס בבטחה (Safely Remove)</li>
                  <li>השתמשו בכרטיסים איכותיים ממותגים מוכרים</li>
                  <li>שמרו על הכרטיס במקום יבש וקריר</li>
                  <li>בדקו את הכרטיס מדי פעם עם כלי CHKDSK</li>
                  <li>החליפו כרטיסים ישנים לפני שהם נכשלים</li>
                </ul>
              </article>

              <article className="tip-card dont" role="listitem">
                <div className="tip-icon" aria-hidden="true">❌</div>
                <header>
                  <h3 className="tip-title">מה אסור לעשות</h3>
                </header>
                <ul className="tip-list">
                  <li>אל תוציאו את הכרטיס בזמן כתיבה</li>
                  <li>אל תשתמשו באותו כרטיס במכשירים שונים</li>
                  <li>אל תמלאו את הכרטיס עד הסוף</li>
                  <li>אל תחשפו את הכרטיס לחום או לחות</li>
                  <li>אל תנסו לתקן כרטיס שבור בעצמכם</li>
                  <li>אל תמשיכו לצלם אם יש הודעות שגיאה</li>
                </ul>
              </article>

              <article className="tip-card emergency" role="listitem">
                <div className="tip-icon" aria-hidden="true">🚨</div>
                <header>
                  <h3 className="tip-title">במקרה חירום</h3>
                </header>
                <ul className="tip-list">
                  <li>הפסיקו מיד את השימוש בכרטיס</li>
                  <li>אל תנסו לפרמט או לתקן</li>
                  <li>אל תתקינו תוכנות שחזור</li>
                  <li>שמרו את הכרטיס במקום בטוח</li>
                  <li>פנו מיד למומחים לשחזור</li>
                  <li>ככל שתפעלו מהר יותר - הסיכויים גבוהים יותר</li>
                </ul>
              </article>
            </div>
          </div>
        </section>  
      {/* Pricing Section */}
        <section className="pricing-section" aria-labelledby="pricing-heading">
          <div className="container">
            <header>
              <h2 id="pricing-heading" className="section-title">
                מחירי שחזור כרטיס זיכרון - מחירון שקוף
              </h2>
              <p className="section-subtitle">
                מחירים הוגנים לכל סוגי כרטיסי הזיכרון עם אחריות על התוצאה
              </p>
            </header>
            
            <div className="pricing-table" role="table" aria-label="מחירון שחזור כרטיסי זיכרון">
              <div className="pricing-header" role="rowgroup">
                <div className="pricing-row header" role="row">
                  <div className="pricing-cell" role="columnheader">סוג כרטיס</div>
                  <div className="pricing-cell" role="columnheader">סוג בעיה</div>
                  <div className="pricing-cell" role="columnheader">מחיר</div>
                  <div className="pricing-cell" role="columnheader">זמן ביצוע</div>
                  <div className="pricing-cell" role="columnheader">שיעור הצלחה</div>
                </div>
              </div>
              
              <div className="pricing-body" role="rowgroup">
                <div className="pricing-row" role="row">
                  <div className="pricing-cell" role="cell">SD/SDHC/SDXC</div>
                  <div className="pricing-cell" role="cell">מחיקה/פורמט</div>
                  <div className="pricing-cell price" role="cell">₪200-₪300</div>
                  <div className="pricing-cell" role="cell">12-24 שעות</div>
                  <div className="pricing-cell success" role="cell">97%</div>
                </div>
                
                <div className="pricing-row" role="row">
                  <div className="pricing-cell" role="cell">MicroSD</div>
                  <div className="pricing-cell" role="cell">לא נקרא</div>
                  <div className="pricing-cell price" role="cell">₪250-₪350</div>
                  <div className="pricing-cell" role="cell">24-48 שעות</div>
                  <div className="pricing-cell success" role="cell">97%</div>
                </div>
                
                <div className="pricing-row" role="row">
                  <div className="pricing-cell" role="cell">CompactFlash</div>
                  <div className="pricing-cell" role="cell">כשל פיזי</div>
                  <div className="pricing-cell price" role="cell">₪300-₪450</div>
                  <div className="pricing-cell" role="cell">24-48 שעות</div>
                  <div className="pricing-cell success" role="cell">92%</div>
                </div>
                
                <div className="pricing-row" role="row">
                  <div className="pricing-cell" role="cell">XD/Memory Stick</div>
                  <div className="pricing-cell" role="cell">שחיתות</div>
                  <div className="pricing-cell price" role="cell">₪250-₪400</div>
                  <div className="pricing-cell" role="cell">24-48 שעות</div>
                  <div className="pricing-cell success" role="cell">90%</div>
                </div>
                
                <div className="pricing-row featured" role="row">
                  <div className="pricing-cell" role="cell">כל הסוגים</div>
                  <div className="pricing-cell" role="cell">נזק פיזי חמור</div>
                  <div className="pricing-cell price" role="cell">₪400-₪600</div>
                  <div className="pricing-cell" role="cell">48-72 שעות</div>
                  <div className="pricing-cell success" role="cell">85%</div>
                </div>
              </div>
            </div>
            
            <div className="pricing-notes">
              <h3>מה כלול במחיר:</h3>
              <ul className="included-services">
                <li>אבחון מלא ללא עלות</li>
                <li>תהליך השחזור המקצועי</li>
                <li>בדיקת איכות התמונות</li>
                <li>מסירה על מדיה חדשה</li>
                <li>אחריות על התוצאה</li>
              </ul>
              <p className="payment-policy">
                <strong>מדיניות תשלום:</strong> תשלום רק במקרה של שחזור מוצלח! 
                אם לא מצליחים לשחזר - אתם לא משלמים.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" aria-labelledby="faq-heading">
          <div className="container">
            <header>
              <h2 id="faq-heading" className="section-title">
                שאלות נפוצות על שחזור כרטיס זיכרון
              </h2>
              <p className="section-subtitle">
                תשובות לשאלות הנפוצות ביותר על שירות שחזור כרטיסי הזיכרון
              </p>
            </header>
            
            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button">
                  <h3>האם ניתן לשחזר תמונות מכרטיס זיכרון שנפרמט?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    כן! פורמט לא מוחק את התמונות פיזית אלא רק את המידע על מיקומן. 
                    ברוב המקרים ניתן לשחזר 95-100% מהתמונות אם לא נכתבו נתונים חדשים 
                    על הכרטיס לאחר הפורמט.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button">
                  <h3>כמה זמן לוקח שחזור תמונות מכרטיס זיכרון?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    שחזור כרטיס זיכרון הוא תהליך מהיר יחסית: מחיקה פשוטה - 12-24 שעות, 
                    בעיות טכניות - 24-48 שעות, נזק פיזי - 48-72 שעות. 
                    אנו מעדכנים אתכם לאורך כל התהליך.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button">
                  <h3>מה לעשות אם כרטיס הזיכרון שבור פיזית?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    אל תנסו לתקן בעצמכם! שמרו את כל החלקים במקום בטוח ופנו אלינו מיד. 
                    אנו מתמחים במיקרו-כירורגיה של כרטיסי זיכרון ויכולים לשחזר נתונים 
                    גם מכרטיסים שבורים לחלוטין.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button">
                  <h3>איך למנוע אובדן תמונות מכרטיס זיכרון?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    גבו תמונות באופן קבוע, הוציאו את הכרטיס בבטחה, השתמשו בכרטיסים 
                    איכותיים, אל תמלאו אותם עד הסוף ואל תשתמשו באותו כרטיס 
                    במכשירים שונים.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button">
                  <h3>האם אתם מטפלים בכרטיסים מכל היצרנים?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    כן, אנו מטפלים בכרטיסי זיכרון מכל היצרנים: SanDisk, Kingston, 
                    Samsung, Lexar, Transcend ועוד. גם כרטיסים ישנים ונדירים 
                    מיצרנים שכבר לא קיימים.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section" aria-labelledby="cta-heading">
          <div className="container">
            <header>
              <h2 id="cta-heading" className="cta-title">
                איבדתם תמונות חשובות? אנחנו כאן לעזור!
              </h2>
              <p className="cta-subtitle">
                אל תוותרו על התמונות היקרות לכם. פנו אלינו עכשיו לשחזור מקצועי ומהיר
              </p>
            </header>
            
            <div className="cta-buttons" role="group" aria-label="פעולות יצירת קשר">
              <a 
                href="tel:+972501234567" 
                className="cta-btn primary"
                aria-label="התקשרו עכשיו לשחזור כרטיס זיכרון"
              >
                התקשרו עכשיו: 050-123-4567
              </a>
              <a 
                href="https://wa.me/972501234567" 
                className="cta-btn secondary"
                aria-label="שלחו הודעה בוואטסאפ"
              >
                WhatsApp מיידי
              </a>
            </div>
            
            <div className="cta-features">
              <div className="feature">✓ אבחון חינמי תוך 30 דקות</div>
              <div className="feature">✓ שחזור מהיר תוך 12-24 שעות</div>
              <div className="feature">✓ תשלום רק במקרה הצלחה</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};