export interface Theme {
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  card_background: string;
  border_color: string;
}

export class ThemeManager {
  private currentTheme: Theme;
  private themes: Map<string, Theme> = new Map();
  private themeChangeListeners: ((theme: Theme) => void)[] = [];
  private isInitialized: boolean = false;

  constructor() {
    this.initializeThemes();
    this.loadSavedTheme();
    this.applyTheme(this.currentTheme);
    this.isInitialized = true;
  }

  private initializeThemes(): void {
    // Default cyberpunk theme
    this.themes.set('cyberpunk', {
      name: 'Cyberpunk',
      primary_color: '#00ff41',
      secondary_color: '#ff6b35',
      accent_color: '#4ecdc4',
      background_color: '#1a1a1a',
      text_color: '#ffffff',
      card_background: '#2a2a2a',
      border_color: '#00ff41'
    });

    // Dark theme
    this.themes.set('dark', {
      name: 'Dark',
      primary_color: '#6366f1',
      secondary_color: '#8b5cf6',
      accent_color: '#06b6d4',
      background_color: '#0f172a',
      text_color: '#f8fafc',
      card_background: '#1e293b',
      border_color: '#334155'
    });

    // Light theme
    this.themes.set('light', {
      name: 'Light',
      primary_color: '#3b82f6',
      secondary_color: '#8b5cf6',
      accent_color: '#06b6d4',
      background_color: '#ffffff',
      text_color: '#1e293b',
      card_background: '#f8fafc',
      border_color: '#e2e8f0'
    });

    // Set default theme
    this.currentTheme = this.themes.get('cyberpunk')!;
  }

  private loadSavedTheme(): void {
    try {
      const savedThemeName = localStorage.getItem('portfolio-theme');
      if (savedThemeName && this.themes.has(savedThemeName)) {
        this.currentTheme = this.themes.get(savedThemeName)!;
        console.log('✅ Loaded saved theme:', savedThemeName);
      }
    } catch (error) {
      console.warn('⚠️ Failed to load saved theme:', error);
    }
  }

  private saveTheme(themeName: string): void {
    try {
      localStorage.setItem('portfolio-theme', themeName);
      console.log('✅ Theme saved:', themeName);
    } catch (error) {
      console.warn('⚠️ Failed to save theme:', error);
    }
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary-color', theme.primary_color);
    root.style.setProperty('--secondary-color', theme.secondary_color);
    root.style.setProperty('--accent-color', theme.accent_color);
    root.style.setProperty('--background-color', theme.background_color);
    root.style.setProperty('--text-color', theme.text_color);
    root.style.setProperty('--card-background', theme.card_background);
    root.style.setProperty('--border-color', theme.border_color);

    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.primary_color);
    }

    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: theme
    }));

    // Notify listeners
    this.notifyThemeChangeListeners(theme);

    console.log('✅ Theme applied:', theme.name);
  }

  /**
   * Switch to a specific theme
   */
  public switchTheme(themeName: string): boolean {
    if (!this.themes.has(themeName)) {
      console.warn('⚠️ Theme not found:', themeName);
      return false;
    }

    this.currentTheme = this.themes.get(themeName)!;
    this.applyTheme(this.currentTheme);
    this.saveTheme(themeName);
    
    return true;
  }

  /**
   * Get current theme
   */
  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Get all available themes
   */
  public getAvailableThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  /**
   * Get theme by name
   */
  public getTheme(themeName: string): Theme | undefined {
    return this.themes.get(themeName);
  }

  /**
   * Add custom theme
   */
  public addTheme(theme: Theme): void {
    this.themes.set(theme.name.toLowerCase(), theme);
    console.log('✅ Custom theme added:', theme.name);
  }

  /**
   * Remove custom theme
   */
  public removeTheme(themeName: string): boolean {
    if (themeName === 'cyberpunk' || themeName === 'dark' || themeName === 'light') {
      console.warn('⚠️ Cannot remove built-in theme:', themeName);
      return false;
    }

    const removed = this.themes.delete(themeName);
    if (removed) {
      console.log('✅ Theme removed:', themeName);
    }
    return removed;
  }

  /**
   * Add theme change listener
   */
  public addThemeChangeListener(callback: (theme: Theme) => void): void {
    this.themeChangeListeners.push(callback);
  }

  /**
   * Remove theme change listener
   */
  public removeThemeChangeListener(callback: (theme: Theme) => void): void {
    const index = this.themeChangeListeners.indexOf(callback);
    if (index > -1) {
      this.themeChangeListeners.splice(index, 1);
    }
  }

  /**
   * Notify all theme change listeners
   */
  private notifyThemeChangeListeners(theme: Theme): void {
    this.themeChangeListeners.forEach(callback => {
      try {
        callback(theme);
      } catch (error) {
        console.warn('⚠️ Error in theme change listener:', error);
      }
    });
  }

  /**
   * Cycle through themes
   */
  public cycleTheme(): void {
    const themeNames = Array.from(this.themes.keys());
    const currentIndex = themeNames.indexOf(this.currentTheme.name.toLowerCase());
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextThemeName = themeNames[nextIndex];
    
    this.switchTheme(nextThemeName);
  }

  /**
   * Check if theme manager is initialized
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Reset to default theme
   */
  public resetToDefault(): void {
    this.switchTheme('cyberpunk');
  }

  /**
   * Destroy theme manager
   */
  public destroy(): void {
    this.themeChangeListeners = [];
    this.isInitialized = false;
  }
}



