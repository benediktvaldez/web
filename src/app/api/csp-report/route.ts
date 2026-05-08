import { NextResponse } from 'next/server';

/**
 * CSP violation report endpoint.
 *
 * Browsers POST here when a Content-Security-Policy or
 * Content-Security-Policy-Report-Only directive is violated. We log to stderr
 * (Vercel runtime logs) and return 204 — no need for a fancy reporting
 * service at this scale.
 *
 * Body shape varies by browser. Modern browsers send `application/csp-report`
 * with a `csp-report` envelope; newer ones send `application/reports+json`
 * with a flatter shape. Both are JSON.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // The console.warn lands in Vercel logs; concise, single-line for grep-friendliness.
    console.warn(
      '[csp-report]',
      JSON.stringify(body?.['csp-report'] ?? body?.body ?? body, null, 0),
    );
  } catch (err) {
    console.warn('[csp-report] unparseable body', err);
  }
  return new NextResponse(null, { status: 204 });
}

// CSP reports don't need GET; explicit 405 keeps the route honest.
export function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
