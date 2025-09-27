'use client';
import { useState } from 'react';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function ToneSelector({ darkMode, tone, setTone }) {
  const { language } = useLanguage();
  const [hoveredTone, setHoveredTone] = useState(null);

  const tones = [
    { 
      id: 'flirtende', 
      emoji: '😘', 
      text: translations.mainPage.toneSelector.options.flirty[language],
      gradient: darkMode 
        ? 'from-pink-600 to-purple-700'
        : 'from-pink-500 to-purple-600',
      hoverGradient: darkMode
        ? 'from-pink-500 to-purple-600'
        : 'from-pink-400 to-purple-500'
    },
    { 
      id: 'sjov', 
      emoji: '😂', 
      text: translations.mainPage.toneSelector.options.funny[language],
      gradient: darkMode 
        ? 'from-yellow-600 to-orange-700'
        : 'from-yellow-500 to-orange-600',
      hoverGradient: darkMode
        ? 'from-yellow-500 to-orange-600'
        : 'from-yellow-400 to-orange-500'
    },
    { 
      id: 'romantisk', 
      emoji: '❤️', 
      text: language === 'da' ? 'Romantisk' : 'Romantic',
      gradient: darkMode 
        ? 'from-red-600 to-pink-700'
        : 'from-red-500 to-pink-600',
      hoverGradient: darkMode
        ? 'from-red-500 to-pink-600'
        : 'from-red-400 to-pink-500'
    },
    { 
      id: 'afslappet', 
      emoji: '😎', 
      text: translations.mainPage.toneSelector.options.casual[language],
      gradient: darkMode 
        ? 'from-blue-600 to-indigo-700'
        : 'from-blue-500 to-indigo-600',
      hoverGradient: darkMode
        ? 'from-blue-500 to-indigo-600'
        : 'from-blue-400 to-indigo-500'
    }
  ];

  return (
    <div className="mb-8">
      <label className={`block text-sm font-bold uppercase tracking-wide mb-3
        ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>
        {translations.mainPage.toneSelector.title[language]}:
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tones.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTone(item.id)}
            onMouseEnter={() => setHoveredTone(item.id)}
            onMouseLeave={() => setHoveredTone(null)}
            className={`
              relative p-3 rounded-xl font-medium transition-all duration-300
              hover:transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${darkMode ? 'focus:ring-indigo-500 focus:ring-offset-gray-900' : 'focus:ring-purple-500 focus:ring-offset-white'}
              ${tone === item.id 
                ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg`
                : darkMode 
                  ? `bg-gray-800 border-2 border-gray-700 text-gray-300 
                     ${hoveredTone === item.id ? 'bg-gray-750' : ''}`
                  : `bg-white border-2 border-purple-100 text-gray-700 shadow-md
                     ${hoveredTone === item.id ? 'bg-purple-50' : ''}`
              }
            `}
          >
            <span className={`text-xl mb-1 ${tone === item.id ? 'animate-bounce' : ''}`}>
              {item.emoji}
            </span>
            <span className="block">{item.text}</span>
            
            {/* Active indicator dot */}
            {tone === item.id && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
