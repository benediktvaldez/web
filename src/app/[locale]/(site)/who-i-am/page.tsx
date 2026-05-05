import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getLocalizedSlug } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import type { ReactNode } from 'react';
import { recommendations } from '@/content/recommendations';
import { RecommendationCard } from '@/components/RecommendationCard/RecommendationCard';
import styles from './page.module.css';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);
  return {
    title: t.about.title,
    description: t.meta.aboutDescription,
    alternates: { languages: { en: '/en/who-i-am', is: '/is/hver-eg-er' } },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = await getDictionary(locale);

  const projectsSlug = getLocalizedSlug('projects', locale);

  return (
    <article className={`${styles.article} stagger`}>
      <h1 className={styles.heading}>{t.about.title}</h1>

      <div className={styles.intro}>
        {t.about.intro.map((paragraph, i) => {
          if (paragraph.includes('{recipeLink}')) {
            const parts = paragraph.split('{recipeLink}');
            return (
              <p key={i}>
                {parts[0]}
                <Link href={`/${locale}/${projectsSlug}`} className={styles.inlineLink}>
                  {t.about.recipeLink}
                </Link>
                {parts[1]}
              </p>
            );
          }
          return <p key={i}>{paragraph}</p>;
        })}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{t.about.currentlyHeading}</h2>
        <div className={styles.currently}>
          <div className={styles.currentItem}>
            <h3 className={styles.currentRole}>{t.about.currentRole}</h3>
            <span className={styles.currentCompany}>{t.about.currentCompany}</span>
            <p className={styles.currentDesc}>{t.about.currentDesc}</p>
          </div>
          <div className={styles.currentItem}>
            <h3 className={styles.currentRole}>{t.about.sideProjectsRole}</h3>
            <span className={styles.currentCompany}>{t.about.sideProjectsCompany}</span>
            <p className={styles.currentDesc}>{t.about.sideProjectsDesc}</p>
          </div>
        </div>
      </section>

      {recommendations.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>{t.about.recommendationsHeading}</h2>
          <div className={styles.recommendations}>
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.name}
                recommendation={rec}
                labels={{ readMore: t.about.readMore, showLess: t.about.showLess }}
              />
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>{t.about.contactHeading}</h2>
        <p className={styles.contactText}>
          {t.about.contactText.split(/(\{github\}|\{linkedin\})/).map((part, i): ReactNode => {
            if (part === '{github}')
              return (
                <a
                  key={i}
                  href="https://github.com/benediktvaldez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  GitHub
                </a>
              );
            if (part === '{linkedin}')
              return (
                <a
                  key={i}
                  href="https://linkedin.com/in/benediktvaldez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  LinkedIn
                </a>
              );
            return part;
          })}
        </p>
      </section>
    </article>
  );
}
