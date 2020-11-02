'use strict';

(function () {
  const getRandom = (min, max) => Math.floor(min + Math.random() * (max - min));
  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
  const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length - 1));

  window.util = {
    getRandom,
    getRandomFrom,
    getRandomArray
  };
})();
