import ProfileButtonComponent from './components/profile-button.js';
import SiteNavigationComponent from './components/site-navigation.js';
import StatisticsComponent from './components/statistics.js';
import ContentBoardComponent from './components/content-board.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter.js';
import FilmsModel from './models/films.js';
import {render} from './utils/render.js';
import API from './api.js';

const AUTHORIZATION = `Basic assdsfDSF33f`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const api = new API(AUTHORIZATION, END_POINT);

const filmsModel = new FilmsModel();

const siteNavigationComponent = new SiteNavigationComponent();
const filterController = new FilterController(siteNavigationComponent.getElement(), filmsModel);
const boardComponent = new ContentBoardComponent();
const pageController = new PageController(boardComponent, filmsModel, api);
const statisticsComponent = new StatisticsComponent(filmsModel);

render(siteHeaderElement, new ProfileButtonComponent(filmsModel));
filterController.render();
render(siteMainElement, siteNavigationComponent);
render(siteMainElement, boardComponent);
boardComponent.getElement().innerHTML = `<h2 class="films-list__title">Loading...</h2>`;
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    boardComponent.getElement().innerHTML = ``;
    filmsModel.setFilms(films);

    pageController.render(films);
  });

siteNavigationComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    pageController.hide();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    pageController.show();
  }
});
