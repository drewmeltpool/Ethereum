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

const form = document.querySelector('#join');

form.addEventListener('submit', (e) => {
  const back = document.createElement('a');
  back.className = 'btn btn--default';
  back.href = 'index.html';
  back.textContent = 'Back';

  const title = document.createElement('h4');
  title.className = 'join__form--subtitle';
  title.textContent =
    'We have not updated your address, please try again later!';
  e.preventDefault();
  form.innerHTML = '';

  form.append(title);
  form.append(back);
});
