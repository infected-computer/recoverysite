import React, { useState, useEffect } from 'react';
import RequestForm from '../forms/RequestForm';
import background1 from '../../assets/background1.webp';

// Interfaces remain the same for data structure consistency
interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  ctaAriaLabel: string;
  longTailKeywords: string[];
  background: string;
}

// Props for the new static Hero component
interface HeroSectionProps {
  slide: HeroSlide;
  className?: string;
}

/**
 * רכיב Hero סטטי מותאם לSEO ונגישות
 * מציג שקופית אחת עם תוכן מרכזי
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  slide,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simple image loading
  useEffect(() => {
    const img = new Image();
    img.src = slide.background;
    img.onload = () => setIsLoaded(true);
  }, [slide.background]);

  return (
    <section
      className={`hero-slider ${className}`} // Keep class for existing styles
      role="region"
      aria-labelledby="hero-title"
      style={{ '--bg-image': `url(${slide.background})` } as React.CSSProperties}
    >
      <div className="slide-container">
        <div className="slide-content">
          
          {/* תוכן טקסטואלי בצד ימין */}
          <div className="slide-text-right">
            <header className="slide-header">
              <h1 id="hero-title" className="slide-title">
                {slide.title}
                <span className="sr-only">
                  {slide.keywords.join(', ')}
                </span>
              </h1>

              <h2 className="slide-subtitle">
                {slide.subtitle}
              </h2>

              <div className="slide-description">
                <p>{slide.description}</p>
                <div className="long-tail-keywords" aria-hidden="true">
                  {slide.longTailKeywords.map((keyword, index) => (
                    <span key={index} className="sr-only">{keyword}</span>
                  ))}
                </div>
              </div>
            </header>

            <div className="slide-cta">
              <a
                href={slide.ctaLink}
                className="cta-button"
                aria-label={slide.ctaAriaLabel}
                role="button"
              >
                <span className="cta-text">{slide.ctaText}</span>
                <span className="cta-icon" aria-hidden="true">←</span>
              </a>
            </div>
          </div>

          {/* טופס יצירת קשר בצד שמאל */}
          <div className="slide-form-left">
            <RequestForm compact={true} className="hero-form shadow-2xl" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-slider {
          position: relative;
          width: 100%;
          height: 80vh;
          min-height: 600px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          outline: none;
        }

        .hero-slider::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: var(--bg-image);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: ${isLoaded ? 1 : 0}; /* Simplified opacity logic */
          z-index: 1;
          transition: opacity 1s ease-in-out;
        }

        .hero-slider::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, rgba(230, 245, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
            z-index: 1;
        }

        .slide-container {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          z-index: 2;
        }

        .slide-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr; /* Give more space to text */
          gap: 60px;
          align-items: start; /* Align content to the top */
          padding-top: 8vh; /* Push content down from the top */
          justify-content: center;
        }

        .slide-form-left {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align form to the left */
          order: 2;
        }

        .hero-form {
          width: 100%;
          max-width: 360px; /* Make form narrower */
        }

        .slide-text-right {
          position: relative;
          text-align: right;
          color: #000000;
          padding: 40px;
          order: 1;
          direction: rtl;
        }

        .slide-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.2;
          color: #000000;
        }

        .slide-subtitle {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 500;
          margin: 0 0 1.5rem 0;
          color: #333333;
          line-height: 1.4;
        }

        .slide-description {
          font-size: clamp(1rem, 1.5vw, 1.3rem);
          line-height: 1.7;
          margin: 0 0 2.5rem 0;
          color: #555555;
        }

        .slide-cta {
          margin-top: 2rem;
          text-align: right;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-primary); /* Use CSS variable for consistency */
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
          border: none;
        }

        .cta-button:hover,
        .cta-button:focus {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.4);
          outline: none;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .long-tail-keywords {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-slider {
            height: auto;
            min-height: 500px;
            padding: 20px 0;
          }

          .slide-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          .slide-form-left {
            order: 2;
            max-width: 400px;
            margin: 0 auto;
            justify-content: center;
          }

          .slide-text-right {
            order: 1;
            text-align: center;
            padding: 20px;
            direction: ltr;
          }

          .slide-cta {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .slide-container {
            padding: 0 10px;
          }

          .slide-text-right {
            padding: 15px;
          }

          .slide-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem);
          }
        }
      `}</style>
    </section>
  );
};

/**
 * נתוני השקף היחיד
 */
export const heroSlideData: HeroSlide = {
    id: 'hard-drive-recovery',
    title: 'שחזור נתונים אונליין תוך שעה בלי לצאת מהבית',
    subtitle: 'שחזור נתונים במהירות באמצעות תמיכה מרחוק',
    description: 'צוות מומחים ישחזר לכם את הקבצים החשובים לכם במהירות במחיר  הוגן ובמהירות ונוחות שלא תמצאו בשום מקום אחר',
    keywords: ['שחזור דיסק קשיח', 'שחזור נתונים', 'תיקון דיסק קשיח'],
    longTailKeywords: [
      'שחזור דיסק קשיח פגום בישראל',
      'תיקון דיסק קשיח שלא עובד',
      'שחזור נתונים מדיסק קשיח מקולקל',
      'מומחה שחזור דיסקים קשיחים',
      'שירות שחזור דיסק קשיח מהיר',
      'שחזור קבצים מדיסק HDD פגום'
    ],
    image: '/src/assets/hero-data-recovery.jpg',
    imageAlt: 'דיסק קשיח פתוח עם רכיבים פנימיים חשופים במעבדה טכנית מקצועית',
    ctaText: 'צור קשר עם טכנאי לתיאום בדיקה',
    ctaLink: '/contact',
    ctaAriaLabel: 'פנו אלינו לקבלת הערכת מחיר חינמית לשחזור דיסק קשיח',
    background: background1
};

/**
 * רכיב Hero מותאם לדף הבית
 */
export const HomePageHero: React.FC = () => {
  return (
    <HeroSection
      slide={heroSlideData}
      className="homepage-hero"
    />
  );
};