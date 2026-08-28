export interface Project {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  role: string;
  technologies: string[];
  approach: string;
  features: string[];
  impact: string[];
  gradient: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: 'enterprise-crm',
    title: 'Enterprise Multi-Cloud CRM Platform',
    industry: 'Energy & Enterprise',
    challenge: 'A global enterprise needed to unify disconnected sales, service, and customer experience systems into a single Salesforce platform — eliminating data silos and enabling a complete customer 360 view across business units.',
    role: 'Lead Salesforce Developer — Architecture design, Apex development, multi-cloud configuration, LWC component library, and phased go-live coordination.',
    technologies: ['Sales Cloud', 'Service Cloud', 'Experience Cloud', 'Apex', 'Lightning Web Components', 'Flows', 'Platform Events', 'Data Migration'],
    approach: 'Designed a multi-cloud architecture with a shared data model, unified security framework, and custom Lightning components. Implemented a phased rollout strategy — Sales Cloud first, then Service Cloud and Experience Cloud — to minimize business disruption while maintaining data integrity across clouds.',
    features: [
      'Unified customer data model across Sales, Service, and Experience Cloud',
      'Custom LWC component library for consistent UI across clouds',
      'Role-based dashboards with real-time pipeline and case metrics',
      'Automated case routing and escalation with custom Apex logic',
      'Platform Events for real-time cross-cloud data synchronization',
      'Experience Cloud partner portal with self-service capabilities',
    ],
    impact: [
      'Unified customer 360 view across all business units',
      'Streamlined agent workflows reducing context-switching',
      'Improved data consistency and reporting accuracy',
      'Enabled self-service for partners and customers',
    ],
    gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent',
    icon: 'Building2',
  },
  {
    id: 'loan-origination',
    title: 'Financial Services Loan Origination Platform',
    industry: 'Financial Services & Lending',
    challenge: 'A financial services organization relied on manual loan processing with disconnected spreadsheets, creating compliance risks, slow approval cycles, and poor visibility into pipeline status.',
    role: 'Lead Developer — Custom Apex business logic, automated eligibility workflows, document generation, security model design, and integration architecture.',
    technologies: ['Salesforce Platform', 'Apex', 'Lightning Web Components', 'SOQL', 'Flows', 'Custom Objects', 'Reports & Dashboards', 'Document Generation'],
    approach: 'Built an end-to-end loan origination system on Salesforce with custom objects for applications, eligibility rules, and document tracking. Implemented automated eligibility checks using Apex, Flow-based approval processes, and a compliance-ready audit trail. Designed a security model with field-level security and sharing rules to protect sensitive financial data.',
    features: [
      'Custom loan application lifecycle with stage-based processing',
      'Automated eligibility scoring engine built in Apex',
      'Dynamic document generation and tracking',
      'Multi-level approval workflows with conditional routing',
      'Compliance audit trail with complete history tracking',
      'Real-time loan pipeline dashboards for management',
    ],
    impact: [
      'Accelerated loan approval cycle time',
      'Reduced manual data entry and processing errors',
      'Improved regulatory compliance with automated audit trails',
      'Enhanced pipeline visibility for leadership',
    ],
    gradient: 'from-emerald-600/20 via-teal-500/10 to-transparent',
    icon: 'Landmark',
  },
  {
    id: 'cpq-revenue',
    title: 'Revenue Cloud & CPQ Quote-to-Cash Transformation',
    industry: 'Manufacturing',
    challenge: 'A manufacturing company struggled with complex product configurations, manual quoting processes, frequent pricing errors, and disconnected revenue operations from quote to invoice.',
    role: 'Lead Developer — CPQ configuration, custom pricing rules with Apex, product bundle architecture, guided selling flows, and ERP integration design.',
    technologies: ['Revenue Cloud', 'Salesforce CPQ', 'Apex', 'Lightning Web Components', 'REST APIs', 'Custom Pricing Rules', 'Guided Selling'],
    approach: 'Implemented Salesforce CPQ with Revenue Cloud to automate the entire quote-to-cash lifecycle. Designed complex product bundles with dynamic pricing rules, discount approvals, and guided selling experiences. Built custom Apex extensions for pricing calculations that exceeded standard CPQ capabilities. Integrated with the existing ERP system via REST APIs for order fulfillment.',
    features: [
      'Dynamic product configuration with bundle rules',
      'Custom Apex pricing engine for complex discount scenarios',
      'Guided selling flows for sales representatives',
      'Automated approval workflows for discount thresholds',
      'ERP integration for seamless order-to-fulfillment',
      'Revenue lifecycle tracking from quote to cash',
    ],
    impact: [
      'Eliminated pricing and configuration errors',
      'Significantly reduced quote generation time',
      'Connected the full revenue lifecycle end-to-end',
      'Improved sales team productivity and accuracy',
    ],
    gradient: 'from-purple-600/20 via-violet-500/10 to-transparent',
    icon: 'Receipt',
  },
  {
    id: 'experience-portal',
    title: 'Experience Cloud Self-Service Portal',
    industry: 'Customer Experience & Digital Portal',
    challenge: 'Customers and partners lacked self-service access to account data, support case tracking, and knowledge resources — driving high support volume and slow resolution times.',
    role: 'Lead Developer — Portal architecture, custom LWC components, Apex REST API development, SSO implementation, and community design.',
    technologies: ['Experience Cloud', 'Lightning Web Components', 'Apex REST', 'Named Credentials', 'SSO', 'Knowledge Base', 'Custom Themes'],
    approach: 'Designed and built a branded Experience Cloud portal with role-based access for customers and partners. Created custom LWC components for case submission, real-time case tracking, and knowledge article search. Implemented Apex REST APIs for external system integration and configured SSO for seamless authentication.',
    features: [
      'Branded self-service portal with responsive design',
      'Real-time case submission and status tracking',
      'Integrated knowledge base with search functionality',
      'Role-based content and feature visibility',
      'SSO authentication with external identity providers',
      'Apex REST APIs for external data integration',
    ],
    impact: [
      'Reduced inbound support ticket volume',
      'Improved customer and partner satisfaction',
      'Enabled 24/7 self-service access to critical information',
      'Decreased average case resolution time',
    ],
    gradient: 'from-cyan-600/20 via-sky-500/10 to-transparent',
    icon: 'Globe',
  },
  {
    id: 'crm-analytics',
    title: 'CRM Analytics & Sales Intelligence Dashboard',
    industry: 'Sales Operations & Business Intelligence',
    challenge: 'Sales leadership relied on manually compiled spreadsheet reports with stale data, no real-time pipeline visibility, and subjective forecasting that missed critical trends.',
    role: 'Lead Developer — CRM Analytics dataflow design, custom SAQL queries, Apex data service layer, dashboard architecture, and Einstein predictive scoring.',
    technologies: ['CRM Analytics', 'Einstein Analytics', 'SAQL', 'Dataflows', 'Lightning Dashboards', 'Apex', 'Einstein Prediction Builder'],
    approach: 'Implemented CRM Analytics with automated dataflows pulling from Sales Cloud objects. Designed role-aware dashboards with drill-down capabilities and custom SAQL queries for complex pipeline analysis. Integrated Einstein Prediction Builder for lead scoring and deal probability forecasting.',
    features: [
      'Real-time pipeline dashboards with drill-down analysis',
      'Automated dataflows with scheduled data refresh',
      'Custom SAQL queries for complex sales metrics',
      'Einstein predictive lead and opportunity scoring',
      'Role-based dashboard visibility and filtering',
      'Embedded analytics in Lightning record pages',
    ],
    impact: [
      'Real-time pipeline visibility for leadership',
      'Data-driven decision making replacing gut-feel forecasts',
      'Improved forecast accuracy with predictive scoring',
      'Reduced time spent on manual report generation',
    ],
    gradient: 'from-amber-600/20 via-orange-500/10 to-transparent',
    icon: 'BarChart3',
  },
  {
    id: 'devops-cicd',
    title: 'Enterprise Salesforce DevOps & CI/CD Modernization',
    industry: 'Enterprise SaaS',
    challenge: 'The development team relied on manual change sets for deployments, with no version control, high deployment failure rates, and inconsistent sandbox environments causing production issues.',
    role: 'Technical Lead — CI/CD pipeline architecture, Git branching strategy, automated testing framework, release management process, and team enablement.',
    technologies: ['Git', 'GitHub Actions', 'Salesforce CLI', 'Scratch Orgs', 'PMD/Apex Static Analysis', 'Jest (LWC Testing)', 'Deployment Automation'],
    approach: 'Designed and implemented a modern CI/CD pipeline replacing manual change sets. Established Git-based source control with a branching strategy aligned to Salesforce development. Built automated pipelines with static code analysis, Apex test execution, and environment-specific deployment automation. Introduced scratch orgs for isolated development.',
    features: [
      'Git-based source control with feature branch workflow',
      'Automated CI pipelines with code quality gates',
      'Static code analysis with PMD for Apex',
      'Automated Apex test execution on every commit',
      'Environment-specific deployment automation',
      'Scratch org provisioning for isolated development',
    ],
    impact: [
      'Reduced deployment failures significantly',
      'Faster release cycles with automated testing',
      'Improved code quality through automated checks',
      'Increased team velocity and developer confidence',
    ],
    gradient: 'from-rose-600/20 via-pink-500/10 to-transparent',
    icon: 'GitBranch',
  },
];
