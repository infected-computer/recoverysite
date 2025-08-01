/**
 * Accessibility testing suite using axe-core
 */

import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock components for testing
const createTestComponent = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
};

describe('Accessibility Tests', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Form Accessibility', () => {
    test('Contact form should be accessible', async () => {
      const container = createTestComponent(`
        <form>
          <label for="name">שם מלא *</label>
          <input id="name" name="name" type="text" required aria-required="true" />
          
          <label for="phone">מספר טלפון *</label>
          <input id="phone" name="phone" type="tel" required aria-required="true" />
          
          <label for="message">הודעה *</label>
          <textarea id="message" name="message" required aria-required="true"></textarea>
          
          <button type="submit">שלח פנייה</button>
        </form>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('Form with errors should be accessible', async () => {
      const container = createTestComponent(`
        <form>
          <label for="name">שם מלא *</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            required 
            aria-required="true"
            aria-invalid="true"
            aria-describedby="name-error"
          />
          <div id="name-error" role="alert" aria-live="polite">
            שם מלא הוא שדה חובה
          </div>
          
          <button type="submit">שלח פנייה</button>
        </form>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Navigation Accessibility', () => {
    test('Main navigation should be accessible', async () => {
      const container = createTestComponent(`
        <nav role="navigation" aria-label="ניווט ראשי">
          <ul>
            <li><a href="/" aria-current="page">דף הבית</a></li>
            <li><a href="/pricing">מחירון</a></li>
            <li><a href="/about">מי אנחנו</a></li>
            <li><a href="/contact">יצירת קשר</a></li>
          </ul>
        </nav>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('Mobile menu should be accessible', async () => {
      const container = createTestComponent(`
        <div>
          <button 
            aria-expanded="false" 
            aria-controls="mobile-menu"
            aria-label="פתח תפריט ניווט"
          >
            תפריט
          </button>
          
          <div id="mobile-menu" role="dialog" aria-labelledby="menu-title">
            <h2 id="menu-title">תפריט ניווט</h2>
            <nav role="navigation">
              <a href="/">דף הבית</a>
              <a href="/pricing">מחירון</a>
            </nav>
          </div>
        </div>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Content Accessibility', () => {
    test('FAQ section should be accessible', async () => {
      const container = createTestComponent(`
        <section aria-labelledby="faq-title">
          <h2 id="faq-title">שאלות נפוצות</h2>
          
          <div role="list">
            <div role="listitem">
              <button 
                id="faq-button-1"
                aria-expanded="false"
                aria-controls="faq-panel-1"
              >
                מה שיעור ההצלחה?
              </button>
              
              <div 
                id="faq-panel-1"
                role="region"
                aria-labelledby="faq-button-1"
                hidden
              >
                שיעור ההצלחה שלנו הוא 97%
              </div>
            </div>
          </div>
        </section>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('Images should have proper alt text', async () => {
      const container = createTestComponent(`
        <div>
          <img src="hero.jpg" alt="תמונת נושא: שירותי שחזור נתונים מקצועיים" />
          <img src="decoration.jpg" alt="" aria-hidden="true" />
          <img src="team.jpg" alt="צוות מקצועי לשחזור נתונים" />
        </div>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast', () => {
    test('Text should have sufficient contrast', async () => {
      const container = createTestComponent(`
        <div>
          <p style="color: #1e293b; background: #ffffff;">טקסט עיקרי</p>
          <p style="color: #475569; background: #ffffff;">טקסט משני</p>
          <p style="color: #64748b; background: #ffffff;">טקסט מעומעם</p>
          <button style="color: #ffffff; background: #0284c7;">כפתור עיקרי</button>
        </div>
      `);

      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('Focus Management', () => {
    test('Interactive elements should be focusable', async () => {
      const container = createTestComponent(`
        <div>
          <button>כפתור רגיל</button>
          <a href="/test">קישור</a>
          <input type="text" />
          <textarea></textarea>
          <select><option>אפשרות</option></select>
        </div>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

// Manual testing checklist
export const manualTestingChecklist = [
  {
    category: 'Keyboard Navigation',
    tests: [
      'Tab through all interactive elements',
      'Use arrow keys in menus and lists',
      'Press Enter/Space on buttons and links',
      'Use Escape to close modals/menus',
      'Ensure focus is visible at all times',
      'Check focus order is logical'
    ]
  },
  {
    category: 'Screen Reader Testing',
    tests: [
      'Test with NVDA (Windows)',
      'Test with JAWS (Windows)', 
      'Test with VoiceOver (Mac)',
      'Verify all content is announced',
      'Check heading structure (H1-H6)',
      'Verify form labels are read correctly',
      'Test error messages are announced',
      'Check live regions work properly'
    ]
  },
  {
    category: 'Visual Testing',
    tests: [
      'Test at 200% zoom level',
      'Test in high contrast mode',
      'Test with Windows High Contrast',
      'Verify color is not the only indicator',
      'Check focus indicators are visible',
      'Test with different font sizes'
    ]
  },
  {
    category: 'Mobile Accessibility',
    tests: [
      'Test touch targets (minimum 44px)',
      'Test with screen reader on mobile',
      'Verify swipe gestures work',
      'Check orientation changes',
      'Test with voice control',
      'Verify zoom functionality'
    ]
  }
];

// Accessibility audit report generator
export const generateAccessibilityReport = async (element: HTMLElement) => {
  const results = await axe(element);
  
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    violations: results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
      helpUrl: violation.helpUrl,
      nodes: violation.nodes.length,
      tags: violation.tags
    })),
    passes: results.passes.length,
    incomplete: results.incomplete.length,
    inapplicable: results.inapplicable.length,
    score: calculateAccessibilityScore(results)
  };

  return report;
};

const calculateAccessibilityScore = (results: any): number => {
  const totalTests = results.violations.length + results.passes.length;
  if (totalTests === 0) return 100;
  
  const weightedViolations = results.violations.reduce((sum: number, violation: any) => {
    const weights = { critical: 4, serious: 3, moderate: 2, minor: 1 };
    return sum + (weights[violation.impact as keyof typeof weights] || 1);
  }, 0);
  
  const maxPossibleScore = totalTests * 4; // Assuming all could be critical
  const score = Math.max(0, ((maxPossibleScore - weightedViolations) / maxPossibleScore) * 100);
  
  return Math.round(score);
};