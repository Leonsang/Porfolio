'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';
import { CVDownloadModal } from '@/components/modals/CVDownloadModal';
import { TrendingUp, Target, Database, Settings, BarChart, GitBranch, Zap, Activity, Brain, Layers, FileText, Clock, Users, Award, CheckCircle } from 'lucide-react';

// Contextual Key Performance Component
interface KeyPerformanceSliderProps {
  stats: {
    data_pipelines_built: number;
    years_experience: number;
    projects_completed: number;
    technologies_mastered: number;
  };
  achievements: {
    performance_metrics: {
      data_processing_tb?: string;
      uptime_percentage?: string;
      query_optimization?: string;
      data_quality?: string;
      batch_processing?: string;
      error_reduction?: string;
      automation_processes?: string;
      time_saved?: string;
      cost_reduction?: string;
      dashboards_created?: string;
      user_adoption?: string;
      insights_delivered?: string;
    };
  };
  currentTitleIndex?: number;
}

function KeyPerformanceSlider({ stats, achievements, currentTitleIndex = 0 }: KeyPerformanceSliderProps) {

  // Define contextual metrics for each professional title
  const contextualMetrics = {
    0: { // Data Engineer
      title: "Data Engineering",
      color: "primary",
      metrics: [
        { value: stats.data_pipelines_built, label: 'Data Pipelines Built', icon: Database, description: 'Production-ready pipelines' },
        { value: `${achievements.performance_metrics.data_processing_tb || '50+'}TB`, label: 'Data Processed', icon: Activity, description: 'Monthly data volume' },
        { value: stats.years_experience, label: 'Years Experience', icon: TrendingUp, description: 'Industry expertise' },
        { value: `${achievements.performance_metrics.uptime_percentage || '99.9'}%`, label: 'System Uptime', icon: CheckCircle, description: 'Reliability achieved' }
      ]
    },
    1: { // Data Modeler
      title: "Data Modeling",
      color: "secondary",
      metrics: [
        { value: `${stats.technologies_mastered || 15}+`, label: 'Data Models Built', icon: Layers, description: 'Schema designs' },
        { value: `${achievements.performance_metrics.query_optimization || '80'}%`, label: 'Query Optimization', icon: Zap, description: 'Performance improvement' },
        { value: stats.projects_completed, label: 'Projects Completed', icon: Target, description: 'Successful deliveries' },
        { value: `${achievements.performance_metrics.data_quality || '98'}%`, label: 'Data Quality Score', icon: Award, description: 'Accuracy maintained' }
      ]
    },
    2: { // ETL Developer
      title: "ETL Development",
      color: "accent",
      metrics: [
        { value: stats.data_pipelines_built, label: 'ETL Processes Built', icon: GitBranch, description: 'Data transformation flows' },
        { value: `${achievements.performance_metrics.batch_processing || '1M+'}`, label: 'Records/Hour', icon: Clock, description: 'Processing capacity' },
        { value: `${achievements.performance_metrics.error_reduction || '95'}%`, label: 'Error Reduction', icon: CheckCircle, description: 'Quality improvement' },
        { value: stats.technologies_mastered, label: 'ETL Tools Mastered', icon: Settings, description: 'Technical expertise' }
      ]
    },
    3: { // Data Automation Specialist
      title: "Data Automation",
      color: "primary",
      metrics: [
        { value: `${achievements.performance_metrics.automation_processes || '25+'}`, label: 'Automated Processes', icon: Zap, description: 'Workflow automation' },
        { value: `${achievements.performance_metrics.time_saved || '60'}%`, label: 'Time Saved', icon: Clock, description: 'Efficiency gains' },
        { value: stats.projects_completed, label: 'Automation Projects', icon: Target, description: 'Successful implementations' },
        { value: `${achievements.performance_metrics.cost_reduction || '40'}%`, label: 'Cost Reduction', icon: TrendingUp, description: 'Operational savings' }
      ]
    },
    4: { // Analytics Developer
      title: "Analytics Development",
      color: "secondary",
      metrics: [
        { value: `${achievements.performance_metrics.dashboards_created || '30+'}`, label: 'Dashboards Created', icon: BarChart, description: 'Business intelligence' },
        { value: stats.projects_completed, label: 'Analytics Projects', icon: Brain, description: 'Insight generation' },
        { value: `${achievements.performance_metrics.user_adoption || '85'}%`, label: 'User Adoption', icon: Users, description: 'Solution acceptance' },
        { value: `${achievements.performance_metrics.insights_delivered || '100+'}`, label: 'Insights Delivered', icon: FileText, description: 'Actionable recommendations' }
      ]
    }
  };

  const currentContext = contextualMetrics[currentTitleIndex as keyof typeof contextualMetrics] || contextualMetrics[0];
  const contextMetrics = currentContext.metrics.slice(0, 4); // Max 4 metrics


  return (
    <div className="relative">
      {/* Contextual Title - Compact */}
      <motion.div
        key={currentTitleIndex}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h3 className={`text-lg font-semibold text-center text-${currentContext.color} mb-3`}>
          {currentContext.title} Metrics
        </h3>
      </motion.div>

      {/* Contextual Metrics Display - Clean & Minimalist */}
      <div className="flex flex-col">
        {contextMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isLast = index === contextMetrics.length - 1;
          return (
            <div key={`${currentTitleIndex}-${index}`}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 2 }}
                className={`
                  group cursor-pointer py-3 px-2 bg-transparent 
                  hover:bg-${currentContext.color}/5 transition-all duration-300
                  min-h-[65px] flex items-center relative
                `}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`
                      p-1.5 rounded-lg bg-${currentContext.color}/8 
                      group-hover:bg-${currentContext.color}/15 transition-colors duration-300
                      flex-shrink-0
                    `}>
                      <Icon className={`w-4 h-4 text-${currentContext.color} group-hover:text-accent transition-colors duration-300`} />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-xs text-light group-hover:text-light transition-colors duration-300 font-medium truncate">
                        {metric.label}
                      </div>
                      <div className="text-xs text-gray/60 group-hover:text-gray/80 transition-colors duration-300 mt-0.5 truncate">
                        {metric.description}
                      </div>
                    </div>
                  </div>
                  <div className={`
                    text-xl font-bold text-${currentContext.color} 
                    group-hover:text-accent transition-colors duration-300 text-right
                    flex-shrink-0 ml-2
                  `}>
                    {metric.value}
                  </div>
                </div>
              </motion.div>
              
              {/* Separator Line - Only between items, not after last */}
              {!isLast && (
                <motion.div 
                  className={`h-px bg-gradient-to-r from-transparent via-${currentContext.color}/20 to-transparent mx-2`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Context Indicator - Smaller & Elegant */}
      <motion.div
        className="flex justify-center mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex gap-1">
          {Object.keys(contextualMetrics).map((_, index) => (
            <motion.div
              key={index}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                ${currentTitleIndex === index ? `bg-${currentContext.color} scale-125` : 'bg-gray/25 hover:bg-gray/40'}
              `}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations('hero');
  const { stats, achievements } = portfolioConfig;
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Sync with title changes - create our own title slider logic
  const titles = t.raw('dynamicTitles') as string[];
  const descriptions = t.raw('dynamicDescriptions') as string[];

  useEffect(() => {
    if (!titles?.length) return;

    const timer = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => 
        prevIndex === titles.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Match DynamicTitleSlider interval

    return () => clearInterval(timer);
  }, [titles?.length]);

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28">
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
                {/* Custom synchronized title slider */}
                <div className="max-w-2xl mx-auto lg:mx-0 mb-8">
                  <motion.div
                    key={currentTitleIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                  >
                    {/* Title text */}
                    <motion.h2
                      className="relative text-xl md:text-2xl lg:text-3xl font-semibold text-left mb-3 text-secondary"
                    >
                      {titles[currentTitleIndex]}
                    </motion.h2>
                    
                    {/* Description text */}
                    <motion.p
                      className="relative text-lg text-gray max-w-2xl leading-relaxed font-light"
                    >
                      {descriptions[currentTitleIndex]}
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* View Resume Button - Moved to better location */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex justify-center lg:justify-start"
                >
                  <motion.button 
                    onClick={() => setIsCVModalOpen(true)}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(0, 255, 65, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary group relative overflow-hidden min-w-[140px] inline-flex items-center gap-3 px-6 py-3 border-2 border-primary rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 bg-primary text-dark hover:bg-transparent hover:text-primary"
                  >
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                    
                    {/* Icon with enhanced animation */}
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Download className="w-4 h-4 group-hover:animate-pulse relative z-10" />
                    </motion.div>
                    
                    {/* Text with glow effect */}
                    <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all duration-300">
                      View Resume
                    </span>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-primary/50 opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.1, 1.2],
                        opacity: [0.5, 0.3, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                  </motion.button>
                </motion.div>
          </motion.div>
            </div>

            {/* Hero Stats - Right Column (Key Performance Metrics Slider) */}
            <div className="mt-4 lg:mt-8">
              <KeyPerformanceSlider 
                stats={stats} 
                achievements={achievements} 
                currentTitleIndex={currentTitleIndex}
              />
            </div>
          </div>


          {/* Key Areas of Expertise - 3 Columns Rotating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-light text-center mb-8">
              <span className="text-accent">Key Areas of Expertise</span>
            </h3>
            
            {/* 3 Columns Rotating Expertise */}
            <div className="max-w-6xl mx-auto">
              <motion.div
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Show 3 expertise areas based on current title index */}
                {(() => {
                  const expertiseAreasFromTranslations = t.raw('expertise') as Array<{title: string, description: string, icon: string}>;
                  const expertiseAreas = expertiseAreasFromTranslations || [
                    {
                      title: "Data Engineering Excellence",
                      description: "Strong experience building ETL pipelines, data warehouses, and automated data workflows using Python, SQL, and modern data stack tools.",
                      icon: "⚙️"
                    },
                    {
                      title: "Cloud Platform Fundamentals", 
                      description: "Working knowledge of AWS and Azure services with hands-on experience in basic cloud storage, compute, and database solutions.",
                      icon: "☁️"
                    },
                    {
                      title: "Analytics & BI Development",
                      description: "Practical experience creating dashboards and reports using Power BI, with skills in data visualization and business intelligence implementation.",
                      icon: "📊"
                    },
                    {
                      title: "Machine Learning Implementation",
                      description: "Applied experience integrating ML models into data pipelines, with familiarity in Python ML libraries and basic model deployment.",
                      icon: "🤖"
                    },
                    {
                      title: "Data Quality & Governance",
                      description: "Hands-on experience implementing data validation, quality checks, and documentation practices in real-world data projects.",
                      icon: "🛡️"
                    },
                    {
                      title: "Automation & Basic DevOps",
                      description: "Working knowledge of CI/CD tools, basic containerization with Docker, and automation scripting for data workflows.",
                      icon: "🔄"
                    }
                  ];
                  
                  // Show 3 consecutive areas starting from current index
                  const startIndex = currentTitleIndex % expertiseAreas.length;
                  const displayAreas = [];
                  for (let i = 0; i < 3; i++) {
                    displayAreas.push(expertiseAreas[(startIndex + i) % expertiseAreas.length]);
                  }
                  
                  return displayAreas.map((expertise, index) => (
                    <motion.div
                      key={`${currentTitleIndex}-${index}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  ));
                })()}
              </motion.div>

              {/* Expertise Indicators - Show rotation progress */}
              <motion.div
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <motion.div
                      key={index}
                      className={`
                        w-1.5 h-1.5 rounded-full transition-all duration-300
                        ${currentTitleIndex === index ? 'bg-accent scale-125' : 'bg-gray/25 hover:bg-gray/40'}
                      `}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional space for visual balance */}
          <div className="mt-16"></div>


        </div>
        

      </motion.div>

      {/* Enhanced floating particles */}
      {[...Array(20)].map((_, i) => {
        // Predefined deterministic values to avoid hydration mismatch
        const particlePositions = [
          { left: 12.5, top: 18.3, duration: 4.2, delay: 0.8 },
          { left: 78.9, top: 34.7, duration: 3.6, delay: 1.5 },
          { left: 45.2, top: 67.1, duration: 4.8, delay: 0.3 },
          { left: 89.6, top: 23.9, duration: 3.9, delay: 1.2 },
          { left: 23.4, top: 78.5, duration: 4.1, delay: 0.7 },
          { left: 67.8, top: 45.2, duration: 3.4, delay: 1.8 },
          { left: 34.1, top: 89.7, duration: 4.5, delay: 0.2 },
          { left: 91.3, top: 12.6, duration: 3.7, delay: 1.4 },
          { left: 56.7, top: 56.8, duration: 4.3, delay: 0.9 },
          { left: 18.9, top: 73.4, duration: 3.8, delay: 1.1 },
          { left: 73.2, top: 29.1, duration: 4.0, delay: 0.6 },
          { left: 41.5, top: 84.3, duration: 3.5, delay: 1.7 },
          { left: 85.7, top: 41.9, duration: 4.4, delay: 0.4 },
          { left: 29.8, top: 67.6, duration: 3.3, delay: 1.3 },
          { left: 62.4, top: 15.8, duration: 4.7, delay: 0.1 },
          { left: 15.6, top: 92.2, duration: 3.2, delay: 1.6 },
          { left: 76.3, top: 38.5, duration: 4.6, delay: 0.5 },
          { left: 48.1, top: 71.7, duration: 3.1, delay: 1.9 },
          { left: 92.7, top: 26.3, duration: 4.9, delay: 0.0 },
          { left: 37.9, top: 83.1, duration: 3.0, delay: 1.0 }
        ];
        const particle = particlePositions[i % particlePositions.length];
        
        return (
          <motion.div 
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: particle.delay
            }}
          />
        );
      })}
      
      {/* CV Download Modal */}
      <CVDownloadModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </section>
  );
}