'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';
import { CVDownloadModal } from '@/components/modals/CVDownloadModal';
import { DynamicTitleSlider } from '@/components/ui/DynamicTitleSlider';


export function HeroSection() {
  const t = useTranslations('hero');
  const { stats, achievements } = portfolioConfig;
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);





  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(0, 255, 65, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(0, 255, 65, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(78, 205, 196, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Mouse-following gradient */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 100
          }}
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 65, 0.3) 0%, transparent 70%)'
          }}
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Header with Legacy-inspired Layout */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center mb-12">
            {/* Hero Info - Left Column */}
            <div className="text-center lg:text-left">
              {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4"
            >
                <span className="text-lg text-light font-medium tracking-wide">{t('greeting')}</span>
            </motion.div>

              {/* Main heading with legacy pixel text style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block font-mono relative">
                {t('name')}
                    {/* Pixel glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
              </span>
            </h1>
            </motion.div>

              {/* Dynamic title with legacy styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6"
            >
                <DynamicTitleSlider className="max-w-2xl mx-auto lg:mx-0 mb-6" />
          </motion.div>
            </div>

            {/* Hero Stats - Right Column (Legacy Style) */}
            <div className="flex flex-col gap-4">
              {[
                { value: stats.years_experience, label: 'Years Experience', icon: '📊' },
                { value: stats.projects_completed, label: 'Projects Completed', icon: '🚀' },
                { value: stats.data_pipelines_built, label: 'Data Pipelines Built', icon: '⚡' },
                { value: stats.technologies_mastered, label: 'Technologies Mastered', icon: '💻' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer p-4 rounded-xl bg-gradient-to-br from-dark/50 to-dark/30 backdrop-blur-md border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 text-center min-w-[120px] relative overflow-hidden"
                >
                  <motion.div
                    className="text-2xl mb-2"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-2xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300 relative">
                    {stat.value}
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 text-primary/20 blur-sm"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                  {stat.value}
                    </motion.div>
                </div>
                  <div className="text-xs text-gray group-hover:text-light transition-colors duration-300 font-medium">
                  {stat.label}
                      </div>
                </motion.div>
              ))}
                    </div>
          </div>

          {/* Performance Metrics Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-light text-center mb-8">
              <span className="text-secondary">Performance Metrics</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {Object.entries(achievements.performance_metrics).map(([metric, value], index) => (
                <motion.div
                  key={metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer p-4 rounded-xl bg-gradient-to-br from-dark/50 to-dark/30 backdrop-blur-md border-2 border-secondary/30 hover:border-secondary/60 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/20 text-center"
                >
                  <div className="text-2xl font-bold text-secondary mb-2 group-hover:text-accent transition-colors duration-300">
                    {value}
                  </div>
                  <div className="text-xs text-gray group-hover:text-light transition-colors duration-300 font-medium">
                    {metric}
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>

          {/* Key Areas of Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-light text-center mb-8">
              <span className="text-accent">Key Areas of Expertise</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Data Engineering Excellence",
                  description: "Specialized in building scalable data pipelines, ETL processes, and data warehouses using modern cloud technologies.",
                  icon: "⚙️"
                },
                {
                  title: "Cloud Platform Expertise", 
                  description: "Proficient in AWS, Azure, and GCP with hands-on experience in serverless architectures and cloud-native solutions.",
                  icon: "☁️"
                },
                {
                  title: "Analytics & BI",
                  description: "Expert in creating business intelligence dashboards and implementing data visualization solutions using Power BI, Tableau, and custom tools.",
                  icon: "📊"
                }
              ].map((expertise, index) => (
                <motion.div
                  key={expertise.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group cursor-pointer p-6 rounded-xl bg-gradient-to-br from-dark/50 to-dark/30 backdrop-blur-md border-2 border-accent/30 hover:border-accent/60 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20"
                >
                  <div className="text-3xl mb-4 text-center">{expertise.icon}</div>
                  <h4 className="text-lg font-semibold text-light mb-3 group-hover:text-accent transition-colors duration-300 text-center">
                    {expertise.title}
                  </h4>
                  <p className="text-gray text-sm leading-relaxed group-hover:text-light transition-colors duration-300 text-center">
                    {expertise.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons and Social Links - Legacy Style */}
          <div className="text-center space-y-8">
            {/* CTA Buttons with Legacy Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
                onClick={() => setIsCVModalOpen(true)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary group relative overflow-hidden min-w-[140px]"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  border: '2px solid var(--primary-color)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-secondary)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  textDecoration: 'none',
                  textAlign: 'center',
                  background: 'var(--primary-color)',
                  color: 'var(--dark-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--primary-color)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 65, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--primary-color)';
                  e.currentTarget.style.color = 'var(--dark-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                <span>View Resume</span>
            </motion.button>
            

          </motion.div>


          </div>


        </div>
        

      </motion.div>

      {/* Enhanced floating particles */}
      {[...Array(20)].map((_, i) => (
      <motion.div 
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
        }}
        transition={{ 
            duration: 3 + Math.random() * 2,
          repeat: Infinity, 
            ease: 'easeInOut',
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* CV Download Modal */}
      <CVDownloadModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </section>
  );
}