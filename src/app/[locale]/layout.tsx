import { locales } from '@/i18n/config';
import { PageTransition } from '@/components/PageTransition/PageTransition';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div lang={locale}>
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
