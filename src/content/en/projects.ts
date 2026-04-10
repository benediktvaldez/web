export type ProjectType = 'personal' | 'community';

export interface Project {
  slug: string;
  title: string;
  description: string;
  url?: string;
  repo?: string;
  tags: string[];
  featured: boolean;
  year: number | string;
  type: ProjectType;
}

export const projects: Project[] = [
  {
    slug: 'crumbtrail',
    title: 'Crumbtrail',
    description:
      'A family recipe book app born from scattered group chats, handwritten notes, and relatives who never measured anything. Family members can browse, search, and add their own recipes. Built with AI-augmented workflows using Claude Code. What started as a personal fix is becoming a reusable product.',
    url: 'https://crumbtrail.valdez.is',
    repo: 'https://github.com/benediktvaldez/crumbtrail',
    tags: ['Next.js', 'React', 'Mantine', 'Supabase', 'Vercel'],
    featured: true,
    year: 2026,
    type: 'personal',
  },
  {
    slug: 'fil-rouge-studio',
    title: 'Fil Rouge Studio',
    description:
      'Sewing project manager for tracking fabrics, patterns, and works in progress. An editorial, minimal interface for managing the creative process.',
    repo: 'https://github.com/benediktvaldez/fil-rouge-studio',
    tags: ['Next.js', 'React', 'SCSS Modules', 'Supabase'],
    featured: true,
    year: 2025,
    type: 'personal',
  },
  {
    slug: 'olatakjallari',
    title: 'Ólátakjallari',
    description:
      'An Icelandic project management tool with drag-and-drop organization and a warm, dark UI.',
    repo: 'https://github.com/benediktvaldez/olatakjallari',
    tags: ['Next.js', 'React', 'dnd-kit', 'Supabase'],
    featured: true,
    year: 2025,
    type: 'personal',
  },
  {
    slug: 'svef-voting',
    title: 'SVEF Voting System',
    description:
      'A web application that streamlined the review process for submissions to the Icelandic Web Awards. Originally built in React, later rewritten with Next.js, TypeScript, and GraphQL. Built, maintained, and used annually from 2018 to 2024.',
    tags: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Vitest'],
    featured: true,
    year: '2018 – 2024',
    type: 'personal',
  },
  {
    slug: 'valdez-is',
    title: 'valdez.is',
    description:
      'This website. A living resume and personal site built with Next.js 16 App Router, CSS Modules, and per-page oklch gradients. No CMS,content as code.',
    repo: 'https://github.com/benediktvaldez/web',
    tags: ['Next.js', 'React', 'CSS Modules', 'MDX'],
    featured: false,
    year: 2026,
    type: 'personal',
  },
  {
    slug: 'jsconf-iceland',
    title: 'JSConf Iceland',
    description:
      'Co-organized JSConf Iceland 2016 and 2018,two-day conferences with 30+ international speakers and 400+ attendees each. Part of the global JSConf family.',
    url: 'https://2018.jsconf.is',
    tags: ['Conference', 'Community', 'JavaScript'],
    featured: true,
    year: '2016, 2018',
    type: 'community',
  },
  {
    slug: 'svef',
    title: 'SVEF Board Member',
    description:
      'Served on the board of The Icelandic Web Industry Association from 2015 to 2019. Coordinated meetups, workshops, and the annual Icelandic Web Awards. Helped conceptualize and execute the IceWeb conference in 2018 and 2019.',
    tags: ['Community', 'Events', 'Web Industry'],
    featured: true,
    year: '2015 – 2019',
    type: 'community',
  },
];
