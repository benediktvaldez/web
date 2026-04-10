import { test, expect } from '@playwright/test';

test.describe('metadata and SEO', () => {
  test('home page has correct OG tags', async ({ page }) => {
    await page.goto('/en');
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    const ogSiteName = await page.getAttribute('meta[property="og:site_name"]', 'content');
    const ogType = await page.getAttribute('meta[property="og:type"]', 'content');

    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogSiteName).toBe('Benedikt D. Valdez');
    expect(ogType).toBe('website');
  });

  test('pages have descriptions', async ({ page }) => {
    const pages = ['/en', '/en/about', '/en/projects', '/en/thoughts', '/en/resume'];
    for (const path of pages) {
      await page.goto(path);
      const description = await page.getAttribute('meta[name="description"]', 'content');
      expect(description, `missing description on ${path}`).toBeTruthy();
    }
  });

  test('pages have hreflang alternates', async ({ page }) => {
    await page.goto('/en/about');
    const enAlternate = await page.getAttribute('link[hreflang="en"]', 'href');
    const isAlternate = await page.getAttribute('link[hreflang="is"]', 'href');

    expect(enAlternate).toContain('/en/about');
    expect(isAlternate).toContain('/is/hver-er-eg');
  });

  test('icelandic pages have correct hreflang', async ({ page }) => {
    await page.goto('/is/verkefni');
    const enAlternate = await page.getAttribute('link[hreflang="en"]', 'href');
    const isAlternate = await page.getAttribute('link[hreflang="is"]', 'href');

    expect(enAlternate).toContain('/en/projects');
    expect(isAlternate).toContain('/is/verkefni');
  });

  test('twitter card is set', async ({ page }) => {
    await page.goto('/en');
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    expect(twitterCard).toBe('summary');
  });
});

test.describe('sitemap and robots', () => {
  test('sitemap.xml contains all routes', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const body = await response?.text();

    expect(body).toContain('/en');
    expect(body).toContain('/is');
    expect(body).toContain('/en/about');
    expect(body).toContain('/is/hver-er-eg');
    expect(body).toContain('/en/projects');
    expect(body).toContain('/is/verkefni');
    expect(body).toContain('/en/resume');
    expect(body).toContain('/is/ferilskra');
    expect(body).toContain('/en/thoughts');
    expect(body).toContain('/is/hugleidingar');
  });

  test('sitemap.xml has hreflang alternates', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const body = await response?.text();

    expect(body).toContain('hreflang="en"');
    expect(body).toContain('hreflang="is"');
  });

  test('robots.txt allows all and points to sitemap', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    const body = await response?.text();

    expect(body).toContain('User-Agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toContain('sitemap.xml');
  });
});
