import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className={styles.article}>
      <h1 className={styles.heading}>About</h1>
      <p className={styles.intro}>
        Full stack digital product developer. I build things for the web — from
        idea to deploy. Currently employed and building side projects that
        scratch my own itches.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Experience</h2>
        {experience.map((job) => (
          <div key={`${job.company}-${job.period}`} className={styles.entry}>
            <div className={styles.entryHeader}>
              <h3 className={styles.entryTitle}>{job.role}</h3>
              <span className={styles.entryMeta}>
                {job.company} · {job.period}
              </span>
            </div>
            <p className={styles.entryDescription}>{job.description}</p>
            {job.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Skills</h2>
        <div className={styles.skillGrid}>
          {skills.map((category) => (
            <div key={category.name} className={styles.skillCategory}>
              <h3 className={styles.skillCategoryName}>{category.name}</h3>
              <ul className={styles.skillList}>
                {category.items.map((item) => (
                  <li key={item} className={styles.skillItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
