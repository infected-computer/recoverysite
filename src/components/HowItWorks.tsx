
import { Monitor } from 'lucide-react';
import { Link2 } from 'lucide-react';
import { Search } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Monitor,
    title: "הלקוח פונה דרך האתר או וואטסאפ",
    description: "יצירת קשר ראשונית והבנת הבעיה",
    color: "text-primary"
  },
  {
    icon: Link2,
    title: "התחברות עם AnyDesk",
    description: "חיבור מרחוק בטוח למחשב הלקוח",
    color: "text-accent"
  },
  {
    icon: Search,
    title: "סריקה עם R-Studio (גרסת דמו)",
    description: "בדיקה מקצועית של הקבצים הניתנים לשחזור",
    color: "text-success"
  },
  {
    icon: CheckCircle,
    title: "הצגת התוצאות",
    description: "הלקוח רואה את הקבצים לפני התשלום",
    color: "text-warning"
  },
  {
    icon: CreditCard,
    title: "תשלום ושחזור מלא",
    description: "רק לאחר אישור הלקוח מתבצע השחזור הסופי",
    color: "text-primary"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="absolute inset-0 tech-pattern opacity-70"></div>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-1/4 w-28 h-28 bg-gradient-to-br from-primary/12 to-accent/8 rounded-full blur-2xl animate-pulse-soft"></div>
        <div className="absolute bottom-16 left-1/4 w-32 h-32 bg-gradient-to-br from-success/10 to-warning/6 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/6 w-20 h-20 bg-gradient-to-br from-accent/10 to-primary/6 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-hebrew text-3xl md:text-4xl font-bold mb-4 gradient-text-vibrant">
            איך זה עובד?
          </h2>
          <p className="font-hebrew text-lg text-muted-foreground max-w-2xl mx-auto">
            תהליך פשוט ושקוף בחמישה שלבים ברורים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative animate-scale-in stagger-animation"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              {/* Enhanced Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 right-0 w-full h-1 bg-gradient-to-r from-primary/60 via-accent/40 to-success/60 z-0 transform translate-x-1/2 rounded-full shadow-lg"></div>
              )}
              
              {/* Enhanced Step Card */}
              <div className="relative z-10 glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border group-hover:border-primary/30 hover-lift hover-glow">
                {/* Enhanced Step Number */}
                <div className="absolute -top-4 right-4 w-10 h-10 bg-gradient-to-br from-primary via-accent to-success text-white rounded-full flex items-center justify-center font-bold text-sm animate-glow-soft shadow-lg">
                  {index + 1}
                </div>

                {/* Enhanced Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/12 mb-4 group-hover:from-primary/25 group-hover:to-accent/20 transition-all duration-500 shadow-lg`}>
                  <step.icon className={`h-8 w-8 ${step.color} group-hover:scale-110 group-hover:text-accent transition-all duration-300`} />
                </div>

                {/* Enhanced Content */}
                <h3 className="font-hebrew font-semibold text-lg mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-hebrew text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {step.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
