export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  threshold?: number;
}

export class AnimationManager {
  private isEnabled: boolean = true;
  private animationDuration: number = 600;
  private easingFunction: string = 'cubic-bezier(0.4, 0, 0.2, 1)';
  private isInitialized: boolean = false;

  constructor() {
    this.isEnabled = localStorage.getItem('portfolio-animations') !== 'false';
  }

  /**
   * Initialize the animation manager
   */
  public init(): void {
    if (this.isInitialized) return;
    
    this.setupGlobalEventListeners();
    this.isInitialized = true;
    console.log('🎬 AnimationManager initialized');
  }

  /**
   * Setup global event listeners
   */
  private setupGlobalEventListeners(): void {
    // Listen for animation toggle events
    window.addEventListener('animationsToggled', ((e: CustomEvent) => {
      this.isEnabled = e.detail.enabled;
      localStorage.setItem('portfolio-animations', this.isEnabled.toString());
      console.log(`🎬 Animations ${this.isEnabled ? 'enabled' : 'disabled'}`);
    }) as EventListener);
  }

  /**
   * Animate section transition
   */
  public animateSectionTransition(
    fromSection: HTMLElement | null,
    toSection: HTMLElement | null,
    direction: 'forward' | 'backward' = 'forward'
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isEnabled || !toSection) {
        resolve();
        return;
      }

      const duration = this.animationDuration;
      const easing = this.easingFunction;

      // Prepare sections for animation
      this.prepareSectionForAnimation(toSection, direction);
      
      // Animate out current section (if exists)
      if (fromSection) {
        this.animateSectionOut(fromSection, direction);
      }

      // Animate in new section
      this.animateSectionIn(toSection, direction, duration, easing);

