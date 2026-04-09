const en = {
  nav: {
    about: "About",
    projects: "Projects",
    thoughts: "Thoughts",
    resume: "Resume",
  },
  home: {
    greeting: "hi.",
    tagline: "I'm Benedikt D. Valdez,",
    taglineLine2: "a full stack digital product developer",
  },
  about: {
    title: "About",
    intro: [
      "I'm a full stack digital product developer and crafter of beautiful user interfaces. I'm passionate about creating exceptional user experiences that delight.",
      "I started building for the web in 2012 in the Icelandic agency scene — first at Skapalón, then at Form5 where I worked side-by-side with a designer creating award-winning experiences for clients like 66°North and Salomon. When Form5 merged with Sprettur to form Kolibri, I led front-end technical vision and worked with some of Iceland's biggest brands: Icelandair, The Blue Lagoon, Íslandsbanki.",
      "From there I moved into product roles — redesigning Össur's web platform across 23 regions, building data visualisation tools at GRID, and most recently leading a platform modernization at CookieHub, migrating from a PHP monolith to distributed TypeScript microservices.",
      "Outside of work, I've been part of the Icelandic web community — co-organizing JSConf Iceland in 2016 and 2018, and serving on the board of SVEF, the Icelandic Web Industry Association. I still maintain a voting system I built for the Icelandic Web Awards.",
      "These days I split my time between CookieHub and personal projects that scratch my own itches — a {recipeLink}, a sewing project manager, and this site.",
    ],
    recipeLink: "family recipe app",
    currentlyHeading: "Currently",
    currentRole: "Senior Digital Product Developer",
    currentCompany: "CookieHub",
    currentDesc:
      "Leading platform modernization — migrating from PHP/Laravel to TypeScript microservices, rewriting the consent widget in React, and building analytics with ClickHouse.",
    sideProjectsRole: "Building things",
    sideProjectsCompany: "Side projects",
    sideProjectsDesc:
      "Crumbtrail, Fil Rouge Studio, Ólátakjallari — apps built with Next.js and Supabase, developed with AI-augmented workflows.",
    contactHeading: "Get in touch",
    contactText: "Find me on {github}, {linkedin}, or {instagram}. For the full picture, check the {resume}.",
  },
  projects: {
    title: "Projects",
    intro: "Things I've built — mostly for myself, sometimes for others.",
    communityHeading: "Community",
    visit: "Visit",
    source: "Source",
  },
  thoughts: {
    title: "Thoughts",
    intro: "Notes, ideas, and things I've been thinking about.",
    empty: "Nothing here yet.",
  },
  resume: {
    title: "Resume",
    tagline: "Full stack digital product developer and crafter of beautiful user interfaces",
    experienceHeading: "Experience",
    projectsHeading: "Projects",
    communityHeading: "Community",
    skillsHeading: "Skills",
    print: "Print / Save as PDF",
  },
};

export type Dictionary = {
  nav: { about: string; projects: string; thoughts: string; resume: string };
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
  };
  projects: {
    title: string;
    intro: string;
    communityHeading: string;
    visit: string;
    source: string;
  };
  thoughts: { title: string; intro: string; empty: string };
  resume: {
    title: string;
    tagline: string;
    experienceHeading: string;
    projectsHeading: string;
    communityHeading: string;
    skillsHeading: string;
    print: string;
  };
};

export default en;
