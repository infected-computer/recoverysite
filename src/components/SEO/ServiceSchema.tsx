import React from 'react';
import { StructuredDataManager, ServiceInfo } from '../../utils/structuredData';

export interface ServiceSchemaProps {
  serviceType: 'data-recovery' | 'remote-support' | 'system-repair';
  customData?: Partial<ServiceInfo>;
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({ 
  serviceType, 
  customData 
}) => {
  const getServiceData = (type: string): ServiceInfo => {
    const baseData = {
      provider: "שחזור קבצים מקצועי",
      areaServed: ["תל אביב", "ירושלים", "חיפה", "באר שבע", "כל הארץ"],
      offers: {
        priceCurrency: "ILS",
        availability: "https://schema.org/InStock"
      }
    };

    switch (type) {
      case 'data-recovery':
        return {
          ...baseData,
          name: "שחזור קבצים מרחוק",
          description: "שירות שחזור קבצים מקצועי מרחוק מכל סוגי המדיה - דיסקים קשיחים, SSD, כרטיסי זיכרון ועוד. בדיקה חינמית ותשלום רק לאחר הצלחה.",
          serviceType: "DataRecoveryService",
          category: "Computer Repair Service",
          offers: {
            ...baseData.offers,
            price: "החל מ-₪300"
          }
        };
      
      case 'remote-support':
        return {
          ...baseData,
          name: "תמיכה טכנית מרחוק",
          description: "שירות תמיכה טכנית מקצועי מרחוק לפתרון בעיות מחשב, התקנת תוכנות ותחזוקה שוטפת.",
          serviceType: "TechnicalSupport",
          category: "Computer Support Service",
          offers: {
            ...baseData.offers,
            price: "החל מ-₪150"
          }
        };
      
      case 'system-repair':
        return {
          ...baseData,
          name: "תיקון מערכות מרחוק",
          description: "שירות תיקון מערכות הפעלה מרחוק, פתרון בעיות תוכנה ואופטימיזציה של ביצועי המחשב.",
          serviceType: "SystemRepair",
          category: "Computer Repair Service",
          offers: {
            ...baseData.offers,
            price: "החל מ-₪200"
          }
        };
      
      default:
        throw new Error(`Unknown service type: ${type}`);
    }
  };

  const serviceData = getServiceData(serviceType);
  const mergedData = customData ? { ...serviceData, ...customData } : serviceData;
  const schema = StructuredDataManager.createService(mergedData);

  // Validate schema before rendering
  if (!StructuredDataManager.validateSchema(schema)) {
    console.error('Invalid Service schema:', schema);
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

// Utility function to get service data
export const getServiceInfo = (serviceType: ServiceSchemaProps['serviceType']): ServiceInfo => {
  const component = new (ServiceSchema as any)({ serviceType });
  return component.getServiceData(serviceType);
};