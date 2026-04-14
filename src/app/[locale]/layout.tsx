import { locales } from '@/i18n/config';
import { PageTransition } from '@/components/PageTransition/PageTransition';
import { PostLocaleRoot } from '@/lib/post-locale-context';

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
      <PostLocaleRoot>
        <PageTransition>{children}</PageTransition>
      </PostLocaleRoot>
    </div>
  );
}
