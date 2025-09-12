'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, GraduationCap, Users, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function AboutSection() {
  const t = useTranslations('about');
  const { personal } = portfolioConfig;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

  // Auto-play slides (paused when dropdown is open)
  useEffect(() => {
    if (isDropdownOpen) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4); // 4 slides total
    }, 8000); // 8 seconds per slide

    return () => clearInterval(timer);
  }, [isDropdownOpen]);

  // Auto-rotate interests carousel with pause on hover
  const [isInterestsPaused, setIsInterestsPaused] = useState(false);
  
  useEffect(() => {
    if (!isInterestsPaused) {
      const interval = setInterval(() => {
        setCurrentInterestIndex((prev) => (prev + 1) % 8);
      }, 4000); // Change every 4 seconds
      return () => clearInterval(interval);
    }
  }, [isInterestsPaused]);


  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setIsDropdownOpen(false);
  };

  // Universal About Me content that works naturally for all audiences
  const slides = [
    {
      id: 'my-approach',
      title: t('myApproach.title'),
      content: t('myApproach.content'),
      gradient: 'from-primary/10 to-primary/5',
      accent: 'primary',
      icon: '🎯'
    },
    {
      id: 'technical-expertise',
      title: t('technicalExpertise.title'),
      content: t('technicalExpertise.content'),
      gradient: 'from-secondary/10 to-secondary/5',
      accent: 'secondary',
      icon: '⚡'
    },
    {
      id: 'business-impact',
      title: t('businessImpact.title'),
      content: t('businessImpact.content'),
      gradient: 'from-accent/10 to-accent/5',
      accent: 'accent',
      icon: '📈'
    },
    {
      id: 'impact-vision',
      title: t('impactVision.title'),
      content: t('impactVision.content'),
      gradient: 'from-primary/10 to-primary/5',
      accent: 'primary',
      icon: '🚀'
    }
  ];

  // Personal interests data for behind engineer slide - enhanced with images
  const personalInterests = [
    {
      emoji: '🐕',
      label: t('behindEngineer.interests.dogs'),
      description: t('behindEngineer.interests.dogsDesc'),
      gradient: 'from-red-500/20 to-pink-500/20',
      accent: 'text-red-400',
      image: '/images/BehindEngineer/Dogs.jpg'
    },
    {
      emoji: '🏠',
      label: t('behindEngineer.interests.travel'),
      description: t('behindEngineer.interests.travelDesc'),
      gradient: 'from-blue-500/20 to-cyan-500/20',
      accent: 'text-blue-400'
    },
    {
      emoji: '🏍️',
      label: t('behindEngineer.interests.motorcycles'),
      description: t('behindEngineer.interests.motorcyclesDesc'),
      gradient: 'from-orange-500/20 to-yellow-500/20',
      accent: 'text-orange-400',
      image: '/images/BehindEngineer/Moto.gif'
    },
    {
      emoji: '☕',
      label: t('behindEngineer.interests.coffee'),
      description: t('behindEngineer.interests.coffeeDesc'),
      gradient: 'from-amber-500/20 to-orange-500/20',
      accent: 'text-amber-400',
      image: '/images/BehindEngineer/Tobby.jpg'
    },
    {
      emoji: '🎮',
      label: t('behindEngineer.interests.gaming'),
      description: t('behindEngineer.interests.gamingDesc'),
      gradient: 'from-purple-500/20 to-indigo-500/20',
      accent: 'text-purple-400',
      image: '/images/BehindEngineer/Video Games.gif'
    },
    {
      emoji: '📚',
      label: t('behindEngineer.interests.books'),
      description: t('behindEngineer.interests.booksDesc'),
      gradient: 'from-green-500/20 to-emerald-500/20',
      accent: 'text-green-400'
    },
    {
      emoji: '👨‍🏫',
      label: t('behindEngineer.interests.teaching'),
      description: t('behindEngineer.interests.teachingDesc'),
      gradient: 'from-indigo-500/20 to-purple-500/20',
      accent: 'text-indigo-400'
    }
  ];



  return (
    <section id="about" className="py-20 relative">
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

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Background decoration */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl -z-10"
          />
          {/* Left Column - Interactive Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header-style Navigation Tabs */}
            <div 
              className="relative mb-8"
              role="tablist"
              aria-label="About section navigation"
            >
              {/* Header-style gradient line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent opacity-70 rounded-full" />
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4">
                {slides.map((slide, index) => (
                  <motion.button
                    key={index}
                    onClick={() => selectSlide(index)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Navigate to ${slide.title} section`}
                    role="tab"
                    aria-selected={currentSlide === index}
                    tabIndex={currentSlide === index ? 0 : -1}
                    className={`
                      relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm overflow-hidden backdrop-blur-sm
                      ${currentSlide === index 
                        ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20' 
                        : 'bg-dark/30 text-gray hover:text-light hover:bg-dark/50 hover:shadow-md'
                      }
                    `}
                  >
                    {/* Active slide indicator with header-style gradient */}
                    {currentSlide === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-accent/10 rounded-lg"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Title with gradient text like header */}
                    <span className={`relative z-10 hidden sm:inline transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold' 
                        : ''
                    }`}>
                      {slide.title}
                    </span>
                    <span className={`relative z-10 sm:hidden transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold' 
                        : ''
                    }`}>
                      {slide.title.split(' ')[0]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>



            {/* Interactive Slides Content - Redesigned */}
            <div className="relative min-h-[400px] sm:min-h-[450px]" role="tabpanel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* All slides - Clean content layout */}
                  <motion.div 
                    className={`bg-gradient-to-br ${slides[currentSlide].gradient} backdrop-blur-sm rounded-xl p-6 h-full flex flex-col justify-center`}
                  >
                    <div className="space-y-6">
                      {/* Content intro without duplicate title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                      />

                      {/* Content with Enhanced Formatting */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="text-gray text-sm leading-relaxed space-y-4"
                      >
                        {slides[currentSlide].content?.split('\n').map((paragraph, index) => {
                          // Handle bullet points
                          if (paragraph.trim().startsWith('•')) {
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                                className="flex items-start gap-3 hover:text-light transition-colors duration-300 pl-2"
                              >
                                <span className={`text-${slides[currentSlide].accent} font-bold`}>•</span>
                                <span dangerouslySetInnerHTML={{ __html: paragraph.replace('•', '').trim().replace(/\*\*(.*?)\*\*/g, '<strong class="text-light">$1</strong>') }} />
                              </motion.div>
                            );
                          }
                          // Handle bold sections
                          else if (paragraph.includes('**')) {
                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                                className="hover:text-light transition-colors duration-300"
                                dangerouslySetInnerHTML={{ 
                                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-light">$1</strong>') 
                                }}
                              />
                            );
                          }
                          // Regular paragraphs
                          else if (paragraph.trim()) {
                            return (
                              <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                                className="hover:text-light transition-colors duration-300"
                              >
                                {paragraph}
                              </motion.p>
                            );
                          }
                          return null;
                        })}
                      </motion.div>

                      {/* Decorative element */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className={`w-16 h-1 bg-gradient-to-r from-${slides[currentSlide].accent}/60 to-transparent mx-auto rounded-full`}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Enhanced Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            {/* Enhanced Profile Container */}
            <motion.div
              className="relative w-72 sm:w-80 h-80 sm:h-96 lg:w-96 lg:h-[30rem] perspective-1000"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative w-full h-full transform-style-preserve-3d cursor-pointer group"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Front Side - Enhanced Profile */}
                <motion.div className="absolute inset-0 backface-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-dark/90 via-dark/80 to-dark/70 backdrop-blur-sm border border-primary/30 rounded-3xl p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                    {/* Ambient background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
                      animate={{ 
                        background: [
                          'linear-gradient(135deg, rgba(0,255,65,0.05) 0%, transparent 50%, rgba(78,205,196,0.05) 100%)',
                          'linear-gradient(225deg, rgba(78,205,196,0.05) 0%, transparent 50%, rgba(255,107,53,0.05) 100%)',
                          'linear-gradient(315deg, rgba(255,107,53,0.05) 0%, transparent 50%, rgba(0,255,65,0.05) 100%)'
                        ]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Enhanced Profile Photo Circle */}
                    <motion.div
                      className="relative w-40 sm:w-48 h-40 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-4 sm:mb-6 z-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        filter: "drop-shadow(0 10px 30px rgba(0, 255, 65, 0.2))"
                      }}
                    >
                      {/* Professional photo */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [1, 0, 0, 1],
                          scale: [1, 1.05, 1.05, 1],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src="/images/Pixel.png"
                          alt="Erick Sang Cifuentes - Data Engineer"
                          fill
                          className="object-cover object-center"
                          sizes="224px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/10" />
                      </motion.div>
                      
                      {/* Logo image */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0, 1, 0, 0],
                          scale: [0.95, 1, 1, 0.95],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.5,
                        }}
                      >
                        <Image
                          src="/images/Logo.png"
                          alt="Erick Sang - Pixel Art Logo"
                          fill
                          className="object-contain object-center p-4"
                          sizes="224px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20" />
                      </motion.div>
                      
                      {/* Retro pixel art image */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0, 0, 1, 0],
                          scale: [0.9, 0.9, 1, 0.9],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 5,
                        }}
                      >
                        <Image
                          src="/images/RetroYo.png"
                          alt="Erick Sang - Retro Pixel Art"
                          fill
                          className="object-cover object-center"
                          sizes="224px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-transparent to-primary/20" />
                      </motion.div>
                      
                      {/* Animated border glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(0, 255, 65, 0.3)",
                            "0 0 30px rgba(0, 255, 65, 0.6)",
                            "0 0 0px rgba(0, 255, 65, 0.3)"
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          border: "2px solid rgba(0, 255, 65, 0.3)"
                        }}
                      />
                    </motion.div>
                    
                    {/* Enhanced Front Side Info */}
                    <div className="text-center z-10 relative">
                      <motion.h3 
                        className="text-lg sm:text-xl lg:text-2xl font-bold text-light mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {personal.name}
                      </motion.h3>
                      <motion.p 
                        className="text-primary font-medium mb-1 text-base sm:text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {personal.title}
                      </motion.p>
                      <motion.p 
                        className="text-gray text-sm mb-4 flex items-center justify-center gap-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <MapPin className="w-3 h-3" />
                        {personal.location}
                      </motion.p>
                      <motion.div 
                        className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full inline-block"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Hover to reveal personal essence →
                      </motion.div>
                      
                    </div>
                  </div>
                </motion.div>

                {/* Back Side - Professional & Personal Content */}
                <motion.div 
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-dark/95 via-dark/85 to-dark/75 backdrop-blur-sm border border-accent/40 rounded-3xl p-4 shadow-2xl overflow-hidden">
                    {/* Back side ambient glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-transparent to-primary/5"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    {/* Main Content Grid */}
          <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-5 gap-3 p-3 lg:p-4">
                      
                      {/* Left Side - Professional Approach Messages */}
            <div className="lg:col-span-2 space-y-2 lg:space-y-3 overflow-y-auto max-h-full pr-0 lg:pr-2">
              <motion.div 
                className="flex items-center gap-2 mb-2 lg:mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-base lg:text-lg">💼</span>
                <h3 className="text-xs lg:text-sm font-bold text-accent">
                  Professional Approach
                </h3>
              </motion.div>
                        
                        {/* Professional Journey */}
              <motion.div 
                className="bg-dark/50 border border-primary/20 rounded-lg p-2 lg:p-3 hover:border-primary/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <span className="text-xs">🎯</span>
                  <h4 className="text-xs font-semibold text-primary">Professional Journey</h4>
                </div>
                <p className="text-xs text-gray leading-relaxed">
                  My fascination for transforming raw information into meaningful insights led me to specialize in data engineering. 
                  What drives me is turning complex data landscapes into clean, scalable solutions.
                </p>
              </motion.div>
                        
                        {/* Technical Philosophy */}
              <motion.div 
                className="bg-dark/50 border border-secondary/20 rounded-lg p-2 lg:p-3 hover:border-secondary/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <span className="text-xs">⚡</span>
                  <h4 className="text-xs font-semibold text-secondary">Technical Philosophy</h4>
                </div>
                <p className="text-xs text-gray leading-relaxed">
                  My approach combines proven engineering principles with innovative problem-solving. 
                  Every architecture decision is guided by three core principles: reliability, performance, and simplicity.
                </p>
              </motion.div>
                        
                        {/* Results Achieved */}
              <motion.div 
                className="bg-dark/50 border border-accent/20 rounded-lg p-2 lg:p-3 hover:border-accent/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <span className="text-xs">📊</span>
                  <h4 className="text-xs font-semibold text-accent">Results Achieved</h4>
                </div>
                <div className="space-y-1 text-xs text-gray">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    <span>90% improvement in data processing efficiency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    <span>60% reduction in operational costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    <span>99.9% reliability in production systems</span>
                  </div>
                </div>
              </motion.div>
                        
                        {/* Future Vision */}
              <motion.div 
                className="bg-dark/50 border border-primary/20 rounded-lg p-2 lg:p-3 hover:border-primary/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <span className="text-xs">🔮</span>
                  <h4 className="text-xs font-semibold text-primary">Future Vision</h4>
                </div>
                <p className="text-xs text-gray leading-relaxed">
                  I envision data flowing as naturally as water, systems so intuitive they become invisible, 
                  and organizations empowered to make real-time insight-based decisions.
                </p>
              </motion.div>
            </div>
                      
                      {/* Right Side - Personal Carousel */}
            <div className="lg:col-span-3 flex flex-col mt-4 lg:mt-0">
              <motion.div 
                className="flex items-center gap-2 mb-2 lg:mb-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-base lg:text-lg"
                >
                  🚀
                </motion.div>
                <div>
                  <h3 className="text-xs lg:text-sm font-bold text-accent">{t('behindEngineer.title')}</h3>
                  <p className="text-gray text-xs">{t('behindEngineer.subtitle')}</p>
                </div>
              </motion.div>

                        {/* Behind Engineer Narrative Carousel - Sequential storytelling */}
                        <div 
                          className="flex-1 overflow-hidden relative"
                          onMouseEnter={() => setIsInterestsPaused(true)}
                          onMouseLeave={() => setIsInterestsPaused(false)}
                        >
                        <motion.div 
                          className="flex h-full"
                          animate={{ 
                            x: `${-currentInterestIndex * 100}%` 
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 35,
                            duration: 0.9
                          }}
                        >
                          {/* Personal Interests Slides */}
                          {personalInterests.slice(0, 6).map((interest, index) => (
                            <motion.div
                              key={interest.label}
                              className="w-full flex-shrink-0 px-3 flex flex-col justify-center"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ 
                                opacity: index === currentInterestIndex ? 1 : 0.6,
                                scale: index === currentInterestIndex ? 1 : 0.92
                              }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mx-auto max-w-[320px] group">
                                {/* Main visual content */}
                                {interest.image ? (
                                  <div className="absolute inset-0">
                                    <Image
                                      src={interest.image}
                                      alt={interest.label}
                                      fill
                                      className="object-cover object-center transition-transform duration-1000 ease-out"
                                      style={{
                                        transform: index === currentInterestIndex ? 'scale(1.05)' : 'scale(1)'
                                      }}
                                      sizes="320px"
                                      priority={index === currentInterestIndex}
                                    />
                                    {/* Dynamic overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    {/* Animated particles effect */}
                                    <motion.div 
                                      className="absolute inset-0 opacity-30"
                                      animate={{
                                        background: index === currentInterestIndex 
                                          ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                                          : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0) 0%, transparent 70%)'
                                      }}
                                      transition={{ duration: 1.5 }}
                                    />
                                  </div>
                                ) : (
                                  <div className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} relative`}>
                                    {/* Animated background pattern */}
                                    <motion.div 
                                      className="absolute inset-0 opacity-20"
                                      animate={{
                                        backgroundPosition: index === currentInterestIndex ? ['0% 0%', '100% 100%'] : '0% 0%'
                                      }}
                                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                                      style={{
                                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px)',
                                        backgroundSize: '30px 30px'
                                      }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <motion.div 
                                        className="text-7xl"
                                        animate={{ 
                                          scale: index === currentInterestIndex ? [1, 1.15, 1] : 1,
                                          rotate: index === currentInterestIndex ? [0, 8, -8, 0] : 0,
                                          y: index === currentInterestIndex ? [0, -5, 0] : 0
                                        }}
                                        transition={{ 
                                          duration: 3,
                                          repeat: index === currentInterestIndex ? Infinity : 0,
                                          repeatType: "reverse",
                                          ease: "easeInOut"
                                        }}
                                      >
                                        {interest.emoji}
                                      </motion.div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Content overlay with narrative flow */}
                                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                                  <motion.div 
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ 
                                      y: index === currentInterestIndex ? 0 : 15,
                                      opacity: index === currentInterestIndex ? 1 : 0.7
                                    }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                    className="text-center"
                                  >
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                      <motion.span 
                                        className="text-3xl drop-shadow-2xl"
                                        animate={{
                                          scale: index === currentInterestIndex ? [1, 1.3, 1] : 1,
                                          filter: index === currentInterestIndex 
                                            ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' 
                                            : 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))'
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                      >
                                        {interest.emoji}
                                      </motion.span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white drop-shadow-lg mb-2">
                                      {interest.label}
                                    </h4>
                                    <p className="text-sm text-white/95 leading-relaxed drop-shadow-md max-w-[280px] mx-auto">
                                      {interest.description}
                                    </p>
                                  </motion.div>
                                </div>
                                
                                {/* Subtle ambient glow */}
                                <motion.div 
                                  className="absolute inset-0 rounded-2xl"
                                  animate={{
                                    boxShadow: index === currentInterestIndex 
                                      ? '0 0 40px rgba(59, 130, 246, 0.25), 0 0 80px rgba(59, 130, 246, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)' 
                                      : '0 0 0px rgba(59, 130, 246, 0)'
                                  }}
                                  transition={{ duration: 1 }}
                                />
                              </div>
                            </motion.div>
                          ))}
                          
                          {/* Teaching Slide */}
                          {personalInterests.length > 6 && (
                            <motion.div
                              className="w-full flex-shrink-0 px-3 flex flex-col justify-center"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ 
                                opacity: 6 === currentInterestIndex ? 1 : 0.6,
                                scale: 6 === currentInterestIndex ? 1 : 0.92
                              }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mx-auto max-w-[320px] bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
                                {/* Animated background */}
                                <motion.div 
                                  className="absolute inset-0 opacity-30"
                                  animate={{
                                    backgroundPosition: 6 === currentInterestIndex ? ['0% 0%', '100% 100%'] : '0% 0%'
                                  }}
                                  transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                                  style={{
                                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
                                    backgroundSize: '40px 40px'
                                  }}
                                />
                                
                                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                                  <motion.div 
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ 
                                      y: 6 === currentInterestIndex ? 0 : 15,
                                      opacity: 6 === currentInterestIndex ? 1 : 0.7
                                    }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                    className="text-center"
                                  >
                                    <motion.div 
                                      className="text-5xl mb-4 inline-block"
                                      animate={{ 
                                        scale: 6 === currentInterestIndex ? [1, 1.2, 1] : 1,
                                        rotate: 6 === currentInterestIndex ? [0, 10, -10, 0] : 0
                                      }}
                                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                    >
                                      {personalInterests[6].emoji}
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                                      {personalInterests[6].label}
                                    </h4>
                                    <p className="text-sm text-white/95 leading-relaxed drop-shadow-md max-w-[280px] mx-auto">
                                      {personalInterests[6].description}
                                    </p>
                                  </motion.div>
                                </div>
                                
                                <motion.div 
                                  className="absolute inset-0 rounded-2xl"
                                  animate={{
                                    boxShadow: 6 === currentInterestIndex 
                                      ? '0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(99, 102, 241, 0.15)' 
                                      : '0 0 0px rgba(99, 102, 241, 0)'
                                  }}
                                  transition={{ duration: 1 }}
                                />
                              </div>
                            </motion.div>
                          )}
                          
                          {/* Values Slide - Final narrative */}
                          <motion.div
                            className="w-full flex-shrink-0 px-3 flex flex-col justify-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ 
                              opacity: 7 === currentInterestIndex ? 1 : 0.6,
                              scale: 7 === currentInterestIndex ? 1 : 0.92
                            }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          >
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mx-auto max-w-[320px] bg-gradient-to-br from-accent/80 via-primary/70 to-secondary/60">
                              {/* Animated background pattern */}
                              <motion.div 
                                className="absolute inset-0 opacity-20"
                                animate={{
                                  backgroundPosition: 7 === currentInterestIndex ? ['0% 0%', '100% 100%'] : '0% 0%'
                                }}
                                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
                                style={{
                                  backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 2px, transparent 2px)',
                                  backgroundSize: '50px 50px'
                                }}
                              />
                              
                              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 z-10">
                                <motion.div 
                                  initial={{ y: 30, opacity: 0 }}
                                  animate={{ 
                                    y: 7 === currentInterestIndex ? 0 : 15,
                                    opacity: 7 === currentInterestIndex ? 1 : 0.7
                                  }}
                                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                  className="text-center"
                                >
                                  <motion.div 
                                    className="text-4xl mb-4 inline-block"
                                    animate={{ 
                                      scale: 7 === currentInterestIndex ? [1, 1.1, 1] : 1,
                                      rotate: 7 === currentInterestIndex ? [0, 5, -5, 0] : 0
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                                  >
                                    💎
                                  </motion.div>
                                  <h4 className="text-lg font-bold text-white mb-3 drop-shadow-lg">
                                    {t('behindEngineer.values.title')}
                                  </h4>
                                  <p className="text-sm text-white/95 leading-relaxed drop-shadow-md text-center italic">
                                    {t('behindEngineer.values.content')}
                                  </p>
                                </motion.div>
                              </div>
                              
                              <motion.div 
                                className="absolute inset-0 rounded-2xl"
                                animate={{
                                  boxShadow: 7 === currentInterestIndex 
                                    ? '0 0 40px rgba(168, 85, 247, 0.25), 0 0 80px rgba(168, 85, 247, 0.1)' 
                                    : '0 0 0px rgba(168, 85, 247, 0)'
                                }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                          </motion.div>
                        </motion.div>
                        
                          {/* Enhanced progress indicators */}
                          <div className="flex justify-center gap-2 mt-4">
                            {[...Array(8)].map((_, index) => {
                              const isActive = index === currentInterestIndex;
                              const isValues = index === 7;
                              const isTeaching = index === 6;
                              
                              return (
                                <motion.button
                                  key={index}
                                  className={`relative transition-all duration-400 ${
                                    isActive 
                                      ? 'w-6 h-2 bg-primary rounded-full' 
                                      : 'w-2 h-2 bg-gray/30 hover:bg-gray/50 rounded-full'
                                  }`}
                                  onClick={() => setCurrentInterestIndex(index)}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {isActive && (
                                    <motion.div
                                      className="absolute inset-0 rounded-full"
                                      animate={{
                                        boxShadow: isValues 
                                          ? '0 0 10px rgba(168, 85, 247, 0.6)'
                                          : isTeaching 
                                          ? '0 0 10px rgba(99, 102, 241, 0.6)'
                                          : '0 0 10px rgba(59, 130, 246, 0.6)'
                                      }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}