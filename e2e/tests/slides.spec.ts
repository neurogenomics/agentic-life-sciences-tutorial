/**
 * slides.spec.ts
 *
 * Tests for the Reveal.js slide decks at /slides/*:
 *  - Reveal.js root element is present
 *  - Multiple <section> slides are rendered
 *  - Arrow key (right) advances to the next slide
 *  - "Back to tutorial" link is present and points to the correct tutorial
 *  - Slide button on tutorial pages links to the corresponding deck
 */

import { test, expect } from '@playwright/test';
import { FIRST_SLIDE_DECK, FIRST_TUTORIAL, SLIDE_PAGES } from '../helpers/pages';

// ---------------------------------------------------------------------------
// Reveal.js initialisation
// ---------------------------------------------------------------------------

test('Reveal.js container is present on slide page', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);
  await page.waitForLoadState('networkidle');

  const reveal = page.locator('.reveal');
  await expect(reveal).toBeVisible();
});

test('slide deck has multiple <section> elements', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);
  await page.waitForLoadState('networkidle');

  const sections = page.locator('.reveal .slides > section');
  const count = await sections.count();
  expect(count).toBeGreaterThanOrEqual(2);
});

// ---------------------------------------------------------------------------
// Slide navigation via keyboard
// ---------------------------------------------------------------------------

test('pressing ArrowRight advances to the next slide', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);
  await page.waitForLoadState('networkidle');

  // Wait for Reveal.js to initialise (it adds .present to the active slide).
  await page.waitForSelector('.reveal .slides section.present', { timeout: 10_000 });

  // Record the index attribute of the currently active slide.
  const getActiveIndex = () =>
    page.evaluate(() => {
      const present = document.querySelector('.reveal .slides section.present');
      return present?.getAttribute('data-index-h') ?? present?.getAttribute('data-id') ?? null;
    });

  const before = await getActiveIndex();

  // Click the reveal container first so it captures keyboard events.
  await page.locator('.reveal').click();
  await page.keyboard.press('ArrowRight');

  // Give Reveal.js time to transition.
  await page.waitForTimeout(600);

  const after = await getActiveIndex();

  // The slide should have changed — if both are null the test is inconclusive.
  if (before !== null && after !== null) {
    expect(after).not.toBe(before);
  } else {
    // Fallback: check that the second section is now .present.
    const secondPresent = page.locator('.reveal .slides > section:nth-child(2).present');
    await expect(secondPresent).toBeVisible({ timeout: 3_000 });
  }
});

test('pressing ArrowLeft on the second slide returns to the first', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);
  await page.waitForLoadState('networkidle');

  await page.waitForSelector('.reveal .slides section.present', { timeout: 10_000 });

  // Advance one slide.
  await page.locator('.reveal').click();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600);

  // Go back.
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(600);

  // The first section should be active again.
  const firstSection = page.locator('.reveal .slides > section').first();
  await expect(firstSection).toHaveClass(/present/);
});

// ---------------------------------------------------------------------------
// Back-to-tutorial link
// ---------------------------------------------------------------------------

test('"Back to tutorial" link is present and visible', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);

  const backLink = page.locator('[data-testid="back-to-tutorial"]');
  await expect(backLink).toBeVisible();
  await expect(backLink).toContainText('Back to tutorial');
});

test('"Back to tutorial" link navigates to a tutorial page', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);

  const backLink = page.locator('[data-testid="back-to-tutorial"]');
  const href = await backLink.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href).toMatch(/\/tutorials\//);
});

test('clicking "Back to tutorial" leaves the slides layout', async ({ page }) => {
  await page.goto(FIRST_SLIDE_DECK);

  const backLink = page.locator('[data-testid="back-to-tutorial"]');
  await backLink.click();

  // After navigation we should no longer be on a /slides/ URL.
  await page.waitForURL((url) => !url.pathname.startsWith('/slides/'));

  // And the docs layout should be present.
  await expect(page.locator('.docs-layout')).toBeVisible();
});

// ---------------------------------------------------------------------------
// Slide button on tutorial pages
// ---------------------------------------------------------------------------

test('slide button is present on tutorial pages', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const slideBtn = page.locator('[data-testid="slide-button"]');
  await expect(slideBtn).toBeVisible();
});

test('slide button href points to the corresponding /slides/ URL', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const slideBtn = page.locator('[data-testid="slide-button"]');
  const href = await slideBtn.getAttribute('href');
  expect(href).toBeTruthy();
  expect(href).toMatch(/^\/slides\//);
});

// ---------------------------------------------------------------------------
// All slide pages render without errors
// ---------------------------------------------------------------------------

for (const url of SLIDE_PAGES) {
  test(`slide deck renders without JS errors: ${url}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(url);
    await page.waitForLoadState('networkidle');

    expect(errors, `JS errors on ${url}:\n${errors.join('\n')}`).toHaveLength(0);

    const reveal = page.locator('.reveal');
    await expect(reveal).toBeVisible();
  });
}
