import { PortfolioConfig } from '../types/portfolio';

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Erick Sang Cifuentes",
    title: "Data Engineer",
    tagline: "Building robust data pipelines and transforming raw data into actionable insights with cutting-edge technologies",
    avatar: "👨‍💻",
    email: "ericksang@gmail.com",
    linkedin: "linkedin.com/in/esangc",
    github: "github.com/leonsang",
    twitter: "twitter.com/ericksang",
    location: "Madrid, Colombia",
    availability: "Open to opportunities"
  },
  stats: {
    years_experience: "5+",
    projects_completed: "15+",
    data_pipelines_built: "25+",
    technologies_mastered: "20+"
  },
  skills: {
    data_engineering: {
      "Python": 95,
      "SQL": 92,
      "Apache Spark": 88,
      "Apache Airflow": 90,
      "ETL/ELT": 95
    },
    cloud_platforms: {
      "AWS": 90,
      "Azure": 85,
      "Google Cloud": 80,
      "Snowflake": 88
    },
    data_storage: {
      "PostgreSQL": 90,
      "SQL Server": 88,
      "MongoDB": 85,
      "Cassandra": 80
    },
    bi_visualization: {
      "Power BI": 92,
      "LookerML": 88,
      "SAS VIYA": 85,
      "BigQuery": 90
    }
  },
  projects: [
    {
      title: "Single Source of Truth (SSOT) in AWS - CUN",
      description: "Designed and implemented SSOT architecture in AWS for academic data consolidation",
      technologies: ["AWS Glue", "Lambda", "S3", "Redshift", "Python", "Apache Airflow"],
      results: "60% reduction in consolidated data access time",
      impact: "Centralized academic data from multiple sources into unified platform"
    },
    {
      title: "Dashboard Module Integration for GASCO Chile - SohoHumantech",
      description: "Consulting engagement to integrate a dashboards module inside the company's web application for GASCO Chile, leveraging LookerML endpoints and BigQuery views/design for data delivery and consumption.",
      technologies: ["LookerML", "BigQuery", "REST Endpoints", "Data Modeling"],
      results: "Delivered embedded dashboards powered by LookerML APIs with curated BigQuery views supporting application UX",
      impact: "Enabled productized analytics in-app without context switching; standardized data access via governed views"
    },
    {
      title: "On-Premises to Cloud Data Migration - FACTECH",
      description: "Successfully migrated legacy systems to modern cloud architectures in AWS/Azure",
      technologies: ["AWS", "Azure", "Snowflake", "Redshift", "Apache Airflow"],
      results: "50% reduction in query times, 35% reduction in data errors",
      impact: "Modernized data infrastructure and improved system reliability"
    }
  ],
  experience: [
    {
      title: "Data Engineer",
      company: "SohoHumantech",
      period: "June 2025 - July 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Consulting for GASCO Chile: integration of a dashboards module embedded into the company's application",
        "Modeled datasets and designed curated views in BigQuery to serve analytics workloads",
        "Published and consumed LookerML endpoints (APIs) to power the in‑app dashboards",
        "Collaborated with product and dev teams to define KPIs and data contracts",
        "Implemented versioned data models and deployment workflow for analytics changes"
      ]
    },
    {
      title: "Data Engineer",
      company: "Corporación Unificada Nacional (CUN)",
      period: "April 2025 - June 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Designed and implemented SSOT architecture in AWS for the university",
        "Developed data pipelines using Python full-stack with AWS Glue, Lambda, and S3",
        "Implemented data lake in AWS S3 with optimized partitioning",
        "Utilized Amazon Redshift for data warehouse with query optimization",
        "Implemented Apache Airflow in AWS for data workflow orchestration",
        "Achieved 60% reduction in consolidated data access time"
      ]
    },
    {
      title: "Data Engineer",
      company: "FACTECH",
      period: "September 2024 - March 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Designed and implemented efficient data pipelines using Apache Airflow",
        "Developed ETL/ELT solutions for large data volumes and real-time flows",
        "Migrated legacy systems to modern cloud architectures in AWS/Azure",
        "Implemented automated data quality validations reducing errors by 35%",
        "Optimized relational and NoSQL databases, reducing query times by 50%",
        "Built infrastructures for Machine Learning solution integration"
      ]
    },
    {
      title: "Data Specialist",
      company: "Teleperformance",
      period: "December 2021 - June 2024",
      location: "Bogotá, Colombia",
      achievements: [
        "Designed and developed data pipelines for ingesting data from various sources",
        "Transformed and cleaned raw data using Python and SQL to ensure data quality and consistency",
        "Ensured monitoring and uptime of all production databases and processes (SQL jobs, .NET executables)",
        "Built data models for data warehousing and analysis",
        "Implemented automated data quality checks and monitoring processes",
        "Provided data analysis support to stakeholders for data‑informed decisions"
      ]
    },
    {
      title: "Senior Visualization Architect",
      company: "Nexa BPO",
      period: "January 2019 - November 2021",
      location: "Bogotá, Colombia",
      achievements: [
        "Implemented comprehensive BI solutions across multiple platforms (SAS VIYA, Power BI, SQL Server)",
        "Designed data models and reporting layers for operations and management",
        "Built Excel BI dashboards and VBA automation reducing manual reporting time",
        "Conducted ad-hoc analytics to support strategic decisions across business units"
      ]
    },
    {
      title: "Systems Coordinator",
      company: "Nesagaviria SAS",
      period: "January 2018 - December 2019",
      location: "Bogotá, Colombia",
      achievements: [
        "Managed 24/7 operations and infrastructure monitoring",
        "Maintained database control systems and reporting",
        "Coordinated software implementation and deployments",
        "Implemented web services for electronic invoicing (facturación electrónica) with integration to ERP/DIAN endpoints",
        "Centralized internal applications and standardized access, logging and backups",
        "Led and coordinated cross‑functional projects with stakeholders and vendors"
      ]
    },
    {
      title: "Support Engineer 1st Level",
      company: "Wavecomm Corporation",
      period: "January 2014 - December 2016",
      location: "Bogotá, Colombia",
      achievements: [
        "Provided remote support for 24/7 operations platforms (Zimbra, CRM)",
        "Performed incident response and platform status control",
        "Created reports and executed basic database tasks"
      ]
    }
  ],
  leadershipStories: [
    {
      title: "Leading SSOT Migration Under Tight Deadlines (FACTECH → CUN)",
      situation: "Legacy academic systems with fragmented data sources, strict semester deadlines, and high stakeholder pressure.",
      task: "Migrate to AWS with SSOT, ensuring zero downtime and measurable performance gains.",
      action: [
        "Negotiated scope with stakeholders and created a phased roadmap (quick wins first).",
        "Established ETL patterns in Airflow, CI/CD for jobs, and data quality checks (Great Expectations style).",
        "Implemented Glue/Lambda pipelines, partitioned S3 data lake, and Redshift performance tuning.",
        "Set up metrics telemetry to track access/query time reductions and error rate." 
      ],
      result: "60% faster data access, 50% faster queries, 35% fewer errors; delivered on time before semester kickoff.",
      skills: ["Leadership", "Stakeholder Management", "Prioritization", "Delivery under pressure", "Data Governance"]
    },
    {
      title: "HR Analytics Enablement (SohoHumantech)",
      situation: "Fragmented HR systems; leadership needed unified analytics for decision making.",
      task: "Deliver a working HR data warehouse and dashboards with near‑real‑time updates.",
      action: [
        "Modeled HR entities and created ingestion with Python to BigQuery.",
        "Built LookerML models and Power BI dashboards with role-based access.",
        "Coached non-technical stakeholders to define KPIs and validation rules."
      ],
      result: "40% improvement in HR query response times and adoption across managers.",
      skills: ["Communication", "Coaching", "Data Modeling", "BI Enablement"]
    }
  ],
  education: [
    {
      degree: "Software Engineering",
      institution: "Politécnico Grancolombiano",
      period: "January 2023 - Present",
      status: "Eighth semester approved",
      relevant_courses: ["Software Architecture", "Database Systems", "Cloud Computing", "Machine Learning"]
    },
    {
      degree: "Automation and Robotics Technology",
      institution: "ECCI",
      period: "September 2017 - June 2021",
      status: "Degree option",
      relevant_courses: ["Control Systems", "Industrial Automation", "Robotics Programming"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Associate",
      status: "In Progress",
      category: "Cloud"
    },
    {
      name: "Azure Data Engineer Associate",
      status: "In Progress",
      category: "Cloud"
    },
    {
      name: "Google Cloud Professional Data Engineer",
      status: "In Progress",
      category: "Cloud"
    },
    {
      name: "Python Essential",
      status: "Completed 2024",
      category: "Programming",
      issuer: "LinkedIn Learning"
    }
  ],
  achievements: {
    performance_metrics: {
      "data_processing": "90% improvement in processing speed",
      "data_access": "60% reduction in access time",
      "query_optimization": "50% reduction in query times",
      "data_quality": "35% reduction in errors",
      "hr_queries": "40% optimization in HR queries"
    },
    technologies_implemented: {
      "cloud_platforms": 6,
      "programming_languages": 3,
      "databases": 4,
      "visualization_tools": 2
    }
  },
  certificateLinks: [
    { title: 'PHP Certify', provider: 'SoloLearn', url: 'https://www.sololearn.com/certificates/CT-LOCLLFMS' },
    { title: 'SQL Basics', provider: 'SoloLearn', url: 'https://www.sololearn.com/certificates/CT-DCUFFWUY' },
    { title: 'SQL Intermediate', provider: 'SoloLearn', url: 'https://www.sololearn.com/certificates/CC-BVGV3l3HQ' },
    { title: 'HTML Certify', provider: 'SoloLearn', url: 'https://www.sololearn.com/certificates/CT-QXQBKJQV', date: 'Nov 2017' },
    { title: 'Python Essential', provider: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/certificates/a70a64df25bd12e1634f1588b3d93d14fe69cf52b96703182adf0ef27dbe7c5' },
    { title: 'Python', provider: 'ProgrammingHub', url: 'https://storage.googleapis.com/programminghub/certificate%2F1274412479407.jpg' },
    { title: 'Java', provider: 'SoloLearn', url: 'https://www.sololearn.com/certificates/CT-T78OK721' },
    { title: 'Power BI', provider: 'LinkedIn', url: 'https://www.linkedin.com/learning/certificates/2733eaff55c5b582881df1363a3b32ef80f31bad79e2fb395701330357568657?trk=share_certificate' },
    { title: 'Scrum Fundamentals Certified (SFC™)', provider: 'SCRUMstudy', url: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=883473', note: 'Agile Scrum Framework' },
    { title: 'Análisis de Datos', provider: 'Universidad de los Andes', url: '/docs/certificates/Andes%20Analisis%20de%20datos.pdf', note: 'Data Analysis Course' }
  ],
  theme: {
    primary_color: "#00ff41",
    secondary_color: "#ff6b35",
    accent_color: "#4ecdc4",
    dark_color: "#1a1a1a",
    light_color: "#ffffff"
  },
  social: {
    github: "https://github.com/leonsang",
    linkedin: "https://linkedin.com/in/esangc",
    email: "mailto:ericksang@gmail.com",
    website: ""
  },
  meta: {
    keywords: "Data Engineer, ETL, Apache Spark, Python, AWS, Data Pipeline, Big Data, Colombia",
    description: "Erick Sang Cifuentes - Professional Data Engineer with 5+ years experience in building scalable data pipelines and cloud infrastructure"
  },
  courses: [
    {
      id: 'de101-sql',
      title: 'Associate Data Engineer in SQL',
      provider: 'DataCamp',
      status: 'completed',
      courseId: 'DE101',
      certificateUrl: 'https://www.datacamp.com/certificate/SQA0014156722444',
      learningObjectives: [
        'Interpret a database schema and explain database design concepts (such as normalization, design, schemas, data storage options)',
        'Perform data extraction, joining, and aggregation tasks',
        'Perform cleaning tasks to prepare data for analysis',
        'Assess data quality and perform validation tasks',
        'Use data visualization tools to demonstrate characteristics of data',
        'Read and analyze data visualizations to represent the relationships between features'
      ]
    },
    {
      id: 'de201-python',
      title: 'Data Engineer in Python',
      provider: 'DataCamp',
      status: 'completed',
      courseId: 'DE201',
      certificateUrl: 'https://www.datacamp.com/certificate/DEA0011743578235',
      learningObjectives: [
        'Identify different cloud tools that can be used for storing data and creating and maintaining data pipelines',
        'Perform standard data import, joining, and aggregation tasks',
        'Perform cleaning tasks to prepare data for analysis',
        'Assess data quality and perform validation tasks',
        'Collect data from non-standard formats (e.g., JSON) by modifying existing code',
        'Use common programming constructs to write repeatable production quality code for analysis',
        'Demonstrate best practices in production code including version control, testing, and package development'
      ]
    },
    {
      id: 'sql-associate',
      title: 'SQL Associate',
      provider: 'DataCamp',
      status: 'completed',
      courseId: 'SQA',
      certificateUrl: 'https://www.datacamp.com/certificate/SQA0014156722444',
      learningObjectives: [
        'Advanced SQL querying and optimization',
        'Database design and normalization',
        'Data manipulation and analysis',
        'Performance tuning and best practices'
      ]
    }
  ]
};
