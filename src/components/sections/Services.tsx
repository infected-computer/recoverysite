import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../shared/Card';
import { useScrollAnimation } from '../../hooks/useScrollOptimization';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  link?: string;
  onLinkClick?: () => void;
}

interface ServicesProps {
  title?: string;
  services: ServiceItem[];
  className?: string;
}

const Services: React.FC<ServicesProps> = ({
  title = "השירותים שלנו",
  services,
  className
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  useScrollAnimation(sectionRef, 'animate-fade-in-up');
  useScrollAnimation(titleRef, 'animate-fade-in-down');

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden py-20 opacity-0",
        className
      )}
      style={{
        background: 'var(--color-background-section)'
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, var(--color-primary) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, var(--color-secondary) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary-redesign/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary-redesign/15 rounded-full blur-2xl animate-float-medium" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary-redesign/8 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-dark-redesign mb-6">
            {title}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'var(--gradient-primary)'
            }}
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={service.id} className="h-full">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                bullets={service.bullets}
                link={service.link}
                onLinkClick={service.onLinkClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Card Component
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  link?: string;
  onLinkClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  bullets,
  link = "קרא עוד >",
  onLinkClick
}) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      
      {/* Icon */}
      <div className="mb-4">
        <div className="text-4xl text-primary-redesign group-hover:text-secondary-redesign transition-colors duration-300 mb-4">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-text-dark-redesign group-hover:text-text-primary-redesign transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Description */}
      <div className="flex-grow">
        <p className="text-base leading-relaxed text-text-muted-redesign group-hover:text-text-secondary-redesign transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Bullets */}
      <div className="my-4 space-y-2">
        {bullets.map((bullet, index) => (
          <div key={index} className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-600">{bullet}</span>
          </div>
        ))}
      </div>

      {/* Link */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleLinkClick}
          className={cn(
            "w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg",
            "hover:bg-blue-700 transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          )}
        >
          לפרטים וקבלת אבחון חינם
        </button>
      </div>
    </Card>
  );
};

export default Services;
export { ServiceCard };
export type { ServicesProps, ServiceItem };