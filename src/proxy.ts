import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, slugMap, reverseSlugMap } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, _next, and favicon
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files (favicon.ico, etc.)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as string | undefined;

  // Check if the first segment is a known locale
  const isLocalePrefix = firstSegment && locales.includes(firstSegment as Locale);

  // No locale prefix: redirect to default locale
  if (!isLocalePrefix) {
    // Try to detect locale from Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language') || '';
    const preferredLocale = acceptLanguage.includes('is') ? 'is' : defaultLocale;

    // For the root path, redirect to the locale root
    if (segments.length === 0) {
      return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
    }

    // For any other path without locale, redirect to default locale
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  const locale = firstSegment as Locale;
  const restSegments = segments.slice(1);
  const firstSlug = restSegments[0];

  // If there's a slug to check for locale-specific routing
  if (firstSlug && locale !== 'en') {
    // Check if this is an Icelandic slug → rewrite to English route name
    const englishRoute = reverseSlugMap[locale]?.[firstSlug];
    if (englishRoute) {
      // Rewrite internally: /is/hver-er-eg → /is/about (keeps URL as /is/hver-er-eg)
      const rewrittenPath = `/${locale}/${englishRoute}${restSegments.length > 1 ? '/' + restSegments.slice(1).join('/') : ''}`;
      return NextResponse.rewrite(new URL(rewrittenPath, request.url));
    }

    // Check if this is an English slug under a non-English locale → redirect to canonical
    const localizedSlug = slugMap[locale]?.[firstSlug];
    if (localizedSlug) {
      // Redirect: /is/about → /is/hver-er-eg
      const canonicalPath = `/${locale}/${localizedSlug}${restSegments.length > 1 ? '/' + restSegments.slice(1).join('/') : ''}`;
      return NextResponse.redirect(new URL(canonicalPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
