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
      title: "HR System with Data Warehouse - SohoHumantech",
      description: "Development of data warehouse for employee data centralization and HR metrics visualization",
      technologies: ["BigQuery", "LookerML", "React", "Tailwind CSS", "Python"],
      results: "40% improvement in HR query response times",
      impact: "Automated HR processes and improved talent management insights"
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
        "Developed data pipelines for HR information processing",
        "Designed data warehouse architecture for employee data centralization",
        "Implemented ETL/ELT solutions using Python and SQL",
        "Created interactive dashboards with LookerML and BigQuery",
        "Developed frontend with React and Tailwind CSS",
        "Optimized BigQuery queries achieving 40% improvement in response times"
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
      period: "December 2021 - March 2025",
      location: "Bogotá, Colombia",
      achievements: [
        "Designed and developed data pipelines for ingesting data from various sources",
        "Transformed and cleaned raw data using Python and SQL",
        "Maintained monitoring and uptime of all production databases and processes",
        "Built data models for data warehousing and analysis",
        "Implemented data visualization and reporting using Power BI and Excel VBA"
      ]
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
  }
};
