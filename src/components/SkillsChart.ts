import { ChartComponent, SkillsChartData, ThemeColors } from './ChartComponent';
import { Skills } from '../types/portfolio';

export class SkillsChart {
  private chartComponent: ChartComponent;
  private skills: Skills;

  constructor(canvasId: string, skills: Skills) {
    this.skills = skills;
    
    const data = this.prepareChartData();
    const themeColors = this.createThemeColors();
    
    this.chartComponent = ChartComponent.createSkillsChart(canvasId, data, themeColors);
  }

  private prepareChartData(): SkillsChartData {
    const labels = Object.keys(this.skills.data_engineering);
    const dataEngineering = Object.values(this.skills.data_engineering);
    const cloudPlatforms = Object.values(this.skills.cloud_platforms);
    const dataStorage = Object.values(this.skills.data_storage);
    const biVisualization = Object.values(this.skills.bi_visualization);

    return {
      labels,
      dataEngineering,
      cloudPlatforms,
      dataStorage,
      biVisualization
    };
  }

  private createThemeColors(): ThemeColors {
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

  /**
   * Update skills data
   */
  public updateSkills(skills: Skills): void {
    this.skills = skills;
    const data = this.prepareChartData();
    
    // Create new datasets with updated data
    const datasets = [
      {
        label: 'Data Engineering',
        data: data.dataEngineering,
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        borderWidth: 3
      },
      {
        label: 'Cloud Platforms',
        data: data.cloudPlatforms,
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderWidth: 3
      },
      {
        label: 'Data Storage',
        data: data.dataStorage,
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        borderWidth: 3
      },
      {
        label: 'BI Visualization',
        data: data.biVisualization,
        borderColor: '#f7b731',
        backgroundColor: 'rgba(247, 183, 49, 0.1)',
        borderWidth: 3
      }
    ];

    this.chartComponent.updateData(data.labels, datasets);
  }

  /**
   * Update theme colors
   */
  public updateThemeColors(primaryColor: string, secondaryColor: string, accentColor: string): void {
    const themeColors: ThemeColors = {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor
    };
    
    this.chartComponent.updateTheme(themeColors);
  }

  /**
   * Update responsiveness
   */
  public updateResponsiveness(): void {
    this.chartComponent.updateResponsiveness();
  }

  /**
   * Change chart type (e.g., from radar to line)
   */
  public changeChartType(type: 'radar' | 'line' | 'bar'): void {
    this.chartComponent.changeType(type);
  }

  /**
   * Add new skill category
   */
  public addSkillCategory(label: string, data: number[], color: string): void {
    const newDataset = {
      label,
      data,
      borderColor: color,
      backgroundColor: `${color}20`,
      borderWidth: 3
    };
    
    this.chartComponent.addDataset(newDataset);
  }

  /**
   * Remove skill category by index
   */
  public removeSkillCategory(index: number): void {
    this.chartComponent.removeDataset(index);
  }

  /**
   * Get chart component for advanced operations
   */
  public getChartComponent(): ChartComponent {
    return this.chartComponent;
  }

  public destroy(): void {
    this.chartComponent.destroy();
  }

  public resize(): void {
    this.chartComponent.resize();
  }
}
