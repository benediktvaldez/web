import type { SkillCategory } from '../en/skills';

export const skills: SkillCategory[] = [
  {
    name: 'Forritunarmál',
    items: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'SQL', 'PHP', 'Go'],
  },
  {
    name: 'Framendi',
    items: [
      'React',
      'Next.js',
      'Vue',
      'CSS Modules',
      'SCSS',
      'Mantine',
      'styled-components',
      'Storybook',
      'Slate',
    ],
  },
  {
    name: 'Bakendi og gögn',
    items: [
      'Node.js',
      'Hono',
      'Drizzle ORM',
      'GraphQL',
      'PostgreSQL',
      'MySQL',
      'ClickHouse',
      'Supabase',
      'Laravel',
    ],
  },
  {
    name: 'Innviðir',
    items: [
      'AWS (ECS, RDS, ALB, CloudFront, Lambda, SQS)',
      'Terraform',
      'Docker',
      'Kubernetes',
      'Vercel',
      'GitHub Actions',
    ],
  },
  {
    name: 'Prófanir',
    items: ['Vitest', 'Playwright', 'Cypress', 'Chromatic QA'],
  },
  {
    name: 'Verkfæri og CMS',
    items: ['Figma', 'Git', 'NX Monorepo', 'Prismic', 'Contentful', 'Webpack'],
  },
];
