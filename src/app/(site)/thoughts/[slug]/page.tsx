import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title || slug };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const { default: Content } = await import(`@/thoughts/${slug}.mdx`);

  return (
    <article className={styles.article}>
      <Content />
    </article>
  );
}
