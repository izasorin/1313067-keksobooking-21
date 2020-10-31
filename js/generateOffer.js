'use strict';

(function () {
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

  const map = document.querySelector(`.map`);

  const generateOffer = () => {
    const location = {
      x: window.util.getRandom(0, map.offsetWidth),
      y: window.util.getRandom(130, 650)
    };

    return {
      author: {
        avatar: `img/avatars/user0${window.util.getRandom(1, 8)}.png`
      },
      offer: {
        title: `строка, заголовок предложения`,
        address: `${location.x}, ${location.y}`,
        price: window.util.getRandom(MIN_PRICE, MAX_PRICE),
        type: window.util.getRandomFrom(ROOMS_TYPE),
        rooms: window.util.getRandomFrom(ROOMS_QUANTITY),
        guests: window.util.getRandomFrom(GUESTS_QUANTITY),
        checkin: window.util.getRandomFrom(SETTLEMENT_HOURS),
        checkout: window.util.getRandomFrom(SETTLEMENT_HOURS),
        features: window.util.getRandomArray(ROOM_FEATURES),
        description: `строка с описанием`,
        photos: window.util.getRandomArray(ROOM_PHOTOS)
      },
      location: {
        x: location.x,
        y: location.y
      }
    };
  };

  const generateOffers = (amount) => new Array(amount).fill(``).map(generateOffer);

  const offers = generateOffers(OFFERS_QUANTITY);

  window.generateOffer = {
    offers
  };
})();
