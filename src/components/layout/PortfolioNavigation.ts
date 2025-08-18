import { i18n } from '../../i18n/i18n';

export interface NavigationItem {
  id: string;
  icon: string;
  labelKey: string;
  sectionId: string;
}

export class PortfolioNavigation {
  private navigationElement: HTMLElement | null = null;
  private activeSection: string = 'home';
  private sections: Map<string, HTMLElement> = new Map();
  private onSectionChange?: (sectionId: string) => void;
  private isInitialized: boolean = false;

  private readonly navigationItems: NavigationItem[] = [
    { id: 'home', icon: 'fas fa-home', labelKey: 'nav.home', sectionId: 'home-section' },
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
    console.log('🚀 Initializing Portfolio Navigation...');
    
    if (this.isInitialized) {
      console.warn('⚠️ Portfolio navigation already initialized');
      return;
    }

    // Prefer horizontal navigation below header, fallback to floating (legacy)
    this.navigationElement = document.querySelector('.portfolio-navigation') ||
                             document.querySelector('.portfolio-navigation-floating');
    
    console.log('🔍 Navigation element found:', this.navigationElement);
    
    if (!this.navigationElement) {
      console.error('❌ Portfolio navigation element not found');
      return;
    }

    // Ensure ARIA role on container
    const navTabs = this.navigationElement.querySelector('.nav-tabs');
    if (navTabs) {
      (navTabs as HTMLElement).setAttribute('role', 'tablist');
      (navTabs as HTMLElement).setAttribute('aria-label', 'Portfolio sections');
    }

    console.log('🔧 Setting up navigation components...');
    this.initializeSections();
    // Detect initial active section from DOM (fallback to 'home') and normalize state
    this.detectInitialActiveSection();
    this.render();
    this.setupEventListeners();
    this.isInitialized = true;
    console.log('✅ Portfolio navigation initialized successfully');
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
        // Set ARIA role on sections as tabpanels
        sectionElement.setAttribute('role', 'tabpanel');
        sectionElement.setAttribute('aria-labelledby', `tab-${item.id}`);
        sectionElement.setAttribute('tabindex', '0');
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
    this.navigationItems.forEach((item, index) => {
      const tab = this.createNavigationTab(item, index === 0);
      navTabs.appendChild(tab);
    });

    // Ensure only one visible section is active in the DOM
    this.enforceSingleActiveSection(this.activeSection);

    // Set initial active state
    this.setActiveSection(this.activeSection);
  }

  /**
   * Create a navigation tab
   */
  private createNavigationTab(item: NavigationItem, isFirst: boolean): HTMLElement {
    const tab = document.createElement('button');
    tab.className = 'nav-tab';
    tab.id = `tab-${item.id}`;
    tab.setAttribute('data-section', item.id);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', item.sectionId);
    tab.setAttribute('tabindex', isFirst ? '0' : '-1');
    
    if (item.id === this.activeSection) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    } else {
      tab.setAttribute('aria-selected', 'false');
    }

