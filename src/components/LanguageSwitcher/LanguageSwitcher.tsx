"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocalizedPath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import styles from "./LanguageSwitcher.module.css";

interface Props {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();
  const otherLocale: Locale = locale === "en" ? "is" : "en";
  const otherPath = getLocalizedPath(pathname, otherLocale);

  return (
    <nav aria-label="Language" className={styles.switcher}>
      <span className={locale === "en" ? styles.active : styles.inactive}>
        {locale === "en" ? "EN" : (
          <Link href={getLocalizedPath(pathname, "en")} className={styles.link}>
            EN
          </Link>
        )}
      </span>
      <span className={styles.separator}>/</span>
      <span className={locale === "is" ? styles.active : styles.inactive}>
        {locale === "is" ? "IS" : (
          <Link href={otherPath} className={styles.link}>
            IS
          </Link>
        )}
      </span>
    </nav>
  );
}
