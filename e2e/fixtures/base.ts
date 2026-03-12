/**
 * Custom Playwright fixture that bundles axe-core for accessibility audits.
 *
 * Usage in test files:
 *   import { test, expect } from '../fixtures/base';
 *
 *   test('page is accessible', async ({ page, checkA11y }) => {
 *     await page.goto('/');
 *     await checkA11y();
 *   });
 */

import { test as base, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export type A11yViolation = Awaited<
  ReturnType<AxeBuilder['analyze']>
>['violations'][number];

interface A11yFixtures {
  /**
   * Run an axe-core audit against the current page state.
   *
   * @param options.rules  Optional axe rule IDs to restrict the scan.
   * @param options.tags   Optional WCAG / best-practice tag filters (defaults
   *                       to ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).
   * @param options.exclude CSS selectors to exclude from the audit (useful for
   *                       third-party embeds you cannot control).
   * @returns The full axe AnalyzeResult so callers can inspect violations.
   */
  checkA11y: (options?: {
    rules?: string[];
    tags?: string[];
    exclude?: string[];
  }) => Promise<Awaited<ReturnType<AxeBuilder['analyze']>>>;
}

export const test = base.extend<A11yFixtures>({
  checkA11y: async ({ page }, use) => {
    const runner = async (
      options: {
        rules?: string[];
        tags?: string[];
        exclude?: string[];
      } = {}
    ) => {
      const { tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'], rules, exclude } = options;

      let builder = new AxeBuilder({ page }).withTags(tags);

      if (rules?.length) {
        builder = builder.withRules(rules);
      }

      if (exclude?.length) {
        exclude.forEach((selector) => {
          builder = builder.exclude(selector);
        });
      }

      const results = await builder.analyze();
      return results;
    };

    await use(runner);
  },
});

export { expect };
