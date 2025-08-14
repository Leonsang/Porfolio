import { translations, languages, LanguageConfig, Translation } from './translations';

export class I18nManager {
  private currentLanguage: string = 'en';
  private fallbackLanguage: string = 'en';
  private listeners: Array<(language: string) => void> = [];
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      // Try to detect browser language
      const browserLanguage = this.detectBrowserLanguage();
      if (browserLanguage) {
        this.currentLanguage = browserLanguage;
      }
    }

    // Set document direction
    this.setDocumentDirection();
    
    // Mark as initialized
    this.isInitialized = true;
    console.log('✅ i18n initialized with language:', this.currentLanguage);
  }

  /**
   * Check if i18n is ready
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Wait for i18n to be ready
   */
  public async waitForReady(): Promise<void> {
    if (this.isReady()) {
      return;
    }
    
    return new Promise(resolve => {
      const checkReady = () => {
        if (this.isReady()) {
          resolve();
        } else {
          setTimeout(checkReady, 10);
        }
      };
      checkReady();
    });
  }

  private detectBrowserLanguage(): string | null {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (!browserLang) return null;

    // Extract language code (e.g., 'en-US' -> 'en')
    const langCode = browserLang.split('-')[0];
    
    // Check if we support this language
    if (this.isLanguageSupported(langCode)) {
      return langCode;
    }

    return null;
  }

  private isLanguageSupported(language: string): boolean {
    return languages.some(lang => lang.code === language);
  }

  private setDocumentDirection(): void {
    const language = languages.find(lang => lang.code === this.currentLanguage);
    if (language) {
      document.documentElement.dir = language.direction;
      document.documentElement.lang = this.currentLanguage;
    }
  }

  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  public getSupportedLanguages(): LanguageConfig[] {
    return languages;
  }

  public setLanguage(language: string): void {
    if (!this.isLanguageSupported(language)) {
      console.warn(`Language ${language} is not supported`);
      return;
    }

    this.currentLanguage = language;
    localStorage.setItem('portfolio-language', language);
    
    // Set document direction
    this.setDocumentDirection();
    
    // Notify listeners
    this.notifyListeners();
    
    // Play language change sound if available
    this.playLanguageChangeSound();
  }

  public t(key: string, params?: Record<string, string>): string {
    const keys = key.split('.');
    let translation: any = translations[this.currentLanguage] || translations[this.fallbackLanguage];
    
    // Navigate through nested keys
    for (const k of keys) {
      if (translation && typeof translation === 'object' && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        // Fallback to English
        translation = this.getFallbackTranslation(keys);
        break;
      }
    }

    // If translation is not found, return the key
    if (typeof translation !== 'string') {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    // Replace parameters if provided
    if (params) {
      return translation.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return translation;
  }

  private getFallbackTranslation(keys: string[]): string {
    let translation: any = translations[this.fallbackLanguage];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        return keys[keys.length - 1]; // Return last key as fallback
      }
    }

    return typeof translation === 'string' ? translation : keys[keys.length - 1];
  }

  public addLanguageChangeListener(listener: (language: string) => void): void {
    this.listeners.push(listener);
  }

  public removeLanguageChangeListener(listener: (language: string) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentLanguage);
      } catch (error) {
        console.error('Error in language change listener:', error);
      }
    });
  }

  private playLanguageChangeSound(): void {
    // Try to play a language change sound if available
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant language change sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Audio not supported or failed
    }
  }

  public createLanguageSwitcher(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'language-switcher';
    
    const currentLang = languages.find(lang => lang.code === this.currentLanguage);
    
    container.innerHTML = `
      <div class="language-current">
        <span class="language-flag">${currentLang?.flag || '🌐'}</span>
        <span class="language-name">${currentLang?.name || 'Language'}</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="language-dropdown">
        ${languages.map(lang => `
          <div class="language-option ${lang.code === this.currentLanguage ? 'active' : ''}" data-language="${lang.code}">
            <span class="language-flag">${lang.flag}</span>
            <span class="language-name">${lang.name}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Add event listeners
    const currentElement = container.querySelector('.language-current');
    const dropdown = container.querySelector('.language-dropdown');
    const options = container.querySelectorAll('.language-option');

    if (currentElement && dropdown) {
      currentElement.addEventListener('click', () => {
        dropdown.classList.toggle('active');
      });
    }

    options.forEach(option => {
      option.addEventListener('click', () => {
        const language = option.getAttribute('data-language');
        if (language) {
          this.setLanguage(language);
          dropdown?.classList.remove('active');
          
          // Update active state
          options.forEach(opt => opt.classList.remove('active'));
          option.classList.add('active');
          
          // Update current language display
          const currentLang = languages.find(lang => lang.code === language);
          const currentFlag = container.querySelector('.language-flag');
          const currentName = container.querySelector('.language-name');
          
          if (currentFlag && currentName && currentLang) {
            currentFlag.textContent = currentLang.flag;
            currentName.textContent = currentLang.name;
          }
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target as Node)) {
        dropdown?.classList.remove('active');
      }
    });

    return container;
  }

  public destroy(): void {
    this.listeners = [];
  }
}

// Create global instance
export const i18n = new I18nManager();

// Export for global use
(window as any).i18n = i18n;
