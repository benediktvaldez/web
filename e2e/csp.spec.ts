import { test, expect } from '@playwright/test';

test.describe('CSP', () => {
  // Phase 1 ships in Report-Only mode. Once promoted, flip ENFORCING to true
  // and the test below will assert the enforcing header instead.
  const ENFORCING = false;
  const HEADER = ENFORCING ? 'content-security-policy' : 'content-security-policy-report-only';

  // Use the `request` fixture rather than `page.goto()`/`getAttribute`:
  // browsers strip `nonce=""` from DOM lookups by design (so JS can't leak
  // it), so DOM-level assertions about the nonce are unreliable. Raw HTTP
  // response bodies retain the attribute and let us cross-check against the
  // CSP header.

  for (const path of ['/en', '/en/who-i-am', '/en/projects', '/en/lets-go', '/is']) {
    test(`${HEADER} header is set on ${path}`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBeLessThan(400);
      const csp = response.headers()[HEADER];
      expect(csp, `expected ${HEADER} header on ${path}`).toBeTruthy();
      expect(csp).toMatch(/script-src[^;]*'nonce-[a-f0-9]+'/);
      expect(csp).toMatch(/frame-ancestors 'none'/);
    });
  }

  test('nonce values differ across requests', async ({ request }) => {
    const [r1, r2] = await Promise.all([request.get('/en'), request.get('/en/projects')]);
    const nonce = (r: { headers: () => Record<string, string> }) =>
      r.headers()[HEADER].match(/'nonce-([a-f0-9]+)'/)?.[1];
    const n1 = nonce(r1);
    const n2 = nonce(r2);
    expect(n1).toBeTruthy();
    expect(n2).toBeTruthy();
    expect(n1).not.toBe(n2);
  });

  test('inline ld+json script carries the same nonce as the header', async ({ request }) => {
    const response = await request.get('/en');
    const csp = response.headers()[HEADER];
    const headerNonce = csp.match(/'nonce-([a-f0-9]+)'/)?.[1];
    expect(headerNonce).toBeTruthy();

    const html = await response.text();
    const scriptMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*nonce="([^"]+)"/);
    expect(scriptMatch?.[1], 'ld+json script must carry the request nonce').toBe(headerNonce);
  });

  test('/api/csp-report rejects GET, accepts POST', async ({ request }) => {
    const get = await request.get('/api/csp-report');
    expect(get.status()).toBe(405);

    const post = await request.post('/api/csp-report', {
      data: { 'csp-report': { 'violated-directive': 'test' } },
    });
    expect(post.status()).toBe(204);
  });
});
