import React from 'react';
import { SEOHead } from '../components/SEO/SEOHead';
import { StructuredData } from '../components/SEO/StructuredData';
import { AccessibilityEnhancer } from '../components/SEO/AccessibilityEnhancer';
import { KeywordOptimizer, getKeywordsForPage } from '../components/SEO/KeywordOptimizer';
import { HomePageHero } from '../components/sections/HeroSlider';

/**
 * דף הבית מותאם SEO עם נגישות משופרת ומילות מפתח מותאמות
 * מילת מפתח ראשית: "שחזור קבצים"
 * מילות מפתח משניות: שחזור נתונים, שחזור דיסק קשיח, שחזור כרטיס זיכרון
 */
export const HomePage: React.FC = () => {
  const keywords = getKeywordsForPage('/');

  return (
    <>
      {/* SEO Head עם template אוטומטי לדף הבית */}
      <SEOHead />
      
      {/* Structured Data לדף הבית */}
      <StructuredData pageType="homepage" />
      
      {/* שיפורי נגישות אוטומטיים */}
      <AccessibilityEnhancer 
        enableSkipLinks={true}
        enableLandmarks={true}
        enableHeadingStructure={true}
        enableFocusManagement={true}
        enableAutoAria={true}
        enableKeyboardNav={true}
      />
      
      {/* אופטימיזציית מילות מפתח וזנבות ארוכים */}
      <KeywordOptimizer 
        keywords={keywords}
        targetDensity={2}
        enableHiddenKeywords={true}
        enableSemanticKeywords={true}
        enableLocalKeywords={true}
        enableFAQKeywords={true}
      />
      
      <main id="main-content" role="main" className="homepage">
        {/* Hero Slider מתקדם עם נגישות ו-SEO */}
        <HomePageHero /> 
       {/* Services Section - מילות מפתח ראשיות */}
        <section 
          className="services-section" 
          aria-labelledby="services-heading"
          role="region"
        >
          <div className="container">
            <header>
              <h2 id="services-heading" className="section-title">
                השירותים שלנו לשחזור קבצים ונתונים
              </h2>
              <p className="section-subtitle">
                מתמחים בכל סוגי שחזור הנתונים עם שיעור הצלחה גבוה ושירות מקצועי
              </p>
            </header>
            
            <div className="services-grid" role="list">
              {/* שחזור דיסק קשיח */}
              <article className="service-card" role="listitem">
                <header>
                  <h3 className="service-title">
                    <a href="/שירותים/שחזור-דיסק-קשיח" aria-describedby="hdd-desc">
                      שחזור דיסק קשיח
                    </a>
                  </h3>
                </header>
                <p id="hdd-desc" className="service-description">
                  שחזור מידע מקצועי מדיסקים קשיחים (HDD, SSD) שניזוקו פיזית או לוגית.
                </p>
              </article>

              {/* שחזור דיסק און קי */}
              <article className="service-card" role="listitem">
                <header>
                  <h3 className="service-title">
                    <a href="/שירותים/שחזור-דיסק-און-קי" aria-describedby="usb-desc">
                      שחזור דיסק און קי
                    </a>
                  </h3>
                </header>
                <p id="usb-desc" className="service-description">
                  שחזור קבצים ותיקיות מהתקני דיסק און קי (USB) מכל הסוגים והגדלים.
                </p>
              </article>

              {/* שחזור כרטיס זיכרון */}
              <article className="service-card" role="listitem">
                <header>
                  <h3 className="service-title">
                    <a href="/שירותים/שחזור-כרטיס-זיכרון" aria-describedby="sd-desc">
                      שחזור כרטיס זיכרון
                    </a>
                  </h3>
                </header>
                <p id="sd-desc" className="service-description">
                  שחזור תמונות, סרטונים וקבצים מכרטיסי זיכרון (SD, MicroSD) של מצלמות וסמארטפונים.
                </p>
              </article>
            </div>
          </div>
        </section>        
{/* Why Choose Us Section - מילות מפתח long-tail */}
        <section 
          className="why-choose-section" 
          aria-labelledby="why-choose-heading"
          role="region"
        >
          <div className="container">
            <header>
              <h2 id="why-choose-heading" className="section-title">
                למה לבחור בדוקטור פיקס לשחזור קבצים?
              </h2>
              <p className="section-subtitle">
                המומחים המובילים בישראל לשחזור נתונים עם שירות מקצועי ואמין
              </p>
            </header>
            
            <div className="benefits-grid" role="list">
              <article className="benefit-card" role="listitem">
                <header>
                  <h3 className="benefit-title">
                    מעל 7 שנות ניסיון בשחזור נתונים
                  </h3>
                </header>
                <p className="benefit-description">
                  ניסיון עשיר בשחזור קבצים מכל סוגי המכשירים והמדיות. 
                  מטפלים במקרים מורכבים ומאתגרים עם מומחיות גבוהה.
                </p>
              </article>

              <article className="benefit-card" role="listitem">
                <header>
                  <h3 className="benefit-title">
                    שיעור הצלחה של 95% בשחזור קבצים
                  </h3>
                </header>
                <p className="benefit-description">
                  רוב המקרים מסתיימים בשחזור מוצלח של הקבצים החשובים. 
                  אנו מתמחים גם במקרים קשים שאחרים נכשלו בהם.
                </p>
              </article>

              <article className="benefit-card" role="listitem">
                <header>
                  <h3 className="benefit-title">
                    שירות שחזור קבצים מרחוק נוח ומהיר
                  </h3>
                </header>
                <p className="benefit-description">
                  שחזור נתונים מרחוק ללא צורך בהגעה פיזית. 
                  חיבור מאובטח ותהליך מהיר שחוסך זמן יקר.
                </p>
              </article>

              <article className="benefit-card" role="listitem">
                <header>
                  <h3 className="benefit-title">
                    הערכת מחיר חינמית לשחזור נתונים
                  </h3>
                </header>
                <p className="benefit-description">
                  קבלו הערכת מחיר מדויקת ללא התחייבות. 
                  מחירים שקופים והוגנים לכל סוגי שירותי השחזור.
                </p>
              </article>

              <article className="benefit-card" role="listitem">
                <header>
                  <h3 className="benefit-title">
                    תמיכה טכנית מקצועית 24/6
                  </h3>
                </header>
                <p className="benefit-description">
                  צוות מומחים זמין לייעוץ ותמיכה בכל שעות היממה. 
                  מענה מהיר לשאלות ובעיות דחופות.
                </p>
              </article>

              <article className="benefit-card" role="listitem">
                <header>
                  <h3 className="benefit-title">
                    אבטחת מידע ושמירה על פרטיות
                  </h3>
                </header>
                <p className="benefit-description">
                  התחייבות מלאה לשמירה על פרטיות הנתונים שלכם. 
                  פרוטוקולי אבטחה מתקדמים ומחיקה מאובטחת.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Process Section - מילות מפתח תהליכיות */}
        <section 
          className="process-section" 
          aria-labelledby="process-heading"
          role="region"
        >
          <div className="container">
            <header>
              <h2 id="process-heading" className="section-title">
                תהליך שחזור הקבצים המקצועי שלנו
              </h2>
              <p className="section-subtitle">
                4 שלבים פשוטים לשחזור מוצלח של הנתונים החשובים לכם
              </p>
            </header>
            
            <ol className="process-steps" role="list">
              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">1</div>
                <header>
                  <h3 className="step-title">
                    אבחון ראשוני של הדיסק או המדיה
                  </h3>
                </header>
                <p className="step-description">
                  בדיקה מקדימה מקיפה של המכשיר והערכת סוג הנזק לקבצים. 
                  זיהוי הבעיה ואפשרויות השחזור הזמינות.
                </p>
              </li>

              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">2</div>
                <header>
                  <h3 className="step-title">
                    הערכת נזק ומתן הצעת מחיר שקופה
                  </h3>
                </header>
                <p className="step-description">
                  הערכה מדויקת של אפשרויות השחזור ומתן הצעת מחיר הוגנה. 
                  הסבר מפורט על התהליך וזמני הביצוע הצפויים.
                </p>
              </li>

              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">3</div>
                <header>
                  <h3 className="step-title">
                    ביצוע תהליך השחזור באמצעות כלים מתקדמים
                  </h3>
                </header>
                <p className="step-description">
                  שימוש בטכנולוגיות מתקדמות ותוכנות מקצועיות לשחזור הנתונים. 
                  עבודה בסביבה מבוקרת עם ציוד מתקדם.
                </p>
              </li>

              <li className="process-step" role="listitem">
                <div className="step-number" aria-hidden="true">4</div>
                <header>
                  <h3 className="step-title">
                    מסירת הקבצים המשוחזרים ובדיקת תקינות
                  </h3>
                </header>
                <p className="step-description">
                  מסירת הקבצים המשוחזרים באופן מאובטח ובדיקת תקינותם. 
                  הדרכה על שמירה נכונה למניעת אובדן עתידי.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Pricing Section - כמה עולה שחזור */}
        <section 
          className="pricing-section" 
          aria-labelledby="pricing-heading"
          role="region"
        >
          <div className="container">
            <header>
              <h2 id="pricing-heading" className="section-title">
                כמה עולה שחזור קבצים?
              </h2>
              <p className="section-subtitle">
                מחירים התחלתיים עבור שחזור נתונים מקצועי בישראל
              </p>
            </header>
            
            <div className="pricing-overview">
              <div className="price-range">
                <h3>טווח מחירים</h3>
                <p className="price-main">₪300 - ₪1200</p>
                <p className="price-desc">בהתאם לסוג הנזק ומורכבות השחזור</p>
              </div>
              
              <div className="pricing-highlights">
                <ul role="list">
                  <li role="listitem">✓ הערכת מחיר חינמית ללא התחייבות</li>
                  <li role="listitem">✓ מחיר קבוע - ללא הפתעות</li>
                  <li role="listitem">✓ אין שחזור - אין תשלום</li>
                  <li role="listitem">✓ כולל אבחון, שחזור ומסירה</li>
                </ul>
              </div>
            </div>

            <div className="pricing-cta">
              <p><strong>רוצים לדעת בדיוק כמה זה יעלה?</strong></p>
              <p>קבלו הערכת מחיר מדויקת תוך 30 דקות</p>
              <div className="cta-buttons">
                <a href="tel:+972501234567" className="btn-primary">
                  התקשרו לקבלת הצעת מחיר
                </a>
                <a 
                  href="/article/12" 
                  className="btn-secondary"
                  aria-label="לחצו לקריאת מחירון מפורט בבלוג"
                >
                  מחירון מפורט בבלוג →
                </a>
              </div>
            </div>
          </div>
        </section>
       
 {/* FAQ Section - מילות מפתח long-tail */}
        <section 
          className="faq-section" 
          aria-labelledby="faq-heading"
          role="region"
        >
          <div className="container">
            <header>
              <h2 id="faq-heading" className="section-title">
                שאלות נפוצות על שחזור קבצים ונתונים
              </h2>
              <p className="section-subtitle">
                תשובות למה שאתם הכי שואלים על שירותי שחזור הנתונים שלנו
              </p>
            </header>
            
            <div className="faq-list" role="list">
              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button" aria-expanded="false">
                  <h3>כמה עולה שחזור קבצים ומה כלול במחיר?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    מחיר שחזור קבצים נע בין ₪300 ל-₪1200 בהתאם לסוג הנזק ומורכבות השחזור. 
                    המחיר כולל אבחון מלא, תהליך השחזור, בדיקת תקינות ומסירה מאובטחת. 
                    אנו מציעים הערכת מחיר חינמית לכל לקוח.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button" aria-expanded="false">
                  <h3>כמה זמן לוקח תהליך שחזור קבצים?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    תהליך שחזור קבצים לוקח בדרך כלל 24-72 שעות, בהתאם למורכבות המקרה 
                    וכמות הנתונים. שחזור כרטיסי זיכרון מהיר יותר (12-24 שעות), 
                    ושחזור מרחוק יכול להתבצע תוך 6-12 שעות.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button" aria-expanded="false">
                  <h3>האם אפשר לשחזר קבצים שנמחקו בטעות?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    כן, ברוב המקרים ניתן לשחזר קבצים שנמחקו בטעות, במיוחד אם לא נכתבו 
                    נתונים חדשים על הדיסק. חשוב להפסיק מיד את השימוש במחשב ולפנות אלינו 
                    בהקדם. שיעור ההצלחה בשחזור קבצים שנמחקו הוא כ-90%.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button" aria-expanded="false">
                  <h3>איך עובד שירות השחזור מרחוק?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    שירות השחזור מרחוק מתבצע באמצעות חיבור מאובטח למחשב שלכם. 
                    אנו משתמשים בתוכנות מקצועיות לגישה מרחוק ומבצעים את תהליך השחזור 
                    ללא צורך בהגעה פיזית. התהליך מאובטח לחלוטין ומוגן בהצפנה.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button" aria-expanded="false">
                  <h3>מה לעשות כשהדיסק הקשיח לא עובד?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    אם הדיסק הקשיח לא עובד, חשוב לא לנסות לתקן בעצמכם. הפסיקו מיד 
                    את השימוש במחשב ופנו אלינו לאבחון מקצועי. אנו מטפלים בכל סוגי 
                    הכשלים: מכניים, לוגיים ונזק פיזי.
                  </p>
                </div>
              </details>

              <details className="faq-item" role="listitem">
                <summary className="faq-question" role="button" aria-expanded="false">
                  <h3>האם השירות מאובטח ומה עם הפרטיות?</h3>
                </summary>
                <div className="faq-answer">
                  <p>
                    אבטחת המידע והפרטיות הם בעדיפות עליונה אצלנו. אנו משתמשים 
                    בפרוטוקולי אבטחה מתקדמים, חתימה על הסכם סודיות ומחיקה מאובטחת 
                    של הנתונים לאחר השחזור. כל הנתונים מטופלים בסודיות מלאה.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section 
          id="contact"
          className="contact-cta-section" 
          aria-labelledby="contact-heading"
          role="region"
        >
          <div className="container">
            <header>
              <h2 id="contact-heading" className="section-title">
                מוכנים לשחזר את הקבצים החשובים שלכם?
              </h2>
              <p className="section-subtitle">
                צרו קשר עכשיו לקבלת הערכת מחיר חינמית ויעוץ מקצועי מהמומחים שלנו
              </p>
            </header>
            
            <div className="contact-options" role="group" aria-label="אפשרויות יצירת קשר">
              <a 
                href="tel:+972501234567" 
                className="contact-btn phone-btn"
                aria-label="התקשרו עכשיו למספר 050-123-4567 לשחזור קבצים"
              >
                <span className="btn-icon" aria-hidden="true">📞</span>
                התקשרו עכשיו: 050-123-4567
              </a>
              
              <a 
                href="https://wa.me/972501234567" 
                className="contact-btn whatsapp-btn"
                aria-label="שלחו הודעה בוואטסאפ לשחזור קבצים"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-icon" aria-hidden="true">💬</span>
                WhatsApp מיידי
              </a>
              
              <a 
                href="/יצירת-קשר" 
                className="contact-btn form-btn"
                aria-label="מלאו טופס יצירת קשר לשחזור קבצים"
              >
                <span className="btn-icon" aria-hidden="true">📝</span>
                טופס יצירת קשר
              </a>
            </div>
            
            <div className="contact-info" role="contentinfo">
              <p className="availability">
                <strong>זמינות:</strong> ראשון-חמישי 09:00-18:00, שישי 09:00-14:00
              </p>
              <p className="response-time">
                <strong>זמן מענה:</strong> תוך 30 דקות בשעות הפעילות
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};