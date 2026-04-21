import AxeBuilder from '@axe-core/playwright'; // 1
import { expect, test } from '@playwright/test';

[
  '/',
  '/character',
  '/campaign',
  '/world',
  '/world/herzog', 
  '/world/draconia', 
  '/world/dramir', 
  '/world/elandir', 
  '/world/faena', 
  '/world/praeator', 
  '/world/rokesh', 
  '/world/wildlands', 
  '/world/rokesh/makdur', 
  '/world/wildlands/pon', 
  '/world/herzog/grummond', 
  '/world/herzog/durinhast', 
  '/world/herzog/breitdecke', 
  '/world/herzog/hukschtein', 
  '/world/draconia/pyrus', 
  '/world/elandir/taishta', 
  '/world/elandir/valeus', 
  '/world/faena/wither', 
  '/world/faena/lythe', 
  '/world/praeator/seagate', 
  '/world/praeator/promisory', 
  '/world/praeator/halfhall', 
  '/world/praeator/schism',
  '/homebrew',
  '/notebook',
].forEach((pg)=>{
  test.describe(`${pg} accessibility`, () => { // 2
    test(`${pg} should not have any automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(pg); // 3

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

      expect(accessibilityScanResults.violations).toEqual([]); // 5
    });
  });
})
