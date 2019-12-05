import { commentText, commentImgNames, commentAuthors, commentDates } from '../consts.js';
import { getRandomArrayItem } from '../mock/film-card.js';

const generateComment = () => {
  return {
    text: getRandomArrayItem(commentText),
    imgName: getRandomArrayItem(commentImgNames),
    author: getRandomArrayItem(commentAuthors),
    date: getRandomArrayItem(commentDates),
  };
};

const generateComments = (count) => new Array(count)
  .fill(``)
  .map(generateComment);

export { generateComments };
