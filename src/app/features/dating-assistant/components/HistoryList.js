'use client';
import { useState, useRef } from 'react';

export default function HistoryList({ darkMode, history }) {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const containerRef = useRef(null);
  
  if (!history || history.length <= 1) return null;
  
  // Get tone badge color
  const getToneBadgeColors = (tone) => {
    switch(tone) {
      case 'flirtende':
        return darkMode 
          ? 'bg-pink-900/50 text-pink-300 border-pink-800'
          : 'bg-pink-100 text-pink-700 border-pink-200';
      case 'sjov':
        return darkMode 
          ? 'bg-orange-900/50 text-orange-300 border-orange-800'
          : 'bg-orange-100 text-orange-700 border-orange-200';
      case 'romantisk':
        return darkMode 
          ? 'bg-red-900/50 text-red-300 border-red-800'
          : 'bg-red-100 text-red-700 border-red-200';
      case 'afslappet':
        return darkMode 
          ? 'bg-blue-900/50 text-blue-300 border-blue-800'
          : 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return darkMode 
          ? 'bg-gray-900 text-gray-300 border-gray-700'
          : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  // Get tone emoji
  const getToneEmoji = (tone) => {
    switch(tone) {
      case 'flirtende': return '😘';
      case 'sjov': return '😂';
      case 'romantisk': return '❤️';
      case 'afslappet': return '😎';
      default: return '💬';
    }
  };
  
  return (
    <div className="mt-12 relative" ref={containerRef}>
      <div className="flex items-center justify-between mb-5 gap-2 cursor-pointer" 
           onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}>
        <div className="flex items-center gap-2">
          <div className={`w-1 h-8 rounded-full mr-1 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'}`}></div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
            Tidligere samtaler
          </h3>
        </div>
        <button 
          className={`
            text-sm px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1
            ${darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700' 
              : 'bg-white hover:bg-purple-50 text-indigo-700 border border-purple-100 shadow-sm'
            }
          `}
        >
          {isHistoryExpanded ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Skjul
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Vis
            </>
          )}
        </button>
      </div>
      
      <div className={`space-y-4 transition-all duration-300 ease-in-out overflow-hidden ${!isHistoryExpanded ? 'max-h-0 opacity-0 mt-0' : 'max-h-[5000px] opacity-100 mt-4'}`}>
        {history.slice(0, -1).reverse().map((item, index) => {
          const toneBadgeColors = getToneBadgeColors(item.tone);
          const toneEmoji = getToneEmoji(item.tone);
          
          return (
            <div 
              key={index} 
              className={`
                rounded-xl border overflow-hidden transition-all duration-300 ease-in-out
                ${darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white border-purple-100 shadow-sm'}
                hover:shadow-md
              `}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                {/* Left side with timestamp and tone */}
                <div className="flex items-center gap-2">
                  <span 
                    className={`
                      inline-block text-sm px-2.5 py-1 rounded-full border 
                      ${toneBadgeColors}
                    `}
                  >
                    {toneEmoji} {item.tone}
                  </span>
                  
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Full message and response */}
              <div className="px-4 pb-4">
                <div className={`
                  font-medium mb-3
                  ${darkMode ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {item.message}
                </div>
                
                <div className={`mt-3 p-3 rounded-lg ${
                  darkMode ? 'bg-gray-900/70 text-gray-300' : 'bg-purple-50 text-gray-700'
                }`}>
                  {item.response}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
