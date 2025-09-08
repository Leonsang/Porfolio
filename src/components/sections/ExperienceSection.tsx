'use client';

import { motion } from 'framer-motion';
import { MapPin, Building, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';

export function ExperienceSection() {
  const t = useTranslations('experience');
  const { experience } = portfolioConfig;

  return (
    <section id="experience" className="py-20 relative">
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

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

          {/* Experience items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-dark z-10"
                  whileHover={{ scale: 1.5, backgroundColor: '#ff6b35' }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div
                    className="
                      bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6
                      hover:border-primary/40 transition-all duration-300
                      hover:bg-primary/5
                    "
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-light mb-1 group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-gray text-sm mb-2">
                          <Building className="w-4 h-4 text-primary mr-2" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-primary font-medium">{exp.period}</div>
                        <div className="text-xs text-gray">Full-time</div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray text-sm mb-4">
                      <MapPin className="w-4 h-4 text-primary mr-2" />
                      {exp.location}
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 + achievementIndex * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                          className="flex items-start group cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0 group-hover:text-secondary transition-colors duration-300" />
                          <span className="text-gray text-sm leading-relaxed group-hover:text-light transition-colors duration-300">
                            {achievement}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'SQL', 'AWS', 'Apache Spark', 'Power BI'].map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + techIndex * 0.05 }}
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
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-light mb-8">
            <span className="text-secondary">Experience Highlights</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '5+', label: 'Years of Experience' },
              { value: '3', label: 'Companies Worked' },
              { value: '15+', label: 'Major Projects' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center cursor-pointer group"
              >
                <div className="text-3xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray group-hover:text-light transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}