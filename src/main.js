import ProfileButtonComponent from './components/profile-button.js';
import SiteNavigationComponent from './components/site-navigation.js';
import SortComponent from './components/sort.js';
import ContentBoardComponent from './components/content-board.js';
import MainListFilmsComponent from './components/main-list-films.js';
import TopRateFilmsComponent from './components/top-rate-films.js';
import MostCommentedFilmsComponent from './components/most-commented-films.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import FilmPopupComponent from './components/film-popup.js';
import {generateUserRank} from './mock/user-rank.js';
import {generateFilmCards} from './mock/films.js';
import {render} from './utils.js';

const MAIN_CARD_COUNT = 22;
const CARD_COUNT_ON_START = 5;
const CARD_COUNT_ON_CLICK = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const renderFilm = (filmsListElement, film) => {
  const clickPosterHandler = (evt) => {
    evt.preventDefault();
    document.body.appendChild(filmPopupComponent.getElement());
    document.addEventListener(`keydown`, escapeButtonHandler);
  };

  const clickPopupCloseButtonHandler = (evt) => {
    evt.preventDefault();
    document.body.removeChild(filmPopupComponent.getElement());
  };

  const escapeButtonHandler = (evt) => {
    evt.preventDefault();

    if (evt.key === `Esc` || evt.key === `Escape`) {
      document.body.removeChild(filmPopupComponent.getElement());
      document.removeEventListener(`keydown`, escapeButtonHandler);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmPosterElement = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  filmPosterElement.addEventListener(`click`, clickPosterHandler);

  const filmPopupComponent = new FilmPopupComponent(film);
  const filmPopupCloseButtonElement = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  filmPopupCloseButtonElement.addEventListener(`click`, clickPopupCloseButtonHandler);

  render(filmsListElement, filmCardComponent.getElement());
};

const renderBoard = (boardComponent, films) => {
  if (!films.length) {
    render(boardComponent.getElement(), new MainListFilmsComponent(false).getElement());

    return;
  }

  const mainListFilmsComponent = new MainListFilmsComponent();
  render(boardComponent.getElement(), mainListFilmsComponent.getElement());

  const mainListFilmsContainerElement = mainListFilmsComponent.getElement().querySelector(`.films-list__container`);

  let filmToShowIndex = CARD_COUNT_ON_START;

  films.slice(0, filmToShowIndex).forEach((it) => renderFilm(mainListFilmsContainerElement, it));

  let shownFilmsCount = filmToShowIndex;

  const showMoreButtonComponent = new ShowMoreButtonComponent();

  render(boardComponent.getElement(), showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    filmToShowIndex = shownFilmsCount + CARD_COUNT_ON_CLICK;

    films.slice(shownFilmsCount, filmToShowIndex).forEach((it) => renderFilm(mainListFilmsContainerElement, it));

    shownFilmsCount = filmToShowIndex;

    if (shownFilmsCount >= MAIN_CARD_COUNT) {
      showMoreButtonComponent.getElement().remove();
    }
  });

  const topRateFilmsComponent = new TopRateFilmsComponent();
  render(boardComponent.getElement(), topRateFilmsComponent.getElement());

  const topRateContainerElement = topRateFilmsComponent.getElement().querySelector(`.films-list__container`);

  films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_CARD_COUNT).forEach((it) => renderFilm(topRateContainerElement, it));

  const mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
  render(boardComponent.getElement(), mostCommentedFilmsComponent.getElement());

  const mostCommentedContainerElement = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

  films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_CARD_COUNT).forEach((it) => renderFilm(mostCommentedContainerElement, it));
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileButtonComponent(generateUserRank()).getElement());
render(siteMainElement, new SiteNavigationComponent().getElement());
render(siteMainElement, new SortComponent().getElement());

const films = generateFilmCards(MAIN_CARD_COUNT);

const boardComponent = new ContentBoardComponent();

render(siteMainElement, boardComponent.getElement());
renderBoard(boardComponent, films);
