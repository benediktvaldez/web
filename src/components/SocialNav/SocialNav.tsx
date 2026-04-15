import type { Icon } from '@phosphor-icons/react';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react/dist/ssr';
import { socialLinks } from '@/content/social';
import styles from './SocialNav.module.css';

const iconMap: Record<string, Icon> = {
  GithubLogo: GithubLogoIcon,
  LinkedinLogo: LinkedinLogoIcon,
  EnvelopeSimple: EnvelopeSimpleIcon,
};

export function SocialNav() {
  return (
    <nav className={styles.nav}>
      {socialLinks.map(({ name, href, iconName, external }) => {
        const Icon = iconMap[iconName];
        return (
          <a
            key={name}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={styles.link}
            aria-label={name}
          >
            <Icon size={32} weight="regular" aria-hidden />
            <span className={styles.tooltip}>{name}</span>
          </a>
        );
      })}
    </nav>
  );
}
