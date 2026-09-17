/**
 * NEXURA LABS — Futuristic Cyber Systems & Interactive Engine
 * Features:
 * - Interactive Canvas Particle Grid with mouse repulsion/glow
 * - Live Terminal Diagnostics simulation
 * - Dynamic Project Scope & ROI Estimator
 * - Automated WhatsApp Message Generation targeting Afiq's WhatsApp (+601116840840)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initTerminalSimulation();
  initEstimator();
});

/* ==========================================================================
   1. INTERACTIVE CYBER CANVAS (PARTICLE GRID MATRIX)
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouse = { x: width / 2, y: height / 2, radius: 150 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Particle configuration
  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.3 ? 'rgba(0, 240, 255, ' : 'rgba(139, 92, 246, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= Math.cos(angle) * force * 2;
        this.y -= Math.sin(angle) * force * 2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting cyber lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. TERMINAL DIAGNOSTIC SIMULATION
   ========================================================================== */
function initTerminalSimulation() {
  const terminalText = document.getElementById('terminal-stream');
  if (!terminalText) return;

  const logs = [
    'SCANNING LOCAL BUSINESS VECTORS: KL & SELANGOR...',
    'ANALYZING GOOGLE MAPS DIRECTORY: 94 REVIEWS IDENTIFIED',
    'DETECTED PROSPECT: MAYMORII STUDIO (CHERAS)',
    'DEPLOYING 24H INTERACTIVE PROTOTYPE → /demo/maymorii',
    'STATUS: HIGH-CONVERSION ENGINE ARMED & READY.'
  ];

  let logIndex = 0;
  let charIndex = 0;
  let currentLog = '';

  function typeLog() {
    if (logIndex >= logs.length) return;

    if (charIndex < logs[logIndex].length) {
      currentLog += logs[logIndex].charAt(charIndex);
      terminalText.textContent = currentLog;
      charIndex++;
      setTimeout(typeLog, 30);
    } else {
      setTimeout(() => {
        logIndex++;
        charIndex = 0;
        currentLog = '';
        if (logIndex < logs.length) typeLog();
      }, 2500);
    }
  }

  setTimeout(typeLog, 800);
}

/* ==========================================================================
   3. INTERACTIVE PROJECT ESTIMATOR & WHATSAPP BUILDER
   ========================================================================== */
function initEstimator() {
  const industrySelect = document.getElementById('est-industry');
  const tierSelect = document.getElementById('est-tier');
  const featureCheckboxes = document.querySelectorAll('.est-feature');
  const priceDisplay = document.getElementById('est-price-display');
  const timeDisplay = document.getElementById('est-timeline-display');
  const triggerBtn = document.getElementById('est-whatsapp-btn');

  if (!industrySelect || !tierSelect || !priceDisplay || !triggerBtn) return;

  const tierBasePrices = {
    'starter': 1199,
    'conversion': 1899,
    'scale': 2899
  };

  const tierTimelines = {
    'starter': '3–5 Business Days',
    'conversion': '5–7 Business Days',
    'scale': '7–12 Business Days'
  };

  function calculateEstimate() {
    const tier = tierSelect.value || 'conversion';
    let basePrice = tierBasePrices[tier] || 1899;
    let timeline = tierTimelines[tier] || '5–7 Business Days';

    // Calculate add-on features
    let selectedFeatures = [];
    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        basePrice += parseInt(cb.getAttribute('data-price') || '0', 10);
        selectedFeatures.push(cb.getAttribute('data-name'));
      }
    });

    // Update screen
    priceDisplay.textContent = `RM ${basePrice.toLocaleString()}`;
    if (timeDisplay) timeDisplay.textContent = timeline;

    return {
      industry: industrySelect.options[industrySelect.selectedIndex].text,
      tier: tierSelect.options[tierSelect.selectedIndex].text,
      price: basePrice,
      timeline: timeline,
      features: selectedFeatures
    };
  }

  // Event listeners
  industrySelect.addEventListener('change', calculateEstimate);
  tierSelect.addEventListener('change', calculateEstimate);
  featureCheckboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));

  // WhatsApp click handler
  triggerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = calculateEstimate();

    let message = `Hello Afiq / NEXURA LABS! 🚀\n\nI'm exploring a high-conversion website for my business:\n` +
      `• Industry: ${data.industry}\n` +
      `• Architecture Tier: ${data.tier}\n` +
      `• Estimated Investment: RM ${data.price.toLocaleString()}\n` +
      `• Target Delivery: ${data.timeline}\n`;

    if (data.features.length > 0) {
      message += `• Included Modules: ${data.features.join(', ')}\n`;
    }

    message += `\nI would like to request a 24-Hour Custom Prototype Concept for my business. Let's discuss!`;

    const whatsappUrl = `https://wa.me/601116840840?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });

  // Initial calculation
  calculateEstimate();
}
