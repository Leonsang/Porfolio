'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';
import Image from 'next/image';

export function AboutSection() {
  const t = useTranslations('about');
  const { personal } = portfolioConfig;



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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Personal Details */}
            <motion.div 
              className="bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6"
              whileHover={{ y: -5, borderColor: 'rgba(0, 255, 65, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-light">Personal Information</h3>
              </div>
              
              <p className="text-gray text-lg leading-relaxed mb-8">
                {t('description')}
              </p>
              
              <div className="space-y-3 text-gray">
                <div className="flex items-center">
                  <span className="font-medium text-light w-20">Name:</span>
                  <span>{personal.name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-primary mr-2" />
                  <span className="font-medium text-light w-20">Location:</span>
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-light w-20">Role:</span>
                  <span>{personal.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-light w-20">Status:</span>
                  <span className="text-accent">{personal.availability}</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6"
              whileHover={{ y: -5, borderColor: 'rgba(0, 255, 65, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-light mb-4">Contact Information</h3>
              <div className="space-y-3">
                <motion.a 
                  href={`mailto:${personal.email}`}
                  className="flex items-center text-gray hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {personal.email}
                </motion.a>
                <motion.a 
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Profile
                </motion.a>
                <motion.a 
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Profile
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            {/* Image Container with Alternating Effect */}
            <motion.div
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden group cursor-pointer"
              whileHover={{ 
                scale: 1.08, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0, 255, 65, 0.3), 0 0 60px rgba(0, 255, 65, 0.2)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))"
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
                  sizes="(max-width: 768px) 256px, 288px"
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
                  sizes="(max-width: 768px) 256px, 288px"
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
                  sizes="(max-width: 768px) 256px, 288px"
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
              
              {/* Hover overlay with personal information */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 backdrop-blur-sm flex flex-col justify-center items-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                  <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Beyond the Code
                  </h3>
                  
                  <p className="text-gray text-xs leading-relaxed mb-3">
                    When I&apos;m not building data pipelines, you&apos;ll find me exploring new technologies, 
                    reading about AI innovations, or enjoying a good cup of coffee while coding.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-primary">☕</span>
                      <span className="text-light">Coffee</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-secondary">🐕</span>
                      <span className="text-light">Dog Lover</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-accent">🎵</span>
                      <span className="text-light">Music</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-primary">⚽</span>
                      <span className="text-light">Sports</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-secondary">🎌</span>
                      <span className="text-light">Anime</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-accent">🚀</span>
                      <span className="text-light">Sci-Fi</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-primary">🎨</span>
                      <span className="text-light">Arts</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-secondary">📚</span>
                      <span className="text-light">Learning</span>
                    </div>
            </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-4"
                  >
                    <div className="text-xs text-gray italic">
                      &quot;Always learning, always building&quot;
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}