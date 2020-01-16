import AbstractComponent from './abstract-component.js';

const createFilmsTemplate = () => {
  return (
    `<section class="films-list js-films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container js-main-films__container"></div>
    </section>`
  );
};

export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
