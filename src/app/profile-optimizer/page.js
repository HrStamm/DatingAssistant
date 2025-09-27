'use client';

import { useState, useRef } from 'react';
import { useTheme } from '../shared/context/ThemeContext';
import { useLanguage } from '../shared/context/LanguageContext';
import translations from '../shared/utils/translations';
import { useOnboarding } from '../features/profile-optimizer/hooks/useOnboarding';
import OptimizerHeader from '../features/profile-optimizer/components/OptimzerHeader';
import ImageUploadSection from '../features/profile-optimizer/components/ImageUploadSection';
import AnalyzeButton from '../features/profile-optimizer/components/AnalyzeButton';
import ResultsHeader from '../features/profile-optimizer/components/ResultsHeader';
import ResultsContent from '../features/profile-optimizer/components/ResultsContent';
import OnboardingModal from '../features/profile-optimizer/components/OnboardingModal';

export default function ProfileOptimizer() {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  // Onboarding hook
  const {
    hasSeenOnboarding,
    showOnboarding,
    completeOnboarding,
    showOnboardingManually,
    hideOnboarding
  } = useOnboarding();
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid JPG or PNG image');
      setImage(null);
      setPreview(null);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUploading(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setImage(file);
        setError(null);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError('Please select a valid JPG or PNG image');
      }
    }
  };
  
  const handleAnalyze = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('language', language);
      
      // In a real implementation, this would call your API endpoint
      // that connects to OpenAI's Vision API
      const response = await fetch('/api/analyze-profile', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze profile');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(t.results.errorMessage[language]);
      console.error('Error analyzing profile:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };
  
  // This would be replaced with actual data from the API
  const mockResults = {
    overallScore: 7.5,
    strengths: [
      'Great smile in your main photo',
      'Good variety of activities shown',
      'Clear facial shots'
    ],
    improvements: [
      'Add more photos in social settings',
      'Consider a more detailed bio',
      'Add a photo that shows your full height'
    ]
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-10 px-4 sm:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <OptimizerHeader />
        
        {!results ? (
          <div className={`rounded-3xl overflow-hidden shadow-2xl border-2 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/20 shadow-purple-900/50' : 'bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-purple-500/20'}`}>
            <ImageUploadSection 
              preview={preview}
              image={image}
              isUploading={isUploading}
              error={error}
              fileInputRef={fileInputRef}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              showTutorialButton={hasSeenOnboarding}
              onTutorialClick={showOnboardingManually}
            />
            <AnalyzeButton 
              image={image}
              isAnalyzing={isAnalyzing}
              handleAnalyze={handleAnalyze}
            />
          </div>
        ) : (
          <div className={`rounded-3xl overflow-hidden shadow-2xl border-2 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/20 shadow-green-900/50' : 'bg-gradient-to-br from-white to-green-50 border-green-200 shadow-green-500/20'}`}>
            <ResultsHeader preview={preview} />
            <ResultsContent 
              mockResults={mockResults}
              handleReset={handleReset}
            />
          </div>
        )}
      </div>
      
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={hideOnboarding}
        onComplete={completeOnboarding}
      />
      
      {/* Footer spacing */}
      <div className={`text-center mt-16 mb-20 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        <p>Dating Assistant © 2025 | Skabt af Valdemar Stamm</p>
      </div>
    </main>
  );
}
