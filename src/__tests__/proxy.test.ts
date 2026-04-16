import { describe, it, expect } from 'vitest';
import { locales, slugMap, reverseSlugMap } from '@/i18n/config';

describe('proxy routing logic', () => {
  it('all non-english locales have slug mappings', () => {
    for (const locale of locales.filter((l) => l !== 'en')) {
      expect(slugMap[locale]).toBeDefined();
      expect(reverseSlugMap[locale]).toBeDefined();
    }
  });

  it('slug maps cover all routes', () => {
    const expectedRoutes = ['who-i-am', 'projects', 'thoughts', 'resume'];
    for (const locale of Object.keys(slugMap)) {
      for (const route of expectedRoutes) {
        expect(slugMap[locale][route], `missing ${route} in ${locale} slugMap`).toBeTruthy();
      }
    }
  });

  it('reverse maps cover all localized slugs', () => {
    for (const locale of Object.keys(slugMap)) {
      const localizedSlugs = Object.values(slugMap[locale]);
      for (const slug of localizedSlugs) {
        expect(
          reverseSlugMap[locale][slug],
          `missing reverse mapping for ${slug} in ${locale}`,
        ).toBeTruthy();
      }
    }
  });

  it('localized slugs are URL-safe', () => {
    for (const locale of Object.keys(slugMap)) {
      for (const slug of Object.values(slugMap[locale])) {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });
});
