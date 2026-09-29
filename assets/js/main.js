/* Site behaviour: mobile nav, sticky header state, scroll reveal, mailto form.
   No dependencies. Degrades to a perfectly usable page if JS never runs. */
(function () {
  'use strict';

  /* ---- Sticky header state ---------------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Publish the header's real height so the hero offset and the mobile nav
       panel stay correct if the brand ever wraps to a second line. */
    var publishHeight = function () {
      var h = Math.round(header.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--header-h', h + 'px');
    };
    publishHeight();
    window.addEventListener('resize', publishHeight);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(publishHeight);
  }

  /* ---- Mobile navigation ------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.style.overflow = open && window.innerWidth < 880 ? 'hidden' : '';
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 880) setOpen(false);
    });
  }

  /* ---- Scroll reveal ------------------------------------------------------ */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el, i) {
      // Stagger siblings that share a parent, so grids cascade in.
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--reveal-delay', Math.min(idx, 5) * 70 + 'ms');
      observer.observe(el);
    });
  }

  /* ---- Contact form -------------------------------------------------------
     A static site has no server. Until a form service is wired up (see
     README), the form composes an email in the visitor's mail client.
     Swap the handler for a real endpoint by giving the <form> an action.   */
  var form = document.querySelector('[data-mailto-form]');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var to = form.dataset.mailtoForm;
      var subject = 'Website enquiry from ' + (data.get('name') || 'the site');
      var body = [
        'Name: ' + (data.get('name') || ''),
        'Email: ' + (data.get('email') || ''),
        'Phone: ' + (data.get('phone') || ''),
        '',
        data.get('message') || ''
      ].join('\n');

      window.location.href =
        'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---- Current year in the footer ---------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
