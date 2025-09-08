'use client';

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export function SkillsChart() {
  const { skills } = portfolioConfig;

  // Data for the radar chart
  const radarData = {
    labels: [
      'Data Engineering',
      'Cloud Platforms',
      'Data Storage',
      'Analytics & BI'
    ],
    datasets: [
      {
        label: 'Skill Level',
        data: [
          Object.values(skills.data_engineering).reduce((a, b) => a + b, 0) / Object.keys(skills.data_engineering).length,
          Object.values(skills.cloud_platforms).reduce((a, b) => a + b, 0) / Object.keys(skills.cloud_platforms).length,
          Object.values(skills.data_storage).reduce((a, b) => a + b, 0) / Object.keys(skills.data_storage).length,
          Object.values(skills.bi_visualization).reduce((a, b) => a + b, 0) / Object.keys(skills.bi_visualization).length
        ],
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        borderColor: '#00ff41',
        borderWidth: 2,
        pointBackgroundColor: '#00ff41',
        pointBorderColor: '#00ff41',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#00ff41'
      }
    ]
  };

  // Data for the bar chart - Top skills from all categories
  const topSkills = [
    { name: 'Python', level: 95 },
    { name: 'SQL', level: 90 },
    { name: 'AWS', level: 90 },
    { name: 'Power BI', level: 95 },
    { name: 'PostgreSQL', level: 92 },
    { name: 'Apache Spark', level: 90 }
  ];

  const barData = {
    labels: topSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Proficiency Level',
        data: topSkills.map(skill => skill.level),
        backgroundColor: [
          'rgba(0, 255, 65, 0.8)',
          'rgba(0, 255, 65, 0.7)',
          'rgba(0, 255, 65, 0.6)',
          'rgba(0, 255, 65, 0.5)',
          'rgba(0, 255, 65, 0.4)',
          'rgba(0, 255, 65, 0.3)'
        ],
        borderColor: '#00ff41',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#cccccc',
        borderColor: '#00ff41',
        borderWidth: 1
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          display: false
        },
        grid: {
          color: 'rgba(0, 255, 65, 0.2)'
        },
        angleLines: {
          color: 'rgba(0, 255, 65, 0.2)'
        },
        pointLabels: {
          color: '#cccccc',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 255, 65, 0.1)'
        },
        ticks: {
          color: '#cccccc',
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#cccccc',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Chart Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-light mb-2">
          <span className="text-secondary">Skills Overview</span>
        </h3>
        <p className="text-gray">
          Technical proficiency across different domains
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="
            bg-dark/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6
            hover:border-primary/30 transition-all duration-300
          "
        >
          <h4 className="text-lg font-semibold text-light mb-4 text-center">
            Skills by Category
          </h4>
          <div className="h-80">
            <Radar data={radarData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="
            bg-dark/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6
            hover:border-primary/30 transition-all duration-300
          "
        >
          <h4 className="text-lg font-semibold text-light mb-4 text-center">
            Top Technologies
          </h4>
          <div className="h-80">
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="bg-dark/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-light mb-4">
            <span className="text-secondary">Skills Summary</span>
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(Object.values(skills.data_engineering).reduce((a, b) => a + b, 0) / Object.keys(skills.data_engineering).length)}%
              </div>
              <div className="text-sm text-gray">Data Engineering</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(Object.values(skills.cloud_platforms).reduce((a, b) => a + b, 0) / Object.keys(skills.cloud_platforms).length)}%
              </div>
              <div className="text-sm text-gray">Cloud Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(Object.values(skills.data_storage).reduce((a, b) => a + b, 0) / Object.keys(skills.data_storage).length)}%
              </div>
              <div className="text-sm text-gray">Data Storage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(Object.values(skills.bi_visualization).reduce((a, b) => a + b, 0) / Object.keys(skills.bi_visualization).length)}%
              </div>
              <div className="text-sm text-gray">Analytics & BI</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}