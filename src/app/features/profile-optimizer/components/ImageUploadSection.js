'use client';

import { useTheme } from '../../../shared/context/ThemeContext';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';
import TutorialButton from './TutorialButton';

export default function ImageUploadSection({ 
  preview, 
  image, 
  isUploading, 
  error, 
  fileInputRef, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop, 
  handleFileChange,
  showTutorialButton = false,
  onTutorialClick 
}) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations.profileOptimizer;

  return (
    <div className={`relative p-8 border-b-2 ${darkMode ? 'border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-indigo-900/20' : 'border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50'}`}>
      {/* Tutorial button - only show if user has seen onboarding before */}
      {showTutorialButton && (
        <TutorialButton onClick={onTutorialClick} />
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-500'}`}>
          <span className="text-2xl">📤</span>
        </div>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {t.uploadSection.title[language]}
        </h2>
      </div>
      
      <p className={`mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {t.uploadSection.description[language]}
      </p>
      
      <div 
        className={`
          border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
          ${isUploading ? 'bg-opacity-80 scale-105' : ''}
          ${preview 
            ? 'border-green-400 bg-green-50 dark:bg-green-900/20' 
            : (darkMode 
              ? 'border-purple-400 hover:border-purple-300 bg-purple-900/20 hover:bg-purple-900/30' 
              : 'border-purple-300 hover:border-purple-400 bg-purple-50 hover:bg-purple-100'
            )
          }
        `}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="relative w-72 h-72 mb-4 rounded-2xl overflow-hidden shadow-lg">
                <img src={preview} alt="Preview" className="object-cover w-full h-full" />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                <span className="text-lg">✓</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'}`}>
              <span className="text-sm">📁</span>
              <p className="text-sm font-medium">{image.name}</p>
            </div>
          </div>
        ) : (
          <>
            <div className={`mb-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center relative ${darkMode ? 'bg-purple-600' : 'bg-purple-500'}`}>
              <span className="text-4xl">📸</span>
              <div className="absolute -top-1 -right-1 animate-bounce">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <p className={`font-bold text-xl mb-2 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              {t.uploadSection.dragDropText[language]}
            </p>
            <p className={`text-lg mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'da' ? 'eller klik her for at vælge' : 'or click here to choose'}
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? 'bg-purple-800/50 text-purple-300' : 'bg-purple-200 text-purple-700'}`}>
              <span className="text-sm">📋</span>
              <p className="text-sm font-medium">
                {t.uploadSection.fileTypes[language]}
              </p>
            </div>
          </>
        )}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg, image/png" 
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      
      {error && (
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-full ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-500/20' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            <span className="text-lg">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
