import Chart from 'chart.js/auto';

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  fill?: boolean;
  tension?: number;
}

export interface ChartConfig {
  type: 'radar' | 'line' | 'bar' | 'doughnut' | 'pie' | 'scatter';
  labels: string[];
  datasets: ChartDataset[];
  options?: any;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
}

// Chart Factory Interfaces
export interface SkillsChartData {
  labels: string[];
  dataEngineering: number[];
  cloudPlatforms: number[];
  dataStorage: number[];
  biVisualization: number[];
}

export interface ProjectProgressData {
  labels: string[];
  completed: number[];
  inProgress: number[];
  planned: number[];
}

export interface CertificationData {
  labels: string[];
  count: number[];
  averageScore: number[];
  totalHours: number[];
}

export class ChartComponent {
  private chart: Chart | null = null;
  private canvas: HTMLCanvasElement;
  private config: ChartConfig;
  private themeColors: ThemeColors;
  private isInitialized: boolean = false;

  constructor(canvasId: string, config: ChartConfig, themeColors?: ThemeColors) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.config = config;
    this.themeColors = themeColors || this.getDefaultThemeColors();
    this.init();
  }

  private init(): void {
    if (!this.canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }

    this.createChart();
    this.isInitialized = true;
  }

  private createChart(): void {
    const defaultOptions = this.getDefaultOptions();
    const mergedOptions = { ...defaultOptions, ...this.config.options };

    this.chart = new Chart(this.canvas.getContext('2d')!, {
      type: this.config.type,
      data: {
        labels: this.config.labels,
        datasets: this.config.datasets
      },
      options: mergedOptions
    });
  }

  private getDefaultOptions(): any {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: '#ffffff',
            font: {
              family: 'Orbitron, monospace',
              size: window.innerWidth < 768 ? 10 : 12
            },
            padding: window.innerWidth < 768 ? 10 : 15,
            usePointStyle: true
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6
        }
      }
    };

    // Add specific options based on chart type
    switch (this.config.type) {
      case 'radar':
        return {
          ...baseOptions,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                color: '#888888',
                font: { family: 'Orbitron, monospace', size: 10 },
                stepSize: 20
              },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              pointLabels: {
                color: '#ffffff',
                font: { family: 'Orbitron, monospace', size: 11 }
              }
            }
          }
        };

      case 'line':
        return {
          ...baseOptions,
          scales: {
            x: {
              ticks: { color: '#888888' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              ticks: { color: '#888888' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        };

      case 'bar':
        return {
          ...baseOptions,
          scales: {
            x: {
              ticks: { color: '#888888' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
              ticks: { color: '#888888' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
          }
        };

      default:
        return baseOptions;
    }
  }

  private getDefaultThemeColors(): ThemeColors {
    return {
      primary: '#00ff41',
      secondary: '#ff6b35',
      accent: '#4ecdc4',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8'
    };
  }

  // ===== CHART FACTORIES =====
  
  /**
   * Create a Skills Radar Chart
   */
  static createSkillsChart(canvasId: string, data: SkillsChartData, themeColors?: ThemeColors): ChartComponent {
    const datasets: ChartDataset[] = [
      {
        label: 'Data Engineering',
        data: data.dataEngineering,
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#00ff41',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#00ff41'
      },
      {
        label: 'Cloud Platforms',
        data: data.cloudPlatforms,
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#ff6b35',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#ff6b35'
      },
      {
        label: 'Data Storage',
        data: data.dataStorage,
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#4ecdc4',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#4ecdc4'
      },
      {
        label: 'BI Visualization',
        data: data.biVisualization,
        borderColor: '#f7b731',
        backgroundColor: 'rgba(247, 183, 49, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#f7b731',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#f7b731'
      }
    ];

    const config: ChartConfig = {
      type: 'radar',
      labels: data.labels,
      datasets: datasets
    };

    return new ChartComponent(canvasId, config, themeColors);
  }

  /**
   * Create a Project Progress Chart
   */
  static createProjectProgressChart(canvasId: string, data: ProjectProgressData, themeColors?: ThemeColors): ChartComponent {
    const datasets: ChartDataset[] = [
      {
        label: 'Completed',
        data: data.completed,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        borderWidth: 2
      },
      {
        label: 'In Progress',
        data: data.inProgress,
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        borderWidth: 2
      },
      {
        label: 'Planned',
        data: data.planned,
        borderColor: '#17a2b8',
        backgroundColor: 'rgba(23, 162, 184, 0.2)',
        borderWidth: 2
      }
    ];

    const config: ChartConfig = {
      type: 'bar',
      labels: data.labels,
      datasets: datasets
    };

    return new ChartComponent(canvasId, config, themeColors);
  }

  /**
   * Create a Certifications Chart
   */
  static createCertificationsChart(canvasId: string, data: CertificationData, themeColors?: ThemeColors): ChartComponent {
    const datasets: ChartDataset[] = [
      {
        label: 'Number of Certifications',
        data: data.count,
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.2)',
        borderWidth: 3,
        fill: true
      },
      {
        label: 'Average Score (%)',
        data: data.averageScore,
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderWidth: 3,
        fill: false
      },
      {
        label: 'Total Hours',
        data: data.totalHours,
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        borderWidth: 3,
        fill: false
      }
    ];

    const config: ChartConfig = {
      type: 'line',
      labels: data.labels,
      datasets: datasets
    };

    return new ChartComponent(canvasId, config, themeColors);
  }

  // ===== PUBLIC METHODS =====

  /**
   * Update chart data
   */
  public updateData(labels: string[], datasets: ChartDataset[]): void {
    if (!this.chart) return;

    this.config.labels = labels;
    this.config.datasets = datasets;

    this.chart.data.labels = labels;
    this.chart.data.datasets = datasets;
    this.chart.update('none');
  }

  /**
   * Update chart configuration
   */
  public updateConfig(config: Partial<ChartConfig>): void {
    if (!this.chart) return;

    this.config = { ...this.config, ...config };

    if (config.labels) {
      this.chart.data.labels = config.labels;
    }

    if (config.datasets) {
      this.chart.data.datasets = config.datasets;
    }

    if (config.options) {
      this.chart.options = { ...this.chart.options, ...config.options };
    }

    this.chart.update('none');
  }

  /**
   * Update theme colors
   */
  public updateTheme(themeColors: ThemeColors): void {
    if (!this.chart) return;

    this.themeColors = themeColors;
    this.applyThemeColors();
  }

  /**
   * Apply theme colors to datasets
   */
  private applyThemeColors(): void {
    if (!this.chart) return;

    const colorPalette = [
      this.themeColors.primary,
      this.themeColors.secondary,
      this.themeColors.accent,
      this.themeColors.success,
      this.themeColors.warning,
      this.themeColors.danger,
      this.themeColors.info
    ];

    this.chart.data.datasets.forEach((dataset, index) => {
      const color = colorPalette[index % colorPalette.length];
      dataset.borderColor = color;
      dataset.backgroundColor = `${color}20`;
      
      if (this.config.type === 'radar' || this.config.type === 'line') {
        (dataset as any).pointBackgroundColor = color;
        (dataset as any).pointHoverBorderColor = color;
      }
    });

    this.chart.update('none');
  }

  /**
   * Add new dataset
   */
  public addDataset(dataset: ChartDataset): void {
    if (!this.chart) return;

    this.config.datasets.push(dataset);
    this.chart.data.datasets.push(dataset);
    this.chart.update('none');
  }

  /**
   * Remove dataset by index
   */
  public removeDataset(index: number): void {
    if (!this.chart || index < 0 || index >= this.config.datasets.length) return;

    this.config.datasets.splice(index, 1);
    this.chart.data.datasets.splice(index, 1);
    this.chart.update('none');
  }

  /**
   * Update dataset by index
   */
  public updateDataset(index: number, dataset: Partial<ChartDataset>): void {
    if (!this.chart || index < 0 || index >= this.config.datasets.length) return;

    this.config.datasets[index] = { ...this.config.datasets[index], ...dataset };
    this.chart.data.datasets[index] = { ...this.chart.data.datasets[index], ...dataset };
    this.chart.update('none');
  }

  /**
   * Change chart type
   */
  public changeType(newType: ChartConfig['type']): void {
    if (!this.chart) return;

    this.config.type = newType;
    this.chart.destroy();
    this.createChart();
  }

  /**
   * Update responsiveness
   */
  public updateResponsiveness(): void {
    if (!this.chart) return;

    this.chart.resize();
    
    const canvas = this.chart.canvas;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  }

  /**
   * Get chart instance
   */
  public getChart(): Chart | null {
    return this.chart;
  }

  /**
   * Get current configuration
   */
  public getConfig(): ChartConfig {
    return { ...this.config };
  }

  /**
   * Check if chart is ready
   */
  public isReady(): boolean {
    return this.isInitialized && this.chart !== null;
  }

  /**
   * Destroy chart
   */
  public destroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.isInitialized = false;
  }

  /**
   * Resize chart
   */
  public resize(): void {
    if (this.chart) {
      this.chart.resize();
    }
  }
}
