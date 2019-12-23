import { createElement } from '../util.js';

const createFilterTemplate = (filter) => {
  const { name, count } = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const filtersTemplate = filters.map((it, i) => createFilterTemplate(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filtersTemplate}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
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
