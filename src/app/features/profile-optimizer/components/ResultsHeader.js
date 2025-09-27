'use client';

import { useTheme } from '../../../shared/context/ThemeContext';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

export default function ResultsHeader({ preview }) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations.profileOptimizer;

  return (
    <div className={`p-8 border-b-2 ${darkMode ? 'border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20' : 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50'}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'}`}>
          <span className="text-3xl">🎉</span>
        </div>
        <div className="flex-1">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {t.results.title[language]}
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'da' ? 'Din profil er blevet analyseret!' : 'Your profile has been analyzed!'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-4xl animate-bounce">🏆</span>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Image preview with decorative frame */}
        <div className="w-full lg:w-1/3">
          <div className="relative">
            <div className={`p-2 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-purple-600 to-indigo-600' : 'bg-gradient-to-br from-purple-500 to-indigo-500'}`}>
              <img src={preview} alt="Profile" className="w-full h-auto rounded-xl shadow-lg" />
            </div>
            <div className="absolute -top-3 -right-3">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'} shadow-lg`}>
                <span className="text-xl">✨</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overall Score with celebration */}
        <div className="w-full lg:w-2/3">
          <ScoreDisplay />
        </div>
      </div>
    </div>
  );
}

function ScoreDisplay() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations.profileOptimizer;
  
  // Mock data - this would come from props in real implementation
  const overallScore = 7.5;

  return (
    <div className={`rounded-2xl p-6 text-center ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200'}`}>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-3xl">⭐</span>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {t.results.overallScore[language]}
        </h3>
        <span className="text-3xl">⭐</span>
      </div>
      <div className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {overallScore}/10
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-6 rounded-full transition-all duration-2000 ease-out shadow-lg"
          style={{ width: `${overallScore * 10}%` }}
        ></div>
      </div>
      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold ${
        overallScore >= 8 
          ? (darkMode ? 'bg-green-900/30 text-green-300 border border-green-500/20' : 'bg-green-100 text-green-700 border border-green-200')
          : overallScore >= 6
          ? (darkMode ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border border-yellow-200')
          : (darkMode ? 'bg-red-900/30 text-red-300 border border-red-500/20' : 'bg-red-100 text-red-700 border border-red-200')
      }`}>
        <span className="text-xl">
          {overallScore >= 8 ? '🔥' : overallScore >= 6 ? '👍' : '💪'}
        </span>
        <span>
          {overallScore >= 8 
            ? (language === 'da' ? 'Fantastisk profil!' : 'Amazing profile!') 
            : overallScore >= 6 
            ? (language === 'da' ? 'God profil!' : 'Good profile!') 
            : (language === 'da' ? 'Kan forbedres' : 'Room for improvement')
          }
        </span>
      </div>
    </div>
  );
}
