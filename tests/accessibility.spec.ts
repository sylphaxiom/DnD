import AxeBuilder from '@axe-core/playwright'; // 1
import { expect, test } from '@playwright/test';

// If you add new pages, make sure they are added to the list below.
[
  '/',
  '/character',
  '/campaign',
  '/world',
  '/world/herzog', 
  '/world/herzog/grummond', 
  '/world/herzog/durinhast', 
  '/world/herzog/breitdecke', 
  '/world/herzog/hukschtein', 
  '/world/draconia', 
  '/world/draconia/pyrus', 
  '/world/dramir', 
  '/world/elandir', 
  '/world/elandir/taishta', 
  '/world/elandir/valeus', 
  '/world/faena', 
  '/world/faena/wither', 
  '/world/faena/lythe', 
  '/world/praeator', 
  '/world/praeator/seagate', 
  '/world/praeator/promisory', 
  '/world/praeator/halfhall', 
  '/world/praeator/schism',
  '/world/rokesh', 
  '/world/rokesh/makdur', 
  '/world/wildlands', 
  '/world/wildlands/pon', 
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
