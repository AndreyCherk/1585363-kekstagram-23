const getRandomInteger = function(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const checkingStringlength = function(str, max) {
  return str.length <= max;
};

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const descriptionMessages = [
  'Это ужасно.',
  'Превосходно.',
  'Лучше удалите.',
  'Не делайте так больше никогда!',
  'Ваша работа - фотограф.',
]

const nameMessages = [
  'Артем.',
  'Олег.',
  'Наталья.',
  'Хашогги.',
  'Немезида.',
]

const comment = () => ({
  id: getRandomInteger(1, 200),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: commentMessages[getRandomInteger(0, commentMessages.length - 1)],
  name: nameMessages[getRandomInteger(0, nameMessages.length - 1)],
})

const photo = () => ({
  id: getRandomInteger(1, 25),
  url: `photo/${getRandomInteger(1, 25)}.jpg`,
  description: descriptionMessages[getRandomInteger(0, descriptionMessages.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: [...new Array(getRandomInteger(1, 2))].map(() => comment()),
})

const arrayOfPhotos = [...new Array( arrayLength: 25)].map(() => photo());
console.log(arrayOfPhotos);
