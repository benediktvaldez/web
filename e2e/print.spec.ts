import { test, expect } from '@playwright/test';

test.describe('print styles', () => {
  test('resume hides nav and print-hide elements in print', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Print tested on desktop only');
    await page.goto('/en/resume');
    await page.emulateMedia({ media: 'print' });

    const aside = page.locator('aside');
    await expect(aside).toBeHidden();

    const printHidden = page.locator('[data-print-hide]').first();
    await expect(printHidden).toBeHidden();
  });

  test('resume shows tech stack labels in print', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Print tested on desktop only');
    await page.goto('/en/resume');

    const techList = page.locator('[data-print-label]').first();
    const label = await techList.getAttribute('data-print-label');
    expect(label).toBe('Tech stack:');
  });

  test('icelandic resume has icelandic tech stack label', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Print tested on desktop only');
    await page.goto('/is/ferilskra');

    const techList = page.locator('[data-print-label]').first();
    const label = await techList.getAttribute('data-print-label');
    expect(label).toBe('Tæknistakkur:');
  });
});
