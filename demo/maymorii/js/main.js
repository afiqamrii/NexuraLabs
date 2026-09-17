/**
 * MAYMORII STUDIO — Interactive Scripts
 * Client demo prototype functionalities:
 * - Mobile Navigation Drawer
 * - Filterable Portfolio Gallery
 * - Modal Lightbox
 * - WhatsApp Booking Session Builder (targeted to 601116840840)
 * - Interactive Customer Feedback Form & Star Rating Picker
 * - LocalStorage Review Persistence & Toast Notifications
 * - FAQ Accordion & Quick Address Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initGalleryFilters();
  initLightbox();
  initBookingModal();
  initFeedbackForm();
  initFaqAccordion();
  initCopyAddress();
});

/* ==========================================================================
   1. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. FILTERABLE PORTFOLIO GALLERY
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === itemCat) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. MODAL LIGHTBOX
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-dialog');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCat = lightbox.querySelector('.lightbox-cat');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const bookBtn = lightbox.querySelector('.lightbox-book-trigger');

  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-overlay h4')?.textContent || 'Studio Photography';
      const cat = item.querySelector('.gallery-overlay .cat')?.textContent || 'Maymorii Studio';

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCat) lightboxCat.textContent = cat;

      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', '');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (typeof lightbox.close === 'function') {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    });
  }

  // Dismiss on backdrop click
  lightbox.addEventListener('click', (e) => {
    const rect = lightbox.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      lightbox.close();
    }
  });

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      lightbox.close();
      openBookingModal(lightboxCat?.textContent || 'Studio Photography');
    });
  }
}

/* ==========================================================================
   5. WHATSAPP SESSION BOOKING MODAL
   ========================================================================== */
function initBookingModal() {
  const bookingDialog = document.getElementById('booking-dialog');
  if (!bookingDialog) return;

  const closeBtn = bookingDialog.querySelector('.modal-close-btn');
  const bookingForm = document.getElementById('booking-inquiry-form');
  const serviceTriggers = document.querySelectorAll('[data-open-booking]');

  serviceTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'General Session Inquiry';
      openBookingModal(serviceName);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => bookingDialog.close());
  }

  bookingDialog.addEventListener('click', (e) => {
    const rect = bookingDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) bookingDialog.close();
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bk-name')?.value.trim() || 'Valued Client';
      const service = document.getElementById('bk-service')?.value || 'Portrait Session';
      const date = document.getElementById('bk-date')?.value || 'Flexible / Upcoming';
      const timeSlot = document.getElementById('bk-time')?.value || 'Morning / Afternoon';
      const pax = document.getElementById('bk-pax')?.value || '1';
      const notes = document.getElementById('bk-notes')?.value.trim();

      let message = `Hello Maymorii Studio! 📸\n\nI would like to enquire about booking a photo session:\n` +
        `• Name: ${name}\n` +
        `• Service Package: ${service}\n` +
        `• Number of Pax: ${pax} person(s)\n` +
        `• Preferred Date: ${date} (${timeSlot})\n`;

      if (notes) {
        message += `• Special Notes/Theme: ${notes}\n`;
      }

      message += `\nCould you please share your availability and package details? Thank you!`;

      const whatsappUrl = `https://wa.me/601116840840?text=${encodeURIComponent(message)}`;

      bookingDialog.close();
      showToast('Opening WhatsApp with your booking details...');
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 350);
    });
  }
}

function openBookingModal(defaultService = '') {
  const bookingDialog = document.getElementById('booking-dialog');
  if (!bookingDialog) return;

  const serviceSelect = document.getElementById('bk-service');
  if (serviceSelect && defaultService) {
    for (let option of serviceSelect.options) {
      if (option.text.toLowerCase().includes(defaultService.toLowerCase()) || 
          defaultService.toLowerCase().includes(option.value.toLowerCase())) {
        serviceSelect.value = option.value;
        break;
      }
    }
  }

  bookingDialog.showModal();
}

/* ==========================================================================
   6. INTERACTIVE CUSTOMER FEEDBACK FORM & REVIEWS
   ========================================================================== */
