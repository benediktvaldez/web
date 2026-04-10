export const locales = ['en', 'is'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// English route name → Icelandic slug
export const slugMap: Record<string, Record<string, string>> = {
  is: {
    about: 'um',
    projects: 'verkefni',
    thoughts: 'hugleidingar',
    resume: 'ferilskra',
  },
};

// Icelandic slug → English route name (reverse lookup)
export const reverseSlugMap: Record<string, Record<string, string>> = {
  is: {
    um: 'about',
    verkefni: 'projects',
    hugleidingar: 'thoughts',
    ferilskra: 'resume',
  },
};

/**
 * Get the localized path for a given English route and locale.
 * e.g. getLocalizedPath("about", "is") → "um"
 */
export function getLocalizedSlug(englishSlug: string, locale: Locale): string {
  if (locale === 'en') return englishSlug;
  return slugMap[locale]?.[englishSlug] ?? englishSlug;
}

/**
 * Get the English route name for a localized slug.
 * e.g. getEnglishSlug("um", "is") → "about"
 */
export function getEnglishSlug(slug: string, locale: Locale): string {
  if (locale === 'en') return slug;
  return reverseSlugMap[locale]?.[slug] ?? slug;
}

/**
 * Build a full localized path.
 * e.g. getLocalizedPath("/en/about", "is") → "/is/um"
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
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

  return `/${targetLocale}/${targetSlug}${rest.length > 1 ? '/' + rest.slice(1).join('/') : ''}`;
}
