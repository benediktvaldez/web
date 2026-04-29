import { test, expect } from '@playwright/test';

test.describe('site navigation', () => {
  test('nav links navigate to correct pages', async ({ page, isMobile }) => {
    await page.goto('/en/who-i-am');

    if (isMobile) {
      await page.getByLabel('Open menu').click();
    }

    await page.getByRole('link', { name: 'Projects' }).first().click();
    await expect(page).toHaveURL(/\/en\/projects/);

    if (isMobile) {
      await page.getByLabel('Open menu').click();
    }

    await page.getByRole('link', { name: 'Writing' }).first().click();
    await expect(page).toHaveURL(/\/en\/writing/);
  });

  test('name link navigates to home (desktop)', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'Name is hidden on mobile');
    await page.goto('/en/who-i-am');
    await page.click('text=Benedikt D. Valdez');
    await expect(page).toHaveURL(/\/en$/);
  });
});

test.describe('language switcher', () => {
  test('switches from EN to IS on about page', async ({ page, isMobile }) => {
    await page.goto('/en/who-i-am');

    if (isMobile) {
      await page.getByLabel('Open menu').click();
    }

    await page.getByRole('navigation', { name: 'Language' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/is\/hver-eg-er/);
  });

  test('switches from IS to EN on about page', async ({ page, isMobile }) => {
    await page.goto('/is/hver-eg-er');

    if (isMobile) {
      await page.getByLabel('Open menu').click();
    }

    await page.getByRole('navigation', { name: 'Language' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/en\/who-i-am/);
  });

  test('switches locale on home page', async ({ page }) => {
    // Home page has LanguageSwitcher visible without hamburger
    await page.goto('/en');
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link').first().click();
    await expect(page).toHaveURL(/\/is$/);
  });
});
