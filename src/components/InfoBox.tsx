import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface InfoBoxProps {
  type: 'warning' | 'success' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ 
  type, 
  title, 
  children, 
  className 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'info':
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 border-r-yellow-400',
          icon: 'text-yellow-600',
          title: 'text-yellow-800',
          content: 'text-yellow-700'
        };
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 border-r-green-400',
          icon: 'text-green-600',
          title: 'text-green-800',
          content: 'text-green-700'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 border-r-red-400',
          icon: 'text-red-600',
          title: 'text-red-800',
          content: 'text-red-700'
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border-blue-200 border-r-blue-400',
          icon: 'text-blue-600',
          title: 'text-blue-800',
          content: 'text-blue-700'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={cn(
      'border border-r-4 rounded-lg p-4 my-4',
      styles.container,
      className
    )}>
      <div className="flex items-start">
        <div className={cn('flex-shrink-0 ml-3', styles.icon)}>
          {getIcon()}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={cn('font-semibold mb-2', styles.title)}>
              {title}
            </h4>
          )}
          <div className={cn('text-sm leading-relaxed', styles.content)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;