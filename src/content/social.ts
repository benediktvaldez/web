export interface SocialLinkData {
  name: string;
  href: string;
  iconName: 'GithubLogo' | 'LinkedinLogo' | 'InstagramLogo' | 'EnvelopeSimple';
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
    name: 'Instagram',
    href: 'https://instagram.com/benediktvaldez',
    iconName: 'InstagramLogo',
    external: true,
  },
  {
    name: 'Email',
    href: 'mailto:hi@valdez.is',
    iconName: 'EnvelopeSimple',
    external: false,
  },
];
