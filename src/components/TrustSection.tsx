
import { Shield } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Users } from 'lucide-react';
import { Award } from 'lucide-react';

const trustItems = [
  {
    icon: Clock,
    title: "מעל 7 שנות ניסיון",
    description: "בשחזור קבצים מרחוק"
  },
  {
    icon: Shield,
    title: "100% שחזור מרחוק",
    description: "לא צריך לצאת מהבית"
  },
  {
    icon: Users,
    title: "שירות פרטי ועסקי",
    description: "שירות מותאם לכל צורך"
  },
  {
    icon: Award,
    title: "97% שיעור הצלחה",
    description: "תוצאות מוכחות"
  }
];

export const TrustSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with tech pattern and floating orbs */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat floating-orbs"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-overlay-tech"></div>
        <div className="absolute inset-0 tech-pattern-dense opacity-40"></div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-gradient-to-br from-success/12 to-primary/8 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-accent/8 to-warning/6 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-hebrew text-3xl md:text-4xl font-bold mb-4 gradient-text-vibrant">
            למה לבחור בנו?
          </h2>
          <p className="font-hebrew text-lg text-muted-foreground max-w-2xl mx-auto">
            ניסיון, מקצועיות ואמינות שמובילים לתוצאות
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="text-center group animate-scale-in hover-lift hover-glow stagger-animation"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/25 to-accent/15 rounded-full mb-6 group-hover:from-primary/35 group-hover:to-accent/25 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <item.icon className="h-10 w-10 text-primary group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
              </div>
              
              <h3 className="font-hebrew font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="font-hebrew text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Statistics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          <div className="text-center p-8 glass-card rounded-2xl shadow-xl hover-lift hover-glow transition-all duration-500 border border-primary/20">
            <div className="text-4xl font-bold gradient-text-vibrant mb-2">97%</div>
            <div className="font-hebrew text-lg text-muted-foreground">שיעור הצלחה</div>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="text-center p-8 glass-card rounded-2xl shadow-xl hover-lift hover-glow transition-all duration-500 border border-success/20">
            <div className="text-4xl font-bold text-success mb-2">97%</div>
            <div className="font-hebrew text-lg text-muted-foreground">שיעור הצלחה</div>
            <div className="w-12 h-1 bg-gradient-to-r from-success to-primary mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="text-center p-8 glass-card rounded-2xl shadow-xl hover-lift hover-glow transition-all duration-500 border border-accent/20">
            <div className="text-4xl font-bold text-accent mb-2">7+</div>
            <div className="font-hebrew text-lg text-muted-foreground">שנות ניסיון</div>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-warning mx-auto mt-3 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
