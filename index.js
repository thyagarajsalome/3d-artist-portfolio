/**
 * ============================================================
 *  3D Artist Portfolio — Main Script
 *  Sections:
 *  1.  Custom Cursor
 *  2.  Navigation Toggle (Mobile)
 *  3.  Active Nav Link on Scroll
 *  4.  Back to Top Button
 *  5.  Footer Year
 *  6.  Reveal on Scroll (IntersectionObserver)
 *  7.  Stat Counter Animation
 *  8.  Skills Pills
 *  9.  Gallery Grid
 * 10.  Lightbox
 * ============================================================
 */

(function () {
  'use strict';

  /* ============================================================
     1. CUSTOM CURSOR
  ============================================================ */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  function animateRing() {
    ringX += (parseFloat(cursor.style.left || 0) - ringX) * 0.12;
    ringY += (parseFloat(cursor.style.top  || 0) - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();


  /* ============================================================
     2. NAVIGATION TOGGLE (MOBILE)
  ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });


  /* ============================================================
     3. ACTIVE NAV LINK ON SCROLL
  ============================================================ */
  const sections   = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentId
      );
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* ============================================================
     4. BACK TO TOP BUTTON
  ============================================================ */
  const backTop = document.getElementById('backTop');

  window.addEventListener(
    'scroll',
    () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    },
    { passive: true }
  );


  /* ============================================================
     5. FOOTER YEAR
  ============================================================ */
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();


  /* ============================================================
     6. REVEAL ON SCROLL
  ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


  /* ============================================================
     7. STAT COUNTER ANIMATION
  ============================================================ */
  function animateCounter(el, target) {
    const duration = 2000;
    let startTime  = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.ceil(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = +entry.target.dataset.target;
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-num[data-target]').forEach((el) => {
    counterObserver.observe(el);
  });


  /* ============================================================
     8. SKILLS PILLS
  ============================================================ */
  const SKILLS = [
    { icon: 'view_in_ar',      label: '3D Modeling'     },
    { icon: 'image',           label: '3D Rendering'    },
    { icon: 'palette',         label: 'Texturing'       },
    { icon: 'home',            label: 'Architectural'   },
    { icon: 'architecture',    label: 'SketchUp 3D'     },
    { icon: 'design_services', label: 'Product Design'  },
    { icon: 'light_mode',      label: 'Lighting'        },
    { icon: 'view_quilt',      label: '3ds Max & V-Ray' },
    { icon: 'drafts',          label: 'AutoCAD'         },
    { icon: 'photo_camera',    label: 'Photoshop'       },
    { icon: 'code',            label: 'Programming'     },
    { icon: 'weekend',         label: 'Interior Design' },
    { icon: 'celebration',     label: 'Event & Theming' },
    { icon: 'movie',           label: 'Video Editing'   },
  ];

  const pillsContainer = document.getElementById('skillsPills');

  if (pillsContainer) {
    const fragment = document.createDocumentFragment();

    SKILLS.forEach(({ icon, label }) => {
      const pill = document.createElement('div');
      pill.className = 'skill-pill';
      pill.setAttribute('role', 'listitem');
      pill.innerHTML = `<span class="material-icons" aria-hidden="true">${icon}</span>${label}`;
      fragment.appendChild(pill);
    });

    pillsContainer.appendChild(fragment);
  }


  /* ============================================================
     9. GALLERY GRID
  ============================================================ */
  const TOTAL_IMAGES = 50;
  const galleryGrid  = document.getElementById('galleryGrid');
  const imagePaths   = [];

  if (galleryGrid) {
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
      const src = `./assets/${i}.webp`;
      imagePaths.push(src);

      // Format display number: 001, 002, ... 050
      const displayNum = String(i).padStart(3, '0');

      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.index = i - 1;
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', `Open image ${displayNum}`);

      item.innerHTML = `
        <img src="${src}" alt="3D Render ${displayNum}" loading="lazy"/>
        <div class="gi-overlay" aria-hidden="true">
          <span class="gi-num">${displayNum}</span>
        </div>
      `;

      fragment.appendChild(item);
    }

    galleryGrid.appendChild(fragment);

    // Keyboard support for gallery items
    galleryGrid.addEventListener('keydown', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openLightbox(+item.dataset.index);
      }
    });
  }


  /* ============================================================
     10. LIGHTBOX
  ============================================================ */
  let currentIndex = 0;

  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');
  const lbPrev   = document.getElementById('lbPrev');
  const lbNext   = document.getElementById('lbNext');

  function openLightbox(index) {
    currentIndex = ((index % TOTAL_IMAGES) + TOTAL_IMAGES) % TOTAL_IMAGES;
    lbImg.src    = imagePaths[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prevImage() { openLightbox(currentIndex - 1); }
  function nextImage() { openLightbox(currentIndex + 1); }

  // Open on gallery click
  if (galleryGrid) {
    galleryGrid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (item) openLightbox(+item.dataset.index);
    });
  }

  // Lightbox controls
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  prevImage);
  lbNext.addEventListener('click',  nextImage);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    switch (e.key) {
      case 'Escape':      closeLightbox(); break;
      case 'ArrowLeft':   prevImage();     break;
      case 'ArrowRight':  nextImage();     break;
    }
  });

})();
