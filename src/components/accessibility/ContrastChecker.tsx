/**
 * Real-time contrast checker component for development
 */

import React, { useState, useEffect } from 'react';
import { calculateContrastRatio, meetsWCAGAA, meetsWCAGAAA } from '../../utils/accessibilityUtils';

interface ContrastCheckerProps {
  foreground?: string;
  background?: string;
  text?: string;
  className?: string;
}

const ContrastChecker: React.FC<ContrastCheckerProps> = ({
  foreground = '#000000',
  background = '#ffffff',
  text = 'Sample Text',
  className = ''
}) => {
  const [ratio, setRatio] = useState<number>(0);
  const [meetsAA, setMeetsAA] = useState<boolean>(false);
  const [meetsAAA, setMeetsAAA] = useState<boolean>(false);
  const [meetsAALarge, setMeetsAALarge] = useState<boolean>(false);

  useEffect(() => {
    const contrastRatio = calculateContrastRatio(foreground, background);
    const passesAA = meetsWCAGAA(foreground, background);
    const passesAAA = meetsWCAGAAA(foreground, background);
    const passesAALarge = meetsWCAGAA(foreground, background, true);

    setRatio(contrastRatio);
    setMeetsAA(passesAA);
    setMeetsAAA(passesAAA);
    setMeetsAALarge(passesAALarge);
  }, [foreground, background]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <div 
        className="p-4 rounded mb-4"
        style={{ 
          color: foreground, 
          backgroundColor: background 
        }}
      >
        <p className="text-base mb-2">{text}</p>
        <p className="text-lg font-bold">Large Text Sample</p>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Contrast Ratio:</span>
          <span className="font-mono">{ratio.toFixed(2)}:1</span>
        </div>
        
        <div className="flex justify-between">
          <span>WCAG AA (Normal):</span>
          <span className={meetsAA ? 'text-green-600' : 'text-red-600'}>
            {meetsAA ? '✅ Pass' : '❌ Fail'} (4.5:1)
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>WCAG AA (Large):</span>
          <span className={meetsAALarge ? 'text-green-600' : 'text-red-600'}>
            {meetsAALarge ? '✅ Pass' : '❌ Fail'} (3:1)
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>WCAG AAA:</span>
          <span className={meetsAAA ? 'text-green-600' : 'text-red-600'}>
            {meetsAAA ? '✅ Pass' : '❌ Fail'} (7:1)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;