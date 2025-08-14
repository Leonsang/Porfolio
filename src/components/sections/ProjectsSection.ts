import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';
import { ChartComponent, ProjectProgressData } from '../ChartComponent';

export class ProjectsSection extends BaseSection {
  private projectsData = [
    {
      id: 'innovation-hub',
      title: 'projects.innovation.title',
      category: 'projects.innovation.category',
      icon: '🚀',
      metrics: [
        { label: 'projects.innovation.versionControl', score: 94 },
        { label: 'projects.innovation.cicd', score: 92 },
        { label: 'projects.innovation.codeQuality', score: 93 },
        { label: 'projects.innovation.testing', score: 89 }
      ]
    },
    {
      id: 'business-impact',
      title: 'projects.business.title',
      category: 'projects.business.category',
      icon: '📊',
      metrics: [
        { label: 'projects.business.costOptimization', score: 90 },
        { label: 'projects.business.timeToMarket', score: 87 }
      ],
      subMetrics: {
        costOptimization: [
          { label: 'projects.business.cloudCost', score: 92 },
          { label: 'projects.business.resourceUtilization', score: 89 },
          { label: 'projects.business.performanceCost', score: 88 }
        ],
        timeToMarket: [
          { label: 'projects.business.rapidPrototyping', score: 89 },
          { label: 'projects.business.mvpDevelopment', score: 86 },
          { label: 'projects.business.agileMethodology', score: 90 }
        ]
      }
    }
  ];

  private projectProgressChart: ChartComponent | null = null;

  constructor() {
    super('projects-section');
  }

  protected setupEventListeners(): void {
    // Add any project-specific event listeners here
    this.setupProjectInteractions();
    this.setupChartControls();
  }

  protected render(): void {
    if (!this.sectionElement) return;

    // Update i18n content
    this.updateContent();
    
    // Initialize project progress chart
    this.initializeProjectChart();
    
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

    // Update project cards
    this.updateProjectCards();
  }

  /**
   * Update project cards content
   */
  private updateProjectCards(): void {
    if (!this.sectionElement) return;

    // Update Innovation Hub card
    const innovationCard = this.sectionElement.querySelector('.development-card');
    if (innovationCard) {
      const title = innovationCard.querySelector('h3[data-i18n]');
      const category = innovationCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      // Update metrics
      const metrics = innovationCard.querySelectorAll('h4[data-i18n]');
      metrics.forEach(metric => {
        const key = metric.getAttribute('data-i18n');
        if (key) metric.textContent = i18n.t(key);
      });
    }

    // Update Business Impact card
    const businessCard = this.sectionElement.querySelector('.business-impact-card');
    if (businessCard) {
      const title = businessCard.querySelector('h3[data-i18n]');
      const category = businessCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      // Update business metrics
      const businessMetrics = businessCard.querySelectorAll('h4[data-i18n]');
      businessMetrics.forEach(metric => {
        const key = metric.getAttribute('data-i18n');
        if (key) metric.textContent = i18n.t(key);
      });
    }
  }

  /**
   * Initialize project progress chart
   */
  private initializeProjectChart(): void {
    const chartContainer = this.sectionElement?.querySelector('#project-progress-chart');
    if (!chartContainer) return;

    // Create canvas if it doesn't exist
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'project-progress-canvas';
      canvas.width = 400;
      canvas.height = 300;
      chartContainer.appendChild(canvas);
    }

    // Create chart data
    const chartData: ProjectProgressData = {
      labels: this.projectsData.map(p => i18n.t(p.title)),
      completed: this.projectsData.map(p => this.calculateProjectCompletion(p)),
      inProgress: this.projectsData.map(p => this.calculateProjectProgress(p)),
      planned: this.projectsData.map(p => this.calculateProjectPlanned(p))
    };

