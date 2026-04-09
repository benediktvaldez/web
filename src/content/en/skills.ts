export interface SkillCategory {
  name: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "SQL", "PHP", "Go"],
  },
  {
    name: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue",
      "CSS Modules",
      "SCSS",
      "Mantine",
      "styled-components",
      "Storybook",
      "Slate",
    ],
  },
  {
    name: "Backend & Data",
    items: [
      "Node.js",
      "Hono",
      "Drizzle ORM",
      "GraphQL",
      "PostgreSQL",
      "MySQL",
      "ClickHouse",
      "Supabase",
      "Laravel",
    ],
  },
  {
    name: "Infrastructure",
    items: [
      "AWS (ECS, RDS, ALB, CloudFront, Lambda, SQS)",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    name: "Testing",
    items: ["Vitest", "Playwright", "Cypress", "Chromatic QA"],
  },
  {
    name: "Tools & CMS",
    items: ["Figma", "Git", "NX Monorepo", "Prismic", "Contentful", "Webpack"],
  },
];
