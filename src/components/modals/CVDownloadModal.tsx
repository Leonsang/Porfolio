'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Eye, FileText, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getCVByLanguage, getCVPath, CVConfig } from '@/config/cv';
import { useLocale } from 'next-intl';

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const t = useTranslations('cv');
  const locale = useLocale() as 'en' | 'es';
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const cvsForLanguage = getCVByLanguage(locale);

  const handleDownload = async (cv: CVConfig) => {
    setIsDownloading(cv.id);
    
    try {
      const cvPath = getCVPath(cv);
      
      // Create download link
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = cv.filename;
      link.target = '_blank';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success notification
      showNotification(t('downloadSuccess'), 'success');
      
    } catch (error) {
      console.error('Download error:', error);
      showNotification(t('downloadError'), 'error');
    } finally {
      setIsDownloading(null);
    }
  };

  const handlePreview = (cv: CVConfig) => {
    const cvPath = getCVPath(cv);
    window.open(cvPath, '_blank');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-[10001] p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' 
        ? 'bg-green-600 text-white' 
        : 'bg-red-600 text-white'
    }`;
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('opacity-100', 'translate-y-0');
    }, 100);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('opacity-100', 'translate-y-0');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const renderCVCard = (cv: CVConfig) => {
    const isATS = cv.type === 'ats';
    const isDownloadingThis = isDownloading === cv.id;

    return (
      <motion.div
        key={cv.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-dark/50 backdrop-blur-sm border border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              {isATS ? (
                <Bot className="w-6 h-6 text-primary" />
              ) : (
                <FileText className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-light">{cv.displayName}</h4>
              <p className="text-sm text-gray">{cv.description}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isATS 
              ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
              : 'bg-green-600/20 text-green-400 border border-green-600/30'
          }`}>
            {isATS ? t('atsBadge') : t('standardBadge')}
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-gray">
          <div className="flex items-center gap-1">
            <i className="fas fa-calendar"></i>
            <span>{cv.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-file-pdf"></i>
            <span>PDF</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            onClick={() => handleDownload(cv)}
            disabled={isDownloadingThis}
            className="flex-1 bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 text-primary px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isDownloadingThis ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t('download')}</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            onClick={() => handlePreview(cv)}
            className="bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 hover:border-secondary/50 text-secondary px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-4 h-4" />
            <span>{t('preview')}</span>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 xl:inset-32 z-[10001] bg-dark/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-2xl shadow-primary/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/20">
              <div>
                <h2 className="text-2xl font-bold text-light">{t('title')}</h2>
                <p className="text-gray mt-1">{t('subtitle')}</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-gray hover:text-primary" />
              </motion.button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              {/* ATS Tip */}
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <i className="fas fa-lightbulb text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-1">{t('atsTip')}</h4>
                    <p className="text-sm text-gray">{t('atsDescription')}</p>
                  </div>
                </div>
              </div>
              
              {/* CV Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cvsForLanguage.map(renderCVCard)}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
