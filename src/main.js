import createProfileButtonTemplate from './components/profile-button.js';
import createSiteNavigationTemplate from './components/site-navigation.js';
import createSiteSortTemplate from './components/films-sort.js';
import createSiteContentTemplate from './components/films-content.js';
import createTopRateTemplate from './components/top-rate-films.js';
import createMostCommentedTemplate from './components/most-commented-films.js';
import createFilmCardTemplate from './components/film-card.js';
import createShowMoreButtonTemplate from './components/show-more-button.js';
import {generateUserRank} from './mock/user-rank.js';
import {generateFilmCards} from './mock/films.js';
import createFilmPopup from './components/film-popup.js';


const MAIN_CARD_COUNT = 20;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileButtonTemplate(generateUserRank()));
render(siteMainElement, createSiteNavigationTemplate());
render(siteMainElement, createSiteSortTemplate());
render(siteMainElement, createSiteContentTemplate());

const siteContentElement = siteMainElement.querySelector(`.films`);
const mainListContentElement = siteContentElement.querySelector(`.films-list--main`);
const mainFilmListElement = mainListContentElement.querySelector(`.films-list__container`);

const films = generateFilmCards(MAIN_CARD_COUNT);

films.forEach((it) => render(mainFilmListElement, createFilmCardTemplate(it)));

render(mainListContentElement, createShowMoreButtonTemplate());

render(siteContentElement, createTopRateTemplate());
render(siteContentElement, createMostCommentedTemplate());

const topFilmListElement = siteContentElement.querySelector(`.films-list--top > .films-list__container`);
const mostFilmListElement = siteContentElement.querySelector(`.films-list--most > .films-list__container`);

films.slice(0, TOP_CARD_COUNT).forEach((it) => render(topFilmListElement, createFilmCardTemplate(it)));

films.slice(0, MOST_CARD_COUNT).forEach((it) => render(mostFilmListElement, createFilmCardTemplate(it)));

const bodyElement = document.querySelector(`body`);

render(bodyElement, createFilmPopup(films[0]));

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Escape`) {
    bodyElement.querySelector(`.film-details`).remove();
  }
});
