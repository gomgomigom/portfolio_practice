'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

// Handle scrolling when tapping on the "Contact me" button
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// scrollIntoView function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// Make home slowly fade to transparent as the window scrolls down
const homeContainer = document.querySelector('.home__container');
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight) {
    return;
  }
  homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

// Handle click on the "arrow up" button
const ArrowUp = document.querySelector('.arrow-up');
ArrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// Show "arrow up" button when scrolling down
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    ArrowUp.classList.add('visible');
  } else {
    ArrowUp.classList.remove('visible');
  }
});
