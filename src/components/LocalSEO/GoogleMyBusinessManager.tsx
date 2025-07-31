import React, { useState, useEffect } from 'react';

interface GMBData {
  businessName: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  hours: { [key: string]: string };
  attributes: string[];
  photos: GMBPhoto[];
  posts: GMBPost[];
  reviews: GMBReview[];
}

interface GMBPhoto {
  id: string;
  url: string;
  category: 'logo' | 'cover' | 'interior' | 'exterior' | 'team' | 'product';
  alt: string;
  uploadDate: string;
}

interface GMBPost {
  id: string;
  type: 'update' | 'offer' | 'event' | 'product';
  title: string;
  content: string;
  image?: string;
  ctaText?: string;
  ctaUrl?: string;
  publishDate: string;
  metrics: {
    views: number;
    clicks: number;
    calls: number;
  };
}

interface GMBReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  response?: string;
  responseDate?: string;
}

/**
 * רכיב לניהול פרופיל Google My Business
 * כולל ניהול תוכן, ביקורות ומעקב ביצועים
 */
export const GoogleMyBusinessManager: React.FC = () => {
  const [gmbData, setGmbData] = useState<GMBData>({
    businessName: "דוקטור פיקס - שחזור קבצים מקצועי",
    description: "",
    category: "Computer Repair Service",
    address: "תל אביב, ישראל",
    phone: "050-123-4567",
    website: "https://doctorfix.co.il",
    hours: {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
      thursday: "09:00-18:00",
      friday: "09:00-14:00",
      saturday: "סגור",
      sunday: "10:00-16:00"
    },
    attributes: [],
    photos: [],
    posts: [],
    reviews: []
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'reviews' | 'analytics'>('profile');

  // תיאור עסק מותאם SEO
  const optimizedDescription = `דוקטור פיקס מתמחה בשחזור קבצים ונתונים דיגיטליים עם מעל 7 שנות ניסיון. 
אנו מציעים שירותי שחזור מקצועיים לדיסקים קשיחים, כרטיסי זיכרון, SSD ומדיות נוספות.

השירותים שלנו כוללים:
🔧 שחזור דיסק קשיח עם שיעור הצלחה 95%
💾 שחזור כרטיסי זיכרון וכרטיסי SD
🌐 שחזור נתונים מרחוק ללא צורך בהגעה
⚡ שירות מהיר תוך 24-48 שעות
🛡️ אבטחת מידע מלאה ושמירה על פרטיות

מתמחים בטיפול במקרים מורכבים: נזק פיזי, שריפה, הצפה ונזק חשמלי.
הערכת מחיר חינמית | תשלום רק במקרה הצלחה | תמיכה 24/6

פנו אלינו עכשיו לייעוץ חינמי ושחזור מקצועי של הנתונים החשובים לכם.`;

  // תכונות עסק מומלצות
  const recommendedAttributes = [
    "Online appointments",
    "Remote support", 
    "Emergency service",
    "Free estimates",
    "Accepts credit cards",
    "Accepts cash",
    "Professional service",
    "Experienced staff"
  ];

  useEffect(() => {
    setGmbData(prev => ({
      ...prev,
      description: optimizedDescription,
      attributes: recommendedAttributes
    }));
  }, []);

  return (
    <div className="gmb-manager">
      <style jsx>{`
        .gmb-manager {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .gmb-header {
          background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .gmb-title {
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 700;
        }
        
        .gmb-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .gmb-tabs {
          display: flex;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 30px;
          gap: 4px;
        }
        
        .gmb-tab {
          flex: 1;
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .gmb-tab.active {
          background: white;
          color: #4285f4;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .gmb-tab:hover:not(.active) {
          background: rgba(255,255,255,0.5);
        }
        
        .gmb-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .profile-section {
          margin-bottom: 40px;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
          border-bottom: 2px solid #4285f4;
          padding-bottom: 10px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: #555;
        }
        
        .form-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #4285f4;
        }
        
        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .hours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .hour-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .day-label {
          min-width: 80px;
          font-weight: 500;
        }
        
        .attributes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 10px;
        }
        
        .attribute-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
        }
        
        .attribute-checkbox {
          width: 18px;
          height: 18px;
        }
        
        .posts-section {
          display: grid;
          gap: 20px;
        }
        
        .post-card {
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          padding: 20px;
          background: #fafbfc;
        }
        
        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .post-type {
          background: #4285f4;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .post-date {
          color: #666;
          font-size: 0.9rem;
        }
        
        .post-content {
          margin-bottom: 15px;
          line-height: 1.6;
        }
        
        .post-metrics {
          display: flex;
          gap: 20px;
          font-size: 0.9rem;
          color: #666;
        }
        
        .metric {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .reviews-section {
          display: grid;
          gap: 20px;
        }
        
        .review-card {
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          padding: 20px;
          background: white;
        }
        
        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .review-author {
          font-weight: 600;
        }
        
        .review-rating {
          color: #ffa500;
        }
        
        .review-date {
          color: #666;
          font-size: 0.9rem;
        }
        
        .review-text {
          margin-bottom: 15px;
          line-height: 1.6;
        }
        
        .review-response {
          background: #f0f7ff;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #4285f4;
        }
        
        .response-label {
          font-weight: 600;
          color: #4285f4;
          margin-bottom: 8px;
        }
        
        .btn {
          background: #4285f4;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }
        
        .btn:hover {
          background: #3367d6;
        }
        
        .btn-secondary {
          background: #6c757d;
        }
        
        .btn-secondary:hover {
          background: #545b62;
        }
        
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .analytics-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
        }
        
        .analytics-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .analytics-label {
          font-size: 1rem;
          opacity: 0.9;
        }
        
        .chart-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="gmb-header">
        <h1 className="gmb-title">Google My Business Manager</h1>
        <p className="gmb-subtitle">ניהול פרופיל עסקי מותאם Local SEO</p>
      </div>

      <div className="gmb-tabs">
        <button 
          className={`gmb-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          פרופיל עסקי
        </button>
        <button 
          className={`gmb-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          פוסטים ועדכונים
        </button>
        <button 
          className={`gmb-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          ביקורות
        </button>
        <button 
          className={`gmb-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          אנליטיקס
        </button>
      </div>

      <div className="gmb-content">
        {activeTab === 'profile' && (
          <ProfileTab gmbData={gmbData} setGmbData={setGmbData} />
        )}
        
        {activeTab === 'posts' && (
          <PostsTab posts={gmbData.posts} />
        )}
        
        {activeTab === 'reviews' && (
          <ReviewsTab reviews={gmbData.reviews} />
        )}
        
        {activeTab === 'analytics' && (
          <AnalyticsTab />
        )}
      </div>
    </div>
  );
};

// רכיב טאב פרופיל עסקי
const ProfileTab: React.FC<{
  gmbData: GMBData;
  setGmbData: React.Dispatch<React.SetStateAction<GMBData>>;
}> = ({ gmbData, setGmbData }) => {
  return (
    <div>
      <div className="profile-section">
        <h2 className="section-title">פרטי עסק בסיסיים</h2>
        
        <div className="form-group">
          <label className="form-label">שם העסק</label>
          <input 
            type="text" 
            className="form-input"
            value={gmbData.businessName}
            onChange={(e) => setGmbData(prev => ({...prev, businessName: e.target.value}))}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">תיאור העסק (מותאם SEO)</label>
          <textarea 
            className="form-input form-textarea"
            value={gmbData.description}
            onChange={(e) => setGmbData(prev => ({...prev, description: e.target.value}))}
            placeholder="תיאור מפורט של העסק עם מילות מפתח רלוונטיות..."
          />
          <small>תווים: {gmbData.description.length}/750</small>
        </div>
        
        <div className="form-group">
          <label className="form-label">קטגוריה ראשית</label>
          <select 
            className="form-input"
            value={gmbData.category}
            onChange={(e) => setGmbData(prev => ({...prev, category: e.target.value}))}
          >
            <option value="Computer Repair Service">Computer Repair Service</option>
            <option value="Data Recovery Service">Data Recovery Service</option>
            <option value="IT Support Service">IT Support Service</option>
          </select>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">שעות פעילות</h2>
        <div className="hours-grid">
          {Object.entries(gmbData.hours).map(([day, hours]) => (
            <div key={day} className="hour-item">
              <span className="day-label">
                {day === 'monday' ? 'שני' :
                 day === 'tuesday' ? 'שלישי' :
                 day === 'wednesday' ? 'רביעי' :
                 day === 'thursday' ? 'חמישי' :
                 day === 'friday' ? 'שישי' :
                 day === 'saturday' ? 'שבת' : 'ראשון'}:
              </span>
              <input 
                type="text" 
                className="form-input"
                value={hours}
                onChange={(e) => setGmbData(prev => ({
                  ...prev, 
                  hours: {...prev.hours, [day]: e.target.value}
                }))}
                placeholder="09:00-18:00 או סגור"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">תכונות ושירותים</h2>
        <div className="attributes-grid">
          {gmbData.attributes.map((attribute, index) => (
            <div key={index} className="attribute-item">
              <input 
                type="checkbox" 
                className="attribute-checkbox"
                checked={true}
                readOnly
              />
              <span>{attribute}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn">שמור שינויים</button>
    </div>
  );
};

// רכיב טאב פוסטים
const PostsTab: React.FC<{ posts: GMBPost[] }> = ({ posts }) => {
  const samplePosts: GMBPost[] = [
    {
      id: '1',
      type: 'update',
      title: 'טיפ השבוע: איך למנוע אובדן נתונים',
      content: '💡 גבו את הקבצים החשובים לכם באופן קבוע! המלצה שלנו: גיבוי אוטומטי לענן + גיבוי חיצוני שבועי. #שחזור_קבצים #גיבוי_נתונים',
      publishDate: '2024-01-15',
      metrics: { views: 245, clicks: 12, calls: 3 }
    },
    {
      id: '2',
      type: 'offer',
      title: 'מבצע מיוחד: הערכת מחיר חינמית',
      content: '🎉 הערכת מחיר חינמית לכל שירותי השחזור! פנו אלינו עכשיו ותקבלו הערכה מדויקת ללא התחייבות.',
      ctaText: 'קבלו הצעת מחיר',
      ctaUrl: 'tel:+972501234567',
      publishDate: '2024-01-10',
      metrics: { views: 189, clicks: 23, calls: 8 }
    }
  ];

  return (
    <div className="posts-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="section-title">פוסטים ועדכונים</h2>
        <button className="btn">פוסט חדש</button>
      </div>
      
      {samplePosts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <span className="post-type">{post.type}</span>
            <span className="post-date">{post.publishDate}</span>
          </div>
          
          <h3>{post.title}</h3>
          <div className="post-content">{post.content}</div>
          
          <div className="post-metrics">
            <div className="metric">
              <span>👁️</span>
              <span>{post.metrics.views} צפיות</span>
            </div>
            <div className="metric">
              <span>🖱️</span>
              <span>{post.metrics.clicks} לחיצות</span>
            </div>
            <div className="metric">
              <span>📞</span>
              <span>{post.metrics.calls} שיחות</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// רכיב טאב ביקורות
const ReviewsTab: React.FC<{ reviews: GMBReview[] }> = ({ reviews }) => {
  const sampleReviews: GMBReview[] = [
    {
      id: '1',
      author: 'יוסי כהן',
      rating: 5,
      text: 'שירות מעולה! שיחזרו לי את כל התמונות מהחתונה אחרי שהדיסק התקלקל. מקצועיים ומהירים.',
      date: '2024-01-15',
      response: 'תודה רבה יוסי על הביקורת המעולה! שמחים שהצלחנו לשחזר את הזיכרונות היקרים שלך. צוות דוקטור פיקס',
      responseDate: '2024-01-15'
    },
    {
      id: '2',
      author: 'שרה לוי',
      rating: 4,
      text: 'המחשב שלי התקלקל והחשבתי שאיבדתי את כל הקבצים. דוקטור פיקס הציל את המצב! שירות מקצועי.',
      date: '2024-01-10'
    }
  ];

  return (
    <div className="reviews-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="section-title">ביקורות לקוחות</h2>
        <div>
          <span style={{ marginRight: '10px' }}>דירוג ממוצע: ⭐ 4.9/5</span>
          <button className="btn btn-secondary">בקש ביקורות</button>
        </div>
      </div>
      
      {sampleReviews.map(review => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <div>
              <div className="review-author">{review.author}</div>
              <div className="review-rating">
                {'⭐'.repeat(review.rating)}
              </div>
            </div>
            <div className="review-date">{review.date}</div>
          </div>
          
          <div className="review-text">{review.text}</div>
          
          {review.response ? (
            <div className="review-response">
              <div className="response-label">תגובת העסק:</div>
              <div>{review.response}</div>
            </div>
          ) : (
            <button className="btn">הגב לביקורת</button>
          )}
        </div>
      ))}
    </div>
  );
};

// רכיב טאב אנליטיקס
const AnalyticsTab: React.FC = () => {
  return (
    <div>
      <h2 className="section-title">ביצועי Google My Business</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-number">2,847</div>
          <div className="analytics-label">צפיות בפרופיל</div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-number">156</div>
          <div className="analytics-label">לחיצות לאתר</div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-number">89</div>
          <div className="analytics-label">שיחות טלפון</div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-number">34</div>
          <div className="analytics-label">בקשות הכוונה</div>
        </div>
      </div>
      
      <div className="chart-container">
        <h3>מגמות צפיות שבועיות</h3>
        <p>כאן יוצג גרף של צפיות בפרופיל לאורך זמן</p>
      </div>
    </div>
  );
};