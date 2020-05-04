import SortComponent, {SortType} from '../components/sort.js';
import MainListFilmsComponent from '../components/main-list-films.js';
import TopRateFilmsComponent from '../components/top-rate-films.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmPopupComponent from '../components/film-popup.js';
import {render, remove} from '../utils/render.js';

const CARD_COUNT_ON_START = 5;
const CARD_COUNT_ON_CLICK = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const renderFilm = (filmsListComponent, film) => {
  const escapeButtonHandler = (evt) => {
    evt.preventDefault();

    if (evt.key === `Esc` || evt.key === `Escape`) {
      remove(filmPopupComponent);
      document.removeEventListener(`keydown`, escapeButtonHandler);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmPopupComponent = new FilmPopupComponent(film);

  filmCardComponent.setPosterClickhandler((evtPoster) => {
    evtPoster.preventDefault();

    filmPopupComponent.setCloseButtonClickHandler((evtCloseButton) => {
      evtCloseButton.preventDefault();
      remove(filmPopupComponent);
    });
    render(document.body, filmPopupComponent);
    document.addEventListener(`keydown`, escapeButtonHandler);
  });

  render(filmsListComponent.getElement().querySelector(`.films-list__container`), filmCardComponent);
};

const renderFilms = (filmsListComponent, films) => {
  films.forEach((it) => renderFilm(filmsListComponent, it));
};

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = films.slice();
      break;

    case SortType.DATE:
      sortedFilms = films.slice().sort((a, b) => b.release.year - a.release.year);
      break;

    case SortType.RATING:
      sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
  }

  return sortedFilms;
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._mainListFilmsComponent = new MainListFilmsComponent();
    this._topRateFilmsComponent = new TopRateFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    if (!films.length) {
      render(container, new MainListFilmsComponent(false));

      return;
    }

    const renderShowMoreButton = () => {
      render(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._showMoreButtonComponent, `afterend`);

      this._showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();

        filmToShowIndex = shownFilmsCount + CARD_COUNT_ON_CLICK;

        renderFilms(this._mainListFilmsComponent, filmsToShow.slice(shownFilmsCount, filmToShowIndex));

        shownFilmsCount = filmToShowIndex;

        if (shownFilmsCount >= filmsToShow.length) {
          this._showMoreButtonComponent.getElement().remove();
        }
      });
    };

    render(container, this._sortComponent);
    this._sortComponent.setClickHandler((sortType) => {
      remove(this._showMoreButtonComponent);

      this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      filmToShowIndex = CARD_COUNT_ON_START;

      filmsToShow = getSortedFilms(films, sortType);

      renderFilms(this._mainListFilmsComponent, filmsToShow.slice(0, filmToShowIndex));

      renderShowMoreButton();
    });

    render(container, this._mainListFilmsComponent);

    let filmsToShow = films.slice();

    let filmToShowIndex = CARD_COUNT_ON_START;

    renderFilms(this._mainListFilmsComponent, filmsToShow.slice(0, filmToShowIndex));

    let shownFilmsCount = filmToShowIndex;

    renderShowMoreButton();

    render(container, this._topRateFilmsComponent);

    renderFilms(this._topRateFilmsComponent, films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_CARD_COUNT));

    render(container, this._mostCommentedFilmsComponent);

    renderFilms(this._mostCommentedFilmsComponent, films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_CARD_COUNT));
  }
}
