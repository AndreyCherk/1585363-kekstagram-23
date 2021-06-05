const getRandomInteger = function(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

getRandomInteger();

const checkingStringlength = function(str, max) {
  return str.length <= max;
};

checkingStringlength();
