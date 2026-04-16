export const locales = ['en', 'is'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// English route name → Icelandic slug
export const slugMap: Record<string, Record<string, string>> = {
  is: {
    'who-i-am': 'hver-eg-er',
    'projects': 'verkefni',
    'thoughts': 'hugleidingar',
    'resume': 'ferilskra',
    'lets-go': 'byrjum',
  },
};

// Icelandic slug → English route name (reverse lookup)
export const reverseSlugMap: Record<string, Record<string, string>> = {
  is: {
    'hver-eg-er': 'who-i-am',
    'verkefni': 'projects',
    'hugleidingar': 'thoughts',
    'ferilskra': 'resume',
    'byrjum': 'lets-go',
  },
};

/**
 * Get the localized path for a given English route and locale.
 * e.g. getLocalizedSlug("who-i-am", "is") → "hver-eg-er"
 */
export function getLocalizedSlug(englishSlug: string, locale: Locale): string {
  if (locale === 'en') return englishSlug;
  return slugMap[locale]?.[englishSlug] ?? englishSlug;
}

/**
 * Get the English route name for a localized slug.
 * e.g. getEnglishSlug("hver-eg-er", "is") → "who-i-am"
 */
export function getEnglishSlug(slug: string, locale: Locale): string {
  if (locale === 'en') return slug;
  return reverseSlugMap[locale]?.[slug] ?? slug;
}

/**
 * Build a full localized path.
 * e.g. getLocalizedPath("/en/who-i-am", "is") → "/is/hver-eg-er"
 */
export function getLocalizedPath(
  pathname: string,
  targetLocale: Locale,
  postSlugMap?: Record<string, string>,
): string {
  // Strip current locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] as Locale;
  const rest = segments.slice(1);

  if (rest.length === 0) {
    return `/${targetLocale}`;
  }

  // Convert first segment (the page slug) to/from English
  const englishSlug = currentLocale === 'en' ? rest[0] : getEnglishSlug(rest[0], currentLocale);
  const targetSlug = getLocalizedSlug(englishSlug, targetLocale);

  // Map sub-paths (e.g. blog post slugs) if a mapping is provided
  const subPath = rest.slice(1);
  if (subPath.length > 0 && postSlugMap?.[targetLocale]) {
    return `/${targetLocale}/${targetSlug}/${postSlugMap[targetLocale]}`;
  }

  return `/${targetLocale}/${targetSlug}${subPath.length > 0 ? '/' + subPath.join('/') : ''}`;
}
