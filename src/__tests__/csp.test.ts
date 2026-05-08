import { describe, it, expect } from 'vitest';
import { buildCspPolicy, generateCspNonce } from '@/lib/csp';

describe('CSP policy', () => {
  it('embeds the nonce in script-src', () => {
    const policy = buildCspPolicy('abc123');
    expect(policy).toMatch(/script-src[^;]*'nonce-abc123'/);
  });

  it('allowlists self-hosted Umami in script-src and connect-src', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/script-src[^;]*https:\/\/stats\.valdez\.is/);
    expect(policy).toMatch(/connect-src[^;]*https:\/\/stats\.valdez\.is/);
  });

  it('allowlists Vercel Speed Insights in script-src and connect-src', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/script-src[^;]*https:\/\/va\.vercel-scripts\.com/);
    expect(policy).toMatch(/connect-src[^;]*https:\/\/vitals\.vercel-insights\.com/);
  });

  it('allowlists vercel.live for the preview Toolbar', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/script-src[^;]*https:\/\/vercel\.live/);
    expect(policy).toMatch(/connect-src[^;]*https:\/\/vercel\.live/);
    expect(policy).toMatch(/connect-src[^;]*wss:\/\/vercel\.live/);
  });

  it('allows inline styles (React style props with CSS custom properties)', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/style-src[^;]*'unsafe-inline'/);
  });

  it('forbids any framing of the site (clickjacking defence)', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/frame-ancestors 'none'/);
  });

  it('points report-uri at the in-app endpoint', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/report-uri \/api\/csp-report/);
  });

  it('blob: + data: + https: are permitted for img-src (blog images, OG)', () => {
    const policy = buildCspPolicy('n');
    expect(policy).toMatch(/img-src[^;]*data:/);
    expect(policy).toMatch(/img-src[^;]*https:/);
    expect(policy).toMatch(/img-src[^;]*blob:/);
  });
});

describe('CSP nonce generator', () => {
  it('returns a non-empty string', () => {
    const nonce = generateCspNonce();
    expect(typeof nonce).toBe('string');
    expect(nonce.length).toBeGreaterThan(0);
  });

  it('returns alphanumeric (no hyphens, no padding) — base16 stripped', () => {
    expect(generateCspNonce()).toMatch(/^[a-f0-9]+$/);
  });

  it('produces unique values across calls', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 50; i++) seen.add(generateCspNonce());
    expect(seen.size).toBe(50);
  });
});
