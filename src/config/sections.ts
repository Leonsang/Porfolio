export interface SectionConfig {
  id: string;
  name: string;
  icon: string;
  labelKey: string;
  sectionId: string;
  description: string;
  enabled: boolean;
}

export const PORTFOLIO_SECTIONS: SectionConfig[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: 'fas fa-user',
    labelKey: 'nav.about',
    sectionId: 'about-section',
    description: 'Personal information and professional summary',
    enabled: true
  },
  {
    id: 'overview',
    name: 'Portfolio Overview',
    icon: 'fas fa-home',
    labelKey: 'nav.overview',
    sectionId: 'overview-section',
    description: 'Welcome and portfolio statistics',
    enabled: true
  },
  {
    id: 'technical',
    name: 'Technical Excellence',
    icon: 'fas fa-code',
    labelKey: 'nav.technical',
    sectionId: 'technical-section',
    description: 'Technical skills and expertise',
    enabled: true
  },
  {
    id: 'experience',
    name: 'Professional Experience',
    icon: 'fas fa-briefcase',
    labelKey: 'nav.experience',
    sectionId: 'experience-section',
    description: 'Work history and achievements',
    enabled: true
  },
  {
    id: 'projects',
    name: 'Innovation & Projects',
    icon: 'fas fa-rocket',
    labelKey: 'nav.projects',
    sectionId: 'projects-section',
    description: 'Key projects and innovative solutions',
    enabled: true
  },
  {
    id: 'contact',
    name: 'Get In Touch',
    icon: 'fas fa-envelope',
    labelKey: 'nav.contact',
    sectionId: 'contact-section',
    description: 'Contact information and form',
    enabled: true
  }
];

export const getEnabledSections = (): SectionConfig[] => {
  return PORTFOLIO_SECTIONS.filter(section => section.enabled);
};

export const getSectionById = (id: string): SectionConfig | undefined => {
  return PORTFOLIO_SECTIONS.find(section => section.id === id);
};

export const getSectionBySectionId = (sectionId: string): SectionConfig | undefined => {
  return PORTFOLIO_SECTIONS.find(section => section.sectionId === sectionId);
};
