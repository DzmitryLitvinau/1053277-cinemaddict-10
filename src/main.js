import BoardComponent from './components/board.js';
import NavigationFilterComponent from './components/main-navigation.js';
import UserLevelComponent from './components/user-level.js';
import PageController from './controllers/board.js';
import FooterStatistics from './components/footer-statistic.js';
import { generateCards } from './mock/film-card.js';
import { generateFilters } from './mock/filter.js';
import { RenderPosition, renderTemplate } from './utils/render.js';

const FILM_CARDS_COUNT = 20;

const siteMainElement = document.querySelector(`.js-main`);
const siteHeaderElement = document.querySelector(`.js-header`);

renderTemplate(siteHeaderElement, new UserLevelComponent(), RenderPosition.BEFOREEND);
const filters = generateFilters();
renderTemplate(siteMainElement, new NavigationFilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderTemplate(siteMainElement, boardComponent, RenderPosition.BEFOREEND);


const cards = generateCards(FILM_CARDS_COUNT);
const pageController = new PageController(boardComponent);

pageController.render(cards);

const footerStatisticsComponent = new FooterStatistics(cards);
const footerStatistics = document.querySelector(`.footer__statistics`);
footerStatistics.replaceWith(footerStatisticsComponent.getElement());

