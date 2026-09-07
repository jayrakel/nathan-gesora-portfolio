import type { SkillGroup } from '@/lib/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Backend',
    items: [
      'Java',
      'Spring Boot',
      'Node.js',
      'PHP',
      'Laravel',
    ],
  },

  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
    ],
  },

  {
    category: 'Databases & Data',
    items: [
      'PostgreSQL',
      'MySQL',
      'Redis',
      'NoSQL',
      'SQL'
    ],
  },

  {
    category: 'DevOps & Infrastructure',
    items: [
      'Docker',
      'Linux',
      'Nginx',
      'Self-Hosted Infrastructure',
      'DigitalOcean',
      'Vercel',
      'Git/GitHub',
    ],
  },

  {
    category: 'Engineering',
    items: [
      'REST APIs',
      'API Integrations',
      'Authentication & Authorization',
      'Multi-Tenant Systems',
      'Database Design',
    ],
  },

];
