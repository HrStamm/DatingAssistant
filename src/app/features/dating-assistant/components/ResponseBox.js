'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function ResponseBox({ darkMode, response, onCopy, onRegenerate }) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  
  useEffect(() => {
    if (response) {
      setIsVisible(true);
    }
  }, [response]);

  if (!response) return null;

  const handleCopy = () => {
    setIsCopying(true);
    onCopy();
    setCopySuccess(true);
    
    setTimeout(() => {
      setCopySuccess(false);
      setIsCopying(false);
    }, 2000);
  };
  
  return (
    <div 
      className={`
        mt-8 rounded-xl shadow-xl p-6 border backdrop-blur-sm
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        ${darkMode 
          ? 'bg-gray-800/70 border-purple-800/30 shadow-purple-900/10' 
          : 'bg-white border-purple-100 shadow-purple-200/30'
        }
      `}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-orange-400 to-purple-600 -z-10"></div>
      
      <div className="flex items-center mb-4">
        <div className={`w-1 h-8 rounded-full mr-3 ${darkMode ? 'bg-orange-500' : 'bg-purple-600'}`}></div>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
          {language === 'da' ? 'Dit perfekte svar' : 'Your perfect reply'}
        </h3>
      </div>
      
      <div 
        className={`
          relative p-5 rounded-lg mb-5
          ${darkMode ? 'bg-gray-900/80 text-indigo-100' : 'bg-indigo-50 text-gray-800'}
        `}
      >
        <blockquote className="text-lg leading-relaxed italic whitespace-pre-wrap">
          {response}
        </blockquote>
        
        {/* Quote marks for styling */}
        <span 
          className={`absolute top-1 left-2 text-4xl opacity-20 ${darkMode ? 'text-indigo-500' : 'text-indigo-400'}`}
        >
          "
        </span>
        <span 
          className={`absolute bottom-1 right-3 text-4xl opacity-20 ${darkMode ? 'text-indigo-500' : 'text-indigo-400'}`}
        >
          "
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          disabled={isCopying}
          className={`
            py-2.5 px-5 rounded-lg font-medium text-sm flex items-center gap-2
            transition-all duration-300 hover:shadow-md
            ${darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-indigo-300' 
              : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200'
            }
          `}
        >
          {copySuccess ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {translations.mainPage.responseSection.copiedConfirmation[language]}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {translations.mainPage.responseSection.copyToClipboard[language]}
            </>
          )}
        </button>
        
        <button
          onClick={onRegenerate}
          className={`
            py-2.5 px-5 rounded-lg font-medium text-sm flex items-center gap-2
            transition-all duration-300 hover:shadow-md
            ${darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-orange-300' 
              : 'bg-white hover:bg-orange-50 text-orange-700 border border-orange-200'
            }
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          {translations.mainPage.responseSection.regenerate[language]}
        </button>
        
        <button
          onClick={() => {
            const intro = language === 'da' ? 'Her er et godt flirtende svar' : 'Here is a good flirty reply';
            const text = encodeURIComponent(`${intro}: "${response}"`);
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
          }}
          className={`
            py-2.5 px-5 rounded-lg font-medium text-sm flex items-center gap-2
            transition-all duration-300 hover:shadow-md
            ${darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-green-300' 
              : 'bg-white hover:bg-green-50 text-green-700 border border-green-200'
            }
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          {language === 'da' ? 'Del på WhatsApp' : 'Share on WhatsApp'}
        </button>
      </div>
    </div>
  );
}
