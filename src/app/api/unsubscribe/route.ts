import { NextResponse, type NextRequest } from 'next/server';
import { unsubscribe } from '@/lib/newsletter/actions';
import { locales, type Locale } from '@/i18n/config';

const isLocale = (s: string | null): s is Locale =>
  s !== null && (locales as readonly string[]).includes(s);

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }
  const result = await unsubscribe(token);
  if (!result.success) {
    return new NextResponse('Invalid token', { status: 400 });
  }
  return new NextResponse(null, { status: 200 });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const localeParam = req.nextUrl.searchParams.get('locale');
  if (!token) {
    return NextResponse.redirect(new URL('/en/subscribe', req.url));
  }
  const locale = isLocale(localeParam) ? localeParam : 'en';
  return NextResponse.redirect(
    new URL(`/${locale}/subscribe/unsubscribe?token=${encodeURIComponent(token)}`, req.url),
  );
}
