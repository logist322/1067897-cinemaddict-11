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

const renderFilms = (container, films, dataChangeHandler, api) => {
  return films.map((it) => {
    const filmController = new MovieController(container, dataChangeHandler, api);

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
      sortedFilms = films.slice().sort((a, b) => b.release.getFullYear() - a.release.getFullYear());
      break;

    case SortType.RATING:
      sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
  }

  return sortedFilms;
};

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._shownFilmsControllers = [];
    this._filmsToShow = [];
    this._topRatedToShow = [];
    this._mostCommentedToShow = [];

    this._shownFilmsCount = CARD_COUNT_ON_START;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortComponent();
    this._mainListFilmsComponent = new MainListFilmsComponent();
    this._topRateFilmsComponent = new TopRateFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._sortHandler = this._sortHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._sortComponent.setClickHandler(this._sortHandler);
    this._filmsModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  render() {
    const container = this._container.getElement();

    if (!this._filmsModel.getAllFilms().length) {
      render(container, new MainListFilmsComponent(false));

      return;
    }

    render(container, this._sortComponent);
    render(container, this._mainListFilmsComponent);

    this._updateFilms();
  }

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._shownFilmsCount >= this._filmsToShow.length) {
      return;
    }

    render(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._showMoreButtonComponent, `afterend`);

    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();

      const prevTasksCount = this._shownFilmsCount;

      this._shownFilmsCount += CARD_COUNT_ON_CLICK;

      const newFilms = renderFilms(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), this._filmsToShow.slice(prevTasksCount, this._shownFilmsCount), this._dataChangeHandler, this._api);

      this._shownFilmsControllers = [...this._shownFilmsControllers, ...newFilms];

      if (this._shownFilmsCount >= this._filmsToShow.length) {
        this._showMoreButtonComponent.getElement().remove();
      }
    });
  }

  _sortHandler(sortType) {
    this._currentSortType = sortType;
    this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    this._shownFilmsCount = CARD_COUNT_ON_START;

    this._filmsToShow = getSortedFilms(this._filmsModel.getFilms(), sortType);


    this._renderFilms(this._filmsToShow.slice(0, this._shownFilmsCount));

    this._renderShowMoreButton();
  }

  _dataChangeHandler(oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((film) => {
        this._filmsModel.updateFilm(oldData.id, film);

        this._updateFilms(false);
      });
  }

  _removeFilms() {
    this._shownFilmsControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _updateFilms(isDefaultCount = true) {
    this._removeFilms();

    if (isDefaultCount) {
      this._shownFilmsCount = CARD_COUNT_ON_START;
    }

    this._filmsToShow = getSortedFilms(this._filmsModel.getFilms().slice(), this._currentSortType);

    this._renderMainFilmList();

    this._renderShowMoreButton();

    this._renderExtraFilmList();
  }

  _filterChangeHandler() {
    this._updateFilms();
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), films, this._dataChangeHandler, this._api);

    this._shownFilmsControllers = [...this._shownFilmsControllers, ...newFilms];
  }

  _renderMainFilmList() {
    this._renderFilms(this._filmsToShow.slice(0, this._shownFilmsCount));
  }

  _renderExtraFilmList() {
    render(this._container.getElement(), this._topRateFilmsComponent);
    render(this._container.getElement(), this._mostCommentedFilmsComponent);

    this._topRatedToShow = this._filmsModel.getAllFilms().slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_CARD_COUNT);

    const topRateControllers = renderFilms(this._topRateFilmsComponent.getElement().querySelector(`.films-list__container`), this._topRatedToShow, this._dataChangeHandler, this._api);

    this._mostCommentedToShow = this._filmsModel.getAllFilms().slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_CARD_COUNT);

    const mostCommentedControllers = renderFilms(this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`), this._mostCommentedToShow, this._dataChangeHandler, this._api);

    this._shownFilmsControllers = [...topRateControllers, ...mostCommentedControllers, ...this._shownFilmsControllers];
  }
}
