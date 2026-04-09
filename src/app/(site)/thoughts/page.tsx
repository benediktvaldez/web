import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Thoughts",
};

export default function ThoughtsPage() {
  const posts = getAllPosts();

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Thoughts</h1>
      <p className={styles.intro}>
        Notes, ideas, and things I&apos;ve been thinking about.
      </p>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nothing here yet.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link href={`/thoughts/${post.slug}`} className={styles.postLink}>
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
