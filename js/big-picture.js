import {body} from './form.js';
import {isEscEvent} from './util.js';

const NUMBER_OF_COMMENTS = 5;

const PICTURE_SIZE = 35;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesPicture = document.querySelector('.likes-count');
const commentsPicture = document.querySelector('.comments-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const descriptionPicture = document.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const loadMoreCommentButton = document.querySelector('.comments-loader');

let commentsBigPicture = [];

const createElement = (comments, template) => {
  const commentItem =  document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentRandom = template.cloneNode(true);

    commentRandom.querySelector('.social__picture').src = comment.avatar;
    commentRandom.querySelector('.social__picture').alt = comment.name;
    commentRandom.querySelector('.social__picture').width = PICTURE_SIZE;
    commentRandom.querySelector('.social__picture').height = PICTURE_SIZE;
    commentRandom.querySelector('.social__text').textContent = comment.message;

    commentItem.appendChild(commentRandom);
  });

  return commentItem;
};

const removeComments = () => {
  bigPictureContainer.querySelectorAll('.social__comment').forEach((element) => {
    element.remove();
  });
};

const createComments = (comments) => {

  const initialComments = comments.slice(0, NUMBER_OF_COMMENTS);

  socialCommentCount.firstChild.textContent = `${initialComments.length  } из  `;
  commentsContainer.appendChild(createElement(initialComments, commentTemplate));

  if (initialComments.length === comments.length) {
    loadMoreCommentButton.classList.add('hidden');
  }
};

const fragmentCreateComments = () => {
  const commentsCountShow = commentsBigPicture.slice(commentsContainer.children.length, commentsContainer.children.length + NUMBER_OF_COMMENTS);

  commentsContainer.appendChild(createElement(commentsCountShow, commentTemplate));

  if (commentsBigPicture.length === commentsContainer.children.length) {
    loadMoreCommentButton.classList.add('hidden');
  }
  socialCommentCount.firstChild.textContent = `${commentsContainer.children.length  } из  `;
};


const onPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  bigPictureImg.src = data.url;
  commentsPicture.textContent = data.comments.length;
  likesPicture.textContent = data.likes;
  descriptionPicture.textContent = data.description;

  commentsContainer.innerHTML = '';
  commentsBigPicture = data.comments;
  document.addEventListener('keydown', onPictureEscKeydown);
  loadMoreCommentButton.addEventListener('click', fragmentCreateComments);
  createComments(data.comments);
};

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPictureEscKeydown);
  loadMoreCommentButton.classList.remove('hidden');
  loadMoreCommentButton.removeEventListener('click', fragmentCreateComments);
}

const onPictureKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onPictureKeydown);
  }
};

const openBigPictureHandler = (dataObject) => {
  removeComments();
  openBigPicture(dataObject);
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPictureKeydown);
};

const pictureClose = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onPictureKeydown);
};

closeBigPictureButton.addEventListener('click', () => {
  pictureClose();
});

export {openBigPictureHandler};
