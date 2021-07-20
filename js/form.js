import {picturePreview} from './scale-control.js';
import {isEscEvent} from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const formEditingPicture = document.querySelector('.img-upload__form');
const editingPicture = formEditingPicture.querySelector('.img-upload__overlay');
const loadingPicture = formEditingPicture.querySelector('#upload-file');
const uploadCancel = formEditingPicture.querySelector('#upload-cancel');
const uploadInputPicture = document.querySelector('.img-upload__input');

const onCloseEditingPicture = () => {
  body.classList.remove('modal-open');
  editingPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscKeydownEditingPicture);
  clearPhotosList();
};

const onEscKeydownEditingPicture = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onCloseEditingPicture();
  }
};

const onOpenEditingPicture = () => {
  body.classList.add('modal-open');
  editingPicture.classList.remove('hidden');

  uploadCancel.addEventListener('click', onCloseEditingPicture);
  document.addEventListener('keydown', onEscKeydownEditingPicture);
};

loadingPicture.addEventListener('click', (evt) => {
  if (!editingPicture.classList.contains('hidden')) {
    evt.preventDefault();
  }
});

loadingPicture.addEventListener('change', onOpenEditingPicture);

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

export {body};
