import type { Metadata } from "next";
import { SocialNav } from "@/components/SocialNav/SocialNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "@benediktvaldez",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>hi.</h1>
      <p className={styles.greet}>
        I&apos;m Benedikt D. Valdez,
        <br />a full stack digital product developer
      </p>
      <SocialNav />
    </main>
  );
}
