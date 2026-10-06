const navMenu = document.querySelector('.nav-menu');
const navMenuBtn = document.querySelector('.nav-menu-btn');

navMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});


/* -- CONTACTS SCROLL REVEAL -- */
document.addEventListener('DOMContentLoaded', () => {

  // ScrollReveal Initialization
  const srBottom = ScrollReveal({
    origin: 'bottom',
    distance: '80px',
    duration: 2000,
    reset: true,
});

//CONTACT US
srBottom.reveal('.contacts-content', {});


});

//js for submit form
