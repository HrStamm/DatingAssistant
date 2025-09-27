'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../shared/context/ThemeContext';

export default function ErrorMessage({ error }) {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (error) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [error]);

  if (!error) return null;
  
  return (
    <div 
      className={`
        mt-6 p-4 rounded-lg border-l-4 flex items-start gap-3
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
        ${darkMode 
          ? 'bg-red-900/30 border-red-500 text-red-300' 
          : 'bg-red-50 border-red-500 text-red-700'
        }
      `}
    >
      <div className="flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <h3 className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
          Der opstod en fejl
        </h3>
        <p className={`mt-1 text-sm ${darkMode ? 'text-red-300/80' : 'text-red-700/90'}`}>
          {error}
        </p>
      </div>
    </div>
  );
}
