// Loaded in <head> without defer so .js is set before first paint. The CSS only
// collapses the menu and hides .reveal content under .js, so if this file never
// runs the page still shows everything.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initReveal();
  initLightbox();
});

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const isOpen = () => nav.classList.contains('is-open');
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  items.forEach((item) => observer.observe(item));
}

function initLightbox() {
  const images = document.querySelectorAll('img[data-lightbox]');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.tabIndex = -1;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged image');

  const enlarged = document.createElement('img');
  enlarged.className = 'lightbox__image';
  overlay.append(enlarged);
  document.body.append(overlay);

  let opener = null;
  const isOpen = () => overlay.classList.contains('is-open');

  // data-lightbox="path/to/large.jpg" can point at a bigger file than the thumbnail.
  const open = (image) => {
    enlarged.src = image.dataset.lightbox || image.currentSrc || image.src;
    enlarged.alt = image.alt;
    overlay.classList.add('is-open');
    opener = image;
    overlay.focus();
  };

  const close = () => {
    overlay.classList.remove('is-open');
    if (opener) opener.focus();
    opener = null;
  };

  images.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.addEventListener('click', () => open(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(image);
      }
    });
  });

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') event.preventDefault();
  });
}
