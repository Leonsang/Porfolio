import { ChartComponent, ChartDataset, ChartConfig, ThemeColors } from './ChartComponent';

/**
 * ChartExamples - Demonstrates how to use ChartComponent for different chart types
 * This file shows all the available chart configurations and factory methods
 */
export class ChartExamples {
  
  /**
   * Example 1: Create a Skills Radar Chart using factory method
   */
  static createSkillsExample(canvasId: string): ChartComponent {
    const skillsData = {
      labels: ['Python', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Terraform'],
      dataEngineering: [95, 90, 85, 80, 75, 70],
      cloudPlatforms: [85, 80, 90, 85, 80, 85],
      dataStorage: [90, 95, 80, 75, 70, 65],
      biVisualization: [85, 80, 75, 70, 65, 60]
    };

    return ChartComponent.createSkillsChart(canvasId, skillsData);
  }

  /**
   * Example 2: Create a Project Progress Chart using factory method
   */
  static createProjectProgressExample(canvasId: string): ChartComponent {
    const projectData = {
      labels: ['Project A', 'Project B', 'Project C', 'Project D'],
      completed: [80, 60, 90, 45],
      inProgress: [15, 30, 8, 40],
      planned: [5, 10, 2, 15]
    };

    return ChartComponent.createProjectProgressChart(canvasId, projectData);
  }

  /**
   * Example 3: Create a Certifications Chart using factory method
   */
  static createCertificationsExample(canvasId: string): ChartComponent {
    const certData = {
      labels: ['Cloud', 'Data', 'Programming', 'Other'],
      count: [5, 8, 12, 3],
      averageScore: [92, 88, 95, 87],
      totalHours: [200, 320, 480, 120]
    };

    return ChartComponent.createCertificationsChart(canvasId, certData);
  }

  /**
   * Example 4: Create a custom Line Chart
   */
  static createCustomLineChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'line',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: '#00ff41',
          backgroundColor: 'rgba(0, 255, 65, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: [8000, 12000, 10000, 18000, 15000, 22000],
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4
        }
      ]
    };

    return new ChartComponent(canvasId, config);
  }

  /**
   * Example 5: Create a custom Bar Chart
   */
  static createCustomBarChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'bar',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [450, 520, 480, 600],
          borderColor: '#4ecdc4',
          backgroundColor: 'rgba(78, 205, 196, 0.8)',
          borderWidth: 2
        },
        {
          label: 'Marketing',
          data: [200, 250, 220, 300],
          borderColor: '#f7b731',
          backgroundColor: 'rgba(247, 183, 49, 0.8)',
          borderWidth: 2
        }
      ]
    };

    return new ChartComponent(canvasId, config);
  }

  /**
   * Example 6: Create a custom Doughnut Chart
   */
  static createCustomDoughnutChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'doughnut',
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2],
          borderColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
          borderWidth: 2
        }
      ]
    };

    return new ChartComponent(canvasId, config);
  }

  /**
   * Example 7: Create a custom Pie Chart
   */
  static createCustomPieChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'pie',
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          label: 'Users',
          data: [300, 150, 100],
          borderColor: ['#ff6384', '#36a2eb', '#ffce56'],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
          borderWidth: 2
        }
      ]
    };

    return new ChartComponent(canvasId, config);
  }

  /**
   * Example 8: Create a custom Scatter Chart
   */
  static createCustomScatterChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'scatter',
      labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
      datasets: [
        {
          label: 'Dataset A',
          data: [10, 20, 15, 25, 30],
          borderColor: '#00ff41',
          backgroundColor: 'rgba(0, 255, 65, 0.6)',
          borderWidth: 1
        },
        {
          label: 'Dataset B',
          data: [15, 25, 20, 30, 35],
          borderColor: '#ff6b35',
          backgroundColor: 'rgba(255, 107, 53, 0.6)',
          borderWidth: 1
        }
      ]
    };

    return new ChartComponent(canvasId, config);
  }

  /**
   * Example 9: Dynamic chart with theme switching
   */
  static createDynamicChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'line',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Performance',
          data: [65, 78, 90, 81, 95],
          borderColor: '#00ff41',
          backgroundColor: 'rgba(0, 255, 65, 0.1)',
          borderWidth: 3,
          fill: true
        }
      ]
    };

    const chart = new ChartComponent(canvasId, config);
    
    // Example of theme switching
    setTimeout(() => {
      chart.updateTheme({
        primary: '#ff6b35',
        secondary: '#4ecdc4',
        accent: '#f7b731'
      });
    }, 3000);

    return chart;
  }

  /**
   * Example 10: Chart with dynamic data updates
   */
  static createLiveChart(canvasId: string): ChartComponent {
    const config: ChartConfig = {
      type: 'bar',
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          label: 'Live Data',
          data: [10, 20, 30, 40],
          borderColor: '#4ecdc4',
          backgroundColor: 'rgba(78, 205, 196, 0.8)',
          borderWidth: 2
        }
      ]
    };

    const chart = new ChartComponent(canvasId, config);
    
    // Simulate live data updates
    setInterval(() => {
      const newData = chart.getConfig().datasets[0].data.map(() => 
        Math.floor(Math.random() * 100)
      );
      
      chart.updateData(
        chart.getConfig().labels,
        [{
          ...chart.getConfig().datasets[0],
          data: newData
        }]
      );
    }, 2000);

    return chart;
  }
}

/**
 * Usage Examples:
 * 
 * // Create a skills radar chart
 * const skillsChart = ChartExamples.createSkillsExample('skills-canvas');
 * 
 * // Create a project progress chart
 * const progressChart = ChartExamples.createProjectProgressExample('progress-canvas');
 * 
 * // Create a custom line chart
 * const lineChart = ChartExamples.createCustomLineChart('line-canvas');
 * 
 * // Change chart type dynamically
 * skillsChart.changeType('line');
 * 
 * // Update theme colors
 * skillsChart.updateTheme({
 *   primary: '#ff0000',
 *   secondary: '#00ff00',
 *   accent: '#0000ff'
 * });
 * 
 * // Add new dataset
 * skillsChart.addDataset({
 *   label: 'New Skill',
 *   data: [85, 90, 88, 92, 87, 89],
 *   borderColor: '#ff00ff',
 *   backgroundColor: 'rgba(255, 0, 255, 0.1)',
 *   borderWidth: 3
 * });
 */
