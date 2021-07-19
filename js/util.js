const getRandomInteger = function(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const checkingStringlength = function(str, max) {
  return str.length <= max;
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {checkingStringlength, isEscEvent, showAlert, debounce, getRandomInteger};
