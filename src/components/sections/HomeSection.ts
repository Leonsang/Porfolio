import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';
import { RetroChatDog } from '../retro/RetroChatDog';

export class HomeSection extends BaseSection {
  private heroBanner: HTMLElement | null = null;
  private aboutContent: HTMLElement | null = null;
  private overviewContent: HTMLElement | null = null;
  private chatDog: RetroChatDog | null = null;

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
    this.setupHeroAnimations();
    this.setupAboutAnimations();
    this.setupOverviewAnimations();
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

    // Update experience overview content
    const experienceElements = this.sectionElement.querySelectorAll('[data-i18n^="overview.experience."]');
    experienceElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });

    // Update skills overview content
    const skillsElements = this.sectionElement.querySelectorAll('[data-i18n^="overview.skills."]');
    skillsElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });

    // Update certifications overview content
    const certElements = this.sectionElement.querySelectorAll('[data-i18n^="overview.certifications."]');
    certElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });

    // Update projects overview content
    const projectElements = this.sectionElement.querySelectorAll('[data-i18n^="overview.projects."]');
    projectElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });

    // Update tech stack content
    const techElements = this.sectionElement.querySelectorAll('[data-i18n^="overview.tech."]');
    techElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) element.textContent = i18n.t(key);
    });
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
   * Initialize counting animations for metric values
   */
  private initializeCountingAnimations(): void {
    if (!this.sectionElement) return;
    
    // Find all elements with data-target attribute
    const countElements = this.sectionElement.querySelectorAll('[data-target]');
    console.log('Found count elements:', countElements.length);
    
    if (countElements.length === 0) {
      // Fallback: manually trigger animations for known elements
      this.animateKnownCounters();
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const target = parseInt(element.getAttribute('data-target') || '0');
          console.log('Animating element:', element.textContent, 'to target:', target);
          this.animateCount(element, target);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(element => {
      console.log('Observing element:', element);
      observer.observe(element);
    });
  }

  /**
   * Animate known counter elements manually
   */
  private animateKnownCounters(): void {
    if (!this.sectionElement) return;

    // Animate experience stats
    const companyElement = this.sectionElement.querySelector('.stat-value');
    if (companyElement) {
      this.animateCount(companyElement as HTMLElement, 5);
    }

    // Animate project metrics
    const pipelineElement = this.sectionElement.querySelector('.circle-number[data-target="25"]');
    if (pipelineElement) {
      this.animateCount(pipelineElement as HTMLElement, 25);
    }

    const dataElement = this.sectionElement.querySelector('.circle-number[data-target="500"]');
    if (dataElement) {
      this.animateCount(dataElement as HTMLElement, 500);
    }

    const cloudsElement = this.sectionElement.querySelector('.circle-number[data-target="3"]');
    if (cloudsElement) {
      this.animateCount(cloudsElement as HTMLElement, 3);
    }
  }

  /**
   * Animate counting from 0 to target value
   */
  private animateCount(element: HTMLElement, target: number): void {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (target >= 1000) {
        element.textContent = `${Math.floor(current)}+`;
      } else {
        element.textContent = Math.floor(current).toString();
      }
    }, stepTime);
  }

  /**
   * Initialize chart animations
   */
  private initializeChartAnimations(): void {
    // Initialize radar chart if available
    const radarCanvas = this.sectionElement!.querySelector('#skillsRadarChart') as HTMLCanvasElement;
    if (radarCanvas) {
      this.initializeRadarChart(radarCanvas);
    }
  }

  /**
   * Initialize radar chart with Chart.js
   */
  private initializeRadarChart(canvas: HTMLCanvasElement): void {
    try {
      // Use Chart.js directly since it's already installed
      const { Chart } = require('chart.js/auto');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Data Modeling', 'Data Ingestion', 'Data Transformation', 'Data Storage', 'Data Processing', 'Data Delivery'],
            datasets: [{
              label: 'Skills Level',
              data: [92, 95, 93, 96, 91, 94],
              backgroundColor: 'rgba(78, 205, 196, 0.3)',
              borderColor: 'rgba(78, 205, 196, 1)',
              borderWidth: 3,
              pointBackgroundColor: 'rgba(78, 205, 196, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                hoverRadius: 7
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                min: 0,
                ticks: {
                  stepSize: 20,
                  color: 'var(--text-secondary)',
                  font: {
                    size: 10
                  }
                },
                grid: {
                  color: 'var(--card-bg-secondary)',
                  lineWidth: 1
                },
                pointLabels: {
                  color: 'var(--text-primary)',
                  font: {
                    size: 11,
                    weight: 500
                  },
                  padding: 15
                },
                angleLines: {
                  color: 'var(--card-bg-secondary)',
                  lineWidth: 1
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'var(--accent-color)',
                borderWidth: 1
              }
            }
          }
        });
      }
    } catch (error) {
      console.warn('Chart.js initialization failed:', error);
      // Fallback: create a simple visual representation
      this.createFallbackRadar(canvas);
    }
  }

  /**
   * Create fallback radar visualization if Chart.js fails
   */
  private createFallbackRadar(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Draw background circles
    ctx.strokeStyle = 'var(--card-bg-secondary)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw skills polygon
    const skills = [
      { name: 'Data Modeling', value: 92 },
      { name: 'Data Ingestion', value: 95 },
      { name: 'Data Transformation', value: 93 },
      { name: 'Data Storage', value: 96 },
      { name: 'Data Processing', value: 91 },
      { name: 'Data Delivery', value: 94 }
    ];

    ctx.fillStyle = 'rgba(78, 205, 196, 0.3)';
    ctx.strokeStyle = 'rgba(78, 205, 196, 1)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    skills.forEach((skill, index) => {
      const angle = (index * Math.PI * 2) / skills.length - Math.PI / 2;
      const value = (skill.value / 100) * radius;
      const x = centerX + Math.cos(angle) * value;
      const y = centerY + Math.sin(angle) * value;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw points
    ctx.fillStyle = 'rgba(78, 205, 196, 1)';
    skills.forEach((skill, index) => {
      const angle = (index * Math.PI * 2) / skills.length - Math.PI / 2;
      const value = (skill.value / 100) * radius;
      const x = centerX + Math.cos(angle) * value;
      const y = centerY + Math.sin(angle) * value;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  /**
   * Setup widget interactions
   */
  private setupWidgetInteractions(): void {
    // Add hover effects and interactions
    const widgets = this.sectionElement!.querySelectorAll('.dashboard-widget');
    
    widgets.forEach(widget => {
      widget.addEventListener('mouseenter', () => {
        widget.classList.add('widget-hover');
      });
      
      widget.addEventListener('mouseleave', () => {
        widget.classList.remove('widget-hover');
      });
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

    // Initialize retro dog chat when home shows (only if not already initialized)
    if (!this.chatDog) {
      try {
        this.chatDog = new RetroChatDog(() => i18n.getCurrentLanguage() as 'en' | 'es');
        this.chatDog.init();
      } catch (e) {
        console.warn('RetroChatDog init skipped:', e);
      }
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
