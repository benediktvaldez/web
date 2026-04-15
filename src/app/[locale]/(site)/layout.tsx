import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { SiteNav } from '@/components/SiteNav/SiteNav';
import { RandomCta } from '@/components/RandomCta/RandomCta';
import styles from './layout.module.css';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getDictionary(locale);

  return (
    <div className={styles.layout}>
      <SiteNav locale={locale} />
      <main id="main-content" className={styles.main}>
        {children}
        <div className={styles.pageCta} data-print-hide>
          <RandomCta
            options={t.about.ctaOptions}
            href={`/${locale}/${getLocalizedSlug('lets-go', locale)}`}
            className={styles.ctaLink}
          />
        </div>
      </main>
    </div>
  );
}
