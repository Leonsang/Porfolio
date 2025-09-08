'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function CertificationsSection() {
  const t = useTranslations('certifications');
  const [activeCategory, setActiveCategory] = useState('all');

  const certifications = [
    {
      id: 'datacamp-de-sql',
      title: 'Associate Data Engineer in SQL',
      issuer: 'DataCamp (DE101)',
      category: 'data-platform',
      level: 'Associate',
      year: '2024',
      expiryYear: null,
      credentialId: 'DE101-2024',
      description: 'Comprehensive certification covering database design principles, ETL process implementation, data quality frameworks, and advanced data visualization techniques.',
      skills: [
        'Database design principles',
        'ETL process implementation',
        'Data quality frameworks',
        'Advanced data visualization'
      ],
      verificationUrl: 'https://datacamp.com/certificate/DE101',
      badgeUrl: '/api/placeholder/200/200',
      status: 'active'
    },
    {
      id: 'datacamp-de-python',
      title: 'Data Engineer in Python',
      issuer: 'DataCamp (DE201)',
      category: 'data-platform',
      level: 'Professional',
      year: '2024',
      expiryYear: null,
      credentialId: 'DE201-2024',
      description: 'Advanced certification in cloud-native data engineering tools, scalable pipeline architecture, and production-grade code implementation practices.',
      skills: [
        'Cloud-native data engineering',
        'Scalable pipeline architecture',
        'Production-grade code implementation',
        'Python data processing'
      ],
      verificationUrl: 'https://datacamp.com/certificate/DE201',
      badgeUrl: '/api/placeholder/200/200',
      status: 'active'
    },
    {
      id: 'datacamp-sql',
      title: 'SQL Associate',
      issuer: 'DataCamp',
      category: 'data-platform',
      level: 'Associate',
      year: '2024',
      expiryYear: null,
      credentialId: 'SQL-ASSOC-2024',
      description: 'Specialized certification in complex query optimization, performance tuning, and enterprise database architecture design.',
      skills: [
        'Complex query optimization',
        'Performance tuning',
        'Enterprise database architecture',
        'Advanced SQL techniques'
      ],
      verificationUrl: 'https://datacamp.com/certificate/SQL',
      badgeUrl: '/api/placeholder/200/200',
      status: 'active'
    },
    {
      id: 'scrum-fundamentals',
      title: 'Scrum Fundamentals Certified (SFC™)',
      issuer: 'SCRUMstudy',
      category: 'analytics',
      level: 'Fundamentals',
      year: '2024',
      expiryYear: null,
      credentialId: 'SFC-2024',
      description: 'Agile methodologies and project management certification covering Scrum framework fundamentals.',
      skills: [
        'Agile methodologies',
        'Scrum framework',
        'Project management',
        'Team collaboration'
      ],
      verificationUrl: 'https://scrumstudy.com/certification/verify',
      badgeUrl: '/api/placeholder/200/200',
      status: 'active'
    },
    {
      id: 'multiple-tech-certs',
      title: 'Python + SQL + Power BI (7 certifications)',
      issuer: 'LinkedIn Learning, SoloLearn, ProgrammingHub',
      category: 'analytics',
      level: 'Multiple',
      year: '2024',
      expiryYear: null,
      credentialId: 'MULTI-TECH-2024',
      description: 'Comprehensive collection of certifications covering advanced programming methodologies and business intelligence tool mastery.',
      skills: [
        'Python programming',
        'Advanced SQL',
        'Power BI development',
        'Business intelligence'
      ],
      verificationUrl: 'https://linkedin.com/learning/certificates',
      badgeUrl: '/api/placeholder/200/200',
      status: 'active'
    }
  ];

  const categories = [
    { id: 'all', label: t('filters.all') },
    { id: 'cloud', label: t('filters.cloud') },
    { id: 'data-platform', label: t('filters.dataPlatform') },
    { id: 'analytics', label: t('filters.analytics') }
  ];

  const filteredCertifications = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'expiring-soon': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'expired': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray bg-gray/10 border-gray/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('status.active');
      case 'expiring-soon': return t('status.expiringSoon');
      case 'expired': return t('status.expired');
      default: return status;
    }
  };

  return (
    <section id="certifications" className="py-20 relative">
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
          <p>{t('subtitle')}</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-2 rounded-full border transition-all duration-300
                ${
                  activeCategory === category.id
                    ? 'bg-primary text-dark border-primary'
                    : 'bg-transparent text-gray border-primary/30 hover:border-primary hover:text-primary'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="
                bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6
                hover:border-primary/40 transition-all duration-300 group
              "
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(cert.status)}`}>
                      {getStatusText(cert.status)}
                    </span>
                  </div>
                </div>
                <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                  {cert.level}
                </span>
              </div>

              {/* Title and Issuer */}
              <h3 className="text-lg font-bold text-light mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-secondary font-medium mb-2">{cert.issuer}</p>
              <p className="text-gray text-sm mb-4 leading-relaxed">
                {cert.description}
              </p>

              {/* Date Info */}
              <div className="flex items-center text-sm text-gray mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{cert.year} - {cert.expiryYear}</span>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-light font-semibold text-sm mb-2">{t('skills')}:</h4>
                <ul className="space-y-1">
                  {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-xs text-gray flex items-start">
                      <CheckCircle className="w-3 h-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                  {cert.skills.length > 3 && (
                    <li className="text-xs text-gray">
                      +{cert.skills.length - 3} {t('moreSkills')}
                    </li>
                  )}
                </ul>
              </div>

              {/* Credential ID */}
              <div className="mb-4">
                <span className="text-xs text-gray">
                  {t('credentialId')}: {cert.credentialId}
                </span>
              </div>

              {/* Verification Link */}
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center text-sm text-primary hover:text-secondary
                  transition-colors duration-200
                "
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('verify')}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {certifications.length}
              </div>
              <div className="text-gray text-sm">{t('stats.total')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {certifications.filter(c => c.status === 'active').length}
              </div>
              <div className="text-gray text-sm">{t('stats.active')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {certifications.filter(c => c.level === 'Professional').length}
              </div>
              <div className="text-gray text-sm">{t('stats.professional')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(certifications.map(c => c.issuer)).size}
              </div>
              <div className="text-gray text-sm">{t('stats.providers')}</div>
            </div>
          </div>
        </motion.div>

        {/* Extra spacing for better visual separation before Contact section */}
        <div className="mt-32"></div>
      </div>
    </section>
  );
}