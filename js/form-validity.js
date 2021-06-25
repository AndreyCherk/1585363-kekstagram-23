const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 140;

const hashtagsInput = uploadPopup.querySelector(`.text__hashtags`);
const commentInput = uploadPopup.querySelector(`.text__description`);

const regExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

inputHashtags.addEventListener('input', () => {
  if (hashtagsInput.value) {
    const hashtags = hashtagsInput.value.toLowerCase().split(` `);
    hashtags.forEach((item, i) => {
      if (item === ``) {
        hashtags.splice(i, 1);
      }
    });

    if (hashtags.length > HASHTAGS_MAX_QUANTITY) {
      hashtagsInput.setCustomValidity(`Нельзя указать больше ${MAX_HASHTAGS} хэштегов`);
    } else {
      for (let i = 0; i < hashtags.length; i++) {
        if (hashtags.includes(hashtags[i], i + 1)) {
          hashtagsInput.setCustomValidity(`Один и тот же хэштег не может быть использован дважды`);
          break;
        } else if (hashtags[i][0] !== `#`) {
          hashtagsInput.setCustomValidity(`Хэштег должен начинаться с символа решётки`);
          break;
        } else if (hashtags[i].length === 1) {
          hashtagsInput.setCustomValidity(`Хэштег не должен состоять только из одной решётки`);
          break;
        } else if (!regExp.test(hashtags[i])) {
          hashtagsInput.setCustomValidity(`Хэштег не должен содержать специальных символов и максимальная длина одного хэш-тега 20 символов, включая решётку;`);
          break;
        } else {
          hashtagsInput.setCustomValidity(``);
        }
      }
    }
  } else {
    hashtagsInput.setCustomValidity(``);
  }

  hashtagsInput.reportValidity();
};

commentInput.addEventListener('input', () => {

  const valueLength = commentInput.value.length;

  if (valueLength > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity(`Удалите лишние ${valueLength - COMMENT_MAX_LENGTH} симв.`);
  } else {
    commentInput.setCustomValidity(``);
  }

  commentInput.reportValidity();
});
