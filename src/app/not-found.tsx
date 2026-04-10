import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>This page doesn&apos;t exist. Maybe it never did.</p>
      <Link href="/en" className={styles.link}>
        Take me home
      </Link>
    </main>
  );
}
