'use strict';

(function () {
  const TIMEOUT_IN_MS = 10000;

  const URL = {
    load: `https://21.javascript.pages.academy/keksobooking/data`
  };

  const StatusCode = {
    OK: 200
  };

  const loadData = (onSuccess, onError, method, url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Ошибка: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send();
  };

  const load = (onSuccess, onError) => loadData(onSuccess, onError, `GET`, URL.load);

  window.backend = {
    load
  };
})();
