'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Rocket, Award, Mail } from 'lucide-react';

interface NavigationItem {
  id: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  labelKey: string;
  sectionId: string;
}

interface PortfolioNavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', icon: Home, labelKey: 'navigation.home', sectionId: 'home' },
  { id: 'about', icon: User, labelKey: 'navigation.about', sectionId: 'about' },
  { id: 'technical', icon: Code, labelKey: 'navigation.technical', sectionId: 'technical' },
  { id: 'experience', icon: Briefcase, labelKey: 'navigation.experience', sectionId: 'experience' },
  { id: 'projects', icon: Rocket, labelKey: 'navigation.projects', sectionId: 'projects' },
  { id: 'certifications', icon: Award, labelKey: 'navigation.certifications', sectionId: 'certifications' },
  { id: 'contact', icon: Mail, labelKey: 'navigation.contact', sectionId: 'contact' }
];

export function PortfolioNavigation({ activeSection, onSectionChange }: PortfolioNavigationProps) {
  const t = useTranslations();

  return (
    <nav className="portfolio-navigation" role="navigation" aria-label="Portfolio sections">
      <div className="nav-tabs flex items-center space-x-0.5" role="tablist">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="group relative overflow-hidden min-w-fit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0.75rem',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-secondary)',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                textDecoration: 'none',
                textAlign: 'center',
                background: isActive ? 'var(--primary-color)' : 'transparent',
                color: isActive ? 'var(--dark-color)' : 'var(--light-color)'
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={item.sectionId}
              id={`tab-${item.id}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(78, 205, 196, 0.1)';
                  e.currentTarget.style.border = 'none';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.2)';
                  e.currentTarget.style.color = 'var(--primary-color)';
                }
              }}
              onMouseLeave={(e) => {
                // Siempre limpiar los efectos, sin importar si está activo o no
                e.currentTarget.style.background = isActive ? 'var(--primary-color)' : 'transparent';
                e.currentTarget.style.border = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = isActive ? 'var(--dark-color)' : 'var(--light-color)';
              }}
            >
              <Icon 
                className="w-3.5 h-3.5 flex-shrink-0 group-hover:animate-bounce" 
                style={{
                  color: isActive ? 'var(--dark-color)' : 'var(--accent-color)'
                }}
              />
              <span className="whitespace-nowrap">{t(item.labelKey)}</span>
              
              {/* Active indicator with enhanced glow effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  layoutId="activeTab"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  style={{
                    background: 'linear-gradient(45deg, rgba(0, 255, 65, 0.1), rgba(78, 205, 196, 0.1))',
                    boxShadow: '0 0 20px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.1)'
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}