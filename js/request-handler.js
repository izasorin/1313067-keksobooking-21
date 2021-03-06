'use strict';

(function () {
  const pins = document.querySelector(`.map__pins`);

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635; color: white`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `24px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const successHandler = function (offers) {
    const fragment = document.createDocumentFragment();
    offers.map(window.renderPin).forEach((offer1) => fragment.appendChild(offer1));
    pins.appendChild(fragment);
  };

  window.Handler = {
    errorHandler,
    successHandler
  };
})();
