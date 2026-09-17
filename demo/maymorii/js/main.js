document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileBookingBar();
  initNavigation();
  initReveals();
  initResultsSlider();
  initGallery();
  initBooking();
  initFeedbackPreview();
  initAddressCopy();
  document.getElementById('year').textContent = new Date().getFullYear();
});

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMobileBookingBar() {
  const bar = document.querySelector('.mobile-booking-bar');
  if (!bar) return;
  const update = () => bar.classList.toggle('is-visible', window.scrollY > 520);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.getElementById('site-nav');
  if (!toggle || !navigation) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  };

  toggle.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('is-locked', willOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 780) close(); });
}

function initReveals() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -35px' });

  elements.forEach((element) => observer.observe(element));
}

function initResultsSlider() {
  const slider = document.querySelector('[data-results-slider]');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('[data-result-slide]'));
  const dots = Array.from(slider.querySelectorAll('[data-slide-dot]'));
  const previous = slider.querySelector('[data-slider-prev]');
  const next = slider.querySelector('[data-slider-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timer = null;
  let isInView = false;
  let isPaused = false;
  let pointerStart = null;

  const showSlide = (requestedIndex, restart = true) => {
    activeIndex = (requestedIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (restart) start();
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (reduceMotion || !isInView || isPaused || document.hidden) return;
    timer = window.setInterval(() => showSlide(activeIndex + 1, false), 5500);
  };

  previous?.addEventListener('click', () => showSlide(activeIndex - 1));
  next?.addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slideDot))));

  slider.addEventListener('mouseenter', () => { isPaused = true; stop(); });
  slider.addEventListener('mouseleave', () => { isPaused = false; start(); });
  slider.addEventListener('focusin', () => { isPaused = true; stop(); });
  slider.addEventListener('focusout', (event) => {
    if (!slider.contains(event.relatedTarget)) { isPaused = false; start(); }
  });

  slider.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; });
  slider.addEventListener('pointerup', (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) < 45) return;
    showSlide(activeIndex + (distance < 0 ? 1 : -1));
  });

  document.addEventListener('visibilitychange', start);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      start();
    }, { threshold: 0.3 });
    observer.observe(slider);
  } else {
    isInView = true;
    start();
  }

  showSlide(0, false);
}

function initGallery() {
  const filters = document.querySelectorAll('.filter-button');
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      filters.forEach((button) => button.classList.toggle('is-active', button === filter));
      items.forEach((item) => { item.hidden = category !== 'all' && item.dataset.category !== category; });
    });
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox) return;
      const image = lightbox.querySelector('img');
      const title = lightbox.querySelector('strong');
      image.src = item.dataset.image || item.querySelector('img').src;
      image.alt = item.querySelector('img').alt;
      title.textContent = item.dataset.title || 'Concept gallery image';
      openDialog(lightbox);
    });
  });

  document.querySelector('[data-close-lightbox]')?.addEventListener('click', () => lightbox?.close());
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
}

function initBooking() {
  const dialog = document.getElementById('booking-dialog');
  const form = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('booking-service');
  const dateInput = document.getElementById('booking-date');
  if (!dialog || !form || !serviceSelect) return;

  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  document.querySelectorAll('[data-open-booking]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const requestedService = trigger.dataset.service || 'Not sure yet';
      const option = Array.from(serviceSelect.options).find((item) => item.value === requestedService);
      serviceSelect.value = option ? requestedService : 'Not sure yet';
      openDialog(dialog);
    });
  });

  document.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = document.getElementById('booking-name').value.trim();
    const service = serviceSelect.value;
    const date = dateInput?.value || 'Flexible / to discuss';
    const pax = document.getElementById('booking-pax').value || '1';
    const notes = document.getElementById('booking-notes').value.trim();
    const message = [
      'Hello Maymorii Studio!',
      '',
      `My name is ${name}.`,
      `I am interested in: ${service}.`,
      `Preferred date: ${date}.`,
      `Number of people: ${pax}.`,
      notes ? `Notes: ${notes}` : '',
      '',
      'Could you share availability, suitable options and pricing? Thank you.'
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/601116840840?text=${encodeURIComponent(message)}`;
    dialog.close();
    showToast('Opening WhatsApp with your enquiry…');
    window.setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 250);
  });
}

function initFeedbackPreview() {
  const form = document.getElementById('feedback-form');
  const preview = document.getElementById('preview-review');
  const stars = document.querySelectorAll('.star-picker button');
  if (!form || !preview || !stars.length) return;

  let rating = 5;
  const renderStars = (value) => {
    stars.forEach((star) => {
      const active = Number(star.dataset.rating) <= value;
      star.classList.toggle('is-active', active);
      star.setAttribute('aria-checked', String(Number(star.dataset.rating) === value));
    });
  };

  stars.forEach((star) => {
    star.setAttribute('role', 'radio');
    star.addEventListener('click', () => {
      rating = Number(star.dataset.rating);
      renderStars(rating);
    });
    star.addEventListener('mouseenter', () => renderStars(Number(star.dataset.rating)));
    star.addEventListener('mouseleave', () => renderStars(rating));
  });
  renderStars(rating);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    preview.replaceChildren();
    const name = document.createElement('strong');
    const ratingLine = document.createElement('span');
    const text = document.createElement('p');
    name.textContent = `${data.get('reviewer')} · ${data.get('session')}`;
    ratingLine.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    text.textContent = `“${data.get('feedback')}”`;
    preview.append(name, ratingLine, text);
    preview.hidden = false;
    showToast('Local feedback preview created—nothing was published.');
  });
}

function initAddressCopy() {
  const address = 'Unit 12-32, 2, Jalan Desa Aman 1, Cheras Business Centre, Cheras, 56100 Kuala Lumpur';
  document.querySelector('[data-copy-address]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address);
      showToast('Studio address copied.');
    } catch {
      showToast(address);
    }
  });
}

function openDialog(dialog) {
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(window.maymoriiToastTimer);
  window.maymoriiToastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
}
