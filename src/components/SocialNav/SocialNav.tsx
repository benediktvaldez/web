import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
} from '@phosphor-icons/react/dist/ssr';
import styles from './SocialNav.module.css';

const links = [
  { name: 'GitHub', href: 'https://github.com/benediktvaldez', icon: GithubLogo },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/benediktvaldez', icon: LinkedinLogo },
  { name: 'Instagram', href: 'https://instagram.com/benediktvaldez', icon: InstagramLogo },
  { name: 'Email hi@valdez.is', href: 'mailto:hi@valdez.is', icon: EnvelopeSimple },
];

export function SocialNav() {
  return (
    <nav className={styles.nav}>
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className={styles.link}
          aria-label={name}
        >
          <Icon size={32} weight="regular" aria-hidden />
          <span className={styles.tooltip}>{name}</span>
        </a>
      ))}
    </nav>
  );
}
