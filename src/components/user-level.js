import { getUserLevel } from '../mock/user-level.js';
import { createElement } from '../util.js';

const createUserLevelTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${getUserLevel()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserLevel {
  constructor(level) {
    this._level = level;
    this._element = null;
  }

  getTemplate() {
    return createUserLevelTemplate(this._level);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
