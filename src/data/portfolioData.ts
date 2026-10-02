/**
 * Single Source of Truth — Portfolio Data for Nodan Bhatia
 * All content strictly reflects the documented resume of Nodan Bhatia.
 *
 * SOCIAL LINKS CONFIGURATION:
 * Since the PDF resume displays "LinkedIn | GitHub" as labels without full URLs printed in text,
 * replace the `url` fields below with the exact profile slugs if customizing deployment.
 * When `isPlaceholder` is true, clicking the social link opens a transparent profile & contact
 * connection modal rather than navigating to a fake or broken profile URL.
 */

export interface SocialLinkConfig {
  platform: 'GitHub' | 'LinkedIn';
  label: string;
  url: string;
  handleText: string;
  isPlaceholder: boolean;
  configNote: string;
}

export const SOCIAL_LINKS_CONFIG: Record<'github' | 'linkedin', SocialLinkConfig> = {
  github: {
    platform: 'GitHub',
    label: 'GitHub',
    // Replace with exact GitHub profile URL (e.g. 'https://github.com/nodanbhatia')
    url: '',
    handleText: 'github.com (Configure profile slug in src/data/portfolioData.ts)',
    isPlaceholder: true,
    configNote:
      'The resume lists GitHub without a printed URL slug. Update SOCIAL_LINKS_CONFIG.github.url in src/data/portfolioData.ts with your exact GitHub profile URL.',
  },
  linkedin: {
    platform: 'LinkedIn',
    label: 'LinkedIn',
    // Replace with exact LinkedIn profile URL (e.g. 'https://www.linkedin.com/in/nodan-bhatia')
    url: '',
    handleText: 'linkedin.com (Configure profile slug in src/data/portfolioData.ts)',
    isPlaceholder: true,
    configNote:
      'The resume lists LinkedIn without a printed URL slug. Update SOCIAL_LINKS_CONFIG.linkedin.url in src/data/portfolioData.ts with your exact LinkedIn profile URL.',
  },
};

export const PROFILE_DATA = {
  name: 'NODAN BHATIA',
  displayName: 'Nodan Bhatia',
  title: 'Data Scientist | AI & Machine Learning',
  roleShort: 'Data Scientist',
  heroTagline:
    'Building data-driven solutions with Python, machine learning, analytics, NLP, and interactive visualization.',
  phone: '+91-7888958903',
  phoneHref: 'tel:+917888958903',
  email: 'nodanbhatia376@gmail.com',
  emailHref: 'mailto:nodanbhatia376@gmail.com',
  summary:
    'Strong technical foundation in data science, machine learning, and data analytics, supported by relevant AI Data Analyst internship experience. Well-structured projects demonstrating practical application of Python, SQL, predictive analytics, data wrangling, EDA, NLP, machine learning algorithms, and data visualization. Experienced in building end-to-end analytical solutions and interactive dashboards, with a focus on applying data-driven insights to real-world problems.',
  corePillars: [
    'Python',
    'SQL',
    'Data Wrangling',
    'EDA',
    'Machine Learning',
    'Predictive Analytics',
    'NLP',
    'Data Visualization',
  ],
  documentedHighlights: [
    {
      metric: '82% R²',
      label: 'Test Score on 10,000+ Sales Records',
      context: 'Walmart Sales Intelligence System',
    },
    {
      metric: '86%',
      label: 'Sentiment Classification Accuracy',
      context: 'Social Media NLP Analytics',
    },
    {
      metric: '20%',
      label: 'Data Validation Efficiency Gain',
      context: 'Optimized SQL Queries at InAmigos Foundation',
    },
    {
      metric: '9.1/10',
      label: 'Cumulative GPA (B.Tech. CSE — DS)',
      context: 'Chandigarh Group of Colleges, Landran',
    },
  ],
};

