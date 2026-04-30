'use client';

import { useState } from 'react';
import type { Recommendation } from '@/content/recommendations';
import styles from './RecommendationCard.module.css';

interface Props {
  recommendation: Recommendation;
  labels: { readMore: string; showLess: string };
}

export function RecommendationCard({ recommendation: rec, labels }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <blockquote className={styles.card}>
      <p className={`${styles.quote} ${expanded ? styles.expanded : ''}`}>{rec.quote}</p>
      <button
        className={styles.toggle}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? labels.showLess : labels.readMore}
      </button>
      <footer className={styles.attribution}>
        <strong>{rec.name}</strong>
        <span className={styles.meta}>
          {rec.role}, {rec.company}
        </span>
        {rec.relationship && <span className={styles.relation}>{rec.relationship}</span>}
      </footer>
    </blockquote>
  );
}
