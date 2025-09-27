'use client';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

export default function Header() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  return (
    <div className="text-center mb-12 relative z-10 pt-10">
      <div className="overflow-visible pb-2">
        <div className="relative inline-block">
          <h1 
            className={`text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent ${
              darkMode 
                ? 'bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200' 
                : 'bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900'
            }`}
            style={{ 
              paddingBottom: '0.0em',
              paddingTop: '0.0em',
              lineHeight: '1.3',
              display: 'inline-block'
            }}
          >
            {translations.header.title[language]}
          </h1>
        </div>
      </div>
      
      <div className="relative inline-block mt-0.1">
        <p 
          className={`text-lg md:text-xl max-w-2xl mx-auto ${
            darkMode ? 'text-indigo-100' : 'text-indigo-900'
          }`}
        >
          {translations.header.subtitle[language]}
        </p>
        <div 
          className={`h-1 w-24 rounded-full mx-auto mt-3 ${
            darkMode ? 'bg-orange-500' : 'bg-purple-600'
          }`}
        ></div>
      </div>

      {/* Animated background element */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10 animate-pulse"
        style={{ 
          background: darkMode 
            ? 'linear-gradient(to right, #6366f1, #a855f7)' 
            : 'linear-gradient(to right, #7e22ce, #4f46e5)'
        }}
      ></div>
    </div>
  );
}