    tab.innerHTML = `
      <i class="${item.icon}" aria-hidden="true"></i>
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
          (target as HTMLElement).focus();
        }
      });

      // Keyboard interaction per tab (Enter/Space)
      tab.addEventListener('keydown', (e: Event) => {
        const keyboardEvent = e as KeyboardEvent;
        const target = e.currentTarget as HTMLElement;
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          e.preventDefault();
          const sectionId = target.getAttribute('data-section');
          if (sectionId) this.switchToSection(sectionId);
        }
      });
    });

    // Add keyboard navigation support
    this.setupKeyboardNavigation();

    // Setup toggle button functionality (only if floating nav is present)
    if (document.querySelector('.portfolio-navigation-floating') && document.getElementById('nav-toggle')) {
      this.setupToggleButton();
    }
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    const handleAltShortcuts = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.switchToSection('home');
            break;
          case '2':
            e.preventDefault();
            this.switchToSection('technical');
            break;
          case '3':
            e.preventDefault();
            this.switchToSection('experience');
            break;
          case '4':
            e.preventDefault();
            this.switchToSection('projects');
            break;
          case '5':
            e.preventDefault();
            this.switchToSection('contact');
            break;
        }
      }
    };

    const handleArrowNavigation = (e: KeyboardEvent) => {
      const navTabsContainer = this.navigationElement?.querySelector('.nav-tabs');
      if (!navTabsContainer) return;
      const tabs = Array.from(navTabsContainer.querySelectorAll('.nav-tab')) as HTMLElement[];
      if (tabs.length === 0) return;

      const currentIndex = tabs.findIndex(t => t.classList.contains('active'));
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        tabs[nextIndex].focus();
        const sectionId = tabs[nextIndex].getAttribute('data-section');
        if (sectionId) this.switchToSection(sectionId);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[prevIndex].focus();
        const sectionId = tabs[prevIndex].getAttribute('data-section');
        if (sectionId) this.switchToSection(sectionId);
      }
    };

    document.addEventListener('keydown', handleAltShortcuts);
    document.addEventListener('keydown', handleArrowNavigation);
  }

  /**
   * Setup toggle button for floating navigation
   */
  private setupToggleButton(): void {
    console.log('🔧 Setting up toggle button...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navFloating = document.querySelector('.portfolio-navigation-floating');
    
    console.log('🔍 Nav toggle element:', navToggle);
    console.log('🔍 Nav floating element:', navFloating);
    
    if (navToggle && navFloating) {
      console.log('✅ Both elements found, adding event listener');
      
      navToggle.addEventListener('click', (event) => {
        console.log('🖱️ Toggle button clicked!');
        event.preventDefault();
        event.stopPropagation();
        
        navFloating.classList.toggle('expanded');
        navToggle.classList.toggle('active');
        
        console.log('🔄 Navbar expanded:', navFloating.classList.contains('expanded'));
        console.log('🔄 Toggle active:', navToggle.classList.contains('active'));
        
        // Update ARIA expanded state
        (navToggle as HTMLElement).setAttribute('aria-expanded', navFloating.classList.contains('expanded') ? 'true' : 'false');

        // Change icon
        const icon = navToggle.querySelector('i');
        if (icon) {
          if (navFloating.classList.contains('expanded')) {
            icon.className = 'fas fa-times';
            console.log('🔄 Icon changed to: fa-times');
          } else {
            icon.className = 'fas fa-bars';
            console.log('🔄 Icon changed to: fa-bars');
          }
        }
      });
      
      console.log('✅ Event listener added successfully');
    } else {
      console.error('❌ Toggle button or floating nav not found');
      if (!navToggle) console.error('❌ nav-toggle button not found');
      if (!navFloating) console.error('❌ portfolio-navigation-floating not found');
    }
  }

  /**
   * Switch to a specific section
   */
  public switchToSection(sectionId: string): void {
    if (sectionId === this.activeSection) return;

    console.log(`🔄 Switching from ${this.activeSection} to ${sectionId}`);

    // Ensure only one active section at any time
    this.enforceSingleActiveSection(this.activeSection);

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
    navTabs?.forEach((tab, idx) => {
      const tabSectionId = tab.getAttribute('data-section');
      const isActive = tabSectionId === sectionId;
      tab.classList.toggle('active', isActive);
      (tab as HTMLElement).setAttribute('aria-selected', isActive ? 'true' : 'false');
      (tab as HTMLElement).setAttribute('tabindex', isActive || idx === 0 ? '0' : '-1');
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
   * Detect initial active section from DOM and normalize
   */
  private detectInitialActiveSection(): void {
    // Find any section element with class 'active'
    let detected: string | null = null;
    this.navigationItems.forEach(item => {
      const el = document.getElementById(item.sectionId);
      if (el?.classList.contains('active')) {
        detected = item.id;
      }
    });
    this.activeSection = detected || 'home';
    this.enforceSingleActiveSection(this.activeSection);
  }

  /**
   * Ensure only one section has 'active' at a time
   */
  private enforceSingleActiveSection(keepActiveId: string): void {
    this.sections.forEach((el, id) => {
      if (id === keepActiveId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
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
