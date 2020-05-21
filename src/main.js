import ProfileButtonComponent from './components/profile-button.js';
import SiteNavigationComponent from './components/site-navigation.js';
import StatisticsComponent from './components/statistics.js';
import ContentBoardComponent from './components/content-board.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter.js';
import FilmsModel from './models/films.js';
import {render} from './utils/render.js';
import API from './api/index.js';
import Provider from './api/provider.js';
import Store from './api/store.js';

const AUTHORIZATION = `Basic assdsfDSF33f`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const api = new API(AUTHORIZATION, END_POINT);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();

const siteNavigationComponent = new SiteNavigationComponent();
const filterController = new FilterController(siteNavigationComponent.getElement(), filmsModel);
const boardComponent = new ContentBoardComponent();
const pageController = new PageController(boardComponent, filmsModel, apiWithProvider);
const statisticsComponent = new StatisticsComponent(filmsModel);

render(siteHeaderElement, new ProfileButtonComponent(filmsModel));
filterController.render();
render(siteMainElement, siteNavigationComponent);
render(siteMainElement, boardComponent);
boardComponent.getElement().innerHTML = `<h2 class="films-list__title">Loading...</h2>`;
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

apiWithProvider.getFilms()
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

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`);
// });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
