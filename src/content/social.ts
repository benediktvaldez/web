export interface SocialLinkData {
  name: string;
  href: string;
  iconName: 'GithubLogo' | 'LinkedinLogo' | 'EnvelopeSimple';
  external: boolean;
}

export const socialLinks: SocialLinkData[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/benediktvaldez',
    iconName: 'GithubLogo',
    external: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/benediktvaldez',
    iconName: 'LinkedinLogo',
    external: true,
  },
  {
    name: 'Email',
    href: 'mailto:hi@valdez.is',
    iconName: 'EnvelopeSimple',
    external: false,
  },
];
