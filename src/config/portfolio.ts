import { PortfolioConfig } from '@/types/portfolio';

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Erick Manuel Sang Cifuentes",
    title: "Data Engineer",
    tagline: "Building robust data pipelines and transforming raw data into actionable insights",
    avatar: "/images/Pixel.png",
    email: "ericksang@gmail.com",
    linkedin: "https://linkedin.com/in/esangc",
    github: "https://github.com/Leonsang",
    twitter: "https://twitter.com/ericksang",
    location: "Madrid, Colombia",
    availability: "Available for new opportunities"
  },
  stats: {
    years_experience: "3+",
    projects_completed: "15+",
    data_pipelines_built: "50+",
    technologies_mastered: "12+"
  },
  skills: {
    data_engineering: {
      "Data Modeling": 94,
      "Data Ingestion": 95,
      "Data Transformation": 92,
      "Data Storage": 88,
      "Data Processing": 90,
      "Data Delivery": 87
    },
    cloud_platforms: {
      "AWS": 90,
      "Azure": 85,
      "GCP": 80,
      "Snowflake": 88,
      "Databricks": 85
    },
    data_storage: {
      "PostgreSQL": 92,
      "MongoDB": 85,
      "Redis": 80,
      "S3": 90,
      "BigQuery": 88
    },
    bi_visualization: {
      "Power BI": 95,
      "Tableau": 85,
      "Looker": 80,
      "Grafana": 82,
      "Apache Superset": 78
    }
  },
  projects: [
    {
      title: "Real-time Data Pipeline",
      description: "Built a real-time data processing pipeline using Apache Kafka, Spark Streaming, and AWS services",
      technologies: ["Apache Kafka", "Spark Streaming", "AWS Lambda", "DynamoDB"],
      results: "Reduced data processing time by 80% and improved data freshness from hours to minutes",
      impact: "High",
      category: "data-engineering"
    },
    {
      title: "Data Warehouse Migration",
      description: "Migrated legacy on-premise data warehouse to cloud-native solution using Snowflake and dbt",
      technologies: ["Snowflake", "dbt", "Airflow", "Python"],
      results: "Improved query performance by 10x and reduced infrastructure costs by 60%",
      impact: "High",
      category: "cloud"
    },
    {
      title: "ML Model Pipeline",
      description: "Developed end-to-end ML pipeline for predictive analytics using MLOps best practices",
      technologies: ["Python", "MLflow", "Kubernetes", "TensorFlow"],
      results: "Automated model deployment process and improved model accuracy by 15%",
      impact: "Medium",
      category: "machine-learning"
    }
  ],
  experience: [
    {
      title: "Data Engineer - Consulting",
      company: "SohoHumantech",
      period: "June 2025 - August 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Participated in analytics platform development for GASCO Chile",
        "Implemented data integration system using GCP Looker and BigQuery",
        "Achieved 40% improvement in query response times through BigQuery optimization"
      ]
    },
    {
      title: "Data Engineer - Technical Lead",
      company: "Corporación Unificada Nacional (CUN)",
      period: "February 2025 - June 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Led SSOT implementation with AWS, Great Expectations, Airbyte, dbt, and Airflow",
        "Designed RAG architecture for CUN 360 conversational AI system serving 20,000+ users",
        "Achieved 60% reduction in consolidated data access times"
      ]
    },
    {
      title: "Data Engineer - Project Lead",
      company: "FACTECH",
      period: "August 2024 - January 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Led cross-functional team of 6 professionals for Ministry of Education automation",
        "Achieved 90% improvement in processing efficiency with Apache Airflow ETL pipelines",
        "Reduced operational errors by 35% and query execution times by 50%"
      ]
    },
    {
      title: "Data Specialist",
      company: "Teleperformance",
      period: "December 2021 - July 2024",
      location: "Bogotá, Colombia",
      achievements: [
        "Designed data solutions for global financial clients with PCI-DSS compliance",
        "Architected OLAP and OLTP systems including analysis cubes and datamarts",
        "Maintained 24/7 operations with automated monitoring and Power BI dashboards"
      ]
    },
    {
      title: "Senior Visualization Architect",
      company: "Nexa BPO",
      period: "January 2019 - November 2021",
      location: "Bogotá, Colombia",
      achievements: [
        "Migrated traditional ETL processes to SAS Guide for multiple financial clients",
        "Implemented automated visualization systems with SAS VIYA for compliance",
        "Achieved 70% reduction in report generation time transitioning from Excel to Power BI"
      ]
    },
    {
      title: "Systems Coordinator",
      company: "Gaviria & Borbón Asociados",
      period: "June 2018 - July 2019",
      location: "Bogotá, Colombia",
      achievements: [
        "Led coordination and management of technology services and systems infrastructure",
        "Ensured optimal performance and reliability of critical business operations",
        "Established robust backup and support protocols for mission-critical systems"
      ]
    }
  ],
  education: [
    {
      degree: "Software Engineering",
      institution: "Politécnico Grancolombiano",
      period: "January 2022 - Present",
      status: "8th semester completed",
      relevant_courses: [
        "Software Architecture",
        "Database Systems",
        "Cloud Computing",
        "Machine Learning"
      ]
    },
    {
      degree: "Automation and Robotics Technology",
      institution: "ECCI",
      period: "March 2017 - June 2021",
      status: "Degree option",
      relevant_courses: [
        "Control Systems",
        "Industrial Automation",
        "Robotics Programming",
        "Technical Automation Foundations"
      ]
    }
  ],
  certifications: [
    {
      name: "Associate Data Engineer in SQL",
      status: "Active",
      category: "Data",
      issuer: "DataCamp (DE101)"
    },
    {
      name: "Data Engineer in Python",
      status: "Active",
      category: "Data",
      issuer: "DataCamp (DE201)"
    },
    {
      name: "SQL Associate",
      status: "Active",
      category: "Data",
      issuer: "DataCamp"
    },
    {
      name: "Scrum Fundamentals Certified (SFC™)",
      status: "Active",
      category: "Project Management",
      issuer: "SCRUMstudy"
    },
    {
      name: "Python + SQL + Power BI (7 certifications)",
      status: "Active",
      category: "Programming & BI",
      issuer: "LinkedIn Learning, SoloLearn, ProgrammingHub",
      date: "2024",
      summary: "Comprehensive collection of certifications covering advanced programming methodologies and business intelligence tool mastery"
    }
  ],
  achievements: {
    performance_metrics: {
      "Data Pipeline Reliability": "99.9%",
      "Query Performance Improvement": "10x",
      "Cost Reduction": "60%",
      "Data Quality Score": "95%"
    },
    technologies_implemented: {
      "Apache Spark": 15,
      "AWS Services": 20,
      "Python": 25,
      "SQL": 30
    }
  },
  theme: {
    primary_color: "#00ff41",
    secondary_color: "#ff6b35",
    accent_color: "#4ecdc4",
    dark_color: "#1a1a1a",
    light_color: "#ffffff"
  },
  social: {
    github: "https://github.com/ericksang",
    linkedin: "https://linkedin.com/in/erick-sang-cifuentes",
    email: "erick.sang@example.com",
    website: "https://ericksang.dev"
  },
  meta: {
    keywords: "Data Engineer, Python, SQL, AWS, Azure, GCP, Power BI, ETL, Data Pipeline, Machine Learning",
    description: "Portfolio of Erick Sang Cifuentes, Data Engineer with 5+ years of experience in building robust data pipelines and cloud solutions."
  },
  leadershipStories: [
    {
      title: "Data Team Transformation",
      situation: "Inherited a team with outdated data practices and frequent pipeline failures",
      task: "Transform the data engineering team to implement modern practices and improve reliability",
      action: [
        "Implemented data governance framework",
        "Introduced CI/CD for data pipelines",
        "Established monitoring and alerting systems",
        "Provided training on modern data tools"
      ],
      result: "Reduced pipeline failures by 90%, improved team productivity by 40%, and established data quality standards",
      skills: ["Leadership", "Change Management", "Technical Architecture", "Team Development"]
    }
  ],
  certificateLinks: [
    {
      title: "AWS Solutions Architect",
      provider: "Amazon Web Services",
      url: "https://aws.amazon.com/verification",
      note: "Associate Level",
      date: "2023"
    },
    {
      title: "Google Cloud Data Engineer",
      provider: "Google Cloud",
      url: "https://cloud.google.com/certification",
      note: "Professional Level",
      date: "2023"
    }
  ],
  courses: [
    {
      id: "de-101",
      title: "Data Engineering Fundamentals",
      provider: "DataCamp",
      status: "completed",
      learningObjectives: [
        "Understand data pipeline architecture",
        "Learn ETL best practices",
        "Master data modeling techniques"
      ],
      courseId: "DE101",
      certificateUrl: "https://datacamp.com/certificate/DE101"
    },
    {
      id: "ml-ops",
      title: "MLOps Engineering",
      provider: "Coursera",
      status: "in-progress",
      learningObjectives: [
        "Deploy ML models in production",
        "Implement model monitoring",
        "Automate ML workflows"
      ],
      courseId: "MLOPS2024"
    }
  ]
};
