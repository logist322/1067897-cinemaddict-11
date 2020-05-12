import FilmCardComponent from '../components/film-card.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsController from '../controllers/comments.js';
import PosterControlsComponent from '../components/poster-controls.js';
import {render, replace, remove} from '../utils/render.js';

export default class MovieController {
  constructor(container, dataChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;

    this._film = null;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._posterControlsComponent = null;

    this._oldPopupComponent = null;

    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._changeData = this._changeData.bind(this);
  }

  render(film) {
    this._film = film;

    const oldPosterControlsComponent = this._posterControlsComponent;
    const oldPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._posterControlsComponent = new PosterControlsComponent(film.controls);

    this._filmCardComponent.setOpenPopupClickHandlers(this._openPopupHandler);

    this._posterControlsComponent.setControlsClickHandler(this._changeData);

    if (oldPosterControlsComponent && oldPopupComponent) {
      replace(this._posterControlsComponent, oldPosterControlsComponent);

      return;
    }

    render(this._container, this._filmCardComponent);
    render(this._filmCardComponent.getElement(), this._posterControlsComponent);
  }

  _escapeButtonHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      this._closePopupHandler();
    }
  }

  _changeData(field) {
    const changedData = Object.assign({}, this._film.controls, {[field]: !this._film.controls[field]});

    this._dataChangeHandler(this._film, Object.assign({}, this._film, {controls: changedData}));
  }

  _openPopupHandler() {
    this._filmPopupComponent = new FilmPopupComponent(this._film);
    render(document.body, this._filmPopupComponent);

    this._commentsController = new CommentsController(this._filmPopupComponent.getElement().querySelector(`form`), this._film.comments);
    this._commentsController.render();

    this._filmPopupComponent.setCloseButtonClickHandler(this._closePopupHandler);

    document.body.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, this._escapeButtonHandler);
  }

  _closePopupHandler() {
    this._dataChangeHandler(this._film, Object.assign({}, this._film, this._filmPopupComponent.getControlsStatus(), {comments: this._commentsController.getComments()}));

    this._commentsController.destroy();
    remove(this._filmPopupComponent);

    document.removeEventListener(`keydown`, this._escapeButtonHandler);

    document.body.classList.remove(`hide-overflow`);
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
