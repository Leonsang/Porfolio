import { ThemeManager } from '../utils/ThemeManager';
import { AnimationManager } from '../utils/AnimationManager';
import { i18n } from '../i18n/i18n';

export class UIController {
  private themeManager: ThemeManager;
  private animationManager: AnimationManager;
  private themeSwitcher: HTMLElement | null = null;
  private languageSwitcher: HTMLElement | null = null;
  private settingsMenu: HTMLElement | null = null;
  private musicToggle: HTMLElement | null = null;
  private isInitialized: boolean = false;
  private isMusicEnabled: boolean = true; // Control para habilitar/deshabilitar música

  constructor(themeManager: ThemeManager, animationManager: AnimationManager) {
    this.themeManager = themeManager;
    this.animationManager = animationManager;
  }

  /**
   * Initialize the UI controller
   */
  public init(): void {
    if (this.isInitialized) {
      console.warn('⚠️ UIController already initialized');
      return;
    }

    console.log('🔧 UIController: Starting initialization...');
    
    this.initializeControls();
    this.setupEventListeners();
    this.updateControlLabels();
    this.isInitialized = true;
    
    console.log('✅ UIController initialized successfully');
    console.log('🔧 UIController: Theme manager ready:', this.themeManager.isReady());
    console.log('🔧 UIController: Available themes:', this.themeManager.getAvailableThemes().map(t => t.name));
  }

  /**
   * Initialize control elements
   */
  private initializeControls(): void {
    console.log('🔧 UIController: Looking for control elements...');
    
    this.themeSwitcher = document.getElementById('theme-switcher');
    this.languageSwitcher = document.getElementById('language-switcher');
    this.settingsMenu = document.getElementById('settings-menu');
    this.musicToggle = document.getElementById('music-toggle');

    console.log('🔧 UIController: Theme switcher found:', !!this.themeSwitcher);
    console.log('🔧 UIController: Language switcher found:', !!this.languageSwitcher);
    console.log('🔧 UIController: Settings menu found:', !!this.settingsMenu);

    if (!this.themeSwitcher) {
      console.warn('⚠️ Theme switcher not found');
    }
    if (!this.languageSwitcher) {
      console.warn('⚠️ Language switcher not found');
    }
    if (!this.settingsMenu) {
      console.warn('⚠️ Settings menu not found');
    }
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Theme switcher
    if (this.themeSwitcher) {
      this.themeSwitcher.addEventListener('click', (e) => {
        this.animationManager.animateControlButton(this.themeSwitcher!, 'click');
        this.showThemeSelector();
      });
      
      // Add hover and focus animations
      this.themeSwitcher.addEventListener('mouseenter', () => {
        this.animationManager.animateControlButton(this.themeSwitcher!, 'hover');
      });
      
      this.themeSwitcher.addEventListener('focus', () => {
        this.animationManager.animateControlButton(this.themeSwitcher!, 'focus');
      });
    }

    // Language switcher
    if (this.languageSwitcher) {
      this.languageSwitcher.addEventListener('click', (e) => {
        this.animationManager.animateControlButton(this.languageSwitcher!, 'click');
        this.showLanguageSelector();
      });
      
      this.languageSwitcher.addEventListener('mouseenter', () => {
        this.animationManager.animateControlButton(this.languageSwitcher!, 'hover');
      });
      
      this.languageSwitcher.addEventListener('focus', () => {
        this.animationManager.animateControlButton(this.languageSwitcher!, 'focus');
      });
    }

    // Settings menu
    if (this.settingsMenu) {
      this.settingsMenu.addEventListener('click', (e) => {
        this.animationManager.animateControlButton(this.settingsMenu!, 'click');
        this.showSettingsMenu();
      });
      
      this.settingsMenu.addEventListener('mouseenter', () => {
        this.animationManager.animateControlButton(this.settingsMenu!, 'hover');
      });
      
      this.settingsMenu.addEventListener('focus', () => {
        this.animationManager.animateControlButton(this.settingsMenu!, 'focus');
      });
    }

    // Music toggle
    if (this.musicToggle) {
      this.musicToggle.addEventListener('click', (e) => {
        this.animationManager.animateControlButton(this.musicToggle!, 'click');
        this.toggleMusicPlayer();
      });
      
      this.musicToggle.addEventListener('mouseenter', () => {
        this.animationManager.animateControlButton(this.musicToggle!, 'hover');
      });
      
      this.musicToggle.addEventListener('focus', () => {
        this.animationManager.animateControlButton(this.musicToggle!, 'focus');
      });
    }
  }

