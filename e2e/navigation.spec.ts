import { test, expect } from '@playwright/test';

test.describe('site navigation', () => {
  test('nav links navigate to correct pages', async ({ page }) => {
    await page.goto('/en/about');

    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/en\/projects/);

    await page.getByRole('link', { name: 'Thoughts' }).click();
    await expect(page).toHaveURL(/\/en\/thoughts/);
  });

  test('name link navigates to home (desktop)', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Name is hidden on mobile');
    await page.goto('/en/about');
    await page.click('text=Benedikt D. Valdez');
    await expect(page).toHaveURL(/\/en$/);
  });
});

test.describe('language switcher', () => {
  test('switches from EN to IS on about page', async ({ page }) => {
    await page.goto('/en/about');
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/is\/hver-er-eg/);
  });

  test('switches from IS to EN on about page', async ({ page }) => {
    await page.goto('/is/hver-er-eg');
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/en\/about/);
  });

  test('switches locale on home page', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/is$/);
  });
});
