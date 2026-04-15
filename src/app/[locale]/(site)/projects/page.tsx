import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getProjects } from '@/content';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  return {
    title: t.projects.title,
    description: t.meta.projectsDescription,
    alternates: { languages: { en: '/en/projects', is: '/is/verkefni' } },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  const projects = await getProjects(locale);

  const personal = projects.filter((p) => p.type === 'personal');
  const community = projects.filter((p) => p.type === 'community');

  return (
    <section className={`${styles.section} stagger`}>
      <h1 className={styles.heading}>{t.projects.title}</h1>
      <p className={styles.intro}>{t.projects.intro}</p>

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
                    {t.projects.visit}
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    {t.projects.source}
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <h2 className={styles.subheading}>{t.projects.communityHeading}</h2>
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
            {(project.url || project.urls) && (
              <div className={styles.cardLinks}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    {t.projects.visit}
                  </a>
                )}
                {project.urls?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
