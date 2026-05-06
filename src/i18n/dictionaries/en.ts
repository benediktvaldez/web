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
      'Leading the replatforming of a privacy and consent-tech SaaS, taking a PHP/Laravel monolith to TypeScript microservices on Terraform-managed AWS. Defining the testing and CI/CD foundation across the engineering org.',
    sideProjectsRole: 'Building things',
    sideProjectsCompany: 'Side projects',
    sideProjectsDesc:
      'Crumbtrail, Fil Rouge Studio, and more. Apps built with Next.js and Supabase, developed with AI-augmented workflows.',
    contactHeading: 'Get in touch',
    contactText: 'Find me on {github} or {linkedin}.',
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
  notFound: {
    heading: '404',
    message: "This page doesn't exist. Maybe it never did.",
    link: 'Take me home',
  },
  subscribe: {
    title: 'Subscribe',
    metaDescription: 'A monthly note from Benedikt. Once a month, never more, sometimes less.',
    pageIntro:
      "Once a month I send a short note rounding up whatever I've published. Never more often, sometimes less. Unsubscribe any time.",
    heading: 'A monthly note',
    inlineHeading: 'Get the next one in your inbox',
    intro: 'Once a month, sometimes less. Never more.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    submit: 'Subscribe',
    invalidEmail: 'Please enter a valid email address',
    error: 'Something went wrong. Please try again.',
    privacy: 'Just the monthly note. Unsubscribe any time.',
    successHeading: 'Almost there',
    successBody: 'Check your inbox to confirm.',
    confirmSuccessHeading: "You're in",
    confirmSuccessBody: "I'll write again soon.",
    confirmExpiredHeading: 'Link expired',
    confirmExpiredBody: 'Subscribe again to get a fresh link.',
    confirmInvalidHeading: 'Link not valid',
    confirmInvalidBody: 'It may have already been used or copied incorrectly.',
    unsubscribeHeading: "You're unsubscribed",
    unsubscribeBody: 'Sorry to see you go.',
    resubscribe: 'Subscribe again',
    toWriting: 'See what I write',
    confirmEmail: {
      subject: "Confirm your subscription to Benedikt's writing",
      preview: 'One click to start receiving the monthly note.',
      heading: 'Confirm your subscription',
      body: 'Click the button below to confirm and start getting the monthly note from me.',
      button: 'Confirm subscription',
      fallback: 'If the button does not work, paste this link into your browser:',
      footer: "If you did not request this, ignore this email and you won't hear from me again.",
    },
    issueEmail: {
      unsubscribeLabel: 'Unsubscribe',
      siteLabel: 'You are getting this because you subscribed at benedikt.valdez.is.',
    },
    survey: {
      leadIn: 'Mind sharing why? Totally optional.',
      submit: 'Send',
      noThanks: 'No thanks',
      thankYou: 'Thanks for letting me know.',
      otherPlaceholder: 'Anything you want to add (optional)',
      reasons: {
        inboxCleanup: 'Just cleaning up my inbox',
        notForMe: "The content isn't quite for me",
        accidental: 'I subscribed by accident',
        other: 'Something else (tell me?)',
      },
    },
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
  notFound: { heading: string; message: string; link: string };
  subscribe: {
    title: string;
    metaDescription: string;
    pageIntro: string;
    heading: string;
    inlineHeading: string;
    intro: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    invalidEmail: string;
    error: string;
    privacy: string;
    successHeading: string;
    successBody: string;
    confirmSuccessHeading: string;
    confirmSuccessBody: string;
    confirmExpiredHeading: string;
    confirmExpiredBody: string;
    confirmInvalidHeading: string;
    confirmInvalidBody: string;
    unsubscribeHeading: string;
    unsubscribeBody: string;
    resubscribe: string;
    toWriting: string;
    confirmEmail: {
      subject: string;
      preview: string;
      heading: string;
      body: string;
      button: string;
      fallback: string;
      footer: string;
    };
    issueEmail: {
      unsubscribeLabel: string;
      siteLabel: string;
    };
    survey: {
      leadIn: string;
      submit: string;
      noThanks: string;
      thankYou: string;
      otherPlaceholder: string;
      reasons: {
        inboxCleanup: string;
        notForMe: string;
        accidental: string;
        other: string;
      };
    };
  };
};

export default en;
