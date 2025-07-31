import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"
      fill="currentColor"
    />
  </svg>
);

export const WhatsAppFloat: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני זקוק לעזרה בשחזור קבצים. אשמח לקבל ייעוץ ראשוני.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" style={{ marginBottom: '24px' }}>
      {/* Pulse rings */}
      <div className="absolute inset-0 animate-ping">
        <div className="w-14 h-14 rounded-full bg-[#25D366] opacity-20"></div>
      </div>
      <div className="absolute inset-0 animate-ping" style={{ animationDelay: '1s' }}>
        <div className="w-14 h-14 rounded-full bg-[#25D366] opacity-10"></div>
      </div>
      
      {/* Main button */}
      <button
        onClick={openWhatsApp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
        aria-label="שליחת הודעה בWhatsApp"
      >
        {/* Background glow */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <WhatsAppIcon />
        </div>
        
        {/* Very subtle shimmer effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-800 ease-out overflow-hidden">
          <div 
            className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-2200 ease-out"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
              width: '200%'
            }}
          />
        </div>
      </button>
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-16 left-0 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          background: 'var(--color-background-card)',
          color: 'var(--color-text-primary)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border-light-redesign)'
        }}
      >
        שליחת הודעה בWhatsApp
        <div 
          className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
          style={{
            borderTopColor: 'var(--color-background-card)'
          }}
        ></div>
      </div>
      

    </div>
  );
};

export default WhatsAppFloat;