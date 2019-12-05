import { createFilmCardTemplate } from './components/card.js';
import { createMainNavigationTemplate } from './components/main-navigation.js';
import { createSortTemplate } from './components/sort.js';
import { createBoardTemplate } from './components/board.js';
import { createUserLevelTemplate } from './components/user-level.js';
import { createFilmDetailsPopupTemplate } from './components/film-details-popup.js';
import { createShowMoreButtonTemplate } from './components/show-more-button.js';
import { generateCards } from './mock/film-card.js';
import { generateFilters } from './mock/filter.js';

const FilmCardValue = {
  FILM_CARDS_COUNT: 20,
  TOP_RATED: 2,
  TOP_COMMENT: 2,
  FILM_CARDS_ON_START: 5,
  FILM_CARDS_BY_BUTTON: 5,
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.js-main`);
const siteHeaderElement = document.querySelector(`.js-header`);

renderTemplate(siteHeaderElement, createUserLevelTemplate(), `beforeend`);
const filters = generateFilters();
renderTemplate(siteMainElement, createMainNavigationTemplate(filters), `beforeend`);
renderTemplate(siteMainElement, createSortTemplate(), `beforeend`);
renderTemplate(siteMainElement, createBoardTemplate(), `beforeend`);

const mainFilmListElement = siteMainElement.querySelector(`.js-main-films__container`);
const cards = generateCards(FilmCardValue.FILM_CARDS_COUNT);
let showingCardsCount = FilmCardValue.FILM_CARDS_ON_START;
cards.slice(0, showingCardsCount).forEach((card) => renderTemplate(mainFilmListElement, createFilmCardTemplate(card), `beforeend`));

renderTemplate(mainFilmListElement, createShowMoreButtonTemplate(), `afterend`);
const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FilmCardValue.FILM_CARDS_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => renderTemplate(mainFilmListElement, createFilmCardTemplate(card), `beforeend`));

  if (showingCardsCount >= cards.length) {
    loadMoreButton.remove();
  }
});

const sortedTopRatedCards = cards;
const sortedTopCommentedCards = cards;

const topRatedFilmListElement = siteMainElement.querySelector(`.js-rated-films__container`);
const topRatedFilms = sortedTopRatedCards.sort((a, b) => {
  return b.rating - a.rating;
});
for (let i = 0; i < FilmCardValue.TOP_RATED; i++) {
  renderTemplate(topRatedFilmListElement, createFilmCardTemplate(topRatedFilms[i]), `beforeend`);
}

const topCommentedFilmListElement = siteMainElement.querySelector(`.js-commented-films__container`);
const topCommentedFilms = sortedTopCommentedCards.sort((a, b) => {
  return b.comments - a.comments;
});
for (let i = 0; i < FilmCardValue.TOP_COMMENT; i++) {
  renderTemplate(topCommentedFilmListElement, createFilmCardTemplate(topCommentedFilms[i]), `beforeend`);
}

const siteFooterElement = document.querySelector(`.js-footer`);
renderTemplate(siteFooterElement, createFilmDetailsPopupTemplate(cards[0]), `afterend`);

const filmsPopup = document.querySelectorAll(`.js-film-details`);
filmsPopup.forEach((filmPopup) => {
  filmPopup.classList.add(`visually-hidden`);
});

const filmsOverall = siteFooterElement.querySelector(`.js-footer__statistics > p`);
filmsOverall.textContent = `${cards.length} movies inside`;
