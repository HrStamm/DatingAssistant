'use client';

import { useState } from 'react';
import { useTheme } from '../../../shared/context/ThemeContext';
import { useLanguage } from '../../../shared/context/LanguageContext';
import { onboardingTranslations } from '../utils/onboardingTranslations';

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  
  const t = onboardingTranslations.tutorial;
  const totalSteps = t.steps.length;

  // Don't render if not open
  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - complete onboarding
      onComplete();
      setCurrentStep(0); // Reset for next time
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(0); // Reset for next time
  };

  const currentStepData = t.steps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className={`
            relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl overflow-hidden
            transform transition-all duration-300 scale-100
            ${darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/20' 
              : 'bg-gradient-to-br from-white to-purple-50 border border-purple-200'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className={`
              absolute top-4 right-4 z-10 w-8 h-8 rounded-full 
              flex items-center justify-center transition-all duration-200 hover:scale-110
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800'
              }
            `}
          >
            ×
          </button>

          {/* Header */}
          <div className="p-8 pb-4">
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {currentStep === 0 ? t.title[language] : currentStepData.title[language]}
              </h2>
              {currentStep === 0 && (
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t.subtitle[language]}
                </p>
              )}
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center space-x-2 mb-6">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index === currentStep 
                      ? (darkMode ? 'bg-purple-400' : 'bg-purple-500') 
                      : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-4">
            {/* 
              ONBOARDING IMAGES
              Images are located in: /public/images/onboarding/
              Files: step-1.png, step-2.svg, step-3.svg, step-4.svg
            */}
            <div className={`
              w-full h-96 rounded-2xl mb-6 flex items-center justify-center overflow-hidden
              ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}
            `}>
              {currentStep === 0 ? (
                // Step 1 - Real image
                <img 
                  src="/images/onboarding/step-1.jpg" 
                  alt={currentStepData.title[language]} 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load, showing fallback');
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : currentStep === 1 ? (
                // Step 2 - Real image
                <img 
                  src="/images/onboarding/step-2.jpg" 
                  alt={currentStepData.title[language]} 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load, showing fallback');
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : currentStep === 2 ? (
                // Step 3 - Real image
                <img 
                  src="/images/onboarding/step-3.jpg" 
                  alt={currentStepData.title[language]} 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load, showing fallback');
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : (
                // Step 4 - Real image
                <img 
                  src="/images/onboarding/step-4.jpg" 
                  alt={currentStepData.title[language]} 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    console.log('Image failed to load, showing fallback');
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              )}
              
              {/* Fallback for step 1 if image fails to load */}
              {currentStep === 0 && (
                <div className="text-center" style={{display: 'none'}}>
                  <div className="text-6xl mb-2">📸</div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Fallback: step-1.png not found
                  </p>
                </div>
              )}
            </div>

            {/* Step description */}
            <div className="text-center mb-8">
              <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {currentStepData.description[language]}
              </p>
            </div>
          </div>

          {/* Footer with navigation */}
          <div className={`
            px-8 py-6 border-t
            ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'}
          `}>
            <div className="flex justify-between items-center">
              {/* Previous button */}
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all duration-200
                  ${currentStep === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105'
                  }
                  ${darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                `}
              >
                {t.previous[language]}
              </button>

              {/* Step indicator text */}
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentStep + 1} / {totalSteps}
              </span>

              {/* Next/Complete button */}
              <button
                onClick={handleNext}
                className={`
                  px-6 py-2 rounded-full font-bold transition-all duration-200 transform hover:scale-105
                  ${darkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                  }
                `}
              >
                {currentStep === totalSteps - 1 ? t.getStarted[language] : t.next[language]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
