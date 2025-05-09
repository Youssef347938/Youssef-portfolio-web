import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '@/data/translations/en.json';
import arTranslations from '@/data/translations/ar.json';

type Language = 'en' | 'ar';
type TranslationsType = Record<string, string>;

interface LanguageContextType {
  language: Language;
  translations: TranslationsType;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<TranslationsType>(enTranslations);

  useEffect(() => {
    // Check if user has previously set language preference
    const storedLanguage = localStorage.getItem('language') as Language | null;
    
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ar')) {
      setLanguageState(storedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update translations when language changes
    setTranslations(language === 'en' ? enTranslations : arTranslations);
    
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Store language preference
    localStorage.setItem('language', language);
    
    // Add language-specific class to body
    document.body.classList.remove('lang-en', 'lang-ar');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    // Force a page refresh when language changes
    window.location.reload();
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
