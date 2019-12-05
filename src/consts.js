import { getRandomIntInclusive } from './util.js';

const getUserLevel = function () {
  const randomLevel = getRandomIntInclusive(0, 100);
  switch (Boolean(randomLevel)) {
    case randomLevel >= 1 && randomLevel <= 10:
      return `novice`;
    case randomLevel >= 11 && randomLevel <= 20:
      return `fan`;
    case randomLevel >= 21:
      return `movie buff`;
    case randomLevel === 0:
      return ``;
    default:
      throw new Error(`Неизвестный уровень: «` + randomLevel + `»`);
  }
};

const monthNames = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];


const commentImgNames = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/trophy.png`,
];

const commentText = [
  `Kill me please!`,
  `That ending made me piss`,
  `Waiting for the next series!`,
  `De Niro is the BEST!!!`
];

const commentAuthors = [
  `Ram Henry`,
  `Ronnie Murhpy`,
  `Craig Chee`,
  `Abram Detrov`,
  `Michael Kreen`,
];

const commentDates = [
  `2012/08/17 19:19`,
  `2018/10/29 21:00`,
  `2013/08/15 06:32`,
  `2019/12/19 14:42`,
  `2019/01/14 10:47`,
];

export {
  getUserLevel,
  monthNames,
  commentImgNames,
  commentText,
  commentAuthors,
  commentDates,
};


