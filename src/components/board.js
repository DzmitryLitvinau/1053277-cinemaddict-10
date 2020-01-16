import AbstractComponent from './abstract-component.js';

const createBoardTemplate = () => {
  return (
    `<section class="films js-films">
    </section>`
  );
};

export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
