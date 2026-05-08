import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, slugMap, reverseSlugMap } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { buildCspPolicy, generateCspNonce } from '@/lib/csp';

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

  const nonce = generateCspNonce();
  const cspPolicy = buildCspPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-csp-nonce', nonce);

  const stampCsp = (response: NextResponse) => {
    response.headers.set('Content-Security-Policy-Report-Only', cspPolicy);
    return response;
  };

  const passThrough = () => stampCsp(NextResponse.next({ request: { headers: requestHeaders } }));

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
      // Rewrite internally: /is/hver-eg-er → /is/who-i-am (keeps URL as /is/hver-eg-er)
      const rewrittenPath = `/${locale}/${englishRoute}${restSegments.length > 1 ? '/' + restSegments.slice(1).join('/') : ''}`;
      const rewrittenUrl = new URL(rewrittenPath, request.url);
      rewrittenUrl.search = request.nextUrl.search;
      return NextResponse.rewrite(rewrittenUrl);
    }

    // Check if this is an English slug under a non-English locale → redirect to canonical
    const localizedSlug = slugMap[locale]?.[firstSlug];
    if (localizedSlug) {
      // Redirect: /is/who-i-am → /is/hver-eg-er
      const canonicalPath = `/${locale}/${localizedSlug}${restSegments.length > 1 ? '/' + restSegments.slice(1).join('/') : ''}`;
      const canonicalUrl = new URL(canonicalPath, request.url);
      canonicalUrl.search = request.nextUrl.search;
      return NextResponse.redirect(canonicalUrl);
    }
  }

  return passThrough();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
