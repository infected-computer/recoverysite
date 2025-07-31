/* --------------------------------------------------------------
   ContactForm.tsx – נגיש ומותאם WCAG 2.2
   --------------------------------------------------------------
*/

import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Phone, User, FileText, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { sendContactEmail, sendToWhatsApp } from "@/services/emailService";
import { useAccessibleColors } from "@/hooks/useAccessibleColors";
import { ariaUtils } from "@/utils/accessibilityUtils";
   
interface FormErrors {
  name?: string;
  phone?: string;
  description?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Generate unique IDs for accessibility
  const nameId = useId();
  const phoneId = useId();
  const descriptionId = useId();
  const errorId = useId();
  
  const { colors } = useAccessibleColors();
   
  // Validation functions
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'שם מלא הוא שדה חובה';
        if (value.trim().length < 2) return 'שם חייב להכיל לפחות 2 תווים';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'מספר טלפון הוא שדה חובה';
        const phoneRegex = /^[0-9\-\s\+\(\)]{9,}$/;
        if (!phoneRegex.test(value)) return 'מספר טלפון לא תקין';
        return undefined;
      case 'description':
        if (!value.trim()) return 'תיאור התקלה הוא שדה חובה';
        if (value.trim().length < 10) return 'תיאור חייב להכיל לפחות 10 תווים';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.description = validateField('description', formData.description);
    
    setErrors(newErrors);
    
    // Focus first error field
    const firstErrorField = Object.keys(newErrors).find(key => newErrors[key as keyof FormErrors]);
    if (firstErrorField) {
      const element = document.getElementById(
        firstErrorField === 'name' ? nameId :
        firstErrorField === 'phone' ? phoneId : descriptionId
      );
      element?.focus();
    }
    
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      ariaUtils.announce('יש שגיאות בטופס, אנא תקן אותן', 'assertive');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { success, error } = await sendContactEmail({
        name: formData.name,
        phone: formData.phone,
        email: "",
        message: formData.description,
      });

