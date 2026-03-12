/**
 * Table of Contents — auto-generate from h2/h3 headings in .docs-content
 * Includes IntersectionObserver scroll-spy for active heading highlight.
 */
(function () {
  'use strict';

  var tocList = document.getElementById('toc-list');
  var content = document.querySelector('.docs-content');

  if (!tocList || !content) return;

  var headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  var fragment = document.createDocumentFragment();

  headings.forEach(function (heading) {
    // Ensure the heading has an id for linking
    if (!heading.id) {
      heading.id = heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;

    if (heading.tagName === 'H3') {
      li.classList.add('toc-h3');
    }

    li.appendChild(a);
    fragment.appendChild(li);
  });

  tocList.appendChild(fragment);

  // ---- IntersectionObserver scroll-spy ----
  if (!('IntersectionObserver' in window)) return;

  var tocLinks = tocList.querySelectorAll('a');
  var linkMap = {};
  tocLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    linkMap[id] = link;
  });

  function setActive(id) {
    tocLinks.forEach(function (link) {
      link.classList.remove('is-active');
    });
    if (id && linkMap[id]) {
      linkMap[id].classList.add('is-active');
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
})();
