'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Theme {
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  dark_color: string;
  light_color: string;
  gray_color: string;
}

interface ThemeContextType {
  currentTheme: Theme;
  switchTheme: (themeName: string) => void;
  getAvailableThemes: () => Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme definitions
const themes: Theme[] = [
  {
    name: 'retro',
    primary_color: '#00ff41',
    secondary_color: '#ff6b35',
    accent_color: '#4ecdc4',
    dark_color: '#1a1a1a',
    light_color: '#ffffff',
    gray_color: '#888888'
  },
  {
    name: 'cyberpunk',
    primary_color: '#ff00ff',
    secondary_color: '#00ffff',
    accent_color: '#ffff00',
    dark_color: '#0a0a0a',
    light_color: '#ffffff',
    gray_color: '#666666'
  },
  {
    name: 'matrix',
    primary_color: '#00ff00',
    secondary_color: '#003300',
    accent_color: '#00cc00',
    dark_color: '#000000',
    light_color: '#00ff00',
    gray_color: '#004400'
  },
  {
    name: 'sunset',
    primary_color: '#ff6b35',
    secondary_color: '#f7931e',
    accent_color: '#ffd23f',
    dark_color: '#2c1810',
    light_color: '#ffffff',
    gray_color: '#8b7355'
  }
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  const applyTheme = (theme: Theme) => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary_color);
    root.style.setProperty('--secondary-color', theme.secondary_color);
    root.style.setProperty('--accent-color', theme.accent_color);
    root.style.setProperty('--dark-color', theme.dark_color);
    root.style.setProperty('--light-color', theme.light_color);
    root.style.setProperty('--gray-color', theme.gray_color);
  };

  const switchTheme = (themeName: string) => {
    console.log('🎨 Switching theme to:', themeName);
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      console.log('✅ Theme found:', theme);
      setCurrentTheme(theme);
      applyTheme(theme);
      localStorage.setItem('portfolio-theme', theme.name);
      console.log('🎨 Theme applied successfully');
    } else {
      console.error('❌ Theme not found:', themeName);
    }
  };

  const getAvailableThemes = () => themes;

  useEffect(() => {
    // Load saved theme from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        const theme = themes.find(t => t.name === savedTheme);
        if (theme) {
          setCurrentTheme(theme);
          applyTheme(theme);
        } else {
          // If saved theme is invalid, apply default
          setCurrentTheme(themes[0]);
          applyTheme(themes[0]);
        }
      } else {
        // Apply default theme
        setCurrentTheme(themes[0]);
        applyTheme(themes[0]);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, getAvailableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
