'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Database, Cloud, BarChart3, Brain } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const { projects } = portfolioConfig;
  const [activeFilter, setActiveFilter] = useState('all');

  const projectCategories = [
    { id: 'all', label: t('filters.all'), icon: Database },
    { id: 'data-engineering', label: t('filters.dataEngineering'), icon: Database },
    { id: 'cloud', label: t('filters.cloud'), icon: Cloud },
    { id: 'analytics', label: t('filters.analytics'), icon: BarChart3 },
    { id: 'machine-learning', label: t('filters.machineLearning'), icon: Brain }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
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

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {projectCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300
                  ${activeFilter === category.id
                    ? 'border-primary bg-primary/20 text-primary shadow-lg shadow-primary/20'
                    : 'border-primary/20 text-gray hover:border-primary/40 hover:text-primary hover:bg-primary/5'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="
                bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden
                hover:border-primary/40 transition-all duration-300 hover:bg-primary/5
                group cursor-pointer
              "
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database className="w-16 h-16 text-primary/50 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-light mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + techIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="
                          px-2 py-1 bg-primary/10 text-primary text-xs rounded
                          border border-primary/20 hover:bg-primary/20 transition-all duration-300
                          cursor-default
                        "
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Results & Impact */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray">Results:</span>
                    <span className="text-primary font-medium">{project.results}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray">Impact:</span>
                    <span className="text-secondary font-medium">{project.impact}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      flex-1 flex items-center justify-center gap-2 px-4 py-2
                      bg-primary/10 text-primary border border-primary/20 rounded
                      hover:bg-primary/20 hover:border-primary/40 transition-all duration-300
                      text-sm font-medium
                    "
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('viewDetails')}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded
                      hover:bg-secondary/20 hover:border-secondary/40 transition-all duration-300
                      text-sm font-medium
                    "
                  >
                    <Github className="w-4 h-4" />
                    {t('viewCode')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}