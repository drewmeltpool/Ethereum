const convertMiliSecondsToSeconds = (miliSeconds) => (miliSeconds / 1000) % 60;

const convertMiliSecondsToMinutes = (miliSeconds) =>
  (miliSeconds / 1000 / 60) % 60;

const convertMiliSecondsToHours = (miliSeconds) =>
  (miliSeconds / 1000 / 3600) % 24;

const convertMiliSecondsToDays = (miliSeconds) =>
  miliSeconds / 1000 / 3600 / 24;

const addZero = (value) => (value < 10 ? '0' + value : value);

const { floor } = Math;

const timer = (duration) => {
  const func = {
    days: convertMiliSecondsToDays,
    hours: convertMiliSecondsToHours,
    minutes: convertMiliSecondsToMinutes,
    seconds: convertMiliSecondsToSeconds,
  };
  return Object.keys(func).reduce(
    (acc, key) => ({
      ...acc,
      [key]: addZero(floor(func[key](duration))),
    }),
    {}
  );
};
const calcDuration = (deadline) => deadline - new Date();

const startTimer = (block, duration) => {
  if (duration < 0) return;

  const blocks = [...block.querySelectorAll('[data-name]')].reduce(
    (acc, block) => ({
      ...acc,
      [block.dataset.name]: block,
    }),
    {}
  );

  const timerData = timer(duration);

  Object.entries(blocks).forEach(([key, block]) => {
    block.textContent = timerData[key];
  });

  setTimeout(() => startTimer(block, duration - 1000), 1000);
};

const headerTimer = document.querySelector('#header__timer');

const deadline = new Date('July 16, 2021 10:00:00');

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
});

startTimer(headerTimer, calcDuration(deadline));

const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar__list');
const body = document.body;

burger.addEventListener('click', () => {
  navbar.classList.toggle('navbar__list--active');
  body.classList.toggle('open-menu');
});

navbar.addEventListener('click', () => {
  navbar.classList.toggle('navbar__list--active');
  body.classList.toggle('open-menu');
});
