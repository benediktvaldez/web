import { test, expect } from '@playwright/test';

test.describe('route rendering', () => {
  const enPages = [
    '/en',
    '/en/who-i-am',
    '/en/projects',
    '/en/writing',
    '/en/resume',
    '/en/lets-go',
  ];
  const isPages = [
    '/is',
    '/is/hver-eg-er',
    '/is/verkefni',
    '/is/skrif',
    '/is/ferilskra',
    '/is/byrjum',
  ];

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

  test('/en/writing/award-winning-ux-at-form5 renders', async ({ page }) => {
    const response = await page.goto('/en/writing/award-winning-ux-at-form5');
    expect(response?.status()).toBe(200);
  });
});

test.describe('middleware redirects', () => {
  test('/ redirects to /en', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain('/en');
  });

  test('/who-i-am redirects to /en/who-i-am', async ({ page }) => {
    await page.goto('/who-i-am');
    expect(page.url()).toContain('/en/who-i-am');
  });

  test('/is/who-i-am redirects to /is/hver-eg-er', async ({ page }) => {
    await page.goto('/is/who-i-am');
    expect(page.url()).toContain('/is/hver-eg-er');
  });
});
