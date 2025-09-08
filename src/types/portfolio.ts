export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
  location: string;
  availability: string;
}

export interface Stats {
  years_experience: string;
  projects_completed: string;
  data_pipelines_built: string;
  technologies_mastered: string;
}

export interface SkillCategory {
  [key: string]: number;
}

export interface Skills {
  data_engineering: SkillCategory;
  cloud_platforms: SkillCategory;
  data_storage: SkillCategory;
  bi_visualization: SkillCategory;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  results: string;
  impact: string;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  status: string;
  relevant_courses: string[];
}

export interface Certification {
  name: string;
  status: string;
  category: string;
  issuer?: string;
}

export interface Achievements {
  performance_metrics: Record<string, string>;
  technologies_implemented: Record<string, number>;
}

export interface Theme {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  dark_color: string;
  light_color: string;
}

export interface Social {
  github: string;
  linkedin: string;
  email: string;
  website: string;
}

export interface Meta {
  keywords: string;
  description: string;
}

export interface LeadershipStory {
  title: string;
  situation: string;
  task: string;
  action: string[];
  result: string;
  skills: string[];
}

export interface CertificateLink {
  title: string;
  provider: string;
  url: string;
  note?: string;
  date?: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  status: 'completed' | 'in-progress' | 'planned';
  learningObjectives: string[];
  courseId?: string;
  certificateUrl?: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  stats: Stats;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievements;
  theme: Theme;
  social: Social;
  meta: Meta;
  leadershipStories?: LeadershipStory[];
  certificateLinks?: CertificateLink[];
  courses?: Course[];
}
