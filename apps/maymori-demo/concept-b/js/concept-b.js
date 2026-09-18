document.addEventListener('DOMContentLoaded', () => {
  const content = window.MAYMORII_CONCEPT_B;
  if (!content) return;

  renderContent(content);
  initHeader();
  initMenu();
  initReveals();
  initLightbox();
  initCollectionDrag();
  initCursorLabel();

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  window.requestAnimationFrame(() => {
    document.querySelector('.hero')?.classList.add('is-ready');
    document.querySelector('.finale')?.classList.add('is-ready');
  });
});

function unsplashUrl(id, width, quality = 84) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

function renderContent(content) {
  const hero = document.querySelector('[data-hero-image]');
  const finale = document.querySelector('[data-finale-image]');
  hero.style.backgroundImage = `url("${unsplashUrl(content.images.hero.id, 2200, 88)}")`;
  hero.style.backgroundPosition = content.images.hero.position;
  finale.style.backgroundImage = `url("${unsplashUrl(content.images.finale.id, 2200, 86)}")`;
  finale.style.backgroundPosition = content.images.finale.position;

  document.querySelectorAll('[data-image-slot]').forEach((slot) => {
    const image = content.images[slot.dataset.imageSlot];
    if (!image) return;
    slot.append(createImage(image, '(max-width: 620px) 100vw, 70vw'));
    slot.dataset.fullImage = unsplashUrl(image.id, 2000, 90);
    slot.dataset.imageTitle = image.title;
    slot.dataset.imageCategory = image.category;
    makeImageInteractive(slot);
  });

  const strip = document.querySelector('[data-collection-strip]');
  content.collections.forEach((item, index) => {
    const figure = document.createElement('figure');
    figure.className = `collection-item ${item.shape} reveal`;
    figure.dataset.fullImage = unsplashUrl(item.id, 2000, 90);
    figure.dataset.imageTitle = item.title;
    figure.dataset.imageCategory = item.category;

    const imageShell = document.createElement('div');
    imageShell.className = 'collection-image';
    imageShell.append(createImage(item, '(max-width: 620px) 88vw, 45vw'));

    const caption = document.createElement('figcaption');
    const title = document.createElement('strong');
    const meta = document.createElement('span');
    title.textContent = item.title;
    meta.textContent = `${String(index + 1).padStart(2, '0')} · ${item.category}`;
    caption.append(title, meta);
    figure.append(imageShell, caption);
    makeImageInteractive(figure);
    strip.append(figure);
  });

  const whatsappMessage = encodeURIComponent('Hello Maymorii Studio! I saw the photography website concept and would like to enquire about a session. Could you share your availability and current options?');
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = `https://wa.me/${content.contact.whatsapp}?text=${whatsappMessage}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function createImage(image, sizes) {
  const element = document.createElement('img');
  element.src = unsplashUrl(image.id, 1100);
  element.srcset = [
    `${unsplashUrl(image.id, 640, 82)} 640w`,
    `${unsplashUrl(image.id, 1100, 84)} 1100w`,
    `${unsplashUrl(image.id, 1700, 86)} 1700w`
  ].join(', ');
  element.sizes = sizes;
  element.alt = `${image.alt}; temporary stock image for this concept`;
  element.width = 1100;
  element.height = image.shape === 'landscape' ? 740 : 1450;
  element.loading = 'lazy';
  element.decoding = 'async';
  return element;
}

function makeImageInteractive(element) {
  element.tabIndex = 0;
  element.setAttribute('role', 'button');
  element.setAttribute('aria-label', `View ${element.dataset.imageTitle} concept image`);
}

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 90);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const header = document.querySelector('[data-header]');
  if (!toggle || !menu || !header) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    header.classList.remove('menu-open');
    document.body.classList.remove('is-locked');
  };

  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    menu.classList.toggle('is-open', opening);
    header.classList.toggle('menu-open', opening);
    document.body.classList.toggle('is-locked', opening);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
}

function initReveals() {
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
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

  items.forEach((item) => observer.observe(item));
}

function initLightbox() {
  const dialog = document.querySelector('[data-lightbox]');
  if (!dialog) return;
  const dialogImage = dialog.querySelector('img');
  const dialogTitle = dialog.querySelector('strong');
  const openers = document.querySelectorAll('[data-full-image]');

  const open = (item) => {
    dialogImage.src = item.dataset.fullImage;
    dialogImage.alt = item.querySelector('img')?.alt || 'Expanded concept photograph';
    dialogTitle.textContent = `${item.dataset.imageTitle} · ${item.dataset.imageCategory}`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  openers.forEach((item) => {
    item.addEventListener('click', () => open(item));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(item);
      }
    });
  });
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}

function initCollectionDrag() {
  const strip = document.querySelector('[data-collection-strip]');
  if (!strip) return;
  let pointerStart = 0;
  let scrollStart = 0;
  let dragged = false;

  strip.addEventListener('pointerdown', (event) => {
    pointerStart = event.clientX;
    scrollStart = strip.scrollLeft;
    dragged = false;
    strip.classList.add('is-dragging');
    strip.setPointerCapture(event.pointerId);
  });
  strip.addEventListener('pointermove', (event) => {
    if (!strip.hasPointerCapture(event.pointerId)) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 6) dragged = true;
    strip.scrollLeft = scrollStart - distance;
  });
  const stop = (event) => {
    if (strip.hasPointerCapture(event.pointerId)) strip.releasePointerCapture(event.pointerId);
    strip.classList.remove('is-dragging');
  };
  strip.addEventListener('pointerup', stop);
  strip.addEventListener('pointercancel', stop);
  strip.addEventListener('click', (event) => {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  }, true);
}

function initCursorLabel() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const label = document.querySelector('[data-cursor-label]');
  if (!label) return;
  document.querySelectorAll('[data-full-image]').forEach((item) => {
    item.addEventListener('mouseenter', () => label.classList.add('is-visible'));
    item.addEventListener('mouseleave', () => label.classList.remove('is-visible'));
  });
  document.addEventListener('mousemove', (event) => {
    label.style.left = `${event.clientX}px`;
    label.style.top = `${event.clientY}px`;
  });
}
