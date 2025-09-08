'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { CustomTooltip } from '@/components/ui/CustomTooltip';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export function LanguageButton() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    startTransition(() => {
      try {
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        const newPath = `/${newLocale}${pathWithoutLocale}`;
        router.replace(newPath);
        setIsOpen(false);
      } catch (error) {
        console.error('Error changing language:', error);
        try {
          window.location.href = `/${newLocale}${pathname.replace(`/${locale}`, '') || '/'}`;
        } catch (fallbackError) {
          console.error('Fallback navigation also failed:', fallbackError);
        }
      }
    });
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as Element;
        if (!target.closest('.language-button')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative language-button">
      <CustomTooltip content={`Idioma actual: ${currentLanguage.name}`} place="bottom" delay={300}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/30 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
          aria-label={`Current language: ${currentLanguage.name}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="w-4 h-4 text-primary" />
          {isPending && (
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          )}
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
              shadow-lg min-w-[140px] z-50
            "
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isPending || language.code === locale}
                className={`
                  w-full px-4 py-2 text-left text-sm
                  flex items-center space-x-3
                  transition-all duration-200
                  ${
                    language.code === locale
                      ? 'text-primary bg-primary/10 cursor-default'
                      : 'text-gray hover:text-light hover:bg-light/5 cursor-pointer'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none focus:bg-light/5
                `}
                whileHover={language.code !== locale ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
                whileTap={language.code !== locale ? { scale: 0.98 } : {}}
              >
                <span className="text-base">{language.flag}</span>
                <span className="flex-1">{language.name}</span>
                {language.code === locale && (
                  <Check className="w-4 h-4 text-primary ml-auto" />
                )}
              </motion.button>
            ))}
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
