import {getData} from './api.js';
import {openBigPictureHandler} from './big-picture.js';
import {showAlert, getRandomInteger, debounce} from './util.js';

const NUMBER_RANDOM_PICTURES = 10;
const RENDER_THROTTLE_DELAY = 500;

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filtersForm = document.querySelector('.img-filters__form');
const filterDefaultButton = filtersForm.querySelector('#filter-default');
const filterRandomButton = filtersForm.querySelector('#filter-random');
const filterDiscussedButton = filtersForm.querySelector('#filter-discussed');

const photoRendering = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPictureHandler(picture);
  });

  return pictureElement;
};


const photosRender = (pictures) => {
  const fragmentPicture = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const elementPicture = photoRendering(picture);
    fragmentPicture.appendChild(elementPicture);
  });

  picturesContainer.appendChild(fragmentPicture);
};

const generateDefaultPhoto = (pictures) => {
  const defaultPhoto = pictures.sort((a, b) => a.id > b.id ? 1 : -1);
  return defaultPhoto;
};

const generateDiscussionPhoto = (defaultArray) => {
  const discussionPhotoArray = defaultArray.slice(0);
  discussionPhotoArray.sort((a, b) => b.comments.length - a.comments.length);
  return discussionPhotoArray;
};


const generateRandomPhoto = (defaultArray) => {
  const newCommentsArray = defaultArray.slice(0);
  return getRandomInteger(newCommentsArray).slice(0, NUMBER_RANDOM_PICTURES);
};


const filterClickButton = (classRemove, classRemoveSecond, classAdd) => {
  classRemove.classList.remove('img-filters__button--active');
  classRemoveSecond.classList.remove('img-filters__button--active');
  classAdd.classList.add('img-filters__button--active');
};

const createPhotos = (debounce(
  (photosArray) => {
    picturesContainer.querySelectorAll('.picture').forEach((photo) => {
      photo.remove();
    });
    photosRender(photosArray, pictureTemplate);
  },
  RENDER_THROTTLE_DELAY,
));

getData(
  (data) => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    createPhotos(data);

    filtersForm.addEventListener('click', (evt) => {
      switch (evt.target.id) {
        case 'filter-default':
          filterClickButton(filterRandomButton, filterDiscussedButton, filterDefaultButton);
          createPhotos(generateDefaultPhoto(data));
          break;
        case 'filter-random':
          filterClickButton(filterDefaultButton, filterDiscussedButton, filterRandomButton);
          createPhotos(generateRandomPhoto(data));
          break;
        case 'filter-discussed':
          filterClickButton(filterRandomButton, filterDefaultButton, filterDiscussedButton);
          createPhotos(generateDiscussionPhoto(data));
          break;
      }
    });
  },
  () => {
    showAlert('Не удалось загрузить данные с сервера');
  });
