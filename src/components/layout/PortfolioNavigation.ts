import { i18n } from '../../i18n/i18n';

export interface NavigationItem {
  id: string;
  icon: string;
  labelKey: string;
  sectionId: string;
}

export class PortfolioNavigation {
  private navigationElement: HTMLElement | null = null;
  private activeSection: string = 'about';
  private sections: Map<string, HTMLElement> = new Map();
  private onSectionChange?: (sectionId: string) => void;
  private isInitialized: boolean = false;

  private readonly navigationItems: NavigationItem[] = [
    { id: 'about', icon: 'fas fa-user', labelKey: 'nav.about', sectionId: 'about-section' },
    { id: 'overview', icon: 'fas fa-home', labelKey: 'nav.overview', sectionId: 'overview-section' },
    { id: 'technical', icon: 'fas fa-code', labelKey: 'nav.technical', sectionId: 'technical-section' },
    { id: 'experience', icon: 'fas fa-briefcase', labelKey: 'nav.experience', sectionId: 'experience-section' },
    { id: 'projects', icon: 'fas fa-rocket', labelKey: 'nav.projects', sectionId: 'projects-section' },
    { id: 'contact', icon: 'fas fa-envelope', labelKey: 'nav.contact', sectionId: 'contact-section' }
  ];

  constructor(onSectionChange?: (sectionId: string) => void) {
    this.onSectionChange = onSectionChange;
  }

  /**
   * Initialize the navigation
   */
  public init(): void {
    if (this.isInitialized) {
      console.warn('⚠️ Portfolio navigation already initialized');
      return;
    }

    this.navigationElement = document.querySelector('.portfolio-navigation');
    if (!this.navigationElement) {
      console.error('❌ Portfolio navigation element not found');
      return;
    }

    this.initializeSections();
    this.render();
    this.setupEventListeners();
    this.isInitialized = true;
    console.log('✅ Portfolio navigation initialized');
  }

  /**
   * Initialize all sections
   */
  private initializeSections(): void {
    console.log('🔍 Initializing portfolio sections...');
    
    this.navigationItems.forEach(item => {
      const sectionElement = document.getElementById(item.sectionId);
      if (sectionElement) {
        this.sections.set(item.id, sectionElement);
        console.log(`✅ Found section: ${item.sectionId}`);
      } else {
        console.warn(`⚠️ Section not found: ${item.sectionId}`);
      }
    });

    console.log(`📚 Total sections found: ${this.sections.size}`);
  }

  /**
   * Render the navigation
   */
  private render(): void {
    if (!this.navigationElement) return;

    const navTabs = this.navigationElement.querySelector('.nav-tabs');
    if (!navTabs) return;

    // Clear existing tabs
    navTabs.innerHTML = '';

    // Create navigation tabs
    this.navigationItems.forEach(item => {
      const tab = this.createNavigationTab(item);
      navTabs.appendChild(tab);
    });

    // Set initial active state
    this.setActiveSection(this.activeSection);
  }

  /**
   * Create a navigation tab
   */
  private createNavigationTab(item: NavigationItem): HTMLElement {
    const tab = document.createElement('button');
    tab.className = 'nav-tab';
    tab.setAttribute('data-section', item.id);
    
    if (item.id === this.activeSection) {
      tab.classList.add('active');
    }

    tab.innerHTML = `
      <i class="${item.icon}"></i>
      <span data-i18n="${item.labelKey}">${i18n.t(item.labelKey)}</span>
    `;

    return tab;
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    if (!this.navigationElement) return;

    const navTabs = this.navigationElement.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const sectionId = target.getAttribute('data-section');
        
        if (sectionId) {
          console.log(`🖱️ Clicked on nav tab: ${sectionId}`);
          this.switchToSection(sectionId);
        }
      });
    });

    // Add keyboard navigation support
    this.setupKeyboardNavigation();
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.switchToSection('about');
            break;
          case '2':
            e.preventDefault();
            this.switchToSection('overview');
            break;
          case '3':
            e.preventDefault();
            this.switchToSection('technical');
            break;
          case '4':
            e.preventDefault();
            this.switchToSection('experience');
            break;
          case '5':
            e.preventDefault();
            this.switchToSection('projects');
            break;
          case '6':
            e.preventDefault();
            this.switchToSection('contact');
            break;
        }
      }
    });
  }

  /**
   * Switch to a specific section
   */
  public switchToSection(sectionId: string): void {
    if (sectionId === this.activeSection) return;

    console.log(`🔄 Switching from ${this.activeSection} to ${sectionId}`);

    // Hide current section
    const currentSection = this.sections.get(this.activeSection);
    if (currentSection) {
      currentSection.classList.remove('active');
    }

    // Show new section
    const newSection = this.sections.get(sectionId);
    if (newSection) {
      newSection.classList.add('active');
    }

    // Update navigation state
    this.setActiveSection(sectionId);

    // Call callback if provided
    if (this.onSectionChange) {
      this.onSectionChange(sectionId);
    }

    // Add smooth transition effect
    this.animateSectionChange(newSection);

    // Update URL hash
    this.updateURLHash(sectionId);

    // Dispatch custom event
    this.dispatchSectionChangeEvent(sectionId);
  }

  /**
   * Set active section
   */
  private setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;

    // Update navigation tabs
    const navTabs = this.navigationElement?.querySelectorAll('.nav-tab');
    navTabs?.forEach(tab => {
      const tabSectionId = tab.getAttribute('data-section');
      if (tabSectionId === sectionId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  /**
   * Animate section change
   */
  private animateSectionChange(sectionElement: HTMLElement | undefined): void {
    if (!sectionElement) return;

    sectionElement.style.opacity = '0';
    sectionElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      if (sectionElement) {
        sectionElement.style.opacity = '1';
        sectionElement.style.transform = 'translateY(0)';
      }
    }, 100);
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
   * Dispatch section change event
   */
  private dispatchSectionChangeEvent(sectionId: string): void {
    window.dispatchEvent(new CustomEvent('sectionChanged', {
      detail: {
        sectionId,
        previousSection: this.activeSection,
        timestamp: Date.now()
      }
    }));
  }

  /**
   * Get current active section
   */
  public getActiveSection(): string {
    return this.activeSection;
  }

  /**
   * Get all sections
   */
  public getSections(): Map<string, HTMLElement> {
    return this.sections;
  }

  /**
   * Get section by ID
   */
  public getSection(sectionId: string): HTMLElement | undefined {
    return this.sections.get(sectionId);
  }

  /**
   * Check if section exists
   */
  public hasSection(sectionId: string): boolean {
    return this.sections.has(sectionId);
  }

  /**
   * Update navigation labels (for i18n)
   */
  public updateLabels(): void {
    const navTabs = this.navigationElement?.querySelectorAll('.nav-tab');
    navTabs?.forEach(tab => {
      const span = tab.querySelector('span[data-i18n]');
      if (span) {
        const key = span.getAttribute('data-i18n');
        if (key) {
          span.textContent = i18n.t(key);
        }
      }
    });
  }

  /**
   * Refresh navigation state
   */
  public refresh(): void {
    this.initializeSections();
    this.render();
    this.setActiveSection(this.activeSection);
  }

  /**
   * Destroy navigation
   */
  public destroy(): void {
    // Remove event listeners
    const navTabs = this.navigationElement?.querySelectorAll('.nav-tab');
    navTabs?.forEach(tab => {
      tab.removeEventListener('click', () => {});
    });

    this.navigationElement = null;
    this.sections.clear();
    this.isInitialized = false;
  }
}
