import { generateComments } from '../mock/comments.js';
import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-details-popup.js';
import CommentsComponent from '../components/comments.js';

const COMMENTS_COUNT = 5;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const renderTemplate = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const renderComments = (container) => {
  const comments = generateComments(COMMENTS_COUNT);
  comments.forEach((comment) => renderTemplate(container, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));
};

const renderCardFilm = (container, card, place = RenderPosition.BEFOREEND) => {
  const filmCardComponent = new FilmCardComponent(card);
  const filmCardElement = filmCardComponent.getElement();
  const filmDetailsComponent = new FilmPopupComponent(card);
  const filmDetailsElement = filmDetailsComponent.getElement();

  renderComments(filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`));

  const filmCardPoster = filmCardElement.querySelector(`.js-film-card__poster`);
  const filmCardTitle = filmCardElement.querySelector(`.js-film-card__title`);
  const filmCardComments = filmCardElement.querySelector(`.js-film-card__comments`);
  filmCardPoster.addEventListener(`click`, () => renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND));
  filmCardTitle.addEventListener(`click`, () => renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND));
  filmCardComments.addEventListener(`click`, () => renderTemplate(document.body, filmDetailsElement, RenderPosition.BEFOREEND));

  const filmDetailsCloseButton = filmDetailsElement.querySelector(`.js-film-details__close-btn`);
  filmDetailsCloseButton.addEventListener(`click`, () => filmDetailsElement.remove());
  renderTemplate(container, filmCardElement, place);
};

export { RenderPosition, renderTemplate, renderCardFilm };
