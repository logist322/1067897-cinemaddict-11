import {formatDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createFilmCardTemplate = (film) => {
  const {name, src, rating, release, duration, genres, description, comments, controls} = film;

  const durationInFormat = formatDuration(duration);
  const commentsCount = comments.length;
  const releaseYear = moment(release).format(`YYYY`);
  const {isInWatchlist, isWatched, isFavorite} = controls;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${durationInFormat}</span>
        <span class="film-card__genre">${genres[0] || ``}</span>
      </p>
      <img src="./${src}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ? `${description.slice(0, 140)}...` : description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button data-controls="isInWatchlist" class="film-card__controls-item ${isInWatchlist ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button data-controls="isWatched" class="film-card__controls-item ${isWatched ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button data-controls="isFavorite" class="film-card__controls-item ${isFavorite ? `film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOpenPopupClickHandlers(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setControlsClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      evt.preventDefault();

      handler(evt.target.dataset.controls);
    });
  }
}
