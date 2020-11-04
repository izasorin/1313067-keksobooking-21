'use strict';

(function () {
  // const pins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const renderPin = (offer) => {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.style = `left: ${offer.location.x + pinElement.offsetWidth}px; top: ${offer.location.y + pinElement.offsetHeight}px;`;
    pinElement.querySelector(`img`).src = `${offer.author.avatar}`;
    pinElement.querySelector(`img`).alt = `${offer.offer.title}`;

    return pinElement;
  };

  window.renderPin = renderPin;
})();
