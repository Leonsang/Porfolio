import { PortfolioNavigation } from './layout/PortfolioNavigation';
import { AboutSection } from './sections/AboutSection';
import { OverviewSection } from './sections/OverviewSection';
import { TechnicalSection } from './sections/TechnicalSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';
import { BaseSection } from './sections/BaseSection';
import { AnimationManager } from '../utils/AnimationManager';
import { i18n } from '../i18n/i18n';

export class PortfolioManager {
  private navigation: PortfolioNavigation;
  private sections: Map<string, BaseSection> = new Map();
  private animationManager: AnimationManager;
  private isInitialized: boolean = false;

  constructor(animationManager: AnimationManager) {
    this.animationManager = animationManager;
    this.navigation = new PortfolioNavigation((sectionId: string) => {
      this.onSectionChange(sectionId);
    });
  }

  /**
   * Initialize the portfolio manager
   */
  public async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('⚠️ Portfolio manager already initialized');
      return;
    }

    try {
      console.log('🚀 Initializing Portfolio Manager...');

      // Check if DOM is ready
      if (document.readyState !== 'complete') {
        console.log('⏳ DOM not ready, waiting...');
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true);
          } else {
            window.addEventListener('load', resolve);
          }
        });
      }

      // Initialize navigation first
      console.log('🧭 Initializing navigation...');
      this.navigation.init();

      // Initialize all sections
      console.log('📚 Initializing sections...');
      await this.initializeSections();

      // Setup global event listeners
      console.log('🔗 Setting up event listeners...');
      this.setupGlobalEventListeners();

      this.isInitialized = true;
      console.log('✅ Portfolio Manager initialized successfully');

    } catch (error) {
      console.error('❌ Error initializing Portfolio Manager:', error);
      throw error;
    }
  }

  /**
   * Initialize all sections
   */
  private async initializeSections(): Promise<void> {
    console.log('🔍 Checking for sections in DOM...');
    
    // Check if sections exist in DOM
    const sectionIds = ['about-section', 'overview-section', 'technical-section', 'experience-section', 'projects-section', 'contact-section'];
    
    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        console.log(`✅ Found section: ${sectionId}`);
      } else {
        console.warn(`⚠️ Section not found: ${sectionId}`);
      }
    });

    // Initialize About Section
    try {
      console.log('👤 Initializing About Section...');
      const aboutSection = new AboutSection();
      aboutSection.init();
      this.sections.set('about', aboutSection);
      console.log('✅ About Section initialized');
    } catch (error) {
      console.error('❌ Error initializing About Section:', error);
    }

    // Initialize Overview Section
    try {
      console.log('🏠 Initializing Overview Section...');
      const overviewSection = new OverviewSection();
      overviewSection.init();
      this.sections.set('overview', overviewSection);
      console.log('✅ Overview Section initialized');
    } catch (error) {
      console.error('❌ Error initializing Overview Section:', error);
    }

    // Initialize Technical Section
    try {
      console.log('💻 Initializing Technical Section...');
      const technicalSection = new TechnicalSection();
      technicalSection.init();
      this.sections.set('technical', technicalSection);
      console.log('✅ Technical Section initialized');
    } catch (error) {
      console.error('❌ Error initializing Technical Section:', error);
    }

    // Initialize Experience Section
    try {
      console.log('💼 Initializing Experience Section...');
      const experienceSection = new ExperienceSection();
      experienceSection.init();
      this.sections.set('experience', experienceSection);
      console.log('✅ Experience Section initialized');
    } catch (error) {
      console.error('❌ Error initializing Experience Section:', error);
    }

    // Initialize Projects Section
    try {
      console.log('🚀 Initializing Projects Section...');
      const projectsSection = new ProjectsSection();
      projectsSection.init();
      this.sections.set('projects', projectsSection);
      console.log('✅ Projects Section initialized');
    } catch (error) {
      console.error('❌ Error initializing Projects Section:', error);
    }

    // Initialize Contact Section
    try {
      console.log('📧 Initializing Contact Section...');
      const contactSection = new ContactSection();
      contactSection.init();
      this.sections.set('contact', contactSection);
      console.log('✅ Contact Section initialized');
    } catch (error) {
      console.error('❌ Error initializing Contact Section:', error);
    }

    console.log(`📚 Initialized ${this.sections.size} sections`);
    console.log('📋 Available sections:', Array.from(this.sections.keys()));
  }

  /**
   * Setup global event listeners
   */
  private setupGlobalEventListeners(): void {
    // Listen for language changes
    i18n.addLanguageChangeListener(() => {
      this.onLanguageChange();
    });

    // Listen for window resize
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });

    // Listen for visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      this.onVisibilityChange();
    });
  }

  /**
   * Handle section change
   */
  private async onSectionChange(sectionId: string): Promise<void> {
    console.log(`🔄 Section changed to: ${sectionId}`);

    // Get current and target sections
    const currentSectionElement = this.getCurrentActiveSectionElement();
    const targetSectionElement = document.getElementById(`${sectionId}-section`);

    if (targetSectionElement) {
      // Use animation manager for smooth transitions
      await this.animationManager.animateSectionTransition(
        currentSectionElement,
        targetSectionElement,
        this.getTransitionDirection(sectionId)
      );

      // DESPUÉS de que la animación termine, actualizar los estados
      if (currentSectionElement) {
        // Quitar la clase active de la sección anterior
        currentSectionElement.classList.remove('active');
        const previousSection = this.sections.get(this.navigation.getActiveSection());
        if (previousSection) {
          previousSection.hide();
        }
      }

      // Mostrar la nueva sección
      const selectedSection = this.sections.get(sectionId);
      if (selectedSection) {
        selectedSection.show();
        
        // Animate content cards entrance
        setTimeout(() => {
          this.animationManager.animateContentCardsEntrance(targetSectionElement);
        }, 100);
      }

      // Update URL hash (optional)
      this.updateURLHash(sectionId);

      // Trigger analytics or tracking (optional)
      this.trackSectionView(sectionId);
    }
  }

  /**
   * Handle language change
   */
  private onLanguageChange(): void {
    console.log('🌍 Language changed, updating all sections...');

    // Update navigation labels
    this.navigation.updateLabels();

    // Update all sections content
    this.sections.forEach(section => {
      if (section.isActive()) {
        // Force re-render of active section
        section.show();
      }
    });
  }

  /**
   * Handle window resize
   */
  private onWindowResize(): void {
    console.log('📱 Window resized, updating responsive elements...');

    // Update any responsive elements in sections
    this.sections.forEach(section => {
      if (section.isActive()) {
        // Could call a resize method on sections if needed
      }
    });
  }

  /**
   * Handle visibility change
   */
  private onVisibilityChange(): void {
    if (document.hidden) {
      console.log('👁️ Tab hidden, pausing animations...');
      // Pause any running animations
    } else {
      console.log('👁️ Tab visible, resuming animations...');
      // Resume animations
    }
  }

  /**
   * Update URL hash
   */
  private updateURLHash(sectionId: string): void {
    const newHash = `#${sectionId}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }

  /**
   * Track section view
   */
  private trackSectionView(sectionId: string): void {
    // This could integrate with Google Analytics, Mixpanel, etc.
    console.log(`📊 Tracking view of section: ${sectionId}`);
    
    // Example: gtag('event', 'section_view', { section: sectionId });
  }

  /**
   * Get current active section element
   */
  private getCurrentActiveSectionElement(): HTMLElement | null {
    const activeSection = this.navigation.getActiveSection();
    if (activeSection) {
      return document.getElementById(`${activeSection}-section`);
    }
    return null;
  }

  /**
   * Determine transition direction based on section order
   */
  private getTransitionDirection(targetSectionId: string): 'forward' | 'backward' {
    const sectionOrder = ['about', 'overview', 'technical', 'experience', 'projects', 'contact'];
    const currentIndex = sectionOrder.indexOf(this.navigation.getActiveSection());
    const targetIndex = sectionOrder.indexOf(targetSectionId);
    
    return targetIndex > currentIndex ? 'forward' : 'backward';
  }

  /**
   * Get section by ID
   */
  public getSection(sectionId: string): BaseSection | undefined {
    return this.sections.get(sectionId);
  }

  /**
   * Get all sections
   */
  public getAllSections(): Map<string, BaseSection> {
    return this.sections;
  }

  /**
   * Get current active section
   */
  public getActiveSection(): string {
    return this.navigation.getActiveSection();
  }

  /**
   * Switch to a specific section
   */
  public switchToSection(sectionId: string): void {
    this.navigation.switchToSection(sectionId);
  }

  /**
   * Refresh all sections data
   */
  public async refreshAllSections(): Promise<void> {
    console.log('🔄 Refreshing all sections...');

    const refreshPromises = Array.from(this.sections.values()).map(async (section) => {
      try {
        // Check if section has a refresh method
        if ('refreshData' in section && typeof (section as any).refreshData === 'function') {
          await (section as any).refreshData();
        }
      } catch (error) {
        console.warn(`⚠️ Error refreshing section:`, error);
      }
    });

    await Promise.all(refreshPromises);
    console.log('✅ All sections refreshed');
  }

  /**
   * Get portfolio statistics
   */
  public getPortfolioStats(): {
    totalSections: number;
    activeSection: string;
    sectionsWithData: string[];
  } {
    const sectionsWithData: string[] = [];
    
    this.sections.forEach((section, id) => {
      if (section.isActive()) {
        sectionsWithData.push(id);
      }
    });

    return {
      totalSections: this.sections.size,
      activeSection: this.getActiveSection(),
      sectionsWithData
    };
  }

  /**
   * Destroy portfolio manager
   */
  public destroy(): void {
    console.log('🗑️ Destroying Portfolio Manager...');

    // Destroy all sections
    this.sections.forEach(section => {
      section.destroy();
    });

    // Destroy navigation
    this.navigation.destroy();

    // Clear sections map
    this.sections.clear();

    // Remove global event listeners
    window.removeEventListener('resize', () => {});
    document.removeEventListener('visibilitychange', () => {});

    this.isInitialized = false;
    console.log('✅ Portfolio Manager destroyed');
  }
}
