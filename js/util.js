const getRandomInteger = (pictures) => {
  for (let i = pictures.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
  }
  return pictures;
};

const checkingStringlength = (string, maxLength) => {string.length <= maxLength;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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

export {isEscEvent, showAlert, debounce, getRandomInteger, checkingStringlength};
