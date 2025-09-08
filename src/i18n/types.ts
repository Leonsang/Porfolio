import { routing } from './routing';

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export interface Messages {
  navigation: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    downloadCV: string;
    viewWork: string;
    scrollDown: string;
  };
  about: {
    title: string;
    personalInfo: {
      title: string;
      name: string;
      location: string;
      role: string;
    };
    stats: {
      experience: string;
      projects: string;
      pipelines: string;
      certifications: string;
    };
    highlights: {
      dataEngineering: {
        title: string;
        description: string;
      };
      cloudExpertise: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
    };
    downloadCV: string;
    contactMe: string;
  };
  technical: {
    title: string;
    subtitle: string;
    categories: {
      programming: { title: string };
      databases: { title: string };
      cloud: { title: string };
      tools: { title: string };
      analytics: { title: string };
      ml: { title: string };
    };
    certifications: { title: string };
    charts: {
      skillOverview: string;
      topSkills: string;
    };
  };
  experience: {
    title: string;
    subtitle: string;
    achievements: string;
    technologies: string;
    downloadCV: string;
  };
  projects: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      dataEngineering: string;
      machineLearning: string;
      analytics: string;
    };
    features: string;
    moreProjects: string;
    viewGithub: string;
  };
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    description: string;
    sendMessage: string;
    info: {
      email: string;
      phone: string;
      location: string;
    };
    followMe: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
}
