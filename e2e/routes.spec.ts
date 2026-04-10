import { test, expect } from '@playwright/test';

test.describe('route rendering', () => {
  const enPages = ['/en', '/en/about', '/en/projects', '/en/thoughts', '/en/resume'];
  const isPages = ['/is', '/is/um', '/is/verkefni', '/is/hugleidingar', '/is/ferilskra'];

  for (const path of enPages) {
    test(`${path} renders`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });
  }

  for (const path of isPages) {
    test(`${path} renders`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });
  }

  test('/en/thoughts/hello-world renders', async ({ page }) => {
    const response = await page.goto('/en/thoughts/hello-world');
    expect(response?.status()).toBe(200);
  });
});

test.describe('middleware redirects', () => {
  test('/ redirects to /en', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain('/en');
  });

  test('/about redirects to /en/about', async ({ page }) => {
    await page.goto('/about');
    expect(page.url()).toContain('/en/about');
  });

  test('/is/about redirects to /is/um', async ({ page }) => {
    await page.goto('/is/about');
    expect(page.url()).toContain('/is/um');
  });
});
