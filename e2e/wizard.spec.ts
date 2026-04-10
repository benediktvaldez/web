import { test, expect } from '@playwright/test';

test.describe('contact wizard', () => {
  test('renders and navigates through steps', async ({ page }) => {
    await page.goto('/en/lets-go');

    // Step 1: select project type
    await expect(page.getByRole('heading')).toContainText('What are you looking for');
    await page.getByText('Build a new product').click();

    // Step 2: details (skip)
    await expect(page.getByRole('heading')).toContainText('Tell me a bit more');
    await page.getByText("I'd rather just talk").click();

    // Step 3: timeline
    await expect(page.getByRole('heading')).toContainText('timeline');
    await page.getByText('Just exploring').click();

    // Step 4: contact info
    await expect(page.getByRole('heading')).toContainText('How should I reach you');
    await page.getByPlaceholder('Name').fill('Test User');
    await page.getByPlaceholder('Email').fill('test@example.com');
  });

  test('shows validation error for invalid email', async ({ page }) => {
    await page.goto('/en/lets-go');

    // Navigate to step 4
    await page.getByText('Build a new product').click();
    await page.getByText("I'd rather just talk").click();
    await page.getByText('Just exploring').click();

    // Fill name but invalid email
    await page.getByPlaceholder('Name').fill('Test');
    await page.getByPlaceholder('Email').fill('not-valid');
    await page.getByText('Send it').click();

    // Should show validation error
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('back navigation works', async ({ page }) => {
    await page.goto('/en/lets-go');

    await page.getByText('Build a new product').click();
    await expect(page.getByRole('heading')).toContainText('Tell me a bit more');

    await page.getByText('Back').click();
    await expect(page.getByRole('heading')).toContainText('What are you looking for');
  });

  test('dismiss link navigates back to site', async ({ page }) => {
    await page.goto('/en/lets-go');
    await page.getByText('Just browsing').click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test('icelandic wizard renders', async ({ page }) => {
    await page.goto('/is/byrjum');
    await expect(page.getByRole('heading')).toContainText('Hvað ertu að leita að');
  });

  test('progress dots update on navigation', async ({ page }) => {
    await page.goto('/en/lets-go');

    // Count active dots - should be 1 on step 0
    const activeDots = page.locator('[class*="dotActive"]');
    await expect(activeDots).toHaveCount(1);

    // Click an option to advance
    await page.getByText('Technical consultation').click();

    // Should now have 2 active dots
    await expect(activeDots).toHaveCount(2);
  });
});
