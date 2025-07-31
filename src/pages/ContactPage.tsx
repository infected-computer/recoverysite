import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Clock } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { User } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Send } from 'lucide-react';
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import { sendContactEmail, sendToWhatsApp, type ContactFormData } from "@/services/emailService";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailData: ContactFormData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || '',
        message: formData.message.trim()
      };

      const result = await sendContactEmail(emailData);

      if (result.success) {
        toast({
          title: "הפנייה נשלחה בהצלחה!",
          description: "נחזור אליך בהקדם האפשרי",
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error(result.error || 'שגיאה לא ידועה');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "שגיאה בשליחת הפנייה",
        description: "האם תרצה לנסות לשלוח דרך WhatsApp במקום?",
        variant: "destructive",
        action: (
          <button 
            onClick={() => sendToWhatsApp(formData)} 
            className="bg-[#25D366] text-white px-3 py-1 rounded text-sm hover:bg-[#20BA5A]"
          >
            שלח ב-WhatsApp
          </button>
        )
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני זקוק לעזרה בשחזור קבצים. אשמח לקבל ייעוץ ראשוני.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "תגובה מיידית",
      action: "שלח הודעה",
      onClick: openWhatsApp,
      primary: true
    },
    {
      icon: Mail,
      title: "אימייל",
      description: "doctorfix79@gmail.com",
      action: "שלח אימייל",
      onClick: () => window.location.href = 'mailto:doctorfix79@gmail.com'
    },
    {
      icon: Phone,
      title: "טלפון",
      description: "לשיחות דחופות",
      action: "התקשר עכשיו",
      onClick: () => window.location.href = 'tel:+972536657279'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="font-hebrew text-4xl md:text-5xl font-bold mb-6">
          יצירת קשר
        </h1>
        <p className="font-hebrew text-xl text-muted-foreground max-w-3xl mx-auto">
          זקוק לעזרה בשחזור קבצים? אנחנו כאן בשבילך 24/6
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-hebrew text-2xl text-center">
                  שלח לנו הודעה
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-hebrew text-right flex items-center gap-2 justify-end">
                        <User className="h-4 w-4" />
                        שם מלא *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="font-hebrew text-right"
                        placeholder="הכנס את שמך המלא"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-hebrew text-right flex items-center gap-2 justify-end">
                        <Phone className="h-4 w-4" />
                        מספר טלפון *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="font-hebrew text-right"
                        placeholder="050-1234567"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-hebrew text-right flex items-center gap-2 justify-end">
                      <Mail className="h-4 w-4" />
                      כתובת אימייל
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="font-hebrew text-right"
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-hebrew text-right flex items-center gap-2 justify-end">
                      <FileText className="h-4 w-4" />
                      תיאור מפורט של הבעיה *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="font-hebrew text-right resize-none"
                      placeholder="אנא תאר בפירוט מה קרה לקבצים, איך התגלתה הבעיה, ומה ניסית לעשות עד כה..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-hebrew px-12 py-6"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      ) : (
                        <Send className="ml-2 h-5 w-5" />
                      )}
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground font-hebrew">
                    * שדות חובה
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Other Contact Methods */}
          <div className="lg:col-span-1">
            <h2 className="font-hebrew text-2xl font-bold mb-8">
              דרכי התקשרות נוספות
            </h2>
            
            <div className="space-y-4">
              <a href="https://wa.me/972536657279" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <MessageCircle className="h-6 w-6 text-primary" />
                <span className="font-hebrew font-semibold">WhatsApp</span>
              </a>
              <a href="mailto:doctorfix79@gmail.com" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
                <span className="font-hebrew font-semibold">doctorfix79@gmail.com</span>
              </a>
              <a href="tel:+972536657279" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Phone className="h-6 w-6 text-primary" />
                <span className="font-hebrew font-semibold">053-6657279</span>
              </a>
            </div>

            {/* Business Hours */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-hebrew flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  שעות פעילות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-hebrew text-sm">
                  <div className="flex justify-between">
                    <span>ראשון - חמישי</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שישי</span>
                    <span className="font-semibold">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שבת</span>
                    <span className="text-muted-foreground">סגור</span>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs font-hebrew text-center">
                      מקרי חירום: זמינים גם מחוץ לשעות הפעילות דרך WhatsApp
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <WhatsAppFloat />
    </>
  );
};
