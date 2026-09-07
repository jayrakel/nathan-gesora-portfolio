import type { ExperienceEntry } from '@/lib/types';

export const experience: ExperienceEntry[] = [
  {
    organization: 'Better-Link Ventures Limited',
    role: 'Software Developer & System Administrator',
    startDate: 'TODO',
    endDate: 'present',
    summary:
      'Built, deployed and currently administer a SACCO management system supporting financial operations, loan management and member records.',
    highlights: [
      'Designed and built the SACCO management system using Spring Boot, React, PostgreSQL and Redis',
      'Implemented loan disbursement and arrears calculation workflows',
      'Developed member statements, reporting functionality and financial data workflows',
      'Migrated historical loan and payment records into the system using Python migration scripts',
      'Built and configured a self-hosted server used to deploy and operate the SACCO management system',
      'Administer the application and its underlying infrastructure, including deployments, services, database and system operations',
    ],
  },
];