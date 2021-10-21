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

// navbar border

const aboutHeight = about.getBoundingClientRect().height;
const skillsHeight = skills.getBoundingClientRect().height;
const workHeight = work.getBoundingClientRect().height;
const testimonialsHeight = testimonials.getBoundingClientRect().height;
const contactHeight = contact.getBoundingClientRect().height;

const navbarMenuItems = document.querySelectorAll('.navbar__menu__item');
navbarMenu.addEventListener('click', e => {
  // navbarMenuItems.forEach(navbarMenuItem => {
  //   navbarMenuItem.classList.remove('selected');
  // });
  // e.target.classList.add('selected');
  makeBorder(navbarMenuItems, e);
});

function makeBorder(a, e) {
  a.forEach(item => {
    item.classList.remove('selected');
  });
  e.target.classList.add('selected');
}

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

const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('selected');
  selectedNavItem = selected;
  selectedNavItem.classList.add('selected');
}

// scrollIntoView function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