  /**
   * Show theme selector
   */
  private showThemeSelector(): void {
    const themes = this.themeManager.getAvailableThemes();
    const currentTheme = this.themeManager.getCurrentTheme();
    
    const modal = this.createModal('Theme Selector', 'Choose your preferred theme:');
    
    const themeList = document.createElement('div');
    themeList.className = 'theme-list';
    
    themes.forEach(theme => {
      const themeOption = document.createElement('div');
      themeOption.className = `theme-option ${theme.name.toLowerCase() === currentTheme.name.toLowerCase() ? 'active' : ''}`;
      themeOption.innerHTML = `
        <div class="theme-preview" style="background: ${theme.primary_color}"></div>
        <div class="theme-info">
          <h4>${theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}</h4>
          <div class="theme-colors">
            <span class="color-dot" style="background: ${theme.primary_color}"></span>
            <span class="color-dot" style="background: ${theme.secondary_color}"></span>
            <span class="color-dot" style="background: ${theme.accent_color}"></span>
          </div>
        </div>
      `;
      
      themeOption.addEventListener('click', () => {
        console.log(`🎨 Switching to theme: ${theme.name}`);
        this.themeManager.switchTheme(theme.name.toLowerCase());
        this.closeModal(modal);
        this.updateThemePreview();
        this.updateControlLabels();
      });
      
      themeList.appendChild(themeOption);
    });
    
    modal.querySelector('.modal-content')?.appendChild(themeList);
    document.body.appendChild(modal);
    
    // Animate modal entrance
    this.animationManager.animateModalEntrance(modal);
  }

  /**
   * Show language selector
   */
  private showLanguageSelector(): void {
    const languages = i18n.getSupportedLanguages();
    const currentLanguage = i18n.getCurrentLanguage();
    
    const modal = this.createModal('Language Selector', 'Choose your preferred language:');
    
    const languageList = document.createElement('div');
    languageList.className = 'language-list';
    
    languages.forEach(lang => {
      const languageOption = document.createElement('div');
      languageOption.className = `language-option ${lang.code === currentLanguage ? 'active' : ''}`;
      languageOption.innerHTML = `
        <span class="language-flag">${lang.flag}</span>
        <span class="language-name">${lang.name}</span>
        <span class="language-code">${lang.code.toUpperCase()}</span>
      `;
      
      languageOption.addEventListener('click', () => {
        i18n.setLanguage(lang.code);
        this.closeModal(modal);
        this.updateControlLabels();
      });
      
      languageList.appendChild(languageOption);
    });
    
    modal.querySelector('.modal-content')?.appendChild(languageList);
    document.body.appendChild(modal);
    
    // Animate modal entrance
    this.animationManager.animateModalEntrance(modal);
  }

  /**
   * Show settings menu
   */
  private showSettingsMenu(): void {
    const modal = this.createModal('Settings', 'Customize your portfolio experience:');
    
    const settingsContent = document.createElement('div');
    settingsContent.className = 'settings-content';
    
    // Animation settings
    const animationSection = document.createElement('div');
    animationSection.className = 'setting-section';
    animationSection.innerHTML = `
      <h4>Animations</h4>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-animations" ${this.animationManager.areAnimationsEnabled() ? 'checked' : ''}>
          Enable animations
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-particles" checked>
          Enable particle effects
        </label>
      </div>
    `;
    
    // Audio settings
    const audioSection = document.createElement('div');
    audioSection.className = 'setting-section';
    audioSection.innerHTML = `
      <h4>Audio</h4>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-audio" checked>
          Enable sound effects
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-music" ${this.isMusicPlayerEnabled() ? 'checked' : ''}>
          Enable music player
        </label>
      </div>
      <div class="setting-item">
        <label>Master Volume</label>
        <input type="range" id="master-volume" min="0" max="100" value="50">
      </div>
    `;
    
    settingsContent.appendChild(animationSection);
    settingsContent.appendChild(audioSection);
    
    modal.querySelector('.modal-content')?.appendChild(settingsContent);
    document.body.appendChild(modal);
    
    // Animate modal entrance
    this.animationManager.animateModalEntrance(modal);
    
    // Setup settings event listeners
    this.setupSettingsEventListeners();
  }

