import AbstractComponent from './abstract-component.js';

const createControlsTemplate = (options) => {
  const {isInWatchlist, isWatched, isFavorite} = options;

  return (
    `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" data-controls="isInWatchlist" ${isInWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" data-controls="isWatched" ${isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" data-controls="isFavorite" ${isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
  );
};


export default class PopupControls extends AbstractComponent {
  constructor(options) {
    super();

    this._options = options;
  }

  getTemplate() {
    return createControlsTemplate(this._options);
  }

  setControlsChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      handler(evt.target.dataset.controls);
    });
  }
}
