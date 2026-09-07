import type { Project } from '@/lib/types';

// CLAUDE.md rule 3: confidential projects never get githubUrl/demoUrl.
// CLAUDE.md rule 4: role must be accurate — role reflects actual ownership and contribution.

export const projects: Project[] = [
  {
    slug: 'sacco-management-system',
    name: 'SACCO Management System',
    summary:
      'Production-oriented financial management platform built for a savings and credit cooperative.',
    problem:
      'A SACCO needed a reliable system for managing members, loans, repayments, arrears and financial records while preserving historical data.',
    solution:
      'Built a full-stack SACCO management system covering loan workflows, arrears calculation, member statements and historical data migration, then deployed and currently administer the system on self-hosted infrastructure.',
    role: 'built',
    techStack: [
      'Spring Boot 3.5',
      'Java 17',
      'PostgreSQL 16',
      'Redis 7',
      'React',
      'Docker',
      'Linux',
    ],
    keyFeatures: [
      'Loan disbursement and arrears calculation engine',
      'Historical loan and payment data migration using Python migration scripts',
      'Member statements and financial reporting',
      'Self-hosted deployment infrastructure',
      'Ongoing system administration and operations',
    ],
    images: [],
    confidential: true,
    featured: true,
    hasDetailPage: true,
    order: 1,
  },

  {
    slug: 'eduwave',
    name: 'EduWave',
    summary:
      'Full school management system rewrite with multi-tenant architecture using Spring Boot and Next.js.',
    problem:
      'Existing school management tooling needed a ground-up rewrite covering academic and administrative workflows while supporting multiple schools from one codebase.',
    solution:
      'Built a multi-tenant school management platform using school_id scoping, covering authentication, students, staff, fees, attendance, examinations and library management.',
    role: 'built',
    techStack: [
      'Spring Boot',
      'Next.js',
      'Java',
      'PostgreSQL',
    ],
    keyFeatures: [
      'Multi-tenant architecture with school_id scoping',
      'Modules for authentication, students, staff, fees, attendance, exams and library',
      'Consistent service/repository/DTO/controller architecture',
    ],
    images: [],
    githubUrl: 'https://github.com/jayrakel/sms',
    confidential: false,
    featured: true,
    hasDetailPage: true,
    order: 2,
  },

  {
    slug: 'jaytechwave-website',
    name: 'JayTechWave Solutions Website',
    summary:
      'Professional website built with Next.js, including an administration interface and AI-assisted content functionality.',
    problem:
      'The JayTechWave professional presence needed a maintainable public website with content administration and communication features.',
    solution:
      'Built and deployed a Next.js website with an administration interface, subscription and blog notification flows, and an AI-assisted content route.',
    role: 'built',
    techStack: [
      'Next.js',
      'Vercel',
    ],
    keyFeatures: [
      'Administration interface',
      'Subscription and blog notification flows',
      'AI-assisted content route',
    ],
    images: [],
    demoUrl: 'TODO: live URL',
    confidential: false,
    featured: false,
    hasDetailPage: false,
    order: 3,
  },

  {
    slug: 'agrifusion',
    name: 'Agriculture E-Commerce Platform',
    summary:
      'E-commerce platform built for an agriculture business.',
    problem:
      'TODO: document the actual business problem addressed by the project.',
    solution:
      'TODO: document the actual solution and your implementation.',
    role: 'built',
    techStack: ['TODO'],
    keyFeatures: ['TODO'],
    images: [],
    confidential: true,
    featured: false,
    hasDetailPage: false,
    order: 4,
  },
];