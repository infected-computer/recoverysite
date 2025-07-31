# משתני סביבה לנטליפיי

כדי שמערכת התשלום תעבוד בנטליפיי, יש להגדיר את משתני הסביבה הבאים בהגדרות האתר:

## משתני סביבה נדרשים:

### Lemon Squeezy Configuration
- `VITE_LEMON_SQUEEZY_API_KEY` - מפתח API של Lemon Squeezy
- `VITE_LEMON_SQUEEZY_STORE_ID` - מזהה החנות ב-Lemon Squeezy
- `VITE_LEMON_SQUEEZY_ENVIRONMENT` - סביבה (sandbox או production)
- `VITE_LEMON_SQUEEZY_WEBHOOK_SECRET` - סוד webhook לאימות

### Hidden Page Access
- `VITE_HIDDEN_PAGE_ACCESS_TOKEN` - טוקן גישה לדף התשלום המוסתר

## איך להגדיר בנטליפיי:

1. היכנס לדשבורד של נטליפיי
2. בחר את האתר שלך
3. לך ל-Site settings > Environment variables
4. הוסף כל משתנה עם הערך המתאים

## הערות:
- כל המשתנים חייבים להתחיל ב-`VITE_` כדי שיהיו זמינים בקוד הלקוח
- בסביבת פיתוח המערכת תעבוד גם בלי המשתנים (עם אזהרה)
- בסביבת ייצור המערכת תזרוק שגיאה אם המשתנים חסרים