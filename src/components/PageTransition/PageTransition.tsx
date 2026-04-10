'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { GradientConfig } from '@/lib/gradients';
import { getGradientForPath } from '@/lib/gradients';
import styles from './PageTransition.module.css';

interface Props {
  children: React.ReactNode;
}

function gradientStyle(g: GradientConfig): React.CSSProperties {
  return {
    '--gradient-hue': g.hue,
    '--gradient-lightness': g.lightness,
    '--gradient-chroma': g.chroma,
    '--gradient-chroma-dark': g.chromaDark,
  } as React.CSSProperties;
}

export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [prev, setPrev] = useState<GradientConfig | null>(null);
  const gradient = getGradientForPath(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setPrev(getGradientForPath(prevPathname.current));

      const timer = setTimeout(() => setPrev(null), 500);

      prevPathname.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className={styles.wrapper}>
      {prev && (
        <div className={`${styles.gradient} ${styles.gradientOut}`} style={gradientStyle(prev)} />
      )}
      <div
        className={`${styles.gradient} ${prev ? styles.gradientIn : ''}`}
        style={gradientStyle(gradient)}
      />
      <div key={pathname} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
