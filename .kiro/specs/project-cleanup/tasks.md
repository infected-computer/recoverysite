# תכנית יישום - ניקוי והייעול פרויקט

- [x] 1. הכנה ומדידת baseline



  - יצירת branch חדש לניקוי הפרויקט
  - מדידת גודל bundle נוכחי עם npm run build
  - תיעוד מדדי ביצועים נוכחיים (Lighthouse scores)
  - _דרישות: 8.2, 8.3_

- [x] 2. פישוט מערכת תשלומים - שלב א': זיהוי קבצים מיותרים



  - חיפוש כל הreferences לקבצי תשלום בקוד
  - יצירת רשימה של קבצים להסרה ולפישוט
  - בדיקת איזה קבצים נחוצים לתשלום פשוט ב-Lemon Squeezy
  - _דרישות: 1.1, 1.3_

- [x] 3. פישוט מערכת תשלומים - שלב ב': הסרת דפי תשלום מיותרים



  - מחיקת src/pages/PaymentSuccessPage.tsx  
  - מחיקת src/pages/PaymentErrorPage.tsx
  - מחיקת src/pages/PaymentCancelPage.tsx
  - שמירה על src/pages/PaymentPage.tsx לפישוט
  - _דרישות: 1.3_

- [x] 4. פישוט מערכת תשלומים - שלב ג': הסרת קומפוננטות מיותרות



  - מחיקת תיקיית src/components/admin/ כולה
  - בדיקה איזה קומפוננטות ב-src/components/payment/ נחוצות
  - שמירה רק על PaymentForm או קומפוננטה בסיסית דומה
  - _דרישות: 1.3_

- [ ] 5. פישוט מערכת תשלומים - שלב ד': הסרת שירותים מיותרים


  - מחיקת src/services/receiptService.ts
  - מחיקת src/services/transactionLogger.ts
  - מחיקת src/services/webhookHandler.ts
  - שמירה על src/services/lemonSqueezyService.ts לפישוט
  - _דרישות: 1.3_

- [ ] 6. פישוט מערכת תשלומים - שלב ה': הסרת hooks מיותרים
  - מחיקת src/hooks/useReceipts.ts
  - מחיקת src/hooks/useTransactionLogger.ts
  - מחיקת src/hooks/useWebhookHandler.ts
  - בדיקה אם src/hooks/usePaymentProcessing.ts נחוץ או ניתן לפשט
  - _דרישות: 1.3_

- [ ] 7. פישוט מערכת תשלומים - שלב ו': עדכון CSS ו-routes
  - מחיקת src/styles/paymentResults.css
  - מחיקת src/styles/admin.css
  - שמירה על src/styles/payment.css לפישוט
  - הסרת success/error/cancel routes מ-App.tsx
  - וידוא שהקישור לתשלום נסתר
  - _דרישות: 1.2, 1.3_

- [ ] 8. פישוט מערכת תשלומים - שלב ז': פישוט PaymentPage
  - עדכון PaymentPage לטופס פשוט עם קלט סכום
  - פישוט PaymentForm לתמיכה בשקלים בלבד
  - הסרת פונקציונליות מיותרת
  - _דרישות: 1.1, 1.4_

- [ ] 9. בדיקת תקינות אחרי פישוט מערכת תשלומים
  - הרצת npm run build לבדיקת שגיאות compilation
  - בדיקת שהאתר נטען ללא שגיאות
  - בדיקת שדף התשלום עובד עם קלט סכום פשוט
  - _דרישות: 1.4, 8.1_

- [ ] 10. הסרת Bundle Analyzer - שלב א': מחיקת הקובץ
  - מחיקת src/utils/bundleAnalyzer.ts לגמרי
  - בדיקת references לקובץ בכל הפרויקט
  - _דרישות: 2.1_

- [ ] 11. הסרת Bundle Analyzer - שלב ב': ניקוי imports ו-references
  - הסרת imports של BundleAnalyzer ו-ResourcePreloader מ-App.tsx
  - הסרת initialization ו-cleanup calls
  - הסרת כל references אחרים לBundle Analyzer
  - _דרישות: 2.2, 2.3_

- [ ] 12. פישוט מערכת Sitemap - שלב א': עדכון generator
  - עדכון src/utils/sitemapGenerator.ts להכיל רק פונקציונליות בסיסית
  - הסרת יצירת sitemap-images.xml ו-sitemap-mobile.xml
  - שמירה על יצירת sitemap.xml פשוט בלבד
  - _דרישות: 3.1, 3.2_

