'use client';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <div className="fixed top-16 right-4 z-50">
      <button
        onClick={toggleLanguage}
        className="relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        style={{ 
          background: darkMode 
            ? 'linear-gradient(to right, #4c1d95, #1e40af)' 
            : 'linear-gradient(to right, #f97316, #fbbf24)' 
        }}
        aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
      >
        <span 
          className={`absolute block w-6 h-6 rounded-full transform transition-transform duration-300 ease-in-out ${language === 'da' ? 'translate-x-0 bg-white' : 'translate-x-8 bg-indigo-200'}`}
          style={{ top: '4px' }}
        >
          <span className="flex items-center justify-center h-full w-full">
            {language === 'da' ? (
              <span className="font-bold text-xs text-indigo-900">DA</span>
            ) : (
              <span className="font-bold text-xs text-indigo-900">EN</span>
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
