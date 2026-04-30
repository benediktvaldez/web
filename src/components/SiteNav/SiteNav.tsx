'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Icon } from '@phosphor-icons/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import { socialLinks } from '@/content/social';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import styles from './SiteNav.module.css';

const ctaLabels: Record<Locale, string> = {
  en: 'Work with me',
  is: 'Vinnum saman',
};

const navItems = [
  { slug: 'who-i-am', labelKey: 'about' },
  { slug: 'projects', labelKey: 'projects' },
  { slug: 'writing', labelKey: 'writing' },
] as const;

const navLabels: Record<Locale, Record<string, string>> = {
  en: { about: 'Who I am', projects: 'Projects', writing: 'Writing' },
  is: { about: 'Hver ég er', projects: 'Verkefni', writing: 'Skrif' },
};

const iconMap: Record<string, Icon> = {
  GithubLogo: GithubLogoIcon,
  LinkedinLogo: LinkedinLogoIcon,
  EnvelopeSimple: EnvelopeSimpleIcon,
};

interface Props {
  locale: Locale;
}

export function SiteNav({ locale }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = navItems.map((item) => ({
    href: `/${locale}/${getLocalizedSlug(item.slug, locale)}`,
    label: navLabels[locale][item.labelKey],
  }));

  return (
    <>
      <aside className={styles.aside}>
        <nav aria-label="Main" className={styles.nav}>
          <Link href={`/${locale}`} className={styles.name}>
            Benedikt Valdez
          </Link>
          <ul className={styles.links}>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/${getLocalizedSlug('lets-go', locale)}`} className={styles.cta}>
            {ctaLabels[locale]}
          </Link>

          {/* Mobile: hamburger + CTA */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon size={20} weight="bold" /> : <ListIcon size={20} weight="bold" />}
          </button>
          <Link
            href={`/${locale}/${getLocalizedSlug('lets-go', locale)}`}
            className={styles.mobileCta}
          >
            {ctaLabels[locale]}
          </Link>

          <div className={styles.bottom}>
            <LanguageSwitcher locale={locale} />
            <div className={styles.social}>
              {socialLinks.map(({ name, href, iconName, external }) => {
                const SocialIcon = iconMap[iconName];
                return (
                  <a
                    key={name}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className={styles.socialLink}
                    aria-label={name}
                  >
                    <SocialIcon size={18} weight="regular" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile slide-down panel */}
      {menuOpen && (
        <div className={styles.mobilePanel}>
          <ul className={styles.mobilePanelLinks}>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobilePanelLink} ${pathname === href ? styles.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobilePanelBottom}>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}

      <footer className={styles.mobileFooter}>
        {socialLinks.map(({ name, href, iconName, external }) => {
          const SocialIcon = iconMap[iconName];
          return (
            <a
              key={name}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={styles.socialLink}
              aria-label={name}
            >
              <SocialIcon size={18} weight="regular" aria-hidden />
            </a>
          );
        })}
      </footer>
    </>
  );
}
