import SortComponent, {SortType} from '../components/sort.js';
import MainListFilmsComponent from '../components/main-list-films.js';
import TopRateFilmsComponent from '../components/top-rate-films.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, remove} from '../utils/render.js';
import MovieController from './movie-controller.js';

const CARD_COUNT_ON_START = 5;
const CARD_COUNT_ON_CLICK = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const renderFilms = (container, films, dataChangeHandler) => {
  return films.map((it) => {
    const filmController = new MovieController(container, dataChangeHandler);

    filmController.render(it);

    return filmController;
  });
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

    this._shownFilmsControllers = [];
    this._films = [];
    this._filmsToShow = [];
    this._topRatedToShow = [];
    this._mostCommentedToShow = [];

    this._filmToShowIndex = null;
    this._shownFilmsCount = null;

    this._sortComponent = new SortComponent();
    this._mainListFilmsComponent = new MainListFilmsComponent();
    this._topRateFilmsComponent = new TopRateFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._sortHandler = this._sortHandler.bind(this);
    this._sortComponent.setClickHandler(this._sortHandler);

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
  }

  render(films) {
    const container = this._container.getElement();

    if (!films.length) {
      render(container, new MainListFilmsComponent(false));

      return;
    }

    this._films = films.slice();

    render(container, this._sortComponent);

    render(container, this._mainListFilmsComponent);

    this._renderMainFilmList();

    this._renderShowMoreButton();

    render(container, this._topRateFilmsComponent);

    render(container, this._mostCommentedFilmsComponent);

    this._renderExtraFilmList();
  }

  _renderShowMoreButton() {
    if (this._shownFilmsCount >= this._filmsToShow.length) {
      return;
    }

    render(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._showMoreButtonComponent, `afterend`);

    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();

      this._filmToShowIndex = this._shownFilmsCount + CARD_COUNT_ON_CLICK;

      const newFilms = renderFilms(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._filmsToShow.slice(this._shownFilmsCount, this._filmToShowIndex), this._dataChangeHandler);

      this._shownFilmsControllers = [].concat(this._shownFilmsControllers, newFilms);

      this._shownFilmsCount = this._filmToShowIndex;

      if (this._shownFilmsCount >= this._filmsToShow.length) {
        this._showMoreButtonComponent.getElement().remove();
      }
    });
  }

  _sortHandler(sortType) {
    remove(this._showMoreButtonComponent);

    this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    this._filmToShowIndex = CARD_COUNT_ON_START;

    this._filmsToShow = getSortedFilms(this._films, sortType);

    const newFilms = renderFilms(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._filmsToShow.slice(0, this._filmToShowIndex), this._dataChangeHandler);

    this._shownFilmsControllers = [...this._shownFilmsControllers.slice(0, TOP_CARD_COUNT + MOST_CARD_COUNT), ...newFilms];

    this._shownFilmsCount = this._filmToShowIndex;

    this._renderShowMoreButton();
  }

  _dataChangeHandler(oldData, newData) {
    const index = this._films.findIndex((it) => oldData === it);

    if (index === -1) {
      return;
    }

    this._films = [...this._films.slice(0, index), newData, ...this._films.slice(index + 1)];

    const mainShownIndex = this._filmsToShow.findIndex((it) => oldData === it);

    if (mainShownIndex !== -1) {
      this._filmsToShow = [...this._filmsToShow.slice(0, mainShownIndex), newData, ...this._filmsToShow.slice(mainShownIndex + 1)];

      const controllersIndex = TOP_CARD_COUNT + MOST_CARD_COUNT + mainShownIndex;

      if (controllersIndex < this._shownFilmsControllers.length) {
        this._shownFilmsControllers[controllersIndex].render(this._films[index]);
      }
    }

    const topRatedShownIndex = this._topRatedToShow.findIndex((it) => oldData === it);

    if (topRatedShownIndex !== -1) {
      this._topRatedToShow = [...this._topRatedToShow.slice(0, topRatedShownIndex), newData, ...this._topRatedToShow.slice(topRatedShownIndex + 1)];

      const controllersIndex = topRatedShownIndex;

      if (controllersIndex < this._shownFilmsControllers.length) {
        this._shownFilmsControllers[controllersIndex].render(this._films[index]);
      }
    }

    const mostCommentedShownIndex = this._mostCommentedToShow.findIndex((it) => oldData === it);

    if (mostCommentedShownIndex !== -1) {
      this._mostCommentedToShow = [...this._mostCommentedToShow.slice(0, mostCommentedShownIndex), newData, ...this._mostCommentedToShow.slice(mostCommentedShownIndex + 1)];

      const controllersIndex = TOP_CARD_COUNT + mostCommentedShownIndex;

      if (controllersIndex < this._shownFilmsControllers.length) {
        this._shownFilmsControllers[controllersIndex].render(this._films[index]);
      }
    }
  }

  _renderMainFilmList() {
    this._filmsToShow = this._films.slice();

    this._filmToShowIndex = CARD_COUNT_ON_START;

    const newFilms = renderFilms(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._filmsToShow.slice(0, this._filmToShowIndex), this._dataChangeHandler);

    this._shownFilmsControllers = newFilms;

    this._shownFilmsCount = this._filmToShowIndex;
  }

  _renderExtraFilmList() {
    this._topRatedToShow = this._films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_CARD_COUNT);

    const topRateControllers = renderFilms(this._topRateFilmsComponent.getElement().querySelector(`.films-list__container`), this._topRatedToShow, this._dataChangeHandler);

    this._mostCommentedToShow = this._films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_CARD_COUNT);

    const mostCommentedControllers = renderFilms(this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`), this._mostCommentedToShow, this._dataChangeHandler);

    this._shownFilmsControllers = [...topRateControllers, ...mostCommentedControllers, ...this._shownFilmsControllers];
  }
}
