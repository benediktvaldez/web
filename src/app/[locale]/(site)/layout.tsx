import type { Locale } from "@/i18n/config";
import { SiteNav } from "@/components/SiteNav/SiteNav";
import styles from "./layout.module.css";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <div className={styles.layout}>
      <SiteNav locale={locale} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
