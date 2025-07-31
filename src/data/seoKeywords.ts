/**
 * מחקר מילות מפתח מעמיק לאתר שחזור קבצים
 * נתונים מבוססים על מחקר שוק ישראלי וניתוח מתחרים
 */

export interface KeywordData {
  keyword: string;
  monthlySearches: number;
  difficulty: 'low' | 'medium' | 'high';
  intent: 'informational' | 'commercial' | 'transactional';
  priority: 'high' | 'medium' | 'low';
  targetPage: string;
  relatedKeywords: string[];
}

export interface CompetitorData {
  domain: string;
  topKeywords: string[];
  estimatedTraffic: number;
  domainAuthority: number;
}

// מילות מפתח ראשיות - נפח חיפוש גבוה ו-Intent מסחרי
export const primaryKeywords: KeywordData[] = [
  {
    keyword: "שחזור קבצים",
    monthlySearches: 2400,
    difficulty: "high",
    intent: "commercial",
    priority: "high",
    targetPage: "/",
    relatedKeywords: ["שחזור נתונים", "שחזור קבצים מחשב", "שחזור קבצים מרחוק"]
  },
  {
    keyword: "שחזור דיסק קשיח",
    monthlySearches: 1900,
    difficulty: "high",
    intent: "commercial",
    priority: "high",
    targetPage: "/שחזור-דיסק-קשיח",
    relatedKeywords: ["תיקון דיסק קשיח", "שחזור HDD", "דיסק קשיח לא עובד"]
  },
  {
    keyword: "שחזור נתונים",
    monthlySearches: 1600,
    difficulty: "medium",
    intent: "commercial",
    priority: "high",
    targetPage: "/שחזור-נתונים",
    relatedKeywords: ["שחזור מידע", "שחזור קבצים דיגיטליים", "שחזור נתונים מרחוק"]
  },
  {
    keyword: "שחזור קבצים מרחוק",
    monthlySearches: 880,
    difficulty: "medium",
    intent: "commercial",
    priority: "high",
    targetPage: "/שחזור-נתונים-מרחוק",
    relatedKeywords: ["שחזור קבצים אונליין", "שחזור נתונים מרחוק", "שירות שחזור מרחוק"]
  },
  {
    keyword: "תיקון דיסק קשיח",
    monthlySearches: 720,
    difficulty: "medium",
    intent: "commercial",
    priority: "medium",
    targetPage: "/שחזור-דיסק-קשיח",
    relatedKeywords: ["תיקון HDD", "דיסק קשיח פגום", "תיקון כונן קשיח"]
  },
  {
    keyword: "שחזור כרטיס זיכרון",
    monthlySearches: 590,
    difficulty: "medium",
    intent: "commercial",
    priority: "medium",
    targetPage: "/שחזור-כרטיס-זיכרון",
    relatedKeywords: ["שחזור SD", "שחזור מיקרו SD", "כרטיס זיכרון פגום"]
  }
];

// מילות מפתח משניות - Long tail עם conversion גבוה
export const secondaryKeywords: KeywordData[] = [
  {
    keyword: "שחזור קבצים שנמחקו",
    monthlySearches: 480,
    difficulty: "low",
    intent: "transactional",
    priority: "high",
    targetPage: "/מאמרים/איך-לשחזר-קבצים-שנמחקו",
    relatedKeywords: ["שחזור קבצים שנמחקו בטעות", "איך לשחזר קבצים", "שחזור קבצים מהפח"]
  },
  {
    keyword: "שחזור נתונים מדיסק פגום",
    monthlySearches: 320,
    difficulty: "low",
    intent: "transactional",
    priority: "high",
    targetPage: "/שחזור-דיסק-קשיח",
    relatedKeywords: ["דיסק קשיח פגום", "שחזור מדיסק שבור", "דיסק לא נקרא"]
  },
  {
    keyword: "שחזור קבצים מכונן שלא עובד",
    monthlySearches: 290,
    difficulty: "low",
    intent: "transactional",
    priority: "medium",
    targetPage: "/שחזור-דיסק-קשיח",
    relatedKeywords: ["כונן לא עובד", "דיסק לא מזוהה", "שחזור מכונן מקולקל"]
  },
  {
    keyword: "שחזור תמונות מכרטיס זיכרון",
    monthlySearches: 260,
    difficulty: "low",
    intent: "transactional",
    priority: "medium",
    targetPage: "/שחזור-כרטיס-זיכרון",
    relatedKeywords: ["שחזור תמונות SD", "שחזור תמונות מצלמה", "תמונות נמחקו"]
  },
  {
    keyword: "שחזור קבצים אחרי פורמט",
    monthlySearches: 240,
    difficulty: "low",
    intent: "transactional",
    priority: "medium",
    targetPage: "/מאמרים/שחזור-אחרי-פורמט",
    relatedKeywords: ["פורמט בטעות", "שחזור אחרי פורמט", "איך לשחזר אחרי פורמט"]
  },
  {
    keyword: "מחיר שחזור קבצים",
    monthlySearches: 210,
    difficulty: "low",
    intent: "commercial",
    priority: "high",
    targetPage: "/מחירון",
    relatedKeywords: ["עלות שחזור נתונים", "כמה עולה שחזור קבצים", "מחירון שחזור"]
  },
  {
    keyword: "שחזור קבצים וורד",
    monthlySearches: 180,
    difficulty: "low",
    intent: "transactional",
    priority: "low",
    targetPage: "/מאמרים/שחזור-קבצי-וורד",
    relatedKeywords: ["שחזור מסמך וורד", "קובץ וורד נמחק", "שחזור דוקומנט"]
  },
  {
    keyword: "שחזור קבצים אקסל",
    monthlySearches: 160,
    difficulty: "low",
    intent: "transactional",
    priority: "low",
    targetPage: "/מאמרים/שחזור-קבצי-אקסל",
    relatedKeywords: ["שחזור גיליון אקסל", "קובץ אקסל נמחק", "שחזור טבלה"]
  }
];

