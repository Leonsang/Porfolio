export interface Theme {
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  dark_color: string;
  light_color: string;
  gray_color: string;
}

export class ThemeManager {
  private currentTheme: Theme;
  private themes: Map<string, Theme>;
  private root: HTMLElement;
  private splineBackground: any = null; // SplineBackground instance

  constructor() {
    this.root = document.documentElement;
    this.themes = new Map();
    this.initializeThemes();
    
    // Load saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && this.themes.has(savedTheme)) {
      this.currentTheme = this.themes.get(savedTheme)!;
    } else {
      this.currentTheme = this.themes.get('retro')!;
    }
    
    this.applyTheme(this.currentTheme);
  }

  private initializeThemes(): void {
    // Retro 8-bit theme (default)
    this.themes.set('retro', {
      name: 'retro',
      primary_color: '#00ff41',
      secondary_color: '#ff6b35',
      accent_color: '#4ecdc4',
      dark_color: '#1a1a1a',
      light_color: '#ffffff',
      gray_color: '#888888'
    });

    // Cyberpunk theme
    this.themes.set('cyberpunk', {
      name: 'cyberpunk',
      primary_color: '#ff00ff',
      secondary_color: '#00ffff',
      accent_color: '#ffff00',
      dark_color: '#0a0a0a',
      light_color: '#ffffff',
      gray_color: '#666666'
    });

    // Matrix theme
    this.themes.set('matrix', {
      name: 'matrix',
      primary_color: '#00ff00',
      secondary_color: '#003300',
      accent_color: '#00cc00',
      dark_color: '#000000',
      light_color: '#00ff00',
      gray_color: '#004400'
    });

    // Sunset theme
    this.themes.set('sunset', {
      name: 'sunset',
      primary_color: '#ff6b35',
      secondary_color: '#f7931e',
      accent_color: '#ffd23f',
      dark_color: '#2c1810',
      light_color: '#ffffff',
      gray_color: '#8b7355'
    });
  }

  public applyTheme(theme: Theme): void {
    this.currentTheme = theme;
    
    // Apply CSS variables
    this.root.style.setProperty('--primary-color', theme.primary_color);
    this.root.style.setProperty('--secondary-color', theme.secondary_color);
    this.root.style.setProperty('--accent-color', theme.accent_color);
    this.root.style.setProperty('--dark-color', theme.dark_color);
    this.root.style.setProperty('--light-color', theme.light_color);
    this.root.style.setProperty('--gray-color', theme.gray_color);

    // Apply SplineBackground theme if available
    if (this.splineBackground && this.splineBackground.setTheme) {
      this.splineBackground.setTheme(theme.name);
    }

    // Cambiar escena de Spline para el tema
    this.changeSplineSceneForTheme(theme.name);

    // Store in localStorage
    localStorage.setItem('portfolio-theme', theme.name);

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  }

  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  public getAvailableThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  /**
   * Configurar SplineBackground
   */
  public setSplineBackground(splineBackground: any): void {
    this.splineBackground = splineBackground;
  }

  /**
   * Cambiar escena de Spline para un tema específico
   */
  public changeSplineSceneForTheme(themeName: string): void {
    if (!this.splineBackground || !this.splineBackground.changeSplineScene) return;

    switch (themeName) {
      case 'cyberpunk':
        this.splineBackground.changeSplineScene('https://my.spline.design/synthwaveroad-1VHsiEVO3f6ROjJN0a1mrrJN0a1mrrJj/');
        break;
      case 'matrix':
        // Aquí puedes añadir una escena matrix si tienes una
        break;
      case 'sunset':
        // Aquí puedes añadir una escena sunset si tienes una
        break;
      default:
        // Escena por defecto
        break;
    }
  }

  public switchTheme(themeName: string): void {
    const theme = this.themes.get(themeName);
    if (theme) {
      this.applyTheme(theme);
    } else {
      console.warn(`⚠️ Theme '${themeName}' not found`);
    }
  }

  public getTheme(themeName: string): Theme | undefined {
    return this.themes.get(themeName);
  }

  public addTheme(theme: Theme): void {
    this.themes.set(theme.name.toLowerCase(), theme);
  }

  public removeTheme(themeName: string): void {
    if (themeName === 'retro') {
      console.warn('⚠️ Cannot remove default theme');
      return;
    }
    this.themes.delete(themeName);
  }

  public cycleTheme(): void {
    const themeNames = Array.from(this.themes.keys());
    const currentIndex = themeNames.indexOf(this.currentTheme.name);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextThemeName = themeNames[nextIndex];
    this.switchTheme(nextThemeName);
  }

  public isReady(): boolean {
    return this.themes.size > 0 && this.currentTheme !== undefined;
  }

  public resetToDefault(): void {
    this.switchTheme('retro');
  }

  public destroy(): void {
    // Clean up event listeners if any
    this.themes.clear();
  }

  public createThemeSwitcher(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'theme-switcher';
    
    const label = document.createElement('label');
    label.textContent = 'Theme: ';
    label.style.color = 'var(--light-color)';
    label.style.fontFamily = 'var(--font-secondary)';
    label.style.marginRight = '10px';
    
    const select = document.createElement('select');
    select.style.background = 'var(--dark-color)';
    select.style.color = 'var(--light-color)';
    select.style.border = '2px solid var(--primary-color)';
    select.style.borderRadius = '8px';
    select.style.padding = '5px 10px';
    select.style.fontFamily = 'var(--font-secondary)';
    
    this.getAvailableThemes().forEach(theme => {
      const option = document.createElement('option');
      option.value = theme.name;
      option.textContent = theme.name.charAt(0).toUpperCase() + theme.name.slice(1);
      if (theme.name === this.currentTheme.name) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.switchTheme(target.value);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
  }
}
