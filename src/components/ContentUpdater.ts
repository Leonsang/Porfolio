import { i18n } from '../i18n/i18n';

export class ContentUpdater {
  private elements: Map<string, HTMLElement> = new Map();
  private currentLanguage: string = 'en';
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (this.isInitialized) {
      console.warn('⚠️ ContentUpdater already initialized');
      return;
    }

    // Register language change listener
    i18n.addLanguageChangeListener((language: string) => {
      this.currentLanguage = language;
      this.updateAllContent();
    });

    // Initial content update
    this.updateAllContent();
    this.isInitialized = true;
    console.log('✅ ContentUpdater initialized');
  }

  public registerElement(key: string, element: HTMLElement): void {
    this.elements.set(key, element);
    this.updateElement(key);
  }

  public updateElement(key: string): void {
    const element = this.elements.get(key);
    if (!element) return;

    const translation = i18n.t(key);
    if (translation && translation !== key) {
      // Handle different types of content updates
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement | HTMLTextAreaElement).placeholder = translation;
      } else if (element.tagName === 'IMG') {
        (element as HTMLImageElement).alt = translation;
      } else {
        element.textContent = translation;
      }
    }
  }

  private updateAllContent(): void {
    console.log('🔄 Updating all content...');
    
    // Update all registered elements
    this.elements.forEach((element, key) => {
      this.updateElement(key);
    });

    // Update dynamic content that might not be registered
    this.updateDataI18nElements();
    this.updateNavigation();
    this.updateSectionHeaders();
    this.updateForms();
    
    console.log('✅ All content updated');
  }

  private updateDataI18nElements(): void {
    console.log('🔄 Updating data-i18n elements...');
    
    // Update all elements with data-i18n attribute
    const dataI18nElements = document.querySelectorAll('[data-i18n]');
    console.log(`📝 Found ${dataI18nElements.length} elements with data-i18n`);
    
    dataI18nElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          element.textContent = translation;
        }
      }
    });

    // Update all elements with data-i18n-placeholder attribute
    const dataI18nPlaceholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    console.log(`📝 Found ${dataI18nPlaceholderElements.length} elements with data-i18n-placeholder`);
    
    dataI18nPlaceholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (key && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          element.placeholder = translation;
        }
      }
    });
  }

  private updateNavigation(): void {
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const section = href.substring(1);
        const translation = i18n.t(`nav.${section}`);
        if (translation && translation !== `nav.${section}`) {
          link.textContent = translation;
        }
      }
    });
  }

  private updateSectionHeaders(): void {
    // Update section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2[data-i18n]');
    sectionHeaders.forEach(header => {
      const key = header.getAttribute('data-i18n');
      if (key) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          header.textContent = translation;
        }
      }
    });

    // Update section subtitles
    const sectionSubtitles = document.querySelectorAll('.section-header p[data-i18n]');
    sectionSubtitles.forEach(subtitle => {
      const key = subtitle.getAttribute('data-i18n');
      if (key) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          subtitle.textContent = translation;
        }
      }
    });
  }

  private updateForms(): void {
    // Update form labels and placeholders
    const formInputs = document.querySelectorAll('input[data-i18n-placeholder], textarea[data-i18n-placeholder]');
    formInputs.forEach(input => {
      const key = input.getAttribute('data-i18n-placeholder');
      if (key) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          (input as HTMLInputElement | HTMLTextAreaElement).placeholder = translation;
        }
      }
    });

    // Update form buttons
    const formButtons = document.querySelectorAll('button[data-i18n]');
    formButtons.forEach(button => {
      const key = button.getAttribute('data-i18n');
      if (key) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          button.textContent = translation;
        }
      }
    });
  }

  /**
   * Update content for a specific section
   */
  public updateSectionContent(sectionId: string): void {
    console.log(`🔄 Updating content for section: ${sectionId}`);
    
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn(`⚠️ Section not found: ${sectionId}`);
      return;
    }

    // Update all data-i18n elements in the section
    const dataI18nElements = section.querySelectorAll('[data-i18n]');
    dataI18nElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          element.textContent = translation;
        }
      }
    });

    // Update placeholders in the section
    const placeholderElements = section.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (key && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
        const translation = i18n.t(key);
        if (translation && translation !== key) {
          element.placeholder = translation;
        }
      }
    });

    console.log(`✅ Section content updated: ${sectionId}`);
  }

  /**
   * Force refresh all content
   */
  public refresh(): void {
    console.log('🔄 Forcing content refresh...');
    this.updateAllContent();
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Check if updater is initialized
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Destroy content updater
   */
  public destroy(): void {
    this.elements.clear();
    this.isInitialized = false;
  }
}
