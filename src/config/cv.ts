export interface CVConfig {
  id: string;
  language: 'en' | 'es';
  type: 'standard' | 'ats';
  filename: string;
  displayName: string;
  description: string;
  category: string;
  lastUpdated: string;
  size: string;
}

export const cvConfigs: CVConfig[] = [
  {
    id: 'cv-standard-en',
    language: 'en',
    type: 'standard',
    filename: 'CV_Erick_Sang_Eng.pdf',
    displayName: 'CV - English Standard',
    description: 'Professional CV in English - Standard format',
    category: 'Resume',
    lastUpdated: '2024-12-19',
    size: 'Standard'
  },
  {
    id: 'cv-ats-en',
    language: 'en',
    type: 'ats',
    filename: 'CV_Erick_Sang_Eng_ATS.pdf',
    displayName: 'CV - English ATS',
    description: 'Professional CV in English - ATS optimized format',
    category: 'Resume',
    lastUpdated: '2024-12-19',
    size: 'ATS Optimized'
  },
  {
    id: 'cv-standard-es',
    language: 'es',
    type: 'standard',
    filename: 'CV_Erick_Sang_Esp.pdf',
    displayName: 'CV - Español Estándar',
    description: 'CV profesional en español - Formato estándar',
    category: 'Resume',
    lastUpdated: '2024-12-19',
    size: 'Estándar'
  },
  {
    id: 'cv-ats-es',
    language: 'es',
    type: 'ats',
    filename: 'CV_Erick_Sang_Esp_ATS.pdf',
    displayName: 'CV - Español ATS',
    description: 'CV profesional en español - Formato ATS optimizado',
    category: 'Resume',
    lastUpdated: '2024-12-19',
    size: 'ATS Optimizado'
  }
];

export const getCVByLanguage = (language: 'en' | 'es'): CVConfig[] => {
  return cvConfigs.filter(cv => cv.language === language);
};

export const getCVByType = (type: 'standard' | 'ats'): CVConfig[] => {
  return cvConfigs.filter(cv => cv.type === type);
};

export const getCVByLanguageAndType = (language: 'en' | 'es', type: 'standard' | 'ats'): CVConfig | undefined => {
  return cvConfigs.find(cv => cv.language === language && cv.type === type);
};

export const getCVPath = (cv: CVConfig): string => {
  return `/docs/${cv.filename}`;
};
