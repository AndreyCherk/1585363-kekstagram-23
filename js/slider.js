const NONE_EFFECT = 'none';
const imagePreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectsForm = document.querySelector('.img-upload__effects');

const effectNames = {
  chrome: {
    filterName: 'grayscale',
    htmlClass: 'effects__preview--chrome',
    unit: '',
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
  },
  sepia: {
    filterName: 'sepia',
    htmlClass: 'effects__preview--sepia',
    unit: '',
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
  },
  marvin: {
    filterName: 'invert',
    htmlClass: 'effects__preview--marvin',
    unit: '%',
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
  },
  phobos: {
    filterName: 'blur',
    htmlClass: 'effects__preview--phobos',
    unit: 'px',
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
  },
  heat: {
    filterName: 'brightness',
    htmlClass: 'effects__preview--heat',
    unit: '',
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
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
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', (_, values, handle) => {
    valueElement.value = values[handle];
});

effectsForm.addEventListener('click', (evt) => {


}
