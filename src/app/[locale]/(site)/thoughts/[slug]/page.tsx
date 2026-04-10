import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import { getAllPosts, getPostLocale } from '@/lib/mdx';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const posts = getAllPosts('en');
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const posts = getAllPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title || slug };
}

export default async function ThoughtPage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const postLocale = getPostLocale(slug, locale);
  const { default: Content } = await import(`@/thoughts/${postLocale}/${slug}.mdx`);

  return (
    <article className={`${styles.article} stagger`}>
      <Content />
    </article>
  );
}
