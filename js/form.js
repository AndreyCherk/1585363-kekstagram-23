import {picturePreview, setScale} from './scale-control.js';
import {isEscEvent} from './util.js';
import {sendData} from './api.js';
import {resetEffects} from './slider.js';
import {hashtagsInput, commentInput} from './form-validity.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_SCALE_VALUE = 100;

const body = document.querySelector('body');
const editingPicture = document.querySelector('.img-upload__overlay');
const uploadInputPicture = document.querySelector('.img-upload__input');
const uploadCancelPicture = document.querySelector('.img-upload__cancel');
const userUploadForm = document.querySelector('.img-upload__form');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');

const onEscKeydownEditingPicture = (evt) => {
  if (isEscEvent(evt)) {
    if (hashtagsInput === document.activeElement || commentInput === document.activeElement) {
      evt.preventDefault();
    } else {
      userUploadForm.reset();
      onCloseEditingPicture();
      document.removeEventListener('keydown', onEscKeydownEditingPicture);
    }
  }
};

const onOpenEditingPicture = () => {
  body.classList.add('modal-open');
  editingPicture.classList.remove('hidden');
  setScale(DEFAULT_SCALE_VALUE);
  document.addEventListener('keydown', onEscKeydownEditingPicture);
  resetEffects();
};

function onCloseEditingPicture () {
  uploadInputPicture.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';

  editingPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydownEditingPicture);
}

uploadInputPicture.addEventListener('change', () => {
  onOpenEditingPicture();
});

uploadCancelPicture.addEventListener('click', () => {
  onCloseEditingPicture();
});

const onPopupEventHandler = (evt) => {
  if (isEscEvent(evt)) {
    document.body.lastChild.remove();
  } else if (evt.target === document.body.lastChild) {
    document.body.lastChild.remove();
  }
};


const onPopupClickHandler = () => {
  document.body.lastChild.remove();
};

document.removeEventListener('click', onPopupClickHandler);
document.removeEventListener('keydown', onPopupEventHandler);


const onPopupOpenHandler = (template, button) => {
  onCloseEditingPicture();
  document.body.append(template);

  document.removeEventListener('keydown', onEscKeydownEditingPicture);

  button.addEventListener('click', onPopupClickHandler);
  document.addEventListener('keydown', onPopupEventHandler);
  document.addEventListener('click', onPopupClickHandler);
};

const setUserFormSubmit = () => {
  userUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onPopupOpenHandler(successPopup, successButton),
      () => onPopupOpenHandler(errorPopup, errorButton),
      new FormData(evt.target),
    );
  });
};

uploadInputPicture.addEventListener('change', () => {
  const file = uploadInputPicture.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picturePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export {body, setUserFormSubmit, onCloseEditingPicture};
