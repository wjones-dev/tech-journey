import { TechnologyDetail } from './technology-detail.model';

export const TECHNOLOGY_DETAILS: TechnologyDetail[] = [
  {
    key: 'java',
    technology: 'Java',
    heading: 'Java',

    imageUrl: '/images/timeline/1995_Java.png',

    imageAlt: 'Java software development',

    technologyDescription:
      'Java is an object-oriented programming language used extensively for enterprise applications, backend services, REST APIs, and large-scale software systems.',

    whyItMatters:
      'Java became one of the core technologies behind my professional software development work and continues to be central to the backend systems and services I build.',

    concepts: [
      'Object-Oriented Design',
      'Collections',
      'Streams & Lambdas',
      'REST APIs',
      'Enterprise Development',
      'Spring Ecosystem',
    ],

    visualCaption: 'ENTERPRISE SOFTWARE DEVELOPMENT',

    labType: 'java',

    labAvailable: false,
  },

  {
    key: 'atari-2600',
    technology: 'Atari 2600',
    heading: 'Atari 2600',

    imageUrl: '/images/timeline/1983_Atari_2600.png',

    imageAlt: 'Atari 2600 and early video gaming',

    technologyDescription:
      'The Atari 2600 helped bring programmable video games into the home through interchangeable game cartridges and simple controller-based interaction.',

    whyItMatters:
      'The Atari 2600 was one of my earliest encounters with technology and helped spark the curiosity that would eventually grow into a career in software development.',

    concepts: [
      '8-Bit Computing',
      'Cartridge Software',
      'Game Logic',
      'Controller Input',
      'Consumer Electronics',
      'Early Home Computing',
    ],

    visualCaption: 'WHERE THE JOURNEY BEGAN',
  },

  {
    key: 'home-computers',
    technology: 'Home Computers',
    heading: 'Home Computers',

    imageUrl: '/images/timeline/1985_Home_Computing.png',

    imageAlt: 'Early home computer technology',

    technologyDescription:
      'Home computers brought general-purpose computing into everyday life and demonstrated that computers could be used for productivity, learning, programming, and entertainment.',

    whyItMatters:
      'Home computers expanded my view of technology beyond video games and introduced the idea that computers could be tools for creating and solving problems.',

    concepts: [
      'Personal Computing',
      'Operating Systems',
      'Local Storage',
      'Computer Hardware',
      'Software Applications',
      'User Interaction',
    ],

    visualCaption: 'COMPUTING COMES HOME',
  },

  {
    key: 'the-early-internet',
    technology: 'Internet',
    heading: 'The Early Internet',

    imageUrl: '/images/timeline/1993_Internet.png',

    imageAlt: 'Early internet and network connectivity',

    technologyDescription:
      'The early internet connected computers across networks and transformed how information could be discovered, communicated, and shared around the world.',

    whyItMatters:
      'The internet changed my understanding of computers from standalone machines into connected systems capable of communicating across vast distances.',

    concepts: [
      'Computer Networks',
      'TCP/IP',
      'Client-Server Communication',
      'Web Browsers',
      'Internet Protocols',
      'Distributed Computing',
    ],

    visualCaption: 'THE WORLD BECOMES CONNECTED',
  },

  {
    key: 'html-web-development',
    technology: 'HTML / CSS / JavaScript',
    heading: 'HTML / Web Development',

    imageUrl: '/images/timeline/1996_HTML.png',

    imageAlt: 'HTML and early web development',

    technologyDescription:
      'HTML provided the structure for web pages while CSS and JavaScript evolved the web into a platform for increasingly rich and interactive experiences.',

    whyItMatters:
      'Web development introduced me to building experiences that users could interact with directly through a browser.',

    concepts: ['HTML', 'CSS', 'JavaScript', 'DOM', 'Browser Rendering', 'Web Development'],

    visualCaption: 'BUILDING FOR THE WEB',
  },

  {
    key: 'napster-file-sharing',
    technology: 'Napster / P2P',
    heading: 'Napster / File Sharing',

    imageUrl: '/images/timeline/1999_Napster_Nights.png',

    imageAlt: 'Napster and peer-to-peer file sharing',

    technologyDescription:
      'Napster demonstrated how networked software could connect large numbers of users and enable digital files to be discovered and shared across the internet.',

    whyItMatters:
      'Napster was an early example of software dramatically changing user behavior and disrupting an established industry through networked technology.',

    concepts: [
      'Peer-to-Peer',
      'File Sharing',
      'Networking',
      'Distributed Systems',
      'File Discovery',
      'Digital Media',
    ],

    visualCaption: 'SOFTWARE DISRUPTS AN INDUSTRY',
  },

  {
    key: 'mobile-phones-flip-phones',
    technology: 'Mobile Phones',
    heading: 'Mobile Phones / Flip Phones',

    imageUrl: '/images/timeline/2002_Mobile_Phones.png',

    imageAlt: 'Early mobile phones and flip phones',

    technologyDescription:
      'Mobile phones moved communication away from fixed locations and placed increasingly capable computing and connectivity into devices people carried everywhere.',

    whyItMatters:
      'Mobile technology represented another major shift in how I interacted with technology by making digital communication continuously accessible.',

    concepts: [
      'Wireless Communication',
      'Mobile Networks',
      'Embedded Systems',
      'SMS',
      'Portable Computing',
      'User Mobility',
    ],

    visualCaption: 'TECHNOLOGY BECOMES MOBILE',
  },

  {
    key: 'databases-and-persistence',
    technology: 'Oracle / SQL / JDBC / Hibernate',
    heading: 'Databases & Persistence',

    imageUrl: '/images/timeline/2008_Database.png',

    imageAlt: 'Database and enterprise data persistence',

    technologyDescription:
      'Relational databases provide structured and reliable persistence for application data, while technologies such as JDBC and Hibernate connect Java applications to that data.',

    whyItMatters:
      'Database development became a fundamental part of my enterprise work and remains essential to building applications that reliably store, retrieve, and manage business information.',

    concepts: [
      'SQL',
      'Relational Databases',
      'JDBC',
      'Hibernate',
      'Data Persistence',
      'Transactions',
    ],

    visualCaption: 'PERSISTING ENTERPRISE DATA',
  },

  {
    key: 'spring-boot',
    technology: 'Spring Boot / Maven',
    heading: 'Spring Boot',

    imageUrl: '/images/timeline/2014_Spring_Boot.png',

    imageAlt: 'Spring Boot and modern Java development',

    technologyDescription:
      'Spring Boot simplifies the creation of production-ready Java applications through convention, dependency management, auto-configuration, and the broader Spring ecosystem.',

    whyItMatters:
      'Spring Boot became one of the primary technologies I use to build backend applications, REST services, and enterprise Java systems.',

    concepts: [
      'Dependency Injection',
      'Spring MVC',
      'Spring Data',
      'Auto-Configuration',
      'Maven',
      'Microservices',
    ],

    visualCaption: 'MODERN JAVA DEVELOPMENT',

    labType: 'spring',

    labAvailable: false,
  },

  {
    key: 'rest-apis',
    technology: 'REST / JSON / HTTP',
    heading: 'REST APIs',

    imageUrl: '/images/timeline/2015_REST_APIs.png',

    imageAlt: 'REST API software architecture',

    technologyDescription:
      'REST APIs provide standardized HTTP interfaces that allow applications and services to exchange data through clearly defined resources and operations.',

    whyItMatters:
      'Designing and maintaining REST APIs is a central part of my backend development work and connects many of the frontend, backend, cloud, and integration technologies I use.',

    concepts: ['HTTP', 'JSON', 'REST', 'Status Codes', 'Request / Response', 'API Design'],

    visualCaption: 'APPLICATIONS START TALKING',
  },

  {
    key: 'single-page-applications-spa',
    technology: 'Angular / TypeScript / React / Vue',
    heading: 'Single-Page Applications',

    imageUrl: '/images/timeline/2016_SPA.png',

    imageAlt: 'Modern single-page web application development',

    technologyDescription:
      'Single-page applications use frontend frameworks and browser-side logic to create responsive application experiences that communicate dynamically with backend APIs.',

    whyItMatters:
      'SPA development expanded my work from backend Java systems into full-stack engineering and allowed me to build complete user experiences from browser to database.',

    concepts: [
      'Angular',
      'TypeScript',
      'Components',
      'State Management',
      'HTTP Clients',
      'Frontend Architecture',
    ],

    visualCaption: 'FULL-STACK DEVELOPMENT',

    labType: 'angular',

    labAvailable: false,
  },

  {
    key: 'aws-cloud-computing',
    technology: 'AWS',
    heading: 'AWS / Cloud Computing',

    imageUrl: '/images/timeline/2018_AWS_Cloud.png',

    imageAlt: 'AWS cloud computing architecture',

    technologyDescription:
      'Cloud computing provides on-demand infrastructure and managed services for deploying, operating, storing, and scaling modern applications.',

    whyItMatters:
      'AWS expanded my engineering work beyond application code into cloud infrastructure, deployment, storage, and distributed application architecture.',

    concepts: ['AWS', 'S3', 'Compute', 'Cloud Storage', 'Scalability', 'Cloud Architecture'],

    visualCaption: 'APPLICATIONS MOVE TO THE CLOUD',

    labType: 'cloud',

    labAvailable: false,
  },

  {
    key: 'containers-and-orchestration',
    technology: 'Docker / Kubernetes / OpenShift',
    heading: 'Containers & Orchestration',

    imageUrl: '/images/timeline/2020_Docker_Build.png',

    imageAlt: 'Docker containers and container orchestration',

    technologyDescription:
      'Containers package applications with their runtime dependencies, while orchestration platforms coordinate deployment, scaling, networking, and management across environments.',

    whyItMatters:
      'Containers changed how I package and deploy applications and became an important part of building repeatable cloud-native environments.',

    concepts: ['Docker', 'Containers', 'Images', 'Kubernetes', 'OpenShift', 'Orchestration'],

    visualCaption: 'BUILD ONCE. RUN ANYWHERE.',

    labType: 'docker',

    labAvailable: false,
  },

  {
    key: 'ci-cd-and-cloud-native-development',

    technology: 'Jenkins / Maven / CI/CD / DevOps',

    heading: 'CI/CD & Cloud-Native Development',

    imageUrl: '/images/timeline/2022_CICD_Workspace.png',

    imageAlt: 'CI/CD and cloud-native software development workspace',

    technologyDescription:
      'CI/CD practices automate the process of building, testing, scanning, and deploying software, creating repeatable pipelines that move application changes reliably from development into production.',

    whyItMatters:
      'CI/CD became an important part of my development workflow by connecting application development with automated builds, testing, security scanning, deployment, and production observability.',

    concepts: [
      'Continuous Integration',
      'Continuous Delivery',
      'Jenkins',
      'Build Automation',
      'Security Scanning',
      'Deployment Pipelines',
    ],

    visualCaption: 'AUTOMATING SOFTWARE DELIVERY',
  },

  {
    key: 'generative-ai',

    technology: 'Generative AI',

    heading: 'Generative AI',

    imageUrl: '/images/timeline/2023_Generative_AI.png',

    imageAlt: 'Generative AI and software development',

    technologyDescription:
      'Generative AI introduced systems capable of creating text, code, images, and other content while providing developers with new ways to explore ideas, solve problems, and accelerate development.',

    whyItMatters:
      'Generative AI changed how I approach software development by becoming a collaborative tool for learning, architecture exploration, debugging, code generation, documentation, and problem solving.',

    concepts: [
      'Large Language Models',
      'Prompt Engineering',
      'Code Generation',
      'AI-Assisted Development',
      'Natural Language Interfaces',
      'Developer Productivity',
    ],

    visualCaption: 'AI ENTERS THE DEVELOPMENT WORKFLOW',
  },

  {
    key: 'agentic-ai-ai-engineering',

    technology: 'AI Agents / MCP / Tool Use / Coding Agents',

    heading: 'Agentic AI / AI Engineering',

    imageUrl: '/images/timeline/2026_Agentic_AI.png',

    imageAlt: 'Agentic AI and AI engineering',

    technologyDescription:
      'Agentic AI extends generative models beyond content creation by enabling AI systems to reason about tasks, use tools, interact with external systems, execute workflows, and work across software projects.',

    whyItMatters:
      'Agentic AI represents the next stage of my technology journey, where AI becomes more deeply integrated into the engineering lifecycle and collaborates across architecture, development, testing, debugging, and automation.',

    concepts: [
      'AI Agents',
      'Tool Use',
      'Model Context Protocol',
      'Coding Agents',
      'Workflow Automation',
      'AI Engineering',
    ],

    visualCaption: 'FROM AI ASSISTANTS TO AI AGENTS',
  },
];
