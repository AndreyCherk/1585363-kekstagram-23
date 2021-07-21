import {picturePreview} from './scale-control.js'

const sliderContainer = document.querySelector('.img-upload__effect-level');
const noneEffect = document.querySelector('#effect-none');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const uploadInputPicture = document.querySelector('.img-upload__input');

const effectNames = {
  chrome: {
    filterName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filterName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filterName: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filterName: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filterName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const resetEffects = () => {
  picturePreview.removeAttribute('class');
  picturePreview.style.filter = 'none';
  noneEffect.checked = true;
};

const changeHandlerEffect = (evt) => {
  if (!evt.target.matches('#effect-none')) {
    sliderContainer.style.display = 'block';
    for (const effect in effectNames) {
      if (evt.target.matches(`#effect-${effect}`)) {
        picturePreview.removeAttribute('class');
        picturePreview.classList.add(`effects__preview--${effect}`);
        break;
      }
    }
  } else {
    resetEffects();
  }
};

uploadInputPicture.addEventListener('change', () => {
  sliderContainer.style.display = 'none';
});

effectList.addEventListener('change', changeHandlerEffect);
noneEffect.addEventListener('click', () => {
  sliderContainer.style = 'display: none';
});

const changeSetupFilters = (filter, arr) => {
  for (const element in arr) {
    if (filter.target.matches(`#effect-${element}`)) {
      sliderElement.noUiSlider.updateOptions(arr[element].options);
      break;
    }
  }
};

const getLevelEffects = (arr, value) => {
  for (const element in arr) {
    if (effectList.querySelector(`#effect-${element}`).checked) {
      picturePreview.style.filter = `${arr[element].filterName}(${value}${arr[element].unit})`;
      break;
    }
  }
};

effectList.addEventListener('change', (evt) => changeSetupFilters(evt, effectNames));

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectValue.value = unencoded[handle];
  getLevelEffects(effectNames, effectValue.value);
});

export{resetEffects};
