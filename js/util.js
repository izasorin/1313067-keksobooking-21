'use strict';

(function () {
  const getRandom = (min, max) => Math.floor(min + Math.random() * (max - min));
  const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];
  const getRandomArray = (arr) => arr.slice(getRandom(0, arr.length - 1));
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };
  const getPartOfArray = (arr, amount) => shuffleArray(arr).slice(0, amount);

  window.util = {
    getRandom,
    getRandomFrom,
    getRandomArray,
    getPartOfArray
  };
})();
