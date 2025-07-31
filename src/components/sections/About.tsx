import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../shared/Button';

interface AboutProps {
  title?: string;
  content: string;
  image?: string;
  ctaText?: string;
  ctaAction?: () => void;
  className?: string;
  stats?: Array<{
    number: string;
    label: string;
  }>;
}

const About: React.FC<AboutProps> = ({
  title = "קצת עלינו",
  content,
  image,
  ctaText = "קרא עוד",
  ctaAction,
  className,
  stats
}) => {
  return (
    <section 
      className={cn(
        "relative overflow-hidden py-20",
        className
      )}
      style={{
        background: 'var(--color-background-section)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, var(--color-secondary) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, var(--color-primary) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-secondary-redesign/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-primary-redesign/15 rounded-full blur-2xl animate-float-medium" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Text Content - Right Side */}
          <div className="order-2 lg:order-1 space-y-6">
            
            {/* Title */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-dark-redesign mb-4">
                {title}
              </h2>
              <div 
                className="w-16 h-1 rounded-full"
                style={{
                  background: 'var(--gradient-secondary)'
                }}
              />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-lg text-text-muted-redesign leading-relaxed">
                {content}
              </p>

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6 py-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-right">
                      <div className="text-3xl font-bold text-primary-redesign mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-text-muted-redesign">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            {ctaAction && (
              <div className="pt-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={ctaAction}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  {ctaText}
                </Button>
              </div>
            )}
          </div>

          {/* Image Content - Left Side */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-strong">
                
                {/* Image */}
                {image ? (
                  <img
                    src={image}
                    alt={`תמונה המייצגת את ${title} - צוות מקצועי לשחזור נתונים`}
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                ) : (
                  // Placeholder with tech pattern
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-brand-green rounded-2xl flex items-center justify-center">
                        <svg 
                          className="w-12 h-12 text-dark" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div className="text-dark font-medium">התמונה שלנו</div>
                    </div>
                  </div>
                )}

                {/* Overlay Pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary-redesign rounded-full opacity-60 animate-float shadow-glow-green" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-redesign rounded-full opacity-70 animate-float shadow-glow" style={{ animationDelay: '1s' }} />
              
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-secondary-redesign/10 rounded-full blur-2xl animate-float-slow animate-pulse-soft" />
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary-redesign/15 rounded-full blur-xl animate-float hover-glow" style={{ animationDelay: '2s' }} />
              
              {/* Additional floating particles */}
              <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-secondary-redesign/8 rounded-full blur-lg animate-float-fast opacity-70" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/2 right-1/2 w-12 h-12 bg-primary-redesign/12 rounded-full blur-md animate-float opacity-50" style={{ animationDelay: '3s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Element for Next Section */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border border-border-light-redesign shadow-glow"
          style={{
            background: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--gradient-secondary)'
            }}
          >
            <svg 
              className="w-4 h-4 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
export type { AboutProps };