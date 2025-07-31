import React from 'react';
import { StructuredDataManager, PersonInfo } from '../../utils/structuredData';

export interface PersonSchemaProps {
  person: PersonInfo;
}

export const PersonSchema: React.FC<PersonSchemaProps> = ({ person }) => {
  const schema = StructuredDataManager.createPerson(person);

  // Validate schema before rendering
  if (!StructuredDataManager.validateSchema(schema)) {
    console.error('Invalid Person schema:', schema);
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

// Expert profiles data
export const getExpertProfiles = (): PersonInfo[] => {
  return [
    {
      name: "דוד כהן",
      jobTitle: "מומחה שחזור קבצים בכיר",
      description: "מומחה שחזור קבצים עם מעל 10 שנות ניסיון בתחום. מתמחה בשחזור מדיסקים קשיחים פגומים, SSD ומדיה דיגיטלית מכל הסוגים.",
      image: "/images/experts/david-cohen.jpg",
      url: "https://recoverysite.netlify.app/about#david-cohen",
      sameAs: [
        "https://www.linkedin.com/in/david-cohen-data-recovery",
        "https://twitter.com/davidcohen_tech"
      ],
      worksFor: "שחזור קבצים מקצועי",
      knowsAbout: [
        "שחזור קבצים",
        "תיקון דיסקים קשיחים",
        "שחזור SSD",
        "שחזור כרטיסי זיכרון",
        "תמיכה טכנית מרחוק",
        "אבטחת מידע"
      ],
      alumniOf: [
        "הטכניון - מכון טכנולוגי לישראל",
        "אוניברסיטת תל אביב"
      ]
    },
    {
      name: "שרה לוי",
      jobTitle: "מומחית תמיכה טכנית",
      description: "מומחית תמיכה טכנית עם התמחות בתיקון מערכות הפעלה ופתרון בעיות תוכנה מורכבות. מעל 7 שנות ניסיון בתחום.",
      image: "/images/experts/sarah-levy.jpg",
      url: "https://recoverysite.netlify.app/about#sarah-levy",
      sameAs: [
        "https://www.linkedin.com/in/sarah-levy-tech-support"
      ],
      worksFor: "שחזור קבצים מקצועי",
      knowsAbout: [
        "תמיכה טכנית",
        "תיקון מערכות הפעלה",
        "Windows",
        "macOS",
        "Linux",
        "פתרון בעיות תוכנה",
        "אופטימיזציה של מערכות"
      ],
      alumniOf: [
        "אוניברסיטת בן גוריון",
        "מכללת שנקר"
      ]
    }
  ];
};

// Combined component that includes both profile and schema
export interface ExpertProfileWithSchemaProps {
  expertId: 'david-cohen' | 'sarah-levy';
  showProfile?: boolean;
}

export const ExpertProfileWithSchema: React.FC<ExpertProfileWithSchemaProps> = ({ 
  expertId, 
  showProfile = true 
}) => {
  const experts = getExpertProfiles();
  const expert = experts.find(e => 
    e.name === (expertId === 'david-cohen' ? 'דוד כהן' : 'שרה לוי')
  );

  if (!expert) {
    console.error(`Expert not found: ${expertId}`);
    return null;
  }

  return (
    <>
      <PersonSchema person={expert} />
      {showProfile && (
        <div className="expert-profile-section">
          {/* This would integrate with the ExpertProfile component */}
        </div>
      )}
    </>
  );
};