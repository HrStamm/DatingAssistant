'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../shared/context/LanguageContext';
import translations from '../../../shared/utils/translations';

// Individual message bubble component
function MessageBubble({ message, isUser, timestamp }) {
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 relative ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-l-2xl rounded-tr-2xl rounded-br-md' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-r-2xl rounded-tl-2xl rounded-bl-md'
      } shadow-lg`}>
        {/* MESSAGE BUBBLE STYLING - Modify colors here */}
        <div className="break-words text-base leading-relaxed font-medium">
          {message}
        </div>
        
        {/* Bubble tail indicator */}
        <div className={`absolute top-3 w-3 h-3 transform rotate-45 ${
          isUser 
            ? 'bg-blue-500 -right-1' 
            : 'bg-gray-200 -left-1'
        }`}></div>
        
        {/* Timestamp */}
        <div className={`text-xs mt-1 opacity-70 ${
          isUser ? 'text-blue-100' : 'text-gray-700'
        }`}>
          {timestamp}
        </div>
      </div>
    </div>
  );
}

// Animated typing indicator component - NOW ON RIGHT SIDE for user
function TypingIndicator() {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-l-2xl rounded-tr-2xl rounded-br-md px-4 py-3 shadow-lg relative">
        {/* TYPING INDICATOR STYLING - Now matches user bubble colors */}
        <div className="flex space-x-1 items-center">
          <div className="w-2 h-2 bg-blue-100 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-100 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-100 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Typing bubble tail */}
        <div className="absolute top-3 w-3 h-3 bg-blue-500 transform rotate-45 -right-1"></div>
      </div>
    </div>
  );
}

// Main chat interface component
export default function ChatInterface({ userMessage, onGenerateResponse, darkMode, hasStartedChat, shouldGenerate, onGenerationComplete }) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const chatContainerRef = useRef(null);
  
  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  // Trigger generation when shouldGenerate prop changes
  useEffect(() => {
    if (shouldGenerate && hasStartedChat && userMessage.trim()) {
      handleGeneration();
    }
  }, [shouldGenerate]);

  // Handle generating AI response with minimum 2 second delay
  const handleGeneration = async () => {
    if (!userMessage.trim()) return;

    // Add user's input as date's message (left-aligned)
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateMessage = {
      id: Date.now(),
      message: userMessage,
      isUser: false, // Left-aligned as date's message
      timestamp
    };

    setMessages(prev => [...prev, dateMessage]);
    setIsGenerating(true);
    setShowTyping(true);

    try {
      // Start AI generation and minimum delay simultaneously
      const [aiResponse] = await Promise.all([
        onGenerateResponse(), // Your existing API call
        new Promise(resolve => setTimeout(resolve, 2000)) // Minimum 2 second delay
      ]);

      // Hide typing indicator
      setShowTyping(false);

      // Add AI response as user's reply (right-aligned)
      const responseTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userReply = {
        id: Date.now() + 1,
        message: aiResponse,
        isUser: true, // Right-aligned as user's reply
        timestamp: responseTimestamp
      };

      setMessages(prev => [...prev, userReply]);
    } catch (error) {
      console.error('Error generating response:', error);
      setShowTyping(false);
      // Handle error state here
    } finally {
      setIsGenerating(false);
      // Notify parent that generation is complete
      if (onGenerationComplete) {
        onGenerationComplete();
      }
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
  };

  // Don't render if chat hasn't started yet
  if (!hasStartedChat) {
    return null;
  }

  return (
    <div className={`w-full mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}>
      {/* CHAT HEADER - Modify styling here */}
      <div className={`px-6 py-4 border-b ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-gray-50 border-gray-200 text-gray-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* AVATAR PLACEHOLDER - Add custom avatar here */}
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              💕
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {language === 'da' ? 'Din Dating Assistent' : 'Your Dating Assistant'}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'da' ? 'Hjælper dig med det perfekte svar' : 'Helping you craft the perfect reply'}
              </p>
            </div>
          </div>
          
          {/* Clear chat button */}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {language === 'da' ? 'Ryd' : 'Clear'}
            </button>
          )}
        </div>
      </div>

      {/* CHAT MESSAGES CONTAINER - Modify scrollbar styling here */}
      <div 
        ref={chatContainerRef}
        className={`h-96 overflow-y-auto px-6 py-4 space-y-2 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        } scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
        style={{
          backgroundImage: darkMode 
            ? 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)'
        }}
      >
        {/* Welcome message when chat is empty */}
        {messages.length === 0 && !showTyping && (
          <div className="flex justify-center items-center h-full">
            <div className={`text-center p-8 rounded-2xl ${
              darkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-white/70 text-gray-500'
            }`}>
              <div className="text-4xl mb-4">💬</div>
              <p className="text-lg font-medium mb-2">
                {language === 'da' ? 'Klar til at chatte!' : 'Ready to chat!'}
              </p>
              <p className="text-sm">
                {language === 'da' 
                  ? 'Skriv en besked og klik "Generer Svar" for at starte' 
                  : 'Type a message and click "Generate Answer" to start'
                }
              </p>
            </div>
          </div>
        )}

        {/* Render all messages */}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Show typing indicator while generating */}
        {showTyping && <TypingIndicator />}
      </div>
    </div>
  );
}
