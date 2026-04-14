'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocalizedPath } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { usePostLocaleMap } from '@/lib/post-locale-context';
import styles from './LanguageSwitcher.module.css';

interface Props {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();
  const postSlugMap = usePostLocaleMap();

  const enPath = getLocalizedPath(pathname, 'en', postSlugMap ?? undefined);
  const isPath = getLocalizedPath(pathname, 'is', postSlugMap ?? undefined);

  return (
    <nav aria-label="Language" className={styles.switcher}>
      <span className={locale === 'en' ? styles.active : styles.inactive}>
        {locale === 'en' ? (
          'EN'
        ) : (
          <Link href={enPath} className={styles.link}>
            EN
          </Link>
        )}
      </span>
      <span className={styles.separator}>/</span>
      <span className={locale === 'is' ? styles.active : styles.inactive}>
        {locale === 'is' ? (
          'IS'
        ) : (
          <Link href={isPath} className={styles.link}>
            IS
          </Link>
        )}
      </span>
    </nav>
  );
}
