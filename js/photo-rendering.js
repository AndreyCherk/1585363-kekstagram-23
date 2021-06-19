import {arrayOfPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPhotos = arrayOfPhotos();
const photosListFragment = document.createDocumentFragment();

userPhotos.forEach (({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  picturesContainer.appendChild(pictureElement);
});

picturesContainer.appendChild(photosListFragment);
