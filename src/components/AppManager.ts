import { PortfolioManager } from './PortfolioManager';
import { ContentUpdater } from './ContentUpdater';
import { ThemeManager } from '../utils/ThemeManager';
import { AnimationManager } from '../utils/AnimationManager';
import { ParticlesBackground } from './ParticlesBackground';
import { ThreeDEffects } from './3DEffects';
import { AudioEffects } from './AudioEffects';
import { SkillsChart } from './SkillsChart';
import { ProjectGallery } from './ProjectGallery';
import { Certifications } from './Certifications';
import { ImageCarousel } from './ImageCarousel';
import { UIController } from './UIController';
import { i18n } from '../i18n/i18n';
import { portfolioConfig } from '../config/portfolio';
import { AudioPlayer } from './AudioPlayer';
import { AudioPlayerUI } from './AudioPlayerUI';

export interface AppConfig {
  enableParticles: boolean;
  enable3DEffects: boolean;
  enableAudio: boolean;
  enableAnimations: boolean;
  enableThemeSwitcher: boolean;
  enableLanguageSwitcher: boolean;
}

export class AppManager {
  private portfolioManager!: PortfolioManager;
  private contentUpdater!: ContentUpdater;
  private themeManager!: ThemeManager;
  private animationManager!: AnimationManager;
  private uiController!: UIController;
  private particlesBackground: ParticlesBackground | null = null;
  private threeDEffects: ThreeDEffects | null = null;
  private audioEffects: AudioEffects | null = null;
  private skillsChart: SkillsChart | null = null;
  private projectGallery: ProjectGallery | null = null;
  private certifications: Certifications | null = null;
  private imageCarousel: ImageCarousel | null = null;
  private audioPlayer: AudioPlayer | null = null;
  private audioPlayerUI: AudioPlayerUI | null = null;
  
  private config: AppConfig;
  private isInitialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;

  constructor(config: Partial<AppConfig> = {}) {
    this.config = {
      enableParticles: true,
      enable3DEffects: true,
      enableAudio: true,
      enableAnimations: true,
      enableThemeSwitcher: true,
      enableLanguageSwitcher: true,
      ...config
    };
  }

