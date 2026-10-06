/* -- NAVIGATION MENU TOGGLE -- */
const navMenu = document.querySelector('.nav-menu');
const navMenuBtn = document.querySelector('.nav-menu-btn');

if (navMenuBtn) {
  navMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof ScrollReveal !== 'undefined') {
    const srTop = ScrollReveal({
      origin: 'top',
      distance: '50px',
      duration: 1500,
      reset: false
    });

    srTop.reveal('.about-hero', { delay: 100 });
    srTop.reveal('.origin-story-section', { delay: 150 });
    srTop.reveal('.section-title', { delay: 100 });
    srTop.reveal('.feature-card', { interval: 150 });
    srTop.reveal('.seigi', { delay: 150 });
    srTop.reveal('.image', { delay: 250 });
    srTop.reveal('.claire', { delay: 350 });
  }
});