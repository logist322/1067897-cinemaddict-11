import ProfileButtonComponent from './components/profile-button.js';
import SiteNavigationComponent from './components/site-navigation.js';
import SortComponent from './components/sort.js';
import ContentBoardComponent from './components/content-board.js';
import PageController from './controllers/page-controller.js';
import {generateUserRank} from './mock/user-rank.js';
import {generateFilmCards} from './mock/films.js';
import {render} from './utils/render.js';

const MAIN_CARD_COUNT = 22;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileButtonComponent(generateUserRank()));
render(siteMainElement, new SiteNavigationComponent());
render(siteMainElement, new SortComponent());

const films = generateFilmCards(MAIN_CARD_COUNT);

const boardComponent = new ContentBoardComponent();
const pageController = new PageController(boardComponent);

render(siteMainElement, boardComponent);
pageController.render(films);
