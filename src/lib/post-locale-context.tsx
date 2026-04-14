'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type SlugMap = Record<string, string> | null;

const PostLocaleContext = createContext<{
  slugMap: SlugMap;
  setSlugMap: (map: SlugMap) => void;
}>({
  slugMap: null,
  setSlugMap: () => {},
});

export function PostLocaleRoot({ children }: { children: React.ReactNode }) {
  const [slugMap, setSlugMap] = useState<SlugMap>(null);
  return (
    <PostLocaleContext.Provider value={{ slugMap, setSlugMap }}>
      {children}
    </PostLocaleContext.Provider>
  );
}

export function usePostLocaleMap() {
  return useContext(PostLocaleContext).slugMap;
}

/**
 * Drop this into a page to register post locale slugs with the language switcher.
 */
export function SetPostLocaleMap({ slugMap }: { slugMap: Record<string, string> }) {
  const { setSlugMap } = useContext(PostLocaleContext);

  useEffect(() => {
    setSlugMap(slugMap);
    return () => setSlugMap(null);
  }, [slugMap, setSlugMap]);

  return null;
}
