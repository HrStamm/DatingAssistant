'use client';

import { useTheme } from '../../../shared/context/ThemeContext';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function OptimizerHeader() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations.profileOptimizer;

  return (
    <div className="text-center mb-8">
      <div className="text-6xl mb-4">✨📸</div>
      <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {t.title[language]}
      </h1>
      <p className={`text-center mb-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {t.subtitle[language]}
      </p>
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
        <span className="text-sm">🚀</span>
        <span className="text-sm font-medium">
          {language === 'da' ? 'Boost din dating success!' : 'Boost your dating success!'}
        </span>
      </div>
    </div>
  );
}
