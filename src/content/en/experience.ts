export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech?: string[];
  clients?: string[];
}

export const experience: Experience[] = [
  {
    company: 'CookieHub',
    role: 'Senior Digital Product Developer',
    period: 'Nov 2025 – Present',
    description:
      'Leading the replatforming of a privacy and consent-tech SaaS from a PHP/Laravel monolith to distributed TypeScript microservices. Rewrote the customer-facing consent widget from legacy JavaScript to a component-based React system with state machine-driven flows, shadow DOM isolation, and TCF/CCPA framework support. Built schema-first REST APIs using Hono and Drizzle ORM, including a consent analytics service backed by ClickHouse with materialized views. Extended Terraform-managed AWS infrastructure and established CI/CD pipelines across all repositories.',
    tech: [
      'TypeScript',
      'Node.js',
      'Hono',
      'React',
      'Zod',
      'Drizzle ORM',
      'ClickHouse',
      'MySQL',
      'PostgreSQL',
      'PHP/Laravel',
      'Terraform',
      'AWS',
      'Docker',
      'GitHub Actions',
      'Vitest',
      'Playwright',
    ],
  },
  {
    company: 'Various',
    role: 'Freelance Senior Digital Product Developer',
    period: 'Mar 2024 – Present',
    description:
      'Working on select projects expanding skills in project management, development, and mentoring. This period has helped clarify professional objectives and envision a future in management.',
  },
  {
    company: 'AIVA Golf',
    role: 'Senior Digital Product Developer',
    period: 'Oct 2023 – Feb 2024',
    description:
      'Led development of the interface for an AI-powered golf training platform using 3D motion capture via high-speed video. Golfers interact with their swing data in real time on personal devices and a floor screen. Configured a monorepo deploying multiple web applications continuously to Vercel, using Supabase for authentication and data.',
    tech: ['React', 'TypeScript', 'Storybook', 'Figma', 'Vercel', 'Supabase', 'NX Monorepo'],
  },
  {
    company: 'GRID',
    role: 'Senior Digital Product Developer',
    period: 'Sep 2022 – Sep 2023',
    description:
      "Helped build an interactive visualisation layer on top of GRID's proprietary spreadsheet engine,the first of its kind with integrated AI assistance. Users craft compelling data narratives from GRID spreadsheets or connected sources like Notion, Google Sheets, and Dropbox. Built upon the open source Slate editor, my contributions focused on elevating the WYSIWYG editor's capabilities, including implementing drag-and-drop for custom elements and streamlining user interactions.",
    tech: ['Next.js', 'React', 'TypeScript', 'Storybook', 'Slate'],
  },
  {
    company: 'Klappir Green Solutions',
    role: 'Senior Digital Product Developer',
    period: 'Apr 2021 – Sep 2022',
    description:
      'Worked on a sustainability platform built from the ground up, enabling clients to generate accurate sustainability statements. Focused on the React and TypeScript codebase, integrating automated testing, fixing interfaces, and enhancing UX and UI aesthetics. Also contributed to the development of the public-facing klappir.com website.',
    tech: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Storybook', 'Figma', 'NX Monorepo'],
  },
  {
    company: 'Össur',
    role: 'Senior UI/UX Developer',
    period: 'Dec 2018 – Dec 2020',
    description:
      'Led the technical side of a major platform shift for a company with 23+ localized regions, 70+ microsites, and fragmented technology. Designed and implemented a component-based design system using headless services and modular web applications, guided by principles of Unified Look & Feel and Seamless User Experience. Managed a team of developers and QA in Ukraine. By departure, the new platform had launched for 15 regions on ossur.com.',
    tech: [
      'NX Monorepo',
      'Next.js',
      'React',
      'TypeScript',
      'Storybook',
      'Chromatic QA',
      'Cypress',
      'Prismic',
    ],
  },
  {
    company: 'Kolibri / Marel',
    role: 'Freelance Senior Digital Developer',
    period: 'Nov 2018',
    description:
      'Provided expert assistance on concluding a project for Marel, addressing final-phase tasks quickly and efficiently on a tech stack of Umbraco CMS with Razor templates and integrated React components.',
    tech: ['Umbraco', 'Razor', 'React', 'TypeScript'],
  },
  {
    company: 'Aranja',
    role: 'Senior Web Application Developer / UX Engineer',
    period: 'Feb 2018 – Oct 2018',
    description:
      "Worked with WOW air across assignments centered around their website (Django/Wagtail) and booking engine,a complex React project with elaborate business logic, partially written in Reason. Also contributed briefly to Google's websites for their Nest product line.",
  },
  {
    company: 'Kolibri',
    role: 'Digital Product Developer',
    period: 'Jun 2014 – Jan 2018',
    description:
      'Led Technical Vision for front-end development at an agency formed from the merger of Form5 and Sprettur. Worked with clients including VÍS, Landsnet, Íslandsbanki, Icelandair, The Blue Lagoon, and Nova on diverse digital products. At Icelandair, bootstrapped their Digital Labs department, making architectural decisions for multilingual component-based websites with extensive automated testing.',
    tech: [
      'Node.js',
      'React',
      'Vue',
      'Webpack',
      'Docker',
      'AWS',
      'Kubernetes',
      'Go',
      'Contentful',
      'Prismic',
    ],
    clients: ['VÍS', 'Landsnet', 'Íslandsbanki', 'Icelandair', 'The Blue Lagoon', 'Nova'],
  },
  {
    company: 'Form5',
    role: 'Front-End Developer',
    period: 'Sep 2013 – May 2014',
    description:
      'Worked side-by-side with designer Steinar Ingi Farestveit to create award-winning user experiences for local and international clients including 66°North, Nikita Clothing, Bonfire Outerwear, Salomon, and Nova. Contributed to open source packages and built tooling including a custom gulp-based build pipeline.',
    clients: ['66°North', 'Nikita Clothing', 'Bonfire Outerwear', 'Salomon', 'Nova'],
  },
  {
    company: 'Skapalón',
    role: 'Front-End Developer',
    period: 'Jun 2012 – Aug 2013',
    description:
      'Developed marketing websites for companies and government entities in Iceland, from travel agencies to the National Power Company and the office of the President of Iceland. All projects based on an in-house .NET CMS using jQuery, LESS/SCSS, and XSLT/Razor templates.',
  },
  {
    company: 'Netvistun',
    role: 'Web Developer & Designer',
    period: '2011 – May 2012',
    description:
      'Designed and developed marketing websites for small and medium businesses in Iceland using JavaScript, LESS/CSS, XHTML, and PHP. Supported active development of an in-house PHP content management system.',
  },
  {
    company: 'Freelance',
    role: 'Web Developer & Designer',
    period: '2008 – 2011',
    description:
      'Developed a custom modular CMS in PHP tailored to the needs of each project. Designed and built websites for small businesses and individuals in Iceland, including a golf community site with news, user profiles, and forums, and a third-party gift card shop with cart and payment integration.',
  },
];