  /**
   * Initialize the entire application
   */
  public async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('⚠️ AppManager already initialized');
      return;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.performInitialization();
    return this.initializationPromise;
  }

  private async performInitialization(): Promise<void> {
    try {
      console.log('🚀 Initializing Portfolio Application...');
      
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Initialize core managers
      await this.initializeCoreManagers();
      
      // Initialize visual effects
      await this.initializeVisualEffects();
      
      // Initialize interactive components
      await this.initializeInteractiveComponents();
      
      // Setup global event listeners
      this.setupGlobalEventListeners();
      
      // Final initialization
      await this.finalizeInitialization();
      
      this.isInitialized = true;
      console.log('✅ Portfolio Application initialized successfully!');
      
      // Dispatch ready event
      window.dispatchEvent(new CustomEvent('portfolioReady', {
        detail: { timestamp: Date.now() }
      }));
      
    } catch (error) {
      console.error('❌ Error initializing Portfolio Application:', error);
      throw error;
    }
  }

  private async waitForDOM(): Promise<void> {
    if (document.readyState === 'complete') {
      return;
    }
    
    return new Promise(resolve => {
      window.addEventListener('load', () => resolve());
    });
  }

  /**
   * Initialize core managers
   */
  private async initializeCoreManagers(): Promise<void> {
    console.log('🔧 Initializing core managers...');
    
    // Initialize theme manager
    this.themeManager = new ThemeManager();
    
    // Initialize animation manager
    this.animationManager = new AnimationManager();
    this.animationManager.init();
    
    // Initialize UIController
    this.uiController = new UIController(this.themeManager, this.animationManager);
    this.uiController.init();
    
    // Initialize portfolio manager
    this.portfolioManager = new PortfolioManager(this.animationManager);
    this.portfolioManager.init();
    
    // Initialize content updater
    this.contentUpdater = new ContentUpdater();
    // ContentUpdater se inicializa automáticamente en su constructor
    
    // Initialize AudioPlayer
    this.audioPlayer = new AudioPlayer();
    this.audioPlayerUI = new AudioPlayerUI(this.audioPlayer);

    // Animate hero entrance on page load
    setTimeout(() => {
      this.animationManager.animateHeroEntrance();
    }, 500);

    console.log('✅ Core managers initialized');
  }

  private async initializeI18n(): Promise<void> {
    console.log('🌍 Initializing internationalization...');
    
    // Wait for i18n to be ready
    try {
      await i18n.waitForReady();
      console.log('✅ i18n initialized with language:', i18n.getCurrentLanguage());
      
      // Force initial content update after i18n is ready
      setTimeout(() => {
        this.contentUpdater.updateAllContent();
      }, 100);
      
    } catch (error) {
      console.warn('⚠️ i18n initialization failed, continuing...', error);
    }
  }

  private async initializeVisualEffects(): Promise<void> {
    console.log('🎨 Initializing visual effects...');
    
    // Initialize particles background
    if (this.config.enableParticles) {
      try {
        const canvas = document.getElementById('particles-background');
        if (canvas) {
          this.particlesBackground = new ParticlesBackground('particles-background');
          console.log('✅ Particles background initialized');
        }
      } catch (error) {
        console.warn('⚠️ Failed to initialize particles background:', error);
      }
    }
    
    // Initialize 3D effects
    if (this.config.enable3DEffects) {
      try {
        this.threeDEffects = new ThreeDEffects();
        this.setup3DEffects();
        console.log('✅ 3D effects initialized');
      } catch (error) {
        console.warn('⚠️ Failed to initialize 3D effects:', error);
      }
    }
    
    console.log('✅ Visual effects initialized');
  }

  private async initializeInteractiveComponents(): Promise<void> {
    console.log('🎮 Initializing interactive components...');
    
    // Initialize skills chart
    try {
      const canvas = document.getElementById('skillsRadarChart');
      if (canvas) {
        this.skillsChart = new SkillsChart('skillsRadarChart', portfolioConfig.skills);
        console.log('✅ Skills chart initialized');
      }
    } catch (error) {
      console.warn('⚠️ Failed to initialize skills chart:', error);
    }
    
    // Initialize project gallery
    try {
      this.projectGallery = new ProjectGallery([]);
      console.log('✅ Project gallery initialized');
    } catch (error) {
      console.warn('⚠️ Failed to initialize project gallery:', error);
    }
    
    // Initialize certifications
    try {
      this.certifications = new Certifications([]);
      console.log('✅ Certifications initialized');
    } catch (error) {
      console.warn('⚠️ Failed to initialize certifications:', error);
    }
    
    // Initialize image carousel
    try {
      const carouselContainer = document.getElementById('profile-carousel');
      if (carouselContainer) {
        const profileImages = ['/images/Pixel.png', '/images/PixelSp.png'];
        this.imageCarousel = new ImageCarousel(carouselContainer, profileImages);
        console.log('✅ Image carousel initialized');
      }
    } catch (error) {
      console.warn('⚠️ Failed to initialize image carousel:', error);
    }
    
    // Initialize audio effects
    if (this.config.enableAudio) {
      try {
        this.audioEffects = new AudioEffects();
        this.setupAudioEffects();
        console.log('✅ Audio effects initialized');
      } catch (error) {
        console.warn('⚠️ Failed to initialize audio effects:', error);
      }
    }
    
    console.log('✅ Interactive components initialized');
  }

  private setup3DEffects(): void {
    if (!this.threeDEffects) return;
    
    // Add 3D effects to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
      this.threeDEffects!.addElement(card as HTMLElement);
      this.threeDEffects!.addSubtleHover3D(card as HTMLElement, 1.02, 8);
    });

    // Add floating effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      this.threeDEffects!.addElement(card as HTMLElement);
      this.threeDEffects!.addFloating3D(card as HTMLElement, 6);
    });

    // Add parallax to hero section
    const heroSection = document.querySelector('.dashboard-hero');
    if (heroSection) {
      this.threeDEffects!.addElement(heroSection as HTMLElement);
      this.threeDEffects!.addParallax3D(heroSection as HTMLElement, 15);
    }
  }

  private setupAudioEffects(): void {
    if (!this.audioEffects) return;
    
    // Add audio to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-link');
    interactiveElements.forEach(element => {
      this.audioEffects!.addAudioToElement(element as HTMLElement, 'click');
    });

    // Add hover audio to cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (Math.random() < 0.3) {
          this.audioEffects!.createHoverSound();
        }
      });
    });
  }

  private setupGlobalEventListeners(): void {
    console.log('🔗 Setting up global event listeners...');
    
    // Listen for section changes
    window.addEventListener('sectionChanged', (e: Event) => {
      const customEvent = e as CustomEvent;
      this.onSectionChange(customEvent.detail.sectionId);
    });
    
    // Listen for theme changes
    window.addEventListener('themeChanged', (e: Event) => {
      const customEvent = e as CustomEvent;
      this.onThemeChange(customEvent.detail);
    });
    
    // Listen for language changes
    i18n.addLanguageChangeListener((language: string) => {
      this.onLanguageChange();
    });
    
    // Listen for window resize
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
    
    console.log('✅ Global event listeners setup');
  }

  private async finalizeInitialization(): Promise<void> {
    console.log('🎯 Finalizing initialization...');
    
    // Wait a bit for DOM to be fully ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Initialize UI controller
    console.log('🔧 Initializing UI Controller...');
    this.uiController.init();
    
    // Update all content
    if (this.contentUpdater) {
      this.contentUpdater.refresh();
    }
    
    // Setup advanced animations
    if (this.animationManager) {
      this.setupAdvancedAnimations();
    }
    
    // Remove loading screen
    this.removeLoadingScreen();
    
    console.log('✅ Initialization finalized');
  }

  private setupAdvancedAnimations(): void {
    // Animate dashboard cards with stagger effect
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    if (dashboardCards.length > 0) {
      const container = dashboardCards[0].parentElement;
      if (container) {
        this.animationManager!.animateContentCardsEntrance(container);
      }
    }

    // Animate hero section entrance
    this.animationManager!.animateHeroEntrance();
  }

  private removeLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }

  private onSectionChange(sectionId: string): void {
    console.log(`🔄 Section changed to: ${sectionId}`);
    
    // Update content for the new section
    if (this.contentUpdater) {
      this.contentUpdater.updateSectionContent(`${sectionId}-section`);
    }
    
    // Update skills chart if technical section
    if (sectionId === 'technical' && this.skillsChart) {
      // Pass the Skills object directly - no conversion needed
      this.skillsChart.updateSkills(portfolioConfig.skills);
    }
  }

  private onThemeChange(theme: any): void {
    console.log('🎨 Theme changed to:', theme.name);
    
    // Update chart colors if skills chart exists
    if (this.skillsChart) {
      // Update theme colors instead of recreating the chart
      this.skillsChart.updateThemeColors(
        theme.primary_color,
        theme.secondary_color,
        theme.accent_color
      );
    }

    // Update particles background colors
    if (this.particlesBackground && theme) {
      this.particlesBackground.updateTheme(
        theme.primary_color,
        theme.secondary_color,
        theme.accent_color
      );
    }

    // Play theme change sound
    if (this.audioEffects) {
      this.audioEffects.createThemeChangeSound();
    }
    
    // Refresh UI controller
    if (this.uiController) {
      this.uiController.refresh();
    }
  }

  private onLanguageChange(): void {
    console.log('🌍 Language changed, updating content...');
    
    // Update navigation labels
    if (this.portfolioManager) {
      const navigation = (this.portfolioManager as any).navigation;
      if (navigation && navigation.updateLabels) {
        navigation.updateLabels();
      }
    }
    
    // Update all content
    if (this.contentUpdater) {
      this.contentUpdater.refresh();
    }
    
    // Refresh UI controller
    if (this.uiController) {
      this.uiController.refresh();
    }
  }

  private onWindowResize(): void {
    console.log('📱 Window resized, updating responsive elements...');
    
    // Update skills chart responsiveness
    if (this.skillsChart) {
      this.skillsChart.updateResponsiveness();
    }
    
    // Update particles background
    if (this.particlesBackground) {
      this.particlesBackground.resize();
    }
  }

  /**
   * Get application status
   */
  public getStatus(): {
    isInitialized: boolean;
    components: string[];
    config: AppConfig;
  } {
    const components: string[] = [];
    if (this.portfolioManager) components.push('PortfolioManager');
    if (this.contentUpdater) components.push('ContentUpdater');
    if (this.themeManager) components.push('ThemeManager');
    if (this.animationManager) components.push('AnimationManager');
    if (this.uiController) components.push('UIController');
    if (this.particlesBackground) components.push('ParticlesBackground');
    if (this.threeDEffects) components.push('ThreeDEffects');
    if (this.audioEffects) components.push('AudioEffects');
    if (this.skillsChart) components.push('SkillsChart');
    if (this.projectGallery) components.push('ProjectGallery');
    if (this.certifications) components.push('Certifications');
    if (this.imageCarousel) components.push('ImageCarousel');
    
    return {
      isInitialized: this.isInitialized,
      components,
      config: this.config
    };
  }

  /**
   * Refresh the application
   */
  public async refresh(): Promise<void> {
    console.log('🔄 Refreshing application...');
    
    if (this.contentUpdater) {
      this.contentUpdater.refresh();
    }
    
    if (this.portfolioManager) {
      await this.portfolioManager.refreshAllSections();
    }
    
    if (this.uiController) {
      this.uiController.refresh();
    }
    
    console.log('✅ Application refreshed');
  }

  /**
   * Destroy the application
   */
  public destroy(): void {
    console.log('🗑️ Destroying application...');
    
    if (this.portfolioManager) {
      this.portfolioManager.destroy();
    }
    
    if (this.contentUpdater) {
      this.contentUpdater.destroy();
    }
    
    if (this.uiController) {
      this.uiController.destroy();
    }
    
    if (this.imageCarousel) {
      this.imageCarousel.destroy();
    }
    
    this.isInitialized = false;
    this.initializationPromise = null;
    
    console.log('✅ Application destroyed');
  }
}
