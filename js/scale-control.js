const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_STEP = 25;

const scaleControlValue = document.querySelector('.scale__control--value');
const downControl = document.querySelector('.scale__control--smaller');
const upControl = document.querySelector('.scale__control--bigger');
const picturePreview = document.querySelector('.img-upload__preview img');

let currentScale = 100;

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  picturePreview.style = `transform: scale(${value / 100})`;
  currentScale = value;
};

const onDownControlClickHandler = () => {
  if (currentScale > SCALE_MIN_VALUE) {
    currentScale -= SCALE_STEP;
    setScale(currentScale);
  }
};

const onUpControlHandler = () => {
  if (currentScale < SCALE_MAX_VALUE) {
    currentScale += SCALE_STEP;
    setScale(currentScale);
  }
};

downControl.addEventListener('click', onDownControlClickHandler);
upControl.addEventListener('click', onUpControlHandler);


export {picturePreview, setScale};
