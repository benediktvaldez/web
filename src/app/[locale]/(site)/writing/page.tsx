import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getAllPosts } from '@/lib/mdx';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  return {
    title: t.writing.title,
    description: t.meta.writingDescription,
    alternates: { languages: { en: '/en/writing', is: '/is/skrif' } },
  };
}

export default async function WritingPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  const posts = getAllPosts();
  const writingSlug = getLocalizedSlug('writing', locale);
  const dateFormatter = new Intl.DateTimeFormat(locale === 'is' ? 'is-IS' : 'en-US', {
    dateStyle: 'long',
  });
  const readLabel = locale === 'is' ? 'mín lestur' : 'min read';

  return (
    <section className={`${styles.section} stagger`}>
      <h1 className={styles.heading}>{t.writing.title}</h1>
      <p className={styles.intro}>{t.writing.intro}</p>

      {posts.length === 0 ? (
        <p className={styles.empty}>{t.writing.empty}</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link href={`/${locale}/${writingSlug}/${post.slug}`} className={styles.postLink}>
                <h2 className={styles.postTitle} lang={post.lang}>
                  {post.title}
                </h2>
                {post.summary && (
                  <p className={styles.postSummary} lang={post.lang}>
                    {post.summary}
                  </p>
                )}
                <div className={styles.meta}>
                  <p className={styles.byline}>
                    {post.type === 'archive' && post.era ? (
                      <span className={styles.postEra}>
                        {locale === 'is' ? 'Úr safninu' : 'From the archive'}: {post.era}
                      </span>
                    ) : (
                      <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>
                      {post.readingMinutes} {readLabel}
                    </span>
                  </p>
                  <ul className={styles.chips} aria-label={locale === 'is' ? 'Merkingar' : 'Tags'}>
                    <li className={`${styles.chip} ${styles.langChip}`}>
                      {post.lang.toUpperCase()}
                    </li>
                    {post.tags.map((tag) => (
                      <li key={tag} className={styles.chip}>
                        {tag.replace(/-/g, ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
