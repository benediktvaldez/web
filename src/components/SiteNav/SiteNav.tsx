"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import { getLocalizedSlug } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import styles from "./SiteNav.module.css";

const navItems = [
  { slug: "about", labelKey: "about" },
  { slug: "projects", labelKey: "projects" },
  { slug: "thoughts", labelKey: "thoughts" },
] as const;

const navLabels: Record<Locale, Record<string, string>> = {
  en: { about: "About", projects: "Projects", thoughts: "Thoughts" },
  is: { about: "Um", projects: "Verkefni", thoughts: "Hugleiðingar" },
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/benediktvaldez", icon: GithubLogo },
  { name: "LinkedIn", href: "https://linkedin.com/in/benediktvaldez", icon: LinkedinLogo },
  { name: "Instagram", href: "https://instagram.com/benediktvaldez", icon: InstagramLogo },
  { name: "Email", href: "mailto:hi@valdez.is", icon: EnvelopeSimple },
];

interface Props {
  locale: Locale;
}

export function SiteNav({ locale }: Props) {
  const pathname = usePathname();

  const links = navItems.map((item) => ({
    href: `/${locale}/${getLocalizedSlug(item.slug, locale)}`,
    label: navLabels[locale][item.labelKey],
  }));

  return (
    <>
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <Link href={`/${locale}`} className={styles.name}>
            Benedikt D. Valdez
          </Link>
          <ul className={styles.links}>
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${pathname === href ? styles.active : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileLocale}>
            <LanguageSwitcher locale={locale} />
          </div>
          <div className={styles.bottom}>
            <LanguageSwitcher locale={locale} />
            <div className={styles.social}>
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={styles.socialLink}
                  aria-label={name}
                >
                  <Icon size={18} weight="regular" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </aside>
      <div className={styles.mobileFooter}>
        {socialLinks.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className={styles.socialLink}
            aria-label={name}
          >
            <Icon size={18} weight="regular" aria-hidden />
          </a>
        ))}
      </div>
    </>
  );
}
