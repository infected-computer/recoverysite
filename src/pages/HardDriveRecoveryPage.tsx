import React from 'react';
import { ServiceSEO } from '../components/SEO/SEOHead';
import { ServiceStructuredData, BreadcrumbStructuredData } from '../components/SEO/StructuredData';
import { AccessibilityEnhancer } from '../components/SEO/AccessibilityEnhancer';
import { KeywordOptimizer, getKeywordsForPage } from '../components/SEO/KeywordOptimizer';
import { OptimizedImage } from '../components/Media/OptimizedImage';

/**
 * דף שירות שחזור דיסק קשיח מותאם SEO
 * מילת מפתח ראשית: "שחזור דיסק קשיח"
 * מילות מפתח משניות: תיקון דיסק קשיח, שחזור HDD, דיסק קשיח פגום
 * יעד: 1000+ מילים תוכן איכותי
 */
export const HardDriveRecoveryPage: React.FC = () => {
    const breadcrumbs = [
        { name: "דף הבית", url: "https://doctorfix.co.il/" },
        { name: "שירותים", url: "https://doctorfix.co.il/שירותים/" },
        { name: "שחזור דיסק קשיח" }
    ];

    const keywords = getKeywordsForPage('/שירותים/שחזור-דיסק-קשיח');

    return (
        <>
            {/* SEO Components */}
            <ServiceSEO
                serviceName="שחזור דיסק קשיח מקצועי"
                description="שירות שחזור דיסק קשיח מקצועי עם שיעור הצלחה של 97%. מתמחים בתיקון דיסקים קשיחים פגומים וכשלים מכניים. הערכת מחיר חינמית!"
                keywords={[
                    "שחזור דיסק קשיח",
                    "תיקון דיסק קשיח",
                    "שחזור HDD",
                    "דיסק קשיח פגום",
                    "שחזור נתונים מדיסק פגום",
                    "כשל דיסק קשיח",
                    "תיקון כונן קשיח"
                ]}
                image="/images/services/hard-drive-recovery.jpg"
                priceRange="₪400-₪1200"
            />

            <ServiceStructuredData serviceType="hard-drive" />
            <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

            {/* שיפורי נגישות ו-SEO */}
            <AccessibilityEnhancer
                enableSkipLinks={true}
                enableLandmarks={true}
                enableHeadingStructure={true}
                enableFocusManagement={true}
                enableAutoAria={true}
                enableKeyboardNav={true}
            />

            <KeywordOptimizer
                keywords={keywords}
                targetDensity={2.5}
                enableHiddenKeywords={true}
                enableSemanticKeywords={true}
                enableLocalKeywords={true}
                enableFAQKeywords={false}
            />

            {/* Breadcrumb Navigation */}
            <nav className="breadcrumbs" aria-label="נתיב ניווט">
                <div className="container">
                    <ol className="breadcrumb-list">
                        <li><a href="/">דף הבית</a></li>
                        <li><a href="/שירותים/">שירותים</a></li>
                        <li aria-current="page">שחזור דיסק קשיח</li>
                    </ol>
                </div>
            </nav>

            <main role="main" className="service-page hard-drive-recovery">
                {/* Hero Section */}
                <section className="service-hero" aria-labelledby="service-title">
                    <div className="container">
                        <header>
                            <h1 id="service-title" className="service-title">
                                שחזור דיסק קשיח מקצועי - שיעור הצלחה 97%
                            </h1>
                            <p className="service-subtitle" role="doc-subtitle">
                                מתמחים בשחזור נתונים מדיסקים קשיחים פגומים עם מעל 7 שנות ניסיון.
                                מטפלים בכל סוגי הכשלים: מכניים, לוגיים ופיזיים עם ציוד מתקדם.
                            </p>
                        </header>

                        <div className="service-highlights" role="list">
                            <div className="highlight" role="listitem">
                                <span className="highlight-number">97%</span>
                                <span className="highlight-text">שיעור הצלחה</span>
                            </div>
                            <div className="highlight" role="listitem">
                                <span className="highlight-number">24-48</span>
                                <span className="highlight-text">שעות לביצוע</span>
                            </div>
                            <div className="highlight" role="listitem">
                                <span className="highlight-number">7+</span>
                                <span className="highlight-text">שנות ניסיון</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Failure Types Section */}
                <section className="failure-types" aria-labelledby="failure-types-heading">
                    <div className="container">
                        <header>
                            <h2 id="failure-types-heading" className="section-title">
                                סוגי כשלים בדיסק קשיח שאנו מטפלים בהם
                            </h2>
                            <p className="section-subtitle">
                                ניסיון עשיר בטיפול בכל סוגי הבעיות והכשלים בדיסקים קשיחים
                            </p>
                        </header>

                        <div className="failure-grid" role="list">
                            <article className="failure-type" role="listitem">
                                <header>
                                    <h3 className="failure-title">
                                        כשלים מכניים בדיסק קשיח
                                    </h3>
                                </header>
                                <p className="failure-description">
                                    כשלים מכניים הם הנפוצים ביותר בדיסקים קשיחים ודורשים טיפול מקצועי
                                    בסביבה מבוקרת. אנו מטפלים בכל סוגי הכשלים המכניים.
                                </p>
                                <ul className="failure-symptoms" aria-label="תסמינים של כשלים מכניים">
                                    <li>כשל במנוע הדיסק (Motor Failure) - הדיסק לא מסתובב</li>
                                    <li>בעיות בראשי הקריאה (Read/Write Heads) - צלילים מוזרים</li>
                                    <li>נזק לפלטות הדיסק (Platter Damage) - שריטות על המשטח</li>
                                    <li>כשל במעגלי הבקרה (PCB Failure) - הדיסק לא מזוהה</li>
                                    <li>בעיות בציר הסיבוב (Spindle Issues) - רעידות חריגות</li>
                                </ul>
                                <div className="treatment-info">
                                    <strong>טיפול:</strong> החלפת רכיבים פגומים בחדר נקי,
                                    שימוש בכלים מתקדמים ותהליך שחזור מדויק.
                                </div>
                            </article>

                            <article className="failure-type" role="listitem">
                                <header>
                                    <h3 className="failure-title">
                                        כשלים לוגיים ותיקון דיסק קשיח
                                    </h3>
                                </header>
                                <p className="failure-description">
                                    כשלים לוגיים נגרמים בדרך כלל מבעיות תוכנה, וירוסים או נזק למערכת הקבצים.
                                    סוג זה של בעיות ניתן לטיפול ללא פתיחת הדיסק.
                                </p>
                                <ul className="failure-symptoms" aria-label="תסמינים של כשלים לוגיים">
                                    <li>פגיעה במערכת הקבצים (File System Corruption)</li>
                                    <li>שחיתות בטבלת הפרטיציות (Partition Table Damage)</li>
                                    <li>נזק לקבצי מערכת (System Files Corruption)</li>
                                    <li>וירוסים ותוכנות זדוניות (Malware Damage)</li>
                                    <li>מחיקה בטעות או פורמט שגוי</li>
                                </ul>
                                <div className="treatment-info">
                                    <strong>טיפול:</strong> שימוש בתוכנות מקצועיות לשחזור,
                                    תיקון מערכת הקבצים ושחזור נתונים ללא פגיעה בדיסק.
                                </div>
                            </article>

                            <article className="failure-type" role="listitem">
                                <header>
                                    <h3 className="failure-title">
                                        נזק פיזי ושחזור מדיסק שבור
                                    </h3>
                                </header>
                                <p className="failure-description">
                                    נזק פיזי לדיסק קשיח דורש טיפול מיוחד וציוד מתקדם.
                                    אנו מטפלים גם במקרים קיצוניים של נזק פיזי חמור.
                                </p>
                                <ul className="failure-symptoms" aria-label="סוגי נזק פיזי">
                                    <li>נזק מנפילה או מכה חזקה</li>
                                    <li>נזק מחום יתר או שריפה</li>
                                    <li>נזק מלחות או הצפה</li>
                                    <li>נזק חשמלי מברק או נפילת מתח</li>
                                    <li>שבירה פיזית של המארז או הרכיבים</li>
                                </ul>
                                <div className="treatment-info">
                                    <strong>טיפול:</strong> פירוק זהיר, העברת פלטות לדיסק תקין,
                                    שחזור בסביבה מבוקרת עם ציוד מיוחד.
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* Symptoms Section */}
                <section className="symptoms-section" aria-labelledby="symptoms-heading">
                    <div className="container">
                        <header>
                            <h2 id="symptoms-heading" className="section-title">
                                סימנים שהדיסק הקשיח שלכם זקוק לשחזור מקצועי
                            </h2>
                            <p className="section-subtitle">
                                זיהוי מוקדם של בעיות יכול להציל את הנתונים שלכם
                            </p>
                        </header>

                        <div className="symptoms-grid" role="list">
                            <div className="symptom-card urgent" role="listitem">
                                <div className="symptom-icon" aria-hidden="true">🚨</div>
                                <h3 className="symptom-title">תסמינים דחופים</h3>
                                <ul className="symptom-list">
                                    <li>צלילים מוזרים מהדיסק הקשיח (חריקות, נקישות)</li>
                                    <li>הדיסק לא מזוהה על ידי המחשב</li>
                                    <li>הודעת שגיאה "דיסק לא נמצא" או "Boot Device Not Found"</li>
                                    <li>מחשב תקוע בעליית מערכת (Boot Loop)</li>
                                </ul>
                                <p className="symptom-action">
                                    <strong>פעולה מיידית:</strong> הפסיקו מיד את השימוש במחשב ופנו אלינו!
                                </p>
                            </div>

                            <div className="symptom-card warning" role="listitem">
                                <div className="symptom-icon" aria-hidden="true">⚠️</div>
                                <h3 className="symptom-title">אזהרות מוקדמות</h3>
                                <ul className="symptom-list">
                                    <li>האטה משמעותית בביצועי המחשב</li>
                                    <li>קבצים נעלמים או מתקלקלים</li>
                                    <li>הודעות שגיאה בעת ניסיון גישה לקבצים</li>
                                    <li>תהליך האתחול אורך זמן רב</li>
                                </ul>
                                <p className="symptom-action">
                                    <strong>מומלץ:</strong> גבו את הקבצים החשובים ופנו לבדיקה מקצועית
                                </p>
                            </div>

                            <div className="symptom-card info" role="listitem">
                                <div className="symptom-icon" aria-hidden="true">ℹ️</div>
                                <h3 className="symptom-title">סימני התדרדרות</h3>
                                <ul className="symptom-list">
                                    <li>תוכנות נתקעות או קורסות לעיתים קרובות</li>
                                    <li>זמן גישה ארוך לקבצים גדולים</li>
                                    <li>שגיאות SMART או הודעות מערכת על בעיות בדיסק</li>
                                    <li>רעש חריג בעת פעילות הדיסק</li>
                                </ul>
                                <p className="symptom-action">
                                    <strong>הכנה:</strong> התחילו לתכנן גיבוי ושקלו החלפת דיסק
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Process Section */}
                <section className="process-section" aria-labelledby="process-heading">
                    <div className="container">
                        <header>
                            <h2 id="process-heading" className="section-title">
                                תהליך שחזור הדיסק הקשיח המקצועי שלנו
                            </h2>
                            <p className="section-subtitle">
                                4 שלבים מובנים לשחזור מוצלח ומאובטח של הנתונים שלכם
                            </p>
                        </header>

                        <ol className="process-timeline" role="list">
                            <li className="process-step" role="listitem">
                                <div className="step-number" aria-hidden="true">1</div>
                                <div className="step-content">
                                    <header>
                                        <h3 className="step-title">
                                            אבחון מקדים מקיף של הדיסק הקשיח
                                        </h3>
                                    </header>
                                    <p className="step-description">
                                        בדיקה יסודית של מצב הדיסק הקשיח וזיהוי מדויק של סוג הכשל.
                                        אנו משתמשים בכלים מתקדמים לאבחון מכני ולוגי מלא.
                                    </p>
                                    <ul className="step-details" aria-label="פרטי השלב">
                                        <li>בדיקת תקינות מכנית של הדיסק</li>
                                        <li>סריקת SMART ובדיקת פרמטרים טכניים</li>
                                        <li>זיהוי סוג הכשל ומידת החומרה</li>
                                        <li>הערכת אחוזי הצלחה לשחזור</li>
                                    </ul>
                                    <div className="step-duration">
                                        <strong>משך זמן:</strong> 1-2 שעות | <strong>עלות:</strong> חינמי
                                    </div>
                                </div>
                            </li>

                            <li className="process-step" role="listitem">
                                <div className="step-number" aria-hidden="true">2</div>
                                <div className="step-content">
                                    <header>
                                        <h3 className="step-title">
                                            הערכת נזק מפורטת ומתן הצעת מחיר שקופה
                                        </h3>
                                    </header>
                                    <p className="step-description">
                                        לאחר האבחון, אנו מכינים הערכה מדויקת של אפשרויות השחזור
                                        ומציגים הצעת מחיר הוגנה ושקופה.
                                    </p>
                                    <ul className="step-details" aria-label="פרטי השלב">
                                        <li>דוח מפורט על מצב הדיסק והנתונים</li>
                                        <li>הערכת אחוזי הצלחה לכל סוג קובץ</li>
                                        <li>הצעת מחיר מדויקת ללא הפתעות</li>
                                        <li>הסבר על התהליך וזמני הביצוע</li>
                                    </ul>
                                    <div className="step-duration">
                                        <strong>משך זמן:</strong> 1-2 שעות | <strong>עלות:</strong> חינמי
                                    </div>
                                </div>
                            </li>

                            <li className="process-step" role="listitem">
                                <div className="step-number" aria-hidden="true">3</div>
                                <div className="step-content">
                                    <header>
                                        <h3 className="step-title">
                                            ביצוע תהליך השחזור באמצעות ציוד מתקדם
                                        </h3>
                                    </header>
                                    <p className="step-description">
                                        שימוש בטכנולוגיות מתקדמות ותוכנות מקצועיות לשחזור הנתונים.
                                        העבודה מתבצעת בסביבה מבוקרת עם ציוד מתקדם.
                                    </p>
                                    <ul className="step-details" aria-label="פרטי השלב">
                                        <li>עבודה בחדר נקי לכשלים מכניים</li>
                                        <li>שימוש בתוכנות שחזור מקצועיות</li>
                                        <li>יצירת עותק bit-by-bit של הדיסק</li>
                                        <li>שחזור מדורג לפי עדיפות הקבצים</li>
                                    </ul>
                                    <div className="step-duration">
                                        <strong>משך זמן:</strong> 24-48 שעות | <strong>עלות:</strong> לפי הצעת מחיר
                                    </div>
                                </div>
                            </li>

                            <li className="process-step" role="listitem">
                                <div className="step-number" aria-hidden="true">4</div>
                                <div className="step-content">
                                    <header>
                                        <h3 className="step-title">
                                            בדיקת תקינות ומסירה מאובטחת של הקבצים
                                        </h3>
                                    </header>
                                    <p className="step-description">
                                        בדיקה יסודית של תקינות הקבצים המשוחזרים ומסירתם באופן מאובטח.
                                        כולל הדרכה על שמירה נכונה למניעת אובדן עתידי.
                                    </p>
                                    <ul className="step-details" aria-label="פרטי השלב">
                                        <li>בדיקת תקינות כל הקבצים המשוחזרים</li>
                                        <li>מסירה על מדיה חדשה ומאובטחת</li>
                                        <li>הדרכה על גיבוי נכון ושמירה</li>
                                        <li>מחיקה מאובטחת של הנתונים ממערכותינו</li>
                                    </ul>
                                    <div className="step-duration">
                                        <strong>משך זמן:</strong> 1-2 שעות | <strong>עלות:</strong> כלול במחיר
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="pricing-section" aria-labelledby="pricing-heading">
                    <div className="container">
                        <header>
                            <h2 id="pricing-heading" className="section-title">
                                מחירי שחזור דיסק קשיח - מחירון שקוף ומפורט
                            </h2>
                            <p className="section-subtitle">
                                מחירים הוגנים ושקופים ללא הפתעות, עם הערכת מחיר חינמית
                            </p>
                        </header>

                        <div className="pricing-grid" role="list">
                            <div className="pricing-tier" role="listitem">
                                <header>
                                    <h3 className="tier-title">כשל לוגי</h3>
                                    <div className="tier-price">₪300-₪600</div>
                                </header>
                                <ul className="tier-features" aria-label="שירותים כלולים">
                                    <li>שחזור מערכת קבצים פגומה</li>
                                    <li>תיקון טבלת פרטיציות</li>
                                    <li>שחזור קבצים שנמחקו בטעות</li>
                                    <li>טיפול בנזק מוירוסים</li>
                                    <li>שחזור אחרי פורמט שגוי</li>
                                </ul>
                                <div className="tier-duration">
                                    <strong>זמן ביצוע:</strong> 24-48 שעות
                                </div>
                                <div className="tier-success">
                                    <strong>שיעור הצלחה:</strong> 97%
                                </div>
                            </div>

                            <div className="pricing-tier featured" role="listitem">
                                <div className="tier-badge" aria-label="הכי פופולרי">הכי נפוץ</div>
                                <header>
                                    <h3 className="tier-title">כשל מכני</h3>
                                    <div className="tier-price">₪800-₪1200</div>
                                </header>
                                <ul className="tier-features" aria-label="שירותים כלולים">
                                    <li>תיקון רכיבים מכניים פגומים</li>
                                    <li>החלפת ראשי קריאה/כתיבה</li>
                                    <li>תיקון מנוע דיסק ומעגלי בקרה</li>
                                    <li>עבודה בחדר נקי מקצועי</li>
                                    <li>שחזור מדיסק פגום פיזית</li>
                                </ul>
                                <div className="tier-duration">
                                    <strong>זמן ביצוע:</strong> 48-72 שעות
                                </div>
                                <div className="tier-success">
                                    <strong>שיעור הצלחה:</strong> 92%
                                </div>
                            </div>

                            <div className="pricing-tier" role="listitem">
                                <header>
                                    <h3 className="tier-title">נזק פיזי חמור</h3>
                                    <div className="tier-price">₪1200-₪2000</div>
                                </header>
                                <ul className="tier-features" aria-label="שירותים כלולים">
                                    <li>שחזור מדיסק שבור או שרוף</li>
                                    <li>העברת פלטות לדיסק תקין</li>
                                    <li>שחזור אחרי נזק מים או חום</li>
                                    <li>טיפול במקרים קיצוניים</li>
                                    <li>ציוד מיוחד ומתקדם</li>
                                </ul>
                                <div className="tier-duration">
                                    <strong>זמן ביצוע:</strong> 3-7 ימים
                                </div>
                                <div className="tier-success">
                                    <strong>שיעור הצלחה:</strong> 85%
                                </div>
                            </div>
                        </div>

                        <div className="pricing-note">
                            <p>
                                <strong>הערה חשובה:</strong> כל המחירים כוללים אבחון מלא, הערכת מחיר חינמית,
                                תהליך השחזור, בדיקת תקינות ומסירה על מדיה חדשה.
                                תשלום רק במקרה של שחזור מוצלח!
                            </p>
                        </div>
                    </div>
                </section>
                {/* Case Studies Section */}
                <section className="case-studies" aria-labelledby="case-studies-heading">
                    <div className="container">
                        <header>
                            <h2 id="case-studies-heading" className="section-title">
                                מקרי הצלחה בשחזור דיסק קשיח
                            </h2>
                            <p className="section-subtitle">
                                דוגמאות אמיתיות ממקרים מורכבים שטיפלנו בהם בהצלחה
                            </p>
                        </header>

                        <div className="case-studies-grid" role="list">
                            <article className="case-study" role="listitem">
                                <header>
                                    <h3 className="case-title">
                                        שחזור 1TB נתונים עסקיים אחרי שריפה
                                    </h3>
                                </header>
                                <div className="case-details">
                                    <div className="case-problem">
                                        <h4>הבעיה:</h4>
                                        <p>
                                            דיסק קשיח של 1TB עם נתונים עסקיים קריטיים נפגע בשריפה במשרד.
                                            הדיסק היה שחור מבחוץ והמחשב לא זיהה אותו כלל.
                                        </p>
                                    </div>
                                    <div className="case-solution">
                                        <h4>הפתרון:</h4>
                                        <p>
                                            פירוק זהיר של הדיסק, ניקוי הפלטות מפיח והעברתן לדיסק תקין.
                                            שחזור בסביבה מבוקרת עם ציוד מיוחד לטיפול בנזק חום.
                                        </p>
                                    </div>
                                    <div className="case-result">
                                        <h4>התוצאה:</h4>
                                        <p>
                                            שחזור מוצלח של 97% מהנתונים תוך 5 ימי עבודה.
                                            החברה הצליחה להמשיך לפעול ללא הפסקה משמעותית.
                                        </p>
                                    </div>
                                </div>
                                <div className="case-stats">
                                    <span className="stat">נפח: 1TB</span>
                                    <span className="stat">זמן: 5 ימים</span>
                                    <span className="stat">הצלחה: 97%</span>
                                </div>
                            </article>

                            <article className="case-study" role="listitem">
                                <header>
                                    <h3 className="case-title">
                                        שחזור תמונות חתונה מדיסק עם כשל מכני
                                    </h3>
                                </header>
                                <div className="case-details">
                                    <div className="case-problem">
                                        <h4>הבעיה:</h4>
                                        <p>
                                            דיסק קשיח חיצוני עם תמונות חתונה נפל ונפגע. הדיסק השמיע צלילים
                                            מוזרים ולא היה נגיש. הלקוח היה במצוקה רגשית.
                                        </p>
                                    </div>
                                    <div className="case-solution">
                                        <h4>הפתרון:</h4>
                                        <p>
                                            זיהוי כשל בראשי הקריאה והחלפתם בחדר נקי. עבודה זהירה
                                            לשחזור כל התמונות ללא פגיעה נוספת בדיסק.
                                        </p>
                                    </div>
                                    <div className="case-result">
                                        <h4>התוצאה:</h4>
                                        <p>
                                            שחזור מלא של כל התמונות (100%) תוך 48 שעות.
                                            הלקוח קיבל את התמונות על 2 מדיות נפרדות לביטחון.
                                        </p>
                                    </div>
                                </div>
                                <div className="case-stats">
                                    <span className="stat">נפח: 500GB</span>
                                    <span className="stat">זמן: 48 שעות</span>
                                    <span className="stat">הצלחה: 100%</span>
                                </div>
                            </article>

                            <article className="case-study" role="listitem">
                                <header>
                                    <h3 className="case-title">
                                        שחזור מסד נתונים אחרי נזק חשמלי
                                    </h3>
                                </header>
                                <div className="case-details">
                                    <div className="case-problem">
                                        <h4>הבעיה:</h4>
                                        <p>
                                            שרת עם מסד נתונים חשוב נפגע מברק. הדיסק לא הגיב כלל
                                            ונראה שהמעגלים נשרפו לחלוטין.
                                        </p>
                                    </div>
                                    <div className="case-solution">
                                        <h4>הפתרון:</h4>
                                        <p>
                                            החלפת לוח המעגלים (PCB) ותיקון נזק חשמלי. שחזור זהיר
                                            של מסד הנתונים עם כלים מתקדמים.
                                        </p>
                                    </div>
                                    <div className="case-result">
                                        <h4>התוצאה:</h4>
                                        <p>
                                            שחזור מוצלח של מסד הנתונים (97%) תוך 72 שעות.
                                            השרת חזר לפעילות מלאה עם כל המידע החיוני.
                                        </p>
                                    </div>
                                </div>
                                <div className="case-stats">
                                    <span className="stat">נפח: 2TB</span>
                                    <span className="stat">זמן: 72 שעות</span>
                                    <span className="stat">הצלחה: 97%</span>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="faq-section" aria-labelledby="faq-heading">
                    <div className="container">
                        <header>
                            <h2 id="faq-heading" className="section-title">
                                שאלות נפוצות על שחזור דיסק קשיח
                            </h2>
                            <p className="section-subtitle">
                                תשובות למה שאתם הכי שואלים על שירות שחזור הדיסק הקשיח שלנו
                            </p>
                        </header>

                        <div className="faq-list" role="list">
                            <details className="faq-item" role="listitem">
                                <summary className="faq-question" role="button">
                                    <h3>מה ההבדל בין כשל מכני לכשל לוגי בדיסק קשיח?</h3>
                                </summary>
                                <div className="faq-answer">
                                    <p>
                                        כשל מכני נגרם מבעיה פיזית ברכיבי הדיסק (מנוע, ראשי קריאה, פלטות)
                                        ודורש פתיחת הדיסק בחדר נקי. כשל לוגי נגרם מבעיות תוכנה,
                                        שחיתות במערכת הקבצים או נזק מוירוסים וניתן לטיפול ללא פתיחת הדיסק.
                                    </p>
                                </div>
                            </details>

                            <details className="faq-item" role="listitem">
                                <summary className="faq-question" role="button">
                                    <h3>האם כדאי לנסות לתקן דיסק קשיח בעצמי?</h3>
                                </summary>
                                <div className="faq-answer">
                                    <p>
                                        לא מומלץ בהחלט! ניסיונות תיקון עצמיים יכולים להחמיר את הנזק
                                        ולהקטין את סיכויי השחזור. במיוחד אין לפתוח דיסק קשיח מחוץ לחדר נקי.
                                        הפסיקו מיד את השימוש ופנו למומחים.
                                    </p>
                                </div>
                            </details>

                            <details className="faq-item" role="listitem">
                                <summary className="faq-question" role="button">
                                    <h3>כמה זמן לוקח שחזור דיסק קשיח?</h3>
                                </summary>
                                <div className="faq-answer">
                                    <p>
                                        זמן השחזור תלוי בסוג הכשל: כשלים לוגיים - 24-48 שעות,
                                        כשלים מכניים - 48-72 שעות, נזק פיזי חמור - 3-7 ימים.
                                        אנו מעדכנים את הלקוח לאורך כל התהליך.
                                    </p>
                                </div>
                            </details>

                            <details className="faq-item" role="listitem">
                                <summary className="faq-question" role="button">
                                    <h3>מה קורה אם השחזור לא מצליח?</h3>
                                </summary>
                                <div className="faq-answer">
                                    <p>
                                        אם השחזור לא מצליח, אתם לא משלמים כלום! אנו גובים תשלום רק
                                        במקרה של שחזור מוצלח. במקרים נדירים של כשל מוחלט,
                                        אנו מציעים שירותי שחזור מתקדמים נוספים.
                                    </p>
                                </div>
                            </details>

                            <details className="faq-item" role="listitem">
                                <summary className="faq-question" role="button">
                                    <h3>איך אתם מבטיחים את אבטחת הנתונים שלי?</h3>
                                </summary>
                                <div className="faq-answer">
                                    <p>
                                        אנו חותמים על הסכם סודיות, עובדים בסביבה מאובטחת,
                                        ומוחקים את כל הנתונים ממערכותינו לאחר השחזור.
                                        כל הצוות עבר הכשרה באבטחת מידע ופרטיות.
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
                                הדיסק הקשיח שלכם לא עובד? אל תחכו!
                            </h2>
                            <p className="cta-subtitle">
                                כל דקה שעוברת מקטינה את סיכויי השחזור. פנו אלינו עכשיו לאבחון חינמי
                            </p>
                        </header>

                        <div className="cta-buttons" role="group" aria-label="פעולות יצירת קשר">
                            <a
                                href="tel:+972501234567"
                                className="cta-btn primary"
                                aria-label="התקשרו עכשיו לשחזור דיסק קשיח"
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
                            <div className="feature">✓ אבחון חינמי</div>
                            <div className="feature">✓ הערכת מחיר ללא התחייבות</div>
                            <div className="feature">✓ תשלום רק במקרה הצלחה</div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};