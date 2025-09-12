'use client';

import { motion } from 'framer-motion';
import { Database, Cloud, Code, BarChart3, Wrench, Brain } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SkillsChart } from '../charts/SkillsChart';
import { portfolioConfig } from '@/config/portfolio';

export function TechnicalSection() {
  const t = useTranslations('technical');
  const { skills } = portfolioConfig;

  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: [
        { name: 'Python', level: 95 },
        { name: 'SQL', level: 90 },
        { name: 'R', level: 80 },
        { name: 'Scala', level: 75 },
        { name: 'Java', level: 70 }
      ]
    },
    {
      icon: Database,
      title: "Databases & Storage",
      skills: Object.entries(skills.data_storage).map(([name, level]) => ({ name, level }))
    },
    {
      icon: Cloud,
      title: "Cloud Platforms",
      skills: Object.entries(skills.cloud_platforms).map(([name, level]) => ({ name, level }))
    },
    {
      icon: Wrench,
      title: "Data Engineering Tools",
      skills: [
        { name: 'Apache Spark', level: 90 },
        { name: 'Airflow', level: 85 },
        { name: 'Kafka', level: 80 },
        { name: 'Elasticsearch', level: 75 },
        { name: 'Terraform', level: 70 }
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & BI",
      skills: Object.entries(skills.bi_visualization).map(([name, level]) => ({ name, level }))
    },
    {
      icon: Brain,
      title: "Machine Learning",
      skills: [
        { name: 'Scikit-learn', level: 85 },
        { name: 'TensorFlow', level: 75 },
        { name: 'PyTorch', level: 70 },
        { name: 'MLflow', level: 80 },
        { name: 'Kubeflow', level: 65 }
      ]
    }
  ];


  return (
    <section id="technical" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </motion.div>

        {/* Skills Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SkillsChart />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="
                  bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6
                  hover:border-primary/40 transition-all duration-300 cursor-pointer group
                "
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-light group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray group-hover:text-light transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="text-primary group-hover:text-secondary transition-colors duration-300">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-dark/50 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}