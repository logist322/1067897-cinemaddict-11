import SortComponent, {SortType} from '../components/sort.js';
import MainListFilmsComponent from '../components/main-list-films.js';
import TopRateFilmsComponent from '../components/top-rate-films.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {render, remove} from '../utils/render.js';
import MovieController from './movie-controller.js';
import {getRandomCountOfElementsFromArray} from '../utils/common.js';

const CARD_COUNT_ON_START = 5;
const CARD_COUNT_ON_CLICK = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const getSortedArrayByRating = (array) => {
  const elementsToSort = array.slice().sort((a, b) => b.rating - a.rating);

  if (elementsToSort[0].rating === 0) {
    return false;
  }

  let result = [];

  while (result.length < TOP_CARD_COUNT) {
    const countToExtract = elementsToSort.findIndex((element) => element.rating !== elementsToSort[0].rating);
    let elementsToPush = elementsToSort.splice(0, countToExtract);
    const restCount = TOP_CARD_COUNT - result.length;

    if (elementsToPush.length >= restCount) {
      elementsToPush = getRandomCountOfElementsFromArray(elementsToPush, restCount);
    }

    result = [...result, ...elementsToPush];
  }

  return result;
};

const getSortedArrayByComments = (array) => {
  const elementsToSort = array.slice().sort((a, b) => b.comments.length - a.comments.length);

  if (elementsToSort[0].comments.length === 0) {
    return false;
  }

  let result = [];

  while (result.length < MOST_CARD_COUNT) {
    const countToExtract = elementsToSort.findIndex((element) => element.comments.length !== elementsToSort[0].comments.length);
    let elementsToPush = elementsToSort.splice(0, countToExtract);
    const restCount = MOST_CARD_COUNT - result.length;

    if (elementsToPush.length >= restCount) {
      elementsToPush = getRandomCountOfElementsFromArray(elementsToPush, restCount);
    }

    result = [...result, ...elementsToPush];
  }

  return result;
};

const renderFilms = (container, films, dataChangeHandler, api, updateHandler) => {
  return films.map((film) => {
    const filmController = new MovieController(container, dataChangeHandler, api, updateHandler);

    filmController.render(film);

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
    this._updateFilms = this._updateFilms.bind(this);

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
    this._api.updateFilm(oldData.id, newData.toRAW())
      .then((film) => {
        this._filmsModel.updateFilm(oldData.id, film);

        this._updateFilms(false);
      });


    return newData;
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
    const newFilms = renderFilms(this._mainListFilmsComponent.getElement().querySelector(`.films-list__container`), films, this._dataChangeHandler, this._api, this._updateFilms);

    this._shownFilmsControllers = [...this._shownFilmsControllers, ...newFilms];
  }

  _renderMainFilmList() {
    this._renderFilms(this._filmsToShow.slice(0, this._shownFilmsCount));
  }

  _renderExtraFilmList() {
    this._topRatedToShow = getSortedArrayByRating(this._filmsModel.getAllFilms());

    let topRateControllers = new Array(TOP_CARD_COUNT);

    if (this._topRatedToShow) {
      render(this._container.getElement(), this._topRateFilmsComponent);

      topRateControllers = renderFilms(this._topRateFilmsComponent.getElement().querySelector(`.films-list__container`), this._topRatedToShow, this._dataChangeHandler, this._api);
    }

    this._mostCommentedToShow = getSortedArrayByComments(this._filmsModel.getAllFilms());

    let mostCommentedControllers = new Array(MOST_CARD_COUNT);

    if (this._mostCommentedToShow) {
      render(this._container.getElement(), this._mostCommentedFilmsComponent);

      mostCommentedControllers = renderFilms(this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`), this._mostCommentedToShow, this._dataChangeHandler, this._api);
    }

    this._shownFilmsControllers = [...topRateControllers, ...mostCommentedControllers, ...this._shownFilmsControllers];
  }
}
