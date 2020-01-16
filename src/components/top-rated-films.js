import AbstractComponent from './abstract-component.js';

const createTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container js-rated-films__container"></div>
    </section>`
  );
};

export default class TopRatedComponent extends AbstractComponent {
  getTemplate() {
    return createTopRatedTemplate();
  }
}
