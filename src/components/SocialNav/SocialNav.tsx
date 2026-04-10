import { GithubLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./SocialNav.module.css";

const links = [
  { name: "GitHub", href: "https://github.com/benediktvaldez", icon: GithubLogo },
  { name: "LinkedIn", href: "https://linkedin.com/in/benediktvaldez", icon: LinkedinLogo },
  { name: "Instagram", href: "https://instagram.com/benediktvaldez", icon: InstagramLogo },
];

export function SocialNav() {
  return (
    <nav className={styles.nav}>
      {links.map(({ name, href, icon: Icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={name}>
          <Icon size={32} weight="regular" aria-hidden />
        </a>
      ))}
    </nav>
  );
}
