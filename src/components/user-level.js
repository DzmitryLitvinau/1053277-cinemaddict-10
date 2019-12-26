import { getUserLevel } from '../mock/user-level.js';
import AbstractComponent from './abstract-component.js';

const createUserLevelTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${getUserLevel()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserLevel extends AbstractComponent {
  constructor(level) {
    super();
    this._level = level;
  }

  getTemplate() {
    return createUserLevelTemplate(this._level);
  }
}
