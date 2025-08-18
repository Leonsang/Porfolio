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

  // Static Settings Modal elements (if present in DOM)
  private settingsModal: HTMLElement | null = null;
  private settingsModalClose: HTMLElement | null = null;
  private settingsThemeSelect: HTMLSelectElement | null = null;
  private settingsLanguageSelect: HTMLSelectElement | null = null;
  private settingsMusicToggle: HTMLInputElement | null = null;

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

    // Bind static Settings modal (if present)
    this.bindStaticSettingsModal();
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

    // Initialize CV modal functionality
    this.initializeCVModal();

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
   * Initialize CV modal functionality
   */
  private initializeCVModal(): void {
    const cvModal = document.getElementById('cv-modal');
    const cvModalClose = document.getElementById('cv-modal-close');
    const cvModalContent = document.getElementById('cv-modal-content');
    const viewResumeBtn = document.getElementById('cta-view-resume');

    if (!cvModal || !cvModalClose || !cvModalContent) {
      console.warn('⚠️ CV modal elements not found');
      return;
    }

    // Close modal on overlay click
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        this.closeCVModal();
      }
    });

    // Close modal on close button click
    cvModalClose.addEventListener('click', () => {
      this.closeCVModal();
    });

    // Open CV modal when View Resume button is clicked
    if (viewResumeBtn) {
      viewResumeBtn.addEventListener('click', () => {
        this.openCVModal();
      });
    }

    // Initialize CVDownloader component
    this.initializeCVDownloader(cvModalContent);
  }

  /**
   * Initialize CVDownloader component
   */
  private initializeCVDownloader(container: HTMLElement): void {
    // Import CVDownloader dynamically to avoid circular dependencies
    import('./CVDownloader').then(({ CVDownloader }) => {
      const cvDownloader = new CVDownloader(container.id);
      
      // Store reference for cleanup
      (this as any).cvDownloader = cvDownloader;
    }).catch(error => {
      console.error('❌ Failed to initialize CVDownloader:', error);
    });
  }

  /**
   * Open CV modal
   */
  private openCVModal(): void {
    const cvModal = document.getElementById('cv-modal');
    if (!cvModal) return;

    cvModal.style.display = 'flex';
    this.animationManager.animateModalEntrance(cvModal);
  }

  /**
   * Close CV modal
   */
  private closeCVModal(): void {
    const cvModal = document.getElementById('cv-modal');
    if (!cvModal) return;

    this.animationManager.animateModalExit(cvModal).then(() => {
      cvModal.style.display = 'none';
    });
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
        // Prefer static settings modal if available; fallback to dynamic
        if (this.settingsModal) {
          this.openStaticSettingsModal();
        } else {
          this.showSettingsMenu();
        }
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
   * Bind static Settings modal (theme/lang/music)
   */
  private bindStaticSettingsModal(): void {
    this.settingsModal = document.getElementById('settings-modal');
    this.settingsModalClose = document.getElementById('settings-modal-close');
    this.settingsThemeSelect = document.getElementById('settings-theme-select') as HTMLSelectElement;
    this.settingsLanguageSelect = document.getElementById('settings-language-select') as HTMLSelectElement;
    this.settingsMusicToggle = document.getElementById('settings-music-toggle') as HTMLInputElement;

    if (!this.settingsModal) return; // nothing to bind

    // Sync initial UI values
    this.syncStaticSettingsUI();

    // Close handlers
    if (this.settingsModalClose) {
      this.settingsModalClose.addEventListener('click', () => this.closeStaticSettingsModal());
    }
    this.settingsModal.addEventListener('click', (e) => {
      if (e.target === this.settingsModal) this.closeStaticSettingsModal();
    });

    // Change handlers
    if (this.settingsThemeSelect) {
      this.settingsThemeSelect.addEventListener('change', (e) => {
        const val = (e.target as HTMLSelectElement).value;
        if (val) {
          this.themeManager.switchTheme(val);
          this.updateControlLabels();
          this.updateThemePreview();
        }
      });
    }

    if (this.settingsLanguageSelect) {
      this.settingsLanguageSelect.addEventListener('change', (e) => {
        const val = (e.target as HTMLSelectElement).value;
        if (val) {
          i18n.setLanguage(val);
          this.updateControlLabels();
          this.refresh();
        }
      });
    }

    if (this.settingsMusicToggle) {
      this.settingsMusicToggle.addEventListener('change', (e) => {
        const checked = (e.target as HTMLInputElement).checked;
        this.setMusicEnabled(checked);
        this.toggleIntegratedAudioPlayer(checked);
      });
    }

    // Static: animations toggle
    const animationsCheckbox = document.getElementById('enable-animations') as HTMLInputElement;
    if (animationsCheckbox) {
      animationsCheckbox.checked = this.animationManager.areAnimationsEnabled();
      animationsCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.animationManager.toggleAnimations(target.checked);
        window.dispatchEvent(new CustomEvent('animationsToggled', { detail: { enabled: target.checked } }));
      });
    }

    // Static: particles toggle
    const particlesCheckbox = document.getElementById('enable-particles') as HTMLInputElement;
    if (particlesCheckbox) {
      particlesCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        window.dispatchEvent(new CustomEvent('particlesToggled', { detail: { enabled: target.checked } }));
      });
    }

    // Static: audio toggle
    const audioCheckbox = document.getElementById('enable-audio') as HTMLInputElement;
    if (audioCheckbox) {
      audioCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        window.dispatchEvent(new CustomEvent('audioToggled', { detail: { enabled: target.checked } }));
      });
    }

    // Static: master volume
    const volumeSlider = document.getElementById('master-volume') as HTMLInputElement;
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        window.dispatchEvent(new CustomEvent('volumeChanged', { detail: { volume: parseInt(target.value) / 100 } }));
      });
    }
  }

  /** Open/Close static settings modal */
  private openStaticSettingsModal(): void {
    if (!this.settingsModal) return;
    this.syncStaticSettingsUI();
    this.settingsModal.style.display = 'flex';
    this.animationManager.animateModalEntrance(this.settingsModal);
    
    // Show integrated audio player if music is enabled
    if (this.isMusicPlayerEnabled()) {
      this.toggleIntegratedAudioPlayer(true);
    }
  }
  private async closeStaticSettingsModal(): Promise<void> {
    if (!this.settingsModal) return;
    await this.animationManager.animateModalExit(this.settingsModal);
    this.settingsModal.style.display = 'none';
  }

  /** Sync current values to static settings UI */
  private syncStaticSettingsUI(): void {
    const currentTheme = this.themeManager.getCurrentTheme();
    if (this.settingsThemeSelect) {
      this.settingsThemeSelect.value = currentTheme.name.toLowerCase();
    }
    const currentLang = i18n.getCurrentLanguage();
    if (this.settingsLanguageSelect) {
      this.settingsLanguageSelect.value = currentLang;
    }
    if (this.settingsMusicToggle) {
      this.settingsMusicToggle.checked = this.isMusicPlayerEnabled();
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
    
    const modal = this.createModal(
      i18n.t('modals.languageSelector'), 
      i18n.t('modals.chooseLanguage')
    );
    
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
    const modal = this.createModal(
      i18n.t('modals.settings'), 
      i18n.t('modals.customizeExperience')
    );
    
    const settingsContent = document.createElement('div');
    settingsContent.className = 'settings-content';
    
    // Animation settings
    const animationSection = document.createElement('div');
    animationSection.className = 'setting-section';
    animationSection.innerHTML = `
      <h4>${i18n.t('modals.animations')}</h4>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-animations" ${this.animationManager.areAnimationsEnabled() ? 'checked' : ''}>
          ${i18n.t('modals.enableAnimations')}
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-particles" checked>
          ${i18n.t('modals.enableParticles')}
        </label>
      </div>
    `;
    
    // Audio settings
    const audioSection = document.createElement('div');
    audioSection.className = 'setting-section';
    audioSection.innerHTML = `
      <h4>${i18n.t('modals.audio')}</h4>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-audio" checked>
          ${i18n.t('modals.enableAudio')}
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" id="enable-music" ${this.isMusicPlayerEnabled() ? 'checked' : ''}>
          ${i18n.t('modals.enableMusic')}
        </label>
      </div>
      <div class="setting-item">
        <label>${i18n.t('modals.masterVolume')}</label>
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

    // Also update the theme switcher button specifically
    if (this.themeSwitcher) {
      const themeLabel = this.themeSwitcher.querySelector('.control-label');
      if (themeLabel) {
        const currentTheme = this.themeManager.getCurrentTheme();
        themeLabel.textContent = currentTheme.name;
      }
    }

    // Also update the language switcher button specifically
    if (this.languageSwitcher) {
      const languageLabel = this.languageSwitcher.querySelector('.control-label');
      if (languageLabel) {
        const currentLang = i18n.getCurrentLanguage();
        const languages = i18n.getSupportedLanguages();
        const langInfo = languages.find(l => l.code === currentLang);
        languageLabel.textContent = langInfo?.name || currentLang.toUpperCase();
      }
    }
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
    this.updateModalsContent();
  }

  /**
   * Update modal content when language changes
   */
  public updateModalsContent(): void {
    // Update any open modals with new language
    const openModals = document.querySelectorAll('.modal-overlay');
    openModals.forEach(modal => {
      const modalHeader = modal.querySelector('.modal-header h3');
      const modalSubtitle = modal.querySelector('.modal-subtitle');
      
      if (modalHeader && modalSubtitle) {
        // Check if it's a language selector modal
        if (modalHeader.textContent?.includes('Language') || modalHeader.textContent?.includes('Idioma')) {
          modalHeader.textContent = i18n.t('modals.languageSelector');
          modalSubtitle.textContent = i18n.t('modals.customizeExperience');
        }
        // Check if it's a settings modal
        else if (modalHeader.textContent?.includes('Settings') || modalHeader.textContent?.includes('Configuración')) {
          modalHeader.textContent = i18n.t('modals.settings');
          modalSubtitle.textContent = i18n.t('modals.customizeExperience');
          
          // Update settings content
          this.updateSettingsModalContent(modal);
        }
        // Check if it's a CV modal
        else if (modalHeader.textContent?.includes('Download CV') || modalHeader.textContent?.includes('Descargar CV')) {
          modalHeader.textContent = i18n.t('cv.title');
          modalSubtitle.textContent = i18n.t('cv.subtitle');
          
          // Update CV modal content
          this.updateCVModalContent(modal);
        }
      }
    });
  }

  /**
   * Update settings modal content with new language
   */
  private updateSettingsModalContent(modal: Element): void {
    const animationSection = modal.querySelector('.setting-section:first-child');
    const audioSection = modal.querySelector('.setting-section:last-child');
    
    if (animationSection) {
      const animationTitle = animationSection.querySelector('h4');
      const enableAnimationsLabel = animationSection.querySelector('#enable-animations + label');
      const enableParticlesLabel = animationSection.querySelector('#enable-particles + label');
      
      if (animationTitle) animationTitle.textContent = i18n.t('modals.animations');
      if (enableAnimationsLabel) enableAnimationsLabel.textContent = i18n.t('modals.enableAnimations');
      if (enableParticlesLabel) enableParticlesLabel.textContent = i18n.t('modals.enableParticles');
    }
    
    if (audioSection) {
      const audioTitle = audioSection.querySelector('h4');
      const enableAudioLabel = audioSection.querySelector('#enable-audio + label');
      const enableMusicLabel = audioSection.querySelector('#enable-music + label');
      const masterVolumeLabel = audioSection.querySelector('#master-volume + label');
      
      if (audioTitle) audioTitle.textContent = i18n.t('modals.audio');
      if (enableAudioLabel) enableAudioLabel.textContent = i18n.t('modals.enableAudio');
      if (enableMusicLabel) enableMusicLabel.textContent = i18n.t('modals.enableMusic');
      if (masterVolumeLabel) masterVolumeLabel.textContent = i18n.t('modals.masterVolume');
    }
  }

  /**
   * Update CV modal content with new language
   */
  private updateCVModalContent(modal: Element): void {
    // Trigger a re-render of the CVDownloader component
    const cvDownloader = (this as any).cvDownloader;
    if (cvDownloader && typeof cvDownloader.render === 'function') {
      cvDownloader.render();
    }
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

    // Toggle audio visualizer visibility
    this.toggleAudioVisualizer(enabled);
  }

  /**
   * Check if music is enabled
   */
  public isMusicPlayerEnabled(): boolean {
    return this.isMusicEnabled;
  }

  /**
   * Toggle integrated audio player in settings modal
   */
  private toggleIntegratedAudioPlayer(enabled: boolean): void {
    const integratedPlayer = document.getElementById('integrated-audio-player');
    if (!integratedPlayer) return;

    if (enabled) {
      integratedPlayer.style.display = 'block';
      this.setupIntegratedAudioPlayer();
    } else {
      integratedPlayer.style.display = 'none';
    }
  }

  /**
   * Setup integrated audio player controls
   */
  private setupIntegratedAudioPlayer(): void {
    // Get audio player instance from global scope
    const audioPlayer = (window as any).portfolioApp?.audioPlayer;
    if (!audioPlayer) {
      console.warn('Audio player not found in global scope');
      return;
    }

    // Setup control buttons
    const playBtn = document.getElementById('settings-play-btn');
    const prevBtn = document.getElementById('settings-prev-btn');
    const nextBtn = document.getElementById('settings-next-btn');
    const progressBar = document.getElementById('settings-progress-bar');
    const progressFill = document.getElementById('settings-progress-fill');

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        audioPlayer.togglePlay();
        this.updateIntegratedPlayerUI();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        audioPlayer.previousTrack();
        this.updateIntegratedPlayerUI();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        audioPlayer.nextTrack();
        this.updateIntegratedPlayerUI();
      });
    }

    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        audioPlayer.seekTo(percentage);
      });
    }

    // Setup playlist
    this.renderIntegratedPlaylist();
    
    // Initial UI update
    this.updateIntegratedPlayerUI();
    
    // Setup periodic updates
    setInterval(() => {
      if (this.isMusicPlayerEnabled()) {
        this.updateIntegratedPlayerUI();
      }
    }, 1000);
  }

  /**
   * Update integrated player UI
   */
  private updateIntegratedPlayerUI(): void {
    const audioPlayer = (window as any).portfolioApp?.audioPlayer;
    if (!audioPlayer) return;

    const trackTitle = document.getElementById('settings-track-title');
    const trackArtist = document.getElementById('settings-track-artist');
    const timeDisplay = document.getElementById('settings-time-display');
    const progressFill = document.getElementById('settings-progress-fill');
    const playBtn = document.getElementById('settings-play-btn');

    if (trackTitle) {
      const currentTrack = audioPlayer.getCurrentTrack();
      trackTitle.textContent = currentTrack?.title || 'No track loaded';
    }

    if (trackArtist) {
      const currentTrack = audioPlayer.getCurrentTrack();
      trackArtist.textContent = currentTrack?.artist || '-';
    }

    if (timeDisplay) {
      const currentTime = audioPlayer.getCurrentTime();
      const duration = audioPlayer.getDuration();
      timeDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`;
    }

    if (progressFill) {
      const currentTime = audioPlayer.getCurrentTime();
      const duration = audioPlayer.getDuration();
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      progressFill.style.width = `${progress}%`;
    }

    if (playBtn) {
      const isPlaying = audioPlayer.isPlaying();
      const icon = playBtn.querySelector('i');
      if (icon) {
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
      }
      playBtn.title = isPlaying ? 'Pause' : 'Play';
    }
  }

  /**
   * Render integrated playlist
   */
  private renderIntegratedPlaylist(): void {
    const audioPlayer = (window as any).portfolioApp?.audioPlayer;
    if (!audioPlayer) return;

    const playlistContainer = document.getElementById('settings-playlist-tracks');
    if (!playlistContainer) return;

    const tracks = audioPlayer.getPlaylist();
    playlistContainer.innerHTML = tracks.map((track: any, index: number) => `
      <div class="playlist-track ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="track-info">
          <div class="track-title">${track.title}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <div class="track-duration">${this.formatTime(track.duration)}</div>
      </div>
    `).join('');

    // Add click listeners
    playlistContainer.querySelectorAll('.playlist-track').forEach((trackElement, index) => {
      trackElement.addEventListener('click', () => {
        audioPlayer.setTrack(index);
        this.updateIntegratedPlayerUI();
        
        // Update active state
        playlistContainer.querySelectorAll('.playlist-track').forEach(track => {
          track.classList.remove('active');
        });
        trackElement.classList.add('active');
      });
    });
  }

  /**
   * Format time in MM:SS format
   */
  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Toggle audio visualizer visibility
   */
  private toggleAudioVisualizer(enabled: boolean): void {
    const visualizerContainer = document.querySelector('.audio-visualizer-container') as HTMLElement;
    if (!visualizerContainer) return;

    if (enabled) {
      visualizerContainer.style.display = 'block';
      // Trigger a small delay to ensure smooth transition
      setTimeout(() => {
        visualizerContainer.style.opacity = '0.7';
      }, 100);
    } else {
      visualizerContainer.style.opacity = '0';
      setTimeout(() => {
        visualizerContainer.style.display = 'none';
      }, 300);
    }
  }
}
