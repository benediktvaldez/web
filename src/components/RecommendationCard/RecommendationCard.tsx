'use client';

import { useState } from 'react';
import type { Recommendation } from '@/content/recommendations';
import styles from './RecommendationCard.module.css';

interface Props {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation: rec }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <blockquote className={styles.card}>
      <p className={`${styles.quote} ${expanded ? styles.expanded : ''}`}>
        &ldquo;{rec.quote}&rdquo;
      </p>
      <button
        className={styles.toggle}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
      <footer className={styles.attribution}>
        <strong>{rec.name}</strong>
        <span className={styles.meta}>
          {rec.role}, {rec.company}
        </span>
        <span className={styles.relation}>{rec.relationship}</span>
      </footer>
    </blockquote>
  );
}
