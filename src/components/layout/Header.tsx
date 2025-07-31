import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, HardDrive, MessageCircle } from 'lucide-react';
import { Button } from "../shared/Button";
import { cn } from '@/lib/utils';
import { useScrollDirection } from '../../hooks/useScrollOptimization';
import MobileMenu from '../navigation/MobileMenu';
import { useAccessibleColors } from '@/hooks/useAccessibleColors';

const navigation = [
  { name: "דף הבית", href: "/" },
  { name: "מחירון", href: "/pricing" },
  { name: "איך זה עובד", href: "/process" },
  { name: "מאמרים", href: "/articles" },
  { name: "מי אנחנו", href: "/about" },
  { name: "שאלות ותשובות", href: "/faq" },
  { name: "יצירת קשר", href: "/contact" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  const { colors } = useAccessibleColors();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני זקוק לעזרה בשחזור קבצים. אשמח לקבל ייעוץ ראשוני.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300",
        scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0',
        isScrolled ? 'shadow-md' : 'shadow-none'
      )}
      style={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: 'var(--color-border-light-redesign)'
      }}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 font-bold text-xl group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            aria-label="דוקטור פיקס - דף הבית"
          >
            <div 
              className="p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: colors.primary[500]
              }}
            >
              <HardDrive className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <span 
              className="font-hebrew text-lg"
              style={{
                color: colors.text.primary
              }}
            >
              דוקטור פיקס
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="ניווט ראשי">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  isActive(item.href) 
                    ? 'font-semibold' 
                    : 'hover:font-medium'
                )}
                style={{
                  color: isActive(item.href) ? colors.primary[600] : colors.text.primary
                }}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
                
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full" 
                    style={{ backgroundColor: colors.primary[600] }}
                  />
                )}
                
                {/* Hover effect */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" 
                  style={{ backgroundColor: `${colors.primary[50]}` }}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={openWhatsApp}
              variant="primary"
              size="md"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                backgroundColor: colors.primary[500],
                color: colors.text.inverse
              }}
              aria-label="ייעוץ מהיר בוואטסאפ"
            >
              <MessageCircle className="ml-2 h-4 w-4" aria-hidden="true" />
              ייעוץ ב-WhatsApp
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="פתח תפריט ניווט"
            style={{
              color: colors.text.primary
            }}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          navigationItems={navigation}
          onWhatsAppClick={openWhatsApp}
        />
      </div>
    </header>
  );
};

export default Header;