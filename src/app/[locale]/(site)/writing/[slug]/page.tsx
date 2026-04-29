import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { locales, getLocalizedSlug } from '@/i18n/config';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { GalleryProvider } from '@/components/BlogImage/BlogImage';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const posts = getAllPosts();
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post?.title || slug,
    description: post?.summary || undefined,
    alternates: {
      languages: {
        en: `/en/writing/${slug}`,
        is: `/is/skrif/${slug}`,
      },
    },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const writingSlug = getLocalizedSlug('writing', locale);

  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) notFound();

  const currentPost = posts[currentIndex];
  const { default: Content } = await import(`@/writing/${slug}.mdx`);

  let nextPost = currentPost.related ? posts.find((p) => p.slug === currentPost.related) : null;
  if (!nextPost) {
    nextPost = posts[(currentIndex + 1) % posts.length];
    if (nextPost?.slug === slug) nextPost = null;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale === 'is' ? 'is-IS' : 'en-US', {
    dateStyle: 'long',
  });
  const formattedDate = dateFormatter.format(new Date(currentPost.date));
  const readLabel = locale === 'is' ? 'mín lestur' : 'min read';

  return (
    <article className={`${styles.article} stagger`} lang={currentPost.lang}>
      <Link href={`/${locale}/${writingSlug}`} className={styles.backLink} lang={locale}>
        ← {locale === 'is' ? 'Til baka' : 'All writing'}
      </Link>
      <h1>{currentPost.title}</h1>
      <p className={styles.byline} lang={locale}>
        {currentPost.type === 'archive' && currentPost.era ? (
          <span className={styles.bylineEra}>
            {locale === 'is' ? 'Úr safninu' : 'From the archive'}: {currentPost.era}
          </span>
        ) : (
          <time dateTime={currentPost.date}>{formattedDate}</time>
        )}
        <span aria-hidden="true">·</span>
        <span>
          {currentPost.readingMinutes} {readLabel}
        </span>
      </p>
      <ul
        className={styles.chips}
        aria-label={locale === 'is' ? 'Merkingar' : 'Tags'}
        lang={locale}
      >
        <li className={`${styles.chip} ${styles.langChip}`}>{currentPost.lang.toUpperCase()}</li>
        {currentPost.tags.map((tag) => (
          <li key={tag} className={styles.chip}>
            {tag.replace(/-/g, ' ')}
          </li>
        ))}
      </ul>
      <div className={styles.printByline}>
        <p>
          {locale === 'is'
            ? 'Eftir Benedikt D. Valdez · hi@valdez.is · valdez.is'
            : 'By Benedikt D. Valdez · hi@valdez.is · valdez.is'}
        </p>
      </div>
      <GalleryProvider>
        <div className={styles.body}>
          <Content components={{ h1: () => null }} />
        </div>
      </GalleryProvider>
      {nextPost && (
        <div className={styles.nextPost} lang={locale}>
          <span className={styles.nextLabel}>{locale === 'is' ? 'Lestu einnig' : 'Read next'}</span>
          <Link
            href={`/${locale}/${writingSlug}/${nextPost.slug}`}
            className={styles.nextLink}
            lang={nextPost.lang}
          >
            {nextPost.title}
          </Link>
          {nextPost.type === 'archive' && nextPost.era && (
            <span className={styles.nextEra}>{nextPost.era}</span>
          )}
        </div>
      )}
    </article>
  );
}
