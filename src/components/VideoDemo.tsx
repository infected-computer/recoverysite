import { Play } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Eye } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const VideoDemo = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, ראיתי את הסרטון ואני רוצה לקבל ייעוץ בנוגע לשחזור הקבצים שלי.");
    window.open(`https://wa.me/972123456789?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-hebrew text-3xl md:text-4xl font-bold mb-4">
            רואים בעיניים - שקיפות מלאה
          </h2>
          <p className="font-hebrew text-lg text-muted-foreground max-w-3xl mx-auto">
            סרטון הדגמה של התהליך המלא - כך תוכלו לראות בדיוק איך אנחנו עובדים ומה אתם צפויים לראות
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4 cursor-pointer hover:bg-primary/30 transition-colors">
                  <Play className="h-10 w-10 text-primary mr-1" />
                </div>
                <h3 className="font-hebrew text-xl font-semibold mb-2">
                  סרטון הדגמה מלא
                </h3>
                <p className="font-hebrew text-muted-foreground">
                  צפייה בתהליך השחזור המלא
                </p>
              </div>
            </div>
            
            {/* Video will be embedded here */}
            <div className="mt-4 p-4 bg-card rounded-lg border text-center">
              <p className="font-hebrew text-sm text-muted-foreground">
                <strong>הערה:</strong> הסרטון יהיה זמין בקרוב. בינתיים אתם מוזמנים לפנות אלינו לייעוץ אישי.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <div className="text-right">
              <h3 className="font-hebrew text-2xl font-bold mb-6 text-foreground">
                למה הסרטון הזה חשוב?
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Eye className="h-5 w-5 text-success" />
                </div>
                <div className="text-right">
                  <h4 className="font-hebrew font-semibold mb-2">שקיפות מוחלטת</h4>
                  <p className="font-hebrew text-sm text-muted-foreground">
                    תראו בדיוק איך אנחנו עובדים - ללא סודות או נסיגות
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="text-right">
                  <h4 className="font-hebrew font-semibold mb-2">בטיחות מוכחת</h4>
                  <p className="font-hebrew text-sm text-muted-foreground">
                    האתם דואגים מבחינת אבטחה? הסרטון יראה לכם בדיוק איך אנחנו שומרים על הפרטיות שלכם
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div className="text-right">
                  <h4 className="font-hebrew font-semibold mb-2">הצלחה מוכחת</h4>
                  <p className="font-hebrew text-sm text-muted-foreground">
                    תראו דוגמאות אמיתיות של שחזורים מוצלחים ומה אתם יכולים לצפות
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={openWhatsApp}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-hebrew text-lg py-6 rounded-full"
              >
                רוצה לראות בעיניים? דבר איתנו עכשיו
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card rounded-xl border">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h4 className="font-hebrew font-semibold mb-2">החיבור מאובטח</h4>
            <p className="font-hebrew text-sm text-muted-foreground">
              אנחנו רואים רק את מה שאתם נותנים לנו אישור לראות
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-hebrew font-semibold mb-2">אתם רואים הכל</h4>
            <p className="font-hebrew text-sm text-muted-foreground">
              כל פעולה שאנחנו עושים מתבצעת לעיניכם על המסך
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl border">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <h4 className="font-hebrew font-semibold mb-2">אישור לכל שלב</h4>
            <p className="font-hebrew text-sm text-muted-foreground">
              לא עושים כלום בלי שאתם יודעים ומסכימים מראש
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};