export interface SkillItem {
  name: string;
  category: string;
  description: string;
  appliedIn: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming & Querying',
    subtitle: 'Core languages and database querying for analytical pipelines',
    skills: [
      {
        name: 'Python',
        category: 'Programming & Querying',
        description:
          'Used for data analysis, machine learning, and end-to-end analytical solutions.',
        appliedIn: 'Walmart Sales System · Social Media NLP · AI Skin Specialist',
      },
      {
        name: 'SQL',
        category: 'Programming & Querying',
        description:
          'Used for data organization, validation, filtering, and analytical reporting—improving validation efficiency by 20%.',
        appliedIn: 'AI Data Analyst Internship (InAmigos Foundation)',
      },
      {
        name: 'MongoDB',
        category: 'Programming & Querying',
        description:
          'Document-oriented NoSQL querying for flexible, semi-structured data storage and retrieval.',
        appliedIn: 'Database Querying & Data Engineering Foundation',
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    subtitle: 'Data preparation, statistical exploration, and feature representation',
    skills: [
      {
        name: 'Pandas',
        category: 'Data Science',
        description:
          'Structured dataframe manipulation, aggregation, and cleaning across 10,000+ record datasets.',
        appliedIn: 'Walmart Sales System · Social Media Sentiment Analytics',
      },
      {
        name: 'NumPy',
        category: 'Data Science',
        description:
          'Vectorized numerical computing and array operations supporting statistical and ML pipelines.',
        appliedIn: 'Walmart Sales System · Social Media Sentiment Analytics',
      },
      {
        name: 'Data Wrangling',
        category: 'Data Science',
        description:
          'Transforming raw, multi-source organizational and transactional records into validated datasets.',
        appliedIn: 'InAmigos Foundation · Walmart Sales · Social Media Analytics',
      },
      {
        name: 'EDA',
        category: 'Data Science',
        description:
          'Exploratory Data Analysis to uncover seasonal trends, anomalies, engagement patterns, and distributions.',
        appliedIn: 'Walmart Sales System · Social Media Sentiment Analytics',
      },
      {
        name: 'Statistical Analysis',
        category: 'Data Science',
        description:
          'Quantitative summarization and hypothesis evaluation to support structured reporting and insights.',
        appliedIn: 'InAmigos Foundation · Social Media Sentiment Analytics',
      },
      {
        name: 'Data Modeling',
        category: 'Data Science',
        description:
          'Structuring analytical schemas and quantitative relationships for predictive workflows.',
        appliedIn: 'Walmart Sales Intelligence System · Analytical Reporting',
      },
      {
        name: 'Feature Engineering',
        category: 'Data Science',
        description:
          'Extracting and transforming domain predictors to maximize downstream regression and classification performance.',
        appliedIn: 'Walmart Sales Intelligence System',
      },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    subtitle: 'Supervised learning, predictive modeling, and rigorous metric validation',
    skills: [
      {
        name: 'Machine Learning Algorithms',
        category: 'Machine Learning',
        description:
          'End-to-end training and deployment of supervised learning pipelines across tabular, text, and image domains.',
        appliedIn: 'All Core Portfolio Projects',
      },
      {
        name: 'Regression',
        category: 'Machine Learning',
        description:
          'Continuous target modeling for forecasting total retail sales and quantitative business KPIs.',
        appliedIn: 'Walmart Sales Intelligence System',
      },
      {
        name: 'Classification',
        category: 'Machine Learning',
        description:
          'Multi-class categorization for user-generated sentiment polarity and preliminary image analysis.',
        appliedIn: 'Social Media Analytics · AI Skin Specialist',
      },
      {
        name: 'Random Forest',
        category: 'Machine Learning',
        description:
          'Ensemble tree-based modeling used to predict total Walmart sales, achieving an 82% R² score on the test set.',
        appliedIn: 'Walmart Sales Intelligence System',
      },
      {
        name: 'Predictive Analytics',
        category: 'Machine Learning',
        description:
          'Translating historical patterns into forward-looking forecasts and actionable business intelligence.',
        appliedIn: 'Walmart Sales Intelligence System · AI Skin Specialist',
      },
      {
        name: 'Model Evaluation',
        category: 'Machine Learning',
        description:
          'Quantitative assessment of generalization using MAE, RMSE, R², and classification accuracy on held-out test sets.',
        appliedIn: '82% R² (Walmart) · 86% Accuracy (Sentiment NLP)',
      },
    ],
  },
  {
    id: 'visualization-bi',
    title: 'Data Visualization & BI',
    subtitle: 'Interactive dashboards, visual storytelling, and KPI communication',
    skills: [
      {
        name: 'Power BI',
        category: 'Data Visualization & BI',
        description:
          'Interactive business intelligence dashboards for tracking operational metrics and executive KPIs.',
        appliedIn: 'Business Intelligence & Analytical Reporting',
      },
      {
        name: 'Tableau',
        category: 'Data Visualization & BI',
        description:
          'Visual analytics and multi-dimensional exploration for communicating complex dataset findings.',
        appliedIn: 'Data Visualization & Storytelling',
      },
      {
        name: 'Excel',
        category: 'Data Visualization & BI',
        description:
          'Applied alongside SQL for data organization, validation, filtering, and structured analytical reporting.',
        appliedIn: 'AI Data Analyst Internship (InAmigos Foundation)',
      },
      {
        name: 'Plotly',
        category: 'Data Visualization & BI',
        description:
          'Interactive charting integrated into Streamlit dashboards for exploring sales KPIs and ML predictions.',
        appliedIn: 'Walmart Sales Intelligence System',
      },
      {
        name: 'Seaborn',
        category: 'Data Visualization & BI',
        description:
          'Statistical plotting for distribution analysis, correlation heatmaps, and exploratory visual inspection.',
        appliedIn: 'Exploratory Data Analysis Workflows',
      },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    subtitle: 'Development environments, version control, and application deployment',
    skills: [
      {
        name: 'Streamlit',
        category: 'Tools & Platforms',
        description:
          'Building interactive web applications that unify business KPIs, exploratory charts, and live ML model inference.',
        appliedIn: 'Walmart Sales Intelligence System Dashboard',
      },
      {
        name: 'Git',
        category: 'Tools & Platforms',
        description:
          'Distributed version control for tracking experiments, model iterations, and reproducible pipelines.',
        appliedIn: 'End-to-End Project Development',
      },
      {
        name: 'GitHub',
        category: 'Tools & Platforms',
        description:
          'Source code hosting, documentation, and collaborative repository management.',
        appliedIn: 'Project Repositories & Version History',
      },
      {
        name: 'Jupyter Notebook',
        category: 'Tools & Platforms',
        description:
          'Interactive computing environment for iterative data wrangling, EDA, and model experimentation.',
        appliedIn: 'Data Science Research & Prototyping',
      },
      {
        name: 'VS Code',
        category: 'Tools & Platforms',
        description:
          'Primary code editor for developing modular Python scripts, Streamlit apps, and SQL queries.',
        appliedIn: 'Production Scripting & Application Development',
      },
    ],
  },
];

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  durationSummary: string;
  primaryMetric: {
    value: string;
    label: string;
    detail: string;
  };
  secondaryMetric: {
    value: string;
    label: string;
    detail: string;
  };
  responsibilities: string[];
  capabilityTags: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'inamigos-foundation',
    role: 'AI Data Analyst Intern',
    organization: 'InAmigos Foundation',
    period: 'Jul 2026 – Sep 2026',
    durationSummary: '2-Month Internship',
    primaryMetric: {
      value: '20%',
      label: 'Data Validation Efficiency Improvement',
      detail: 'Improved data validation efficiency by 20% through optimized SQL queries.',
    },
    secondaryMetric: {
      value: '10',
      label: 'Organizations Researched & Structured',
      detail:
        'Structured information from 10 organizations into validated datasets covering organizational details, initiatives, areas of work, and operational information.',
    },
    responsibilities: [
      'Completed a 2-month internship focused on data research, data collection, data wrangling, analysis, and insight generation.',
      'Researched and structured information from 10 organizations into validated datasets covering organizational details, initiatives, areas of work, and operational information.',
      'Applied Excel and SQL techniques for data organization, validation, filtering, and analytical reporting, improving data validation efficiency by 20% through optimized SQL queries.',
      'Prepared structured reports and summaries using statistical analysis, data visualization, and data-driven insights to support research and reporting activities.',
    ],
    capabilityTags: [
      'Data Research',
      'Data Collection',
      'Data Wrangling',
      'SQL Optimization',
      'Excel Validation',
      'Statistical Analysis',
      'Data Visualization',
      'Analytical Reporting',
    ],
  },
];

export interface ProjectWorkflowStage {
  step: string;
  title: string;
  detail: string;
}

export interface ProjectItem {
  id: 'walmart-sales' | 'social-sentiment' | 'ai-skin-specialist';
  index: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  modelName?: string;
  evaluationMetrics?: string[];
  documentedResult?: {
    primaryValue: string;
    primaryLabel: string;
    secondaryValue?: string;
    secondaryLabel?: string;
    summaryText: string;
  };
  disclaimer?: string;
  bulletPoints: string[];
  workflow: ProjectWorkflowStage[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'walmart-sales',
    index: '01',
    title: 'Walmart Sales Intelligence System',
    subtitle: 'Predictive Retail Analytics & Interactive Streamlit Dashboard',
    description:
      'An end-to-end sales intelligence system built to analyze and model 10,000+ Walmart sales records using data wrangling, exploratory data analysis, feature engineering, and predictive analytics.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Plotly', 'Streamlit'],
    features: [
      'Sales analysis',
      'Business KPIs',
      'Data visualization',
      'Feature engineering',
      'Predictive analytics',
      'Random Forest Regression',
      'Interactive Streamlit dashboard',
    ],
    modelName: 'Random Forest Regression',
    evaluationMetrics: ['MAE', 'RMSE', 'R²'],
    documentedResult: {
      primaryValue: '82% R²',
      primaryLabel: 'Test Set Score',
      secondaryValue: '10,000+',
      secondaryLabel: 'Walmart Sales Records',
      summaryText:
        'Achieved 82% R² score on the test set using Random Forest Regression evaluated with MAE, RMSE, and R².',
    },
    bulletPoints: [
      'Built an end-to-end sales intelligence system to analyze and model 10,000+ Walmart sales records using data wrangling, EDA, feature engineering, and predictive analytics.',
      'Developed a Random Forest Regression model to predict total sales and evaluated performance using MAE, RMSE, and R².',
      'Developed an interactive Streamlit dashboard containing business KPIs, sales analysis, data visualizations, and ML predictions.',
      'Achieved 82% R² score on the test set, demonstrating the model’s predictive performance.',
    ],
    workflow: [
      {
        step: '01',
        title: 'Problem',
        detail:
          'Retail sales fluctuate across store locations, temporal cycles, and promotional periods. Accurate total sales prediction and KPI visibility are essential for inventory and revenue planning.',
      },
      {
        step: '02',
        title: 'Data',
        detail:
          'Ingested and structured 10,000+ Walmart sales records using Python, Pandas, and NumPy, resolving missing values, formatting inconsistencies, and data types.',
      },
      {
        step: '03',
        title: 'EDA',
        detail:
          'Conducted exploratory data analysis to examine revenue distributions, store-level variance, seasonal trends, and correlations across operational variables.',
      },
      {
        step: '04',
        title: 'Feature Engineering',
        detail:
          'Constructed predictive features and encoded structured attributes to capture underlying sales drivers for tree-based regression modeling.',
      },
      {
        step: '05',
        title: 'Model',
        detail:
          'Trained a Random Forest Regression model in Scikit-learn to predict total sales across diverse store and transactional conditions.',
      },
      {
        step: '06',
        title: 'Evaluation',
        detail:
          'Evaluated predictive accuracy on the held-out test set using Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and Coefficient of Determination (R²), achieving an 82% R² score.',
      },
      {
        step: '07',
        title: 'Dashboard',
        detail:
          'Built an interactive Streamlit application powered by Plotly visualizations showcasing business KPIs, historical sales analysis, and interactive ML sales predictions.',
      },
    ],
  },
  {
    id: 'social-sentiment',
    index: '02',
    title: 'Social Media Sentiment & Engagement Analytics',
    subtitle: 'NLP Sentiment Classification & Audience Behavior Analysis',
    description:
      'An analytics solution for identifying engagement patterns, content performance, sentiment distribution, and audience behavior.',
    technologies: ['Python', 'Pandas', 'NumPy', 'NLP'],
    features: [
      'Data wrangling',
      'EDA',
      'Statistical analysis',
      'NLP sentiment analysis',
      'Engagement analysis',
      'Content performance analysis',
      'Sentiment classification',
    ],
    modelName: 'NLP Sentiment Classification Pipeline',
    evaluationMetrics: ['Classification Accuracy (86%)', 'Positive / Negative / Neutral Polarity'],
    documentedResult: {
      primaryValue: '86%',
      primaryLabel: 'Classification Accuracy',
      secondaryValue: '3 Classes',
      secondaryLabel: 'Positive · Neutral · Negative',
      summaryText:
        'Achieved 86% sentiment classification accuracy on the evaluated dataset across positive, negative, and neutral user-generated content.',
    },
    bulletPoints: [
      'Performed data wrangling, EDA, and statistical analysis to identify engagement patterns and content performance.',
      'Implemented NLP-based sentiment analysis to classify user-generated content into positive, negative, and neutral sentiment.',
      'Created analytical visualizations to evaluate engagement, sentiment distribution, audience behavior, and content performance.',
      'Achieved 86% sentiment classification accuracy on the evaluated dataset.',
    ],
    workflow: [
      {
        step: '01',
        title: 'Data Wrangling & Text Cleaning',
        detail:
          'Processed raw user-generated social media posts and engagement metrics using Python, Pandas, and NumPy to normalize text and remove noise.',
      },
      {
        step: '02',
        title: 'EDA & Statistical Analysis',
        detail:
          'Analyzed posting frequency, audience interaction distributions, and statistical relationships between content attributes and user engagement.',
      },
      {
        step: '03',
        title: 'NLP Sentiment Classification',
        detail:
          'Implemented an NLP classification pipeline categorizing user-generated content into Positive, Negative, and Neutral sentiment classes.',
      },
      {
        step: '04',
        title: 'Accuracy Validation',
        detail:
          'Validated the classification pipeline on the evaluated dataset, achieving 86% sentiment classification accuracy.',
      },
      {
        step: '05',
        title: 'Engagement & Content Visualization',
        detail:
          'Created analytical visualizations mapping sentiment distribution against audience behavior and content performance metrics.',
      },
    ],
  },
  {
    id: 'ai-skin-specialist',
    index: '03',
    title: 'AI Skin Specialist – Multimodal AI Assistant',
    subtitle: 'AI-Assisted Preliminary Image Classification Workflow',
    description:
      'An AI-assisted image analysis system for preliminary skin-condition classification using machine learning and image-processing techniques.',
    technologies: ['Python', 'Machine Learning', 'Image Processing'],
    features: [
      'Image preprocessing',
      'Image analysis',
      'Machine learning prediction',
      'Computer vision workflow',
      'Predictive classification',
    ],
    modelName: 'Computer Vision & ML Classification Pipeline',
    evaluationMetrics: ['Image Preprocessing Pipeline', 'Preliminary Predictive Classification'],
    disclaimer:
      'For educational and research purposes only. This project does not provide medical diagnosis or medical advice.',
    bulletPoints: [
      'Developed an AI-assisted image analysis system for preliminary skin-condition classification using machine learning and image-processing techniques.',
      'Implemented an image preprocessing and prediction pipeline using computer vision and machine learning algorithms.',
      'Structured the solution as an AI-assisted workflow for image analysis and predictive classification.',
    ],
    workflow: [
      {
        step: '01',
        title: 'Image Acquisition & Input Validation',
        detail:
          'Accepts dermatological image inputs within a structured educational research interface for preliminary visual inspection.',
      },
      {
        step: '02',
        title: 'Image Preprocessing',
        detail:
          'Applies image-processing techniques including resizing, color-space normalization, noise reduction, and contrast enhancement.',
      },
      {
        step: '03',
        title: 'Visual Feature Analysis',
        detail:
          'Extracts structural, textural, and chromatic region-of-interest patterns through a computer vision workflow.',
      },
      {
        step: '04',
        title: 'Machine Learning Prediction',
        detail:
          'Executes supervised machine learning algorithms to generate an AI-assisted preliminary image classification output.',
      },
      {
        step: '05',
        title: 'Research Summary Output',
        detail:
          'Presents preliminary classification indicators alongside clear educational and research-only disclaimers.',
      },
    ],
  },
];

