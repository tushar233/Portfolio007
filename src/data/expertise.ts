export interface ExpertiseCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export const expertiseCategories: ExpertiseCategory[] = [
  {
    id: 'clouds',
    title: 'Salesforce Clouds',
    description: 'Deep implementation experience across the core Salesforce cloud ecosystem — from sales pipeline management and CPQ to customer self-service portals and Data Cloud.',
    icon: 'Cloud',
    items: ['Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Data Cloud', 'CPQ & Revenue', 'Experience Cloud'],
  },
  {
    id: 'development',
    title: 'Development & Apex',
    description: 'Backend and frontend Salesforce development — writing scalable Apex, building responsive Lightning Web Components, and designing high-throughput asynchronous architectures.',
    icon: 'Code',
    items: ['Apex', 'Apex Triggers', 'LWC', 'Async Apex', 'Batch Apex', 'Queueable Apex', 'Future Methods', 'Schedulable Apex'],
  },
  {
    id: 'integration',
    title: 'Integration Layer',
    description: 'Connecting Salesforce to external systems and building real-time data pipelines — REST, SOAP, platform events, named credentials, and event-driven architectures.',
    icon: 'Plug',
    items: ['REST APIs', 'SOAP APIs', 'External Integrations', 'Platform Events', 'Named Credentials', 'Connected Apps', 'Change Data Capture'],
  },
  {
    id: 'architecture',
    title: 'Architecture & Security',
    description: 'Designing Salesforce solutions that scale — data modeling, security architecture, governor limit strategies, role hierarchies, and multi-cloud patterns.',
    icon: 'Layers',
    items: ['Data Modeling', 'Security & Sharing', 'Access Control', 'Automation Design', 'Scalability Patterns', 'Performance Optimization'],
  },
  {
    id: 'delivery',
    title: 'DevOps & Delivery',
    description: 'End-to-end delivery from development to production — CI/CD pipelines, scratch org workflows, testing strategies, automated deployments, and production support.',
    icon: 'Rocket',
    items: ['CI/CD Pipelines', 'Git & Version Control', 'Salesforce CLI', 'Deployment Automation', 'Unit & Jest Testing', 'Production Support'],
  },
];

export interface Specialization {
  id: string;
  title: string;
  whatIWorkOn: string;
  technologies: string[];
  problemsSolved: string[];
  approach: string;
}

