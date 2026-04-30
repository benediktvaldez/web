const en = {
  meta: {
    siteDescription: 'Developer and creator of digital experiences. 15 years building for the web.',
    aboutDescription:
      'Full stack digital product developer with 15 years of experience building for the web, from Icelandic agencies to international product companies.',
    projectsDescription: 'Personal projects and community work by Benedikt Valdez.',
    writingDescription: 'Notes, ideas, and things on my mind.',
    resumeDescription: 'Resume of Benedikt Valdez. Full stack digital product developer.',
  },
  nav: {
    about: 'Who I am',
    projects: 'Projects',
    writing: 'Writing',
    resume: 'Resume',
  },
  home: {
    greeting: 'hi.',
    tagline: "I'm Benedikt Valdez,",
    taglineLine2: 'a developer and creator of digital experiences',
  },
  about: {
    title: 'Who I am',
    intro: [
      "I'm a full stack digital product developer and crafter of beautiful user interfaces. I'm passionate about creating exceptional user experiences that delight.",
      "I started building for the web in 2012 in the Icelandic agency scene, eventually joining Form5 where I worked side-by-side with a designer creating award-winning experiences for clients like 66°North and Salomon. When Form5 merged with Sprettur to form Kolibri, I led front-end technical vision and worked with some of Iceland's biggest brands: Icelandair, The Blue Lagoon, Íslandsbanki.",
      "From there I moved into product roles: redesigning Össur's web platform across 23 regions, building a sustainability platform at Klappir, building an interactive visualisation layer overtop of GRID's proprietary spreadsheet engine, and currently leading a platform modernization at CookieHub, migrating from a PHP monolith to distributed TypeScript microservices.",
      "I've been an active part of the Icelandic web community for over a decade, co-organizing JSConf Iceland in 2016 and 2018, and serving on the board of SVEF, the Icelandic Web Industry Association, for several years. I built and maintained a voting system for the Icelandic Web Awards from 2018 to 2024.",
      'Outside of CookieHub, I build personal projects that let me flex my creative muscles, like a {recipeLink}, a sewing project manager, and more.',
    ],
    recipeLink: 'family recipe app',
    currentlyHeading: 'Currently',
    currentRole: 'Senior Digital Product Developer',
    currentCompany: 'CookieHub',
    currentDesc:
      'Leading platform modernization, migrating from PHP/Laravel to TypeScript microservices, rewriting the consent widget in React, and building analytics with ClickHouse.',
    sideProjectsRole: 'Building things',
    sideProjectsCompany: 'Side projects',
    sideProjectsDesc:
      'Crumbtrail, Fil Rouge Studio, and more. Apps built with Next.js and Supabase, developed with AI-augmented workflows.',
    contactHeading: 'Get in touch',
    contactText: 'Find me on {github} or {linkedin}. For the full picture, check the {resume}.',
    recommendationsHeading: 'A few good words',
    ctaOptions: [
      'Have a project in mind? →',
      'Need a developer? →',
      "Let's build something →",
      'Got an idea? →',
    ],
    readMore: 'Read more',
    showLess: 'Show less',
  },
  projects: {
    title: 'Projects',
    intro: "Things I've built, mostly for myself, sometimes for others.",
    communityHeading: 'Community',
    visit: 'Visit',
    source: 'Source',
  },
  writing: {
    title: 'Writing',
    intro: "Notes, ideas, and things I've been thinking about.",
    empty: 'Nothing here yet.',
  },
  resume: {
    title: 'Resume',
    tagline: 'Full stack digital product developer and crafter of beautiful user interfaces',
    experienceHeading: 'Experience',
    projectsHeading: 'Projects',
    communityHeading: 'Community',
    skillsHeading: 'Skills',
    recommendationsHeading: 'Recommendations',
    referencesHeading: 'References',
    referencesText: 'Professional references available upon request.',
    print: 'Print / Save as PDF',
  },
  letsGo: {
    title: "Let's go",
    cta: "Let's build something",
    step1: {
      heading: 'What are you looking for?',
      options: [
        'Build a new product',
        'Improve an existing one',
        'Technical consultation',
        'Something else',
      ],
    },
    step2: {
      heading: 'Tell me a bit more',
      placeholder: "What's the project? What problem are you solving?",
      skip: "I'd rather just talk",
    },
    step3: {
      heading: "What's your timeline?",
      options: ['ASAP', '1-3 months', '3-6 months', 'Just exploring'],
    },
    step4: {
      heading: 'How should I reach you?',
      name: 'Name',
      email: 'Email',
      company: 'Company (optional)',
      submit: 'Send it',
    },
    step5: {
      heading: "Thanks, I'll be in touch",
      message:
        'I usually respond within 24 hours. Looking forward to hearing more about your project.',
      backToSite: 'Back to site',
    },
    back: 'Back',
    error: 'Something went wrong. Please try again.',
  },
};

export type Dictionary = {
  meta: {
    siteDescription: string;
    aboutDescription: string;
    projectsDescription: string;
    writingDescription: string;
    resumeDescription: string;
  };
  nav: { about: string; projects: string; writing: string; resume: string };
  home: { greeting: string; tagline: string; taglineLine2: string };
  about: {
    title: string;
    intro: string[];
    recipeLink: string;
    currentlyHeading: string;
    currentRole: string;
    currentCompany: string;
    currentDesc: string;
    sideProjectsRole: string;
    sideProjectsCompany: string;
    sideProjectsDesc: string;
    contactHeading: string;
    contactText: string;
    recommendationsHeading: string;
    ctaOptions: string[];
    readMore: string;
    showLess: string;
  };
  projects: {
    title: string;
    intro: string;
    communityHeading: string;
    visit: string;
    source: string;
  };
  writing: { title: string; intro: string; empty: string };
  resume: {
    title: string;
    tagline: string;
    experienceHeading: string;
    projectsHeading: string;
    communityHeading: string;
    skillsHeading: string;
    recommendationsHeading: string;
    referencesHeading: string;
    referencesText: string;
    print: string;
  };
  letsGo: {
    title: string;
    cta: string;
    step1: { heading: string; options: string[] };
    step2: { heading: string; placeholder: string; skip: string };
    step3: { heading: string; options: string[] };
    step4: { heading: string; name: string; email: string; company: string; submit: string };
    step5: { heading: string; message: string; backToSite: string };
    back: string;
    error: string;
  };
};

export default en;
