/**
 * Viewport dimension constants that mirror the CSS breakpoints in layout.css.
 *
 * Usage:
 *   import { MOBILE, TABLET, DESKTOP } from '../helpers/breakpoints';
 *   await page.setViewportSize(MOBILE);
 */

export const MOBILE = { width: 375, height: 812 } as const;
export const TABLET = { width: 768, height: 1024 } as const;
export const DESKTOP = { width: 1280, height: 800 } as const;

/**
 * Breakpoint thresholds that match the media queries in layout.css.
 * The sidebar becomes off-canvas below SIDEBAR_BREAKPOINT.
 * The TOC hides below TOC_BREAKPOINT.
 */
export const SIDEBAR_BREAKPOINT = 768;
export const TOC_BREAKPOINT = 1024;
