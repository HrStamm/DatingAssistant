'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import translations from '../utils/translations';

export default function Navigation() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="fixed top-4 left-4 z-50" ref={menuRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md"
        style={{ 
          background: darkMode 
            ? 'linear-gradient(to right, #4c1d95, #1e40af)' 
            : 'linear-gradient(to right, #f97316, #fbbf24)',
          boxShadow: darkMode
            ? '0 4px 12px rgba(76, 29, 149, 0.3)'
            : '0 4px 12px rgba(249, 115, 22, 0.3)'
        }}
        aria-label="Open navigation menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-white transition-all duration-300 ${isOpen ? 'rotate-90 scale-90' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen 
              ? "M6 18L18 6M6 6l12 12" // X icon when open
              : "M4 6h16M4 12h16M4 18h16" // Hamburger icon when closed
            } 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`
          absolute top-12 left-0 w-72 rounded-2xl overflow-hidden transition-all duration-300 origin-top-left
          backdrop-blur-md
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
          ${darkMode 
            ? 'bg-gray-800/90 border border-gray-700 shadow-lg shadow-purple-900/20' 
            : 'bg-white/90 border border-purple-200 shadow-xl shadow-purple-500/10'
          }
        `}
      >
        {/* Header with gradient */}
        <div 
          className={`
            p-4 relative overflow-hidden
            ${darkMode 
              ? 'border-b border-gray-700' 
              : 'border-b border-purple-100'
            }
          `}
        >
          <div className="absolute inset-0 -z-10 opacity-30"
              style={{ 
                background: darkMode 
                  ? 'linear-gradient(to right, #4c1d95, #1e40af)' 
                  : 'linear-gradient(to right, #f97316, #fbbf24)',
                filter: 'blur(20px)'
              }}
          ></div>
          <h3 className={`
            font-bold text-lg mb-1
            ${darkMode ? 'text-white' : 'text-gray-800'}
          `}>
            {language === 'da' ? 'Dating Navigation' : 'Dating Navigation'}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'da' ? 'Find den perfekte dating hjælp' : 'Find the perfect dating help'}
          </p>
        </div>
        
        <div className="p-3">
          {/* Dating Assistant */}
          <Link 
            href="/"
            className={`
              flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 mb-2 relative overflow-hidden
              ${pathname === '/' 
                ? (darkMode 
                  ? 'text-indigo-200 bg-gradient-to-r from-indigo-900/60 to-purple-900/40' 
                  : 'text-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50'
                )
                : (darkMode 
                  ? 'text-gray-300 hover:bg-gray-700/60' 
                  : 'text-gray-700 hover:bg-purple-50'
                )
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            {pathname === '/' && <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>}
            <svg xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${
                pathname === '/' 
                  ? (darkMode ? 'text-indigo-300' : 'text-indigo-600') 
                  : (darkMode ? 'text-gray-400' : 'text-gray-500')
              }`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <div>
              <div className="font-medium">{translations.navigation.datingAssistant[language]}</div>
              <div className="text-xs opacity-80">{language === 'da' ? 'Få hjælp til den perfekte besked' : 'Get help with the perfect message'}</div>
            </div>
          </Link>

          {/* Dating Profile Optimizer */}
          <Link
            href="/profile-optimizer"
            className={`
              flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 mb-2 relative overflow-hidden
              ${pathname === '/profile-optimizer' 
                ? (darkMode 
                  ? 'text-purple-200 bg-gradient-to-r from-purple-900/60 to-indigo-900/40' 
                  : 'text-purple-800 bg-gradient-to-r from-purple-50 to-indigo-50'
                )
                : (darkMode 
                  ? 'text-gray-300 hover:bg-gray-700/60' 
                  : 'text-gray-700 hover:bg-purple-50'
                )
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            {pathname === '/profile-optimizer' && <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>}
            <svg xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${
                pathname === '/profile-optimizer' 
                  ? (darkMode ? 'text-purple-300' : 'text-purple-600') 
                  : (darkMode ? 'text-gray-400' : 'text-gray-500')
              }`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-medium">{translations.navigation.datingProfileOptimizer[language]}</div>
              <div className="text-xs opacity-80">{language === 'da' ? 'Optimer din dating profil' : 'Optimize your dating profile'}</div>
            </div>
          </Link>

          {/* About Us */}
          <Link 
            href="/about"
            className={`
              flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 mb-2 relative overflow-hidden
              ${pathname === '/about' 
                ? (darkMode 
                  ? 'text-blue-200 bg-gradient-to-r from-blue-900/60 to-indigo-900/40' 
                  : 'text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50'
                )
                : (darkMode 
                  ? 'text-gray-300 hover:bg-gray-700/60' 
                  : 'text-gray-700 hover:bg-purple-50'
                )
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            {pathname === '/about' && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>}
            <svg xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${
                pathname === '/about' 
                  ? (darkMode ? 'text-blue-300' : 'text-blue-600') 
                  : (darkMode ? 'text-gray-400' : 'text-gray-500')
              }`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="font-medium">{translations.navigation.aboutUs[language]}</div>
              <div className="text-xs opacity-80">{language === 'da' ? 'Lær os at kende bedre' : 'Get to know us better'}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
