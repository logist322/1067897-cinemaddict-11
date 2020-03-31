'use strict';

const MAIN_CARD_COUNT = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const createProfileButtonTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createSiteNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const createSiteSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createSiteContentTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list films-list--main">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
        </div>
      </section>
    </section>`
  );
};

const createTopRateTemplate = () => {
  return (
    `<section class="films-list--extra films-list--top">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra films-list--most">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Made for Each Other</h3>
      <p class="film-card__rating">5.8</p>
      <p class="film-card__info">
        <span class="film-card__year">1939</span>
        <span class="film-card__duration">1h 32m</span>
        <span class="film-card__genre">Comedy</span>
      </p>
      <img src="./images/posters/made-for-each-other.png" alt="" class="film-card__poster">
      <p class="film-card__description">John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…</p>
      <a class="film-card__comments">56 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
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