export interface WorkflowPipelineNode {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  toolsUsed: string[];
  portfolioApplication: string;
}

export const WORKFLOW_STEPS: WorkflowPipelineNode[] = [
  {
    id: 'collection',
    stepNumber: '01',
    title: 'Data Collection',
    shortDesc: 'Sourcing multi-organization records, transactional datasets, and unstructured inputs.',
    toolsUsed: ['SQL', 'Python', 'Excel', 'MongoDB'],
    portfolioApplication:
      'Researched and collected operational data across 10 organizations at InAmigos Foundation and ingested 10,000+ Walmart sales records.',
  },
  {
    id: 'cleaning',
    stepNumber: '02',
    title: 'Data Cleaning',
    shortDesc: 'Wrangling, schema validation, deduplication, and SQL-based filtering.',
    toolsUsed: ['Pandas', 'SQL', 'Excel', 'Data Wrangling'],
    portfolioApplication:
      'Improved data validation efficiency by 20% through optimized SQL queries and structured raw records into validated datasets.',
  },
  {
    id: 'eda',
    stepNumber: '03',
    title: 'EDA',
    shortDesc: 'Uncovering distributions, anomalies, seasonal patterns, and statistical correlations.',
    toolsUsed: ['Pandas', 'NumPy', 'Seaborn', 'Plotly', 'Statistical Analysis'],
    portfolioApplication:
      'Performed exploratory data analysis on retail sales variance and social media engagement dynamics.',
  },
  {
    id: 'feature-engineering',
    stepNumber: '04',
    title: 'Feature Engineering',
    shortDesc: 'Transforming raw variables, NLP text representations, and image features for ML.',
    toolsUsed: ['Python', 'Pandas', 'NumPy', 'NLP', 'Image Processing'],
    portfolioApplication:
      'Engineered predictive sales attributes, text sentiment features, and normalized image representations.',
  },
  {
    id: 'modeling',
    stepNumber: '05',
    title: 'Modeling',
    shortDesc: 'Training supervised regression, NLP classification, and computer vision models.',
    toolsUsed: ['Scikit-learn', 'Random Forest', 'Regression', 'Classification'],
    portfolioApplication:
      'Built a Random Forest Regression model for Walmart sales forecasting and classification pipelines for NLP & image analysis.',
  },
  {
    id: 'evaluation',
    stepNumber: '06',
    title: 'Evaluation',
    shortDesc: 'Validating generalization performance with rigorous quantitative metrics.',
    toolsUsed: ['MAE', 'RMSE', 'R²', 'Classification Accuracy'],
    portfolioApplication:
      'Achieved 82% R² score on the Walmart sales test set and 86% accuracy on social media sentiment classification.',
  },
  {
    id: 'visualization',
    stepNumber: '07',
    title: 'Visualization',
    shortDesc: 'Building interactive dashboards and visual reports for technical and business stakeholders.',
    toolsUsed: ['Streamlit', 'Plotly', 'Power BI', 'Tableau', 'Seaborn'],
    portfolioApplication:
      'Developed an interactive Streamlit dashboard featuring business KPIs, sales analysis, and live ML predictions.',
  },
  {
    id: 'insights',
    stepNumber: '08',
    title: 'Insights',
    shortDesc: 'Translating quantitative findings into structured reports and real-world decisions.',
    toolsUsed: ['Analytical Reporting', 'Predictive Analytics', 'Business KPIs'],
    portfolioApplication:
      'Delivered data-driven reports supporting organizational research at InAmigos Foundation and actionable retail/engagement intelligence.',
  },
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  domainFocus: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'bcg-forage',
    title: 'Data Science Job Simulation',
    issuer: 'BCG X / Forage',
    date: 'Aug 2025',
    domainFocus: 'Applied Data Science & Business Framing',
  },
  {
    id: 'hp-life',
    title: 'Data Science & Analytics',
    issuer: 'HP LIFE',
    date: 'Aug 2026',
    domainFocus: 'Data Analytics & Analytical Methodologies',
  },
  {
    id: 'google-genai',
    title: 'Introduction to Generative AI',
    issuer: 'Google',
    date: 'Jul 2026',
    domainFocus: 'Generative AI Fundamentals & Modern AI Systems',
  },
  {
    id: 'ibm-python',
    title: 'Python 101 for Data Science',
    issuer: 'IBM / Cognitive Class',
    date: 'Apr 2025',
    domainFocus: 'Python Programming for Data Science Workflows',
  },
];

export const EDUCATION_DATA = {
  degree: 'B.Tech. Computer Science Engineering – Data Science',
  institution: 'Chandigarh Group of Colleges, Landran',
  cgpa: '9.1/10',
  passout: 'Passout 2028',
  highlights: [
    'Specialization in Data Science within Computer Science Engineering',
    'Consistent academic excellence with a 9.1/10 Cumulative Grade Point Average',
    'Strong coursework alignment with Python, SQL, Machine Learning, Statistical Analysis, and Data Modeling',
  ],
};
