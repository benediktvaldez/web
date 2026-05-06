import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { SubscribeForm } from '@/components/SubscribeForm/SubscribeForm';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  return {
    title: t.subscribe.title,
    description: t.subscribe.metaDescription,
    alternates: { languages: { en: '/en/subscribe', is: '/is/askrift' } },
  };
}

export default async function SubscribePage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);

  return (
    <section className={`${styles.section} stagger`}>
      <h1 className={styles.heading}>{t.subscribe.title}</h1>
      <p className={styles.intro}>{t.subscribe.pageIntro}</p>
      <SubscribeForm locale={locale} t={t.subscribe} variant="block" />
    </section>
  );
}
