import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getLocalizedSlug } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAllPosts } from "@/lib/mdx";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  return {
    title: t.thoughts.title,
    description: t.meta.thoughtsDescription,
    alternates: { languages: { en: "/en/thoughts", is: "/is/hugleidingar" } },
  };
}

export default async function ThoughtsPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  const posts = getAllPosts(locale);
  const thoughtsSlug = getLocalizedSlug("thoughts", locale);

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>{t.thoughts.title}</h1>
      <p className={styles.intro}>{t.thoughts.intro}</p>

      {posts.length === 0 ? (
        <p className={styles.empty}>{t.thoughts.empty}</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link
                href={`/${locale}/${thoughtsSlug}/${post.slug}`}
                className={styles.postLink}
              >
                <h2 className={styles.postTitle}>{post.title}</h2>
                {post.summary && (
                  <p className={styles.postSummary}>{post.summary}</p>
                )}
                <time className={styles.postDate}>{post.date}</time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
