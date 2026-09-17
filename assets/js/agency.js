document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeader();
  initReveals();
  initPackageSelection();
  initBriefForm();
  initAmbientCanvas();
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
}

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  items.forEach((item) => observer.observe(item));
}

function initPackageSelection() {
  const packageSelect = document.getElementById('package-interest');
  document.querySelectorAll('.choose-package').forEach((button) => {
    button.addEventListener('click', () => {
      if (packageSelect) packageSelect.value = button.dataset.package || 'Not sure yet';
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => document.querySelector('#project-brief input')?.focus({ preventScroll: true }), 650);
    });
  });
}

function initBriefForm() {
  const form = document.getElementById('project-brief');
  const status = document.getElementById('form-status');
  const toast = document.getElementById('toast');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const summary = [
      'NEXURA LABS — Project brief',
      '',
      `Business: ${data.get('business')}`,
      `Contact: ${data.get('name')}`,
      `Business type: ${data.get('businessType')}`,
      `Main goal: ${data.get('goal')}`,
      `Package interest: ${data.get('package')}`,
      `Notes: ${data.get('notes') || 'None provided'}`
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      status.textContent = 'Copied. Send the brief to Afiq using your agreed contact channel.';
      toast?.classList.add('is-visible');
      window.setTimeout(() => toast?.classList.remove('is-visible'), 2800);
    } catch {
      status.textContent = 'Copy was blocked by the browser. Select and copy the generated brief below.';
      let output = document.getElementById('generated-brief');
      if (!output) {
        output = document.createElement('textarea');
        output.id = 'generated-brief';
        output.readOnly = true;
        output.setAttribute('aria-label', 'Generated project brief');
        output.rows = 10;
        form.appendChild(output);
      }
      output.value = summary;
      output.select();
    }
  });
}

function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  let width = 0;
  let height = 0;
  let points = [];
  let frameId;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(36, Math.max(16, Math.floor(width / 34)));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    points.forEach((point, index) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;

      context.beginPath();
      context.arc(point.x, point.y, 1, 0, Math.PI * 2);
      context.fillStyle = 'rgba(84, 230, 223, .42)';
      context.fill();

      for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
        const other = points[otherIndex];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < 115) {
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(84, 230, 223, ${(1 - distance / 115) * 0.11})`;
          context.stroke();
        }
      }
    });
    frameId = window.requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.cancelAnimationFrame(frameId);
    else draw();
  });
}
