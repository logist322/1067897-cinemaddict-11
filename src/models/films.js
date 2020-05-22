import {getFilmsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilter = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getAllFilms() {
    return this._films;
  }

  getWatchedFilms() {
    return getFilmsByFilter(this._films, FilterType.WATCHED);
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilter);
  }

  setFilms(films) {
    this._films = [...films];

    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((films) => films.id === id);

    if (index === -1) {
      return false;
    }

    if (this._films[index].controls.isWatched !== film.controls.isWatched && film.controls.isWatched) {
      film.watchingDate = new Date();
    }

    this._films = [...this._films.slice(0, index), film, ...this._films.slice(index + 1)];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
