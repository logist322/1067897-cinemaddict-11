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
const boardComponent = new ContentBoardComponent();
const pageController = new PageController(boardComponent, filmsModel, api);
const statisticsComponent = new StatisticsComponent(filmsModel);

render(siteMainElement, siteNavigationComponent);
render(siteMainElement, boardComponent);
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    render(siteHeaderElement, new ProfileButtonComponent(filmsModel));
    const filterController = new FilterController(siteNavigationComponent.getElement(), filmsModel);
    filterController.render();
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
