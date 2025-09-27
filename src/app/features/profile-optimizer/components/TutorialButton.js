'use client';

import { useTheme } from '../../../shared/context/ThemeContext';

export default function TutorialButton({ onClick }) {
  const { darkMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-4 right-4 z-10 w-8 h-8 rounded-full 
        flex items-center justify-center text-sm font-bold
        transition-all duration-200 hover:scale-110 hover:shadow-lg
        ${darkMode 
          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/30' 
          : 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-500/30'
        }
      `}
      title="Show tutorial"
      aria-label="Show tutorial"
    >
      ?
    </button>
  );
}
