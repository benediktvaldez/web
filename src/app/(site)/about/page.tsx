import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className={styles.article}>
      <h1 className={styles.heading}>About</h1>

      <div className={styles.intro}>
        <p>
          I&apos;m a full stack digital product developer and crafter of
          beautiful user interfaces. I&apos;m passionate about creating
          exceptional user experiences that delight.
        </p>
        <p>
          I started building for the web in 2012 in the Icelandic agency scene
          — first at Skapalón, then at Form5 where I worked side-by-side with
          a designer creating award-winning experiences for clients like
          66°North and Salomon. When Form5 merged with Sprettur to form
          Kolibri, I led front-end technical vision and worked with some of
          Iceland&apos;s biggest brands: Icelandair, The Blue Lagoon,
          Íslandsbanki.
        </p>
        <p>
          From there I moved into product roles — redesigning Össur&apos;s web
          platform across 23 regions, building data visualisation tools at
          GRID, and most recently leading a platform modernization at
          CookieHub, migrating from a PHP monolith to distributed TypeScript
          microservices.
        </p>
        <p>
          Outside of work, I&apos;ve been part of the Icelandic web community
          — co-organizing JSConf Iceland in 2016 and 2018, and serving on the
          board of SVEF, the Icelandic Web Industry Association. I still
          maintain a voting system I built for the Icelandic Web Awards.
        </p>
        <p>
          These days I split my time between CookieHub and personal projects
          that scratch my own itches — a{" "}
          <Link href="/projects" className={styles.inlineLink}>
            family recipe app
          </Link>
          , a sewing project manager, and this site.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Currently</h2>
        <div className={styles.currently}>
          <div className={styles.currentItem}>
            <h3 className={styles.currentRole}>
              Senior Digital Product Developer
            </h3>
            <span className={styles.currentCompany}>CookieHub</span>
            <p className={styles.currentDesc}>
              Leading platform modernization — migrating from PHP/Laravel to
              TypeScript microservices, rewriting the consent widget in React,
              and building analytics with ClickHouse.
            </p>
          </div>
          <div className={styles.currentItem}>
            <h3 className={styles.currentRole}>Building things</h3>
            <span className={styles.currentCompany}>Side projects</span>
            <p className={styles.currentDesc}>
              Crumbtrail, Fil Rouge Studio, Ólátakjallari — apps built with
              Next.js and Supabase, developed with AI-augmented workflows.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Get in touch</h2>
        <p className={styles.contactText}>
          Find me on{" "}
          <a
            href="https://github.com/benediktvaldez"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            GitHub
          </a>
          ,{" "}
          <a
            href="https://linkedin.com/in/benediktvaldez"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            LinkedIn
          </a>
          , or{" "}
          <a
            href="https://instagram.com/benediktvaldez"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            Instagram
          </a>
          . For the full picture, check the{" "}
          <Link href="/resume" className={styles.inlineLink}>
            resume
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
