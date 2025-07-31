import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";

export const TermsPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-hebrew text-4xl font-bold mb-8 text-center">
          תנאי שימוש
        </h1>
        
        <div className="prose prose-lg max-w-none font-hebrew text-right space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <p className="text-lg font-semibold mb-4">
              תנאי השימוש שלנו מעוצבים להגן עליכם ועלינו ולהבטיח שירות מקצועי ואמין.
            </p>
            <p className="text-sm text-muted-foreground">
              עדכון אחרון: ינואר 2024
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">הגדרות</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>"השירות"</strong> - שירותי שחזור נתונים מרחוק</li>
              <li><strong>"הלקוח"</strong> - כל מי שמשתמש בשירותים שלנו</li>
              <li><strong>"הנתונים"</strong> - קבצים ומידע שמטרתם לשחזר</li>
              <li><strong>"בדיקה ראשונית"</strong> - הערכת סיכויי השחזור ללא עלות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">היקף השירות</h2>
            <div className="bg-success/10 p-4 rounded-lg border border-success/20 mb-4">
              <h3 className="font-semibold text-success mb-2">✅ מה כלול בשירות</h3>
            </div>
            <ul className="list-disc pr-6 space-y-2 mb-6">
              <li>בדיקה ראשונית ללא עלות</li>
              <li>הערכת סיכויי השחזור</li>
              <li>ביצוע שחזור באמצעות כלים מקצועיים</li>
              <li>מסירת הקבצים המשוחזרים</li>
              <li>תמיכה במהלך התהליך</li>
            </ul>

            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
              <h3 className="font-semibold text-warning mb-2">⚠️ מגבלות השירות</h3>
              <ul className="list-disc pr-6 space-y-1 text-sm">
                <li>שירות מרחוק בלבד - ללא קבלת ציוד פיזי</li>
                <li>תלוי בשיתוף פעולה של הלקוח ובזמינות המערכת</li>
                <li>לא מבטיחים הצלחה ב-100% מהמקרים</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">תמחור ותשלום</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">בדיקה ראשונית</h3>
                <p className="text-sm mb-2">תמיד ללא עלות</p>
                <p className="text-xs text-muted-foreground">
                  כולל הערכת סיכויים והצגת קבצים ניתנים לשחזור
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">שחזור מלא</h3>
                <p className="text-sm mb-2">תשלום רק לאחר הצלחה</p>
                <p className="text-xs text-muted-foreground">
                  מחיר קבוע לפי סוג והיקף העבודה
                </p>
              </div>
            </div>
            <ul className="list-disc pr-6 space-y-2">
              <li>התשלום מתבצע רק לאחר שחזור מוצלח</li>
              <li>ללא עלויות נסתרות או תוספות</li>
              <li>אפשרות תשלום בהעברה בנקאית או PayPal</li>
              <li>קבלה ומס מע"ם לעסקים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">התחייבויות הלקוח</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>לספק גישה למערכת דרך AnyDesk</li>
              <li>לספק מידע מדויק על הבעיה</li>
              <li>לא להפריע לתהליך השחזור</li>
              <li>לגבות קבצים חשובים לאחר השחזור</li>
              <li>לשלם עבור השירות לפי ההסכמה</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">התחייבויותינו</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>לבצע בדיקה ראשונית ללא עלות</li>
              <li>לספק הערכה כנה של סיכויי ההצלחה</li>
              <li>לעבוד בשקיפות מלאה</li>
              <li>לשמור על סודיות הנתונים</li>
              <li>לספק תמיכה במהלך התהליך</li>
              <li>למחוק נתונים מהמערכת שלנו לאחר המסירה</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">אחריות ומגבלות</h2>
            <div className="bg-warning/10 p-4 rounded-lg border border-warning/20 mb-4">
              <h3 className="font-semibold mb-2">חשוב להבין:</h3>
              <ul className="list-disc pr-6 space-y-1 text-sm">
                <li>שחזור נתונים אינו מובטח ב-100% מהמקרים</li>
                <li>התוצאה תלויה במצב הכונן ובסוג הנזק</li>
                <li>אנחנו לא אחראים לנזקים עקיפים או אובדן רווחים</li>
              </ul>
            </div>
            <ul className="list-disc pr-6 space-y-2">
              <li>אחריות מלאה לכל קובץ שהושלם בהצלחה</li>
              <li>החזר כספי מלא אם השחזור נכשל לחלוטין</li>
              <li>ביטוח מקצועי לכיסוי נזקים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">ביטול והפסקת שירות</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">זכות הלקוח</h3>
                <ul className="text-sm space-y-1">
                  <li>לבטל בכל שלב של הבדיקה הראשונית</li>
                  <li>לסרב להמשיך לאחר קבלת הערכה</li>
                  <li>להפסיק התהליך (תשלום יחסי)</li>
                </ul>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">זכותנו</h3>
                <ul className="text-sm space-y-1">
                  <li>להפסיק שירות במקרה של אי שיתוף פעולה</li>
                  <li>לסרב לטפל במקרים לא חוקיים</li>
                  <li>לדרוש תשלום מקדמה במקרים מיוחדים</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">סודיות ואבטחה</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>מחויבים לסודיות מוחלטת של כל הנתונים</li>
              <li>שימוש בחיבור מוצפן ובטוח</li>
              <li>מחיקת נתונים מהמערכת שלנו לאחר השלמת העבודה</li>
              <li>ללא גישה לתוכן הקבצים (רק שמות לצרכי השחזור)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">יישוב סכסוכים</h2>
            <p className="mb-4">
              במקרה של חילוקי דעות, נפעל לפתרון בדרכים הבאות:
            </p>
            <ol className="list-decimal pr-6 space-y-2">
              <li>שיחה ישירה לבירור העניין</li>
              <li>גישור באמצעות צד שלישי</li>
              <li>פנייה לבית משפט מוסמך בישראל</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">יצירת קשר</h2>
            <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <p className="mb-4">
                שאלות על התנאים? צריכים הבהרה? אנחנו כאן בשבילכם:
              </p>
              <ul className="space-y-2">
                <li><strong>אימייל:</strong> egozkokus1@gmail.com</li>
                <li><strong>WhatsApp:</strong> זמין דרך הכפתור באתר</li>
                <li><strong>שעות פעילות:</strong> ראשון-חמישי, 09:00-18:00</li>
              </ul>
            </div>
          </section>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20 text-center">
            <p className="font-semibold text-lg mb-2">
              השימוש בשירותים מהווה הסכמה לתנאים אלה
            </p>
            <p className="text-muted-foreground">
              אנחנו ממליצים לקרוא בעיון ולפנות אלינו עם כל שאלה
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <WhatsAppFloat />
    </>
  );
};