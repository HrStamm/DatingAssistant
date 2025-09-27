'use client';

import { useState } from 'react';
import { sendMessageToAPI } from './shared/utils/api-utils';
import ChatInput from './features/dating-assistant/components/ChatInput';
import ToneSelector from './features/dating-assistant/components/ToneSelector';
import SubmitButton from './features/dating-assistant/components/SubmitButton';
import ChatInterface from './features/dating-assistant/components/ChatInterface';
import ErrorMessage from './features/dating-assistant/components/ErrorMessage';
import HistoryList from './features/dating-assistant/components/HistoryList';
import { useTheme } from './shared/context/ThemeContext';
import { useLanguage } from './shared/context/LanguageContext';
import translations from './shared/utils/translations';

export default function HomePage() {
  const [partnerMessage, setPartnerMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tone, setTone] = useState('flirtende');
  const [history, setHistory] = useState([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const { darkMode } = useTheme();
  const { language } = useLanguage();

  // Handle submit button click - shows chat interface
  const handleSubmit = async () => {
    if (!partnerMessage.trim()) {
      setError(translations.mainPage.error.emptyMessage[language]);
      return;
    }

    setHasStartedChat(true); // Show chat interface
    setShouldGenerate(true); // Trigger generation
  };

  // Reset generation trigger
  const handleGenerationComplete = () => {
    setShouldGenerate(false);
  };

  // Handle API call for generating response
  const handleGenerateResponse = async () => {
    if (!partnerMessage.trim()) {
      setError(translations.mainPage.error.emptyMessage[language]);
      throw new Error('Empty message');
    }

    setLoading(true);
    setError('');

    try {
      const data = await sendMessageToAPI(partnerMessage, tone);
      
      if (data.success) {
        setResponse(data.message);
        setHistory(prev => [...prev, {
          message: partnerMessage,
          response: data.message,
          tone: tone,
          timestamp: new Date().toISOString()
        }]);
        return data.message;
      } else {
        const errorMessage = data.error || 'Der skete en ukendt fejl';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Fejl:', error);
      const errorMessage = translations.mainPage.error.serverError[language];
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      console.log('Copied to clipboard');
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8 pb-16 relative">
        <div className="max-w-2xl mx-auto">
          {/* Input Section */}
          <div className={`
            rounded-xl shadow-xl p-6 border backdrop-blur-sm mb-8
            transition-all duration-300 ease-in-out
            ${darkMode 
              ? 'bg-gray-800/70 border-gray-700 shadow-purple-900/10' 
              : 'bg-white/80 border-purple-100 shadow-purple-500/10'
            }
          `}>
            <ChatInput 
              darkMode={darkMode}
              partnerMessage={partnerMessage}
              setPartnerMessage={setPartnerMessage}
            />
            
            <ToneSelector 
              darkMode={darkMode}
              tone={tone}
              setTone={setTone}
            />
            
            {!hasStartedChat ? (
              <SubmitButton 
                darkMode={darkMode}
                loading={loading}
                isDisabled={!partnerMessage.trim() || loading}
                onClick={handleSubmit}
              />
            ) : (
              <button
                onClick={() => setShouldGenerate(true)}
                disabled={!partnerMessage.trim() || loading}
                className={`
                  w-full py-4 px-6 rounded-xl font-medium text-base sm:text-lg
                  shadow-lg transition-all duration-300 ease-out
                  disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${darkMode ? 'focus:ring-purple-500 focus:ring-offset-gray-900' : 'focus:ring-purple-500 focus:ring-offset-white'}
                  ${!partnerMessage.trim() || loading
                    ? darkMode 
                      ? 'bg-gray-800 text-gray-600 border border-gray-700' 
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                    : darkMode
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                  }
                `}
              >
                {loading 
                  ? (language === 'da' ? 'Genererer...' : 'Generating...')
                  : (language === 'da' ? 'Generer Svar' : 'Generate Answer')
                }
              </button>
            )}
            
            <ErrorMessage error={error} />
          </div>

          {/* iMessage-style Chat Interface - Only shows after first click */}
          <ChatInterface 
            userMessage={partnerMessage}
            onGenerateResponse={handleGenerateResponse}
            darkMode={darkMode}
            hasStartedChat={hasStartedChat}
            shouldGenerate={shouldGenerate}
            onGenerationComplete={handleGenerationComplete}
          />

          {/* History List */}
          <HistoryList 
            darkMode={darkMode}
            history={history}
          />

          {/* Footer section */}
          <div className={`text-center mt-16 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <p>Dating Assistant © 2025 | Skabt af Valdemar Stamm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
