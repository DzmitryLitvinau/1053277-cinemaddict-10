const splitString = (stringToSplit, separator) => stringToSplit.split(separator);

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomNumber = (min, max) => {
  return (Math.random() * (max - min) + min);
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { splitString, getRandomIntegerNumber, getRandomNumber, getRandomIntInclusive };

