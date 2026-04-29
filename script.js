/* =====================================================
   Omar Amin Abdelrazek — Portfolio
   Tiny vanilla JS for nav, scroll behavior, and reveals
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // close mobile nav on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth-scroll fallback (older Safari) ---------- */
  // CSS handles this, but add nudge for fixed nav offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('.nav-wrapper')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Reveal-on-scroll (subtle fade up) ---------- */
  const revealEls = document.querySelectorAll(
    '.section-head, .about-grid, .project, .skill-group, .contact-grid, .docs-block'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // graceful fallback
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
});
