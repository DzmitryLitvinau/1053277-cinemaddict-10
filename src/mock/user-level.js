import { getRandomIntInclusive } from '../utils/common.js';

export const getUserLevel = function () {
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
