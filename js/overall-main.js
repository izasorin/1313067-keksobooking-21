'use strict';

/* Удалю файл на следующем этапе */

const OFFERS_QUANTITY = 8;

const ROOMS_TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalo`
];

const ROOMS_QUANTITY = [`1`, `2`, `3`, `100`];

const GUESTS_QUANTITY = [`0`, `1`, `2`, `3`];

const SETTLEMENT_HOURS = [`12:00`, `13:00`, `14:00`];

const ROOM_FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const ROOM_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const PIN_SIZE = {
  WIDTH: 62,
  HEIGHT: 84
};
const map = document.querySelector(`.map`);
const pins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const mainForm = document.querySelector(`.ad-form`);
const formElements = document.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelector(`.map__filters`);
const mapPin = document.querySelector(`.map__pin--main`);
const addressInput = mainForm.querySelector(`input[name='address']`);

const guestsQuantity = mainForm.querySelector(`[name='capacity']`);
const roomsQuantity = mainForm.querySelector(`[name='rooms']`);

const getRandom = (min, max) => Math.floor(min + Math.random() * (max - min));
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length - 1));

const generateOffer = () => {
  const location = {
    x: getRandom(0, map.offsetWidth),
    y: getRandom(130, 650)
  };

  return {
    author: {
      avatar: `img/avatars/user0${getRandom(1, 8)}.png`
    },
    offer: {
      title: `строка, заголовок предложения`,
      address: `${location.x}, ${location.y}`,
      price: getRandom(MIN_PRICE, MAX_PRICE),
      type: getRandomFrom(ROOMS_TYPE),
      rooms: getRandomFrom(ROOMS_QUANTITY),
      guests: getRandomFrom(GUESTS_QUANTITY),
      checkin: getRandomFrom(SETTLEMENT_HOURS),
      checkout: getRandomFrom(SETTLEMENT_HOURS),
      features: getRandomArray(ROOM_FEATURES),
      description: `строка с описанием`,
      photos: getRandomArray(ROOM_PHOTOS)
    },
    location: {
      x: location.x,
      y: location.y
    }
  };
};

const generateOffers = (amount) => new Array(amount).fill(``).map(generateOffer);

const renderPin = (offer) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style = `left: ${offer.location.x + pinElement.offsetWidth}px; top: ${offer.location.y + pinElement.offsetHeight}px;`;
  pinElement.querySelector(`img`).src = `${offer.author.avatar}`;
  pinElement.querySelector(`img`).alt = `${offer.offer.title}`;

  return pinElement;
};

const renderPins = (offers) => {
  const fragment = document.createDocumentFragment();
  offers.map(renderPin).forEach((offer1) => fragment.appendChild(offer1));
  return fragment;
};

const offers = generateOffers(OFFERS_QUANTITY);

const toggleElements = (elements, enabled) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !enabled;
  }
};

const getAddressCoords = () => {
  const coordsX = mapPin.offsetLeft + PIN_SIZE.WIDTH / 2;
  const coordsY = mapPin.offsetTop + PIN_SIZE.HEIGHT;
  return `${Math.floor(coordsX)}, ${Math.floor(coordsY)}`;
};

const validateCapacity = () => {
  const guests = guestsQuantity.value;
  const rooms = roomsQuantity.value;

  if (guests > 0 && rooms === `100`) {
    roomsQuantity.setCustomValidity(`Вариант не для гостей`);
  } else if (guests === `0` && rooms !== `100`) {
    roomsQuantity.setCustomValidity(`Для не гостей у нас только 100 комнат ^__^`);
  } else if (guests > rooms) {
    roomsQuantity.setCustomValidity(`Вам нужен вариант побольше`);
  } else {
    roomsQuantity.setCustomValidity(``);
    // eslint-disable-next-line no-console
    console.log('ok');
  }
};

const eventListenerValidateCapacity = () => {
  guestsQuantity.addEventListener(`change`, () => {
    validateCapacity(guestsQuantity);
  });
  roomsQuantity.addEventListener(`change`, () => {
    validateCapacity(roomsQuantity);
  });
};

const getInactiveMap = () => {
  map.classList.add(`map--faded`);
  mainForm.classList.add(`ad-form--disabled`);
  toggleElements(formElements, false);
  toggleElements(mapFilters, false);
  addressInput.value = getAddressCoords();
};

const getActiveMap = () => {
  map.classList.remove(`map--faded`);
  mainForm.classList.remove(`ad-form--disabled`);
  toggleElements(formElements, true);
  toggleElements(mapFilters, true);
  pins.appendChild(renderPins(offers));
  eventListenerValidateCapacity();
};

getInactiveMap();

mapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    getActiveMap();
  }
});

mapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    getActiveMap();
  }
});