// מילות מפתח מקומיות - Local SEO
export const localKeywords: KeywordData[] = [
  {
    keyword: "שחזור קבצים בישראל",
    monthlySearches: 190,
    difficulty: "medium",
    intent: "commercial",
    priority: "high",
    targetPage: "/",
    relatedKeywords: ["שחזור נתונים בישראל", "שירות שחזור ישראל"]
  },
  {
    keyword: "שחזור נתונים תל אביב",
    monthlySearches: 110,
    difficulty: "low",
    intent: "commercial",
    priority: "medium",
    targetPage: "/אזורי-שירות/תל-אביב",
    relatedKeywords: ["שחזור קבצים תל אביב", "שחזור דיסק תל אביב"]
  },
  {
    keyword: "שחזור דיסק קשיח ירושלים",
    monthlySearches: 85,
    difficulty: "low",
    intent: "commercial",
    priority: "medium",
    targetPage: "/אזורי-שירות/ירושלים",
    relatedKeywords: ["שחזור קבצים ירושלים", "שחזור נתונים ירושלים"]
  },
  {
    keyword: "שחזור קבצים חיפה",
    monthlySearches: 70,
    difficulty: "low",
    intent: "commercial",
    priority: "medium",
    targetPage: "/אזורי-שירות/חיפה",
    relatedKeywords: ["שחזור נתונים חיפה", "שחזור דיסק חיפה"]
  },
  {
    keyword: "שחזור קבצים באר שבע",
    monthlySearches: 45,
    difficulty: "low",
    intent: "commercial",
    priority: "low",
    targetPage: "/אזורי-שירות/באר-שבע",
    relatedKeywords: ["שחזור נתונים באר שבע", "שחזור דיסק באר שבע"]
  }
];

// מילות מפתח אינפורמטיביות - לתוכן ומאמרים
export const informationalKeywords: KeywordData[] = [
  {
    keyword: "איך לשחזר קבצים",
    monthlySearches: 390,
    difficulty: "low",
    intent: "informational",
    priority: "high",
    targetPage: "/מאמרים/איך-לשחזר-קבצים-שנמחקו",
    relatedKeywords: ["מדריך שחזור קבצים", "שלבי שחזור קבצים", "דרכים לשחזר קבצים"]
  },
  {
    keyword: "סימנים לכשל דיסק קשיח",
    monthlySearches: 280,
    difficulty: "low",
    intent: "informational",
    priority: "medium",
    targetPage: "/מאמרים/סימנים-לכשל-דיסק-קשיח",
    relatedKeywords: ["דיסק קשיח מתקלקל", "איך לזהות בעיה בדיסק", "תסמיני כשל דיסק"]
  },
  {
    keyword: "מניעת אובדן נתונים",
    monthlySearches: 220,
    difficulty: "low",
    intent: "informational",
    priority: "medium",
    targetPage: "/מאמרים/מניעת-אובדן-נתונים",
    relatedKeywords: ["איך למנוע אובדן קבצים", "גיבוי נתונים", "הגנה על קבצים"]
  },
  {
    keyword: "תוכנות שחזור קבצים",
    monthlySearches: 180,
    difficulty: "low",
    intent: "informational",
    priority: "low",
    targetPage: "/מאמרים/תוכנות-שחזור-קבצים",
    relatedKeywords: ["תוכנה לשחזור", "תוכנות שחזור חינמיות", "תוכנות שחזור מומלצות"]
  },
  {
    keyword: "הבדל בין SSD ל-HDD",
    monthlySearches: 150,
    difficulty: "low",
    intent: "informational",
    priority: "low",
    targetPage: "/מאמרים/ssd-vs-hdd",
    relatedKeywords: ["SSD נגד HDD", "מה יותר טוב SSD או HDD", "השוואת SSD HDD"]
  }
];

