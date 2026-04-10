'use client';

import Link from 'next/link';
import { UserFocusIcon, RocketIcon, ChatTeardropDotsIcon } from '@phosphor-icons/react';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import styles from './PageNav.module.css';

const pages = [
  { slug: 'about', icon: UserFocusIcon, label: { en: 'Who am I', is: 'Hver er ég' } },
  {
    slug: 'projects',
    icon: RocketIcon,
    label: { en: 'Projects', is: 'Verkefni' },
  },
  {
    slug: 'thoughts',
    icon: ChatTeardropDotsIcon,
    label: { en: 'Thoughts', is: 'Hugleiðingar' },
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
          className={styles.link}
          aria-label={label[locale]}
        >
          <Icon size={32} weight="regular" aria-hidden />
          <span className={styles.tooltip}>{label[locale]}</span>
        </Link>
      ))}
    </nav>
  );
}
