# דוקטור פיקס - אתר שחזור קבצים

אתר מקצועי לשירותי שחזור קבצים ותמיכה טכנית מרחוק.

## 🚀 טכנולוגיות

- **React 18** + **TypeScript**
- **Vite** - כלי build מהיר
- **Tailwind CSS** - עיצוב מודרני
- **shadcn/ui** - רכיבי UI מתקדמים
- **React Router** - ניווט
- **Lucide React** - אייקונים

## 📁 מבנה הפרויקט

```
src/
├── components/
│   ├── layout/          # רכיבי פריסה (Header, Footer, WhatsAppFloat)
│   ├── sections/        # רכיבי סקשנים (Hero, Services, About, Testimonials)
│   ├── shared/          # רכיבים משותפים (Button, Card)
│   └── ui/              # רכיבי shadcn/ui
├── pages/               # דפי האתר
├── styles/
│   ├── globals.css      # סגנונות גלובליים + Design Tokens
│   └── animations.css   # אנימציות מותאמות אישית
├── hooks/               # React hooks מותאמים אישית
└── utils/               # פונקציות עזר
```

## 🎨 מערכת העיצוב

### צבעים עיקריים
- **כחול ראשי**: `#7dd3fc` (כחול בהיר)
- **ירוק משני**: `#a3e635` (ירוק בהיר)
- **רקע כהה**: `#0f172a`
- **רקע בהיר**: `#f8fafc`

### Design Tokens
כל משתני העיצוב מוגדרים ב-`src/styles/globals.css`:
- צבעים: `--color-primary`, `--color-secondary`
- טיפוגרפיה: `--font-family-primary`
- ריווחים: `--spacing-xs` עד `--spacing-5xl`
- גרדיאנטים: `--gradient-primary`, `--gradient-secondary`

## 🏗️ הרצה מקומית

```bash
# התקנת dependencies
npm install

# הרצת שרת פיתוח
npm run dev

# בניית הפרויקט לפרודקשן
npm run build

# בדיקת lint
npm run lint
```

## 📱 דפי האתר

- **דף הבית** (`/`) - Hero, שירותים, אודות, המלצות
- **מחירון** (`/pricing`) - מחירי השירותים השונים
- **תהליך העבודה** (`/process`) - הסבר על תהליך שחזור הקבצים
- **מאמרים** (`/articles`) - מאמרים טכניים
- **מי אנחנו** (`/about`) - על החברה והצוות
- **יצירת קשר** (`/contact`) - טופס יצירת קשר ופרטי התקשרות

## 🔧 רכיבים עיקריים

### Layout Components
- `Header` - ניווט עליון עם לוגו ותפריט
- `Footer` - פוטר עם קישורים וסטטיסטיקות
- `WhatsAppFloat` - כפתור WhatsApp צף

### Section Components
- `Hero` - סקשן פתיחה עם כותרת וCTA
- `Services` - רשת כרטיסי שירותים
- `About` - סקשן אודות עם תמונה וטקסט
- `Testimonials` - המלצות לקוחות

### Shared Components
- `Button` - כפתורים עם variants שונים
- `Card` - כרטיסים עם אפקטי hover

## 🎭 אנימציות

- **Float animations** - אלמנטים צפים ברקע
- **Fade in up** - אנימציות כניסה לסקשנים
- **Hover effects** - אפקטי hover על כרטיסים וכפתורים
- **Shimmer effects** - אפקטי ברק עדינים

## 📊 SEO ונגישות

- **React Helmet** - ניהול meta tags
- **Structured data** - נתונים מובנים לגוגל
- **ARIA labels** - נגישות מלאה
- **Semantic HTML** - HTML סמנטי
- **Alt texts** - תיאורי תמונות

## 🚀 פיצ'רים מתקדמים

- **Lazy loading** - טעינה עצלה של דפים
- **Image optimization** - אופטימיזציית תמונות
- **Performance monitoring** - מעקב ביצועים
- **Error boundaries** - טיפול בשגיאות
- **Bundle analysis** - ניתוח גודל bundle

## 📞 יצירת קשר

- **טלפון**: 050-123-4567
- **אימייל**: doctorfix79@gmail.com
- **WhatsApp**: [לחץ כאן](https://wa.me/972536657279)

---

**פותח עם ❤️ בישראל**