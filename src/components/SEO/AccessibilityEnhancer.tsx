import React, { useEffect, useRef } from 'react';

interface AccessibilityEnhancerProps {
  /** האם להוסיף skip links */
  enableSkipLinks?: boolean;
  /** האם להוסיף landmark roles */
  enableLandmarks?: boolean;
  /** האם להוסיף heading structure */
  enableHeadingStructure?: boolean;
  /** האם להוסיף focus management */
  enableFocusManagement?: boolean;
  /** האם להוסיף ARIA labels אוטומטיים */
  enableAutoAria?: boolean;
  /** האם להוסיף keyboard navigation */
  enableKeyboardNav?: boolean;
}

/**
 * רכיב לשיפור נגישות האתר ותגי SEO
 * מוסיף אוטומטית תכונות נגישות ומשפר את מבנה ה-HTML
 */
export const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({
  enableSkipLinks = true,
  enableLandmarks = true,
  enableHeadingStructure = true,
  enableFocusManagement = true,
  enableAutoAria = true,
  enableKeyboardNav = true
}) => {
  const enhancerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // הוספת skip links
    if (enableSkipLinks) {
      addSkipLinks();
    }

    // שיפור landmarks
    if (enableLandmarks) {
      enhanceLandmarks();
    }

    // שיפור מבנה כותרות
    if (enableHeadingStructure) {
      enhanceHeadingStructure();
    }

    // שיפור ניהול focus
    if (enableFocusManagement) {
      enhanceFocusManagement();
    }

    // הוספת ARIA labels אוטומטיים
    if (enableAutoAria) {
      addAutoAriaLabels();
    }

    // שיפור keyboard navigation
    if (enableKeyboardNav) {
      enhanceKeyboardNavigation();
    }

    // הוספת live region לעדכונים דינמיים
    addLiveRegion();

    // שיפור טפסים
    enhanceForms();

    // שיפור קישורים
    enhanceLinks();

    // שיפור תמונות
    enhanceImages();

    // הוספת breadcrumb navigation
    enhanceBreadcrumbs();

  }, [enableSkipLinks, enableLandmarks, enableHeadingStructure, enableFocusManagement, enableAutoAria, enableKeyboardNav]);

  /**
   * הוספת skip links לניווט מהיר
   */
  const addSkipLinks = () => {
    const existingSkipLinks = document.querySelector('.skip-links');
    if (existingSkipLinks) return;

    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#main-content" class="skip-link">דלג לתוכן הראשי</a>
      <a href="#main-navigation" class="skip-link">דלג לניווט הראשי</a>
      <a href="#search" class="skip-link">דלג לחיפוש</a>
      <a href="#footer" class="skip-link">דלג לתחתית הדף</a>
    `;

    // הוספת סגנונות
    const style = document.createElement('style');
    style.textContent = `
      .skip-links {
        position: absolute;
        top: -100px;
        left: 0;
        z-index: 10000;
      }
      
      .skip-link {
        position: absolute;
        top: -100px;
        left: 10px;
        background: #000;
        color: #fff;
        padding: 10px 15px;
        text-decoration: none;
        border-radius: 0 0 5px 5px;
        font-weight: bold;
        transition: top 0.3s ease;
      }
      
      .skip-link:focus {
        top: 0;
        outline: 2px solid #fff;
        outline-offset: 2px;
      }
    `;

    document.head.appendChild(style);
    document.body.insertBefore(skipLinks, document.body.firstChild);
  };

  /**
   * שיפור landmarks ו-roles
   */
  const enhanceLandmarks = () => {
    // הוספת role="main" לתוכן הראשי
    const mainContent = document.querySelector('main, #main-content, .main-content');
    if (mainContent && !mainContent.getAttribute('role')) {
      mainContent.setAttribute('role', 'main');
      mainContent.setAttribute('id', 'main-content');
    }

    // הוספת role="navigation" לניווט
    const navElements = document.querySelectorAll('nav, .navigation, .nav');
    navElements.forEach((nav, index) => {
      if (!nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
      if (!nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', index === 0 ? 'ניווט ראשי' : `ניווט ${index + 1}`);
      }
      if (index === 0) {
        nav.setAttribute('id', 'main-navigation');
      }
    });

    // הוספת role="banner" לheader
    const header = document.querySelector('header, .header');
    if (header && !header.getAttribute('role')) {
      header.setAttribute('role', 'banner');
    }

    // הוספת role="contentinfo" לfooter
    const footer = document.querySelector('footer, .footer');
    if (footer && !footer.getAttribute('role')) {
      footer.setAttribute('role', 'contentinfo');
      footer.setAttribute('id', 'footer');
    }

    // הוספת role="search" לחיפוש
    const searchElements = document.querySelectorAll('.search, [type="search"], .search-form');
    searchElements.forEach((search, index) => {
      if (!search.getAttribute('role')) {
        search.setAttribute('role', 'search');
      }
      if (index === 0) {
        search.setAttribute('id', 'search');
      }
    });

    // הוספת role="complementary" לsidebar
    const sidebars = document.querySelectorAll('.sidebar, .aside, aside');
    sidebars.forEach(sidebar => {
      if (!sidebar.getAttribute('role')) {
        sidebar.setAttribute('role', 'complementary');
      }
    });
  };

  /**
   * שיפור מבנה כותרות
   */
  const enhanceHeadingStructure = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    let h1Count = 0;

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      
      // בדיקת H1 יחיד
      if (level === 1) {
        h1Count++;
        if (h1Count > 1) {
          console.warn('נמצא יותר מ-H1 אחד בדף - לא מומלץ לSEO');
        }
      }

      // בדיקת רצף כותרות
      if (level > currentLevel + 1) {
        console.warn(`דילוג ברצף כותרות: מ-H${currentLevel} ל-H${level}`);
      }

      currentLevel = level;

      // הוספת ID אוטומטי לכותרות
      if (!heading.id) {
        const text = heading.textContent || '';
        const id = text
          .toLowerCase()
          .replace(/[^\u0590-\u05FFa-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50);
        
        if (id) {
          heading.id = id;
        }
      }

      // הוספת tabindex לכותרות לניווט מקלדת
      if (!heading.getAttribute('tabindex')) {
        heading.setAttribute('tabindex', '-1');
      }
    });

    // יצירת table of contents אוטומטי
    createTableOfContents();
  };

  /**
   * יצירת תוכן עניינים אוטומטי
   */
  const createTableOfContents = () => {
    const headings = document.querySelectorAll('h2, h3, h4');
    if (headings.length < 3) return;

    const tocContainer = document.querySelector('.table-of-contents');
    if (tocContainer || headings.length === 0) return;

    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.setAttribute('aria-label', 'תוכן עניינים');
    
    const tocTitle = document.createElement('h2');
    tocTitle.textContent = 'תוכן עניינים';
    tocTitle.className = 'toc-title';
    
    const tocList = document.createElement('ol');
    tocList.className = 'toc-list';

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-level-${level}`;
      
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent || '';
      link.className = 'toc-link';
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    toc.appendChild(tocTitle);
    toc.appendChild(tocList);

    // הכנס לפני התוכן הראשי
    const mainContent = document.querySelector('main, .main-content');
    if (mainContent && mainContent.firstChild) {
      mainContent.insertBefore(toc, mainContent.firstChild);
    }
  };

  /**
   * שיפור ניהול focus
   */
  const enhanceFocusManagement = () => {
    // הוספת focus visible styles
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }
      
      *:focus:not(:focus-visible) {
        outline: none;
      }
      
      *:focus-visible {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);

    // ניהול focus בmodals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal.active, .popup.active');
        if (modal) {
          const closeButton = modal.querySelector('.close, .modal-close');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        }
      }
    });

    // focus trap בmodals
    const modals = document.querySelectorAll('.modal, .popup');
    modals.forEach(modal => {
      modal.addEventListener('keydown', trapFocus);
    });
  };

  /**
   * Trap focus בתוך modal
   */
  const trapFocus = (e: Event) => {
    const event = e as KeyboardEvent;
    if (event.key !== 'Tab') return;

    const modal = event.currentTarget as HTMLElement;
    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  /**
   * הוספת ARIA labels אוטומטיים
   */
  const addAutoAriaLabels = () => {
    // כפתורים ללא טקסט
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      const text = button.textContent?.trim();
      if (!text || text.length < 2) {
        const icon = button.querySelector('i, .icon, svg');
        if (icon) {
          button.setAttribute('aria-label', 'כפתור');
        }
      }
    });

    // קישורים ללא טקסט
    const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
    links.forEach(link => {
      const text = link.textContent?.trim();
      if (!text || text.length < 2) {
        const href = link.getAttribute('href');
        if (href) {
          link.setAttribute('aria-label', `קישור ל-${href}`);
        }
      }
    });

    // שדות טופס
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label && !input.getAttribute('placeholder')) {
        const type = input.getAttribute('type') || 'text';
        input.setAttribute('aria-label', `שדה ${type}`);
      }
    });
  };

  /**
   * שיפור keyboard navigation
   */
  const enhanceKeyboardNavigation = () => {
    // הוספת keyboard support לelements אינטראקטיביים
    const interactiveElements = document.querySelectorAll('.clickable, .interactive');
    interactiveElements.forEach(element => {
      if (!element.getAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
      
      element.addEventListener('keydown', (e) => {
        const event = e as KeyboardEvent;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          (element as HTMLElement).click();
        }
      });
    });

    // ניווט בחצים בmenus
    const menus = document.querySelectorAll('.menu, .dropdown-menu');
    menus.forEach(menu => {
      const items = menu.querySelectorAll('a, button');
      
      items.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
          const event = e as KeyboardEvent;
          let nextIndex = index;
          
          switch (event.key) {
            case 'ArrowDown':
              event.preventDefault();
              nextIndex = (index + 1) % items.length;
              break;
            case 'ArrowUp':
              event.preventDefault();
              nextIndex = (index - 1 + items.length) % items.length;
              break;
            case 'Home':
              event.preventDefault();
              nextIndex = 0;
              break;
            case 'End':
              event.preventDefault();
              nextIndex = items.length - 1;
              break;
          }
          
          if (nextIndex !== index) {
            (items[nextIndex] as HTMLElement).focus();
          }
        });
      });
    });
  };

  /**
   * הוספת live region לעדכונים דינמיים
   */
  const addLiveRegion = () => {
    const existingLiveRegion = document.querySelector('#live-region');
    if (existingLiveRegion) return;

    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';

    document.body.appendChild(liveRegion);

    // פונקציה גלובלית להודעות
    (window as any).announceToScreenReader = (message: string) => {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    };
  };

  /**
   * שיפור טפסים
   */
  const enhanceForms = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // הוספת novalidate לטפסים עם validation מותאם
      if (!form.getAttribute('novalidate')) {
        form.setAttribute('novalidate', 'true');
      }

      // שיפור שדות טופס
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        // הוספת autocomplete מתאים
        const type = input.getAttribute('type');
        const name = input.getAttribute('name');
        
        if (type === 'email' && !input.getAttribute('autocomplete')) {
          input.setAttribute('autocomplete', 'email');
        }
        if (type === 'tel' && !input.getAttribute('autocomplete')) {
          input.setAttribute('autocomplete', 'tel');
        }
        if (name === 'name' && !input.getAttribute('autocomplete')) {
          input.setAttribute('autocomplete', 'name');
        }

        // הוספת aria-describedby לשגיאות
        const errorElement = form.querySelector(`[data-error-for="${input.id}"]`);
        if (errorElement) {
          input.setAttribute('aria-describedby', errorElement.id);
        }
      });
    });
  };

  /**
   * שיפור קישורים
   */
  const enhanceLinks = () => {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // קישורים חיצוניים
      if (href && (href.startsWith('http') && !href.includes(window.location.hostname))) {
        if (!link.getAttribute('target')) {
          link.setAttribute('target', '_blank');
        }
        if (!link.getAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // הוספת הודעה לקוראי מסך
        const srText = document.createElement('span');
        srText.className = 'sr-only';
        srText.textContent = ' (נפתח בחלון חדש)';
        link.appendChild(srText);
      }

      // קישורי טלפון
      if (href && href.startsWith('tel:')) {
        if (!link.getAttribute('aria-label')) {
          const phoneNumber = href.replace('tel:', '');
          link.setAttribute('aria-label', `התקשר ל-${phoneNumber}`);
        }
      }

      // קישורי אימייל
      if (href && href.startsWith('mailto:')) {
        if (!link.getAttribute('aria-label')) {
          const email = href.replace('mailto:', '');
          link.setAttribute('aria-label', `שלח אימייל ל-${email}`);
        }
      }
    });
  };

  /**
   * שיפור תמונות
   */
  const enhanceImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // בדיקת alt text
      if (!img.getAttribute('alt')) {
        console.warn('תמונה ללא alt text:', img.src);
        img.setAttribute('alt', '');
      }

      // תמונות דקורטיביות
      const alt = img.getAttribute('alt');
      if (alt === '' || alt === 'decoration' || alt === 'decorative') {
        img.setAttribute('role', 'presentation');
        img.setAttribute('aria-hidden', 'true');
      }

      // הוספת loading="lazy" לתמונות שלא above-the-fold
      if (!img.getAttribute('loading')) {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      }
    });
  };

  /**
   * שיפור breadcrumbs
   */
  const enhanceBreadcrumbs = () => {
    const breadcrumbs = document.querySelector('.breadcrumbs, .breadcrumb');
    if (!breadcrumbs) return;

    // הוספת navigation role
    if (!breadcrumbs.getAttribute('role')) {
      breadcrumbs.setAttribute('role', 'navigation');
    }
    if (!breadcrumbs.getAttribute('aria-label')) {
      breadcrumbs.setAttribute('aria-label', 'נתיב ניווט');
    }

    // הוספת aria-current לדף הנוכחי
    const links = breadcrumbs.querySelectorAll('a');
    const lastLink = links[links.length - 1];
    if (lastLink) {
      lastLink.setAttribute('aria-current', 'page');
    }
  };

  return (
    <div ref={enhancerRef} className="accessibility-enhancer" style={{ display: 'none' }}>
      {/* רכיב נסתר שמריץ את השיפורים */}
    </div>
  );
};

