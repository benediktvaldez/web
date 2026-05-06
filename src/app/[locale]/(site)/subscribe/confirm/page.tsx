import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { confirmSubscription } from '@/lib/newsletter/actions';
import styles from '../page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ConfirmSubscriptionPage({ params, searchParams }: Props) {
  const { locale: l } = await params;
  const { token } = await searchParams;
  const locale = l as Locale;
  const t = await getDictionary(locale);

  const result = token
    ? await confirmSubscription(token)
    : { success: false, error: 'invalid_token' as const };
  const writingSlug = getLocalizedSlug('writing', locale);

  let heading: string;
  let body: string;
  if (result.success) {
    heading = t.subscribe.confirmSuccessHeading;
    body = t.subscribe.confirmSuccessBody;
  } else if ('error' in result && result.error === 'expired') {
    heading = t.subscribe.confirmExpiredHeading;
    body = t.subscribe.confirmExpiredBody;
  } else {
    heading = t.subscribe.confirmInvalidHeading;
    body = t.subscribe.confirmInvalidBody;
  }

  return (
    <section className={`${styles.section} stagger`}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.intro}>{body}</p>
      <Link href={`/${locale}/${writingSlug}`} className={styles.link}>
        {t.subscribe.toWriting}
      </Link>
    </section>
  );
}
