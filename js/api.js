const GET_SEND = 'https://23.javascript.pages.academy/kekstagram';
const GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess, onError) => {fetch(GET_DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then(onSuccess)
  .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(GET_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
