import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';
import { portfolioConfig } from '../../config/portfolio';

export class TechnicalSection extends BaseSection {
  constructor() {
    super('technical-section');
  }

  protected setupEventListeners(): void {
    this.setupTechnicalInteractions();
  }

  protected render(): void {
    if (!this.sectionElement) return;

    // Update i18n content
    this.updateContent();
    
    // Render certificates links block
    this.renderCertificatesLinks();
    
    // Render courses block
    this.renderCourses();
    
    // Setup animations and interactions
    this.setupAnimations();
  }

  private renderCertificatesLinks(): void {
    if (!this.sectionElement) return;
    const containerId = 'cert-links-block';
    let container = this.sectionElement.querySelector(`#${containerId}`) as HTMLElement | null;
    if (!container) {
      // Create block at end of technical section grid
      const grid = this.sectionElement.querySelector('.technical-grid') || this.sectionElement;
      container = document.createElement('div');
      container.id = containerId;
      container.className = 'dashboard-card cert-links-card';
      container.innerHTML = `
        <div class="card-header">
          <h3>Certificates (Links)</h3>
          <span class="category-tag">Creds</span>
        </div>
        <div class="cert-links-list"></div>
      `;
      grid.appendChild(container);
    }
    const list = container.querySelector('.cert-links-list') as HTMLElement;
    if (!list) return;

    const links = portfolioConfig.certificateLinks || [];
    list.innerHTML = links.map(l => `
      <div class="cert-link-row">
        <div class="cert-link-title"><strong>${l.title}</strong> <span class="cert-link-provider">${l.provider}${l.date ? ' · ' + l.date : ''}</span></div>
        <a href="${l.url}" target="_blank" rel="noopener" class="btn btn-secondary">Open</a>
      </div>
    `).join('');
  }

