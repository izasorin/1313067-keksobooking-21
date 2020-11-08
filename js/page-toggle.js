'use strict';

(function () {
  const PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 84
  };

  const map = document.querySelector(`.map`);
  const mainForm = document.querySelector(`.ad-form`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapPin = document.querySelector(`.map__pin--main`);
  const addressInput = mainForm.querySelector(`input[name='address']`);

  const getAddressCoords = () => {
    const coordsX = mapPin.offsetLeft + PIN_SIZE.WIDTH / 2;
    const coordsY = mapPin.offsetTop + PIN_SIZE.HEIGHT;
    return `${Math.floor(coordsX)}, ${Math.floor(coordsY)}`;
  };

  const toggleElements = (elements, enabled) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = !enabled;
    }
  };

  const disableMap = () => {
    map.classList.add(`map--faded`);
    mainForm.classList.add(`ad-form--disabled`);
    toggleElements(formElements, false);
    toggleElements(mapFilters, false);
    addressInput.value = getAddressCoords();
  };

  const enableMap = () => {
    map.classList.remove(`map--faded`);
    mainForm.classList.remove(`ad-form--disabled`);
    toggleElements(formElements, true);
    toggleElements(mapFilters, true);
    window.backend.load(window.handler.successHandler, window.handler.errorHandler);
    window.validateForm.eventListenerValidateCapacity();
  };

  window.pageToggle = {
    disableMap,
    enableMap
  };
})();
