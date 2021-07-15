const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar__list');
const html = document.querySelector('html');

const chechWidth = () => {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  if (width < 950) {
    burger.onclick = () => {
      navbar.classList.toggle('navbar__list--active');
      html.classList.toggle('open-menu');
    };

    navbar.onclick = () => {
      navbar.classList.toggle('navbar__list--active');
      html.classList.toggle('open-menu');
    };
  } else {
    burger.onclick = () => {};
    navbar.onclick = () => {};
  }
};

window.addEventListener('resize', chechWidth);
window.addEventListener('DOMContentLoaded', chechWidth);
