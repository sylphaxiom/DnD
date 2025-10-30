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
  await page.getByRole('tab', { name: 'home', exact: true }).click();

  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/');
  await expect(page.getByRole("heading", {name: 'What is Kothis?'})).toContainText('What is Kothis?')

});

test('is characters page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'character', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/character');
  await expect(page.getByRole("heading", {name: 'Character'})).toContainText(/Character/)

});

test('is campaigns page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'campaign', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/campaign');
  await expect(page.getByRole("heading", {name: 'Campaign'})).toContainText(/Campaign/)

});

test('is notebook page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'notebook', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/notebook');
  await expect(page.getByRole("heading", {name: 'Notebook'})).toContainText(/Notebook/)

});

test('is world page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'world', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/world');
  await expect(page.getByRole("heading", {name: 'World'})).toContainText(/World/)

});

test('is lore page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'lore', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/lore');
  await expect(page.getByRole("heading", {name: 'Lore'})).toContainText(/Lore/)

});

test('is homebrew page', async ({ page }) => {
  
  // Click nav tab 
  await page.getByRole('tab', { name: 'homebrew', exact: true }).click();
  
  // Expect url to become the set page. Additional tests to follow.
  await expect(page).toHaveURL('/homebrew');
  await expect(page.getByRole("heading", {name: 'Homebrew'})).toContainText(/Homebrew/)

});

test('announcements works', async({page}) => {
  
  // Click Announcements icon
  await page.getByRole('button', { name: 'announcements' }).click()

  let ann0 = page.getByRole('button', { name: 'J New Date Thu Aug 14' })
  let ann1 = page.getByRole('button', { name: 'T Get Ready Tue Aug 12' })
  let ann2 = page.getByRole('button', { name: 'J Next Session Mon Aug 11' })
  let ann3 = page.getByRole('button', { name: 'J New Player Thu Jul 03' })

  // none open by default
  await expect(ann0).toHaveAttribute("aria-expanded", "false")
  await expect(ann1).toHaveAttribute("aria-expanded", "false")
  await expect(ann2).toHaveAttribute("aria-expanded", "false")
  await expect(ann3).toHaveAttribute("aria-expanded", "false")

  await ann0.click()
  await expect(ann0).toHaveAttribute("aria-expanded", "true")
  await expect(ann1).toHaveAttribute("aria-expanded", "false")
  await expect(ann2).toHaveAttribute("aria-expanded", "false")
  await expect(ann3).toHaveAttribute("aria-expanded", "false")
  
  await ann1.click()
  await expect(ann0).toHaveAttribute("aria-expanded", "false")
  await expect(ann1).toHaveAttribute("aria-expanded", "true")
  await expect(ann2).toHaveAttribute("aria-expanded", "false")
  await expect(ann3).toHaveAttribute("aria-expanded", "false")
  
  await ann2.click()
  await expect(ann0).toHaveAttribute("aria-expanded", "false")
  await expect(ann1).toHaveAttribute("aria-expanded", "false")
  await expect(ann2).toHaveAttribute("aria-expanded", "true")
  await expect(ann3).toHaveAttribute("aria-expanded", "false")

  await ann3.click()
  await expect(ann0).toHaveAttribute("aria-expanded", "false")
  await expect(ann1).toHaveAttribute("aria-expanded", "false")
  await expect(ann2).toHaveAttribute("aria-expanded", "false")
  await expect(ann3).toHaveAttribute("aria-expanded", "true")

});