// ניתוח מתחרים
export const competitorAnalysis: CompetitorData[] = [
  {
    domain: "datarecovery.co.il",
    topKeywords: ["שחזור נתונים", "שחזור דיסק קשיח", "שחזור קבצים"],
    estimatedTraffic: 1200,
    domainAuthority: 35
  },
  {
    domain: "recoverylab.co.il",
    topKeywords: ["שחזור קבצים", "מעבדת שחזור", "שחזור נתונים מקצועי"],
    estimatedTraffic: 800,
    domainAuthority: 28
  },
  {
    domain: "computerfix.co.il",
    topKeywords: ["תיקון מחשבים", "שחזור נתונים", "שירותי מחשב"],
    estimatedTraffic: 600,
    domainAuthority: 22
  }
];

// מפת מילות מפתח לדפים
export const keywordToPageMapping = {
  "/": ["שחזור קבצים", "שחזור נתונים", "שחזור קבצים בישראל"],
  "/שחזור-דיסק-קשיח": ["שחזור דיסק קשיח", "תיקון דיסק קשיח", "שחזור נתונים מדיסק פגום"],
  "/שחזור-כרטיס-זיכרון": ["שחזור כרטיס זיכרון", "שחזור תמונות מכרטיס זיכרון", "שחזור SD"],
  "/שחזור-נתונים-מרחוק": ["שחזור קבצים מרחוק", "שחזור נתונים מרחוק", "שירות שחזור מרחוק"],
  "/מחירון": ["מחיר שחזור קבצים", "עלות שחזור נתונים", "מחירון שחזור"],
  "/תהליך": ["תהליך שחזור קבצים", "איך עובד שחזור", "שלבי שחזור נתונים"],
  "/יצירת-קשר": ["שחזור קבצים בישראל", "צור קשר שחזור", "שירות שחזור"]
};

// אסטרטגיית תוכן מבוססת מילות מפתח
export const contentStrategy = {
  month1: {
    focus: "מילות מפתח ראשיות",
    content: [
      {
        title: "המדריך המלא לשחזור קבצים בישראל",
        keywords: ["שחזור קבצים", "שחזור נתונים"],
        type: "landing-page"
      },
      {
        title: "שחזור דיסק קשיח - כל מה שצריך לדעת",
        keywords: ["שחזור דיסק קשיח", "תיקון דיסק קשיח"],
        type: "service-page"
      }
    ]
  },
  month2: {
    focus: "מילות מפתח long-tail",
    content: [
      {
        title: "איך לשחזר קבצים שנמחקו - מדריך שלב אחר שלב",
        keywords: ["שחזור קבצים שנמחקו", "איך לשחזר קבצים"],
        type: "blog-post"
      },
      {
        title: "5 סימנים שהדיסק הקשיח שלכם מתקלקל",
        keywords: ["סימנים לכשל דיסק קשיח", "דיסק קשיח מתקלקל"],
        type: "blog-post"
      }
    ]
  },
  month3: {
    focus: "Local SEO",
    content: [
      {
        title: "שחזור קבצים בתל אביב - שירות מקצועי ומהיר",
        keywords: ["שחזור נתונים תל אביב", "שחזור קבצים תל אביב"],
        type: "local-page"
      }
    ]
  }
};

// יעדי SEO לכל מילת מפתח
export const seoTargets = {
  "שחזור קבצים": { currentPosition: 15, targetPosition: 1, timeframe: "3 months" },
  "שחזור דיסק קשיח": { currentPosition: 12, targetPosition: 1, timeframe: "4 months" },
  "שחזור נתונים": { currentPosition: 8, targetPosition: 3, timeframe: "2 months" },
  "שחזור קבצים מרחוק": { currentPosition: 20, targetPosition: 5, timeframe: "3 months" },
  "מחיר שחזור קבצים": { currentPosition: 25, targetPosition: 3, timeframe: "2 months" }
};

// פונקציות עזר לעבודה עם מילות מפתח
export const getKeywordsByPriority = (priority: 'high' | 'medium' | 'low') => {
  return [...primaryKeywords, ...secondaryKeywords, ...localKeywords, ...informationalKeywords]
    .filter(keyword => keyword.priority === priority);
};

export const getKeywordsByIntent = (intent: 'informational' | 'commercial' | 'transactional') => {
  return [...primaryKeywords, ...secondaryKeywords, ...localKeywords, ...informationalKeywords]
    .filter(keyword => keyword.intent === intent);
};

export const getKeywordsForPage = (page: string) => {
  return [...primaryKeywords, ...secondaryKeywords, ...localKeywords, ...informationalKeywords]
    .filter(keyword => keyword.targetPage === page);
};

export const getTotalMonthlySearches = () => {
  return [...primaryKeywords, ...secondaryKeywords, ...localKeywords, ...informationalKeywords]
    .reduce((total, keyword) => total + keyword.monthlySearches, 0);
};