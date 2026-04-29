'use client';

import Link from 'next/link';
import { UserFocusIcon, RocketIcon, ChatTeardropDotsIcon } from '@phosphor-icons/react';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import styles from './PageNav.module.css';

const pages = [
  { slug: 'who-i-am', icon: UserFocusIcon, label: { en: 'Who I am', is: 'Hver ég er' } },
  {
    slug: 'projects',
    icon: RocketIcon,
    label: { en: 'Projects', is: 'Verkefni' },
  },
  {
    slug: 'writing',
    icon: ChatTeardropDotsIcon,
    label: { en: 'Writing', is: 'Skrif' },
  },
] as const;

interface Props {
  locale: Locale;
}

export function PageNav({ locale }: Props) {
  return (
    <nav aria-label="Pages" className={styles.nav}>
      {pages.map(({ slug, icon: Icon, label }) => (
        <Link
          key={slug}
          href={`/${locale}/${getLocalizedSlug(slug, locale)}`}
          className={`${styles.link} ${styles[slug]}`}
          aria-label={label[locale]}
        >
          <Icon size={32} weight="regular" aria-hidden />
          <span className={styles.tooltip}>{label[locale]}</span>
        </Link>
      ))}
    </nav>
  );
}
