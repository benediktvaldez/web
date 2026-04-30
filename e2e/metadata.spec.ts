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
    expect(ogSiteName).toBe('Benedikt Valdez');
    expect(ogType).toBe('website');
  });

  test('pages have descriptions', async ({ page }) => {
    const pages = ['/en', '/en/who-i-am', '/en/projects', '/en/writing', '/en/resume'];
    for (const path of pages) {
      await page.goto(path);
      const description = await page.getAttribute('meta[name="description"]', 'content');
      expect(description, `missing description on ${path}`).toBeTruthy();
    }
  });

  test('pages have hreflang alternates', async ({ page }) => {
    await page.goto('/en/who-i-am');
    const enAlternate = await page.getAttribute('link[hreflang="en"]', 'href');
    const isAlternate = await page.getAttribute('link[hreflang="is"]', 'href');

    expect(enAlternate).toContain('/en/who-i-am');
    expect(isAlternate).toContain('/is/hver-eg-er');
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
    expect(twitterCard).toBe('summary_large_image');
  });
});

test.describe('sitemap and robots', () => {
  test('sitemap.xml contains all routes', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const body = await response?.text();

    expect(body).toContain('/en');
    expect(body).toContain('/is');
    expect(body).toContain('/en/who-i-am');
    expect(body).toContain('/is/hver-eg-er');
    expect(body).toContain('/en/projects');
    expect(body).toContain('/is/verkefni');
    expect(body).toContain('/en/resume');
    expect(body).toContain('/is/ferilskra');
    expect(body).toContain('/en/writing');
    expect(body).toContain('/is/skrif');
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
