'use strict';

const mapPin = document.querySelector(`.map__pin--main`);

window.pageToggle.disableMap();

window.validateForm.eventListenerValidateCapacity();

mapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    window.pageToggle.enableMap();
  }
});

mapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    window.pageToggle.enableMap();
  }
});
