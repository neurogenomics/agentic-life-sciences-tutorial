/**
 * navigation.spec.ts
 *
 * Verifies structural and interactive navigation components:
 *  - Sidebar contains all tutorial links from the navigation data
 *  - Current page is highlighted in the sidebar
 *  - Prev / next links work and carry the correct test-ids
 *  - Breadcrumbs render correctly
 *  - TOC anchor links scroll to the right heading
 */

import { test, expect } from '@playwright/test';
import {
  FIRST_TUTORIAL,
  MID_TUTORIAL,
  LAST_TUTORIAL,
  TUTORIAL_PAGES,
} from '../helpers/pages';

// All nav titles as they appear in _data/navigation.yml.
const ALL_NAV_TITLES = [
  'Setup',
  'GitHub Education',
  'Penguins Dataset Analysis',
  'Journal Club Slides',
  'Single Cell Portal',
  'Managing Context',
  'Agent Package Manager',
];

// ---------------------------------------------------------------------------
// Sidebar — link inventory
// ---------------------------------------------------------------------------

test('sidebar contains all tutorial links', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const sidebar = page.locator('aside.sidebar');
  await expect(sidebar).toBeVisible();

  for (const title of ALL_NAV_TITLES) {
    const link = sidebar.locator(`a:has-text("${title}")`);
    await expect(link, `Missing sidebar link: "${title}"`).toBeVisible();
  }
});

test('sidebar links all have valid href attributes', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const links = page.locator('aside.sidebar a.sidebar-nav-link');
  const count = await links.count();
  expect(count).toBeGreaterThanOrEqual(ALL_NAV_TITLES.length);

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    expect(href, `Sidebar link ${i} has no href`).toBeTruthy();
    expect(href).toMatch(/^\//); // must be an absolute path
  }
});

// ---------------------------------------------------------------------------
// Sidebar — current-page highlighting
// ---------------------------------------------------------------------------

for (const url of TUTORIAL_PAGES) {
  test(`sidebar highlights current page: ${url}`, async ({ page }) => {
    await page.goto(url);

    const sidebar = page.locator('aside.sidebar');
    const currentLink = sidebar.locator('[aria-current="page"]');

    await expect(currentLink, `No aria-current="page" in sidebar on ${url}`).toBeVisible();

    // The highlighted link's href must match the current URL path.
    const href = await currentLink.getAttribute('href');
    expect(href).toContain(url.replace(/\/$/, ''));
  });
}

// ---------------------------------------------------------------------------
// Prev / Next navigation
// ---------------------------------------------------------------------------

test('first tutorial has no prev link', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const prevLink = page.locator('[data-testid="prev-link"]');
  await expect(prevLink).toHaveCount(0);
});

test('last tutorial has no next link', async ({ page }) => {
  await page.goto(LAST_TUTORIAL);

  const nextLink = page.locator('[data-testid="next-link"]');
  await expect(nextLink).toHaveCount(0);
});

test('mid tutorial has both prev and next links', async ({ page }) => {
  await page.goto(MID_TUTORIAL);

  await expect(page.locator('[data-testid="prev-link"]')).toBeVisible();
  await expect(page.locator('[data-testid="next-link"]')).toBeVisible();
});

test('clicking next link navigates to the next tutorial', async ({ page }) => {
  await page.goto(MID_TUTORIAL);

  const nextLink = page.locator('[data-testid="next-link"]');
  const nextHref = await nextLink.getAttribute('href');
  expect(nextHref).toBeTruthy();

  await nextLink.click();
  await page.waitForURL((url) => url.pathname !== MID_TUTORIAL);

  // After navigation the prev link on the new page should exist and point back.
  const prevLink = page.locator('[data-testid="prev-link"]');
  await expect(prevLink).toBeVisible();
  const prevHref = await prevLink.getAttribute('href');
  expect(prevHref).toContain(MID_TUTORIAL);
});

test('clicking prev link navigates back to the previous tutorial', async ({ page }) => {
  await page.goto(MID_TUTORIAL);

  const prevLink = page.locator('[data-testid="prev-link"]');
  const prevHref = await prevLink.getAttribute('href');
  expect(prevHref).toBeTruthy();

  await prevLink.click();
  await page.waitForURL((url) => url.pathname !== MID_TUTORIAL);

  const newNextLink = page.locator('[data-testid="next-link"]');
  await expect(newNextLink).toBeVisible();
});

// ---------------------------------------------------------------------------
// Breadcrumbs
// ---------------------------------------------------------------------------

test('breadcrumbs are present on tutorial pages', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const breadcrumbs = page.locator('[data-testid="breadcrumbs"]');
  await expect(breadcrumbs).toBeVisible();
});

test('breadcrumbs first item links to home', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const homeLink = page.locator('[data-testid="breadcrumbs"] a').first();
  await expect(homeLink).toContainText('Home');

  const href = await homeLink.getAttribute('href');
  expect(href).toBe('/');
});

test('breadcrumbs show section and page title', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const breadcrumbs = page.locator('[data-testid="breadcrumbs"]');
  // Should contain the section title "Getting Started"
  await expect(breadcrumbs).toContainText('Getting Started');
  // Should contain the page title
  await expect(breadcrumbs).toContainText('Getting Started with AI Coding Tools');
});

test('breadcrumbs current page has aria-current="page"', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const currentCrumb = page.locator('[data-testid="breadcrumbs"] [aria-current="page"]');
  await expect(currentCrumb).toBeVisible();
});

// ---------------------------------------------------------------------------
// Table of Contents — anchor scroll
// ---------------------------------------------------------------------------

test('TOC is present and contains links on a tutorial page', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const toc = page.locator('aside.toc-sidebar');
  // TOC may be hidden on narrow viewports; check on desktop width.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.reload();

  await expect(toc).toBeVisible();

  const tocLinks = toc.locator('a[href^="#"]');
  const count = await tocLinks.count();
  // Only check if the page actually has headings that generate TOC entries.
  if (count > 0) {
    // Clicking a TOC link should scroll to the corresponding heading.
    const firstLink = tocLinks.first();
    const targetId = (await firstLink.getAttribute('href'))?.replace('#', '');
    expect(targetId).toBeTruthy();

    await firstLink.click();

    const targetHeading = page.locator(`#${targetId}`);
    await expect(targetHeading).toBeInViewport();
  }
});
