import type { Project } from '../en/projects';

export const projects: Project[] = [
  {
    slug: 'crumbtrail',
    title: 'Crumbtrail',
    description:
      'Ég elska að elda og deila máltíðum með mínum nánustu, en rak mig sífellt á sama vandamálið: bestu uppskriftirnar voru á víð og dreif í hópspjöllum, á handskrifuðum miðum og í minningum ættingja sem mældu aldrei neitt. Fjölskyldumeðlimir geta skoðað, leitað og bætt við eigin uppskriftum. Það sem byrjaði sem persónuleg lausn er að verða að endurnýtanlegri vöru svo aðrar fjölskyldur geti gert slíkt hið sama.',
    url: 'https://crumbtrail.valdez.is',
    tags: ['Next.js', 'React', 'Mantine', 'Supabase', 'Vercel'],
    featured: true,
    year: 2026,
    type: 'personal',
  },
  {
    slug: 'svef-voting',
    title: 'Kosningakerfi SVEF',
    description:
      'Vefforrit sem einfaldaði yfirferð innsendinga fyrir Íslensku vefverðlaunin. Upprunalega skrifað í React, síðar endurskrifað með Next.js, TypeScript og GraphQL. Viðhaldið og notað árlega frá 2018.',
    tags: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Vitest'],
    featured: true,
    year: '2018 – 2024',
    type: 'personal',
  },
  {
    slug: 'valdez-is',
    title: 'valdez.is',
    description:
      'Þessi vefsíða. Lifandi ferilskrá og persónuleg síða byggð með Next.js 16 App Router, CSS Modules og oklch litastigsbreytingum á hverri síðu. Ekkert CMS,efni sem kóði.',
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
      'Meðskipuleggjandi JSConf Iceland 2016 og 2018,tveggja daga ráðstefnur með yfir 30 alþjóðlegum fyrirlesurum og yfir 400 gestum hvor. Hluti af alþjóðlegu JSConf fjölskyldunni.',
    urls: [
      { label: '2016', href: 'https://2016.jsconf.is' },
      { label: '2018', href: 'https://2018.jsconf.is' },
    ],
    tags: ['Ráðstefna', 'Samfélag', 'JavaScript'],
    featured: true,
    year: '2016, 2018',
    type: 'community',
  },
  {
    slug: 'svef',
    title: 'Stjórnarmaður SVEF',
    description:
      'Sat í stjórn Samtaka vefiðnaðarins frá 2015 til 2019. Skipulagði fyrirlestra, vinnustofur og hin árlegu Íslensku vefverðlaunin. Tók þátt í hugmyndavinnu og framkvæmd IceWeb-ráðstefnunnar 2018 og 2019.',
    tags: ['Samfélag', 'Viðburðir', 'Vefiðnaður'],
    featured: true,
    year: '2015 – 2019',
    type: 'community',
  },
];
