import BoardComponent from './components/board.js';
import NavigationFilterComponent from './components/main-navigation.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import SortComponent from './components/sort.js';
import UserLevelComponent from './components/user-level.js';
import { generateCards } from './mock/film-card.js';
import { generateFilters } from './mock/filter.js';
// import { RenderPosition, renderTemplate } from './util.js';
import { renderCardFilm, RenderPosition, renderTemplate } from './utils/render.js';

const FilmCardValue = {
  FILM_CARDS_COUNT: 20,
  TOP_RATED: 2,
  TOP_COMMENT: 2,
  FILM_CARDS_ON_START: 5,
  FILM_CARDS_BY_BUTTON: 5,
};

const siteMainElement = document.querySelector(`.js-main`);
const siteHeaderElement = document.querySelector(`.js-header`);

renderTemplate(siteHeaderElement, new UserLevelComponent().getElement(), RenderPosition.BEFOREEND);
const filters = generateFilters();
renderTemplate(siteMainElement, new NavigationFilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardElement = boardComponent.getElement();
renderTemplate(siteMainElement, boardElement, RenderPosition.BEFOREEND);

const mainFilmListElement = boardElement.querySelector(`.js-main-films__container`);

const cards = generateCards(FilmCardValue.FILM_CARDS_COUNT);
let showingCardsCount = FilmCardValue.FILM_CARDS_ON_START;
cards.slice(0, showingCardsCount).forEach((card) => renderCardFilm(mainFilmListElement, card, RenderPosition.BEFOREEND));

const showMoreButtonComponent = new ShowMoreButtonComponent();
const showMoreButtonElement = showMoreButtonComponent.getElement();
renderTemplate(mainFilmListElement, showMoreButtonElement, RenderPosition.AFTEREND);

showMoreButtonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FilmCardValue.FILM_CARDS_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => renderCardFilm(mainFilmListElement, card, RenderPosition.BEFOREEND));

  if (showingCardsCount >= cards.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
});

const sortedTopRatedCards = cards;
const sortedTopCommentedCards = cards;

const topRatedFilmListElement = siteMainElement.querySelector(`.js-rated-films__container`);
const topRatedFilms = sortedTopRatedCards.sort((a, b) => {
  return b.rating - a.rating;
});
for (let i = 0; i < FilmCardValue.TOP_RATED; i++) {
  renderCardFilm(topRatedFilmListElement, topRatedFilms[i], RenderPosition.BEFOREEND);
}

const topCommentedFilmListElement = siteMainElement.querySelector(`.js-commented-films__container`);
const topCommentedFilms = sortedTopCommentedCards.sort((a, b) => {
  return b.comments - a.comments;
});
for (let i = 0; i < FilmCardValue.TOP_COMMENT; i++) {
  renderCardFilm(topCommentedFilmListElement, topCommentedFilms[i], RenderPosition.BEFOREEND);
}

const siteFooterElement = document.querySelector(`.js-footer`);

const filmsOverall = siteFooterElement.querySelector(`.js-footer__statistics > p`);
filmsOverall.textContent = `${cards.length} movies inside`;
