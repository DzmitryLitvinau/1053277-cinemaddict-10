import BoardComponent from './components/board.js';
import NavigationFilterComponent from './components/main-navigation.js';
import SortComponent from './components/sort.js';
import UserLevelComponent from './components/user-level.js';
import PageController from './controllers/board.js';
import { generateCards } from './mock/film-card.js';
import { generateFilters } from './mock/filter.js';
import { RenderPosition, renderTemplate } from './utils/render.js';

const FILM_CARDS_COUNT = 20;

const siteMainElement = document.querySelector(`.js-main`);
const siteHeaderElement = document.querySelector(`.js-header`);

renderTemplate(siteHeaderElement, new UserLevelComponent().getElement(), RenderPosition.BEFOREEND);
const filters = generateFilters();
renderTemplate(siteMainElement, new NavigationFilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardElement = boardComponent.getElement();
renderTemplate(siteMainElement, boardElement, RenderPosition.BEFOREEND);


const cards = generateCards(FILM_CARDS_COUNT);
const pageController = new PageController(boardComponent);

pageController.render(cards);

const siteFooterElement = document.querySelector(`.js-footer`);

const filmsCountMessage = siteFooterElement.querySelector(`.js-footer__statistics > p`);
filmsCountMessage.textContent = `${cards.length} movies inside`;