- [ ] 13. פישוט מערכת Sitemap - שלב ב': הסרת UI מיותר
  - בדיקה אם קיימת קומפוננטה SitemapManager
  - מחיקת SitemapManager אם קיימת
  - הסרת imports וreferences לSitemapManager
  - _דרישות: 3.4_

- [ ] 14. פישוט SEO Schemas - שלב א': עדכון schemaGenerator
  - עדכון src/utils/schemaGenerator.ts לשמור רק על LocalBusiness, Service, FAQ
  - הסרת Article, HowTo, Product, ContactPoint, Person schemas
  - בדיקה שהschemas הנותרים עובדים תקין
  - _דרישות: 4.1, 4.2_

- [ ] 15. פישוט SEO Schemas - שלב ב': עדכון קומפוננטות SEO
  - עדכון src/components/seo/SEOHead.tsx להסיר props מיותרים
  - פישוט הלוגיקה בקומפוננטות SEO
  - הסרת references לschemas שנמחקו
  - _דרישות: 4.3, 4.4_

- [ ] 16. איחוד מערכות אנימציה - שלב א': זיהוי קומפוננטות
  - זיהוי כל קומפוננטות ה-loading (LoadingSpinner, NavigationLoader, etc.)
  - בדיקה איזה מהן בשימוש אקטיבי
  - החלטה איזה קומפוננטות לשמור (מקסימום 2)
  - _דרישות: 5.1_

- [ ] 17. איחוד מערכות אנימציה - שלב ב': הסרת אנימציות מיותרות
  - מחיקת קומפוננטות loading מיותרות
  - הסרת אנימציות כבדות או לא נחוצות
  - עדכון imports במקומות שמשתמשים בקומפוננטות שנמחקו
  - _דרישות: 5.2, 5.3_

- [ ] 18. פישוט מערכת גופנים - בדיקה והחלטה
  - בדיקה כמה גופנים בשימוש בפועל
  - בדיקה אם fontLoader.ts נחוץ או ניתן לפשט
  - החלטה על גישה: שמירה על fontLoader או מעבר ל-preload פשוט
  - _דרישות: 6.1, 6.2_

- [ ] 19. פישוט מערכת גופנים - יישום השינויים
  - יישום ההחלטה מהמשימה הקודמת
  - אם מסירים fontLoader: עדכון index.html עם preload tags
  - אם משאירים: פישוט הקוד ב-fontLoader.ts
  - עדכון imports במקומות הרלוונטיים
  - _דרישות: 6.3_

- [ ] 20. ניקוי imports מיותרים - שלב א': App.tsx
  - עיבור על App.tsx והסרת כל imports מיותרים
  - הסרת lazy imports לקבצים שנמחקו
  - וידוא שכל imports הנותרים בשימוש אקטיבי
  - _דרישות: 7.1_

- [ ] 21. ניקוי imports מיותרים - שלב ב': חיפוש גלובלי
  - חיפוש בכל הפרויקט references לקבצים שנמחקו
  - הסרת imports מיותרים מכל הקבצים
  - בדיקת שאין dynamic imports לקבצים שלא קיימים
  - _דרישות: 7.2_

- [ ] 22. עדכון package.json - הסרת dependencies מיותרים
  - בדיקה אילו dependencies כבר לא בשימוש
  - הסרת dependencies הקשורים לפונקציונליות שהוסרה
  - הסרת dev dependencies שלא בשימוש
  - הרצת npm install לעדכון node_modules
  - _דרישות: 7.3_

- [ ] 23. בדיקות תקינות ביניים
  - הרצת npm run build לבדיקת compilation
  - בדיקת שאין שגיאות TypeScript
  - בדיקה ידנית שהאתר עובד תקין
  - _דרישות: 7.4, 8.1_

- [ ] 24. מדידת ביצועים אחרי הניקוי
  - מדידת גודל bundle חדש עם npm run build
  - השוואה לmeasurements מהמשימה הראשונה
  - הרצת Lighthouse לבדיקת scores
  - תיעוד השיפורים שהושגו
  - _דרישות: 8.2, 8.3_

- [ ] 25. בדיקות סופיות מקיפות
  - בדיקה ידנית של כל הדפים העיקריים
  - בדיקת navigation ופונקציונליות
  - בדיקת responsive design
  - וידוא שאין שגיאות ב-console
  - _דרישות: 8.1, 8.4_

- [ ] 26. תיעוד השינויים וסיכום
  - יצירת רשימה של כל הקבצים שנמחקו ושפושטו
  - תיעוד השיפורים בביצועים
  - עדכון README אם נדרש
  - יצירת commit סופי עם סיכום השינויים
  - _דרישות: 8.4_