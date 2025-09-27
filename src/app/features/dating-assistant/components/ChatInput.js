'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function ChatInput({ darkMode, partnerMessage, setPartnerMessage }) {
  const { language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(100, textarea.scrollHeight) + 'px';
    }
  }, [partnerMessage]);

  return (
    <div className="mb-6 relative">
      <label 
        className={`block text-sm font-bold mb-2 uppercase tracking-wide
          ${darkMode ? 'text-indigo-300' : 'text-indigo-800'} 
          transition-colors duration-300`}
      >
        {language === 'da' ? 'Besked fra din flirt' : 'Message from your match'}
      </label>
      
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
        <textarea
          ref={textareaRef}
          value={partnerMessage}
          onChange={(e) => setPartnerMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={translations.mainPage.partnerMessagePlaceholder[language]}
          className={`w-full p-4 min-h-[120px] rounded-xl transition-all duration-300 ease-in-out
            ${darkMode 
              ? 'bg-gray-800 text-white placeholder-gray-400 shadow-lg shadow-indigo-900/10' 
              : 'bg-white text-gray-900 placeholder-gray-500 shadow-lg shadow-purple-300/30'
            }
            ${isFocused
              ? darkMode
                ? 'border-2 border-indigo-500 ring-2 ring-indigo-500/20'
                : 'border-2 border-purple-500 ring-2 ring-purple-500/20'
              : darkMode
                ? 'border-2 border-gray-700'
                : 'border-2 border-purple-100'
            }
            focus:outline-none resize-none`}
        />
        
        <div 
          className={`absolute bottom-3 right-3 text-xs
            ${darkMode ? 'text-gray-400' : 'text-gray-500'}
            transition-opacity duration-300 ${partnerMessage.length > 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          {partnerMessage.length} {translations.mainPage.characterCount[language]}
        </div>
      </div>
    </div>
  );
}