  /**
   * Create modal
   */
  private createModal(title: string, subtitle: string): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-content">
          <p class="modal-subtitle">${subtitle}</p>
        </div>
      </div>
    `;
    
    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });
    
    // Close modal on close button click
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
    }
    
    return modal;
  }

  /**
   * Close modal
   */
  private async closeModal(modal: HTMLElement): Promise<void> {
    // Animate modal exit
    await this.animationManager.animateModalExit(modal);
    modal.remove();
  }

  /**
   * Update control labels
   */
  private updateControlLabels(): void {
    const labels = document.querySelectorAll('.control-label');
    labels.forEach(label => {
      const text = label.textContent;
      if (text === 'Theme') {
        const currentTheme = this.themeManager.getCurrentTheme();
        label.textContent = currentTheme.name;
      } else if (text === 'Language') {
        const currentLang = i18n.getCurrentLanguage();
        const languages = i18n.getSupportedLanguages();
        const langInfo = languages.find(l => l.code === currentLang);
        label.textContent = langInfo?.name || currentLang.toUpperCase();
      }
    });
  }

  /**
   * Update theme preview
   */
  private updateThemePreview(): void {
    // Update any theme preview elements if they exist
    const themePreviews = document.querySelectorAll('.theme-preview');
    themePreviews.forEach(preview => {
      const currentTheme = this.themeManager.getCurrentTheme();
      (preview as HTMLElement).style.background = currentTheme.primary_color;
    });
  }

  /**
   * Setup settings event listeners
   */
  private setupSettingsEventListeners(): void {
    // Animation settings
    const animationsCheckbox = document.getElementById('enable-animations') as HTMLInputElement;
    if (animationsCheckbox) {
      animationsCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.animationManager.toggleAnimations(target.checked);
        // Dispatch custom event for animation manager
        window.dispatchEvent(new CustomEvent('animationsToggled', {
          detail: { enabled: target.checked }
        }));
      });
    }
    
    // Particles checkbox
    const particlesCheckbox = document.getElementById('enable-particles') as HTMLInputElement;
    if (particlesCheckbox) {
      particlesCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        // Dispatch custom event for particles manager
        window.dispatchEvent(new CustomEvent('particlesToggled', {
          detail: { enabled: target.checked }
        }));
      });
    }
    
    // Audio settings
    const audioCheckbox = document.getElementById('enable-audio') as HTMLInputElement;
    if (audioCheckbox) {
      audioCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        // Dispatch custom event for audio manager
        window.dispatchEvent(new CustomEvent('audioToggled', {
          detail: { enabled: target.checked }
        }));
      });
    }
    
    // Music checkbox
    const musicCheckbox = document.getElementById('enable-music') as HTMLInputElement;
    if (musicCheckbox) {
      musicCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.setMusicEnabled(target.checked);
      });
    }
    
    // Volume slider
    const volumeSlider = document.getElementById('master-volume') as HTMLInputElement;
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        // Dispatch custom event for volume change
        window.dispatchEvent(new CustomEvent('volumeChanged', {
          detail: { volume: parseInt(target.value) / 100 }
        }));
      });
    }
  }

  /**
   * Refresh UI
   */
  public refresh(): void {
    this.updateControlLabels();
    this.updateThemePreview();
  }

  /**
   * Destroy UI controller
   */
  public destroy(): void {
    // Remove event listeners
    if (this.themeSwitcher) {
      this.themeSwitcher.removeEventListener('click', () => {});
    }
    if (this.languageSwitcher) {
      this.languageSwitcher.removeEventListener('click', () => {});
    }
    if (this.settingsMenu) {
      this.settingsMenu.removeEventListener('click', () => {});
    }
    
    this.isInitialized = false;
  }

  /**
   * Toggle music player visibility
   */
  private toggleMusicPlayer(): void {
    if (!this.isMusicEnabled) {
      console.log('🎵 Music player is disabled');
      return;
    }
    
    // Dispatch custom event for music player toggle
    const event = new CustomEvent('musicPlayerToggle');
    window.dispatchEvent(event);
  }

  /**
   * Enable/disable music player
   */
  public setMusicEnabled(enabled: boolean): void {
    this.isMusicEnabled = enabled;
    
    if (this.musicToggle) {
      this.musicToggle.classList.toggle('disabled', !enabled);
      this.musicToggle.style.opacity = enabled ? '1' : '0.5';
      this.musicToggle.style.cursor = enabled ? 'pointer' : 'not-allowed';
      
      // Update tooltip
      this.musicToggle.title = enabled ? 'Toggle Music Player' : 'Music Player Disabled';
    }
  }

  /**
   * Check if music is enabled
   */
  public isMusicPlayerEnabled(): boolean {
    return this.isMusicEnabled;
  }
}
