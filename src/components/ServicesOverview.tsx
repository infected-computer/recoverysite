
import { HardDrive } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { Monitor } from 'lucide-react';
import { Database } from 'lucide-react';
import { FileX } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: HardDrive,
    title: "שחזור דיסק קשיח",
    description: "שחזור קבצים מדיסקים קשיחים פגומים או מקולקלים",
    features: ["HDD ו-SSD", "נזק לוגי", "כל הגדלים"]
  },
  {
    icon: FileX,
    title: "מחיקה בטעות",
    description: "שחזור קבצים שנמחקו בטעות או בעקבות ניקוי מערכת",
    features: ["מחיקה ידנית", "ניקוי אוטומטי", "פורמט בטעות"]
  },
  {
    icon: HardDrive,
    title: "כרטיסי זיכרון",
    description: "שחזור מכרטיסי זיכרון ודיסקים אונקיים",
    features: ["SD ו-MicroSD", "כרטיסי CF", "דיסקים אונקיים"]
  },
  {
    icon: Monitor,
    title: "מחשבים אישיים",
    description: "שחזור מכל סוגי המחשבים האישיים",
    features: ["Windows ו-Mac", "Linux", "מחשבים ביתיים"]
  }
];

export const ServicesOverview = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with tech imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 gradient-overlay-vibrant"></div>
        <div className="absolute inset-0 tech-pattern opacity-60"></div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 floating-shapes">
        <div className="absolute top-16 right-20 w-32 h-32 bg-gradient-to-br from-primary/12 to-accent/8 rounded-full blur-2xl animate-pulse-soft"></div>
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-gradient-to-br from-success/10 to-warning/6 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-accent/8 to-primary/6 rounded-full blur-lg animate-pulse-soft" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-hebrew text-3xl md:text-4xl font-bold mb-4 gradient-text-vibrant">
            השירותים שלנו
          </h2>
          <p className="font-hebrew text-lg text-muted-foreground max-w-2xl mx-auto">
            פתרונות שחזור נתונים מקצועיים לכל סוגי הבעיות והמכשירים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group glass-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary/30 hover-lift hover-tilt animate-scale-in stagger-animation"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              {/* Enhanced Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/15 to-accent/12 rounded-2xl mb-6 group-hover:from-primary/25 group-hover:to-accent/20 transition-all duration-500 animate-glow-soft shadow-lg">
                <service.icon className="h-8 w-8 text-primary group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
              </div>

              {/* Title & Description */}
              <h3 className="font-hebrew font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-hebrew text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {service.description}
              </p>

              {/* Enhanced Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-hebrew text-sm group-hover:text-foreground transition-colors duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="glass-card gradient-bg rounded-2xl p-8 border border-primary/30 text-white hover-lift hover-glow shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-hebrew text-2xl font-bold mb-4">
                רוצה לדעת איך התהליך עובד?
              </h3>
              <p className="font-hebrew text-lg mb-6 max-w-2xl mx-auto opacity-95">
                צפה בהסבר המפורט עם צילומי מסך של כל שלב בתהליך שחזור הקבצים
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/95 font-hebrew text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 micro-bounce"
              >
                <Link to="/process">
                  צפה בתהליך המלא
                </Link>
              </Button>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
