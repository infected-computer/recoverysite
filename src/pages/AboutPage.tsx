import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Users } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Target } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import { useAccessibleColors } from "../hooks/useAccessibleColors";

const stats = [
  { number: "7+", label: "שנות ניסיון", icon: Clock },
  { number: "97%", label: "שיעור הצלחה", icon: Target },
  { number: "1000+", label: "לקוחות מרוצים", icon: Users },
  { number: "24/6", label: "זמינות", icon: Shield }
];

const values = [
  {
    icon: Shield,
    title: "אמינות ושקיפות",
    description: "אנוו עובדים בשקיפות מלאה ונותנים לכם לראות את התהליך בזמן אמת"
  },
  {
    icon: Award,
    title: "מקצועיות ללא פשרות",
    description: "אנו משתמשים בכלים המתקדמים ביותר ובמתודולוגיות העבודה המוכחות"
  },
  {
    icon: Users,
    title: "שירות אישי",
    description: "כל לקוח מקבל יחס אישי והתאמה מלאה לצרכים הספציפיים שלו"
  },
  {
    icon: CheckCircle,
    title: "ללא סיכון",
    description: "בדיקה חינמית וללא התחייבות - התשלום הוא רק לאחרקבלת התוצאות"
  }
];

export const AboutPage = () => {
  const { colors } = useAccessibleColors();
  
  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני מעוניין לשמוע יותר על השירותים שלכם.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 no-horizontal-scroll">
      {/* Header */}
      <div className="max-w-7xl mx-auto container-mobile text-center mb-16">
        <h1 className="font-hebrew text-4xl md:text-5xl font-bold mb-6">
          אודותינו
        </h1>
        <p className="font-hebrew text-xl text-muted-foreground max-w-3xl mx-auto">
          מעל 7 שנות ניסיון בשחזור נתונים עם התמחות בשירות מרחוק
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto container-mobile mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="font-hebrew text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-hebrew text-3xl font-bold mb-6">
              הסיפור שלנו
            </h2>
            <div className="space-y-4 font-hebrew text-muted-foreground">
              <p>
                דוקטור פיקס הוקמה מתוך הבנה עמוקה של החשיבות הקריטית שיש למידע בעידן הדיגיטלי.
                עם ניסיון מצטבר של למעלה מעשור בתחום טכנולוגיות המידע ושבע שנות
                התמחות ספציפית בשחזור נתונים,אנו מציעים פתרונות מקצועיים למגזר הפרטי והעסקי.
              </p>
              <p>
                במהלך השנים פיתחתנו מתודולוגיה מיוחדת לעבודה מרחוק שמאפשרת 
                לקבל שירות מקצועי ללא צורך לצאת מהבית. זאת
                שיטה שחוסכת הרבה מאוד כסף זמן ומתח
              </p>
              <p>
                היום אנו גאים להיות חלק מהצלחות רבות - החזרת תמונות משפחתיות 
                יקרות, שחזור מסמכים עסקיים חיוניים, והצלת פרויקטים שלמים.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="font-hebrew text-3xl font-bold mb-6">
            הערכים שלנו
          </h2>
          <p className="font-hebrew text-lg text-muted-foreground max-w-2xl mx-auto">
            העקרונות שמנחים אותנו בכל פרויקט ועם כל לקוח
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-hebrew text-xl">
                    {value.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-hebrew text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tools & Expertise */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-hebrew text-3xl font-bold mb-4">
                הכלים והמומחיות שלנו
              </h2>
              <p className="font-hebrew text-lg text-muted-foreground">
                טכנולוגיה מתקדמת ושנות ניסיון למען התוצאות הטובות ביותר
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-hebrew font-semibold text-lg mb-3">
                  כלי שחזור מתקדמים
                </h3>
                <ul className="font-hebrew text-sm text-muted-foreground space-y-1">
                  <li>אנו משתמשים בכלים</li>
                  <li>המקצועיים ביותר</li>
                  <li>וכן כלים מותאמים אישית</li>
                  <li>שאותם פיתחנו במיוחד</li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="font-hebrew font-semibold text-lg mb-3">
                  סוגי מערכות
                </h3>
                <ul className="font-hebrew text-sm text-muted-foreground space-y-1">
                  <li>Windows (כל הגרסאות)</li>
                  <li>macOS</li>
                  <li>Linux</li>
                  <li>מערכות RAID</li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="font-hebrew font-semibold text-lg mb-3">
                  התמחויות מיוחדות
                </h3>
                <ul className="font-hebrew text-sm text-muted-foreground space-y-1">
                  <li>SSD ו-NVMe</li>
                  <li>כוננים קשיחים ישנים</li>
                  <li>מערכות וירטואליות</li>
                  <li>בסיסי נתונים</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-accent/10 border-accent/20 text-center">
          <CardContent className="p-8">
            <h3 className="font-hebrew text-2xl font-bold mb-4">
              מוכנים להתחיל?
            </h3>
            <p className="font-hebrew text-muted-foreground mb-6">
              בואו נתחיל עם בדיקה חינמית ונראה איך אנחנו יכולים לעזור לכם
            </p>
            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-hebrew touch-target focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="התחל שיחה בוואטסאפ"
            >
              <MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" />
              בואו נתחיל
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    <WhatsAppFloat />
    </>
  );
};