  private renderCourses(): void {
    if (!this.sectionElement) return;
    const containerId = 'courses-block';
    let container = this.sectionElement.querySelector(`#${containerId}`) as HTMLElement | null;
    if (!container) {
      // Create block after certificates
      const grid = this.sectionElement.querySelector('.technical-grid') || this.sectionElement;
      container = document.createElement('div');
      container.id = containerId;
      container.className = 'dashboard-card courses-card';
      container.innerHTML = `
        <div class="card-header">
          <h3>Data Engineering Courses</h3>
          <span class="category-tag">Learning</span>
        </div>
        <div class="courses-list"></div>
      `;
      grid.appendChild(container);
    }
    const list = container.querySelector('.courses-list') as HTMLElement;
    if (!list) return;

    const courses = portfolioConfig.courses || [];
    list.innerHTML = courses.map(course => `
      <div class="course-item" data-course-id="${course.id}">
        <div class="course-header">
          <div class="course-info">
            <h4 class="course-title">${course.title}</h4>
            <div class="course-meta">
              <span class="course-provider">${course.provider}</span>
              ${course.courseId ? `<span class="course-id">${course.courseId}</span>` : ''}
              <span class="course-status status-${course.status}">${course.status === 'completed' ? '✓ Completed' : course.status === 'in-progress' ? '🔄 In Progress' : '📅 Planned'}</span>
            </div>
          </div>
          <div class="course-actions">
            ${course.status === 'completed' && course.certificateUrl ? `<a href="${course.certificateUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">View Cert</a>` : ''}
            <button class="btn btn-secondary btn-sm toggle-objectives" data-course-id="${course.id}">View Objectives</button>
          </div>
        </div>
        <div class="course-objectives" id="objectives-${course.id}" style="display: none;">
          <h5>Learning Objectives:</h5>
          <ul>
            ${course.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    // Add toggle functionality
    this.setupCourseToggles();
  }

  private setupCourseToggles(): void {
    const toggles = this.sectionElement?.querySelectorAll('.toggle-objectives');
    toggles?.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const courseId = (e.target as HTMLElement).getAttribute('data-course-id');
        if (!courseId) return;
        
        const objectives = document.getElementById(`objectives-${courseId}`);
        const button = e.target as HTMLButtonElement;
        
        if (objectives) {
          const isVisible = objectives.style.display !== 'none';
          objectives.style.display = isVisible ? 'none' : 'block';
          button.textContent = isVisible ? 'View Objectives' : 'Hide Objectives';
        }
      });
    });
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

    // Update technical cards
    this.updateTechnicalCards();
  }

  /**
   * Update technical cards content
   */
  private updateTechnicalCards(): void {
    if (!this.sectionElement) return;

    // Update Technical Excellence Score card
    const impactCard = this.sectionElement.querySelector('.impact-card');
    if (impactCard) {
      const title = impactCard.querySelector('h3[data-i18n]');
      const category = impactCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      // Update impact items
      const impactItems = impactCard.querySelectorAll('.impact-label[data-i18n]');
      impactItems.forEach(item => {
        const key = item.getAttribute('data-i18n');
        if (key) item.textContent = i18n.t(key);
      });
    }

    // Update Skills Matrix card
    const chartCard = this.sectionElement.querySelector('.chart-card');
    if (chartCard) {
      const title = chartCard.querySelector('h3[data-i18n]');
      const category = chartCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }
    }

    // Update Technology Stack card
    const techCard = this.sectionElement.querySelector('.tech-card');
    if (techCard) {
      const title = techCard.querySelector('h3[data-i18n]');
      const category = techCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      // Update tech categories
      const techCategories = techCard.querySelectorAll('h4[data-i18n]');
      techCategories.forEach(category => {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      });
    }
  }

  /**
   * Setup technical interactions
   */
  private setupTechnicalInteractions(): void {
    if (!this.sectionElement) return;

    // Add hover effects to technical cards
    const technicalCards = this.sectionElement.querySelectorAll('.dashboard-card');
    technicalCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effects to impact items
    const impactItems = this.sectionElement.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateImpactItem(item as HTMLElement);
      });
    });

    // Add click effects to tech tags
    const techTags = this.sectionElement.querySelectorAll('.tech-tags span');
    techTags.forEach(tag => {
      tag.addEventListener('click', () => {
        this.animateTechTag(tag as HTMLElement);
      });
    });

    // Add hover effects to skill bars
    const skillBars = this.sectionElement.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      bar.addEventListener('mouseenter', () => {
        this.highlightSkillBar(bar as HTMLElement);
      });
      
      bar.addEventListener('mouseleave', () => {
        this.unhighlightSkillBar(bar as HTMLElement);
      });
    });
  }

  /**
   * Setup animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations to technical cards
    const technicalCards = this.sectionElement.querySelectorAll('.dashboard-card');
    technicalCards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.6s ease-out';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Animate impact bars
    const impactBars = this.sectionElement.querySelectorAll('.impact-progress');
    impactBars.forEach((bar, index) => {
      const width = bar.getAttribute('style')?.match(/width:\s*(\d+)%/)?.[1];
      if (width) {
        (bar as HTMLElement).style.width = '0%';
        setTimeout(() => {
          (bar as HTMLElement).style.transition = 'width 1.5s ease-out';
          (bar as HTMLElement).style.width = width + '%';
        }, 1000 + (index * 300));
      }
    });

    // Animate skill bars
    const skillBars = this.sectionElement.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
      const width = bar.getAttribute('style')?.match(/width:\s*(\d+)%/)?.[1];
      if (width) {
        (bar as HTMLElement).style.width = '0%';
        setTimeout(() => {
          (bar as HTMLElement).style.transition = 'width 1.5s ease-out';
          (bar as HTMLElement).style.width = width + '%';
        }, 1500 + (index * 200));
      }
    });
  }

  /**
   * Animate impact item
   */
  private animateImpactItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  /**
   * Animate tech tag
   */
  private animateTechTag(tag: HTMLElement): void {
    tag.style.transform = 'scale(1.1) rotate(2deg)';
    tag.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      tag.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  /**
   * Highlight skill bar
   */
  private highlightSkillBar(bar: HTMLElement): void {
    bar.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.6)';
    bar.style.transform = 'scaleY(1.1)';
  }

  /**
   * Unhighlight skill bar
   */
  private unhighlightSkillBar(bar: HTMLElement): void {
    bar.style.boxShadow = '';
    bar.style.transform = 'scaleY(1)';
  }

  protected onShow(): void {
    console.log('💻 Technical section shown');
    this.setupAnimations();
  }

  protected onHide(): void {
    console.log('💻 Technical section hidden');
  }

  protected cleanup(): void {
    // Remove event listeners
    if (!this.sectionElement) return;

    const technicalCards = this.sectionElement.querySelectorAll('.dashboard-card');
    technicalCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const impactItems = this.sectionElement.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    const techTags = this.sectionElement.querySelectorAll('.tech-tags span');
    techTags.forEach(tag => {
      tag.removeEventListener('click', () => {});
    });

    const skillBars = this.sectionElement.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      bar.removeEventListener('mouseenter', () => {});
      bar.removeEventListener('mouseleave', () => {});
    });
  }
}
