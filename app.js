// Theme, navigation, reveal animation and small progressive enhancements.
(function themeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  const saved = localStorage.getItem('somil-theme');
  let theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme() {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('somil-theme', theme);
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  applyTheme();
  toggle?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });
})();

(function headerScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('header--hidden', y > lastY && y > 160);
    header.classList.toggle('header--scrolled', y > 8);
    lastY = y;
  }, { passive: true });
})();

(function mobileNav() {
  const nav = document.querySelector('[data-mobile-nav]');
  const openBtn = document.querySelector('[data-nav-toggle]');
  const closeBtn = document.querySelector('[data-nav-close]');
  if (!nav || !openBtn) return;

  const close = () => {
    nav.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const open = () => {
    nav.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  window.addEventListener('keydown', (event) => event.key === 'Escape' && close());
})();

(function scrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
  items.forEach((item) => observer.observe(item));
})();

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
