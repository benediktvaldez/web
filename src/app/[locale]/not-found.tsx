import Link from 'next/link';
import { headers } from 'next/headers';
import { getDictionary } from '@/i18n/getDictionary';
import { defaultLocale, locales } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import styles from './not-found.module.css';

export default async function NotFound() {
  const pathname = (await headers()).get('x-pathname') ?? '';
  const segment = pathname.split('/').filter(Boolean)[0];
  const locale: Locale = locales.includes(segment as Locale) ? (segment as Locale) : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>{dict.notFound.heading}</h1>
      <p className={styles.message}>{dict.notFound.message}</p>
      <Link href={`/${locale}`} className={styles.link}>
        {dict.notFound.link}
      </Link>
    </main>
  );
}
