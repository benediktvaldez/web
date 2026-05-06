import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { unsubscribe } from '@/lib/newsletter/actions';
import { UnsubscribeSurvey } from '@/components/UnsubscribeSurvey/UnsubscribeSurvey';
import styles from '../page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({ params, searchParams }: Props) {
  const { locale: l } = await params;
  const { token } = await searchParams;
  const locale = l as Locale;
  const t = await getDictionary(locale);

  const result = token
    ? await unsubscribe(token)
    : { success: false, error: 'invalid_token' as const };
  const subscribeSlug = getLocalizedSlug('subscribe', locale);

  const heading = result.success
    ? t.subscribe.unsubscribeHeading
    : t.subscribe.confirmInvalidHeading;
  const body = result.success ? t.subscribe.unsubscribeBody : t.subscribe.confirmInvalidBody;

  return (
    <section className={`${styles.section} stagger`}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.intro}>{body}</p>
      {result.success && token && <UnsubscribeSurvey token={token} t={t.subscribe.survey} />}
      <Link href={`/${locale}/${subscribeSlug}`} className={styles.link}>
        {t.subscribe.resubscribe}
      </Link>
    </section>
  );
}
