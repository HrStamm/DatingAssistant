'use client';

import { useTheme } from '../context/ThemeContext';
import Navigation from './Navigation';
import DarkModeToggle from './DarkModeToggle';
import LanguageToggle from './LanguageToggle';
import Header from './Header';

export default function ClientAppLayout({ children }) {
  const { darkMode } = useTheme();
  
  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-indigo-50'}`}>
      <Navigation />
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
        <DarkModeToggle />
        <LanguageToggle />
      </div>
      <Header />
      {children}
    </div>
  );
}
