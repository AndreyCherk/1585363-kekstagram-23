import {checkingStringlength} from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 140;

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const checkHashtagValidity = (inputElement) => {
  const hashtags = inputElement.value.replace(/ +/g, ' ').trim().toLowerCase().split(' ');
  hashtags.forEach((item) => {
    const regExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
    if (hashtags.length > MAX_HASHTAGS) {
      inputElement.setCustomValidity('Максимум 5 хэштэгов');
    } else if (item === '#') {
      inputElement.setCustomValidity('Хештэг не может состоять только из одной решётки');
    } else if (item[0] !== '#') {
      inputElement.setCustomValidity('Хэтэги должны начинаться с символа "#"');
    } else if (!regExp.test(item)) {
      inputElement.setCustomValidity('Максимум 20 символов: одна "#", кириллические и латинские буквы, цифры 0-9');
    } else if (hashtags.indexOf(item) !== hashtags.lastIndexOf(item)) {
      inputElement.setCustomValidity('Хэштэги не должны повторяться (регистр не учитывается)');
    } else {
      inputElement.setCustomValidity('');
      hashtagsInput.style = 'outline: black auto 2px';
    }
  });
  inputElement.reportValidity();
};

hashtagsInput.addEventListener('input', () => {
  checkHashtagValidity(hashtagsInput);
});

hashtagsInput.addEventListener('invalid', () => {
  hashtagsInput.style = 'outline: red auto 2px';
});

commentInput.addEventListener('input', () => {
  if (checkingStringlength(commentInput.value, MAX_SYMBOLS) === false) {
    commentInput.setCustomValidity(`Длина комментария не должна превышать ${MAX_SYMBOLS} символов`);
    commentInput.style.border = '2px solid red';
  } else {
    commentInput.setCustomValidity('');
    commentInput.style.border = 'none';
  }

  commentInput.reportValidity();
});

export {hashtagsInput, commentInput};
