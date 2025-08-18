import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';
import { RetroChatDog } from '../retro/RetroChatDog';

export class HomeSection extends BaseSection {
  private heroBanner: HTMLElement | null = null;
  private aboutContent: HTMLElement | null = null;
  private overviewContent: HTMLElement | null = null;

  constructor() {
    super('home-section');
  }

  protected setupEventListeners(): void {
    // Setup any home-specific event listeners here
    this.setupHeroInteractions();
    this.setupAboutInteractions();
    this.setupOverviewInteractions();
  }

  protected render(): void {
    if (!this.sectionElement) return;

    // Update i18n content
    this.updateContent();
    
    // Setup animations and interactions
    this.setupAnimations();
  }

  /**
   * Update content with current language
   */
  private updateContent(): void {
    if (!this.sectionElement) return;

    // Update hero banner content
    this.updateHeroContent();
    
    // Update about content
    this.updateAboutContent();
    
    // Update overview content
    this.updateOverviewContent();
  }

  /**
   * Update hero banner content
   */
  private updateHeroContent(): void {
    if (!this.sectionElement) return;

    const heroTitle = this.sectionElement.querySelector('[data-i18n="hero.title"]');
    const heroSubtitle = this.sectionElement.querySelector('[data-i18n="hero.subtitle"]');
    const heroDescription = this.sectionElement.querySelector('[data-i18n="hero.description"]');
    
    if (heroTitle) {
      const key = heroTitle.getAttribute('data-i18n');
      if (key) heroTitle.textContent = i18n.t(key);
    }
    
    if (heroSubtitle) {
      const key = heroSubtitle.getAttribute('data-i18n');
      if (key) heroSubtitle.textContent = i18n.t(key);
    }
    
    if (heroDescription) {
      const key = heroDescription.getAttribute('data-i18n');
      if (key) heroDescription.textContent = i18n.t(key);
    }

    // Update stats
    const statLabels = this.sectionElement.querySelectorAll('[data-i18n^="stats."]');
    statLabels.forEach(label => {
      const key = label.getAttribute('data-i18n');
      if (key) label.textContent = i18n.t(key);
    });
  }

  /**
   * Update about content
   */
  private updateAboutContent(): void {
    if (!this.sectionElement) return;

    const aboutTitle = this.sectionElement.querySelector('[data-i18n="about.title"]');
    const aboutSubtitle = this.sectionElement.querySelector('[data-i18n="about.subtitle"]');
    
    if (aboutTitle) {
      const key = aboutTitle.getAttribute('data-i18n');
      if (key) aboutTitle.textContent = i18n.t(key);
    }
    
    if (aboutSubtitle) {
      const key = aboutSubtitle.getAttribute('data-i18n');
      if (key) aboutSubtitle.textContent = i18n.t(key);
    }

    // Update personal information
    const personalElements = this.sectionElement.querySelectorAll('[data-i18n^="about.personal."]');
    personalElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });

    // Update summary information
    const summaryElements = this.sectionElement.querySelectorAll('[data-i18n^="about.summary."]');
    summaryElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });

    // Update descriptions
    const descriptionElements = this.sectionElement.querySelectorAll('[data-i18n^="about.description"]');
    descriptionElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });
  }

  /**
   * Update overview content
   */
  private updateOverviewContent(): void {
    if (!this.sectionElement) return;

    const overviewTitle = this.sectionElement.querySelector('[data-i18n="overview.title"]');
    const overviewSubtitle = this.sectionElement.querySelector('[data-i18n="overview.subtitle"]');
    
    if (overviewTitle) {
      const key = overviewTitle.getAttribute('data-i18n');
      if (key) overviewTitle.textContent = i18n.t(key);
    }
    
    if (overviewSubtitle) {
      const key = overviewSubtitle.getAttribute('data-i18n');
      if (key) overviewSubtitle.textContent = i18n.t(key);
    }
  }

  /**
   * Setup hero banner interactions
   */
  private setupHeroInteractions(): void {
    // Add any hero-specific interactions here
    this.setupHeroAnimations();
  }

  /**
   * Setup about section interactions
   */
  private setupAboutInteractions(): void {
    // Add any about-specific interactions here
    this.setupAboutAnimations();
  }

  /**
   * Setup overview section interactions
   */
  private setupOverviewInteractions(): void {
    // Add any overview-specific interactions here
    this.setupOverviewAnimations();
  }

  /**
   * Setup hero animations
   */
  private setupHeroAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations for hero elements
    const heroElements = this.sectionElement.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats');
    heroElements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      (element as HTMLElement).classList.add('animate-entrance');
    });
  }

  /**
   * Setup about animations
   */
  private setupAboutAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations for about elements
    const aboutElements = this.sectionElement.querySelectorAll('.about-grid .dashboard-card');
    aboutElements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      (element as HTMLElement).classList.add('animate-entrance');
    });
  }

  /**
   * Setup overview animations
   */
  private setupOverviewAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations for overview elements
    const overviewElements = this.sectionElement.querySelectorAll('.overview-grid .dashboard-card');
    overviewElements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      (element as HTMLElement).classList.add('animate-entrance');
    });
  }

  /**
   * Setup general animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add any additional animations here
    this.setupScrollAnimations();
  }

  /**
   * Setup scroll-based animations
   */
  private setupScrollAnimations(): void {
    if (!this.sectionElement) return;

    // Add scroll-triggered animations for cards
    const cards = this.sectionElement.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
      card.classList.add('animate-on-scroll');
    });
  }

  /**
   * Called when section is shown
   */
  protected onShow(): void {
    super.onShow();
    
    // Trigger entrance animations when section is shown
    this.triggerEntranceAnimations();

    // Initialize retro dog chat when home shows
    try {
      const chatDog = new RetroChatDog(() => i18n.getCurrentLanguage() as 'en' | 'es');
      chatDog.init();
    } catch (e) {
      console.warn('RetroChatDog init skipped:', e);
    }
  }

  /**
   * Called when section is hidden
   */
  protected onHide(): void {
    super.onHide();
    
    // Reset animations when section is hidden
    this.resetAnimations();
  }

  /**
   * Trigger entrance animations
   */
  private triggerEntranceAnimations(): void {
    if (!this.sectionElement) return;

    // Trigger entrance animations for all elements
    const animatedElements = this.sectionElement.querySelectorAll('.animate-entrance');
    animatedElements.forEach(element => {
      (element as HTMLElement).classList.add('animate-in');
    });
  }

  /**
   * Reset animations
   */
  private resetAnimations(): void {
    if (!this.sectionElement) return;

    // Reset all animations
    const animatedElements = this.sectionElement.querySelectorAll('.animate-entrance, .animate-in');
    animatedElements.forEach(element => {
      (element as HTMLElement).classList.remove('animate-in');
    });
  }

  /**
   * Cleanup resources
   */
  protected cleanup(): void {
    // Cleanup any home-specific resources here
    this.heroBanner = null;
    this.aboutContent = null;
    this.overviewContent = null;
  }
}
