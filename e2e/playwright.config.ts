import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4000';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: BASE_URL,
    // Capture screenshot and trace on failure for easier debugging.
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 768, height: 1024 },
      },
    },
  ],

  // Spin up Jekyll before running the suite (skipped when BASE_URL is
  // overridden from the environment, e.g. in CI where the site is pre-built).
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'bundle exec jekyll serve --port 4000 --no-watch',
        url: 'http://localhost:4000',
        timeout: 60_000,
        reuseExistingServer: !isCI,
        cwd: '..',
      },
});
