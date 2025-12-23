// src/hooks/useNavigation.ts
import { useState } from 'react';
import type { Screen } from '../App';
import type { NavTab } from '../components/BottomNav';

export const useNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');

  const goTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goHome = () => {
    setActiveNavTab('home');
    setCurrentScreen('home');
  };

  return {
    currentScreen,
    activeNavTab,
    goTo,
    goHome,
    setActiveNavTab
  };
};
