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

const deadline = new Date('July 17, 2021 18:00:00');

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
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const randomString = (length) => {
  const chars = '0123456789abcdef';
  let result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const transactionList = document.querySelector('.transaction__list');

const transactionListCreate = (len) => {
  const hashlen = 12;
  let timevalue = 0;
  const addres = '0xe92442f164...';
  transactionList.innerHTML = '';
  for (let i = 0; i < len; i++) {
    const eth = randFloat(10, 1000);
    const sendTo = randomString(hashlen);

    const from = document.createElement('p');
    from.textContent = addres;
    from.className = 'transaction__from';
    const item = document.createElement('div');
    item.className = 'transaction__item';
    const outTransaction = document.createElement('div');
    outTransaction.className = 'transaction__grid-item';
    const inTransaction = document.createElement('div');
    inTransaction.className = 'transaction__grid-item';

    const to = document.createElement('p');
    to.className = 'transaction__to';
    to.textContent = `${sendTo}...`;
    const value = document.createElement('p');
    value.textContent = eth + ' ETH';
    value.className = 'transaction__value';
    const time = document.createElement('p');
    time.textContent = timevalue === 0 ? 'right now' : timevalue + ' min';
    time.className = 'transaction__time';
    const text = document.createElement('p');
    text.textContent = 'OUT';
    text.className = 'transaction__text';

    const fromIn = document.createElement('p');
    fromIn.textContent = `${sendTo}...`;
    fromIn.className = 'transaction__from';
    const toIn = document.createElement('p');
    toIn.textContent = addres;
    toIn.className = 'transaction__to';
    const valueIn = document.createElement('p');
    valueIn.textContent = eth * 2 + ' ETH';
    valueIn.className = 'transaction__value';
    const timeIn = document.createElement('p');
    timeIn.textContent = timevalue === 0 ? 'right now' : timevalue + ' min';
    timeIn.className = 'transaction__time';
    const textIn = document.createElement('p');
    textIn.textContent = 'IN';
    textIn.className = 'transaction__text';

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

    item.append(outTransaction);
    item.append(inTransaction);

    transactionList.append(item);

    timevalue = isNaN(timevalue) ? 0 : timevalue;
    timevalue += randInt(3, 6);
  }
};

transactionListCreate(10);

const copy = () => {
  const btn = document.querySelector('.copy-btn');
  btn.addEventListener('click', () => {
    const input = document.querySelector('.address__text');
    input.select();
    document.execCommand('copy');
  });
};
copy();
