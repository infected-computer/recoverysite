
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "דב כהן",
    role: "עורך דין",
    text: "השירות פשוט הציל לי את הקריירה. קבצים חשובים שנמחקו בטעות חזרו אליי תוך כמה שעות. מקצועי ואמין ביותר!",
    rating: 5
  },
  {
    name: "שרה לוי",
    role: "גרפיקאית עצמאית",
    text: "אחרי שהדיסק הקשיח התקלקל, חשבתי שאיבדתי את כל העבודות שלי. השירות כאן שחזר הכל בצורה מושלמת. תודה רבה!",
    rating: 5
  },
  {
    name: "משה גרין",
    role: "בעל עסק",
    text: "שירות מהיר, יעיל ושקוף. הם הסבירו לי כל שלב בתהליך וגבו תשלום רק לאחר שראיתי שהקבצים אכן חזרו.",
    rating: 5
  },
  {
    name: "רחל אברמוב",
    role: "רואת חשבון",
    text: "ממליצה בחום! איבדתי קבצים חשובים והם שחזרו הכל תוך יום. השירות המרחוק חסך לי זמן ומאמץ.",
    rating: 5
  },
  {
    name: "יוסי פרידמן",
    role: "צלם מקצועי",
    text: "כשכרטיס הזיכרון התקלקל באמצע חתונה, חשבתי שהכל אבוד. הם שחזרו כל התמונות ללא יוצא מן הכלל!",
    rating: 5
  },
  {
    name: "מירי שטרן",
    role: "סטודנטית",
    text: "הפרויקט הגמר שלי נמחק יום לפני ההגשה. תוך שעתיים הכל חזר. אין עליהם!",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Create infinite loop by duplicating testimonials
  const extendedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with customer service imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-overlay-tech"></div>
        <div className="absolute inset-0 tech-pattern-dense opacity-50"></div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-10 w-40 h-40 bg-gradient-to-br from-accent/12 to-primary/8 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-10 w-48 h-48 bg-gradient-to-br from-primary/10 to-success/6 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-gradient-to-br from-warning/8 to-accent/6 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-hebrew text-3xl md:text-4xl font-bold mb-4 gradient-text-vibrant">
            המלצות לקוחות
          </h2>
          <p className="font-hebrew text-lg text-muted-foreground max-w-2xl mx-auto">
            המלצות אמיתיות על השירות שלנו
          </p>
        </div>

        {/* Desktop - 3 testimonials visible */}
        <div className="hidden md:block relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out gap-6"
            style={{ 
              transform: `translateX(${(currentIndex % testimonials.length) * -(100/3)}%)`,
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div 
                key={`desktop-${testimonial.name}-${index}`}
                className="flex-shrink-0 w-1/3"
              >
                <div className="glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary/20 hover-lift hover-glow h-full relative">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-primary/25 to-accent/15 rounded-full p-3 shadow-lg flex-shrink-0">
                      <Quote className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-hebrew text-base text-foreground mb-4 leading-relaxed line-clamp-4">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-hebrew font-semibold text-base text-foreground truncate">
                            {testimonial.name}
                          </h4>
                          <p className="font-hebrew text-sm text-muted-foreground truncate">
                            {testimonial.role}
                          </p>
                        </div>
                        
                        <div className="flex gap-1 flex-shrink-0 ml-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced quote decoration */}
                  <div className="absolute top-3 right-3 text-4xl text-primary/10 font-bold">"</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile - single testimonial */}
        <div className="block md:hidden relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ 
              transform: `translateX(${(currentIndex % testimonials.length) * -100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={`mobile-${testimonial.name}-${index}`}
                className="w-full flex-shrink-0"
              >
                <div className="glass-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary/20 hover-lift hover-glow relative">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-primary/25 to-accent/15 rounded-full p-3 shadow-lg">
                      <Quote className="h-6 w-6 text-primary flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <p className="font-hebrew text-lg text-foreground mb-6 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-hebrew font-semibold text-lg text-foreground">
                            {testimonial.name}
                          </h4>
                          <p className="font-hebrew text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                        
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced quote decoration */}
                  <div className="absolute top-4 right-4 text-6xl text-primary/10 font-bold">"</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex % testimonials.length
                  ? 'bg-primary scale-110' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>

        {/* Enhanced Overall Stats */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="inline-flex items-center gap-8 glass-card rounded-2xl p-8 shadow-xl hover-lift hover-glow border border-primary/20 relative overflow-hidden">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text-vibrant">4.9/5</div>
              <div className="font-hebrew text-sm text-muted-foreground">דירוג ממוצע</div>
              <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full"></div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">97%</div>
              <div className="font-hebrew text-sm text-muted-foreground">שיעור הצלחה</div>
              <div className="w-8 h-1 bg-gradient-to-r from-success to-primary mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
