export interface Translation {
  [key: string]: string | Translation;
}

export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export const languages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr'
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    direction: 'ltr'
  }
];

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      contact: 'Contact',
      overview: 'Overview',
      technical: 'Technical',
      experience: 'Experience'
    },

    // Hero Section
    hero: {
      title: 'ERICK SANG CIFUENTES',
      subtitle: 'Data Engineer',
      description: 'Building robust data pipelines and transforming raw data into actionable insights'
    },

    // Dashboard Stats
    stats: {
      years: 'Years',
      projects: 'Projects',
      pipelines: 'Pipelines'
    },

    // Dashboard Cards
    dashboard: {
      performanceMetrics: 'Performance Metrics',
      technicalSkills: 'Technical Skills',
      experienceTimeline: 'Experience Timeline',
      technologyStack: 'Technology Stack',
      quickStats: 'Quick Stats',
      getInTouch: 'Get In Touch',
      processing: 'Processing',
      accessTime: 'Access Time',
      queryTime: 'Query Time',
      errorRate: 'Error Rate',
      cloud: 'Cloud',
      data: 'Data',
      biTools: 'BI Tools',
      cloudPlatforms: 'Cloud Platforms',
      languages: 'Languages',
      databases: 'Databases'
    },

    // About Section
    about: {
      title: 'About Me',
      subtitle: 'Professional Data Engineer with expertise in building scalable data pipelines and cloud infrastructure',
      personal: {
        title: 'Personal Information',
        category: 'Personal',
        fullName: 'Full Name',
        location: 'Location',
        country: 'Colombia',
        education: 'Education',
        degree: 'Computer Science & Engineering',
        experience: 'Experience',
        years: '5+ Years in Data Engineering'
      },
      summary: {
        title: 'Professional Summary',
        category: 'Summary',
        description: 'Passionate Data Engineer with extensive experience in designing and implementing scalable data solutions. Specialized in ETL pipeline development, cloud infrastructure, and data warehouse optimization.',
        highlight1: 'Multi-cloud expertise (AWS, Azure, GCP)',
        highlight2: 'ETL pipeline orchestration with Apache Airflow',
        highlight3: 'Real-time data processing and analytics',
        highlight4: 'Data quality management and monitoring'
      },
      description1: 'I\'m a Data Engineer based in Colombia with over 5 years of experience in building scalable data infrastructure. My passion lies in transforming complex data challenges into elegant, maintainable solutions.',
      description2: 'When I\'m not optimizing ETL pipelines or designing data warehouses, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the data community.',
      yearsExperience: 'Years Experience',
      projectsCompleted: 'Projects Completed',
      countriesWorked: 'Countries Worked',
      profileImage: 'Profile Image'
    },

    // Overview Section
    overview: {
      title: 'Portfolio Overview',
      subtitle: 'Welcome to my engineering portfolio - showcasing technical excellence and innovative solutions'
    },

    // Technical Section
    technical: {
      title: 'Technical Excellence',
      subtitle: 'Core technical skills and expertise across multiple domains',
      excellence: {
        title: 'Technical Excellence Score',
        category: 'Technical',
        cloud: 'Cloud & Infrastructure',
        pipeline: 'Pipeline Design',
        api: 'API & Integration',
        ml: 'Machine Learning'
      },
      stack: {
        title: 'Technical Stack',
        category: 'Stack'
      },
      tech: {
        title: 'Technology Stack',
        category: 'Stack',
        cloud: 'Cloud',
        data: 'Data',
        bi: 'BI Tools'
      }
    },

    // Experience Section
    experience: {
      title: 'Professional Experience',
      subtitle: 'My journey through different roles and companies'
    },

    // Skills Section
    skills: {
      title: 'Technical Skills',
      subtitle: 'Comprehensive overview of my technical expertise',
      dataEngineering: 'Data Engineering',
      cloudPlatforms: 'Cloud Platforms'
    },

    // Projects Section
    projects: {
      title: 'Innovation & Projects',
      subtitle: 'Key projects and innovative solutions I\'ve developed',
      innovation: {
        title: 'Innovation Hub',
        category: 'Innovation',
        versionControl: 'Version Control',
        cicd: 'CI/CD Pipeline',
        codeQuality: 'Code Quality',
        testing: 'Testing & QA'
      },
      business: {
        title: 'Business Impact & ROI',
        category: 'Business',
        costOptimization: 'Cost Optimization',
        cloudCost: 'Cloud Cost Management',
        resourceUtilization: 'Resource Utilization',
        performanceCost: 'Performance vs Cost',
        timeToMarket: 'Time to Market',
        rapidPrototyping: 'Rapid Prototyping',
        mvpDevelopment: 'MVP Development',
        agileMethodology: 'Agile Methodology'
      },
      filters: {
        all: 'All',
        data: 'Data',
        web: 'Web',
        mobile: 'Mobile',
        ai: 'AI'
      }
    },

    // Certifications Section
    certifications: {
      title: 'Certifications & Achievements',
      subtitle: 'Professional credentials that validate my expertise',
      filters: {
        all: 'All',
        cloud: 'Cloud',
        data: 'Data',
        programming: 'Programming',
        other: 'Other'
      },
      verify: 'Verify',
      details: 'Details',
      totalCertifications: 'Total Certifications',
      skillsValidated: 'Skills Validated',
      latestAchievement: 'Latest Achievement',
      issued: 'Issued',
      credentialId: 'Credential ID',
      skillsValidatedTitle: 'Skills Validated',
      verifyCredential: 'Verify Credential',
      close: 'Close'
    },

    // Contact Section
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your next project or opportunity',
      info: {
        title: 'Contact Information',
        category: 'Contact',
        location: 'Colombia'
      },
      form: {
        title: 'Send Message',
        category: 'Form',
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        success: 'Thank you {name}! Your message has been sent successfully.'
      }
    },

    // Experience Timeline
    experienceTimeline: {
      sohoHumantech: 'SohoHumantech',
      cun: 'CUN',
      factech: 'FACTECH',
      hrDataWarehouse: 'HR Data Warehouse & BigQuery',
      awsSSOT: 'AWS SSOT Architecture',
      cloudMigration: 'Cloud Migration & Airflow'
    },

    // Technology Stack
    tech: {
      aws: 'AWS',
      azure: 'Azure',
      gcp: 'GCP',
      python: 'Python',
      sql: 'SQL',
      spark: 'Spark',
      powerBI: 'Power BI',
      lookerML: 'LookerML',
      bigQuery: 'BigQuery'
    },

    // Loading Screen
    loading: {
      title: 'LOADING DASHBOARD...'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      more: 'More',
      less: 'Less'
    }
  },

  es: {
    // Navigation
    nav: {
      dashboard: 'Panel',
      about: 'Acerca de',
      skills: 'Habilidades',
      projects: 'Proyectos',
      certifications: 'Certificaciones',
      contact: 'Contacto',
      overview: 'Vista General',
      technical: 'Técnica',
      experience: 'Experiencia'
    },

    // Hero Section
    hero: {
      title: 'ERICK SANG CIFUENTES',
      subtitle: 'Ingeniero de Datos',
      description: 'Construyendo pipelines de datos robustos y transformando datos crudos en insights accionables'
    },

    // Dashboard Stats
    stats: {
      years: 'Años',
      projects: 'Proyectos',
      pipelines: 'Pipelines'
    },

    // Dashboard Cards
    dashboard: {
      performanceMetrics: 'Métricas de Rendimiento',
      technicalSkills: 'Habilidades Técnicas',
      experienceTimeline: 'Línea de Tiempo',
      technologyStack: 'Stack Tecnológico',
      quickStats: 'Estadísticas Rápidas',
      getInTouch: 'Ponte en Contacto',
      processing: 'Procesamiento',
      accessTime: 'Tiempo de Acceso',
      queryTime: 'Tiempo de Consulta',
      errorRate: 'Tasa de Error',
      cloud: 'Nube',
      data: 'Datos',
      biTools: 'Herramientas BI',
      cloudPlatforms: 'Plataformas en Nube',
      languages: 'Lenguajes',
      databases: 'Bases de Datos'
    },

    // About Section
    about: {
      title: 'Acerca de Mí',
      subtitle: 'Ingeniero de Datos profesional con experiencia en construcción de pipelines de datos escalables e infraestructura en nube',
      personal: {
        title: 'Información Personal',
        category: 'Personal',
        fullName: 'Nombre Completo',
        location: 'Ubicación',
        country: 'Colombia',
        education: 'Educación',
        degree: 'Ingeniería en Ciencias de la Computación',
        experience: 'Experiencia',
        years: '5+ Años en Ingeniería de Datos'
      },
      summary: {
        title: 'Resumen Profesional',
        category: 'Resumen',
        description: 'Ingeniero de Datos apasionado con amplia experiencia en diseño e implementación de soluciones de datos escalables. Especializado en desarrollo de pipelines ETL, infraestructura en nube y optimización de almacenes de datos.',
        highlight1: 'Experiencia multi-nube (AWS, Azure, GCP)',
        highlight2: 'Orquestación de pipelines ETL con Apache Airflow',
        highlight3: 'Procesamiento de datos en tiempo real y analítica',
        highlight4: 'Gestión y monitoreo de calidad de datos'
      },
      description1: 'Soy un Ingeniero de Datos radicado en Colombia con más de 5 años de experiencia construyendo infraestructura de datos escalable. Mi pasión radica en transformar desafíos complejos de datos en soluciones elegantes y mantenibles.',
      description2: 'Cuando no estoy optimizando pipelines ETL o diseñando almacenes de datos, me puedes encontrar explorando nuevas tecnologías, contribuyendo a proyectos de código abierto o compartiendo conocimiento con la comunidad de datos.',
      yearsExperience: 'Años de Experiencia',
      projectsCompleted: 'Proyectos Completados',
      countriesWorked: 'Países Trabajados',
      profileImage: 'Imagen de Perfil'
    },

    // Overview Section
    overview: {
      title: 'Vista General del Portfolio',
      subtitle: 'Bienvenido a mi portfolio de ingeniería - mostrando excelencia técnica y soluciones innovadoras'
    },

    // Technical Section
    technical: {
      title: 'Excelencia Técnica',
      subtitle: 'Habilidades técnicas y experiencia en múltiples dominios',
      excellence: {
        title: 'Puntuación de Excelencia Técnica',
        category: 'Técnica',
        cloud: 'Nube e Infraestructura',
        pipeline: 'Diseño de Pipelines',
        api: 'API e Integración',
        ml: 'Machine Learning'
      },
      stack: {
        title: 'Stack Técnico',
        category: 'Stack'
      },
      tech: {
        title: 'Stack Tecnológico',
        category: 'Stack',
        cloud: 'Nube',
        data: 'Datos',
        bi: 'Herramientas BI'
      }
    },

    // Experience Section
    experience: {
      title: 'Experiencia Profesional',
      subtitle: 'Mi camino a través de diferentes roles y empresas'
    },

    // Skills Section
    skills: {
      title: 'Habilidades Técnicas',
      subtitle: 'Visión general completa de mi experiencia técnica',
      dataEngineering: 'Ingeniería de Datos',
      cloudPlatforms: 'Plataformas en Nube'
    },

    // Projects Section
    projects: {
      title: 'Innovación y Proyectos',
      subtitle: 'Proyectos clave y soluciones innovadoras que he desarrollado',
      innovation: {
        title: 'Centro de Innovación',
        category: 'Innovación',
        versionControl: 'Control de Versiones',
        cicd: 'Pipeline CI/CD',
        codeQuality: 'Calidad de Código',
        testing: 'Testing y QA'
      },
      business: {
        title: 'Impacto en Negocio y ROI',
        category: 'Negocio',
        costOptimization: 'Optimización de Costos',
        cloudCost: 'Gestión de Costos en Nube',
        resourceUtilization: 'Utilización de Recursos',
        performanceCost: 'Rendimiento vs Costo',
        timeToMarket: 'Tiempo al Mercado',
        rapidPrototyping: 'Prototipado Rápido',
        mvpDevelopment: 'Desarrollo MVP',
        agileMethodology: 'Metodología Ágil'
      },
      filters: {
        all: 'Todos',
        data: 'Datos',
        web: 'Web',
        mobile: 'Móvil',
        ai: 'IA'
      }
    },

    // Certifications Section
    certifications: {
      title: 'Certificaciones y Logros',
      subtitle: 'Credenciales profesionales que validan mi experiencia',
      filters: {
        all: 'Todas',
        cloud: 'Nube',
        data: 'Datos',
        programming: 'Programación',
        other: 'Otras'
      },
      verify: 'Verificar',
      details: 'Detalles',
      totalCertifications: 'Total de Certificaciones',
      skillsValidated: 'Habilidades Validadas',
      latestAchievement: 'Último Logro',
      issued: 'Emitida',
      credentialId: 'ID de Credencial',
      skillsValidatedTitle: 'Habilidades Validadas',
      verifyCredential: 'Verificar Credencial',
      close: 'Cerrar'
    },

    // Contact Section
    contact: {
      title: 'Ponte en Contacto',
      subtitle: 'Hablemos de tu próximo proyecto u oportunidad',
      info: {
        title: 'Información de Contacto',
        category: 'Contacto',
        location: 'Colombia'
      },
      form: {
        title: 'Enviar Mensaje',
        category: 'Formulario',
        name: 'Tu Nombre',
        email: 'Tu Correo',
        subject: 'Asunto',
        message: 'Tu Mensaje',
        submit: 'Enviar Mensaje',
        success: '¡Gracias {name}! Tu mensaje ha sido enviado exitosamente.'
      }
    },

    // Experience Timeline
    experienceTimeline: {
      sohoHumantech: 'SohoHumantech',
      cun: 'CUN',
      factech: 'FACTECH',
      hrDataWarehouse: 'Almacén de Datos HR & BigQuery',
      awsSSOT: 'Arquitectura AWS SSOT',
      cloudMigration: 'Migración a Nube & Airflow'
    },

    // Technology Stack
    tech: {
      aws: 'AWS',
      azure: 'Azure',
      gcp: 'GCP',
      python: 'Python',
      sql: 'SQL',
      spark: 'Spark',
      powerBI: 'Power BI',
      lookerML: 'LookerML',
      bigQuery: 'BigQuery'
    },

    // Loading Screen
    loading: {
      title: 'CARGANDO PANEL...'
    },

    // Common
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      save: 'Guardar',
      edit: 'Editar',
      delete: 'Eliminar',
      view: 'Ver',
      more: 'Más',
      less: 'Menos'
    }
  }
};
