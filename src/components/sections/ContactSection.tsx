'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { portfolioConfig } from '@/config/portfolio';

export function ContactSection() {
  const t = useTranslations('contact');
  const { personal, social } = portfolioConfig;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: `https://maps.google.com/?q=${personal.location}`
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: social.github,
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: social.linkedin,
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: personal.twitter,
      color: 'hover:text-blue-400'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-light mb-6">
                <span className="text-secondary">{t('info.title')}</span>
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.label === 'Location' ? '_blank' : '_self'}
                      rel={info.label === 'Location' ? 'noopener noreferrer' : ''}
                      className="
                        flex items-center p-4 bg-dark/30 backdrop-blur-sm border border-primary/10 rounded-lg
                        hover:border-primary/30 hover:bg-primary/5 transition-all duration-300
                        group cursor-pointer
                      "
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.02, borderColor: 'rgba(0, 255, 65, 0.4)' }}
                    >
                      <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray mb-1 group-hover:text-light transition-colors duration-300">
                          {t(`info.${info.label.toLowerCase()}`)}
                        </div>
                        <div className="text-light font-medium group-hover:text-primary transition-colors duration-300">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-light mb-6">
                <span className="text-secondary">{t('social.title')}</span>
              </h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        p-4 bg-dark/30 backdrop-blur-sm border border-primary/10 rounded-lg
                        hover:border-primary/30 hover:bg-primary/5 transition-all duration-300
                        text-gray hover:text-primary cursor-pointer
                      "
                      whileHover={{ y: -8, scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div 
              className="bg-dark/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6"
              whileHover={{ y: -5, borderColor: 'rgba(0, 255, 65, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-light mb-3">{t('status.title')}</h4>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
                <span className="text-gray">{personal.availability}</span>
              </div>
              <p className="text-sm text-gray mt-2">
                {t('status.description')}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-dark/30 backdrop-blur-sm border border-primary/20 rounded-lg p-8"
              whileHover={{ y: -5, borderColor: 'rgba(0, 255, 65, 0.4)' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-light mb-6">
                <span className="text-secondary">{t('form.title')}</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray mb-2">
                      {t('form.name')} *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="
                        w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg
                        text-light placeholder-gray focus:outline-none focus:border-primary
                        transition-all duration-300
                      "
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray mb-2">
                      {t('form.email')} *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="
                        w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg
                        text-light placeholder-gray focus:outline-none focus:border-primary
                        transition-all duration-300
                      "
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray mb-2">
                    {t('form.subject')} *
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="
                      w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg
                      text-light placeholder-gray focus:outline-none focus:border-primary
                      transition-all duration-300
                    "
                    placeholder={t('form.subjectPlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray mb-2">
                    {t('form.message')} *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    whileFocus={{ scale: 1.02 }}
                    className="
                      w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg
                      text-light placeholder-gray focus:outline-none focus:border-primary
                      transition-all duration-300 resize-none
                    "
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full btn btn-primary flex items-center justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-light/30 border-t-light rounded-full animate-spin mr-2" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('form.sendButton')}
                    </>
                  )}
                </motion.button>
                
                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
                  >
                    {t('form.successMessage')}
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
                  >
                    {t('form.errorMessage')}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* Extra spacing at the end of the contact section */}
        <div className="mt-20"></div>
      </div>
    </section>
  );
}