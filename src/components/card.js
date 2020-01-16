import AbstractComponent from './abstract-component.js';
import { getFilmDuration } from '../utils/common.js';
const createFilmCardTemplate = (card) => {
  const { title, poster, rating, description, date, duration, genre, comments, isWatched, isFavorite, isInWatchlist } = card;
  const randomYear = date.getFullYear();
  const filmDuration = getFilmDuration(duration);
  const isWatchedFilm = isWatched ? `film-card__controls-item--active` : ``;
  const isFavoriteFilm = isFavorite ? `film-card__controls-item--active` : ``;
  const isInWatchlistFilm = isInWatchlist ? `film-card__controls-item--active` : ``;
  return (
    `<article class="film-card">
            <h3 class="film-card__title js-film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${randomYear}</span>
              <span class="film-card__duration">${filmDuration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src=${poster} alt="" class="film-card__poster js-film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments js-film-card__comments">${comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist js-film-card__controls-item--add-to-watchlist ${isInWatchlistFilm}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched js-film-card__controls-item--mark-as-watched ${isWatchedFilm}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite js-film-card__controls-item--favorite ${isFavoriteFilm}">Mark as favorite</button>
            </form>
          </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  setShowPopupClickHandler(handler) {
    this.getElement().querySelector(`.js-film-card__poster`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.js-film-card__title`)
      .addEventListener(`click`, handler);
    this.getElement().querySelector(`.js-film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.js-film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  addWatchListClickHandler(handler) {
    this.getElement().querySelector(`.js-film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  addFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.js-film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