export const specializations: Specialization[] = [
  {
    id: 'apex-triggers',
    title: 'Apex & Triggers',
    whatIWorkOn: 'Complex server-side business logic, trigger frameworks, bulk data processing, and custom Apex services that extend Salesforce beyond declarative limits.',
    technologies: ['Apex Classes', 'Apex Triggers', 'Trigger Frameworks', 'Custom Metadata', 'SOQL/SOSL', 'Exception Handling'],
    problemsSolved: [
      'Complex validation rules that exceed formula limits',
      'Cross-object data synchronization and rollups',
      'Custom business logic with multiple decision branches',
      'Bulk data processing within governor limits',
    ],
    approach: 'Build with a trigger framework pattern — one trigger per object, handler classes for logic, and custom metadata for configuration. Every line of Apex is bulkified, test-covered, and designed for maintainability.',
  },
  {
    id: 'async-apex',
    title: 'Asynchronous Apex',
    whatIWorkOn: 'Long-running operations, scheduled processes, high-volume data processing, and chained asynchronous workflows that handle millions of records.',
    technologies: ['Batch Apex', 'Queueable Apex', 'Future Methods', 'Scheduled Apex', 'Platform Events', 'Change Data Capture'],
    problemsSolved: [
      'Processing large datasets exceeding synchronous limits',
      'Chaining complex multi-step operations',
      'Scheduled nightly data syncs and cleanups',
      'Real-time event-driven processing',
    ],
    approach: 'Select the right async pattern for each use case — Batch for volume, Queueable for chaining, Future for fire-and-forget callouts, Scheduled for recurring jobs. Always design for idempotency and error recovery.',
  },
  {
    id: 'lwc',
    title: 'Lightning Web Components',
    whatIWorkOn: 'Custom UI components, reusable component libraries, complex data tables, interactive forms, and Lightning page compositions that deliver modern user experiences.',
    technologies: ['LWC', 'Lightning Data Service', 'Wire Service', 'SLDS', 'Custom Events', 'Lightning Message Service'],
    problemsSolved: [
      'Complex multi-step forms with dynamic fields',
      'Custom data tables with inline editing and search',
      'Reusable component libraries for consistency',
      'Real-time data updates without page refresh',
    ],
    approach: 'Component-driven architecture with clear parent-child communication patterns. Use Wire for reactive data, imperative Apex for complex operations, and Lightning Message Service for cross-component communication.',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    whatIWorkOn: 'REST and SOAP API integrations, external system connectivity, real-time data synchronization, and integration architecture that handles errors gracefully.',
    technologies: ['REST APIs', 'SOAP APIs', 'Named Credentials', 'External Services', 'Platform Events', 'Outbound Messages', 'Apex Callouts'],
    problemsSolved: [
      'Connecting Salesforce to ERP, billing, and marketing systems',
      'Real-time data sync between Salesforce and external databases',
      'OAuth-based authentication with external APIs',
      'Handling API rate limits and retry logic',
    ],
    approach: 'Design integrations with clear contract definitions, retry mechanisms, and error logging. Use Named Credentials for secure auth, Platform Events for async patterns, and custom Apex services for complex transformations.',
  },
  {
    id: 'sf-clouds',
    title: 'Salesforce Clouds',
    whatIWorkOn: 'Multi-cloud implementations across Sales, Service, Marketing, Data, and Experience Cloud — configuring, customizing, and integrating cloud products to work as a unified platform.',
    technologies: ['Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Data Cloud', 'Experience Cloud', 'Omni-Channel'],
    problemsSolved: [
      'Multi-cloud data unification and customer 360',
      'Cross-cloud process alignment for sales and service teams',
      'Customer self-service portals on Experience Cloud',
      'Marketing automation and journey orchestration',
    ],
    approach: 'Evaluate each cloud product against business requirements, design cross-cloud data models, implement with a phased rollout strategy, and ensure seamless integration between clouds.',
  },
  {
    id: 'cpq',
    title: 'CPQ & Revenue Cloud',
    whatIWorkOn: 'Salesforce CPQ and Revenue Cloud delivery — product catalogs, pricing rules, quote templates, guided selling, subscription lifecycle, and quote-to-cash automation for complex enterprise sales.',
    technologies: ['Salesforce CPQ', 'Product Rules', 'Price Rules', 'Quote Templates', 'Guided Selling', 'Subscription Management', 'Apex Pricing Plugins'],
    problemsSolved: [
      'Complex product bundling and configuration rules',
      'Multi-tier discounting and contract pricing models',
      'Quote-to-cash automation with approval chains',
      'Subscription renewals, amendments, and revenue recognition handoffs',
    ],
    approach: 'Model product catalogs and pricing logic declaratively first, extend with Apex only where CPQ limits require it. Design quote flows for sales usability, enforce governance with approval rules, and test pricing scenarios across edge cases before go-live.',
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture',
    whatIWorkOn: 'Data model design, large data volume strategies, security architecture, sharing models, and data migration — ensuring Salesforce data structures support business growth.',
    technologies: ['Custom Objects', 'Data Modeling', 'Sharing Rules', 'Profiles & Permission Sets', 'Field-Level Security', 'Data Migration', 'External Objects'],
    problemsSolved: [
      'Designing data models for complex business domains',
      'Optimizing queries for large data volumes',
      'Implementing row-level security with sharing rules',
      'Migrating data from legacy systems with transformation',
    ],
    approach: 'Start with entity relationship mapping from business requirements, normalize where appropriate, plan for large data volumes from day one, and implement security at every layer — object, field, and record level.',
  },
];

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  isPlaceholder: boolean;
}

export const experienceItems: ExperienceItem[] = [
  {
    id: 'exp-4',
    year: '2023 - Present',
    role: 'Lead Salesforce Developer & Technical Architect',
    company: '[Enterprise CRM Consulting / Nixopix]',
    duration: 'Current Role',
    responsibilities: [
      'Lead end-to-end Salesforce solution architecture and multi-cloud delivery across enterprise programs',
      'Design complex Apex backend architectures, trigger frameworks, and high-performance LWC components',
      'Architect robust REST/SOAP API integrations connecting Salesforce with ERP, payment, and data platforms',
      'Drive enterprise DevOps practices: Git branching models, scratch orgs, CI/CD pipelines, and code reviews',
      'Mentor developer teams, govern platform standards, and conduct architectural review board assessments',
    ],
    technologies: ['Sales Cloud', 'Service Cloud', 'Data Cloud', 'CPQ', 'Apex', 'LWC', 'REST APIs', 'CI/CD'],
    isPlaceholder: true,
  },
  {
    id: 'exp-3',
    year: '2021 - 2023',
    role: 'Senior Salesforce Developer',
    company: '[Enterprise Technology Solutions]',
    duration: '2 Years',
    responsibilities: [
      'Designed and implemented asynchronous processing engines with Batch, Queueable, and Scheduled Apex',
      'Built reusable Lightning Web Component libraries adopting SLDS and Lightning Message Service',
      'Configured and customized Salesforce CPQ pricing rules, quote calculators, and guided selling workflows',
      'Built custom REST APIs and webhook listeners with Named Credentials and OAuth2.0 authentication',
    ],
    technologies: ['Apex', 'LWC', 'CPQ', 'Platform Events', 'Named Credentials', 'Flows'],
    isPlaceholder: true,
  },
  {
    id: 'exp-2',
    year: '2019 - 2021',
    role: 'Salesforce Developer',
    company: '[Cloud Services & Systems]',
    duration: '2 Years',
    responsibilities: [
      'Developed custom Apex classes, triggers, and test classes achieving 90%+ code coverage',
      'Engineered Lightning components and declarative automations using advanced Salesforce Flows',
      'Implemented data model customizations, field-level security, and sharing rules for enterprise compliance',
      'Executed bulk data migrations using Salesforce Data Loader and CLI tools',
    ],
    technologies: ['Apex', 'Triggers', 'Flows', 'SOQL/SOSL', 'Data Loader', 'Change Sets'],
    isPlaceholder: true,
  },
  {
    id: 'exp-1',
    year: '2017 - 2019',
    role: 'Associate Salesforce Developer',
    company: '[Technology Consulting Group]',
    duration: '2 Years',
    responsibilities: [
      'Configured standard and custom objects, validation rules, page layouts, and record types',
      'Wrote foundational Apex triggers and unit tests following Salesforce development best practices',
      'Configured role hierarchies, user profiles, permission sets, and security access controls',
      'Built interactive reports and executive KPI dashboards for sales and service leadership',
    ],
    technologies: ['Salesforce Admin', 'Apex Basics', 'SOQL', 'Validation Rules', 'Reports & Dashboards'],
    isPlaceholder: true,
  },
];

