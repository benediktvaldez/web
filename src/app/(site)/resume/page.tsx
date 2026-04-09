import type { Metadata } from "next";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { projects } from "@/content/projects";
import { PrintButton } from "./PrintButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.name}>Benedikt D. Valdez</h1>
        <p className={styles.tagline}>Full stack digital product developer</p>
        <div className={styles.contact}>
          <a href="https://github.com/benediktvaldez">github.com/benediktvaldez</a>
          <span className={styles.separator}>·</span>
          <a href="https://linkedin.com/in/benediktvaldez">linkedin.com/in/benediktvaldez</a>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        {experience.map((job) => (
          <div key={`${job.company}-${job.period}`} className={styles.entry}>
            <div className={styles.entryLine}>
              <strong>{job.role}</strong>
              <span className={styles.meta}>
                {job.company} · {job.period}
              </span>
            </div>
            <p className={styles.entryDesc}>{job.description}</p>
            {job.highlights.length > 0 && (
              <ul className={styles.entryHighlights}>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        {featured.map((project) => (
          <div key={project.slug} className={styles.entry}>
            <div className={styles.entryLine}>
              <strong>{project.title}</strong>
              <span className={styles.meta}>{project.year}</span>
            </div>
            <p className={styles.entryDesc}>{project.description}</p>
            <span className={styles.entryTags}>
              {project.tags.join(" · ")}
            </span>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <div className={styles.skillGrid}>
          {skills.map((category) => (
            <div key={category.name}>
              <strong className={styles.skillLabel}>{category.name}:</strong>{" "}
              <span className={styles.skillItems}>
                {category.items.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <PrintButton />
    </article>
  );
}
