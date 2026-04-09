export interface Project {
  slug: string;
  title: string;
  description: string;
  url?: string;
  repo?: string;
  tags: string[];
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    slug: "crumbtrail",
    title: "Crumbtrail",
    description:
      "Family recipe book digitization app. Preserving handwritten recipes with modern tools.",
    repo: "https://github.com/benediktvaldez/crumbtrail",
    tags: ["Next.js", "React", "Mantine", "Supabase"],
    featured: true,
    year: 2025,
  },
  {
    slug: "fil-rouge-studio",
    title: "Fil Rouge Studio",
    description:
      "Sewing project manager for tracking fabrics, patterns, and works in progress.",
    repo: "https://github.com/benediktvaldez/fil-rouge-studio",
    tags: ["Next.js", "React", "SCSS", "Supabase"],
    featured: true,
    year: 2025,
  },
  {
    slug: "olatakjallari",
    title: "Ólátakjallari",
    description: "Icelandic project management tool with drag-and-drop organization.",
    repo: "https://github.com/benediktvaldez/olatakjallari",
    tags: ["Next.js", "React", "dnd-kit", "Supabase"],
    featured: true,
    year: 2025,
  },
  // Add more projects as needed
];
