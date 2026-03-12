/**
 * performance.spec.ts
 *
 * Lightweight performance budget checks using the Playwright network API and
 * Navigation Timing API. Does NOT require Lighthouse or a separate tool.
 *
 *  - Page load (DOMContentLoaded) < 3 seconds
 *  - No individual asset exceeds 500 KB (uncompressed response body)
 *  - Total page weight (sum of all responses) < 2 MB
 */

import { test, expect } from '@playwright/test';
import { FIRST_TUTORIAL, ALL_PAGES } from '../helpers/pages';

const BUDGET_PAGE_LOAD_MS = 3_000;
const BUDGET_SINGLE_ASSET_BYTES = 500 * 1024;   // 500 KB
const BUDGET_TOTAL_BYTES = 2 * 1024 * 1024;      // 2 MB

// ---------------------------------------------------------------------------
// Page load time
// ---------------------------------------------------------------------------

for (const url of ALL_PAGES) {
  test(`page load < ${BUDGET_PAGE_LOAD_MS}ms: ${url}`, async ({ page }) => {
    const start = Date.now();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;

    expect(
      elapsed,
      `${url} took ${elapsed}ms to DOMContentLoaded (budget: ${BUDGET_PAGE_LOAD_MS}ms)`
    ).toBeLessThan(BUDGET_PAGE_LOAD_MS);
  });
}

// ---------------------------------------------------------------------------
// Asset size budgets
// ---------------------------------------------------------------------------

test(`no single asset exceeds ${BUDGET_SINGLE_ASSET_BYTES / 1024}KB`, async ({ page }) => {
  const oversizedAssets: Array<{ url: string; size: number }> = [];

  page.on('response', async (response) => {
    // Only check successful responses for same-origin assets.
    if (!response.ok()) return;

    const resourceType = response.request().resourceType();
    if (!['document', 'script', 'stylesheet', 'image', 'font', 'other'].includes(resourceType)) {
      return;
    }

    try {
      const body = await response.body();
      if (body.length > BUDGET_SINGLE_ASSET_BYTES) {
        oversizedAssets.push({
          url: response.url(),
          size: body.length,
        });
      }
    } catch {
      // Some responses (e.g. streams) cannot be buffered — skip them.
    }
  });

  await page.goto(FIRST_TUTORIAL, { waitUntil: 'networkidle' });

  const summary = oversizedAssets
    .map((a) => `  ${(a.size / 1024).toFixed(1)}KB — ${a.url}`)
    .join('\n');

  expect(
    oversizedAssets,
    `Assets exceeding ${BUDGET_SINGLE_ASSET_BYTES / 1024}KB budget:\n${summary}`
  ).toHaveLength(0);
});

test(`total page weight < ${BUDGET_TOTAL_BYTES / (1024 * 1024)}MB`, async ({ page }) => {
  let totalBytes = 0;
  const assetList: Array<{ url: string; size: number }> = [];

  page.on('response', async (response) => {
    if (!response.ok()) return;

    try {
      const body = await response.body();
      totalBytes += body.length;
      assetList.push({ url: response.url(), size: body.length });
    } catch {
      // Skip unreadable responses.
    }
  });

  await page.goto(FIRST_TUTORIAL, { waitUntil: 'networkidle' });

  const topAssets = [...assetList]
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .map((a) => `  ${(a.size / 1024).toFixed(1)}KB — ${a.url}`)
    .join('\n');

  expect(
    totalBytes,
    `Total page weight ${(totalBytes / (1024 * 1024)).toFixed(2)}MB exceeds ` +
      `${BUDGET_TOTAL_BYTES / (1024 * 1024)}MB budget.\nTop assets:\n${topAssets}`
  ).toBeLessThan(BUDGET_TOTAL_BYTES);
});

// ---------------------------------------------------------------------------
// Navigation Timing API — more precise timing
// ---------------------------------------------------------------------------

test('Navigation Timing: time-to-interactive is reasonable', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL, { waitUntil: 'networkidle' });

  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domInteractive: Math.round(nav.domInteractive),
      domComplete: Math.round(nav.domComplete),
      loadEventEnd: Math.round(nav.loadEventEnd),
    };
  });

  // domInteractive should be under 3 seconds for a static site.
  expect(
    timing.domInteractive,
    `domInteractive: ${timing.domInteractive}ms`
  ).toBeLessThan(3_000);

  // loadEventEnd should be under 5 seconds total.
  expect(
    timing.loadEventEnd,
    `loadEventEnd: ${timing.loadEventEnd}ms`
  ).toBeLessThan(5_000);
});

// ---------------------------------------------------------------------------
// No render-blocking scripts
// ---------------------------------------------------------------------------

test('JavaScript files are deferred or async', async ({ page }) => {
  await page.goto(FIRST_TUTORIAL);

  const blockingScripts = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    return scripts
      .filter((s) => !s.hasAttribute('defer') && !s.hasAttribute('async') && !s.hasAttribute('type'))
      .map((s) => s.getAttribute('src'));
  });

  expect(
    blockingScripts,
    `Render-blocking scripts found:\n${blockingScripts.join('\n')}`
  ).toHaveLength(0);
});
