// Custom hook for managing onboarding state
import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'profile-optimizer-onboarding-completed';

export function useOnboarding() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true); // Start as true to prevent flash
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding before
    const completed = localStorage.getItem(ONBOARDING_KEY);
    const isFirstVisit = !completed;
    
    setHasSeenOnboarding(!isFirstVisit);
    
    // Show onboarding automatically on first visit
    if (isFirstVisit) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setHasSeenOnboarding(true);
    setShowOnboarding(false);
  };

  const showOnboardingManually = () => {
    setShowOnboarding(true);
  };

  const hideOnboarding = () => {
    setShowOnboarding(false);
  };

  return {
    hasSeenOnboarding,
    showOnboarding,
    completeOnboarding,
    showOnboardingManually,
    hideOnboarding
  };
}
