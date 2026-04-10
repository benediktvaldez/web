import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Wizard } from './Wizard';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  return {
    title: t.letsGo.title,
    description: t.meta.siteDescription,
    alternates: { languages: { en: '/en/lets-go', is: '/is/byrjum' } },
  };
}

export default async function LetsGoPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);

  return <Wizard locale={locale} t={t.letsGo} />;
}
