'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Zap, Cpu, Sunset } from 'lucide-react';
import { CustomTooltip } from '@/components/ui/CustomTooltip';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const themeOptions: ThemeOption[] = [
  { value: 'retro', label: 'Retro 8-bit', icon: Palette },
  { value: 'cyberpunk', label: 'Cyberpunk', icon: Zap },
  { value: 'matrix', label: 'Matrix', icon: Cpu },
  { value: 'sunset', label: 'Sunset', icon: Sunset }
];

export function ThemeButton() {
  const { currentTheme, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  console.log('🎨 ThemeButton: currentTheme:', currentTheme);

  const handleThemeChange = (themeName: string) => {
    console.log('🖱️ ThemeButton: handleThemeChange called with:', themeName);
    switchTheme(themeName);
    setIsOpen(false);
  };

  const currentThemeOption = themeOptions.find(option => option.value === currentTheme.name) || themeOptions[0];
  const CurrentIcon = currentThemeOption.icon;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as Element;
        if (!target.closest('.theme-button')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative theme-button">
      <CustomTooltip content={`Tema actual: ${currentThemeOption.label}`} place="bottom" delay={300}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/30 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Current theme: ${currentThemeOption.label}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <CurrentIcon className="w-4 h-4 text-primary" />
        </motion.button>
      </CustomTooltip>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full right-0 mt-2 py-2
              bg-dark/95 backdrop-blur-sm border border-primary/20 rounded-lg
              shadow-lg min-w-[120px] z-50
            "
          >
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.value}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🖱️ Button clicked for theme:', option.value);
                    handleThemeChange(option.value);
                  }}
                  className={`
                     w-full px-4 py-2 text-left text-sm
                     flex items-center space-x-3
                     transition-all duration-200
                     cursor-pointer
                     ${
                       option.value === currentTheme.name
                         ? 'text-primary bg-primary/10'
                         : 'text-gray hover:text-light hover:bg-light/5'
                     }
                   `}
                   whileHover={option.value !== currentTheme.name ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
                   whileTap={option.value !== currentTheme.name ? { scale: 0.98 } : {}}
                 >
                   <Icon className="w-4 h-4" />
                   <span>{option.label}</span>
                   {option.value === currentTheme.name && (
                     <span className="ml-auto text-primary">✓</span>
                   )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
