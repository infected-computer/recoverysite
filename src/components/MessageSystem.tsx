import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from 'lucide-react';
import { X } from 'lucide-react';
import { Send } from 'lucide-react';
import { User } from 'lucide-react';
import { Phone } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export const MessageSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // כאן ניתן להוסיף שליחה לשרת או אימייל
      const emailBody = `שם: ${name}\nטלפון: ${phone}\n\nהודעה:\n${message}`;
      const subject = "הודעה חדשה מהאתר - מערכת הודעות";
      
      window.location.href = `mailto:doctorfix79@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      toast({
        title: "ההודעה נשלחה בהצלחה!",
        description: "נחזור אליך בהקדם האפשרי",
      });

      // איפוס הטופס
      setMessage("");
      setName("");
      setPhone("");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "שגיאה בשליחת ההודעה",
        description: "אנא נסה שוב או פנה דרך WhatsApp",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, אני זקוק לעזרה בשחזור קבצים. אשמח לקבל ייעוץ ראשוני.");
    window.open(`https://wa.me/972536657279?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Floating Message Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
            
            {/* Animation dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-hebrew whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            השאר הודעה
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
          </div>
        </div>
      )}

      {/* Message Form */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-hebrew text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  השאר הודעה
                </CardTitle>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-hebrew">
                נשמח לעזור! השאירו פרטים ונחזור אליכם בהקדם
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="msg-name" className="font-hebrew text-right flex items-center gap-2 justify-end">
                    <User className="h-4 w-4" />
                    שם מלא *
                  </Label>
                  <Input
                    id="msg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="font-hebrew text-right"
                    placeholder="הכנס את שמך"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="msg-phone" className="font-hebrew text-right flex items-center gap-2 justify-end">
                    <Phone className="h-4 w-4" />
                    טלפון *
                  </Label>
                  <Input
                    id="msg-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="font-hebrew text-right"
                    placeholder="050-1234567"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="msg-content" className="font-hebrew text-right">
                    ההודעה *
                  </Label>
                  <Textarea
                    id="msg-content"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    className="font-hebrew text-right resize-none"
                    placeholder="תאר את הבעיה או השאלה שלך..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 font-hebrew"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    ) : (
                      <Send className="ml-2 h-4 w-4" />
                    )}
                    {isSubmitting ? 'שולח...' : 'שלח'}
                  </Button>
                  <Button
                    type="button"
                    onClick={openWhatsApp}
                    variant="outline"
                    className="flex-1 font-hebrew"
                  >
                    WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