/**
 * Hook לשיפור נגישות
 */
export const useAccessibilityEnhancements = () => {
  useEffect(() => {
    // הוספת מאזיני אירועים לנגישות
    const handleRouteChange = () => {
      // הודעה על שינוי דף
      const pageTitle = document.title;
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.textContent = `עברת לדף: ${pageTitle}`;
      }

      // החזרת focus לתחילת הדף
      const mainContent = document.querySelector('main, #main-content');
      if (mainContent) {
        (mainContent as HTMLElement).focus();
      }
    };

    // מאזין לשינויי URL (לSPA)
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
};

/**
 * רכיב לבדיקת נגישות
 */
export const AccessibilityChecker: React.FC = () => {
  const [issues, setIssues] = React.useState<string[]>([]);

  useEffect(() => {
    const checkAccessibility = () => {
      const foundIssues: string[] = [];

      // בדיקת alt text בתמונות
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      if (imagesWithoutAlt.length > 0) {
        foundIssues.push(`${imagesWithoutAlt.length} תמונות ללא alt text`);
      }

      // בדיקת כותרות
      const h1Elements = document.querySelectorAll('h1');
      if (h1Elements.length === 0) {
        foundIssues.push('אין כותרת H1 בדף');
      } else if (h1Elements.length > 1) {
        foundIssues.push('יותר מכותרת H1 אחת בדף');
      }

      // בדיקת labels בטפסים
      const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      const inputsWithoutLabelsFiltered = Array.from(inputsWithoutLabels).filter(input => {
        const id = input.getAttribute('id');
        return id ? !document.querySelector(`label[for="${id}"]`) : true;
      });
      
      if (inputsWithoutLabelsFiltered.length > 0) {
        foundIssues.push(`${inputsWithoutLabelsFiltered.length} שדות טופס ללא labels`);
      }

      // בדיקת contrast (בסיסי)
      const lowContrastElements = document.querySelectorAll('[style*="color"]');
      // כאן יכולה להיות בדיקה מתקדמת יותר של contrast

      setIssues(foundIssues);
    };

    checkAccessibility();
    
    // בדיקה מחדש כל 5 שניות
    const interval = setInterval(checkAccessibility, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (issues.length === 0) return null;

  return (
    <div className="accessibility-issues" style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: '#ff4444',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '300px'
    }}>
      <strong>בעיות נגישות:</strong>
      <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
        {issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
    </div>
  );
};