import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { SocialNav } from "@/components/SocialNav/SocialNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "@benediktvaldez",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);

  return (
    <main className={styles.main}>
      <div className={styles.langCorner}>
        <LanguageSwitcher locale={locale} />
      </div>
      <h1>{t.home.greeting}</h1>
      <p className={styles.greet}>
        {t.home.tagline}
        <br />
        {t.home.taglineLine2}
      </p>
      <SocialNav />
    </main>
  );
}
