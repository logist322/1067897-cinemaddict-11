import {formatDuration} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(`\n`);
};

const createDetailRowsMarkup = (details) => {
  return Object.keys(details).map((detail) => {
    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${detail}</td>
        <td class="film-details__cell">${details[detail]}</td>
      </tr>`
    );
  }).join(`\n`);
};

const createFilmPopupTemplate = (film) => {
  const {name, altName, src, rating, release, duration, genres, description, age, director, writers, actors, country, controls} = film;

  const {isInWatchlist, isWatched, isFavorite} = controls;

  const details = {
    'Director': director,
    'Writers': writers.join(`, `),
    'Actors': actors.join(`, `),
    'Release Date': moment(release).format(`D MMMM YYYY`),
    'Runtime': formatDuration(duration),
    'Country': country,
    'Genres': createGenresMarkup(genres)
  };

  const detailRowsMarkup = createDetailRowsMarkup(details);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${src}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${altName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${detailRowsMarkup}
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" data-controls="isInWatchlist" ${isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" data-controls="isWatched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" data-controls="isFavorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  getControlsStatus() {
    return this._currentControls;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  setControlsChangeHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`change`, (evt) => {
      handler(evt.target.dataset.controls);
    });
  }
}