    // Create chart
    this.projectProgressChart = ChartComponent.createProjectProgressChart(
      'project-progress-canvas',
      chartData
    );
  }

  /**
   * Calculate project completion percentage
   */
  private calculateProjectCompletion(project: any): number {
    const totalMetrics = project.metrics.length;
    const completedMetrics = project.metrics.filter((m: any) => m.score >= 90).length;
    return Math.round((completedMetrics / totalMetrics) * 100);
  }

  /**
   * Calculate project in progress percentage
   */
  private calculateProjectProgress(project: any): number {
    const totalMetrics = project.metrics.length;
    const inProgressMetrics = project.metrics.filter((m: any) => m.score >= 70 && m.score < 90).length;
    return Math.round((inProgressMetrics / totalMetrics) * 100);
  }

  /**
   * Calculate project planned percentage
   */
  private calculateProjectPlanned(project: any): number {
    const totalMetrics = project.metrics.length;
    const plannedMetrics = project.metrics.filter((m: any) => m.score < 70).length;
    return Math.round((plannedMetrics / totalMetrics) * 100);
  }

  /**
   * Setup chart controls
   */
  private setupChartControls(): void {
    if (!this.sectionElement) return;

    // Add chart type switcher
    const chartTypeSwitcher = this.sectionElement.querySelector('#chart-type-switcher');
    if (chartTypeSwitcher) {
      chartTypeSwitcher.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        if (this.projectProgressChart) {
          this.projectProgressChart.changeType(target.value as any);
        }
      });
    }
  }

  /**
   * Update project progress chart
   */
  private updateProjectChart(): void {
    if (!this.projectProgressChart) return;

    const chartData: ProjectProgressData = {
      labels: this.projectsData.map(p => i18n.t(p.title)),
      completed: this.projectsData.map(p => this.calculateProjectCompletion(p)),
      inProgress: this.projectsData.map(p => this.calculateProjectProgress(p)),
      planned: this.projectsData.map(p => this.calculateProjectPlanned(p))
    };

    this.projectProgressChart.updateData(chartData.labels, [
      {
        label: 'Completed',
        data: chartData.completed,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        borderWidth: 2
      },
      {
        label: 'In Progress',
        data: chartData.inProgress,
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        borderWidth: 2
      },
      {
        label: 'Planned',
        data: chartData.planned,
        borderColor: '#17a2b8',
        backgroundColor: 'rgba(23, 162, 184, 0.2)',
        borderWidth: 2
      }
    ]);
  }

  /**
   * Setup project interactions
   */
  private setupProjectInteractions(): void {
    if (!this.sectionElement) return;

    // Add hover effects to project cards
    const projectCards = this.sectionElement.querySelectorAll('.dashboard-card');
    projectCards.forEach(card => {
      const cardElement = card as HTMLElement;
      cardElement.addEventListener('mouseenter', () => {
        cardElement.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      cardElement.addEventListener('mouseleave', () => {
        cardElement.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effects to excellence items
    const excellenceItems = this.sectionElement.querySelectorAll('.excellence-item');
    excellenceItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateExcellenceItem(item as HTMLElement);
      });
    });
  }

  /**
   * Setup animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations to project cards
    const projectCards = this.sectionElement.querySelectorAll('.dashboard-card');
    projectCards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        cardElement.style.transition = 'all 0.6s ease-out';
        cardElement.style.opacity = '1';
        cardElement.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  /**
   * Animate excellence item
   */
  private animateExcellenceItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.1) rotate(2deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  /**
   * Refresh project data
   */
  public refreshData(): void {
    // This could fetch new data from an API
    console.log('🔄 Refreshing projects data...');
    this.updateContent();
    this.updateProjectChart(); // Refresh chart data
  }

  /**
   * Get project statistics
   */
  public getProjectStats(): { total: number; categories: string[] } {
    return {
      total: this.projectsData.length,
      categories: [...new Set(this.projectsData.map(p => p.category))]
    };
  }

  protected onShow(): void {
    console.log('🚀 Projects section shown');
    this.setupAnimations();
  }

  protected onHide(): void {
    console.log('🚀 Projects section hidden');
  }

  protected cleanup(): void {
    // Remove event listeners
    if (!this.sectionElement) return;

    const projectCards = this.sectionElement.querySelectorAll('.dashboard-card');
    projectCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const excellenceItems = this.sectionElement.querySelectorAll('.excellence-item');
    excellenceItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    // Cleanup chart
    if (this.projectProgressChart) {
      this.projectProgressChart.destroy();
      this.projectProgressChart = null;
    }
  }
}
