import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface KeywordData {
  primary: string[];
  secondary: string[];
  longTail: string[];
  semantic: string[];
  local: string[];
}

interface KeywordOptimizerProps {
  /** מילות מפתח לדף הנוכחי */
  keywords: KeywordData;
  /** צפיפות מילות מפתח מומלצת (אחוזים) */
  targetDensity?: number;
  /** האם להוסיף מילות מפתח נסתרות */
  enableHiddenKeywords?: boolean;
  /** האם להוסיף semantic keywords */
  enableSemanticKeywords?: boolean;
  /** האם להוסיף local keywords */
  enableLocalKeywords?: boolean;
  /** האם להוסיף FAQ עם long-tail keywords */
  enableFAQKeywords?: boolean;
}

/**
 * רכיב לאופטימיזציית מילות מפתח וזנבות ארוכים
 * משפר את התוכן עם מילות מפתח רלוונטיות ומבנה SEO אופטימלי
 */
export const KeywordOptimizer: React.FC<KeywordOptimizerProps> = ({
  keywords,
  targetDensity = 2,
  enableHiddenKeywords = true,
  enableSemanticKeywords = true,
  enableLocalKeywords = true,
  enableFAQKeywords = true
}) => {
  const location = useLocation();
  const optimizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // אופטימיזציית תוכן קיים
    optimizeExistingContent();
    
    // הוספת מילות מפתח נסתרות
    if (enableHiddenKeywords) {
      addHiddenKeywords();
    }

    // הוספת semantic keywords
    if (enableSemanticKeywords) {
      addSemanticKeywords();
    }

    // הוספת local keywords
    if (enableLocalKeywords) {
      addLocalKeywords();
    }

    // הוספת FAQ עם long-tail keywords
    if (enableFAQKeywords) {
      addFAQKeywords();
    }

    // ניתוח צפיפות מילות מפתח
    analyzeKeywordDensity();

    // הוספת related searches
    addRelatedSearches();

    // שיפור internal linking
    enhanceInternalLinking();

  }, [keywords, location.pathname]);

  /**
   * אופטימיזציית תוכן קיים
   */
  const optimizeExistingContent = () => {
    const textElements = document.querySelectorAll('p, li, td, span');
    
    textElements.forEach(element => {
      let text = element.textContent || '';
      
      // החלפת מילים דומות במילות מפתח
      keywords.primary.forEach(keyword => {
        const variations = generateKeywordVariations(keyword);
        variations.forEach(variation => {
          const regex = new RegExp(`\\b${variation}\\b`, 'gi');
          if (text.match(regex) && !text.includes(keyword)) {
            text = text.replace(regex, keyword);
          }
        });
      });

      // עדכון התוכן אם השתנה
      if (text !== element.textContent) {
        element.textContent = text;
      }
    });
  };

  /**
   * יצירת וריאציות למילת מפתח
   */
  const generateKeywordVariations = (keyword: string): string[] => {
    const variations = [keyword];
    
    // וריאציות נפוצות בעברית
    const commonVariations: { [key: string]: string[] } = {
      'שחזור קבצים': ['שחזור נתונים', 'שחזור מידע', 'שחזור קבצים דיגיטליים'],
      'שחזור דיסק קשיח': ['שחזור HDD', 'שחזור כונן קשיח', 'תיקון דיסק קשיח'],
      'שחזור כרטיס זיכרון': ['שחזור SD', 'שחזור מיקרו SD', 'שחזור כרטיס זיכרון פגום'],
      'שחזור נתונים מרחוק': ['שחזור קבצים מרחוק', 'שחזור אונליין', 'שירות שחזור מרחוק']
    };

    if (commonVariations[keyword]) {
      variations.push(...commonVariations[keyword]);
    }

    return variations;
  };

  /**
   * הוספת מילות מפתח נסתרות לSEO
   */
  const addHiddenKeywords = () => {
    const existingHidden = document.querySelector('.hidden-keywords');
    if (existingHidden) return;

    const hiddenContainer = document.createElement('div');
    hiddenContainer.className = 'hidden-keywords';
    hiddenContainer.style.cssText = `
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    `;

    // הוספת מילות מפתח ראשיות
    const primaryKeywords = document.createElement('div');
    primaryKeywords.innerHTML = `
      <h2>מילות מפתח ראשיות</h2>
      <p>${keywords.primary.join(', ')}</p>
    `;

    // הוספת זנבות ארוכים
    const longTailKeywords = document.createElement('div');
    longTailKeywords.innerHTML = `
      <h3>זנבות ארוכים</h3>
      <ul>
        ${keywords.longTail.map(keyword => `<li>${keyword}</li>`).join('')}
      </ul>
    `;

    // הוספת מילות מפתח מקומיות
    if (keywords.local.length > 0) {
      const localKeywords = document.createElement('div');
      localKeywords.innerHTML = `
        <h3>מילות מפתח מקומיות</h3>
        <p>${keywords.local.join(', ')}</p>
      `;
      hiddenContainer.appendChild(localKeywords);
    }

    hiddenContainer.appendChild(primaryKeywords);
    hiddenContainer.appendChild(longTailKeywords);

    document.body.appendChild(hiddenContainer);
  };

  /**
   * הוספת semantic keywords
   */
  const addSemanticKeywords = () => {
    if (keywords.semantic.length === 0) return;

    const mainContent = document.querySelector('main, .main-content, article');
    if (!mainContent) return;

    // יצירת סקשן semantic keywords
    const semanticSection = document.createElement('section');
    semanticSection.className = 'semantic-keywords-section';
    semanticSection.innerHTML = `
      <h2 class="sr-only">מונחים קשורים</h2>
      <div class="semantic-keywords">
        ${keywords.semantic.map(keyword => `
          <span class="semantic-keyword">${keyword}</span>
        `).join('')}
      </div>
    `;

    // הוספת סגנונות
    const style = document.createElement('style');
    style.textContent = `
      .semantic-keywords-section {
        margin: 2rem 0;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
      }
      
      .semantic-keywords {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .semantic-keyword {
        background: #e9ecef;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        color: #495057;
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
    `;

    document.head.appendChild(style);
    mainContent.appendChild(semanticSection);
  };

  /**
   * הוספת local keywords
   */
  const addLocalKeywords = () => {
    if (keywords.local.length === 0) return;

    const footer = document.querySelector('footer, .footer');
    if (!footer) return;

    const localSection = document.createElement('div');
    localSection.className = 'local-keywords-section';
    localSection.innerHTML = `
      <h3>אזורי שירות</h3>
      <p>אנו מספקים שירותי שחזור קבצים באזורים הבאים: ${keywords.local.join(', ')}</p>
    `;

    footer.appendChild(localSection);
  };

  /**
   * הוספת FAQ עם long-tail keywords
   */
  const addFAQKeywords = () => {
    if (keywords.longTail.length === 0) return;

    const existingFAQ = document.querySelector('.faq-keywords');
    if (existingFAQ) return;

    const faqSection = document.createElement('section');
    faqSection.className = 'faq-keywords';
    faqSection.innerHTML = `
      <h2>שאלות נפוצות</h2>
      <div class="faq-items">
        ${generateFAQFromLongTail().map(faq => `
          <div class="faq-item">
            <h3 class="faq-question">${faq.question}</h3>
            <div class="faq-answer">
              <p>${faq.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // הוספת סגנונות FAQ
    const style = document.createElement('style');
    style.textContent = `
      .faq-keywords {
        margin: 3rem 0;
        padding: 2rem;
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 8px;
      }
      
      .faq-keywords h2 {
        color: #212529;
        margin-bottom: 1.5rem;
        font-size: 1.75rem;
      }
      
      .faq-item {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e9ecef;
      }
      
      .faq-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      .faq-question {
        color: #495057;
        font-size: 1.125rem;
        margin-bottom: 0.75rem;
        font-weight: 600;
      }
      
      .faq-answer {
        color: #6c757d;
        line-height: 1.6;
      }
    `;

    document.head.appendChild(style);

    const mainContent = document.querySelector('main, .main-content, article');
    if (mainContent) {
      mainContent.appendChild(faqSection);
    }
  };

  /**
   * יצירת FAQ מזנבות ארוכים
   */
  const generateFAQFromLongTail = () => {
    const faqTemplates = [
      {
        pattern: /איך ל(.*)/,
        questionTemplate: 'איך ל$1?',
        answerTemplate: 'כדי ל$1, מומלץ לפנות לשירות מקצועי שיבצע את התהליך בצורה בטוחה ויעילה.'
      },
      {
        pattern: /מה זה (.*)/,
        questionTemplate: 'מה זה $1?',
        answerTemplate: '$1 הוא שירות מקצועי שמטרתו להחזיר נתונים חשובים שאבדו או נפגמו.'
      },
      {
        pattern: /(.*) בישראל/,
        questionTemplate: 'איפה אפשר לקבל $1 בישראל?',
        answerTemplate: 'ניתן לקבל $1 באמצעות שירות מקצועי הפועל בכל רחבי ישראל.'
      },
      {
        pattern: /מחיר (.*)/,
        questionTemplate: 'כמה עולה $1?',
        answerTemplate: 'מחיר $1 משתנה בהתאם לסוג הנזק ומורכבות התהליך. אנו מציעים הערכת מחיר חינמית.'
      }
    ];

    const faqs: Array<{ question: string; answer: string }> = [];

    keywords.longTail.forEach(keyword => {
      faqTemplates.forEach(template => {
        const match = keyword.match(template.pattern);
        if (match) {
          const question = template.questionTemplate.replace('$1', match[1]);
          const answer = template.answerTemplate.replace(/\$1/g, match[1]);
          faqs.push({ question, answer });
        }
      });
    });

    // הוספת FAQs כלליים אם אין מספיק
    if (faqs.length < 3) {
      const defaultFAQs = [
        {
          question: 'כמה זמן לוקח תהליך השחזור?',
          answer: 'תהליך השחזור לוקח בדרך כלל 24-72 שעות, בהתאם למורכבות המקרה וכמות הנתונים.'
        },
        {
          question: 'האם השירות מאובטח?',
          answer: 'כן, אנו משתמשים בפרוטוקולי אבטחה מתקדמים ומתחייבים לשמירה מלאה על פרטיות הנתונים.'
        },
        {
          question: 'מה שיעור ההצלחה?',
          answer: 'שיעור ההצלחה שלנו הוא 95%, והוא משתנה בהתאם לסוג הנזק ומצב המכשיר.'
        }
      ];

      faqs.push(...defaultFAQs.slice(0, 3 - faqs.length));
    }

    return faqs.slice(0, 5); // מקסימום 5 שאלות
  };

  /**
   * ניתוח צפיפות מילות מפתח
   */
  const analyzeKeywordDensity = () => {
    const textContent = document.body.textContent || '';
    const wordCount = textContent.split(/\s+/).length;

    keywords.primary.forEach(keyword => {
      const keywordCount = (textContent.match(new RegExp(keyword, 'gi')) || []).length;
      const density = (keywordCount / wordCount) * 100;

      if (density > targetDensity * 1.5) {
        console.warn(`צפיפות גבוהה מדי למילת המפתח "${keyword}": ${density.toFixed(2)}%`);
      } else if (density < targetDensity * 0.5) {
        console.warn(`צפיפות נמוכה מדי למילת המפתח "${keyword}": ${density.toFixed(2)}%`);
      }
    });
  };

  /**
   * הוספת related searches
   */
  const addRelatedSearches = () => {
    const relatedSearches = generateRelatedSearches();
    if (relatedSearches.length === 0) return;

    const relatedSection = document.createElement('aside');
    relatedSection.className = 'related-searches';
    relatedSection.innerHTML = `
      <h3>חיפושים קשורים</h3>
      <ul class="related-list">
        ${relatedSearches.map(search => `
          <li><a href="/search?q=${encodeURIComponent(search)}">${search}</a></li>
        `).join('')}
      </ul>
    `;

    // הוספת סגנונות
    const style = document.createElement('style');
    style.textContent = `
      .related-searches {
        margin: 2rem 0;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }
      
      .related-searches h3 {
        margin-bottom: 1rem;
        color: #495057;
        font-size: 1.125rem;
      }
      
      .related-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .related-list li {
        margin-bottom: 0.5rem;
      }
      
      .related-list a {
        color: #007bff;
        text-decoration: none;
        font-size: 0.9rem;
      }
      
      .related-list a:hover {
        text-decoration: underline;
      }
    `;

    document.head.appendChild(style);

    const mainContent = document.querySelector('main, .main-content, article');
    if (mainContent) {
      mainContent.appendChild(relatedSection);
    }
  };

  /**
   * יצירת חיפושים קשורים
   */
  const generateRelatedSearches = (): string[] => {
    const related: string[] = [];

    // שילוב מילות מפתח ראשיות עם משניות
    keywords.primary.forEach(primary => {
      keywords.secondary.forEach(secondary => {
        if (primary !== secondary) {
          related.push(`${primary} ${secondary}`);
        }
      });
    });

    // הוספת וריאציות מקומיות
    keywords.local.forEach(location => {
      keywords.primary.forEach(primary => {
        related.push(`${primary} ${location}`);
      });
    });

    return related.slice(0, 8); // מקסימום 8 חיפושים קשורים
  };

  /**
   * שיפור internal linking
   */
  const enhanceInternalLinking = () => {
    const textElements = document.querySelectorAll('p, li');
    
    const internalLinks = [
      { keyword: 'שחזור דיסק קשיח', url: '/שירותים/שחזור-דיסק-קשיח' },
      { keyword: 'שחזור כרטיס זיכרון', url: '/שירותים/שחזור-כרטיס-זיכרון' },
      { keyword: 'שחזור נתונים מרחוק', url: '/שירותים/שחזור-נתונים-מרחוק' },
      { keyword: 'מחירון שחזור', url: '/מחירון-שחזור-קבצים' },
      { keyword: 'יצירת קשר', url: '/יצירת-קשר' }
    ];

    textElements.forEach(element => {
      let html = element.innerHTML;
      
      internalLinks.forEach(link => {
        // בדוק שאין כבר קישור למילה זו
        if (!html.includes(`href="${link.url}"`)) {
          const regex = new RegExp(`\\b${link.keyword}\\b`, 'i');
          if (html.match(regex)) {
            html = html.replace(regex, `<a href="${link.url}">${link.keyword}</a>`);
          }
        }
      });

      if (html !== element.innerHTML) {
        element.innerHTML = html;
      }
    });
  };

  return (
    <div ref={optimizerRef} className="keyword-optimizer" style={{ display: 'none' }}>
      {/* רכיב נסתר שמריץ את האופטימיזציות */}
    </div>
  );
};

