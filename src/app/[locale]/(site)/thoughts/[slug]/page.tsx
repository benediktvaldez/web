import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { locales, getLocalizedSlug } from '@/i18n/config';
import { getAllPosts, getPostLocale } from '@/lib/mdx';
import { GalleryProvider } from '@/components/BlogImage/BlogImage';
import { SetPostLocaleMap } from '@/lib/post-locale-context';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const posts = getAllPosts(locale);
    return posts.map((post) => ({ locale, slug: post.slug }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const posts = getAllPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post?.title || slug,
    description: post?.summary || undefined,
    alternates: {
      languages: {
        en: `/en/thoughts/${slug}`,
        is: `/is/hugleidingar/${slug}`,
      },
    },
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const thoughtsSlug = getLocalizedSlug('thoughts', locale);
  const posts = getAllPosts(locale);
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  // Post doesn't exist in this locale
  if (currentIndex === -1) {
    const otherLocale = locale === 'en' ? 'is' : 'en';
    const otherPosts = getAllPosts(otherLocale);
    const otherPost = otherPosts.find((p) => p.localeSlug?.[locale] === slug);
    const otherSlug = otherPost ? otherPost.slug : slug;
    const otherThoughtsSlug = getLocalizedSlug('thoughts', otherLocale);

    return (
      <article className={`${styles.article} stagger`}>
        <Link href={`/${locale}/${thoughtsSlug}`} className={styles.backLink}>
          ← {locale === 'is' ? 'Til baka' : 'All thoughts'}
        </Link>
        <h1 className={styles.missingTitle}>
          {locale === 'is' ? 'Eitt tungumál í einu' : 'One language at a time'}
        </h1>
        <p className={styles.missingText}>
          {locale === 'is'
            ? 'Þessi grein er bara til á ensku eins og er.'
            : 'This one only exists in Icelandic for now.'}
        </p>
        <Link
          href={`/${otherLocale}/${otherThoughtsSlug}/${otherSlug}`}
          className={styles.missingLink}
        >
          {locale === 'is' ? 'Lesa á ensku →' : 'Read in Icelandic →'}
        </Link>
      </article>
    );
  }

  const postLocale = getPostLocale(slug, locale);
  const { default: Content } = await import(`@/thoughts/${postLocale}/${slug}.mdx`);
  const currentPost = posts[currentIndex];

  // Use explicit related post if set, otherwise pick the next chronological post
  let nextPost = null;
  if (currentPost?.related) {
    nextPost = posts.find((p) => p.slug === currentPost.related) || null;
  }
  if (!nextPost && currentIndex >= 0) {
    // Next in list (wraps around)
    nextPost = posts[(currentIndex + 1) % posts.length];
    // Don't suggest yourself
    if (nextPost?.slug === slug) nextPost = null;
  }

  // Build locale slug map for language switcher
  const postSlugMap: Record<string, string> = { [locale]: slug };
  if (currentPost?.localeSlug) {
    Object.assign(postSlugMap, currentPost.localeSlug);
  }

  return (
    <>
      <SetPostLocaleMap slugMap={postSlugMap} />
      <article className={`${styles.article} stagger`}>
        <Link href={`/${locale}/${thoughtsSlug}`} className={styles.backLink}>
          ← {locale === 'is' ? 'Til baka' : 'All thoughts'}
        </Link>
        <GalleryProvider>
          <Content />
        </GalleryProvider>
        {nextPost && (
          <div className={styles.nextPost}>
            <span className={styles.nextLabel}>
              {locale === 'is' ? 'Lestu einnig' : 'Read next'}
            </span>
            <Link href={`/${locale}/${thoughtsSlug}/${nextPost.slug}`} className={styles.nextLink}>
              {nextPost.title}
            </Link>
            {nextPost.type === 'archive' && nextPost.era && (
              <span className={styles.nextEra}>{nextPost.era}</span>
            )}
          </div>
        )}
      </article>
    </>
  );
}
