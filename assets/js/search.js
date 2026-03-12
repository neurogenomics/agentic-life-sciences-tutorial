/**
 * Search — Lunr.js client-side full-text search
 * Fetches /search.json on first open, builds index, handles UI.
 */
(function () {
  'use strict';

  /* ── DOM refs ─────────────────────────────────────────────────── */
  var modal       = document.getElementById('search-modal');
  var input       = document.getElementById('search-input');
  var resultsEl   = document.getElementById('search-results');
  var noResults   = document.querySelector('[data-testid="search-no-results"]');
  var closeBtn    = document.getElementById('search-close');
  var searchBtn   = document.querySelector('.btn-search');

  if (!modal || !input || !resultsEl) return;

  /* ── State ───────────────────────────────────────────────────── */
  var index      = null;   // Lunr index
  var store      = {};     // ref → {title, url, content}
  var loading    = false;
  var activeIdx  = -1;     // keyboard-selected result index

  /* ── Helpers ─────────────────────────────────────────────────── */
  function baseurl() {
    // Read baseurl from a meta tag if present, otherwise empty string.
    var meta = document.querySelector('meta[name="baseurl"]');
    return meta ? meta.getAttribute('content').replace(/\/$/, '') : '';
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, delay);
    };
  }

  function snippet(text, query) {
    if (!text) return '';
    var words = query.trim().split(/\s+/);
    var re    = new RegExp(words.map(function (w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|'), 'i');
    var idx = text.search(re);
    var start = Math.max(0, idx - 60);
    var end   = Math.min(text.length, start + 160);
    var snip  = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    return snip;
  }

  /* ── Index loading ───────────────────────────────────────────── */
  function loadIndex(callback) {
    if (index) { callback(); return; }
    if (loading) return;
    loading = true;

    var url = baseurl() + '/search.json';
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load search index');
        return res.json();
      })
      .then(function (data) {
        index = lunr(function () {
          this.ref('url');
          this.field('title', { boost: 10 });
          this.field('content');
          var self = this;
          data.forEach(function (page) {
            if (page.url) {
              store[page.url] = page;
              self.add(page);
            }
          });
        });
        loading = false;
        callback();
      })
      .catch(function (err) {
        loading = false;
        console.warn('Search index could not be loaded:', err);
      });
  }

  /* ── Rendering ───────────────────────────────────────────────── */
  function renderResults(query) {
    resultsEl.innerHTML = '';
    noResults.style.display = 'none';
    activeIdx = -1;

    if (!query || query.trim().length < 2) return;

    var results;
    try {
      results = index.search(query + '~1');   // fuzzy
      if (!results.length) results = index.search(query);
    } catch (e) {
      try { results = index.search(query); } catch (_) { results = []; }
    }

    if (!results.length) {
      noResults.style.display = 'block';
      return;
    }

    var items = results.slice(0, 10).map(function (r) {
      var page  = store[r.ref];
      var snip  = snippet(page.content, query);
      var item  = document.createElement('a');
      item.className  = 'search-result-item';
      item.href       = page.url;
      item.setAttribute('role', 'option');
      item.setAttribute('data-testid', 'search-result');
      item.innerHTML  =
        '<strong class="search-result-title">' + escHtml(page.title) + '</strong>' +
        (snip ? '<span class="search-result-snippet">' + escHtml(snip) + '</span>' : '');
      item.addEventListener('click', closeModal);
      return item;
    });

    items.forEach(function (el) { resultsEl.appendChild(el); });
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Modal open / close ──────────────────────────────────────── */
  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // Load index lazily on first open
    loadIndex(function () {
      var q = input.value.trim();
      if (q.length >= 2) renderResults(q);
    });
    input.focus();
    input.select();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    activeIdx = -1;
  }

  /* ── Keyboard navigation inside results ─────────────────────── */
  function getItems() {
    return Array.prototype.slice.call(resultsEl.querySelectorAll('.search-result-item'));
  }

  function setActive(idx) {
    var items = getItems();
    items.forEach(function (el, i) {
      el.classList.toggle('is-active', i === idx);
      if (i === idx) el.setAttribute('aria-selected', 'true');
      else el.removeAttribute('aria-selected');
    });
    activeIdx = idx;
  }

  /* ── Event wiring ────────────────────────────────────────────── */
  // Search button in header
  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      modal.classList.contains('is-open') ? closeModal() : openModal();
    });
  }

  // Close button inside modal
  closeBtn.addEventListener('click', closeModal);

  // Click on overlay backdrop (outside dialog)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (modal.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        closeModal();
        if (searchBtn) searchBtn.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        var items = getItems();
        setActive(Math.min(activeIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, -1));
        if (activeIdx === -1) input.focus();
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        var items = getItems();
        if (items[activeIdx]) {
          items[activeIdx].click();
        }
      }
    } else {
      // '/' opens search from anywhere (unless focus is in an input)
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA' &&
          !document.activeElement.isContentEditable) {
        e.preventDefault();
        openModal();
      }
    }
  });

  // Debounced input handler
  var debouncedSearch = debounce(function () {
    var q = input.value.trim();
    if (!index) {
      loadIndex(function () { renderResults(q); });
    } else {
      renderResults(q);
    }
  }, 200);

  input.addEventListener('input', debouncedSearch);

  // Focus trap: keep Tab inside modal
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = modal.querySelectorAll(
      'input, button, a[href], [tabindex]:not([tabindex="-1"])'
    );
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });
})();
