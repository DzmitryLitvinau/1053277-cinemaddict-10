import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import SortComponent from '../components/sort.js';
import { RenderPosition, renderTemplate, renderComments, remove } from '../utils/render.js';

const FilmCardValue = {
  TOP_RATED: 2,
  TOP_COMMENT: 2,
  FILM_CARDS_ON_START: 5,
  FILM_CARDS_BY_BUTTON: 5,
};

export const renderCardFilm = (container, card, place = RenderPosition.BEFOREEND) => {
  const filmCardComponent = new FilmCardComponent(card);
  const filmCardElement = filmCardComponent.getElement();
  const filmDetailsComponent = new FilmPopupComponent(card);
  const filmDetailsElement = filmDetailsComponent.getElement();

  renderComments(filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`));

  filmCardComponent.setShowPopupClickHandler(() => renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND));
  filmCardComponent.setShowPopupClickHandler(() => renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND));
  filmCardComponent.setShowPopupClickHandler(() => renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND));

  filmDetailsComponent.setClosePopupClickHandler(() => filmDetailsElement.remove());
  renderTemplate(container, filmCardElement, place);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }
  render(cards) {
    const allFilmscontainer = this._container.getElement().querySelector(`.js-main-films__container`);
    const topRatedFilmsContainer = this._container.getElement().querySelector(`.js-rated-films__container`);
    const topCommentedFilmsContainer = this._container.getElement().querySelector(`.js-commented-films__container`);

    let showingCardsCount = FilmCardValue.FILM_CARDS_ON_START;
    cards.slice(0, showingCardsCount).forEach((card) => renderCardFilm(allFilmscontainer, card, RenderPosition.BEFOREEND));

    renderTemplate(allFilmscontainer, this._showMoreButtonComponent.getElement(), RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingCardsCount;
      showingCardsCount = showingCardsCount + FilmCardValue.FILM_CARDS_BY_BUTTON;

      cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => renderCardFilm(allFilmscontainer, card, RenderPosition.BEFOREEND));

      if (showingCardsCount >= cards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
    const sortedTopRatedCards = cards;
    const sortedTopCommentedCards = cards;

    const topRatedFilms = sortedTopRatedCards.sort((a, b) => {
      return b.rating - a.rating;
    });
    topRatedFilms.slice(0, FilmCardValue.TOP_RATED).forEach((film) => renderCardFilm(topRatedFilmsContainer, film, RenderPosition.BEFOREEND));

    const topCommentedFilms = sortedTopCommentedCards.sort((a, b) => {
      return b.comments - a.comments;
    });
    topCommentedFilms.slice(0, FilmCardValue.TOP_COMMENT).forEach((film) => renderCardFilm(topCommentedFilmsContainer, film, RenderPosition.BEFOREEND));

  }
}
