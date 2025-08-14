import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  
  // Using '/' for testing.
  await page.goto('/');

  // Expect a title.
  await expect(page).toHaveTitle('World of Kothis');

});

test.afterEach(async ({ page }) => {

  // Close out the page
  await page.close();

});

test('is home page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'Home', exact: true }).click();

  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#home');

});

test('is characters page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'Characters', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#characters');

});

test('is campaigns page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'Campaigns', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#campaigns');

});

test('is notebook page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'Notebook', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#notebook');

});

test('is world page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'World', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#world');

});

test('is lore page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'Lore', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#lore');

});

test('is homebrew page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'Homebrew', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('#homebrew');

});