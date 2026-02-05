'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['hu']; // Ez a "t" lesz a fordító függvény
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Alapból magyar, de később megjegyezhetjük a választást
  const [language, setLanguage] = useState<Language>('hu');

  const value = {
    language,
    setLanguage,
    t: translations[language], // Ez adja vissza az aktuális szótárat
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Ezzel a kis "kampóval" (hook) érjük el bárhol a nyelvet
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}