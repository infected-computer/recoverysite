# 🚀 מדריך הפריסה - Recovery Site

## הגדרת משתני סביבה ב-Netlify

### שלב 1: כניסה ל-Netlify Dashboard
1. היכנס ל-[Netlify Dashboard](https://app.netlify.com/)
2. בחר באתר שלך: `recoverysite.netlify.app`
3. עבור ל-**Site settings** > **Environment variables**

### שלב 2: הוספת משתנה הסביבה
1. לחץ על **Add a variable**
2. הוסף את המשתנה הבא:
   - **Key**: `RESEND_API_KEY`
   - **Value**: ה-API key שלך מ-Resend (מתחיל ב-`re_`)

### שלב 3: אימות הגדרות
- וודא שהמשתנה מוגדר עבור **Production** ו-**Deploy previews**
- שמור את השינויים

## ✅ בדיקת התקנה

### לפני הפריסה:
```bash
npm install
npm run build
```

### לאחר הפריסה:
1. פתח את האתר: `https://recoverysite.netlify.app`
2. נסה לשלוח טופס יצירת קשר
3. בדוק שהמייל הגיע ל-`doctorfix79@gmail.com`

## 🔧 פתרון בעיות

### אם המיילים לא נשלחים:
1. בדוק ב-Netlify Functions logs:
   - עבור ל-**Functions** > **send-email**
   - בדוק את הלוגים האחרונים
2. וודא שמשתנה הסביבה `RESEND_API_KEY` מוגדר נכון
3. בדוק שהדומיין `recoverysite.netlify.app` מאומת ב-Resend

### שגיאות נפוצות:
- **401 Unauthorized**: API key לא תקין או חסר
- **403 Forbidden**: הדומיין לא מאומת ב-Resend
- **429 Too Many Requests**: חרגת מהמגבלה היומית

## 📧 פרטי שירות המייל

- **שולח**: `contact@recoverysite.netlify.app`
- **מקבל**: `doctorfix79@gmail.com`
- **נושא**: "בקשת יצירת קשר חדשה מהאתר - [שם הלקוח]"
- **תבנית**: HTML + Text בעברית עם עיצוב מתקדם

## 🔒 אבטחה

- כל הנתונים עוברים sanitization למניעת XSS
- אימות מקיף של שדות הקלט
- CORS מוגדר נכון לאתר
- Headers אבטחה מתקדמים

## 📊 ניטור

- לוגים מפורטים ב-Netlify Functions
- מעקב אחר הצלחות ושגיאות
- Tags למעקב analytics ב-Resend