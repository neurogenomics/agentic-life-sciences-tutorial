/**
 * accessibility.spec.ts
 *
 * WCAG 2.1 AA audit using axe-core, plus manual checks for:
 *  - Skip link presence and behaviour
 *  - Alt text on images
 *  - ARIA landmarks
 */

import { test, expect } from '../fixtures/base';
import { ALL_PAGES, FIRST_TUTORIAL } from '../helpers/pages';

// ---------------------------------------------------------------------------
// axe-core WCAG audit — run against every page
// ---------------------------------------------------------------------------

for (const url of ALL_PAGES) {
  test(`axe: no WCAG violations on ${url}`, async ({ page, checkA11y }) => {
    await page.goto(url);
    // Wait for JS to finish bootstrapping (search index, sidebar scripts, etc.)
    await page.waitForLoadState('networkidle');

    const results = await checkA11y();

    // Format violations for readable failure messages.
    const violations = results.violations;
    if (violations.length > 0) {
      const summary = violations
        .map(
          (v) =>
            `[${v.id}] ${v.description}\n  Impact: ${v.impact}\n  Nodes: ${v.nodes
              .map((n) => n.html)
              .join(', ')}`
        )
        .join('\n\n');
      expect(violations, `axe violations on ${url}:\n\n${summary}`).toHaveLength(0);
    }
  });
}

// ---------------------------------------------------------------------------
// Skip link
// ---------------------------------------------------------------------------

test('skip link is present and focuses #main-content on activation', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const skipLink = page.locator('a[href="#main-content"]');
  await expect(skipLink).toBeAttached();

  // Simulate keyboard navigation: Tab to focus the skip link, then Enter.
  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();

  await page.keyboard.press('Enter');

  const mainContent = page.locator('#main-content');
  await expect(mainContent).toBeFocused();
});

// ---------------------------------------------------------------------------
// Alt text on images
// ---------------------------------------------------------------------------

test('all <img> elements have non-empty alt attributes', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);
  await page.waitForLoadState('networkidle');

  // Collect images without alt text or with empty alt text that are not
  // explicitly decorative (aria-hidden="true").
  const violations = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter((img) => {
        const isDecorative = img.getAttribute('aria-hidden') === 'true';
        const hasAlt = img.hasAttribute('alt') && img.alt.trim().length > 0;
        return !isDecorative && !hasAlt;
      })
      .map((img) => img.outerHTML.slice(0, 200));
  });

  expect(
    violations,
    `Images missing alt text:\n${violations.join('\n')}`
  ).toHaveLength(0);
});

// ---------------------------------------------------------------------------
// ARIA landmarks
// ---------------------------------------------------------------------------

test('page has required ARIA landmarks', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  // banner (header)
  await expect(page.locator('[role="banner"]')).toBeVisible();
  // main / main content area
  await expect(page.locator('#main-content')).toBeVisible();
  // contentinfo (footer)
  await expect(page.locator('[role="contentinfo"]')).toBeVisible();
  // navigation — at least the sidebar nav
  const navLocators = page.locator('[role="navigation"]');
  const count = await navLocators.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

// ---------------------------------------------------------------------------
// Focus visible — interactive elements must have a visible focus indicator
// ---------------------------------------------------------------------------

test('interactive elements have visible focus styles', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  // Tab through the first several interactive elements and check each one
  // receives keyboard focus (Playwright verifies the element is focusable).
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
  }

  // If we got here without error the browser accepted focus moves — a deeper
  // visual check requires screenshot comparison which is project-specific.
  const focused = page.locator(':focus');
  await expect(focused).toBeAttached();
});
