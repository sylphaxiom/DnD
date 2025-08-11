import { test, expect } from '@playwright/test';

test.afterEach(async ({ page}) => {
  await page.close();
});

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('World of Kothis');
});
