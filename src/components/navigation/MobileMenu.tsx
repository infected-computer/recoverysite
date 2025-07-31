/**
 * Accessible mobile navigation menu using Headless UI Dialog
 */

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '../shared/Button';
import { useAccessibleColors } from '@/hooks/useAccessibleColors';
import { manageFocus } from '@/utils/accessibilityUtils';

interface NavigationItem {
  name: string;
  href: string;
  isActive?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  onWhatsAppClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  onWhatsAppClick
}) => {
  const location = useLocation();
  const { colors } = useAccessibleColors();

  const isActive = (href: string) => location.pathname === href;

  const handleItemClick = (href: string) => {
    onClose();
    // Small delay to allow menu to close before navigation
    setTimeout(() => {
      if (href.startsWith('http')) {
        window.open(href, '_blank');
      }
    }, 150);
  };

  const handleWhatsAppClick = () => {
    onWhatsAppClick();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={onClose}
        aria-labelledby="mobile-menu-title"
        aria-describedby="mobile-menu-description"
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-black/25 backdrop-blur-sm" 
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Full-screen container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-end">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-1 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-1 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel 
                className="w-full max-w-sm transform overflow-hidden bg-white shadow-xl transition-all"
                style={{ backgroundColor: colors.surface.background }}
              >
                {/* Header */}
                <div 
                  className="flex items-center justify-between p-4 border-b"
                  style={{ borderColor: colors.surface.border }}
                >
                  <Dialog.Title 
                    id="mobile-menu-title"
                    className="text-lg font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    תפריט ניווט
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                    aria-label="סגור תפריט"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Screen reader description */}
                <div id="mobile-menu-description" className="sr-only">
                  תפריט ניווט נייד. השתמש בחצים או בטאב כדי לנווט בין הפריטים.
                </div>

                {/* Navigation items */}
                <nav 
                  className="px-4 py-6 space-y-2"
                  role="navigation"
                  aria-label="ניווט ראשי - מובייל"
                >
                  {navigationItems.map((item, index) => {
                    const itemIsActive = isActive(item.href);
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleItemClick(item.href)}
                        className={`
                          block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          ${itemIsActive 
                            ? 'bg-blue-50 text-blue-700 font-semibold border-r-4 border-blue-500' 
                            : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                          }
                        `}
                        style={{
                          backgroundColor: itemIsActive ? `${colors.primary[50]}` : 'transparent',
                          color: itemIsActive ? colors.primary[700] : colors.text.primary
                        }}
                        aria-current={itemIsActive ? 'page' : undefined}
                      >
                        <span className="flex items-center justify-between">
                          {item.name}
                          {itemIsActive && (
                            <span className="sr-only">עמוד נוכחי</span>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                {/* CTA Section */}
                <div 
                  className="border-t px-4 py-6"
                  style={{ borderColor: colors.surface.border }}
                >
                  <Button
                    onClick={handleWhatsAppClick}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center font-hebrew"
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.text.inverse
                    }}
                    aria-label="צור קשר מהיר בוואטסאפ"
                  >
                    <MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" />
                    צור קשר מהיר
                  </Button>
                  
                  <p 
                    className="mt-3 text-center text-sm"
                    style={{ color: colors.text.muted }}
                  >
                    זמינים 24/6 לשירותכם
                  </p>
                </div>

                {/* Accessibility info for screen readers */}
                <div className="sr-only">
                  <p>לסגירת התפריט, לחץ על כפתור הסגירה או לחץ מחוץ לתפריט</p>
                  <p>ניתן גם ללחוץ על מקש Escape לסגירת התפריט</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileMenu;