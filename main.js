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
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// navbar border
const navbarMenuItems = document.querySelectorAll('.navbar__menu__item');
navbarMenu.addEventListener('click', e => {
  navbarMenuItems.forEach(navbarMenuItem => {
    navbarMenuItem.classList.remove('selected');
  });
  e.target.classList.add('selected');
  setTimeout(() => {
    e.target.classList.remove('selected');
  }, 600);
});

// Handle scrolling when tapping on the "Contact me" button
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

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

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection frome the previous item and select new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach(project => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// scrollIntoView function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
