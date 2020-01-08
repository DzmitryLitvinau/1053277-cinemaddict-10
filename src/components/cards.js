import AbstractComponent from './abstract-component.js';

const createCardsTemplate = () => {
  return (
    `<section class="films-list js-films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container js-main-films__container"></div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container js-rated-films__container"></div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container js-commented-films__container"></div>
    </section>`
  );
};

export default class Cards extends AbstractComponent {
  getTemplate() {
    return createCardsTemplate();
  }
}
