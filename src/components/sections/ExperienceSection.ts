import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';

export class ExperienceSection extends BaseSection {
  constructor() {
    super('experience-section');
  }

  protected setupEventListeners(): void {
    this.setupExperienceInteractions();
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

    // Update experience cards
    this.updateExperienceCards();
  }

  /**
   * Update experience cards content
   */
  private updateExperienceCards(): void {
    if (!this.sectionElement) return;

    // Update Professional Journey card
    const experienceCard = this.sectionElement.querySelector('.experience-card');
    if (experienceCard) {
      const title = experienceCard.querySelector('h3');
      const category = experienceCard.querySelector('.category-tag');
      
      if (title) {
        title.textContent = i18n.t('experience.journey.title') || 'Professional Journey';
      }
      
      if (category) {
        category.textContent = i18n.t('experience.journey.category') || 'Journey';
      }
    }

    // Update Leadership & Strategy card
    const humanSkillsCard = this.sectionElement.querySelector('.human-skills-card');
    if (humanSkillsCard) {
      const title = humanSkillsCard.querySelector('h3');
      const category = humanSkillsCard.querySelector('.category-tag');
      
      if (title) {
        title.textContent = i18n.t('experience.leadership.title') || 'Leadership & Strategy';
      }
      
      if (category) {
        category.textContent = i18n.t('experience.leadership.category') || 'Leadership';
      }
    }
  }

  /**
   * Setup experience interactions
   */
  private setupExperienceInteractions(): void {
    if (!this.sectionElement) return;

    // Add hover effects to experience cards
    const experienceCards = this.sectionElement.querySelectorAll('.dashboard-card');
    experienceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effects to timeline items
    const timelineItems = this.sectionElement.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateTimelineItem(item as HTMLElement);
      });
    });

    // Add click effects to skill items
    const skillItems = this.sectionElement.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateSkillItem(item as HTMLElement);
      });
    });

    // Add hover effects to skill scores
    const skillScores = this.sectionElement.querySelectorAll('.skill-score');
    skillScores.forEach(score => {
      score.addEventListener('mouseenter', () => {
        this.highlightSkillScore(score as HTMLElement);
      });
      
      score.addEventListener('mouseleave', () => {
        this.unhighlightSkillScore(score as HTMLElement);
      });
    });
  }

  /**
   * Setup animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations to experience cards
    const experienceCards = this.sectionElement.querySelectorAll('.dashboard-card');
    experienceCards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.6s ease-out';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Animate timeline items
    const timelineItems = this.sectionElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        (item as HTMLElement).style.transition = 'all 0.6s ease-out';
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.transform = 'translateX(0)';
      }, 1000 + (index * 300));
    });

    // Animate skill scores
    const skillScores = this.sectionElement.querySelectorAll('.skill-score');
    skillScores.forEach((score, index) => {
      const finalValue = score.textContent;
      if (finalValue) {
        score.textContent = '0%';
        setTimeout(() => {
          this.animateSkillScore(score as HTMLElement, finalValue);
        }, 1500 + (index * 200));
      }
    });
  }

  /**
   * Animate timeline item
   */
  private animateTimelineItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  /**
   * Animate skill item
   */
  private animateSkillItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  /**
   * Highlight skill score
   */
  private highlightSkillScore(score: HTMLElement): void {
    score.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.6)';
    score.style.transform = 'scale(1.1)';
  }

  /**
   * Unhighlight skill score
   */
  private unhighlightSkillScore(score: HTMLElement): void {
    score.style.boxShadow = '';
    score.style.transform = 'scale(1)';
  }

  /**
   * Animate skill score counting
   */
  private animateSkillScore(element: HTMLElement, finalValue: string): void {
    const final = parseInt(finalValue.replace(/\D/g, ''));
    const duration = 1500;
    const start = 0;
    const increment = final / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= final) {
        current = final;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + '%';
    }, 16);
  }

  protected onShow(): void {
    console.log('💼 Experience section shown');
    this.setupAnimations();
  }

  protected onHide(): void {
    console.log('💼 Experience section hidden');
  }

  protected cleanup(): void {
    // Remove event listeners
    if (!this.sectionElement) return;

    const experienceCards = this.sectionElement.querySelectorAll('.dashboard-card');
    experienceCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const timelineItems = this.sectionElement.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    const skillItems = this.sectionElement.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    const skillScores = this.sectionElement.querySelectorAll('.skill-score');
    skillScores.forEach(score => {
      score.removeEventListener('mouseenter', () => {});
      score.removeEventListener('mouseleave', () => {});
    });
  }
}
