
const noneEffect = document.querySelector('#effect-none');
const uploadedPreviewPicture = document.querySelector('.img-upload__preview').querySelector('img');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderWrapper.querySelector('.effect-level__slider');
const effectValue = sliderWrapper.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const fileUploadInput = document.querySelector('.img-upload__input');

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
  uploadedPreviewPicture.removeAttribute('class');
  uploadedPreviewPicture.style.filter = 'none';
  noneEffect.checked = true;
};

const changeHandlerEffect = (evt) => {
  if (!evt.target.matches('#effect-none')) {
    sliderWrapper.style.display = 'block';
    for (const effect in effectNames) {
      if (evt.target.matches(`#effect-${effect}`)) {
        uploadedPreviewPicture.removeAttribute('class');
        uploadedPreviewPicture.classList.add(`effects__preview--${effect}`);
        break;
      }
    }
  } else {
    resetEffects();
  }
};

fileUploadInput.addEventListener('change', () => {
  sliderWrapper.style.display = 'none';
});

effectList.addEventListener('change', changeHandlerEffect);
noneEffect.addEventListener('click', () => sliderWrapper.style = 'display: none');

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
      uploadedPreviewPicture.style.filter = `${arr[element].filterName}(${value}${arr[element].unit})`;
      break;
    }
  }
};

effectList.addEventListener('change', (evt) => changeSetupFilters(evt, effectNames));
getLevelEffects(effectNames, effectValue.value);
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectValue.value = unencoded[handle];
});
