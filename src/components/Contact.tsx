
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      formSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      // Send the email using EmailJS or similar service
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      formData.append('recipient', 'joelomda583@gmail.com');
      
      // Example using fetch to a serverless function or email service
      try {
        const response = await fetch('https://formspree.io/f/joelomda583@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          toast({
            title: t('contact.success'),
            description: t('contact.successMessage'),
          });
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        // Simplified for demo - in real app, we would have proper error handling
        console.error('Error sending email:', error);
        toast({
          title: t('contact.error'),
          description: t('contact.errorMessage'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>{t('contact.title')}</h2>
          <p className="max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-card shadow-lg rounded-xl p-6 md:p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')}
                    className={errors.name ? "border-destructive" : ""}
                    dir={isRtl ? "rtl" : "ltr"}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    className={errors.email ? "border-destructive" : ""}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">{t('contact.subject')}</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subjectPlaceholder')}
                  className={errors.subject ? "border-destructive" : ""}
                  dir={isRtl ? "rtl" : "ltr"}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={5}
                  className={errors.message ? "border-destructive" : ""}
                  dir={isRtl ? "rtl" : "ltr"}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
