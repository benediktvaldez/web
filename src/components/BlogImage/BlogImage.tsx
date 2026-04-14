'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './BlogImage.module.css';

interface ImageEntry {
  src: string;
  alt: string;
}

interface GalleryContextType {
  register: (entry: ImageEntry) => number;
  open: (index: number) => void;
}

const GalleryContext = createContext<GalleryContextType>({
  register: () => 0,
  open: () => {},
});

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const register = useCallback((entry: ImageEntry) => {
    let idx = -1;
    setImages((prev) => {
      const existing = prev.findIndex((img) => img.src === entry.src);
      if (existing >= 0) {
        idx = existing;
        return prev;
      }
      idx = prev.length;
      return [...prev, entry];
    });
    return idx;
  }, []);

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return null;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeIndex, close, prev, next]);

  const current = activeIndex !== null ? images[activeIndex] : null;

  return (
    <GalleryContext.Provider value={{ register, open }}>
      {children}
      {current &&
        createPortal(
          <div className={styles.lightbox}>
            <button
              className={styles.backdrop}
              onClick={close}
              aria-label="Close gallery"
              tabIndex={-1}
            />
            <div
              className={styles.lightboxInner}
              role="presentation"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={1200}
                height={900}
                className={styles.lightboxImage}
                sizes="90vw"
                quality={90}
              />
              <p className={styles.lightboxCaption}>{current.alt}</p>
            </div>
            {images.length > 1 && (
              <>
                <button
                  className={styles.navButton}
                  data-dir="prev"
                  onClick={prev}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button
                  className={styles.navButton}
                  data-dir="next"
                  onClick={next}
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </>
            )}
            <button className={styles.closeButton} onClick={close} aria-label="Close gallery">
              &times;
            </button>
            <span className={styles.counter}>
              {(activeIndex ?? 0) + 1} / {images.length}
            </span>
          </div>,
          document.body,
        )}
    </GalleryContext.Provider>
  );
}

interface BlogImageProps {
  src: string;
  alt: string;
}

export function BlogImage({ src, alt }: BlogImageProps) {
  const { register, open } = useContext(GalleryContext);
  const [index] = useState(() => register({ src, alt }));

  return (
    <button className={styles.thumbnail} onClick={() => open(index)}>
      <Image src={src} alt={alt} width={300} height={225} className={styles.image} sizes="300px" />
    </button>
  );
}
