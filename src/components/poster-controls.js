import AbstractComponent from './abstract-component.js';

const createControlsTemplate = (options) => {
  const {isInWatchlist, isWatched, isFavorite} = options;

  return (
    `<form class="film-card__controls">
      <button data-controls="isInWatchlist" class="film-card__controls-item ${isInWatchlist ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button data-controls="isWatched" class="film-card__controls-item ${isWatched ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button data-controls="isFavorite" class="film-card__controls-item ${isFavorite ? `film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
    </form>`
  );
};

export default class PosterControls extends AbstractComponent {
  constructor(options) {
    super();

    this._options = options;
  }

  getTemplate() {
    return createControlsTemplate(this._options);
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
