'use client';

import { useTheme } from '../shared/context/ThemeContext';
import { useLanguage } from '../shared/context/LanguageContext';
import ConstructionIllustration from '../components/ConstructionIllustration';
import Link from 'next/link';

// Local translations for the coming soon page
const comingSoonTranslations = {
  da: {
    headline: 'Kommer snart',
    subtext: 'Siden er under ombygning.',
    backToHome: 'Tilbage til forsiden'
  },
  en: {
    headline: 'Coming soon',
    subtext: 'This page is under construction.',
    backToHome: 'Back to home'
  }
};

export default function AboutPage() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = comingSoonTranslations[language];
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Main headline */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-8 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {t.headline}
        </h1>
        
        {/* Construction illustration with respectful animation handling */}
        <div 
          className="mb-8 flex justify-center motion-reduce:animate-none"
          style={{
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none'
            }
          }}
        >
          <ConstructionIllustration 
            size="xl" 
            darkMode={darkMode}
            className="transition-colors duration-300"
          />
        </div>
        
        {/* Subtext */}
        <p className={`text-xl sm:text-2xl mb-12 transition-colors duration-300 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {t.subtext}
        </p>
        
        {/* Call to action button */}
        <Link href="/" className="group">
          <button className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-lg
            transition-all duration-300 ease-out transform hover:scale-105 focus:scale-105
            focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg
            ${darkMode 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus:ring-purple-500 focus:ring-offset-gray-900 shadow-purple-900/20' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus:ring-purple-500 focus:ring-offset-white shadow-purple-500/10'
            }
          `}>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            {t.backToHome}
          </button>
        </Link>
        
        {/* Footer note */}
        <div className={`mt-16 text-sm transition-colors duration-300 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p>Vi arbejder hårdt på at gøre denne side fantastisk! 🚧</p>
        </div>
      </div>
    </main>
  );
}
