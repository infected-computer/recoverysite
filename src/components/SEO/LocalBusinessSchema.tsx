import React from 'react';
import { StructuredDataManager } from '../../utils/structuredData';

export interface LocalBusinessSchemaProps {
  customData?: Partial<import('../../utils/structuredData').BusinessInfo>;
}

export const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({ 
  customData 
}) => {
  const businessData = StructuredDataManager.getBusinessData();
  const mergedData = customData ? { ...businessData, ...customData } : businessData;
  const schema = StructuredDataManager.createLocalBusiness(mergedData);

  // Validate schema before rendering
  if (!StructuredDataManager.validateSchema(schema)) {
    console.error('Invalid LocalBusiness schema:', schema);
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

// Hook for getting business data
export const useBusinessData = () => {
  return StructuredDataManager.getBusinessData();
};