import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { path: '/en', name: 'Home (EN)' },
  { path: '/is', name: 'Home (IS)' },
  { path: '/en/about', name: 'About (EN)' },
  { path: '/is/hver-er-eg', name: 'About (IS)' },
  { path: '/en/projects', name: 'Projects (EN)' },
  { path: '/is/verkefni', name: 'Projects (IS)' },
  { path: '/en/thoughts', name: 'Thoughts (EN)' },
  { path: '/is/hugleidingar', name: 'Thoughts (IS)' },
  { path: '/en/resume', name: 'Resume (EN)' },
  { path: '/is/ferilskra', name: 'Resume (IS)' },
  { path: '/en/lets-go', name: 'Wizard (EN)' },
  { path: '/is/byrjum', name: 'Wizard (IS)' },
];

for (const { path, name } of pages) {
  test(`${name} has no a11y violations`, async ({ page }) => {
    await page.goto(path);
    // Wait for animations to complete so axe sees final state
    await page.waitForTimeout(600);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
