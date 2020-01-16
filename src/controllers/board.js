import ShowMoreButtonComponent from '../components/show-more-button.js';
import NoCardsComponent from '../components/no-cards.js';
import CardsComponent from '../components/cards.js';
import TopRatedComponent from '../components/top-rated-films.js';
import MostCommentedComponent from '../components/most-commented-films.js';
import SortComponent, { SortType } from '../components/sort.js';
import MovieController from '../controllers/card.js';
import { RenderPosition, renderTemplate, remove } from '../utils/render.js';

const FilmCardValue = {
  TOP_RATED: 2,
  TOP_COMMENT: 2,
  FILM_CARDS_ON_START: 5,
  FILM_CARDS_BY_BUTTON: 5,
};

const renderCards = (cardListElement, cards, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(cardListElement, onDataChange, onViewChange);
    movieController.render(card);
    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._cards = [];
    this._showedCardControllers = [];
    this._showingCardsCount = FilmCardValue.FILM_CARDS_ON_START;
    this._showingTopRatedCardsCount = FilmCardValue.TOP_RATED;
    this._showingTopCommentedCardsCount = FilmCardValue.TOP_COMMENT;
    this._noCardsComponent = new NoCardsComponent();
    this._cardsComponent = new CardsComponent();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }
  render(cards) {
    this._cards = cards;
    const container = this._container.getElement();

    const isNoCards = this._cards.length === 0;
    if (isNoCards) {
      renderTemplate(container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }
    renderTemplate(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    if (this._cards.length) {
      renderTemplate(container, this._cardsComponent, RenderPosition.BEFOREEND);
      renderTemplate(container, this._topRatedComponent, RenderPosition.BEFOREEND);
      renderTemplate(container, this._mostCommentedComponent, RenderPosition.BEFOREEND);
      const allFilmscontainer = container.querySelector(`.js-main-films__container`);
      const topRatedFilmsContainer = this._container.getElement().querySelector(`.js-rated-films__container`);
      const topCommentedFilmsContainer = this._container.getElement().querySelector(`.js-commented-films__container`);
      const newCards = renderCards(allFilmscontainer, this._cards.slice(0, this._showingCardsCount), this._onDataChange, this._onViewChange);
      this._showedCardControllers = this._showedCardControllers.concat(newCards);
      this._renderLoadMoreButton();

      const topRatedCards = this._cards;
      const sortedTopRatedFilms = topRatedCards.sort((a, b) => {
        return b.rating - a.rating;
      });
      const topRatedFilms = renderCards(topRatedFilmsContainer, sortedTopRatedFilms.slice(0, this._showingTopRatedCardsCount), this._onDataChange, this._onViewChange);
      this._showedCardControllers = this._showedCardControllers.concat(topRatedFilms);

      const topCommentedCards = this._cards;
      const sortedTopCommentedFilms = topCommentedCards.sort((a, b) => {
        return b.comments - a.comments;
      });
      const topCommentedFilms = renderCards(topCommentedFilmsContainer, sortedTopCommentedFilms.slice(0, this._showingTopCommentedCardsCount), this._onDataChange, this._onViewChange);
      this._showedCardControllers = this._showedCardControllers.concat(topCommentedFilms);
    }
  }

  _renderLoadMoreButton() {
    if (this._showingCardsCount >= this._cards.length) {
      return;
    }
    const allFilmscontainer = this._container.getElement().querySelector(`.js-main-films__container`);
    renderTemplate(allFilmscontainer, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + FilmCardValue.FILM_CARDS_BY_BUTTON;
      const newCards = renderCards(allFilmscontainer, this._cards.slice(prevCardsCount, this._showingCardsCount), this._onDataChange, this._onViewChange);
      this._showedCardControllers = this._showedCardControllers.concat(newCards);

      if (this._showingCardsCount >= this._cards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    switch (sortType) {
      case SortType.RATING:
        sortedCards = this._cards.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DATE:
        sortedCards = this._cards.slice().sort((a, b) => b.date - a.date);
        break;
      case SortType.DEFAULT:
        sortedCards = this._cards.slice(0, this._showingCardsCount);
        break;
    }

    const allFilmscontainer = this._container.getElement().querySelector(`.js-main-films__container`);
    allFilmscontainer.innerHTML = ``;

    const newCards = renderCards(allFilmscontainer, sortedCards, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newCards;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._showMoreButtonComponent);
    }
  }
}
