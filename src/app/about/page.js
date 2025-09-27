'use client';

import { useTheme } from '../shared/context/ThemeContext';
import { useLanguage } from '../shared/context/LanguageContext';
import translations from '../shared/utils/translations';

export default function AboutPage() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 px-4 sm:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'da' ? 'Om Dating Assistant' : 'About Dating Assistant'}
        </h1>
        
        <div className={`mt-8 rounded-2xl p-8 ${darkMode ? 'bg-gray-800 shadow-purple-900/20' : 'bg-white shadow-lg shadow-purple-500/10'}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {language === 'da' ? 'Vores Mission' : 'Our Mission'}
          </h2>
          
          <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'da' 
              ? 'Dating Assistant er skabt for at hjælpe dig med at navigere i den ofte udfordrende verden af online dating. Vores mål er at give dig værktøjerne til at kommunikere autentisk og effektivt, så du kan skabe meningsfulde forbindelser.' 
              : 'Dating Assistant was created to help you navigate the often challenging world of online dating. Our goal is to provide you with the tools to communicate authentically and effectively, allowing you to create meaningful connections.'}
          </p>
          
          <h2 className={`text-2xl font-semibold mb-4 mt-10 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {language === 'da' ? 'Hvem er vi?' : 'Who are we?'}
          </h2>
          
          <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'da'
              ? 'Vi er et team af teknologientusiaster, dating-coaches og kommunikationseksperter, der er passionerede omkring at kombinere AI med menneskelig indsigt for at forbedre dine dating-oplevelser. Dating Assistant blev grundlagt i 2025 af Valdemar Stamm.'
              : 'We are a team of technology enthusiasts, dating coaches, and communication experts passionate about combining AI with human insight to improve your dating experiences. Dating Assistant was founded in 2025 by Valdemar Stamm.'}
          </p>
          
          <h2 className={`text-2xl font-semibold mb-4 mt-10 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {language === 'da' ? 'Vores Værdier' : 'Our Values'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {language === 'da' ? 'Autenticitet' : 'Authenticity'}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'da'
                  ? 'Vi tror på at hjælpe dig med at udtrykke din sande personlighed, ikke på at skabe en falsk persona.'
                  : 'We believe in helping you express your true personality, not creating a false persona.'}
              </p>
            </div>
            
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {language === 'da' ? 'Empati' : 'Empathy'}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'da'
                  ? 'Vores forslag fokuserer på at skabe respektfulde og empatiske forbindelser mellem mennesker.'
                  : 'Our suggestions focus on creating respectful and empathetic connections between people.'}
              </p>
            </div>
            
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {language === 'da' ? 'Innovation' : 'Innovation'}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'da'
                  ? 'Vi stræber konstant efter at forbedre vores værktøjer med de nyeste teknologier og indsigter.'
                  : 'We constantly strive to improve our tools with the latest technologies and insights.'}
              </p>
            </div>
            
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {language === 'da' ? 'Privatlivets Fred' : 'Privacy'}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'da'
                  ? 'Din information er vigtig for os. Vi beskytter dine data og respekterer dit privatliv.'
                  : 'Your information matters to us. We safeguard your data and respect your privacy.'}
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {language === 'da'
                ? '"Vi tror på, at den bedste dating-oplevelse kommer fra autentiske forbindelser."'
                : '"We believe that the best dating experience comes from authentic connections."'}
            </p>
            <p className={`mt-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              - Valdemar Stamm, {language === 'da' ? 'Grundlægger' : 'Founder'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
