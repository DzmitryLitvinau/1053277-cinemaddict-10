import { getRandomIntegerNumber } from '../utils/common.js';
import { splitString } from '../utils/common.js';
import { getRandomNumber } from '../utils/common.js';
import { getRandomIntInclusive, getRandomDate } from '../utils/common.js';
import { generateComments } from './comments.js';

const COMMENTS_COUNT = 5;
const titleFilms = [
  `Inglourious Basterds`,
  `Interstellar`,
  `The Silence of the Lambs`,
  `The Life of David Gale`,
  `La vita è bella`,
  `American Beauty`,
  `Schindler's List`,
  `Requiem for a Dream`,
  `The Departed`,
  `Shutter Island`,
  `Léon`,
  `The Shawshank Redemption`,
  `No Country for Old Men`,
  `Sing Street`,
  `12 Years a Slave`,
];
const directorFilms = [
  `Stanley Kubrick`,
  `Martin Scorsese`,
  `David Lynch`,
  `Woody Allen`,
  `Ridley Scott`,
  `David Fincher`,
  `Darren Aronofsky`,
  `Quentin Tarantino`,
];

const writerFilms = [
  `Frank Darabont`,
  `Michael Mann`,
  `Sergio Leone`,
  `Joel Coen`,
  `Damien Chazelle`,
];

const actorFilms = [
  `Tom Hanks`,
  `Robert De Niro`,
  `Johnny Depp`,
  `Al Pacino`,
  `Leonardo DiCaprio`,
];
const countryFilms = [
  `USA`,
  `France`,
  `Belarus`,
  `Italy`,
  `Spain`,
];

const genreFilms = [
  `Action`,
  `Adventure`,
  `Comedys`,
  `Drama`,
  `Horror`,
  `Musical`,
  `Thriller`,
  `Western`,
];

const posterFilms = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const descriptionFilms = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const descriptionFilmsSeparator = `. `;

splitString(descriptionFilms, descriptionFilmsSeparator);

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDescription = (array, count) => {
  const randomLength = getRandomIntegerNumber(1, count);
  let randomDescription = ``;
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomIntegerNumber(0, array.length);
    randomDescription += `${array[randomIndex]}. `;
  }
  return randomDescription;
};

const getRandomString = (array, count = 5) => {
  const randomLength = getRandomIntegerNumber(1, count);
  let randomString = ``;
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomIntegerNumber(0, array.length);
    randomString += `${array[randomIndex]}, `;
  }
  return randomString;
};

const generateCard = () => {
  return {
    title: getRandomArrayItem(titleFilms),
    director: getRandomArrayItem(directorFilms),
    writers: getRandomString(writerFilms),
    actors: getRandomString(actorFilms),
    country: getRandomArrayItem(countryFilms),
    poster: getRandomArrayItem(posterFilms),
    age: getRandomIntInclusive(6, 18),
    rating: getRandomNumber(1, 10).toFixed(1),
    description: getRandomDescription(splitString(descriptionFilms, descriptionFilmsSeparator), 3),
    date: getRandomDate(),
    duration: getRandomIntegerNumber(0, 100000000),
    genre: getRandomArrayItem(genreFilms),
    isTopRated: Math.random() > 0.5,
    isMostCommented: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isInWatchlist: Math.random() > 0.5,
    commentsText: generateComments(COMMENTS_COUNT),
    commentsCount: getRandomIntegerNumber(0, 1000),
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export { getRandomArrayItem, generateCard, generateCards };


