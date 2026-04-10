'use client';

import Link from 'next/link';
import { UserFocus, Rocket, ChatTeardropDots } from '@phosphor-icons/react';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import styles from './PageNav.module.css';

const pages = [
  { slug: 'about', icon: UserFocus, label: { en: 'Who am I', is: 'Hver er ég' } },
  {
    slug: 'projects',
    icon: Rocket,
    label: { en: 'Projects', is: 'Verkefni' },
  },
  {
    slug: 'thoughts',
    icon: ChatTeardropDots,
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
        >
          <Icon size={32} weight="regular" aria-hidden />
          <span className={styles.tooltip}>{label[locale]}</span>
        </Link>
      ))}
    </nav>
  );
}
