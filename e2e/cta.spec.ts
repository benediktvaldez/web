import { test, expect } from '@playwright/test';

test.describe('CTA visibility', () => {
  test('nav has CTA link on inner pages', async ({ page }) => {
    await page.goto('/en/about');
    const navCta = page.getByRole('navigation', { name: 'Main' }).getByText('Work with me');
    await expect(navCta).toBeVisible();
  });

  test('landing page has CTA below social icons', async ({ page }) => {
    await page.goto('/en');
    await page.waitForTimeout(600);
    const cta = page.getByText('Work with me');
    await expect(cta).toBeVisible();
  });

  test('inner pages have CTA at bottom', async ({ page }) => {
    await page.goto('/en/projects');
    await page.waitForTimeout(600);
    // Should have a CTA link at the bottom (one of the random options)
    const ctaLink = page.locator('[data-print-hide] a[href*="lets-go"]');
    await expect(ctaLink).toBeVisible();
  });

  test('CTA links to wizard page', async ({ page }) => {
    await page.goto('/en/about');
    const navCta = page.getByRole('navigation', { name: 'Main' }).getByText('Work with me');
    await navCta.click();
    await expect(page).toHaveURL(/\/en\/lets-go/);
  });

  test('icelandic nav CTA works', async ({ page }) => {
    await page.goto('/is/verkefni');
    const navCta = page.getByRole('navigation', { name: 'Main' }).getByText('Vinnum saman');
    await expect(navCta).toBeVisible();
    await navCta.click();
    await expect(page).toHaveURL(/\/is\/byrjum/);
  });
});