/**
 * Hook לאופטימיזציית מילות מפתח
 */
export const useKeywordOptimization = (keywords: KeywordData) => {
  const location = useLocation();

  useEffect(() => {
    // עדכון title עם מילות מפתח
    if (keywords.primary.length > 0) {
      const currentTitle = document.title;
      const primaryKeyword = keywords.primary[0];
      
      if (!currentTitle.includes(primaryKeyword)) {
        document.title = `${primaryKeyword} | ${currentTitle}`;
      }
    }

    // עדכון meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && keywords.primary.length > 0) {
      const currentDescription = metaDescription.getAttribute('content') || '';
      const primaryKeyword = keywords.primary[0];
      
      if (!currentDescription.includes(primaryKeyword)) {
        const newDescription = `${primaryKeyword} - ${currentDescription}`;
        metaDescription.setAttribute('content', newDescription.substring(0, 160));
      }
    }

  }, [keywords, location.pathname]);
};

/**
 * נתוני מילות מפתח לדפים שונים
 */
export const keywordDataMap: { [key: string]: KeywordData } = {
  '/': {
    primary: ['שחזור קבצים', 'שחזור נתונים'],
    secondary: ['שחזור דיסק קשיח', 'שחזור כרטיס זיכרון'],
    longTail: [
      'איך לשחזר קבצים שנמחקו',
      'שחזור קבצים מקצועי בישראל',
      'שירות שחזור נתונים אמין',
      'מחיר שחזור קבצים הוגן',
      'שחזור קבצים מהיר ויעיל'
    ],
    semantic: ['שחזור מידע', 'תיקון נתונים', 'שחזור דיגיטלי', 'הצלת קבצים'],
    local: ['בישראל', 'בתל אביב', 'בירושלים', 'בחיפה']
  },
  '/שירותים/שחזור-דיסק-קשיח': {
    primary: ['שחזור דיסק קשיח', 'תיקון דיסק קשיח'],
    secondary: ['שחזור HDD', 'שחזור כונן קשיח'],
    longTail: [
      'שחזור דיסק קשיח פגום',
      'תיקון דיסק קשיח שלא עובד',
      'שחזור נתונים מדיסק קשיח מקולקל',
      'מחיר שחזור דיסק קשיח',
      'שירות שחזור דיסק קשיח מקצועי'
    ],
    semantic: ['כשל דיסק', 'נזק מכני', 'שחיתות נתונים', 'תיקון HDD'],
    local: ['בישראל', 'בתל אביב', 'בירושלים']
  }
};

/**
 * פונקציה לקבלת מילות מפתח לפי דף
 */
export const getKeywordsForPage = (pathname: string): KeywordData => {
  return keywordDataMap[pathname] || keywordDataMap['/'];
};