import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';

export class AboutSection extends BaseSection {
  constructor() {
    super('about-section');
  }

  protected setupEventListeners(): void {
    // Add any about-specific event listeners here
    this.setupAboutInteractions();
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

    // Update section header
    const title = this.sectionElement.querySelector('h2[data-i18n]');
    const subtitle = this.sectionElement.querySelector('p[data-i18n]');
    
    if (title) {
      const key = title.getAttribute('data-i18n');
      if (key) title.textContent = i18n.t(key);
    }
    
    if (subtitle) {
      const key = subtitle.getAttribute('data-i18n');
      if (key) subtitle.textContent = i18n.t(key);
    }

    // Update about cards
    this.updateAboutCards();
  }

  /**
   * Update about cards content
   */
  private updateAboutCards(): void {
    if (!this.sectionElement) return;

    // Update Personal Info card
    const personalCard = this.sectionElement.querySelector('.personal-card');
    if (personalCard) {
      const title = personalCard.querySelector('h3[data-i18n]');
      const category = personalCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      // Update personal info items
      const infoItems = personalCard.querySelectorAll('h4[data-i18n]');
      infoItems.forEach(item => {
        const key = item.getAttribute('data-i18n');
        if (key) item.textContent = i18n.t(key);
      });
    }

    // Update Summary card
    const summaryCard = this.sectionElement.querySelector('.summary-card');
    if (summaryCard) {
      const title = summaryCard.querySelector('h3[data-i18n]');
      const category = summaryCard.querySelector('.category-tag[data-i18n]');
      const description = summaryCard.querySelector('p[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      if (description) {
        const key = description.getAttribute('data-i18n');
        if (key) description.textContent = i18n.t(key);
      }

      // Update highlights
      const highlights = summaryCard.querySelectorAll('span[data-i18n]');
      highlights.forEach(highlight => {
        const key = highlight.getAttribute('data-i18n');
        if (key) highlight.textContent = i18n.t(key);
      });
    }
  }

  /**
   * Setup about interactions
   */
  private setupAboutInteractions(): void {
    if (!this.sectionElement) return;

    // Add hover effects to about cards
    const aboutCards = this.sectionElement.querySelectorAll('.dashboard-card');
    aboutCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effects to info items
    const infoItems = this.sectionElement.querySelectorAll('.info-item');
    infoItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateInfoItem(item as HTMLElement);
      });
    });
  }

  /**
   * Setup animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations to about cards
    const aboutCards = this.sectionElement.querySelectorAll('.dashboard-card');
    aboutCards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.6s ease-out';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  /**
   * Animate info item
   */
  private animateInfoItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  protected onShow(): void {
    console.log('👤 About section shown');
    this.setupAnimations();
  }

  protected onHide(): void {
    console.log('👤 About section hidden');
  }

  protected cleanup(): void {
    // Remove event listeners
    if (!this.sectionElement) return;

    const aboutCards = this.sectionElement.querySelectorAll('.dashboard-card');
    aboutCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const infoItems = this.sectionElement.querySelectorAll('.info-item');
    infoItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });
  }
}
