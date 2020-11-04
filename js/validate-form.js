'use strict';

(function () {
  const mainForm = document.querySelector(`.ad-form`);
  const guestsQuantity = mainForm.querySelector(`[name='capacity']`);
  const roomsQuantity = mainForm.querySelector(`[name='rooms']`);

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

  window.validateForm = {
    eventListenerValidateCapacity
  };
})();
