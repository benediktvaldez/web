"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
        <div className={styles.switcherWrapper}>
          <LanguageSwitcher locale={locale} />
        </div>
      </nav>
    </aside>
  );
}
