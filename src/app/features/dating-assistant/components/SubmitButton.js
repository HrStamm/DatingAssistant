'use client';
import { useState } from 'react';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function SubmitButton({ darkMode, loading, isDisabled, onClick }) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-full py-4 px-6 rounded-xl font-medium text-base sm:text-lg
        shadow-lg overflow-hidden
        transition-all duration-300 ease-out transform
        disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2
        ${darkMode ? 'focus:ring-indigo-500 focus:ring-offset-gray-900' : 'focus:ring-purple-500 focus:ring-offset-white'}
        ${isDisabled 
          ? darkMode 
            ? 'bg-gray-800 text-gray-600 border border-gray-700' 
            : 'bg-gray-100 text-gray-400 border border-gray-200'
          : isHovered && !loading
            ? darkMode
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 text-white scale-[1.02]'
              : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 text-white scale-[1.02]'
            : darkMode
              ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-purple-800 text-white'
              : 'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 text-white'
        }
      `}
    >
      {/* Background animation */}
      {!isDisabled && !loading && (
        <span 
          className={`absolute inset-0 h-full w-full ${isHovered ? 'animate-shimmer' : ''}`}
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
            backgroundSize: '200% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isHovered ? 'right -40px center' : 'left -40px center',
            transition: 'background-position 1s ease-in-out'
          }}
        />
      )}
      
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="relative">
            {language === 'da' ? 'Tænker over svaret' : 'Thinking about the reply'}
            <span className="animate-pulse">...</span>
          </span>
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
          {translations.mainPage.submitButton[language]}
        </span>
      )}
    </button>
  );
}
