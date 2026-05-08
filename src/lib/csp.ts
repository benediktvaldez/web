/**
 * Build the Content-Security-Policy string.
 *
 * `nonce` is embedded for inline scripts (JSON-LD in the root layout, the
 * Umami tracker `<Script>` tag). Third-party hosts are allowlisted explicitly
 * (Speed Insights, Vercel Toolbar, the self-hosted Umami origin).
 *
 * `style-src` includes `'unsafe-inline'` because React components emit
 * `style` attributes with CSS custom properties (per-page gradients, page
 * transitions). The security upside of locking down inline styles is small
 * compared to locking down inline scripts.
 *
 * `img-src` is permissive on `https:` and `blob:` so blog content and OG
 * images load without ceremony.
 */
export function buildCspPolicy(nonce: string): string {
  return [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' https://stats.valdez.is https://va.vercel-scripts.com https://vercel.live`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data:`,
    `connect-src 'self' https://stats.valdez.is https://vitals.vercel-insights.com https://vercel.live wss://vercel.live`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `report-uri /api/csp-report`,
  ].join('; ');
}

/**
 * Generate a hex nonce suitable for CSP. Uses Web Crypto, which is available
 * in both Node 16+ and the Edge runtime.
 */
export function generateCspNonce(): string {
  return crypto.randomUUID().replace(/-/g, '');
}
