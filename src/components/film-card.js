import {formatDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createFilmCardTemplate = (film) => {
  const {name, src, rating, release, duration, genres, description, comments} = film;

  const durationInFormat = formatDuration(duration);
  const commentsCount = comments.length;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.year}</span>
        <span class="film-card__duration">${durationInFormat}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${src}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
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

  setPosterClickhandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
}
