'use client';

import { ReactNode, useState, useEffect } from 'react';
import { PortfolioNavigation } from './PortfolioNavigation';
import { LanguageButton } from './LanguageButton';
import { ThemeButton } from './ThemeButton';
import { AudioButton } from '../effects/AudioButton';
import { AudioPlayerFloating } from '../effects/AudioPlayerFloating';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeScript } from '../ThemeScript';
import UnifiedChatAssistant from '../effects/UnifiedChatAssistant';
import useAssistantMessages from '@/hooks/useAssistantMessages';
import '@/styles/unified-chat-assistant.css';

interface PortfolioLayoutProps {
  children: ReactNode;
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  
  // Assistant messages hook
  const { getAllTips } = useAssistantMessages();

  useEffect(() => {
    // Minimum loading time for better UX (2 seconds)
    const minLoadingTime = 2000;
    const startTime = Date.now();
    
    // Progress animation
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min((elapsedTime / minLoadingTime) * 100, 100);
      setLoadingProgress(progress);
    }, 50);
    
    const checkDocumentReady = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 200); // Small delay to show 100% completion
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      checkDocumentReady();
    } else {
      const handleReadyStateChange = () => {
        if (document.readyState === 'complete') {
          checkDocumentReady();
        }
      };
      
      document.addEventListener('readystatechange', handleReadyStateChange);
      
      // Fallback timer for slower connections
      const fallbackTimer = setTimeout(() => {
        setLoadingProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }, 5000);
      
      return () => {
        document.removeEventListener('readystatechange', handleReadyStateChange);
        clearTimeout(fallbackTimer);
        clearInterval(progressInterval);
      };
    }
    
    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section with proper offset for fixed header
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 70; // var(--header-height)
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-dark via-dark/95 to-primary/10 flex items-center justify-center z-modal overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            // Predefined deterministic values to avoid hydration mismatch
            const particlePositions = [
              { left: 15.2, top: 23.8, delay: 0.3, duration: 3.2 },
              { left: 67.4, top: 45.1, delay: 1.1, duration: 4.1 },
              { left: 89.3, top: 12.7, delay: 0.7, duration: 2.8 },
              { left: 34.6, top: 78.9, delay: 1.8, duration: 3.9 },
              { left: 52.1, top: 56.3, delay: 0.2, duration: 2.5 },
              { left: 76.8, top: 89.4, delay: 1.4, duration: 4.3 },
              { left: 23.5, top: 34.2, delay: 0.9, duration: 3.1 },
              { left: 91.7, top: 67.8, delay: 0.5, duration: 2.9 },
              { left: 45.9, top: 21.6, delay: 1.6, duration: 3.7 },
              { left: 12.3, top: 83.5, delay: 0.4, duration: 4.0 },
              { left: 68.2, top: 39.7, delay: 1.2, duration: 2.6 },
              { left: 83.6, top: 72.1, delay: 0.8, duration: 3.4 },
              { left: 29.4, top: 58.9, delay: 1.5, duration: 2.7 },
              { left: 56.7, top: 14.3, delay: 0.6, duration: 3.8 },
              { left: 74.1, top: 91.2, delay: 1.3, duration: 4.2 },
              { left: 18.8, top: 47.6, delay: 0.1, duration: 3.0 },
              { left: 92.5, top: 26.4, delay: 1.7, duration: 2.4 },
              { left: 41.2, top: 65.8, delay: 0.9, duration: 3.6 },
              { left: 63.9, top: 82.7, delay: 1.0, duration: 2.8 },
              { left: 37.6, top: 53.1, delay: 0.3, duration: 3.3 }
            ];
            const particle = particlePositions[i % particlePositions.length];
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            );
          })}
        </div>
        
        <div className="text-center relative z-10">
          {/* Main Loading Icon with Glow Effect */}
          <div className="relative mb-8">
            <div className="pixel-text text-6xl mb-4 animate-bounce" style={{
              color: 'var(--primary-color)',
              textShadow: '0 0 20px var(--primary-color), 0 0 40px var(--primary-color), 0 0 60px var(--primary-color)',
              filter: 'drop-shadow(0 0 10px var(--primary-color))'
            }}>🚧</div>
            <div className="absolute inset-0 animate-ping">
              <div className="pixel-text text-6xl opacity-20" style={{
                color: 'var(--primary-color)'
              }}>🚧</div>
            </div>
          </div>
          
          {/* Loading Message */}
          <div className="pixel-text text-2xl mb-6 animate-pulse" style={{
            color: 'var(--secondary-color)',
            textShadow: '0 0 10px var(--secondary-color)'
          }}>CARGANDO PORTAFOLIO</div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-6 mb-4">
            <div className="w-80 h-3 bg-gray-800/50 rounded-full overflow-hidden border border-primary/20 backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full relative overflow-hidden transition-all duration-300 ease-out"
                style={{ 
                  width: `${loadingProgress}%`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {Math.round(loadingProgress)}% completado
            </div>
          </div>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          
          {/* Status Text */}
          <div className="text-sm text-gray-400 animate-pulse">
            Preparando experiencia interactiva...
          </div>
        </div>
        

      </div>
    );
  }

  return (
    <ThemeProvider>
      <ThemeScript />
      <div className="min-h-screen bg-dark text-light">
        {/* Header with Navigation */}
        <header className="fixed top-0 left-0 right-0 z-fixed bg-dark/90 backdrop-blur-sm border-b border-primary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-[var(--header-height)]">
              {/* Logo */}
              <div className="flex items-center space-x-4" style={{ marginLeft: '1.5rem' }}>
                <div className="pixel-text text-2xl font-bold" style={{
                  color: 'var(--primary-color)',
                  textShadow: '0 0 20px var(--primary-color), 0 0 40px var(--secondary-color)',
                  fontFamily: 'var(--font-primary)',
                  letterSpacing: '2px',
                  animation: 'pixelGlow 3s ease-in-out infinite'
                }}>ES</div>
              </div>

              {/* Navigation */}
              <PortfolioNavigation 
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <LanguageButton />
                <ThemeButton />
                <AudioButton 
                  onOpenPlayer={() => setIsAudioPlayerOpen(true)}
                  isPlaying={isAudioPlaying}
                />
                {/* Assistant Toggle Button */}
                <button
                  onClick={() => setShowAssistant(!showAssistant)}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/30 relative"
                  title={showAssistant ? "Hide Assistant" : "Show Assistant"}
                >
                  <span className="text-primary text-lg">📱</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-[var(--header-height)]">
          {children}
        </div>

        {/* Audio Player - Floating */}
        <AudioPlayerFloating 
          isOpen={isAudioPlayerOpen}
          onClose={() => setIsAudioPlayerOpen(false)}
          onPlayingChange={setIsAudioPlaying}
        />

        {/* Unified Chat Assistant - Optimized Interface */}
        <UnifiedChatAssistant 
          isVisible={showAssistant}
          onClose={() => setShowAssistant(false)}
          messages={getAllTips()}
          onSendMessage={async (message: string) => {
            try {
              const response = await fetch('/api/athena-chat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  message,
                  context: activeSection 
                }),
              });
              
              if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
              }
              
              const data = await response.json();
              return data.response || 'Lo siento, no pude procesar tu mensaje.';
            } catch (error) {
              console.error('Error sending message:', error);
              return 'Lo siento, estoy teniendo problemas técnicos. Intenta más tarde.';
            }
          }}
        />

        {/* Footer */}
        <footer className="bg-dark/95 border-t border-primary/20 py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="pixel-text text-sm text-gray mb-2">
              © 2025 Erick Sang Cifuentes /DEV
            </div>
            <div className="text-xs text-gray">
              Built with Next.js 14, TypeScript & Tailwind CSS
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}