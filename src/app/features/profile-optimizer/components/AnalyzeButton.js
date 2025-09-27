'use client';

import { useTheme } from '../../../shared/context/ThemeContext';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function AnalyzeButton({ 
  image, 
  isAnalyzing, 
  handleAnalyze 
}) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations.profileOptimizer;

  return (
    <div className="mt-8 mb-8 flex justify-center">
      <button
        onClick={handleAnalyze}
        disabled={!image || isAnalyzing}
        className={`
          px-8 py-4 rounded-full font-bold text-lg transition-all shadow-2xl flex items-center gap-3 transform hover:scale-105
          ${!image || isAnalyzing 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:shadow-purple-500/50'}
          ${darkMode 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-900/50' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-purple-500/30'}
        `}
      >
        {isAnalyzing ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{t.uploadSection.analyzing[language]}</span>
            <span className="text-xl animate-pulse">⚡</span>
          </>
        ) : (
          <>
            <span className="text-xl">🚀</span>
            <span>{t.uploadSection.optimizeButton[language]}</span>
            <span className="text-xl animate-bounce">✨</span>
          </>
        )}
      </button>
    </div>
  );
}
