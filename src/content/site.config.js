/**
 * site.config.js — Single source of truth for all portfolio content.
 *
 * Update this file when personal details, links, job history, or skills change.
 * No component should hardcode strings that belong here.
 */

// ---------------------------------------------------------------------------
// Personal info
// ---------------------------------------------------------------------------
export const OWNER = {
  name: "Yagnesh Dhanani",
  initials: "YD.",
  email: "yagneshdhanani791@gmail.com",
  role: "Senior Software Engineer · · ·",
  /** Short availability status shown in the hero badge */
  status: "Available for work",
  /** One-liner tech credit shown in the footer */
  builtWith: "React",
  /** Footer copyright year */
  builtYear: 2025,
  /** Path to the résumé PDF (relative to /public) */
  cvPath: "/assets/resume.pdf",
};

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------
export const SOCIALS = {
  github: "https://github.com/yagneshdhanani",
  linkedin: "https://linkedin.com/in/yagneshdhanani/",
  twitter: "https://twitter.com/yagneshdhanani",
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------
/** Chips displayed under the bio paragraph */
export const TOP_SKILLS = [
  "React",
  "TypeScript",
  "Spring Boot",
  "Node.js",
  "PostgreSQL",
  "AWS",
];

/** Bio paragraphs — each string renders as a <p> */
export const BIO = [
  "Building backend systems, cloud-native platforms, and web applications designed to scale, operate cleanly, and stay reliable in production.",
];

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------
export const ABOUT_PARAGRAPHS = [
  "I'm a software engineer who cares about {emphasisStart}the parts users never see{emphasisEnd} — the data models, the failure modes, the latency budgets. Good products are built on systems that stay calm under load.",
  "Over the last few years I've shipped backend platforms, full-stack web apps, and cloud infrastructure across startups and product teams. My focus is {emphasisStart}reliability and clean delivery{emphasisEnd}: code that's understood at 3am, not just at the demo.",
  "Outside of feature work I contribute to open source and write about the tradeoffs behind {emphasisStart}architecture decisions{emphasisEnd} — because the best design is the one your team can keep evolving.",
];

export const STATS = [
  { value: "4+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "15+", label: "Happy Clients" },
  { value: "5+", label: "Open Source" },
];

// ---------------------------------------------------------------------------
// Skills section
// ---------------------------------------------------------------------------
export const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    label: "Tools",
    skills: ["Docker", "AWS", "Kubernetes", "Git", "CI/CD", "Terraform"],
  },
  {
    label: "Design",
    skills: ["Figma", "Design Systems", "Accessibility", "Prototyping"],
  },
];

// ---------------------------------------------------------------------------
// Delivery systems section
// ---------------------------------------------------------------------------
export const DELIVERY_SYSTEMS = [
  {
    label: "Backend platforms",
    summary:
      "Design service boundaries, data models, APIs, and async workflows that stay predictable as product complexity grows.",
    proof: "Spring Boot, Node.js, GraphQL, PostgreSQL, Redis",
  },
  {
    label: "Operational surfaces",
    summary:
      "Turn messy operational workflows into fast internal tools with clear states, filters, alerts, and decision-ready dashboards.",
    proof: "React, TypeScript, real-time updates, analytics UI",
  },
  {
    label: "Cloud delivery",
    summary:
      "Ship containerized services through repeatable pipelines with observability, rollout discipline, and cost-aware infrastructure.",
    proof: "Docker, AWS, CI/CD, NGINX, ELK",
  },
  {
    label: "AI-enabled workflows",
    summary:
      "Embed AI where it improves an existing product loop, with structured context, measurable output quality, and sane fallbacks.",
    proof: "OpenAI API, ranking, recommendations, service integration",
  },
];

// ---------------------------------------------------------------------------
// Experience section
// ---------------------------------------------------------------------------
export const EXPERIENCE = [
  {
    slug: "wezom-full-stack-software-engineer",
    company: "Wezom",
    location: "Kitchener, ON, Canada",
    role: "Full-Stack Software Engineer",
    date: "Oct 2022 — Present",
    bullets: [
      "Engineered full-stack microservices with Java 11, Spring Boot, Hibernate, and PostgreSQL, powering a modular web platform serving 15,000+ active monthly users.",
      "Built reusable React.js (TypeScript) + Material UI components and integrated GraphQL APIs to reduce over-fetching across multiple services.",
      "Developed and deployed an AI-based recommendation engine using OpenAI API embedded in Java microservices, improving product listing accuracy by 40%.",
      "Containerized services with Docker, wired GitLab CI/CD pipelines, and deployed to AWS (EC2, RDS, S3), achieving zero-downtime rollouts and 25% infrastructure cost reduction.",
      "Reduced response times by 20% via async request handling and SQL query tuning monitored through NGINX and ELK Stack.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "Docker",
      "GitLab CI/CD",
    ],
  },
  {
    slug: "bacancy-software-engineer",
    company: "Bacancy",
    location: "Bengaluru, India",
    role: "Software Engineer",
    date: "Jul 2020 — Dec 2021",
    bullets: [
      "Built core modules for a logistics ERP using J2EE, JSP, Servlets, and Spring MVC — covering invoice processing, shipment tracking, and customer reports.",
      "Migrated monolithic Java EE systems to Spring Boot microservices with MySQL and Redis caching, achieving sub-second response times for real-time status updates.",
      "Integrated Angular 10 frontend with REST APIs, delivering an SPA that significantly improved dashboard performance for operations teams.",
      "Led unit and integration testing with JUnit, Mockito, and Jacoco, reaching 85%+ test coverage and reducing critical production bugs by 35%.",
      "Integrated Firebase push notifications and Stripe payments for mobile order alerts and dynamic invoicing via Node.js bridges.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Angular",
      "MySQL",
      "Redis",
      "Firebase",
      "Node.js",
      "REST",
      "GraphQL",
    ],
  },
];

// ---------------------------------------------------------------------------
// Contact section
// ---------------------------------------------------------------------------
/** Social rows shown in the contact panel (order = display order) */
export const CONTACT_SOCIALS = [
  { name: "GitHub", href: SOCIALS.github },
  { name: "LinkedIn", href: SOCIALS.linkedin },
  { name: "Twitter", href: SOCIALS.twitter },
];

export const CONTACT_COPY = {
  directTitle: "Start a conversation",
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
/** Social icons shown in the footer (order = display order) */
export const FOOTER_SOCIALS = [
  { name: "GitHub", href: SOCIALS.github },
  { name: "LinkedIn", href: SOCIALS.linkedin },
  { name: "Twitter", href: SOCIALS.twitter },
];
