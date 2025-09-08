'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface DynamicTitleSliderProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function DynamicTitleSlider({ 
  className = '', 
  autoPlay = true, 
  interval = 6000 
}: DynamicTitleSliderProps) {
  const t = useTranslations('hero');
  const titles = t.raw('dynamicTitles') as string[];
  const descriptions = t.raw('dynamicDescriptions') as string[];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || !titles?.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === titles.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, titles?.length]);

  if (!titles?.length) {
    return null;
  }

  const currentTitle = titles[currentIndex];
  const currentDescription = descriptions?.[currentIndex] || descriptions?.[0];

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ border: 'none', outline: 'none' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="relative"
          style={{ border: 'none', outline: 'none' }}
        >

          
                     {/* Title text */}
           <motion.h2
             className="relative text-xl md:text-2xl lg:text-3xl font-semibold text-left mb-3"
             style={{
               color: 'var(--secondary-color)',
               border: 'none',
               outline: 'none',
               textShadow: 'none',
               boxShadow: 'none'
             }}
           >
             {currentTitle}
           </motion.h2>
           
           {/* Description text */}
           <motion.p
             className="relative text-lg text-gray max-w-2xl leading-relaxed font-light"
             style={{
               border: 'none',
               outline: 'none',
               textShadow: 'none',
               boxShadow: 'none'
             }}
           >
             {currentDescription}
           </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
