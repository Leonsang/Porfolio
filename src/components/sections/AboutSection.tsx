'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, ChevronDown, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function AboutSection() {
  const t = useTranslations('about');
  const { personal } = portfolioConfig;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Auto-play slides (paused when dropdown is open)
  useEffect(() => {
    if (isDropdownOpen) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4); // 4 slides total
    }, 8000); // 8 seconds per slide

    return () => clearInterval(timer);
  }, [isDropdownOpen]);

  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setIsDropdownOpen(false);
  };

  // Define slides content
  const slides = [
    {
      id: 'professional-value',
      title: t('professionalValue.title'),
      content: t('professionalValue.content'),
      icon: '🎯',
      color: 'primary'
    },
    {
      id: 'core-strengths', 
      title: t('coreStrengths.title'),
      content: null, // Special slide with grid layout
      icon: '⭐',
      color: 'secondary'
    },
    {
      id: 'problem-solving',
      title: t('problemSolver.title'),
      content: t('problemSolver.content'),
      icon: '🧠',
      color: 'accent'
    },
    {
      id: 'learning-driven',
      title: t('learningDriven.title'),
      content: t('learningDriven.content'),
      icon: '🚀',
      color: 'primary'
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Dropdown Navigation & Content */}
          <div className="space-y-6">
            {/* Dropdown Navigation */}
            <div className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`
                  w-full flex items-center justify-between p-4 bg-gradient-to-r from-${slides[currentSlide].color}/15 via-dark/40 to-transparent 
                  backdrop-blur-sm rounded-lg font-medium transition-all duration-500 hover:from-${slides[currentSlide].color}/25
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{slides[currentSlide].icon}</span>
                  <div className="text-left">
                    <div className="text-light font-semibold">{slides[currentSlide].title}</div>
                    <div className="text-gray text-xs opacity-70">Explore other sections</div>
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    rotate: isDropdownOpen ? 180 : 0,
                    scale: isDropdownOpen ? 1.1 : 1
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ChevronDown className={`w-5 h-5 text-${slides[currentSlide].color} opacity-70`} />
                </motion.div>
              </motion.button>

              {/* Seamless Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scaleY: 0.8 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-1 bg-dark/95 backdrop-blur-xl rounded-lg shadow-2xl shadow-black/20 z-50 overflow-hidden"
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="p-1">
                      {slides.map((slide, index) => (
                        <motion.button
                          key={index}
                          onClick={() => selectSlide(index)}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          whileHover={{ 
                            x: 8, 
                            backgroundColor: `rgba(${slide.color === 'primary' ? '0, 255, 65' : slide.color === 'secondary' ? '255, 107, 53' : '78, 205, 196'}, 0.1)`,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-4">
                            <motion.span 
                              className="text-xl group-hover:scale-110 transition-transform duration-200"
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                            >
                              {slide.icon}
                            </motion.span>
                            <div className="text-left">
                              <div className={`font-medium transition-colors duration-300 ${
                                currentSlide === index ? `text-${slide.color}` : 'text-light group-hover:text-accent'
                              }`}>
                                {slide.title}
                              </div>
                            </div>
                          </div>
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ 
                              scale: currentSlide === index ? 1 : 0,
                              rotate: currentSlide === index ? 0 : -90
                            }}
                            transition={{ duration: 0.3, ease: "backOut" }}
                          >
                            <Check className={`w-4 h-4 text-${slide.color}`} />
                          </motion.div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Slides Content - Better Space Usage */}
            <div className="relative min-h-[500px] lg:min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Clean Content Layout - No Repeated Titles */}
                  {slides[currentSlide].id === 'core-strengths' ? (
                    // Core Strengths - Seamless Layout
                    <motion.div 
                      className={`bg-gradient-to-br from-${slides[currentSlide].color}/8 via-dark/30 to-transparent backdrop-blur-sm rounded-lg p-8 h-full`}
                      whileHover={{ y: -2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="h-full flex flex-col justify-center space-y-6">
                        {(() => {
                          const strengthsFromTranslations = t.raw('coreStrengths.items') as Array<{title: string, description: string, icon: string}>;
                          const strengths = strengthsFromTranslations || [
                            {
                              title: "Data Engineering Excellence",
                              description: "Building robust ETL pipelines, data warehouses, and real-time processing systems that scale with your business needs.",
                              icon: "🏗️"
                            },
                            {
                              title: "Programming Craftsmanship", 
                              description: "Writing clean, maintainable code in Python, SQL, and modern frameworks. I believe code should tell a story and be built to last.",
                              icon: "⚡"
                            },
                            {
                              title: "Continuous Learning",
                              description: "Staying ahead of industry trends, rapidly adopting new technologies, and sharing knowledge with the team to drive collective growth.",
                              icon: "📈"
                            }
                          ];
                          
                          return strengths.map((strength, index) => (
                            <motion.div
                              key={strength.title}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.15 }}
                              whileHover={{ x: 10, scale: 1.02 }}
                              className="bg-dark/20 backdrop-blur-sm rounded-lg p-6 hover:bg-dark/30 transition-all duration-400 flex items-center gap-6 group"
                            >
                              <motion.div 
                                className="text-3xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                                whileHover={{ rotate: [0, -5, 5, 0] }}
                              >
                                {strength.icon}
                              </motion.div>
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-light mb-3 group-hover:text-accent transition-colors duration-300">
                                  {strength.title}
                                </h4>
                                <p className="text-gray leading-relaxed group-hover:text-light transition-colors duration-300">
                                  {strength.description}
                                </p>
                              </div>
                            </motion.div>
                          ));
                        })()}
                      </div>
                    </motion.div>
                  ) : (
                    // Regular slides - Clean & Spacious
                    <motion.div 
                      className={`bg-gradient-to-br from-${slides[currentSlide].color}/8 via-dark/30 to-transparent backdrop-blur-sm rounded-lg p-8 h-full flex flex-col justify-center`}
                      whileHover={{ y: -2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="space-y-8">
                        {/* Large icon as visual anchor */}
                        <motion.div 
                          className="flex justify-center"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <span className={`text-6xl text-${slides[currentSlide].color} opacity-80`}>
                            {slides[currentSlide].icon}
                          </span>
                        </motion.div>

                        {/* Content paragraphs with staggered animation */}
                        <div className="text-gray text-lg leading-relaxed space-y-6 text-center">
                          {slides[currentSlide].content?.split('. ').map((sentence, index) => (
                            <motion.p
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                              className="text-xl font-light hover:text-light transition-colors duration-300 cursor-default"
                            >
                              {sentence}{sentence === slides[currentSlide].content?.split('. ').pop() ? '' : '.'}
                            </motion.p>
                          ))}
                        </div>

                        {/* Subtle bottom accent */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="flex justify-center"
                        >
                          <div className={`h-0.5 w-24 bg-gradient-to-r from-transparent via-${slides[currentSlide].color}/50 to-transparent rounded-full`} />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Photo & Professional Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Profile Photo - Larger & Centered */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden group cursor-pointer"
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0, 255, 65, 0.4), 0 0 80px rgba(0, 255, 65, 0.2)"
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))"
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
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/images/Pixel.png"
                    alt="Erick Sang Cifuentes - Data Engineer"
                    fill
                    className="object-cover object-center"
                    sizes="192px"
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
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <Image
                    src="/images/Logo.png"
                    alt="Erick Sang - Pixel Art Logo"
                    fill
                    className="object-contain object-center p-3"
                    sizes="192px"
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
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                  }}
                >
                  <Image
                    src="/images/RetroYo.png"
                    alt="Erick Sang - Retro Pixel Art"
                    fill
                    className="object-cover object-center"
                    sizes="192px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-transparent to-primary/20" />
                </motion.div>
                
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(0, 255, 65, 0.3)",
                      "0 0 20px rgba(0, 255, 65, 0.6)",
                      "0 0 0px rgba(0, 255, 65, 0.3)"
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    border: "1px solid rgba(0, 255, 65, 0.2)"
                  }}
                />
                
                {/* Hover overlay with personal information - Compact */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 backdrop-blur-sm flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="text-sm font-bold text-primary mb-2">
                      {t('beyondWork.title')}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-primary">☕</span>
                        <span className="text-light text-xs">{t('beyondWork.interests.coffee')}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-secondary">🐕</span>
                        <span className="text-light text-xs">{t('beyondWork.interests.dogs')}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-accent">🎵</span>
                        <span className="text-light text-xs">{t('beyondWork.interests.music')}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-primary">⚽</span>
                        <span className="text-light text-xs">{t('beyondWork.interests.sports')}</span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-2"
                    >
                      <div className="text-xs text-gray italic">
                        &quot;{t('beyondWork.quote')}&quot;
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Professional Profile Card - Enhanced Layout */}
            <motion.div 
              className="bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 h-fit"
              whileHover={{ y: -3, borderColor: 'rgba(0, 255, 65, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">👨‍💻</span>
                <h3 className="text-xl font-semibold text-light">{t('personalInfo.title')}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div 
                    className="flex items-center p-4 bg-primary/10 rounded-lg group cursor-default"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 255, 65, 0.15)' }}
                  >
                    <User className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs text-gray mb-1">{t('personalInfo.name')}</div>
                      <div className="text-light font-medium text-sm">{personal.name}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center p-4 bg-secondary/10 rounded-lg group cursor-default"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 107, 53, 0.15)' }}
                  >
                    <MapPin className="w-5 h-5 mr-3 text-secondary group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs text-gray mb-1">{t('personalInfo.location')}</div>
                      <div className="text-light font-medium text-sm">{personal.location}</div>
                    </div>
                  </motion.div>
                </div>

                {/* Role & Availability */}
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center p-4 bg-accent/10 rounded-lg group cursor-default"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(78, 205, 196, 0.15)' }}
                  >
                    <span className="text-accent text-lg mr-3 group-hover:scale-110 transition-transform">💼</span>
                    <div>
                      <div className="text-xs text-gray mb-1">{t('personalInfo.role')}</div>
                      <div className="text-light font-medium text-base">{personal.title}</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center p-4 bg-green-500/10 rounded-lg group cursor-default"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                  >
                    <span className="text-green-400 text-lg mr-3 group-hover:scale-110 transition-transform">🟢</span>
                    <div>
                      <div className="text-xs text-gray mb-1">{t('personalInfo.status')}</div>
                      <div className="text-green-400 font-medium text-base">{personal.availability}</div>
                    </div>
                  </motion.div>
                </div>

                {/* Professional Details */}
                <div className="border-t border-primary/10 pt-4 space-y-3">
                  <motion.div 
                    className="flex items-center p-3 bg-blue-500/10 rounded-lg group cursor-default"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
                  >
                    <span className="text-blue-400 text-lg mr-3 group-hover:scale-110 transition-transform">📊</span>
                    <div>
                      <div className="text-xs text-gray mb-1">{t('personalInfo.focus')}</div>
                      <div className="text-blue-400 font-medium text-sm">Data Engineering & AI</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center p-3 bg-purple-500/10 rounded-lg group cursor-default"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
                  >
                    <span className="text-purple-400 text-lg mr-3 group-hover:scale-110 transition-transform">⭐</span>
                    <div>
                      <div className="text-xs text-gray mb-1">{t('personalInfo.experience')}</div>
                      <div className="text-purple-400 font-medium text-sm">Mid-Level Professional</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}