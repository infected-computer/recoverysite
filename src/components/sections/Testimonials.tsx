import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 6000,
  showDots = true,
  showArrows = true,
  className
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isUserInteracting && testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, autoPlayInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isUserInteracting, testimonials.length, autoPlayInterval]);

  const goToNextSlide = () => {
    setIsUserInteracting(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevSlide = () => {
    setIsUserInteracting(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsUserInteracting(true);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsUserInteracting(true);
  };

  const handleMouseLeave = () => {
    setIsUserInteracting(false);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentSlide];
  return (
    <section 
      className={cn(
        "relative overflow-hidden py-20",
        className
      )}
      style={{
        background: `linear-gradient(135deg, 
          var(--color-background-light) 0%, 
          var(--color-background) 50%, 
          var(--color-background-light) 100%
        )`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Tech Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, var(--color-secondary) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, var(--color-primary) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 30px 30px',
            backgroundPosition: '0 0, 15px 15px'
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-primary-redesign/20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary-redesign/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-text-primary-redesign mb-4">
            המלצות לקוחות
          </h3>
          <div 
            className="w-16 h-1 mx-auto rounded-full"
            style={{
              background: 'var(--gradient-secondary)'
            }}
          />
        </div>

        {/* Testimonial Section */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Quote Icon */}
          <div className="mb-8">
            <div 
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-glow"
              style={{
                background: 'var(--gradient-primary)'
              }}
            >
              <svg 
                className="w-8 h-8 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>
          </div>

          {/* Testimonial Content */}
          <div 
            className="testimonial-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Quote Text */}
            <blockquote className="mb-8">
              <p className="text-xl lg:text-2xl text-text-primary-redesign font-medium leading-relaxed mb-6 transition-opacity duration-500">
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="text-center">
              <div className="font-semibold text-text-primary-redesign text-lg mb-1">
                {currentTestimonial.author}
              </div>
              <div className="text-text-secondary-redesign text-sm">
                {currentTestimonial.position}
              </div>
              <div className="text-secondary-redesign text-sm font-medium">
                {currentTestimonial.company}
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 transition-colors duration-300 ${
                    index < currentTestimonial.rating 
                      ? 'text-secondary-redesign' 
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {showArrows && testimonials.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
              <button
                className="testimonial-arrow testimonial-arrow-prev"
                onClick={goToPrevSlide}
                aria-label="המלצה קודמת"
                type="button"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <button
                className="testimonial-arrow testimonial-arrow-next"
                onClick={goToNextSlide}
                aria-label="המלצה הבאה"
                type="button"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          )}

          {/* Navigation Dots */}
          {showDots && testimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`עבור להמלצה ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-secondary-redesign rounded-full opacity-60 animate-float" />
      <div className="absolute bottom-1/3 right-20 w-6 h-6 bg-primary-redesign rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-secondary-redesign rounded-full opacity-50 animate-float" style={{ animationDelay: '1.5s' }} />
      
      {/* CSS Styles */}
      <style jsx="true">{`
        .testimonial-container {
          position: relative;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .testimonial-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(37, 99, 235, 0.2);
          color: #2563eb;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .testimonial-arrow:hover,
        .testimonial-arrow:focus {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
          transform: translateY(-50%) scale(1.1);
          outline: none;
        }

        .testimonial-arrow-prev {
          left: -25px;
        }

        .testimonial-arrow-next {
          right: -25px;
        }

        .testimonial-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.3);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .testimonial-dot:hover,
        .testimonial-dot:focus {
          background: rgba(37, 99, 235, 0.6);
          transform: scale(1.2);
          outline: none;
        }

        .testimonial-dot.active {
          background: #2563eb;
          transform: scale(1.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .testimonial-arrow {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .testimonial-arrow-prev {
            left: -20px;
          }

          .testimonial-arrow-next {
            right: -20px;
          }

          .testimonial-dot {
            width: 10px;
            height: 10px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
export type { TestimonialsProps, Testimonial };