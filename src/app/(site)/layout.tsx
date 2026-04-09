import { SiteNav } from "@/components/SiteNav/SiteNav";
import styles from "./layout.module.css";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <SiteNav />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
