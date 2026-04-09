export interface SkillCategory {
  name: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    name: "Frameworks",
    items: ["Next.js", "React"],
  },
  {
    name: "Styling",
    items: ["CSS Modules", "Mantine", "SCSS"],
  },
  {
    name: "Backend & Data",
    items: ["Supabase", "PostgreSQL", "Node.js"],
  },
  {
    name: "Tools",
    items: ["Git", "Vercel", "VS Code", "Figma"],
  },
];
