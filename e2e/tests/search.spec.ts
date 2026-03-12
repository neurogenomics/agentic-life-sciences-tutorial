/**
 * search.spec.ts
 *
 * Tests the Lunr.js client-side search modal:
 *  - Search input is visible (after opening the modal)
 *  - Typing "setup" returns results
 *  - Gibberish shows the no-results message
 *  - The "/" keyboard shortcut opens the modal
 *  - Clicking a result navigates to that page
 *  - Escape closes the modal
 */

import { test, expect } from '@playwright/test';
import { FIRST_TUTORIAL } from '../helpers/pages';

// Helper: open the search modal via the header button.
async function openSearchModal(page: import('@playwright/test').Page) {
  const searchBtn = page.locator('button[aria-label="Search"]');
  await expect(searchBtn).toBeVisible();
  await searchBtn.click();

  const modal = page.locator('#search-modal');
  await expect(modal).toBeVisible();
  return modal;
}

// Helper: type a query and wait for results to settle (debounce is 200ms).
async function typeQuery(page: import('@playwright/test').Page, query: string) {
  const input = page.locator('#search-input');
  await input.fill(query);
  // Wait past the 200ms debounce.
  await page.waitForTimeout(350);
}

// ---------------------------------------------------------------------------

test('search button is visible in the header', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  const searchBtn = page.locator('button[aria-label="Search"]');
  await expect(searchBtn).toBeVisible();
});

test('clicking search button opens the modal', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);

  const input = page.locator('#search-input');
  await expect(input).toBeFocused();
});

test('search input is accessible inside modal', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);

  const input = page.locator('#search-input');
  await expect(input).toBeVisible();
  await expect(input).toHaveAttribute('aria-label', 'Search tutorials');
});

test('typing "setup" returns at least one result', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);
  await typeQuery(page, 'setup');

  const results = page.locator('[data-testid="search-result"]');
  await expect(results.first()).toBeVisible({ timeout: 5_000 });
  const count = await results.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('no-results message shown for gibberish query', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);
  await typeQuery(page, 'xyzzy_not_a_real_term_12345');

  const noResults = page.locator('[data-testid="search-no-results"]');
  await expect(noResults).toBeVisible({ timeout: 5_000 });
});

test('"/" keyboard shortcut opens search modal', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await page.waitForLoadState('networkidle');

  // Ensure no input is focused before pressing /.
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur?.();
  });

  await page.keyboard.press('/');

  const modal = page.locator('#search-modal');
  await expect(modal).toBeVisible({ timeout: 3_000 });
});

test('Escape key closes the search modal', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);

  await page.keyboard.press('Escape');

  const modal = page.locator('#search-modal');
  await expect(modal).not.toHaveClass(/is-open/);
});

test('clicking a search result navigates to that page', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);
  await typeQuery(page, 'setup');

  const firstResult = page.locator('[data-testid="search-result"]').first();
  await expect(firstResult).toBeVisible({ timeout: 5_000 });

  const resultHref = await firstResult.getAttribute('href');
  expect(resultHref).toBeTruthy();

  // Click the result and wait for navigation.
  await Promise.all([
    page.waitForURL((url) => url.pathname.includes('tutorial') || url.pathname === '/'),
    firstResult.click(),
  ]);

  // Modal should close after navigation.
  const modal = page.locator('#search-modal');
  await expect(modal).not.toHaveClass(/is-open/);
});

test('search results are keyboard navigable with ArrowDown/Up', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);
  await typeQuery(page, 'setup');

  const firstResult = page.locator('[data-testid="search-result"]').first();
  await expect(firstResult).toBeVisible({ timeout: 5_000 });

  // Arrow down to highlight the first result.
  await page.keyboard.press('ArrowDown');
  await expect(firstResult).toHaveClass(/is-active/);

  // Arrow down again (if multiple results exist).
  await page.keyboard.press('ArrowDown');
  const secondResult = page.locator('[data-testid="search-result"]').nth(1);
  const secondCount = await page.locator('[data-testid="search-result"]').count();
  if (secondCount > 1) {
    await expect(secondResult).toHaveClass(/is-active/);
  }

  // Arrow up should go back.
  await page.keyboard.press('ArrowUp');
  await expect(firstResult).toHaveClass(/is-active/);
});

test('search results list has correct ARIA attributes', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await openSearchModal(page);

  const resultsContainer = page.locator('#search-results');
  await expect(resultsContainer).toHaveAttribute('role', 'listbox');
  await expect(resultsContainer).toHaveAttribute('aria-label', 'Search results');
});