export interface Certification {
  title: string;
  issuer: string;
  category: string;
  badgeColor: string;
}

export const CERTIFICATION_PRIORITY = [
  'Salesforce Certified Administrator',
  'Salesforce Certified Platform Developer I',
  'Salesforce Certified Platform Developer II',
  'Salesforce Certified Data Cloud',
  'Salesforce Certified Revenue Cloud / CPQ Specialist',
  'Salesforce Certified Service Cloud Consultant',
  'Salesforce Certified Sales Cloud Consultant',
  'Salesforce Certified AI Specialist',
] as const;

/** @deprecated Use CERTIFICATION_PRIORITY */
export const CERTIFICATION_ORDER = CERTIFICATION_PRIORITY;

/** Alternate titles mapped to canonical priority keys */
const CERT_TITLE_ALIASES: Record<string, string> = {
  'Salesforce Certified Data Cloud Consultant / Specialist': 'Salesforce Certified Data Cloud',
};

function canonicalCertTitle(title: string): string {
  return CERT_TITLE_ALIASES[title] ?? title;
}

export const certifications: Certification[] = [
  {
    title: 'Salesforce Certified Administrator',
    issuer: 'Salesforce',
    category: 'Administration',
    badgeColor: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'Salesforce Certified Platform Developer I',
    issuer: 'Salesforce',
    category: 'Development',
    badgeColor: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'Salesforce Certified Platform Developer II',
    issuer: 'Salesforce',
    category: 'Development',
    badgeColor: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Salesforce Certified Data Cloud',
    issuer: 'Salesforce',
    category: 'Consulting',
    badgeColor: 'from-teal-600 to-cyan-600',
  },
  {
    title: 'Salesforce Certified Revenue Cloud / CPQ Specialist',
    issuer: 'Salesforce',
    category: 'Consulting',
    badgeColor: 'from-amber-600 to-orange-600',
  },
  {
    title: 'Salesforce Certified Service Cloud Consultant',
    issuer: 'Salesforce',
    category: 'Consulting',
    badgeColor: 'from-purple-600 to-indigo-600',
  },
  {
    title: 'Salesforce Certified Sales Cloud Consultant',
    issuer: 'Salesforce',
    category: 'Consulting',
    badgeColor: 'from-orange-600 to-amber-600',
  },
  {
    title: 'Salesforce Certified AI Specialist',
    issuer: 'Salesforce',
    category: 'AI & Data',
    badgeColor: 'from-fuchsia-600 to-pink-600',
  },
  {
    title: 'Salesforce Certified JavaScript Developer I',
    issuer: 'Salesforce',
    category: 'Development',
    badgeColor: 'from-sky-600 to-blue-600',
  },
  {
    title: 'Salesforce Certified Sharing and Visibility Architect',
    issuer: 'Salesforce',
    category: 'Architecture',
    badgeColor: 'from-violet-600 to-purple-600',
  },
  {
    title: 'Salesforce Certified Integration Architect',
    issuer: 'Salesforce',
    category: 'Architecture',
    badgeColor: 'from-indigo-600 to-blue-700',
  },
];

/** Deduplicated certifications — priority sequence first, then remaining specialized credentials */
export function getOrderedCertifications(): Certification[] {
  const seen = new Set<string>();
  const byCanonical = new Map<string, Certification>();

  for (const cert of certifications) {
    const canonical = canonicalCertTitle(cert.title);
    if (!byCanonical.has(canonical)) {
      byCanonical.set(canonical, { ...cert, title: canonical });
    }
  }

  const ordered: Certification[] = [];

  for (const title of CERTIFICATION_PRIORITY) {
    const cert = byCanonical.get(title);
    if (cert && !seen.has(title)) {
      seen.add(title);
      ordered.push(cert);
    }
  }

  for (const cert of certifications) {
    const canonical = canonicalCertTitle(cert.title);
    if (!seen.has(canonical)) {
      seen.add(canonical);
      const match = byCanonical.get(canonical);
      if (match) ordered.push(match);
    }
  }

  return ordered;
}
