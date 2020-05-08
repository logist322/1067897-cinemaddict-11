import FilmCardComponent from '../components/film-card.js';
import FilmPopupComponent from '../components/film-popup.js';
import PosterControlsComponent from '../components/poster-controls.js';
import {render, replace} from '../utils/render.js';

export default class MovieController {
  constructor(container, dataChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;

    this._popupMode = false;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._posterControlsComponent = null;

    this._oldPopupComponent = null;

    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
  }

  render(film) {
    const changeData = (field) => {
      const changedData = Object.assign({}, film.controls, {[field]: !film.controls[field]});

      this._dataChangeHandler(film, Object.assign({}, film, {controls: changedData}));
    };

    const oldPosterControlsComponent = this._posterControlsComponent;
    this._oldPopupComponent = this._filmPopupComponent;

    if (!this._popupMode) {
      this._filmPopupComponent = new FilmPopupComponent(film);
    }

    this._filmCardComponent = new FilmCardComponent(film);
    this._posterControlsComponent = new PosterControlsComponent(film.controls);


    this._filmCardComponent.setPosterClickhandler((evtPoster) => {
      evtPoster.preventDefault();

      this._filmPopupComponent.setCloseButtonClickHandler((evtCloseButton) => {
        evtCloseButton.preventDefault();
        this._filmPopupComponent.getElement().remove();

        this._popupMode = false;

        document.body.classList.remove(`hide-overflow`);
      });

      document.body.classList.add(`hide-overflow`);

      render(document.body, this._filmPopupComponent);
      document.addEventListener(`keydown`, this._escapeButtonHandler);

      if (this._oldPopupComponent) {
        replace(this._filmPopupComponent, this._oldPopupComponent);
      }

      this._popupMode = true;
    });

    this._posterControlsComponent.setControlsClickHandler(changeData);

    this._filmPopupComponent.setControlsChangeHandler(changeData);

    if (oldPosterControlsComponent && this._oldPopupComponent) {
      replace(this._posterControlsComponent, oldPosterControlsComponent);

      if (!this._popupMode) {
        replace(this._filmPopupComponent, this._oldPopupComponent);
      }

      return;
    }

    render(this._container, this._filmCardComponent);
    render(this._filmCardComponent.getElement(), this._posterControlsComponent);
  }

  _escapeButtonHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      this._filmPopupComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._escapeButtonHandler);

      this._popupMode = false;

      document.body.classList.remove(`hide-overflow`);
    }
  }
}
