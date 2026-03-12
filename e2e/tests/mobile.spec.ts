/**
 * mobile.spec.ts
 *
 * Responsive / mobile behaviour:
 *  - Sidebar is off-canvas (visually hidden) on mobile viewports
 *  - Hamburger button is visible on mobile
 *  - Tapping the hamburger opens the sidebar
 *  - Tapping the overlay (or pressing Escape) closes the sidebar
 *  - No horizontal scroll on any page
 *  - Images scale to fit their container (no overflow)
 */

import { test, expect } from '@playwright/test';
import { FIRST_TUTORIAL, ALL_PAGES } from '../helpers/pages';
import { MOBILE, DESKTOP, SIDEBAR_BREAKPOINT } from '../helpers/breakpoints';

// ---------------------------------------------------------------------------
// Sidebar visibility
// ---------------------------------------------------------------------------

test('sidebar is off-canvas on mobile viewport', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(FIRST_TUTORIAL);

  // On mobile the sidebar is translated off-screen via transform; it is
  // technically in the DOM but should not be within the visible viewport.
  const sidebar = page.locator('aside.sidebar');
  await expect(sidebar).toBeAttached();

  // The sidebar should NOT be in the viewport when closed.
  await expect(sidebar).not.toBeInViewport();
});

test('sidebar is visible on desktop viewport', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto(FIRST_TUTORIAL);

  const sidebar = page.locator('aside.sidebar');
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toBeInViewport();
});

// ---------------------------------------------------------------------------
// Hamburger button
// ---------------------------------------------------------------------------

test('hamburger button is visible on mobile', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(FIRST_TUTORIAL);

  const hamburger = page.locator('button[aria-label="Open navigation"]');
  await expect(hamburger).toBeVisible();
});

test('hamburger button is hidden on desktop', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto(FIRST_TUTORIAL);

  const hamburger = page.locator('.btn-hamburger');
  // On desktop the CSS hides it via display:none.
  await expect(hamburger).toBeHidden();
});

// ---------------------------------------------------------------------------
// Hamburger toggle — open / close
// ---------------------------------------------------------------------------

test('tapping hamburger opens the sidebar', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(FIRST_TUTORIAL);

  const hamburger = page.locator('button[aria-label="Open navigation"]');
  const sidebar = page.locator('aside.sidebar');

  await hamburger.click();

  // Sidebar should now have the is-open class and be visible in the viewport.
  await expect(sidebar).toHaveClass(/is-open/);
  await expect(sidebar).toBeInViewport();
  await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
});

test('tapping the overlay closes the sidebar', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(FIRST_TUTORIAL);

  const hamburger = page.locator('button[aria-label="Open navigation"]');
  await hamburger.click();

  const sidebar = page.locator('aside.sidebar');
  await expect(sidebar).toHaveClass(/is-open/);

  // Click the overlay backdrop (the semi-transparent element behind the sidebar).
  const overlay = page.locator('#sidebar-overlay');
  await overlay.click();

  await expect(sidebar).not.toHaveClass(/is-open/);
  await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
});

test('pressing Escape closes the sidebar', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(FIRST_TUTORIAL);

  const hamburger = page.locator('button[aria-label="Open navigation"]');
  await hamburger.click();

  const sidebar = page.locator('aside.sidebar');
  await expect(sidebar).toHaveClass(/is-open/);

  await page.keyboard.press('Escape');

  await expect(sidebar).not.toHaveClass(/is-open/);
});

// ---------------------------------------------------------------------------
// No horizontal overflow
// ---------------------------------------------------------------------------

for (const url of ALL_PAGES) {
  test(`no horizontal scroll on mobile: ${url}`, async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(
      hasHorizontalScroll,
      `Horizontal overflow detected on ${url} at ${MOBILE.width}px width`
    ).toBe(false);
  });
}

// ---------------------------------------------------------------------------
// Responsive images
// ---------------------------------------------------------------------------

test('images do not overflow their container on mobile', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(FIRST_TUTORIAL);
  await page.waitForLoadState('networkidle');

  const overflowingImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter((img) => {
        const parent = img.parentElement;
        if (!parent) return false;
        return img.getBoundingClientRect().width > parent.getBoundingClientRect().width + 1;
      })
      .map((img) => img.src);
  });

  expect(
    overflowingImages,
    `Images overflowing their containers:\n${overflowingImages.join('\n')}`
  ).toHaveLength(0);
});

// ---------------------------------------------------------------------------
// Viewport meta tag
// ---------------------------------------------------------------------------

test('pages include a responsive viewport meta tag', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const viewportContent = await page.evaluate(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    return meta?.getAttribute('content') ?? null;
  });

  expect(viewportContent).toBeTruthy();
  expect(viewportContent).toContain('width=device-width');
});
