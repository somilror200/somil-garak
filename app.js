// app.js — theme toggle, header hide-on-scroll, mobile nav, scroll reveals

(function themeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateIcon();

  function updateIcon() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML =
      theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  toggle &&
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateIcon();
    });
})();

(function headerScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (y > lastY && y > 120) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      header.classList.toggle('header--scrolled', y > 8);
      lastY = y;
    },
    { passive: true }
  );
})();

(function mobileNav() {
  const nav = document.querySelector('[data-mobile-nav]');
  const openBtn = document.querySelector('[data-nav-toggle]');
  const closeBtn = document.querySelector('[data-nav-close]');
  if (!nav || !openBtn) return;
  const links = nav.querySelectorAll('a');

  function open() {
    nav.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
  }
  function close() {
    nav.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
  }
  openBtn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  links.forEach((a) => a.addEventListener('click', close));
})();

(function scrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => observer.observe(el));
})();