      // Resolve after animation completes
      setTimeout(resolve, duration);
    });
  }

  /**
   * Prepare section for animation
   */
  private prepareSectionForAnimation(section: HTMLElement, direction: 'forward' | 'backward'): void {
    // NO cambiar display - solo usar CSS classes
    section.classList.add('active');
    section.style.opacity = '0';
    section.style.transform = this.getInitialTransform(direction);
    section.style.transition = 'none';
    
    // Force reflow
    section.offsetHeight;
  }

  /**
   * Get initial transform based on direction
   */
  private getInitialTransform(direction: 'forward' | 'backward'): string {
    const distance = '50px';
    
    switch (direction) {
      case 'forward':
        return `translateX(${distance})`;
      case 'backward':
        return `translateX(-${distance})`;
      default:
        return `translateY(${distance})`;
    }
  }

  /**
   * Animate section out
   */
  private animateSectionOut(section: HTMLElement, direction: 'forward' | 'backward'): void {
    const outTransform = direction === 'forward' ? 'translateX(-50px)' : 'translateX(50px)';
    
    section.style.transition = `all ${this.animationDuration}ms ${this.easingFunction}`;
    section.style.opacity = '0';
    section.style.transform = outTransform;
    
    // NO quitar la clase active aquí - eso lo hace el PortfolioManager
    
    // Limpiar estilos después de la animación
    setTimeout(() => {
      this.cleanupSectionStyles(section);
    }, this.animationDuration);
  }

  /**
   * Animate section in
   */
  private animateSectionIn(
    section: HTMLElement,
    direction: 'forward' | 'backward',
    duration: number,
    easing: string
  ): void {
    section.style.transition = `all ${duration}ms ${easing}`;
    
    // Force reflow
    section.offsetHeight;
    
    // Animate to final state
    section.style.opacity = '1';
    section.style.transform = 'translateX(0) translateY(0)';
    
    // Limpiar estilos inline después de la animación
    setTimeout(() => {
      this.cleanupSectionStyles(section);
    }, duration);
  }

  /**
   * Cleanup section styles after animation
   */
  private cleanupSectionStyles(section: HTMLElement): void {
    // Solo limpiar estilos que agregamos, no tocar display o clases
    section.style.opacity = '';
    section.style.transform = '';
    section.style.transition = '';
  }

  /**
   * Animate navigation tab activation
   */
  public animateTabActivation(activeTab: HTMLElement, previousTab?: HTMLElement): void {
    if (!this.isEnabled) return;

    // Remove active class from previous tab
    if (previousTab) {
      previousTab.classList.remove('active');
      this.animateTabDeactivation(previousTab);
    }

    // Animate active tab
    activeTab.classList.add('active');
    this.animateTabActivationInternal(activeTab);
  }

  /**
   * Animate tab activation (internal method)
   */
  private animateTabActivationInternal(tab: HTMLElement): void {
    // Add entrance animation
    tab.style.animation = 'tabActivate 0.3s ease-out forwards';
    
    // Remove animation after completion
    setTimeout(() => {
      tab.style.animation = '';
    }, 300);
  }

  /**
   * Animate tab deactivation
   */
  private animateTabDeactivation(tab: HTMLElement): void {
    tab.style.animation = 'tabDeactivate 0.2s ease-out forwards';
    
    setTimeout(() => {
      tab.style.animation = '';
    }, 200);
  }

  /**
   * Animate control button interactions
   */
  public animateControlButton(button: HTMLElement, type: 'click' | 'hover' | 'focus'): void {
    if (!this.isEnabled) return;

    const animations = {
      click: 'controlClick 0.15s ease-out',
      hover: 'controlHover 0.2s ease-out',
      focus: 'controlFocus 0.2s ease-out'
    };

    button.style.animation = animations[type];
      
      setTimeout(() => {
      button.style.animation = '';
    }, type === 'click' ? 150 : 200);
  }

  /**
   * Animate modal entrance
   */
  public animateModalEntrance(modal: HTMLElement): void {
    if (!this.isEnabled) return;

    const modalContent = modal.querySelector('.modal') as HTMLElement;
    if (!modalContent) return;

    modal.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8) translateY(-20px)';
    
    // Force reflow
    modal.offsetHeight;
    
    modal.style.transition = 'opacity 0.3s ease-out';
    modalContent.style.transition = 'transform 0.3s ease-out';
    
    modal.style.opacity = '1';
    modalContent.style.transform = 'scale(1) translateY(0)';
  }

  /**
   * Animate modal exit
   */
  public animateModalExit(modal: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isEnabled) {
        resolve();
        return;
      }

      const modalContent = modal.querySelector('.modal') as HTMLElement;
      if (!modalContent) {
        resolve();
        return;
      }

      modal.style.transition = 'opacity 0.2s ease-in';
      modalContent.style.transition = 'transform 0.2s ease-in';
      
      modal.style.opacity = '0';
      modalContent.style.transform = 'scale(0.8) translateY(-20px)';
      
    setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  /**
   * Animate content cards entrance
   */
  public animateContentCardsEntrance(container: HTMLElement): void {
    if (!this.isEnabled) return;

    const cards = container.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        cardElement.style.transition = `all 0.6s ${this.easingFunction}`;
        cardElement.style.opacity = '1';
        cardElement.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  /**
   * Animate hero section entrance
   */
  public animateHeroEntrance(): void {
    if (!this.isEnabled) return;

    const heroTitle = document.querySelector('.hero-title') as HTMLElement;
    const heroSubtitle = document.querySelector('.hero-subtitle') as HTMLElement;
    const heroDescription = document.querySelector('.hero-description') as HTMLElement;
    const heroStats = document.querySelector('.hero-stats') as HTMLElement;

    if (heroTitle) {
      heroTitle.style.animation = 'heroTitleEntrance 1s ease-out 0.2s both';
    }
    
    if (heroSubtitle) {
      heroSubtitle.style.animation = 'heroSubtitleEntrance 1s ease-out 0.4s both';
    }
    
    if (heroDescription) {
      heroDescription.style.animation = 'heroDescriptionEntrance 1s ease-out 0.6s both';
    }
    
    if (heroStats) {
      heroStats.style.animation = 'heroStatsEntrance 1s ease-out 0.8s both';
    }
  }

  /**
   * Toggle animations
   */
  public toggleAnimations(enabled: boolean): void {
    this.isEnabled = enabled;
    localStorage.setItem('portfolio-animations', enabled.toString());
  }

  /**
   * Check if animations are enabled
   */
  public areAnimationsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Get animation duration
   */
  public getAnimationDuration(): number {
    return this.animationDuration;
  }

  /**
   * Set animation duration
   */
  public setAnimationDuration(duration: number): void {
    this.animationDuration = duration;
  }

  /**
   * Destroy animation manager
   */
  public destroy(): void {
    this.isInitialized = false;
  }
}