function initFeedbackForm() {
  const form = document.getElementById('client-feedback-form');
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingText = document.getElementById('rating-selected-text');
  const reviewsContainer = document.getElementById('dynamic-reviews-list');

  let currentRating = 5;

  const ratingDescriptions = {
    1: '1 Star — Needs Improvement',
    2: '2 Stars — Fair Experience',
    3: '3 Stars — Good Session',
    4: '4 Stars — Very Good & Pleased',
    5: '5 Stars — Outstanding & Loved It!'
  };

  starBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(btn.getAttribute('data-value'), 10);
      updateStarsVisual(hoverVal, true);
    });

    btn.addEventListener('mouseleave', () => {
      updateStarsVisual(currentRating, false);
    });

    btn.addEventListener('click', () => {
      currentRating = parseInt(btn.getAttribute('data-value'), 10);
      updateStarsVisual(currentRating, false);
      if (ratingText) {
        ratingText.textContent = ratingDescriptions[currentRating];
      }
    });
  });

  function updateStarsVisual(rating, isHover = false) {
    starBtns.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      if (val <= rating) {
        btn.classList.add(isHover ? 'hovered' : 'active');
      } else {
        btn.classList.remove('hovered');
        if (!isHover) btn.classList.remove('active');
      }
    });
  }

  // Load any previously saved reviews from localStorage
  loadSavedReviews();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('fb-name');
      const phoneInput = document.getElementById('fb-phone');
      const serviceInput = document.getElementById('fb-service');
      const textInput = document.getElementById('fb-comments');

      const name = nameInput.value.trim();
      const service = serviceInput.value || 'Studio Portrait Session';
      const comments = textInput.value.trim();

      if (!name || !comments) {
        showToast('Please fill in your name and feedback comments.');
        return;
      }

      const newReview = {
        name: name,
        service: service,
        rating: currentRating,
        comments: comments,
        date: 'Just now (Demo Submission)',
        verified: true
      };

      // Save to localStorage
      saveReviewLocally(newReview);

      // Prepend to DOM
      renderReviewCard(newReview, true);

      // Reset form
      form.reset();
      currentRating = 5;
      updateStarsVisual(5, false);
      if (ratingText) ratingText.textContent = ratingDescriptions[5];

      showToast(`Thank you, ${name}! Your 5.0★ feedback was added to the live demo preview.`);
    });
  }

  function saveReviewLocally(review) {
    try {
      let reviews = JSON.parse(localStorage.getItem('maymorii_demo_reviews') || '[]');
      reviews.unshift(review);
      localStorage.setItem('maymorii_demo_reviews', JSON.stringify(reviews));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }
  }

  function loadSavedReviews() {
    try {
      const stored = localStorage.getItem('maymorii_demo_reviews');
      if (stored) {
        const reviews = JSON.parse(stored);
        reviews.forEach(rev => renderReviewCard(rev, false));
      }
    } catch (err) {
      console.warn('Could not load stored reviews', err);
    }
  }

  function renderReviewCard(review, animate = false) {
    if (!reviewsContainer) return;

    const card = document.createElement('article');
    card.className = 'review-card user-submitted-review';
    if (animate) {
      card.style.animation = 'fadeInUp 0.5s ease forwards';
    }

    const initials = review.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'MC';

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= review.rating) {
        starsHtml += `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      } else {
        starsHtml += `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      }
    }

    card.innerHTML = `
      <div class="review-card-header">
        <div class="reviewer-meta">
          <div class="reviewer-avatar">${initials}</div>
          <div>
            <div class="reviewer-name">${escapeHTML(review.name)}</div>
            <div class="review-verified">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Verified Client • ${review.date}</span>
            </div>
          </div>
        </div>
        <div class="review-stars">${starsHtml}</div>
      </div>
      <p class="review-text">"${escapeHTML(review.comments)}"</p>
      <span class="review-tag">${escapeHTML(review.service)}</span>
    `;

    reviewsContainer.prepend(card);
  }
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   8. COPY ADDRESS TO CLIPBOARD
   ========================================================================== */
function initCopyAddress() {
  const copyBtns = document.querySelectorAll('[data-copy-address]');
  const addressString = 'Unit 12-32, 2, Jalan Desa Aman 1, Cheras Business Centre, Cheras, 56100 Kuala Lumpur';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addressString).then(() => {
          showToast('Studio address copied to clipboard!');
        }).catch(() => {
          fallbackCopy(addressString);
        });
      } else {
        fallbackCopy(addressString);
      }
    });
  });

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Studio address copied to clipboard!');
    } catch (err) {
      showToast('Address: ' + addressString);
    }
    document.body.removeChild(textarea);
  }
}

/* ==========================================================================
   9. GLOBAL TOAST HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${escapeHTML(message)}</span>
  `;

  toast.classList.add('show');

  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
