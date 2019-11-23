import {createFilmCardTemplate} from './components/card.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createBoardTemplate} from './components/board.js';
import {createUserLevelTemplate} from './components/user-level.js';
import {createFilmDetailsPopupTemplate} from './components/film-details-popup.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';

const FilmCardValue = {
  FILM_CARDS_COUNT: 5,
  TOP_RATED: 2,
  TOP_COMMENT: 2,
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.js-main`);
const siteHeaderElement = document.querySelector(`.js-header`);

renderTemplate(siteHeaderElement, createUserLevelTemplate(), `beforeend`);
renderTemplate(siteMainElement, createMainNavigationTemplate(), `beforeend`);
renderTemplate(siteMainElement, createSortTemplate(), `beforeend`);
renderTemplate(siteMainElement, createBoardTemplate(), `beforeend`);

const mainFilmListElement = siteMainElement.querySelector(`.js-main-films__container`);

for (let i = 0; i < FilmCardValue.FILM_CARDS_COUNT; i++) {
  renderTemplate(mainFilmListElement, createFilmCardTemplate(), `beforeend`);
}

renderTemplate(mainFilmListElement, createShowMoreButtonTemplate(), `afterend`);

const topRatedFilmListElement = siteMainElement.querySelector(`.js-rated-films__container`);

for (let i = 0; i < FilmCardValue.TOP_RATED; i++) {
  renderTemplate(topRatedFilmListElement, createFilmCardTemplate(), `beforeend`);
}

const topCommentedFilmListElement = siteMainElement.querySelector(`.js-commented-films__container`);

for (let i = 0; i < FilmCardValue.TOP_COMMENT; i++) {
  renderTemplate(topCommentedFilmListElement, createFilmCardTemplate(), `beforeend`);
}

const siteFooterElement = document.querySelector(`.js-footer`);
renderTemplate(siteFooterElement, createFilmDetailsPopupTemplate(), `afterend`);

const filmPopup = document.querySelector(`.js-film-details`);
filmPopup.classList.add(`visually-hidden`);
