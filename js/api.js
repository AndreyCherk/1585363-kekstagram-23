import {showAlert} from './util.js';

const GET_SEND = 'https://23.javascript.pages.academy/kekstagram';
const GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess) => {
  fetch(GET_DATA)
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера, попробуйте еще раз');
    });
};

const sendData = (onSuccess, downloadStatus, errorStatus, body) => {

  fetch(GET_SEND,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
        downloadStatus();
      } else {
        errorStatus();
      }
    })
    .catch(() => {
      errorStatus;
    });
};

export {getData, sendData};
