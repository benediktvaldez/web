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

    // Fill name but invalid email, then blur to trigger validation
    await page.getByPlaceholder('Name').fill('Test');
    await page.getByPlaceholder('Email').fill('not-valid');
    await page.getByPlaceholder('Email').blur();

    // Inline error appears and submit stays disabled
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send it' })).toBeDisabled();
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
    await expect(page.getByRole('heading')).toContainText('Hverju ertu að leita að');
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

  test('emits umami events as the user steps through', async ({ page }) => {
    // Stub window.umami before any page script runs so the wrapper records calls
    // even when NEXT_PUBLIC_UMAMI_WEBSITE_ID is unset in CI.
    await page.addInitScript(() => {
      const calls: Array<{ event: string; props: Record<string, string> }> = [];
      (window as unknown as { __umamiCalls: typeof calls }).__umamiCalls = calls;
      (window as unknown as { umami: unknown }).umami = {
        track: (event: string, props: Record<string, string>) => calls.push({ event, props }),
      };
    });

    await page.goto('/en/lets-go');
    await page.getByText('Build a new product').click();
    await page.getByText("I'd rather just talk").click();
    await page.getByText('Just exploring').click();

    const calls = await page.evaluate(
      () =>
        (
          window as unknown as {
            __umamiCalls: Array<{ event: string; props: Record<string, string> }>;
          }
        ).__umamiCalls,
    );

    const wizardSteps = calls.filter((c) => c.event === 'wizard_step');
    expect(wizardSteps.length).toBeGreaterThanOrEqual(2);

    // First beacon (mount) is the 'type' step in English
    expect(wizardSteps[0].props).toMatchObject({ step: 'type', locale: 'en' });

    // Stepping through advances to 'contact' eventually
    const stepNames = wizardSteps.map((c) => c.props.step);
    expect(stepNames).toContain('contact');

    // PII never leaks into events
    for (const c of calls) {
      for (const key of ['name', 'email', 'company', 'details']) {
        expect(c.props).not.toHaveProperty(key);
      }
    }
  });
});
