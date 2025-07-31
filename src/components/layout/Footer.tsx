import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Home } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Users } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { HardDrive } from 'lucide-react';
import { Star } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Zap } from 'lucide-react';
import { Link } from "react-router-dom";
import { Button } from "../shared/Button";
import { cn } from '@/lib/utils';
import RequestForm from '../forms/RequestForm';

const footerLinks = {
  main: [
    { name: "דף הבית", href: "/", icon: Home },
    { name: "מחירון", href: "/pricing", icon: DollarSign },
    { name: "איך זה עובד", href: "/process", icon: FileText },
    { name: "מי אנחנו", href: "/about", icon: Users },
  ],
  services: [
    { name: "שחזור דיסקים קשיחים", href: "/pricing#hard-drives" },
    { name: "שחזור כרטיסי זיכרון", href: "/pricing#memory-cards" },
    { name: "שירותי ייעוץ והדרכה", href: "/pricing#mobile" },
    { name: "שירות דחוף 24/6", href: "/pricing#urgent" },
  ],
  legal: [
    { name: "תנאי שימוש", href: "/terms" },
    { name: "מדיניות פרטיות", href: "/privacy" },
    { name: "מאמרים", href: "/articles" },
    { name: "יצירת קשר", href: "/contact" },
  ]
};

const stats = [
  { icon: Shield, number: "97%", label: "שיעור הצלחה" },
  { icon: Clock, number: "24/6", label: "זמינות" },
  { icon: Zap, number: "7+", label: "שנות ניסיון" }
];

export const Footer: React.FC = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני זקוק לעזרה בשחזור קבצים. אשמח לקבל ייעוץ ראשוני.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          var(--color-background) 0%, 
          var(--color-background-light) 50%, 
          var(--color-background) 100%
        )`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 60px 60px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-primary-redesign/10 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary-redesign/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <div className="py-12 border-b border-border-redesign/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div 
                      className="w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'var(--gradient-primary)'
                      }}
                    >
                      <StatIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-primary-redesign mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-text-secondary-redesign">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="p-2 rounded-xl"
                    style={{
                      background: 'var(--gradient-secondary)'
                    }}
                  >
                    <HardDrive className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary-redesign">
                    דוקטור פיקס
                  </h3>
                </div>
                
                <p className="text-text-secondary-redesign leading-relaxed mb-6">
                  שירותי שחזור קבצים מקצועיים מרחוק עם מעל 7 שנות ניסיון. 
                  אמינות, מקצועיות ושקיפות מלאה.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary-redesign" />
                    <span className="text-text-secondary-redesign">doctorfix79@gmail.com</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary-redesign" />
                    <span className="text-text-secondary-redesign">050-123-4567</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary-redesign" />
                    <span className="text-text-secondary-redesign">א'-ה': 09:00-18:00</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-text-primary-redesign mb-6">
                  קישורים מהירים
                </h4>
                
                <div className="space-y-3">
                  {footerLinks.main.map((link, index) => {
                    const LinkIcon = link.icon;
                    return (
                      <Link 
                        key={index}
                        to={link.href} 
                        className="flex items-center gap-3 text-text-secondary-redesign hover:text-primary-redesign transition-all duration-500 ease-out group"
                      >
                        <LinkIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-400 ease-out" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-text-primary-redesign mb-6">
                  השירותים שלנו
                </h4>
                
                <div className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.href} 
                      className="block text-text-secondary-redesign hover:text-secondary-redesign transition-colors duration-300 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Link */}
              <div>
                <div className="space-y-3 mt-6">
                  {footerLinks.legal.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.href} 
                      className="block text-text-secondary-redesign hover:text-secondary-redesign transition-colors duration-300 hover:translate-x-1 transform"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;