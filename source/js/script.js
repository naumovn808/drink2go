// код для выпадающего меню

(function openMenu() {
  const toggle = document.querySelector('.main-nav__toggle')
  toggle.className = 'main-nav__toggle toggle-close';
  document.querySelector('.header').className = 'header container';
  const menu = document.querySelector('.nav__list-menu');
  menu.className = 'nav__list-menu';


  const open = () => {

    if (toggle.classList.contains("toggle-close")) {
      menu.className = 'nav__list-menu display-block';
      toggle.className = 'main-nav__toggle toggle-open';
    } else {
      toggle.className = 'main-nav__toggle toggle-close';
      menu.className = 'nav__list-menu';
    }

  }

  document.querySelector('.main-nav__button').onclick = open

})()

// код для  слайдера
const slideElements = [...document.querySelectorAll('.slide')];
const buttonPrevElement = document.querySelector('.slider__button-left');
const buttonNextElement = document.querySelector('.slider__button-right');
const slidesAmount = slideElements.length;

let currentIndex = 0;

const slideMove = () => {
  const activeSlideElement = document.querySelector('.slide.active');
  activeSlideElement.classList.remove('active');
  slideElements[currentIndex].classList.add('active');
}

buttonPrevElement.addEventListener('click', () => {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = slidesAmount - 1;
  }
  slideMove();
  slideDots(currentIndex);
});

buttonNextElement.addEventListener('click', () => {

  currentIndex++;

  if (currentIndex === slidesAmount) {
    currentIndex = 0;
  }
  slideMove();
  slideDots(currentIndex);
});

const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));
const sliderDotsActive = 'slider__dot-active';

const slideDots = (index) => {
  sliderDots.forEach((elem, index) => {
    elem.classList.remove(sliderDotsActive);
  })
  sliderDots[index].classList.add(sliderDotsActive);
}

document.querySelector('.slider__dots').addEventListener('click', (evt) => {
  const activeSlideElement = document.querySelector('.slide.active');

  const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));
  if (evt.target.matches('.slider__dot')) {
    let index = sliderDots.indexOf(evt.target);

    activeSlideElement.classList.remove('active');
    slideElements[index].classList.add('active');

    slideDots(index);

  }
})

// карта

const map = L.map('map')
  .setView({
    lat: 59.96831,
    lng: 30.31748,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [38, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

//slider-range
const sliderRange = document.querySelector('.slider-range');

const rangeToggleMin = document.querySelector('.toggle-min');
const rangeToggleMax = document.querySelector('.toggle-max');

const rangeMin = document.querySelector('.range-gray');
const rangeMax = document.querySelector('.range-bar ');

const inputMin = document.querySelector('.range-input-min');
const inputMax = document.querySelector('.range-input-max');

const moveRangeMin = (evt) => {

  evt.preventDefault();

  let left = evt.clientX - sliderRange.getBoundingClientRect().left;
  let percent = left / sliderRange.offsetWidth * 100;

  if (percent < 0) {
    percent = 0;
  }
  if (percent > 95) {
    percent = 95
  }

  rangeMin.style.width = `${percent+5}%`;
  rangeToggleMin.style.left = `${percent}%`;

  inputMin.value = Math.round(45 + percent * (inputMax.max/100));
}

const moveRangeMax = (evt) => {

  evt.preventDefault();

  let left = evt.clientX - sliderRange.getBoundingClientRect().left;
  let percent = left / sliderRange.offsetWidth * 100;

  if (percent < 0) {
    percent = 0;
  }
  if (percent > 95) {
    percent = 95;
  }

  rangeMax.style.width = `${percent}%`;
  rangeToggleMax.style.left = `${percent}%`;

  inputMax.value = Math.round(45 + percent * (inputMax.max/100));
}

rangeToggleMin.addEventListener('pointerdown', (evt) => {
  evt.preventDefault();
  rangeToggleMin.setPointerCapture(evt.pointerId);

  sliderRange.addEventListener('pointermove', moveRangeMin)

})

rangeToggleMax.addEventListener('pointerdown', (evt) => {
  evt.preventDefault();
  rangeToggleMax.setPointerCapture(evt.pointerId);

  sliderRange.addEventListener('pointermove', moveRangeMax)

})

rangeToggleMin.addEventListener('pointerup', (evt) => {

  sliderRange.removeEventListener('pointermove', moveRangeMin)
})

rangeToggleMax.addEventListener('pointerup', (evt) => {

  sliderRange.removeEventListener('pointermove', moveRangeMax)
})
