import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../shared/Button';
import RequestForm from '../forms/RequestForm';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaAction: () => void;
  backgroundImage?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaAction,
  backgroundImage,
  className
}) => {
  return (
    <section 
      className={cn(
        "relative min-h-screen overflow-hidden",
        "flex items-center justify-center",
        className
      )}
      style={{
        background: `
          linear-gradient(135deg, 
            var(--color-background) 0%, 
            var(--color-background-light) 50%, 
            var(--color-background) 100%
          )
        `
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Tech Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, var(--color-primary) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        
        {/* Floating Orbs - without pulse */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-redesign rounded-full blur-xl animate-float-slow opacity-20" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-secondary-redesign rounded-full blur-lg animate-float-medium opacity-25" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-redesign rounded-full blur-md animate-float-fast opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-secondary-redesign rounded-full blur-lg animate-float-medium opacity-30" style={{ animationDelay: '3s' }} />
      </div>

      {/* Subtle Background Image - Always show a data recovery themed image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-bg-redesign/95 via-bg-light-redesign/90 to-bg-redesign/95" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-right space-y-6">
            
            {/* Title */}
            <h1 
              className={cn(
                "text-5xl lg:text-6xl font-bold leading-tight",
                "animate-gradient"
              )}
              style={{
                background: `linear-gradient(135deg, 
                  var(--color-text-primary) 0%, 
                  var(--color-primary) 30%, 
                  var(--color-secondary) 60%, 
                  var(--color-text-primary) 100%
                )`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%'
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p 
              className={cn(
                "text-lg lg:text-xl text-text-secondary-redesign max-w-2xl mx-auto lg:mx-0",
                "leading-relaxed"
              )}
            >
              {subtitle}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={ctaAction}
                className="hover:scale-105 transition-transform duration-300"
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="relative z-10">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-redesign rounded-full opacity-60 animate-pulse-soft shadow-glow" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary-redesign rounded-full opacity-70 animate-pulse-soft shadow-glow-green" style={{ animationDelay: '1s' }} />
              
              {/* Request Form */}
              <div className="w-full max-w-lg mx-auto">
                <RequestForm className="shadow-2xl" />
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-0 w-32 h-32 bg-primary-redesign/20 rounded-full blur-2xl animate-float" />
              <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-secondary-redesign/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Wave Transition to Next Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-16" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            style={{
              fill: 'var(--color-background-section)'
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;