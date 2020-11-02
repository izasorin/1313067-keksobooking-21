'use strict';

const mapPin = document.querySelector(`.map__pin--main`);

window.pageToggle.getInactiveMap();

window.validateForm.eventListenerValidateCapacity();

mapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    window.pageToggle.getActiveMap();
  }
});

mapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    window.pageToggle.getActiveMap();
  }
});
