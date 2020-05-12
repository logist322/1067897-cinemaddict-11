import ProfileButtonComponent from './components/profile-button.js';
import SiteNavigationComponent from './components/site-navigation.js';
import ContentBoardComponent from './components/content-board.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter.js';
import FilmsModel from './models/films.js';
import {generateUserRank} from './mock/user-rank.js';
import {generateFilmCards} from './mock/films.js';
import {render} from './utils/render.js';

const MAIN_CARD_COUNT = 22;

const films = generateFilmCards(MAIN_CARD_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileButtonComponent(generateUserRank()));
const siteNavigationComponent = new SiteNavigationComponent();
render(siteMainElement, siteNavigationComponent);

const filterController = new FilterController(siteNavigationComponent.getElement(), filmsModel);
filterController.render();

const boardComponent = new ContentBoardComponent();
const pageController = new PageController(boardComponent, filmsModel);

render(siteMainElement, boardComponent);
pageController.render(films);
