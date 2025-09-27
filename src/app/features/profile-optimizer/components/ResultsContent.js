'use client';

import { useTheme } from '../../../shared/context/ThemeContext';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function ResultsContent({ mockResults, handleReset }) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations.profileOptimizer;

  return (
    <div className="p-8 space-y-8">
      {/* Strengths with fun icons */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-green-900/20 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">💪</span>
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {t.results.strengthsTitle[language]}
          </h3>
          <span className="text-2xl animate-pulse">✨</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockResults.strengths.map((strength, index) => (
            <div key={index} className={`flex items-center gap-3 p-4 rounded-xl ${darkMode ? 'bg-green-800/20' : 'bg-green-100/50'}`}>
              <div className={`p-2 rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'}`}>
                <span className="text-lg">✓</span>
              </div>
              <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                {strength}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Improvements with guidance icons */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-yellow-900/20 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎯</span>
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {t.results.improvementTitle[language]}
          </h3>
          <span className="text-2xl animate-bounce">💡</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockResults.improvements.map((improvement, index) => (
            <div key={index} className={`flex items-center gap-3 p-4 rounded-xl ${darkMode ? 'bg-yellow-800/20' : 'bg-yellow-100/50'}`}>
              <div className={`p-2 rounded-full ${darkMode ? 'bg-yellow-600' : 'bg-yellow-500'}`}>
                <span className="text-lg">💡</span>
              </div>
              <span className={`font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                {improvement}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Try again button with celebration */}
      <div className="text-center pt-6">
        <button
          onClick={handleReset}
          className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
            ${darkMode 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/50' 
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-purple-500/30'}
          `}
        >
          <span className="text-xl">🔄</span>
          {t.results.tryAgainButton[language]}
          <span className="text-xl animate-spin">⚡</span>
        </button>
      </div>
    </div>
  );
}
