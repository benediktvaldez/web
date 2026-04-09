import type { Metadata } from "next";
import { projects } from "@/content/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const personal = projects.filter((p) => p.type === "personal");
  const community = projects.filter((p) => p.type === "community");

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Projects</h1>
      <p className={styles.intro}>
        Things I&apos;ve built — mostly for myself, sometimes for others.
      </p>

      <div className={styles.grid}>
        {personal.map((project) => (
          <article key={project.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <span className={styles.cardYear}>{project.year}</span>
            </div>
            <p className={styles.cardDescription}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            {(project.url || project.repo) && (
              <div className={styles.cardLinks}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    Visit
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    Source
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <h2 className={styles.subheading}>Community</h2>
      <div className={styles.grid}>
        {community.map((project) => (
          <article key={project.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <span className={styles.cardYear}>{project.year}</span>
            </div>
            <p className={styles.cardDescription}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            {project.url && (
              <div className={styles.cardLinks}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  Visit
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
