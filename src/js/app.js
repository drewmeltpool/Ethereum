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

const deadline = new Date('July 15, 2021 17:00:00');

startTimer(headerTimer, calcDuration(deadline));

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

const randFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const randomString = (length) => {
  const chars = '0123456789abcdef';
  let result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

console.log(randomString(64));

const transactionList = document.querySelector('.transaction__list');

const transactionListCreate = (len) => {
  transactionList.innerHTML = '';
  for (let i = 0; i < len; i++) {
    const table = document.createElement('table');
    table.className = 'transaction__table';
    const item = document.createElement('div');
    item.className = 'transaction__item';
    const outTransaction = document.createElement('tr');
    const inTransaction = document.createElement('tr');

    const from = document.createElement('td');
    from.textContent = randomString(24);
    const to = document.createElement('td');
    to.textContent = randomString(24);
    const value = document.createElement('td');
    value.textContent = randFloat(10, 1000) + ' ETH';
    const time = document.createElement('td');
    time.textContent = '3 min';
    const text = document.createElement('td');
    text.textContent = 'OUT';

    const fromIn = document.createElement('td');
    fromIn.textContent = randomString(24);
    const toIn = document.createElement('td');
    toIn.textContent = randomString(24);
    const valueIn = document.createElement('td');
    valueIn.textContent = randFloat(10, 1000) + ' ETH';
    const timeIn = document.createElement('td');
    timeIn.textContent = '3 min';
    const textIn = document.createElement('td');
    textIn.textContent = 'OUT';

    outTransaction.append(from);
    outTransaction.append(text);
    outTransaction.append(to);
    outTransaction.append(time);
    outTransaction.append(value);

    inTransaction.append(fromIn);
    inTransaction.append(textIn);
    inTransaction.append(toIn);
    inTransaction.append(timeIn);
    inTransaction.append(valueIn);

    table.append(outTransaction);
    table.append(inTransaction);
    item.append(table);
    transactionList.append(item);
  }
};

transactionListCreate(10);
