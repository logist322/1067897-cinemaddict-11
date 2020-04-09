import createProfileButtonTemplate from './components/profile-button.js';
import createSiteNavigationTemplate from './components/site-navigation.js';
import createSiteSortTemplate from './components/films-sort.js';
import createSiteContentTemplate from './components/films-content.js';
import createTopRateTemplate from './components/top-rate-films.js';
import createMostCommentedTemplate from './components/most-commented-films.js';
import createFilmCardTemplate from './components/film-card.js';
import createShowMoreButtonTemplate from './components/show-more-button.js';

const MAIN_CARD_COUNT = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileButtonTemplate());
render(siteMainElement, createSiteNavigationTemplate());
render(siteMainElement, createSiteSortTemplate());
render(siteMainElement, createSiteContentTemplate());

const siteContentElement = siteMainElement.querySelector(`.films`);
const mainListContentElement = siteContentElement.querySelector(`.films-list--main`);
const mainFilmListElement = mainListContentElement.querySelector(`.films-list__container`);

for (let i = 0; i < MAIN_CARD_COUNT; i++) {
  render(mainFilmListElement, createFilmCardTemplate());
}

render(mainListContentElement, createShowMoreButtonTemplate());

render(siteContentElement, createTopRateTemplate());
render(siteContentElement, createMostCommentedTemplate());

const topFilmListElement = siteContentElement.querySelector(`.films-list--top > .films-list__container`);
const mostFilmListElement = siteContentElement.querySelector(`.films-list--most > .films-list__container`);

for (let i = 0; i < TOP_CARD_COUNT; i++) {
  render(topFilmListElement, createFilmCardTemplate());
}

for (let i = 0; i < MOST_CARD_COUNT; i++) {
  render(mostFilmListElement, createFilmCardTemplate());
}
