/* RequestForm.tsx – גרסה מעודכנת + תיקון “אי‑אפשר להקליד” */
/* --------------------------------------------------------------
   • נוספה תכונת name = id ל‑<input> ו‑<textarea> → ‑onChange
     יודע לאיזה שדה להצמיד את הערך.
   • שאר המראה הסולידי נשמר בדיוק.
-------------------------------------------------------------- */

import React, { useState, useCallback, useMemo, useId } from 'react';
import { Send, Phone, Mail, MessageSquare, User, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendContactEmail, sendToWhatsApp, ContactFormData } from '@/services/emailService';
import { useAccessibleColors } from '@/hooks/useAccessibleColors';
import { ariaUtils } from '@/utils/accessibilityUtils';

/* ---------- Types ---------- */
interface RequestFormProps {
  className?: string;
  onSubmit?: (data: FormData) => void;
  compact?: boolean;
  extraCompact?: boolean;
}

type FormData = ContactFormData;

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

/* ---------- Toast ---------- */
const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  React.useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-md bg-green-500 px-5 py-2.5 text-white shadow-md animate-[slide-in_0.3s_ease-out]">
      <CheckCircle className="h-5 w-5" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        ×
      </button>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

/* ---------- Main Form ---------- */
export const RequestForm: React.FC<RequestFormProps> = ({
  className,
  onSubmit,
  compact = false,
  extraCompact = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Generate unique IDs for accessibility
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const messageId = useId();
  
  const { colors } = useAccessibleColors();

  // Validation functions
  const validateField = useCallback((name: string, value: string): string | undefined => {
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
      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'כתובת אימייל לא תקינה';
        }
        return undefined;
      case 'message':
        if (!value.trim()) return 'הודעה היא שדה חובה';
        if (value.trim().length < 10) return 'הודעה חייבת להכיל לפחות 10 תווים';
        return undefined;
      default:
        return undefined;
    }
  }, []);

  /* handle change with validation */
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (formError) {
      setFormError('');
    }
  }, [errors, formError, validateField]);

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.email = validateField('email', formData.email);
    newErrors.message = validateField('message', formData.message);
    
    setErrors(newErrors);
    
    // Focus first error field
    const firstErrorField = Object.keys(newErrors).find(key => newErrors[key as keyof FormErrors]);
    if (firstErrorField) {
      const element = document.getElementById(
        firstErrorField === 'name' ? nameId :
        firstErrorField === 'phone' ? phoneId :
        firstErrorField === 'email' ? emailId : messageId
      );
      element?.focus();
    }
    
    return !Object.values(newErrors).some(error => error);
  }, [formData, validateField, nameId, phoneId, emailId, messageId]);

  // Memoized validation
  const isFormValid = useMemo(() => {
    return formData.name.trim().length >= 2 && 
           formData.phone.trim().length >= 9 && 
           formData.message.trim().length >= 10 &&
           (!formData.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
  }, [formData.name, formData.phone, formData.message, formData.email]);

  /* handle submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      ariaUtils.announce('יש שגיאות בטופס, אנא תקן אותן', 'assertive');
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');

    try {
      if (onSubmit) {
        onSubmit(formData);
      } else {
        const emailResult = await sendContactEmail(formData);
        
        if (emailResult.success) {
          console.log('Email sent successfully:', emailResult.id);
        } else {
          console.warn('Email sending failed:', emailResult.error);
          throw new Error(emailResult.error || 'שגיאה בשליחת המייל');
        }
      }
      
      setShowToast(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setErrors({});
      setTouched({});
      ariaUtils.announce('הבקשה נשלחה בהצלחה', 'polite');
    } catch (err) {
      console.error('Form submission error:', err);
      setFormError('שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בווצאפ.');
      ariaUtils.announce('שגיאה בשליחת הטופס', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* render */
  return (
    <>
      {showToast && (
        <Toast
          message="הבקשה נשלחה בהצלחה! ניצור איתך קשר בהקדם"
          onClose={() => setShowToast(false)}
        />
      )}

      <form
        dir="rtl"
        onSubmit={handleSubmit}
        noValidate
        className={cn(
          'form-responsive touch-friendly-form rounded-lg border border-[#D7DEE6] bg-[#FDFDFE] p-6 shadow-sm',
          extraCompact
            ? 'max-w-xs'
            : compact
            ? 'max-w-sm'
            : 'max-w-md w-full',
          className,
        )}
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-xl font-bold text-gray-900">צור קשר עכשיו</h3>
          {!compact && !extraCompact && (
            <p className="text-sm text-gray-600">
              מלאו את הפרטים ונחזור אליכם בהקדם
            </p>
          )}
        </div>

        {/* Fields */}
        <div
          className={cn(
            'form-row space-y-4',
            !compact &&
              !extraCompact &&
              'md:grid md:grid-cols-2 md:gap-4 md:space-y-0',
          )}
        >
          <Field
            id="name"
            fieldId={nameId}
            label="שם מלא"
            required
            icon={User}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />
          <Field
            id="phone"
            fieldId={phoneId}
            label="טלפון"
            required
            type="tel"
            icon={Phone}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
          />
          <Field
            id="email"
            fieldId={emailId}
            label="אימייל"
            type="email"
            icon={Mail}
            className={!compact && !extraCompact ? 'md:col-span-2' : ''}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <TextareaField
            id="message"
            fieldId={messageId}
            label="הודעה"
            required
            rows={extraCompact ? 2 : compact ? 3 : 4}
            icon={MessageSquare}
            className={!compact && !extraCompact ? 'md:col-span-2' : ''}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
          />
        </div>

        {formError && (
          <div className="mt-4 text-center text-sm font-medium text-red-600" role="alert">
            {formError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          aria-label="שלח בקשה ליצירת קשר"
          aria-describedby={isSubmitting ? 'submit-status' : undefined}
          className={cn(
            'mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-md font-semibold text-white transition-all duration-200',
            isFormValid && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg'
              : 'bg-gray-400 cursor-not-allowed',
            'focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
              <span id="submit-status">שולח...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              שלח בקשה
            </>
          )}
        </button>
        
        {/* Screen reader instructions */}
        <div className="sr-only mt-2">
          <p>שדות המסומנים בכוכבית (*) הם שדות חובה</p>
          <p>שדה האימייל הוא אופציונלי</p>
          <p>לאחר שליחת הטופס תקבל הודעת אישור</p>
        </div>
      </form>
    </>
  );
};

/* --------- Field (input) --------- */
interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  className?: string;
  error?: string;
  fieldId: string;
}
const Field: React.FC<FieldProps> = ({
  label,
  icon: Icon,
  required,
  className,
  id,
  error,
  fieldId,
  onBlur,
  ...rest
}) => (
  <div className={cn('relative', className)}>
    <label
      htmlFor={fieldId}
      className="absolute -top-3 right-3 z-10 bg-[#FDFDFE] px-3 text-sm font-medium text-gray-700"
    >
      {label} {required && <span className="text-red-500" aria-label="שדה חובה">*</span>}
      {!required && <span className="text-gray-500 text-xs">(אופציונלי)</span>}
    </label>
    <Icon className="absolute right-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
    <input
      id={fieldId}
      name={id}
      {...rest}
      required={required}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${fieldId}-error` : undefined}
      onBlur={onBlur}
      className={cn(
        "h-12 w-full rounded-md border bg-white pr-12 pl-4 text-right text-gray-900 transition-all duration-200 hover:border-[#BFC9D6] focus:outline-none focus:ring-2",
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
          : 'border-[#D7DEE6] focus:border-blue-500 focus:ring-blue-200'
      )}
    />
    {error && (
      <div 
        id={`${fieldId}-error`}
        className="flex items-center gap-2 text-red-600 text-sm mt-1"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        {error}
      </div>
    )}
  </div>
);

/* --------- Textarea --------- */
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon: React.ElementType;
  className?: string;
  error?: string;
  fieldId: string;
}
const TextareaField: React.FC<TextAreaProps> = ({
  label,
  icon: Icon,
  required,
  className,
  id,
  error,
  fieldId,
  onBlur,
  ...rest
}) => (
  <div className={cn('relative', className)}>
    <label
      htmlFor={fieldId}
      className="absolute -top-3 right-3 z-10 bg-[#FDFDFE] px-3 text-sm font-medium text-gray-700"
    >
      {label} {required && <span className="text-red-500" aria-label="שדה חובה">*</span>}
    </label>
    <Icon className="absolute right-3 top-4 z-10 h-5 w-5 text-gray-400" aria-hidden="true" />
    <textarea
      id={fieldId}
      name={id}
      {...rest}
      required={required}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${fieldId}-error` : undefined}
      onBlur={onBlur}
      className={cn(
        "w-full resize-none rounded-md border bg-white pr-12 pl-4 pt-4 pb-4 text-right text-gray-900 transition-all duration-200 hover:border-[#BFC9D6] focus:outline-none focus:ring-2",
        error 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
          : 'border-[#D7DEE6] focus:border-blue-500 focus:ring-blue-200'
      )}
    />
    {error && (
      <div 
        id={`${fieldId}-error`}
        className="flex items-center gap-2 text-red-600 text-sm mt-1"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        {error}
      </div>
    )}
  </div>
);

export default RequestForm;
