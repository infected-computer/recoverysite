import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export const PrivacyPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-hebrew text-4xl font-bold mb-8 text-center">
          הצהרת פרטיות
        </h1>
        
        <div className="prose prose-lg max-w-none font-hebrew text-right space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <p className="text-lg font-semibold mb-4">
              אנחנו מתחייבים להגן על הפרטיות שלכם ועל המידע הרגיש שלכם בכל שלב של התהליך.
            </p>
            <p className="text-sm text-muted-foreground">
              עדכון אחרון: ינואר 2024
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">איסוף מידע</h2>
            <p className="mb-4">
              בשל אופי העבודה אצלינו אנחנו לא נדרשים לאסוף עליכם פרטים כלשהם למעט הפרטים שאספנו בפתיחת התיק:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>פרטי קשר בסיסיים (שם, טלפון, אימייל)</li>
              <li>תיאור הבעיה הטכנית</li>
              <li>וזהו!</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">הגנה על הנתונים</h2>
            <div className="bg-success/10 p-4 rounded-lg border border-success/20 mb-4">
              <h3 className="font-semibold text-success mb-2">🔒 אבטחה מקסימלית</h3>
              <p>כל הנתונים שלכם מוגנים ברמה הגבוהה ביותר</p>
            </div>
            <ul className="list-disc pr-6 space-y-2">
              <li>חיבור מוצפן דרך AnyDesk עם אבטחה צבאית</li>
              <li>אין שמירה של נתונים אישיים על המחשבים שלנו</li>
              <li>הקבצים המשוחזרים נמחקים מהמערכת שלנו מיד לאחר המסירה</li>
              <li>גישה למידע רק לטכנאי המטפל בתיק</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">שימוש במידע</h2>
            <p className="mb-4">
              המידע שאנחנו אוספים משמש אותנו רק למטרות הבאות:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>מתן שירותי שחזור הנתונים</li>
              <li>תקשורת איתכם לגבי התהליך</li>
              <li>שיפור השירות שלנו</li>
              <li>עמידה בדרישות החוק</li>
            </ul>
            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20 mt-4">
              <p className="font-semibold">
                ⚠️ אנחנו לעולם לא נעביר את המידע שלכם לצד שלישי ללא הסכמתכם המפורשת
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">זכויותיכם</h2>
            <p className="mb-4">
              יש לכם זכויות מלאות לגבי המידע האישי שלכם:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>לקבל מידע על הנתונים שאנחנו שומרים עליכם</li>
              <li>לבקש תיקון או עדכון מידע</li>
              <li>לבקש מחיקת המידע שלכם</li>
              <li>להתנגד לעיבוד מידע מסוים</li>
              <li>לקבל העתק של המידע שלכם</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies ועוקבים</h2>
            <p className="mb-4">
              האתר שלנו משתמש בטכנולוגיות מינימליות לשיפור החוויה:
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>Cookies טכניים בלבד לתפקוד האתר</li>
              <li>אין מעקב אחר גלישה לצרכי פרסום</li>
              <li>אין שיתוף מידע עם פלטפורמות חיצוניות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">שמירת מידע</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">מידע ליצירת קשר</h3>
                <p className="text-sm">נשמר עד 3 שנים לצרכי שירות ותמיכה</p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">קבצים משוחזרים</h3>
                <p className="text-sm">לא נשמרים כלל על השרתים שלנו!</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">יצירת קשר</h2>
            <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <p className="mb-4">
                יש לכם שאלות או רוצים לממש את הזכויות שלכם? אנחנו כאן בשבילכם:
              </p>
              <ul className="space-y-2">
                <li><strong>אימייל:</strong> doctorfix97@gmail.com</li>
                <li><strong>WhatsApp:</strong> לחצו על הכפתור הצף באתר</li>
                <li><strong>זמינות:</strong> ראשון-חמישי, 09:00-18:00</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">עדכונים</h2>
            <p>
              אם נצטרך לעדכן את הצהרת הפרטיות, נודיע לכם מראש ונבקש את הסכמתכם החדשה.
              התאריך של העדכון האחרון מופיע בחלק העליון של הדף.
            </p>
          </section>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20 text-center">
            <p className="font-semibold text-lg">
              הפרטיות שלכם היא בראש סדר העדיפויות שלנו
            </p>
            <p className="text-muted-foreground mt-2">
              אנחנו עובדים קשה כדי לשמור על האמון שלכם בכל שלב של התהליך
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};