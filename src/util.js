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

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 31);
  targetDate.setFullYear(getRandomIntInclusive(1900, 2019));
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const formatDate = (date) => `${date.toLocaleString(`en-GB`, { day: `numeric`, month: `long`, year: `numeric` })}`;

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export { splitString, getRandomIntegerNumber, getRandomNumber, getRandomIntInclusive, getRandomDate, formatDate, createElement };


