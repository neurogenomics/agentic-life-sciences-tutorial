/**
 * slides.js — Reveal.js slide builder
 *
 * Reads `tutorial_url` from the .slides container's data attribute,
 * fetches search.json to find the tutorial's rendered HTML content,
 * splits that HTML at <h2> boundaries into Reveal.js <section> elements,
 * then initializes Reveal.js.
 */

(function () {
  'use strict';

  /**
   * Split an HTML string into slide sections.
   * - Any leading content before the first heading becomes a title slide if it
   *   contains an <h1>, otherwise is prepended to the first section.
   * - Each <h2> starts a new section, accumulating all sibling nodes until
   *   the next <h2>.
   *
   * @param {string} html - Rendered tutorial HTML
   * @returns {HTMLElement[]} Array of <section> elements
   */
  function splitIntoSections(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString('<div id="root">' + html + '</div>', 'text/html');
    var root = doc.getElementById('root');
    var children = Array.from(root.childNodes);

    var sections = [];
    var currentNodes = [];

    function flushSection(isTitleSlide) {
      if (currentNodes.length === 0) return;

      // Skip sections that contain only whitespace text nodes
      var hasContent = currentNodes.some(function (n) {
        return n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '');
      });
      if (!hasContent) return;

      var section = document.createElement('section');
      if (isTitleSlide) {
        section.classList.add('title-slide');
      }
      currentNodes.forEach(function (n) {
        section.appendChild(document.importNode(n, true));
      });
      sections.push(section);
      currentNodes = [];
    }

    var foundH1 = false;
    var foundH2 = false;

    children.forEach(function (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        var tag = node.tagName.toUpperCase();

        if (tag === 'H1' && !foundH1 && !foundH2) {
          // Flush anything before the h1 (unlikely but safe)
          flushSection(false);
          foundH1 = true;
          currentNodes.push(node);
          return;
        }

        if (tag === 'H2') {
          // Flush previous section
          if (foundH1 && !foundH2) {
            // The h1 group becomes the title slide
            flushSection(true);
          } else {
            flushSection(false);
          }
          foundH2 = true;
          currentNodes.push(node);
          return;
        }
      }

      currentNodes.push(node);
    });

    // Flush the last section
    if (foundH1 && !foundH2) {
      flushSection(true);
    } else {
      flushSection(false);
    }

    return sections;
  }

  /**
   * Normalize a URL path for comparison:
   * strip trailing slash, .html extension, and lowercase.
   */
  function normalizePath(url) {
    if (!url) return '';
    // Remove origin if present
    try {
      url = new URL(url, window.location.origin).pathname;
    } catch (e) {
      // relative path already
    }
    return url.replace(/\.html$/, '').replace(/\/$/, '').toLowerCase();
  }

  /**
   * Main initialization.
   */
  function init() {
    var slidesContainer = document.querySelector('.reveal .slides');
    if (!slidesContainer) return;

    var tutorialUrl = slidesContainer.getAttribute('data-tutorial-url');
    if (!tutorialUrl) {
      initReveal();
      return;
    }

    var normalizedTarget = normalizePath(tutorialUrl);

    // Determine search.json URL relative to current page
    var searchJsonUrl = (window.location.pathname.replace(/\/[^/]*$/, '') + '/../search.json')
      .replace(/\/[^/]*\/\.\./, '') // simplify path
      || '/search.json';

    // Try a few candidate paths for search.json
    var candidates = [
      '/search.json',
      window.location.pathname.split('/').slice(0, -2).join('/') + '/search.json',
    ];
    // Deduplicate
    candidates = candidates.filter(function (v, i, a) { return a.indexOf(v) === i; });

    fetchSearchJson(candidates, 0, function (data) {
      if (!data || !Array.isArray(data)) {
        console.warn('[slides.js] search.json not found or invalid; using page content as-is.');
        initReveal();
        return;
      }

      // Find matching tutorial entry
      var entry = null;
      for (var i = 0; i < data.length; i++) {
        var itemUrl = normalizePath(data[i].url);
        if (itemUrl === normalizedTarget) {
          entry = data[i];
          break;
        }
      }

      if (!entry || (!entry.html && !entry.content)) {
        console.warn('[slides.js] No matching tutorial found for', tutorialUrl, '— using page content as-is.');
        initReveal();
        return;
      }

      // Build sections from the tutorial's rendered HTML (not stripped text)
      var sections = splitIntoSections(entry.html || entry.content);

      if (sections.length === 0) {
        console.warn('[slides.js] No sections extracted.');
        initReveal();
        return;
      }

      // Replace container contents with sections
      slidesContainer.innerHTML = '';
      sections.forEach(function (sec) {
        slidesContainer.appendChild(sec);
      });

      initReveal();
    });
  }

  /**
   * Try each candidate URL for search.json, calling cb with parsed JSON or null.
   */
  function fetchSearchJson(candidates, index, cb) {
    if (index >= candidates.length) {
      cb(null);
      return;
    }
    fetch(candidates[index])
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        cb(data);
      })
      .catch(function () {
        fetchSearchJson(candidates, index + 1, cb);
      });
  }

  /**
   * Initialize Reveal.js with Imperial-branded defaults.
   */
  function initReveal() {
    if (typeof Reveal === 'undefined') {
      console.error('[slides.js] Reveal.js not loaded.');
      return;
    }
    Reveal.initialize({
      hash: true,
      slideNumber: true,
      transition: 'slide',
      controls: true,
      progress: true,
      center: true,
      width: 1280,
      height: 720,
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
