/**
 * app.js — Spider-Man Fan Zone
 *
 * Handles:
 *  1. Typewriter animation on the hero subtitle
 *  2. Navbar scroll behaviour (solid background when scrolled)
 *  3. Hamburger mobile menu toggle
 *  4. Scroll-triggered reveal animations (IntersectionObserver)
 *  5. Parallax effect on hero background blobs
 *  6. Thwip! web-shooting animation
 *  7. Click-anywhere spider-web burst animation
 */

(function () {
  'use strict';

  /* =========================================================================
     1. TYPEWRITER EFFECT
     Cycles through an array of phrases, typing them out one character at a
     time, pausing, then erasing — giving the impression of a live prompt.
     ========================================================================= */
  const phrases = [
    'Your friendly neighbourhood Spider-Man fan zone 🕷️',
    'With great power comes great web-slinging.',
    'Step into the Spider-Verse — right here, right now.',
    '"Anyone can wear the mask." — Spider-Man: Into the Spider-Verse',
  ];

  const typewriterEl = document.getElementById('typewriter');

  if (typewriterEl) {
    let phraseIndex  = 0;
    let charIndex    = 0;
    let isDeleting   = false;
    const TYPE_SPEED = 55;   // ms per character when typing
    const DEL_SPEED  = 30;   // ms per character when deleting
    const PAUSE_END  = 1800; // ms to pause at the end of a phrase
    const PAUSE_START = 400; // ms to pause before typing new phrase

    function typeStep() {
      const phrase  = phrases[phraseIndex];
      const display = isDeleting
        ? phrase.slice(0, charIndex - 1)
        : phrase.slice(0, charIndex + 1);

      typewriterEl.textContent = display;

      if (!isDeleting && display === phrase) {
        // Finished typing — pause then start deleting
        setTimeout(() => {
          isDeleting = true;
          typeStep();
        }, PAUSE_END);
        return;
      }

      if (isDeleting && display === '') {
        // Finished deleting — move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeStep, PAUSE_START);
        return;
      }

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setTimeout(typeStep, isDeleting ? DEL_SPEED : TYPE_SPEED);
    }

    // Kick off after a short delay so the page has painted
    setTimeout(typeStep, 800);
  }

  /* =========================================================================
     2. NAVBAR — solid background on scroll
     ========================================================================= */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* =========================================================================
     3. HAMBURGER MENU
     ========================================================================= */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================================================
     4. SCROLL-REVEAL with IntersectionObserver
     Elements with the class `.reveal-item` start invisible (see style.css).
     When they enter the viewport, we add `.revealed` to trigger the CSS
     transition (fade-in + slide-up).
     ========================================================================= */
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Stop watching once revealed
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealItems.forEach(function (item) {
      item.classList.add('revealed');
    });
  }

  /* =========================================================================
     5. PARALLAX on hero blobs
     On every scroll event we move `.blob` elements at a fraction of the
     scroll distance, creating a gentle depth effect.
     ========================================================================= */
  const parallaxEls = document.querySelectorAll('.parallax-bg');

  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      parallaxEls.forEach(function (el) {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
        el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }, { passive: true });
  }

  /* =========================================================================
     6. THWIP! WEB-SHOOTING ANIMATION
     Clicking the Thwip button fires several "web strands" from the centre of
     the screen that radiate outward and fade away.
     ========================================================================= */
  const thwipBtn     = document.getElementById('thwipBtn');
  const thwipOverlay = document.getElementById('thwipOverlay');

  /** Minimum and maximum length of each Thwip! web strand (px) */
  const MIN_STRAND_LENGTH      = 120;
  const STRAND_LENGTH_VARIANCE = 160;

  /**
   * Fires `count` web strands radiating outward from (cx, cy).
   * @param {number} cx   - Origin x (px from left)
   * @param {number} cy   - Origin y (px from top)
   * @param {number} count - Number of strands
   */
  function fireThwip(cx, cy, count) {
    if (!thwipOverlay) return;

    for (let i = 0; i < count; i++) {
      const angleDeg = (360 / count) * i + Math.random() * 10;
      const length   = MIN_STRAND_LENGTH + Math.random() * STRAND_LENGTH_VARIANCE;
      const strand   = document.createElement('div');

      strand.className = 'thwip-strand';
      strand.style.left      = cx + 'px';
      strand.style.top       = cy + 'px';
      strand.style.width     = length + 'px';
      strand.style.transform = 'rotate(' + angleDeg + 'deg)';
      strand.style.background = i % 2 === 0
        ? 'linear-gradient(90deg, #E23636, transparent)'
        : 'linear-gradient(90deg, #2C5EA8, transparent)';

      thwipOverlay.appendChild(strand);

      // Remove the strand element after its animation completes
      strand.addEventListener('animationend', function () {
        strand.remove();
      });
    }
  }

  if (thwipBtn && thwipOverlay) {
    thwipBtn.addEventListener('click', function (e) {
      // Ripple effect on the button itself
      const rect   = thwipBtn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width  = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
      thwipBtn.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });

      // Fire web strands from the centre of the viewport
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      fireThwip(cx, cy, 16);
    });
  }

  /* =========================================================================
     7. CLICK-ANYWHERE SPIDER-WEB BURST
     Every click (outside the navbar) spawns a small burst of lines that
     radiate from the click position, mimicking a tiny web explosion.
     ========================================================================= */
  const burstContainer = document.getElementById('burstContainer');

  /**
   * Creates a burst of `lineCount` lines at coordinates (x, y).
   * @param {number} x
   * @param {number} y
   */
  function spawnBurst(x, y) {
    if (!burstContainer) return;

    const lineCount = 8;
    const burst = document.createElement('div');
    burst.className = 'burst';
    burst.style.left = x + 'px';
    burst.style.top  = y + 'px';

    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      line.className = 'burst-line';
      const angle = (360 / lineCount) * i;
      line.style.setProperty('--angle', angle + 'deg');
      line.style.background = i % 2 === 0 ? '#E23636' : '#2C5EA8';
      burst.appendChild(line);
    }

    burstContainer.appendChild(burst);

    // Clean up after animation
    setTimeout(function () { burst.remove(); }, 600);
  }

  document.addEventListener('click', function (e) {
    // Don't trigger burst inside the navbar
    if (navbar && navbar.contains(e.target)) return;
    spawnBurst(e.clientX, e.clientY);
  });

  // Also allow keyboard activation of the demo area
  const demoArea = document.getElementById('demoArea');
  if (demoArea) {
    demoArea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const rect = demoArea.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    });
  }

})();
