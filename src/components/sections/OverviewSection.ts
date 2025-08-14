import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';

export class OverviewSection extends BaseSection {
  constructor() {
    super('overview-section');
  }

  protected setupEventListeners(): void {
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

    // Update overview cards
    this.updateOverviewCards();
  }

  /**
   * Update overview cards content
   */
  private updateOverviewCards(): void {
    if (!this.sectionElement) return;

    // Update Performance Excellence card
    const metricsCard = this.sectionElement.querySelector('.metrics-card');
    if (metricsCard) {
      const title = metricsCard.querySelector('h3');
      const category = metricsCard.querySelector('.category-tag');
      
      if (title) {
        title.textContent = i18n.t('overview.performance.title') || 'Performance Excellence';
      }
      
      if (category) {
        category.textContent = i18n.t('overview.performance.category') || 'Performance';
      }
    }

    // Update Portfolio Overview Stats card
    const statsCard = this.sectionElement.querySelector('.stats-card');
    if (statsCard) {
      const title = statsCard.querySelector('h3');
      const category = statsCard.querySelector('.category-tag');
      
      if (title) {
        title.textContent = i18n.t('overview.stats.title') || 'Portfolio Overview';
      }
      
      if (category) {
        category.textContent = i18n.t('overview.stats.category') || 'Overview';
      }
    }
  }

  /**
   * Setup overview interactions
   */
  private setupOverviewInteractions(): void {
    if (!this.sectionElement) return;

    // Add hover effects to overview cards
    const overviewCards = this.sectionElement.querySelectorAll('.dashboard-card');
    overviewCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effects to metric items
    const metricItems = this.sectionElement.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateMetricItem(item as HTMLElement);
      });
    });

    // Add click effects to stat items
    const statItems = this.sectionElement.querySelectorAll('.stat-item');
    statItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateStatItem(item as HTMLElement);
      });
    });
  }

  /**
   * Setup animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations to overview cards
    const overviewCards = this.sectionElement.querySelectorAll('.dashboard-card');
    overviewCards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.6s ease-out';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Animate metric values
    const metricValues = this.sectionElement.querySelectorAll('.metric-value');
    metricValues.forEach((value, index) => {
      const finalValue = value.textContent;
      if (finalValue) {
        value.textContent = '0';
        setTimeout(() => {
          this.animateNumber(value as HTMLElement, finalValue);
        }, 1000 + (index * 200));
      }
    });
  }

  /**
   * Animate metric item
   */
  private animateMetricItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  /**
   * Animate stat item
   */
  private animateStatItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.1)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1)';
    }, 300);
  }

  /**
   * Animate number counting
   */
  private animateNumber(element: HTMLElement, finalValue: string): void {
    const final = parseInt(finalValue.replace(/\D/g, ''));
    const duration = 2000;
    const start = 0;
    const increment = final / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= final) {
        current = final;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + finalValue.replace(/\d/g, '');
    }, 16);
  }

  protected onShow(): void {
    console.log('🏠 Overview section shown');
    this.setupAnimations();
  }

  protected onHide(): void {
    console.log('🏠 Overview section hidden');
  }

  protected cleanup(): void {
    // Remove event listeners
    if (!this.sectionElement) return;

    const overviewCards = this.sectionElement.querySelectorAll('.dashboard-card');
    overviewCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const metricItems = this.sectionElement.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    const statItems = this.sectionElement.querySelectorAll('.stat-item');
    statItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });
  }
}
