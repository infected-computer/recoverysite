# דרישות לניקוי והייעול פרויקט

## מבוא

הפרויקט הנוכחי מכיל מערכות מיותרות ומנופחות שמאטות את האתר ומגדילות את גודל ה-bundle. המטרה היא לנקות ולייעל את הקוד על ידי הסרת מערכות לא נחוצות, פישוט מערכות קיימות, וייעול הביצועים הכלליים.

## דרישות

### דרישה 1: פישוט מערכת תשלומים

**User Story:** כמפתח, אני רוצה לפשט את מערכת התשלומים לגודל הנדרש, כדי להקטין את גודל הקוד ולשפר את הביצועים.

#### קריטריוני קבלה

1. WHEN מפשטים מערכת תשלומים THEN המערכת SHALL לכלול רק תשלום Lemon Squeezy פשוט בשקלים
2. WHEN מפשטים מערכת תשלומים THEN המערכת SHALL לכלול קישור נסתר שהאתר לא מקשר אליו
3. WHEN מפשטים מערכת תשלומים THEN המערכת SHALL להסיר קבצים ופונקציונליות מיותרת
4. WHEN מסיימים פישוט מערכת תשלומים THEN המערכת SHALL לאפשר למשתמש להזין סכום בקלות

### דרישה 2: הסרת Bundle Analyzer

**User Story:** כמפתח, אני רוצה להסיר את ה-Bundle Analyzer לגמרי, כדי להקטין את גודל הקוד ולפשט את המערכת.

#### קריטריוני קבלה

1. WHEN מסירים Bundle Analyzer THEN המערכת SHALL למחוק את הקובץ src/utils/bundleAnalyzer.ts
2. WHEN מסירים Bundle Analyzer THEN המערכת SHALL להסיר את כל ה-imports וה-references אליו
3. WHEN מסירים Bundle Analyzer THEN המערכת SHALL לעבוד ללא שגיאות compilation
4. WHEN בונים לייצור THEN Bundle Analyzer SHALL לא להיכלל ב-bundle הסופי

### דרישה 3: פישוט מערכת Sitemap

**User Story:** כמפתח, אני רוצה sitemap פשוט ויעיל, כדי להקטין את המורכבות ולשפר את זמני הטעינה.

#### קריטריוני קבלה

1. WHEN יוצרים sitemap THEN המערכת SHALL ליצור רק sitemap.xml אחד פשוט
2. WHEN מפשטים sitemap THEN המערכת SHALL להסיר את sitemap-images.xml ו-sitemap-mobile.xml
3. WHEN מעדכנים SitemapGenerator THEN הוא SHALL להכיל רק פונקציונליות בסיסית
4. IF קיימת SitemapManager UI THEN המערכת SHALL להסיר אותה

### דרישה 4: פישוט מערכת SEO Schemas

**User Story:** כמפתח, אני רוצה לשמור רק על ה-schemas הבסיסיים הנחוצים, כדי להקטין את גודל הקוד ולשפר את הביצועים.

#### קריטריוני קבלה

1. WHEN מפשטים schemas THEN המערכת SHALL לשמור רק על LocalBusiness, Service, FAQ
2. WHEN מסירים schemas THEN המערכת SHALL להסיר Article, HowTo, Product, ContactPoint, Person (אלא אם בשימוש אקטיבי)
3. WHEN מעדכנים SEO components THEN המערכת SHALL להסיר props מיותרים
4. WHEN מסיימים פישוט SEO THEN הלוגיקה SHALL להיות פשוטה ויעילה

### דרישה 5: איחוד מערכות אנימציה

**User Story:** כמפתח, אני רוצה מערכת אנימציה מאוחדת ופשוטה, כדי להקטין את המורכבות ולשפר את הביצועים.

#### קריטריוני קבלה

1. WHEN יש מספר קומפוננטות loading THEN המערכת SHALL לשמור רק על אחת או שתיים מקסימום
2. WHEN מסירים אנימציות THEN המערכת SHALL להסיר אנימציות מיותרות או כבדות
3. WHEN מאחדים אנימציות THEN המערכת SHALL לשמור על פונקציונליות חיונית בלבד

### דרישה 6: פישוט מערכת טעינת גופנים

**User Story:** כמפתח, אני רוצה מערכת טעינת גופנים פשוטה, כדי להקטין את המורכבות ולשפר את זמני הטעינה.

#### קריטריוני קבלה

1. IF משתמשים רק בגופן אחד או שניים THEN המערכת SHALL להסיר את fontLoader.ts
2. WHEN מפשטים טעינת גופנים THEN המערכת SHALL להשתמש ב-preload פשוט ב-HTML
3. WHEN מסיימים פישוט גופנים THEN זמני הטעינה SHALL להשתפר

### דרישה 7: ניקוי imports ו-dependencies

**User Story:** כמפתח, אני רוצה קוד נקי ללא imports או dependencies מיותרים, כדי להקטין את גודל ה-bundle ולשפר את הביצועים.

#### קריטריוני קבלה

1. WHEN מסירים קבצים THEN המערכת SHALL להסיר את כל ה-imports המיותרים מ-App.tsx
2. WHEN מנקים קוד THEN המערכת SHALL להסיר את כל ה-references לקבצים שהוסרו
3. WHEN מעדכנים dependencies THEN package.json SHALL להכיל רק dependencies בשימוש אקטיבי
4. WHEN מסיימים ניקוי THEN לא יהיו שגיאות TypeScript

### דרישה 8: בדיקות ביצועים ותקינות

**User Story:** כמפתח, אני רוצה לוודא שהאתר עובד תקין אחרי הניקוי ושהביצועים השתפרו, כדי להבטיח איכות המוצר.

#### קריטריוני קבלה

1. WHEN מסיימים ניקוי THEN האתר SHALL לעבוד כמו שצריך
2. WHEN בונים לייצור THEN npm run build SHALL לעבוד ללא שגיאות
3. WHEN בודקים bundle size THEN גודל ה-bundle SHALL להיות קטן יותר מהמצב הקודם
4. WHEN בודקים TypeScript THEN לא יהיו שגיאות compilation