import type { Experience } from '../en/experience';

export const experience: Experience[] = [
  {
    company: 'CookieHub',
    role: 'Senior Digital Product Developer',
    period: 'nóv 2025 – nú',
    description:
      'CookieHub er SaaS-fyrirtæki á sviði persónuverndar- og samþykkistækni sem býður fyrirtækjum um allan heim lausnir fyrir samþykki á vefkökum. Ég stýri endursmíði kerfisins, sem felst í því að færa það úr PHP/Laravel einliðu yfir í dreifða TypeScript örþjónustu, ásamt því að endurskrifa samþykkisgræjuna sem snýr að viðskiptavinum úr eldri JavaScript yfir í nútímalegt, einingaskipt kerfi. Ég byggði REST-forritaskil með skema-fyrst nálgun með Hono og Drizzle ORM, þar á meðal samþykkisgreiningarþjónustu sem studd er af ClickHouse með efnisfærðum sýndum. Ég stækkaði og aðlagaði núverandi Terraform-stýrðan AWS-innvið til að styðja við nýja þjónustu og umhverfi og kom á fót GitHub Actions CI/CD-ferlum fyrir allar safngeymslur. Endurskrifun samþykkisgræjunnar notar React og TypeScript með stöðuvéladrifnu flæði, einangrun með skuggaskjali og stuðningi fyrir TCF, CCPA og staðlaða ramma.',
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
    company: 'Sjálfstætt starfandi',
    role: 'Senior Digital Product Developer',
    period: 'mar 2024 – nú',
    description:
      'Ég fékk tækifæri til að vinna að völdum verkefnum þar sem ég gat þróað ýmsa færni mína, þar með talið verkefnastjórnun, vefþróun og mentoring. Þetta tímabil hefur hjálpað mér að skýra fagleg markmið mín og sjá fyrir mér draumastarf mitt í framtíðinni.',
  },
  {
    company: 'AIVA Golf',
    role: 'Senior Digital Product Developer',
    period: 'okt 2023 – feb 2024',
    description:
      'Hlutverk mitt var að leiða þróun á viðmóti sem kylfingar nota til að eiga samskipti við kerfið í eigin tæki og sjá sveiflugögnin sín í rauntíma á gólfskjá. Ég setti upp monorepo sem dreifði mörgum vefforritum jafnóðum á Vercel og notaði Supabase til að sjá um auðkenningu og gagnagrunn.',
    tech: ['React', 'TypeScript', 'Storybook', 'Figma', 'Vercel', 'Supabase', 'NX Monorepo'],
  },
  {
    company: 'GRID',
    role: 'Senior Digital Product Developer',
    period: 'sep 2022 – sep 2023',
    description:
      "Hjá GRID tók ég þátt í að smíða gagnvirkt sjónrænt lag ofan á töflureiknivél GRID – það fyrsta sinnar tegundar með samþættri gervigreindaraðstoð. Þessi vara gerir notendum kleift að búa til sínar eigin sannfærandi frásagnir með gögnum sem þeir hafa brennandi áhuga á. Frá mínu hlutverki innan teymisins vann ég náið með QA og hönnuðum og tryggði sameiginlega að afurðir okkar væru ekki aðeins tæknilega traustar heldur einnig sjónrænt aðlaðandi og notendavænar. Gagnasýnilagið, flókinn WYSIWYG ritill, var byggt á grunni opins Slate ritilsins. Framlag mitt snerist að mestu leyti um að auka getu ritlins, þar á meðal að innleiða Drag'n'Drop fyrir sérsniðna þætti og almennt hagræða samskiptum notenda.",
    tech: ['Next.js', 'React', 'TypeScript', 'Storybook', 'Slate'],
  },
  {
    company: 'Klappir Green Solutions',
    role: 'Senior Digital Product Developer',
    period: 'apr 2021 – sep 2022',
    description:
      'Klappir er spennandi sprotafyrirtæki sem hefur þróað sinn eigin sjálfbærnivettvang frá grunni með byltingarkenndri tækni og nýrri nálgun á sjálfbærnibókhald sem gerir viðskiptavinum kleift að útbúa nákvæm sjálfbærniuppgjör. Í starfi mínu einbeitti ég mér aðallega að flóknum kóðagrunni okkar sem byggður var með React og TypeScript. Ég innleiddi ferla fyrir sjálfvirkar prófanir, betrumbætti viðmót og bætti heildarupplifun notenda og útlit notendaviðmóts. Auk þess tók ég þátt í þróun nýs ytri vefs klappir.com.',
    tech: ['Next.js', 'React', 'TypeScript', 'GraphQL', 'Storybook', 'Figma', 'NX Monorepo'],
  },
  {
    company: 'Össur',
    role: 'Senior UI/UX Developer',
    period: 'des 2018 – des 2020',
    description:
      'Þegar ég hóf störf hjá Össuri rak fyrirtækið vefsvæði staðfært fyrir yfir 23 svæði og tungumál, auk þess að halda úti yfir 70 smærri vefjum. Hlutverk mitt var að leiða tæknilegu hliðina á stórum breytingum á vefkerfum Össurar í nánu samstarfi við hönnuði og efnishöfunda. Innleidd var höfuðlaus þjónusta þriðja aðila til að styðja við einingaskipt vefforrit sem byggð voru á nýju hönnunarkerfi. Til viðbótar við formlegar skyldur mínar stýrði ég teymi forritara og QA í Úkraínu. Þegar ég lét af störfum höfðum við þegar innleitt nýja vefsvæðið fyrir 15 svæði á ossur.com.',
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
    period: 'nóv 2018',
    description:
      'Ég veitti Kolibri sérfræðiaðstoð við að ljúka áhugaverðu verkefni fyrir Marel. Fyrirtækið vantaði reyndan vefforritara til að klára lokaáfanga verkefnisins á skjótan og skilvirkan hátt. Tæknistaflinn í verkefninu samanstóð af Umbraco-vefumsjónarkerfinu, þar sem notast var við Razor-sniðmát ásamt samþættum React-íhlutum.',
    tech: ['Umbraco', 'Razor', 'React', 'TypeScript'],
  },
  {
    company: 'Aranja',
    role: 'Senior Web Application Developer / UX Engineer',
    period: 'feb 2018 – okt 2018',
    description:
      'Ég vann með WOW air að ýmsum verkefnum sem sneru að vefsíðu þeirra og bókunarvél. Vefsíðan var Django-verkefni sem notaði Wagtail fyrir efnisumsjón. Bókunarvélin var nokkuð flókið React-verkefni með vandaðri viðskiptarökfræði og viðmótshlutum, að hluta til skrifað í Reason.',
  },
  {
    company: 'Kolibri',
    role: 'Digital Product Developer',
    period: 'jún 2014 – jan 2018',
    description:
      'Form5 sameinaðist Spretti og úr varð Kolibri sem beitir heildrænni nálgun við þróun stafrænna lausna. Meginábyrgð mín hjá Kolibri var að leiða tæknilega framtíðarsýn fyrirtækisins varðandi framendaþróun, auk þess að stýra og viðhalda flestri innri vefþróun í samstarfi við listrænan stjórnanda. Starf mitt hjá Icelandair fólst í að koma nýstofnaðri stafrænni þróunardeild þeirra á laggirnar, bæði menningarlega og tæknilega.',
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
    clients: ['VÍS', 'Landsnet', 'Íslandsbanki', 'Icelandair', 'Bláa Lónið', 'Nova'],
  },
  {
    company: 'Form5',
    role: 'Front-End Developer',
    period: 'sep 2013 – maí 2014',
    description:
      'Með fulla áherslu á framendaforritun vann ég náið með hönnuðinum Steinari Inga Farestveit við að skapa framúrskarandi og margverðlaunaða notendaupplifun fyrir innlenda og erlenda viðskiptavini. Við lögðum okkar af mörkum til nokkurra open source hugbúnaðarpakka og gáfum út nokkra eigin.',
    clients: ['66°North', 'Nikita Clothing', 'Bonfire Outerwear', 'Salomon', 'Nova'],
  },
  {
    company: 'Skapalón',
    role: 'Front-End Developer',
    period: 'jún 2012 – ágú 2013',
    description:
      'Ég vann með metnaðarfullum hönnuðum hjá fyrirtækjum og opinberum aðilum á Íslandi við að þróa markaðsvefi, allt frá minni ferðaskrifstofum til Landsvirkjunar og embættis forseta Íslands. Öll verkefni byggð á .NET-vefumsjónarkerfi fyrirtækisins.',
  },
  {
    company: 'Netvistun',
    role: 'Web Developer & Designer',
    period: '2011 – maí 2012',
    description:
      'Ég hannaði og þróaði markaðsvefsíður fyrir lítil og meðalstór fyrirtæki á Íslandi með tækni á borð við JavaScript, LESS/CSS, XHTML og PHP. Ég gegndi stuðningshlutverki í virkri þróun á innanhúss-vefumsjónarkerfi í PHP.',
  },
  {
    company: 'Sjálfstætt starfandi',
    role: 'Freelance Web Developer & Designer',
    period: '2008 – 2011',
    description:
      'Þróaði mitt eigið einingaskipta vefumsjónarkerfi í PHP sem er mjög sérsniðið að þörfum hvers verkefnis. Hannaði og þróaði vefsíður fyrir lítil fyrirtæki og einstaklinga á Íslandi.',
  },
];
