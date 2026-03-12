/**
 * Canonical list of page URLs used across test files.
 *
 * Derived from _data/navigation.yml plus the home and slides pages.
 * Keep in sync with the navigation data file.
 */

/** Tutorial page URLs (all use the docs layout). */
export const TUTORIAL_PAGES = [
  '/tutorials/01-setup',
  '/tutorials/github-education',
  '/tutorials/02-penguins-analysis',
  '/tutorials/03-journal-club-slides',
  '/tutorials/04-single-cell-portal',
  '/tutorials/05-context-management',
  '/tutorials/06-gsd-ralph',
  '/tutorials/07-apm',
] as const;

/** Slide deck URLs — one per tutorial that ships with slides. */
export const SLIDE_PAGES = [
  '/slides/01-setup',
  '/slides/02-penguins-analysis',
  '/slides/03-journal-club-slides',
  '/slides/04-single-cell-portal',
  '/slides/05-context-management',
  '/slides/06-gsd-ralph',
  '/slides/07-apm',
] as const;

/** All pages that should pass accessibility / performance checks. */
export const ALL_PAGES = [
  '/',
  ...TUTORIAL_PAGES,
] as const;

/** A representative tutorial used in focused single-page tests. */
export const FIRST_TUTORIAL = '/tutorials/01-setup' as const;

/** A tutorial that has a known next page (not the last in nav). */
export const MID_TUTORIAL = '/tutorials/02-penguins-analysis' as const;

/** The last tutorial in the nav (no next link). */
export const LAST_TUTORIAL = '/tutorials/07-apm' as const;

/** A representative slide deck used in slide-specific tests. */
export const FIRST_SLIDE_DECK = '/slides/03-journal-club-slides' as const;
