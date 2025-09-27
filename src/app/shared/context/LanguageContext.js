'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('da'); // 'da' for dansk, 'en' for engelsk
  const [langLoaded, setLangLoaded] = useState(false);
  
  // Load language preference on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('language');
      
      if (storedPreference !== null) {
        setLanguage(storedPreference);
      }
      setLangLoaded(true);
    }
  }, []);
  
  // Update localStorage when language changes
  useEffect(() => {
    if (langLoaded && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language, langLoaded]);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'da' ? 'en' : 'da');
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
