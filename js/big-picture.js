import {body} from './form.js';
import {isEscEvent} from './util.js';


const SocialClassName = {
  COMMENT: 'social__comment',
  PICTURE: 'social__picture',
  TEXT: 'social__text',
}

const NUMBER_OF_COMMENTS = 5;

const SizePicture = {
  WIDTH: 35,
  HEIGHT: 35,
}

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img').querySelector('img');
const likesPicture = bigPictureContainer.querySelector('.likes-count');
const commentsPicture = bigPictureContainer.querySelector('.comments-count');
const socialCommentCount = bigPictureContainer.querySelector('.social__comment-count');
const closeBigPictureButton = bigPictureContainer.querySelector('.big-picture__cancel');
const descriptionPicture = bigPictureContainer.querySelector('.social__caption');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const loadMoreCommentButton = bigPictureContainer.querySelector('.comments-loader');

let commentsBigPicture = [];

const createElement = (picture) => {
  const commentItemt =  document.createElement('li');
  commentItemt.classList.add(SocialClassName.COMMENT);

  const commentPicture = document.createElement('img');
  commentPicture.classList.add(SocialClassName.PICTURE);
  commentPicture.src = picture.url;
  commentPicture.alt = picture.name;
  commentPicture.width = SizePicture.WIDTH;
  commentPicture.height = SizePicture.HEIGHT;

  const commentMassage = document.createElement('p');
  commentMassage.classList.add(SocialClassName.TEXT);
  commentMassage.textContent = picture.message;

  commentItemt.appendChild(commentPicture);
  commentItemt.appendChild(commentMassage);
  commentsContainer.appendChild(commentItemt);
};

const createComments = (comments) => comments.forEach(createElement);

const FragmentCreateComments = () => {
  const commentsCountShow = document.querySelectorAll(SocialClassName.COMMENT);

  createComments(commentsBigPicture.slice(commentsCountShow, commentsCountShow + NUMBER_OF_COMMENTS));

  const numberComments = document.querySelectorAll(SocialClassName.COMMENT).length;
  if (numberComments === commentsBigPicture.length) {
    loadMoreCommentButton.classList.add('hidden');
  } else {
    loadMoreCommentButton.classList.remove('hidden');
  }
  socialCommentCount.innerHTML = `${numberComments} из <span class="comments-count">${commentsBigPicture.length}</span> комментариев`;
};

const onPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPictureEscKeydown);
};

const openBigPicture = (data) => {
  bigPictureImg.src = data.url;
  commentsPicture.textContent = data.comments;
  likesPicture.textContent = data.likes;
  descriptionPicture.textContent = data.description;

  commentsContainer.innerHTML = '';
  commentsBigPicture = data.comments;
  FragmentCreateComments(data.comments);

  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  socialCommentCount.classList.remove('hidden');
  loadMoreCommentButton.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEscKeydown);
};

closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

loadMoreCommentButton.addEventListener('click', () => {
  FragmentCreateComments();
});