      if (success) {
        toast({
          title: "הפנייה נשלחה בהצלחה!",
          description: "נחזור אליך בקרוב",
        });
        setFormData({ name: "", phone: "", description: "" });
        setErrors({});
        setTouched({});
        ariaUtils.announce('הפנייה נשלחה בהצלחה', 'polite');
      } else {
        toast({
          title: "שגיאה בשליחת הפנייה",
          description: error || "אנא נסה שוב מאוחר יותר",
          variant: "destructive",
        });
        ariaUtils.announce('שגיאה בשליחת הפנייה', 'assertive');
      }
    } catch (err) {
      toast({
        title: "שגיאה בשליחת הפנייה",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
      ariaUtils.announce('שגיאה בשליחת הפנייה', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };
   
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
   
     return (
       <section id="contact-form" className="py-20 bg-background">
         <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="font-hebrew text-3xl md:text-4xl font-bold mb-4">
               בואו נתחיל
             </h2>
             <p className="font-hebrew text-lg text-muted-foreground max-w-2xl mx-auto">
               מלא את הטופס הפשוט ונחזור אליך עם הערכה ראשונית
             </p>
           </div>
   
           <div className="max-w-4xl mx-auto">
             <Card className="shadow-xl border border-primary/10">
               <CardHeader className="text-center pb-8">
                 <CardTitle className="font-hebrew text-2xl">
                   שליחת פנייה
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <form onSubmit={handleSubmit} className="form-responsive touch-friendly-form space-y-6" noValidate>
                   <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Name Field */}
                     <div className="space-y-2">
                       <Label
                         htmlFor={nameId}
                         className="font-hebrew text-right flex items-center gap-2 justify-end text-base font-medium"
                         style={{ color: colors.text.primary }}
                       >
                         <User className="h-4 w-4" aria-hidden="true" />
                         שם מלא
                         <span className="text-red-600 ml-1" aria-label="שדה חובה">*</span>
                       </Label>
                       <Input
                         id={nameId}
                         name="name"
                         type="text"
                         value={formData.name}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         required
                         aria-required="true"
                         aria-invalid={!!errors.name}
                         aria-describedby={errors.name ? `${nameId}-error` : undefined}
                         className={`font-hebrew text-right transition-colors ${
                           errors.name 
                             ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                             : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                         }`}
                         placeholder="הכנס את שמך המלא"
                       />
                       {errors.name && (
                         <div 
                           id={`${nameId}-error`}
                           className="flex items-center gap-2 text-red-600 text-sm"
                           role="alert"
                           aria-live="polite"
                         >
                           <AlertCircle className="h-4 w-4" aria-hidden="true" />
                           {errors.name}
                         </div>
                       )}
                     </div>
   
                     {/* Phone Field */}
                     <div className="space-y-2">
                       <Label
                         htmlFor={phoneId}
                         className="font-hebrew text-right flex items-center gap-2 justify-end text-base font-medium"
                         style={{ color: colors.text.primary }}
                       >
                         <Phone className="h-4 w-4" aria-hidden="true" />
                         מספר טלפון
                         <span className="text-red-600 ml-1" aria-label="שדה חובה">*</span>
                       </Label>
                       <Input
                         id={phoneId}
                         name="phone"
                         type="tel"
                         value={formData.phone}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         required
                         aria-required="true"
                         aria-invalid={!!errors.phone}
                         aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                         className={`font-hebrew text-right transition-colors ${
                           errors.phone 
                             ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                             : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                         }`}
                         placeholder="050-1234567"
                       />
                       {errors.phone && (
                         <div 
                           id={`${phoneId}-error`}
                           className="flex items-center gap-2 text-red-600 text-sm"
                           role="alert"
                           aria-live="polite"
                         >
                           <AlertCircle className="h-4 w-4" aria-hidden="true" />
                           {errors.phone}
                         </div>
                       )}
                     </div>
                   </div>
   
                   {/* Description Field */}
                   <div className="space-y-2">
                     <Label
                       htmlFor={descriptionId}
                       className="font-hebrew text-right flex items-center gap-2 justify-end text-base font-medium"
                       style={{ color: colors.text.primary }}
                     >
                       <FileText className="h-4 w-4" aria-hidden="true" />
                       תיאור התקלה
                       <span className="text-red-600 ml-1" aria-label="שדה חובה">*</span>
                     </Label>
                     <Textarea
                       id={descriptionId}
                       name="description"
                       value={formData.description}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       required
                       aria-required="true"
                       aria-invalid={!!errors.description}
                       aria-describedby={errors.description ? `${descriptionId}-error` : undefined}
                       rows={5}
                       className={`font-hebrew text-right resize-none transition-colors ${
                         errors.description 
                           ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                           : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                       }`}
                       placeholder="אנא תאר בקצרה מה קרה לקבצים (למשל: מחיקה בטעות, קרס המחשב, כונן לא נפתח וכו')"
                     />
                     {errors.description && (
                       <div 
                         id={`${descriptionId}-error`}
                         className="flex items-center gap-2 text-red-600 text-sm"
                         role="alert"
                         aria-live="polite"
                       >
                         <AlertCircle className="h-4 w-4" aria-hidden="true" />
                         {errors.description}
                       </div>
                     )}
                   </div>
   
                   {/* Submit Button */}
                   <div className="text-center pt-4">
                     <Button
                       type="submit"
                       disabled={isSubmitting}
                       className="bg-primary hover:bg-primary-dark text-white font-hebrew text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                       style={{
                         backgroundColor: colors.primary[500],
                         color: colors.text.inverse
                       }}
                       aria-describedby={isSubmitting ? 'submit-status' : undefined}
                     >
                       {isSubmitting ? (
                         <>
                           <div 
                             className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"
                             aria-hidden="true"
                           ></div>
                           <span id="submit-status">שולח...</span>
                         </>
                       ) : (
                         <>
                           <Send className="ml-2 h-5 w-5" aria-hidden="true" />
                           שלח פנייה
                         </>
                       )}
                     </Button>
                   </div>
                   
                   {/* Screen reader only instructions */}
                   <div className="sr-only">
                     <p>שדות המסומנים בכוכבית (*) הם שדות חובה</p>
                     <p>לאחר שליחת הטופס תקבל הודעת אישור</p>
                   </div>
                 </form>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>
     );
   };
   