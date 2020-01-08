import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-details-popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import NoCardsComponent from '../components/no-cards.js';
import SortComponent, { SortType } from '../components/sort.js';
import { RenderPosition, renderTemplate, renderComments, remove } from '../utils/render.js';

const FilmCardValue = {
  TOP_RATED: 2,
  TOP_COMMENT: 2,
  FILM_CARDS_ON_START: 5,
  FILM_CARDS_BY_BUTTON: 5,
};

export const renderCardFilm = (cardListElement, card, place = RenderPosition.BEFOREEND) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsElement.remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const filmCardComponent = new FilmCardComponent(card);
  const filmCardElement = filmCardComponent.getElement();
  const filmDetailsComponent = new FilmPopupComponent(card);
  const filmDetailsElement = filmDetailsComponent.getElement();

  renderComments(filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`));

  filmCardComponent.setShowPopupClickHandler(() => {
    document.addEventListener(`keydown`, onEscKeyDown);
    renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND);
  });

  filmDetailsComponent.setClosePopupClickHandler(() => filmDetailsElement.remove());
  renderTemplate(cardListElement, filmCardElement, place);
};

const renderCards = (cardListElement, cards) => {
  cards.forEach((card) => {
    renderCardFilm(cardListElement, card);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noCardsComponent = new NoCardsComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }
  render(cards) {
    const container = this._container.getElement();

    const isNoCards = cards.every((card) => card.title);
    if (!isNoCards) {
      renderTemplate(container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }
    renderTemplate(container, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);

    const allFilmscontainer = this._container.getElement().querySelector(`.js-main-films__container`);
    const topRatedFilmsContainer = this._container.getElement().querySelector(`.js-rated-films__container`);
    const topCommentedFilmsContainer = this._container.getElement().querySelector(`.js-commented-films__container`);
    // const cardListElement = this.container.getElement();
    let showingCardsCount = FilmCardValue.FILM_CARDS_ON_START;
    /* cards.slice(0, showingCardsCount).forEach((card) => renderCardFilm(allFilmscontainer, card, RenderPosition.BEFOREEND)); */
    renderCards(allFilmscontainer, cards.slice(0, showingCardsCount));

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.RATING:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.date - a.date);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardsCount);
          break;
      }
      allFilmscontainer.innerHTML = ``;
      renderCards(allFilmscontainer, sortedCards);
      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._showMoreButtonComponent);
      }
    });
    const renderLoadMoreButton = () => {
      renderTemplate(allFilmscontainer, this._showMoreButtonComponent.getElement(), RenderPosition.AFTEREND);

      this._showMoreButtonComponent.setClickHandler(() => {
        if (showingCardsCount >= cards.length) {
          return;
        }
        const prevTasksCount = showingCardsCount;
        showingCardsCount = showingCardsCount + FilmCardValue.FILM_CARDS_BY_BUTTON;

        cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => renderCardFilm(allFilmscontainer, card, RenderPosition.BEFOREEND));

        if (showingCardsCount >= cards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };
    renderLoadMoreButton();
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
