'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or default to 'dark'
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const currentThemeOption = themeOptions.find(option => option.value === theme) || themeOptions[1];
  const CurrentIcon = currentThemeOption.icon;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-2 px-3 py-2 rounded-lg
          text-gray hover:text-light hover:bg-light/5
          transition-all duration-300
          border border-transparent hover:border-primary/30
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="hidden sm:inline text-xs">{currentThemeOption.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="
            absolute top-full right-0 mt-2 py-2
            bg-dark/95 backdrop-blur-sm border border-primary/20 rounded-lg
            shadow-lg min-w-[120px] z-dropdown
          "
        >
          {themeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`
                  w-full px-4 py-2 text-left text-sm
                  flex items-center space-x-3
                  transition-all duration-200
                  ${
                    option.value === theme
                      ? 'text-primary bg-primary/10'
                      : 'text-gray hover:text-light hover:bg-light/5'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
                {option.value === theme && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}