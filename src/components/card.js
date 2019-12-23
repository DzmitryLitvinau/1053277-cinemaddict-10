import { createElement } from '../util.js';

const createFilmCardTemplate = (card) => {
  const { title, poster, rating, description, date, duration, genre, comments } = card;
  const randomYear = date.getFullYear();
  return (
    `<article class="film-card">
            <h3 class="film-card__title js-film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${randomYear}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src=${poster} alt="" class="film-card__poster js-film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments js-film-card__comments">${comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
            </form>
          </article>`
  );
};

export default class FilmCard {
  constructor(card) {
    this._card = card;

    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
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

